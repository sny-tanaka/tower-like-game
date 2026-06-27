import styles from './style.module.scss';

import { CircularProgress } from '@/components/atoms/CircularProgress';
import { Icon } from '@/components/atoms/Icon';
import { WeaponReadyFx } from '@/components/fx/WeaponReadyFx';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type WeaponType = 'laser' | 'cannon' | 'thunder' | 'cutter';

export type WeaponSlotIconSize = 'sm' | 'md' | 'lg';

export interface WeaponSlotIconProps {
  weapon: WeaponType;
  /** 現在このスロットが選択/使用中か */
  active?: boolean;
  /** CD が完了してスワップ可能な状態 */
  ready?: boolean;
  /** CD 進捗 0-100 (100 = CD 完了) */
  cdProgress?: number;
  /** 切替 CD 中フラグ。true の場合タップ無効でうっすら暗転 */
  swapDisabled?: boolean;
  size?: WeaponSlotIconSize;
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// サイズ設定
// ---------------------------------------------------------------------------

const SIZE_PX: Record<WeaponSlotIconSize, number> = {
  sm: 40,
  md: 52,
  lg: 64,
};

const ICON_SIZE_PX: Record<WeaponSlotIconSize, number> = {
  sm: 18,
  md: 24,
  lg: 30,
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponSlotIcon({
  weapon,
  active = false,
  ready = false,
  cdProgress = 100,
  swapDisabled = false,
  size = 'md',
  onClick,
}: WeaponSlotIconProps) {
  const slotPx = SIZE_PX[size];
  const iconPx = ICON_SIZE_PX[size];

  const onCd = cdProgress < 100;

  const showReadyFx = !active && !onCd && ready;

  const sizeClass = size === 'sm' ? styles.sizeSm : size === 'lg' ? styles.sizeLg : styles.sizeMd;

  const classNames = [
    styles.root,
    sizeClass,
    active ? styles.active : '',
    onCd ? styles.onCd : '',
    swapDisabled ? styles.swapDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={swapDisabled ? undefined : onClick}
      disabled={swapDisabled && onClick == null}
      aria-label={`${weapon} weapon slot${active ? ' (active)' : ''}${onCd ? ` (cooldown ${cdProgress}%)` : ready ? ' (ready)' : ''}`}
      aria-pressed={active}
    >
      {/* 武器アイコン */}
      <span className={styles.iconWrap}>
        <Icon
          name={weapon}
          size={iconPx}
          color={active ? 'var(--c-primary)' : 'var(--c-text-mid)'}
        />
      </span>

      {/* CD 中: 暗転オーバーレイ + CircularProgress */}
      {onCd && (
        <>
          <span
            className={styles.cdOverlay}
            aria-hidden="true"
          />
          <span
            className={styles.cdProgress}
            aria-hidden="true"
          >
            <CircularProgress
              value={cdProgress}
              max={100}
              size={slotPx - 4}
              color="cd"
              thickness={size === 'sm' ? 2 : 3}
            />
          </span>
        </>
      )}

      {/* ready 発光 Fx (CD 完了・切替可能かつ非アクティブ時にマウント) */}
      {showReadyFx && <WeaponReadyFx />}

      {/* swapDisabled 暗転 */}
      {swapDisabled && (
        <span
          className={styles.swapOverlay}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
