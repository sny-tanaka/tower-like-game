import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { PatchCard } from '@/components/molecules/PatchCard';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface PatchInfo {
  patchId: string;
  name: string;
  iconName: IconName;
  tier: number;
  trigger: string;
  effect: string;
  count: number;
}

export type PatchSlotSize = 'sm' | 'md' | 'lg';

export interface PatchSlotProps {
  /** 装着済みパッチ（null = 空きスロット） */
  patch?: PatchInfo | null;
  /** スロット番号（空き / ロック 表示に使用） */
  slotIndex?: number;
  /** ロック済みスロット */
  locked?: boolean;
  size?: PatchSlotSize;
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchSlot({
  patch = null,
  slotIndex,
  locked = false,
  size = 'md',
  onClick,
}: PatchSlotProps) {
  const isFilled = patch != null;
  const isInteractive = onClick != null && !locked;

  const slotLabel = slotIndex != null ? `Slot ${slotIndex}` : '';
  const ariaLabel = isFilled
    ? `Slot ${slotIndex ?? ''}: ${patch.name} (Tier ${patch.tier})`
    : locked
      ? `Slot ${slotIndex ?? ''} (locked)`.trim()
      : `Slot ${slotIndex ?? ''} (empty)`.trim();

  const stateClass = isFilled ? styles.filled : locked ? styles.locked : styles.empty;

  return (
    <div
      className={[styles.wrapper, stateClass, styles[`size-${size}`]].filter(Boolean).join(' ')}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-disabled={locked ? true : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {isFilled && patch != null ? (
        <PatchCard
          patchId={patch.patchId}
          name={patch.name}
          iconName={patch.iconName}
          tier={patch.tier}
          count={patch.count}
          trigger={patch.trigger}
          effect={patch.effect}
          size={size}
        />
      ) : (
        <div className={styles.slotInner}>
          <span className={styles.emptyIcon}>
            <Icon
              name={locked ? 'close' : 'plus'}
              size={28}
              color={locked ? 'var(--c-text-disabled)' : 'var(--c-text-dim)'}
            />
          </span>
          <span className={styles.emptyLabel}>{locked ? 'LOCKED' : slotLabel}</span>
        </div>
      )}
    </div>
  );
}
