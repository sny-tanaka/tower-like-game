import { memo, useMemo } from 'react';

import styles from './style.module.scss';

import { AutoToggle } from '@/components/atoms/AutoToggle';
import { Badge } from '@/components/atoms/Badge';
import { CircularProgress } from '@/components/atoms/CircularProgress';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { WeaponSlotIcon } from '@/components/molecules/WeaponSlotIcon';
import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { DEFAULT_ACTIVE_MAX_SEC, WEAPON_SWITCH_CD_SEC } from '@/store/slices/battle';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

const WEAPON_ORDER: readonly WeaponType[] = ['laser', 'cannon', 'thunder', 'cutter'];

export interface BattleHudBottomProps {
  /** 武器スロットタップ時 */
  onSwitchWeapon: (weapon: WeaponType) => void;
  /** アクティブボタン押下時 */
  onActivate: () => void;
  /** アクティブ手動/自動 Toggle 変更時 */
  onToggleAuto: (auto: boolean) => void;
  /** 一時停止トグル。 押下で pause 切替 + メニューも同期して開閉 */
  onTogglePause: () => void;
  /** スクリーンセーバーを開く */
  onOpenScreenSaver: () => void;
  /** ラン内ワークショップ (overlay Sheet) の開閉状態。アップグレード Badge tap で onToggleWorkshop が発火 */
  isWorkshopOpen?: boolean;
  onToggleWorkshop?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * BattleHudBottom — バトル画面下端 HUD Organism
 *
 * v1.3.7 Phase 4-B: 親 (Page) から prop drilling していた
 *   - screw / earnedBolt (= bolt - runStartBolt)
 *   - equippedWeapon / weaponCds
 *   - activeCd / activeMax / isAutoActive
 *   - isPaused
 * を撤去し、 内部で `useStore` selector を直接購読する。 さらに `React.memo` でラップして、
 * 自身が subscribe している値が変化したフレーム + 親 props (callback / overlay 開閉) が
 * 変化したフレームだけ再 render するようにした (= Page の re-render が BattleHudBottom に
 * 伝播しない)。
 *
 * 派生計算 (weaponCds / earnedBolt / activeMaxSec) もすべて内部 useMemo に移譲した。
 */
function BattleHudBottomImpl({
  onSwitchWeapon,
  onActivate,
  onToggleAuto,
  onTogglePause,
  onOpenScreenSaver,
  isWorkshopOpen = false,
  onToggleWorkshop,
}: BattleHudBottomProps) {
  // ── store から直接 subscribe (Page を経由しない) ──
  // selector を 1 値ずつ書くことで、 zustand のデフォルト Object.is 比較に乗る。
  // (例: screw だけ更新 → 他の selector は同一参照を返すので、 Object.is で再 render skip)
  const screw = useStore((s) => s.screw);
  const bolt = useStore((s) => s.bolt);
  const runStartBolt = useStore((s) => s.runStartBolt);
  const currentWeapon = useStore((s) => s.currentWeapon);
  const weaponSwitchCdSec = useStore((s) => s.weaponSwitchCdSec);
  const activeCdSec = useStore((s) => s.activeCdSec);
  const isAutoActive = useStore((s) => s.isAutoActive);
  const isPaused = useStore((s) => s.isPaused);
  // machineLevels 全体ではなく activeCdReduction の Lv (number) だけをピンポイント購読する。
  // 全体を取ると他フィールド (range / attackSpeed 等) の Lv 変化でも再 render してしまう。
  const activeCdReductionLv = useStore((s) => s.machineLevels.activeCdReduction);

  // ── 派生計算 (旧 Page 側 useMemo の移譲) ──
  // earnedBolt: ラン中の獲得ボルト累計 (= bolt - runStartBolt、 リザルトの earnedBolt と同値)。
  // 負にならないようクランプ (ラン外 → runStartBolt=0 なので所持累計がそのまま表示されてしまう
  // のを防ぐのは finalizeRun 側の責務、 ここでは演算のクランプだけ担当)。
  const earnedBolt = useMemo(() => {
    const raw = bolt.sub(runStartBolt);
    return raw.lt(BigNum.ZERO) ? BigNum.ZERO : raw;
  }, [bolt, runStartBolt]);

  // weaponCds: 武器切替 CD 進捗 (0-100、 仕様 05-weapons.md §武器切替: 3 秒)。
  // 装備中の武器は常に 100 (= CD なし表示)、 他の武器は経過率 % を出す。
  // 同じ値の組み合わせなら参照を安定化させて WeaponSlotIcon の memo を活かす。
  const weaponCds = useMemo<Record<WeaponType, number>>(() => {
    const weaponCdPct = Math.max(
      0,
      Math.min(100, ((WEAPON_SWITCH_CD_SEC - weaponSwitchCdSec) / WEAPON_SWITCH_CD_SEC) * 100)
    );
    return {
      laser: currentWeapon === 'laser' ? 100 : weaponCdPct,
      cannon: currentWeapon === 'cannon' ? 100 : weaponCdPct,
      thunder: currentWeapon === 'thunder' ? 100 : weaponCdPct,
      cutter: currentWeapon === 'cutter' ? 100 : weaponCdPct,
    };
  }, [currentWeapon, weaponSwitchCdSec]);

  // activeMaxSec: アクティブ CD ゲージ最大値 (秒)。
  // マシン強化「アクティブ CD 短縮率」 (0〜0.5) で短縮。 ゲージが満タンになるまでの時間 =
  // 60s × (1 - reduction)。 「最初から部分的に溜まった見た目」ではなく「溜まる速度が上がった
  // 見た目」 にする狙い。
  const activeMaxSec = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction');
    const reduction = item != null ? calcEffectValue(item, activeCdReductionLv) : 0;
    return DEFAULT_ACTIVE_MAX_SEC * (1 - Math.max(0, Math.min(1, reduction)));
  }, [activeCdReductionLv]);

  // ── 描画用フラグ ──
  const activeOnCd = activeCdSec > 0;
  // 自動モード時はアクティブボタン無効
  const activeDisabled = isAutoActive || activeOnCd;

  // 武器 CD 中かどうか（切替後 3 秒間は全武器切替不可）
  const isSwapCd = WEAPON_ORDER.some((w) => w !== currentWeapon && (weaponCds[w] ?? 100) < 100);

  return (
    <div className={styles.root}>
      {/* タップで開閉する「アップグレード」Badge ボタン */}
      {onToggleWorkshop != null && (
        <button
          type="button"
          className={styles.sheetToggleButton}
          onClick={onToggleWorkshop}
          aria-expanded={isWorkshopOpen}
          aria-label={isWorkshopOpen ? 'アップグレードを閉じる' : 'アップグレードを開く'}
        >
          <Badge
            text="アップグレード"
            variant="info"
            size="md"
            glow
          />
        </button>
      )}
      {/* ──── 上段: 武器スロット (中央) + アクティブ (右大円) ──── */}
      <div className={styles.topRow}>
        {/* 武器スロット × 4 */}
        <div className={styles.weaponSlots}>
          {WEAPON_ORDER.map((weapon) => (
            <WeaponSlotIcon
              key={weapon}
              weapon={weapon}
              active={weapon === currentWeapon}
              cdProgress={weaponCds[weapon] ?? 100}
              ready={(weaponCds[weapon] ?? 100) >= 100 && weapon !== currentWeapon}
              swapDisabled={isSwapCd && weapon !== currentWeapon}
              size="md"
              onClick={() => {
                onSwitchWeapon(weapon);
              }}
            />
          ))}
        </div>

        {/* アクティブボタン + 手動/自動トグル */}
        <div className={styles.activeArea}>
          <button
            type="button"
            className={[styles.activeButton, activeDisabled ? styles.activeDisabled : '']
              .filter(Boolean)
              .join(' ')}
            onClick={activeDisabled ? undefined : onActivate}
            disabled={activeDisabled}
            aria-label={`アクティブスキル発動${activeOnCd ? ' (クールダウン中)' : isAutoActive ? ' (自動モード)' : ''}`}
          >
            <CircularProgress
              // 「発動 = 0 → 時計回りで溜まっていく」 仕様。 activeCdSec は残り CD 秒数なので
              // 経過時間 = activeMaxSec - activeCdSec を進捗値として渡す。
              value={activeOnCd ? activeMaxSec - activeCdSec : activeMaxSec}
              max={activeMaxSec > 0 ? activeMaxSec : 1}
              size={64}
              color={activeOnCd ? 'cd' : 'primary'}
              glow={!activeOnCd && !isAutoActive}
              thickness={4}
            >
              <Icon
                name="lightning"
                size={26}
                color={activeDisabled ? 'var(--c-text-disabled)' : 'var(--c-secondary)'}
              />
            </CircularProgress>
          </button>

          {/* AUTO 切替トグル (共通 atom)。 非活性時も MANUAL ではなく "AUTO" 表記のまま色だけ変わる */}
          <AutoToggle
            enabled={isAutoActive}
            onToggle={onToggleAuto}
            ariaLabel={
              isAutoActive
                ? 'アクティブスキルを手動モードに切り替え'
                : 'アクティブスキルを自動モードに切り替え'
            }
          />
        </div>
      </div>

      {/* ──── 下段: 通貨 + 一時停止 + メニュー + SS ──── */}
      <div className={styles.bottomRow}>
        {/* 通貨大表示 (左端) */}
        <div className={styles.currencyArea}>
          {/* ネジは桁が変動するためラッパーで min-width を固定 (ボルト位置の安定化) */}
          <span className={styles.screwSlot}>
            <CurrencyAmount
              currency="screw"
              value={screw}
              size="lg"
            />
          </span>
          <CurrencyAmount
            currency="bolt"
            value={earnedBolt}
            size="md"
          />
        </div>

        {/* システムボタン (右端)。 pause = メニュー開閉 を統合 (押すと pause + メニュー表示) */}
        <div className={styles.sysButtons}>
          <IconButton
            icon={isPaused ? 'play' : 'pause'}
            label={isPaused ? '再開 (メニューを閉じる)' : '一時停止 (メニューを開く)'}
            size="md"
            variant="ghost"
            active={isPaused}
            onClick={onTogglePause}
          />
          <IconButton
            icon="ice"
            label="スクリーンセーバーを起動"
            size="md"
            variant="ghost"
            onClick={onOpenScreenSaver}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * v1.3.7 Phase 4-B: BattleHudBottom を React.memo で wrap。 props を必要最小限 (callback +
 * overlay 開閉) に絞ったため、 親 (Page) が 60fps で再 render しても親 props が変化しなければ
 * BattleHudBottom + その配下 (CurrencyAmount / WeaponSlotIcon / CircularProgress 等) の
 * re-render をスキップできる。 内部の store subscribe で値が変わったフレームだけ再 render される。
 */
export const BattleHudBottom = memo(BattleHudBottomImpl);
BattleHudBottom.displayName = 'BattleHudBottom';
