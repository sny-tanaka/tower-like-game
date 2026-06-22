import styles from './style.module.scss';

import { CircularProgress } from '@/components/atoms/CircularProgress';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { BottomSheetHandle } from '@/components/molecules/BottomSheetHandle';
import { WeaponSlotIcon } from '@/components/molecules/WeaponSlotIcon';
import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';
import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type GameSpeed = 1 | 2 | 3;

const WEAPON_ORDER: readonly WeaponType[] = ['laser', 'cannon', 'thunder', 'cutter'];

const SPEED_OPTIONS = [
  { label: '1x', value: 1 as GameSpeed },
  { label: '2x', value: 2 as GameSpeed },
  { label: '3x', value: 3 as GameSpeed },
] as const;

export interface BattleHudBottomProps {
  /** ネジ残高 */
  screw: BigNum;
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
  /** 速度切替 */
  gameSpeed: GameSpeed;
  onSpeedChange: (speed: GameSpeed) => void;
  /** 一時停止中か */
  isPaused: boolean;
  onTogglePause: () => void;
  /** メニューを開く */
  onOpenMenu: () => void;
  /** スクリーンセーバーを開く */
  onOpenScreenSaver: () => void;
  /** ラン内ワークショップ (BottomSheet) を開く。ハンドルをタップで発火 */
  onOpenWorkshop?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function BattleHudBottom({
  screw,
  equippedWeapon,
  weaponCds,
  activeCd,
  activeMax,
  isAutoActive,
  onSwitchWeapon,
  onActivate,
  onToggleAuto,
  gameSpeed,
  onSpeedChange,
  isPaused,
  onTogglePause,
  onOpenMenu,
  onOpenScreenSaver,
  onOpenWorkshop,
}: BattleHudBottomProps) {
  const activeOnCd = activeCd > 0;
  // 自動モード時はアクティブボタン無効
  const activeDisabled = isAutoActive || activeOnCd;

  // 武器 CD 中かどうか（切替後 3 秒間は全武器切替不可）
  const isSwapCd = WEAPON_ORDER.some((w) => w !== equippedWeapon && (weaponCds[w] ?? 100) < 100);

  return (
    <div className={styles.root}>
      {/* BottomSheet ハンドル: tap でラン中ワークショップを開く */}
      {onOpenWorkshop != null && (
        <button
          type="button"
          className={styles.sheetHandleTrigger}
          onClick={onOpenWorkshop}
          aria-label="ラン中ワークショップを開く"
        >
          <BottomSheetHandle />
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
              value={activeOnCd ? activeCd : activeMax}
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

      {/* ──── 下段: 通貨 + 速度切替 + 一時停止 + メニュー + SS ──── */}
      <div className={styles.bottomRow}>
        {/* 通貨大表示 (左端) */}
        <div className={styles.currencyArea}>
          <CurrencyAmount
            currency="screw"
            value={screw}
            size="lg"
          />
        </div>

        {/* 速度切替 (中央) */}
        <div className={styles.speedArea}>
          <SegmentedControl
            options={SPEED_OPTIONS}
            value={gameSpeed}
            onChange={onSpeedChange}
            size="sm"
          />
        </div>

        {/* システムボタン (右端) */}
        <div className={styles.sysButtons}>
          <IconButton
            icon={isPaused ? 'play' : 'pause'}
            label={isPaused ? '再開' : '一時停止'}
            size="md"
            variant="ghost"
            active={isPaused}
            onClick={onTogglePause}
          />
          <IconButton
            icon="menu"
            label="メニューを開く"
            size="md"
            variant="ghost"
            onClick={onOpenMenu}
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
