import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { CircularProgress } from '@/components/atoms/CircularProgress';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { WeaponSlotIcon } from '@/components/molecules/WeaponSlotIcon';
import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';
import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

const WEAPON_ORDER: readonly WeaponType[] = ['laser', 'cannon', 'thunder', 'cutter'];

export interface BattleHudBottomProps {
  /** ネジ残高 (= ラン中の獲得累計。 ラン開始時 0 リセット) */
  screw: BigNum;
  /** ラン中に獲得したボルト累計 (= bolt - runStartBolt、 リザルトの earnedBolt と同値) */
  earnedBolt: BigNum;
  /** 現在装備中の武器 */
  equippedWeapon: WeaponType;
  /** 各武器の切替 CD 進捗 (0-100) */
  weaponCds: Record<WeaponType, number>;
  /** アクティブ CD 進捗 (0〜activeMax) */
  activeCd: number;
  /** アクティブ CD 最大値 */
  activeMax: number;
  /** アクティブ自動モードか */
  isAutoActive: boolean;
  /** 武器スロットタップ時 */
  onSwitchWeapon: (weapon: WeaponType) => void;
  /** アクティブボタン押下時 */
  onActivate: () => void;
  /** アクティブ手動/自動 Toggle 変更時 */
  onToggleAuto: (auto: boolean) => void;
  /** 一時停止中か */
  isPaused: boolean;
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

export function BattleHudBottom({
  screw,
  earnedBolt,
  equippedWeapon,
  weaponCds,
  activeCd,
  activeMax,
  isAutoActive,
  onSwitchWeapon,
  onActivate,
  onToggleAuto,
  isPaused,
  onTogglePause,
  onOpenScreenSaver,
  isWorkshopOpen = false,
  onToggleWorkshop,
}: BattleHudBottomProps) {
  const activeOnCd = activeCd > 0;
  // 自動モード時はアクティブボタン無効
  const activeDisabled = isAutoActive || activeOnCd;

  // 武器 CD 中かどうか（切替後 3 秒間は全武器切替不可）
  const isSwapCd = WEAPON_ORDER.some((w) => w !== equippedWeapon && (weaponCds[w] ?? 100) < 100);

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
              active={weapon === equippedWeapon}
              cdProgress={weaponCds[weapon] ?? 100}
              swapDisabled={isSwapCd && weapon !== equippedWeapon}
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
              // 「発動 = 0 → 時計回りで溜まっていく」 仕様。 activeCd は残り CD 秒数なので
              // 経過時間 = activeMax - activeCd を進捗値として渡す。
              value={activeOnCd ? activeMax - activeCd : activeMax}
              max={activeMax > 0 ? activeMax : 1}
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

          {/* MANUAL / AUTO 切替ボタン (pill 形・click で toggle) */}
          <button
            type="button"
            className={[styles.modeToggle, isAutoActive ? styles.modeToggleOn : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => onToggleAuto(!isAutoActive)}
            aria-pressed={isAutoActive}
            aria-label={
              isAutoActive
                ? 'アクティブスキルを手動モードに切り替え'
                : 'アクティブスキルを自動モードに切り替え'
            }
          >
            {isAutoActive ? 'AUTO' : 'MANUAL'}
          </button>
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
