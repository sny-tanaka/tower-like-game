import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';

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

  const slotNum = slotIndex != null ? slotIndex : '';

  return (
    <div
      className={[
        styles.wrapper,
        isFilled ? styles.filled : locked ? styles.locked : styles.empty,
        styles[`size-${size}`],
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
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
      aria-label={
        isFilled
          ? `Slot ${slotNum}: ${patch.name} (Tier ${patch.tier})`
          : locked
            ? `Slot ${slotNum} (locked)`
            : `Slot ${slotNum} (empty)`
      }
    >
      <Card
        variant="outline"
        padding="sm"
        interactive={isInteractive}
        className={styles.card}
      >
        {/* ロック */}
        {locked && (
          <div className={styles.lockedContent}>
            <Icon
              name="close"
              size={14}
              color="var(--c-text-disabled)"
            />
            <Text
              variant="caption"
              color="dim"
            >
              LOCKED
            </Text>
          </div>
        )}

        {/* 空きスロット */}
        {!locked && !isFilled && (
          <div className={styles.emptyContent}>
            <Text
              variant="caption"
              color="dim"
            >
              {slotNum !== '' ? `Slot ${slotNum}` : '+'}
            </Text>
          </div>
        )}

        {/* 装着中 */}
        {!locked && isFilled && patch != null && (
          <div className={styles.filledContent}>
            {/* アイコン */}
            <span
              className={styles.patchIcon}
              style={{
                color: `var(--c-patch-t${Math.min(Math.max(1, Math.floor(patch.tier)), 5)})`,
              }}
            >
              <Icon
                name={patch.iconName}
                size={size === 'sm' ? 14 : 18}
                color={`var(--c-patch-t${Math.min(Math.max(1, Math.floor(patch.tier)), 5)})`}
              />
            </span>

            {/* 情報エリア */}
            <div className={styles.patchInfo}>
              <div className={styles.patchTop}>
                <Text
                  variant="label"
                  color="default"
                  className={styles.patchName}
                >
                  {patch.name}
                </Text>
                <Badge
                  text={`T${Math.min(Math.max(1, Math.floor(patch.tier)), 5)}`}
                  variant="patch-tier"
                  tier={patch.tier}
                />
              </div>
              {size !== 'sm' && (
                <div className={styles.patchDetail}>
                  <span className={styles.trigger}>{patch.trigger}</span>
                  <span className={styles.effect}>{patch.effect}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
