import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { Text } from '@/components/atoms/Text';

export interface PatchInfo {
  name: string;
  iconName: string;
  tier: number;
}

export interface PatchSlotProps {
  slotIndex: number;
  patch: PatchInfo | null;
  onClick?: () => void;
  onRemove?: () => void;
}

export function PatchSlot({ slotIndex, patch, onClick, onRemove }: PatchSlotProps) {
  const isEmpty = patch === null;

  return (
    <div
      className={[styles.wrapper, isEmpty ? styles.empty : styles.filled].filter(Boolean).join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={
        isEmpty
          ? `Slot ${slotIndex + 1} (empty)`
          : `Slot ${slotIndex + 1}: ${patch.name} (Tier ${patch.tier})`
      }
    >
      <Card
        variant="outline"
        padding="sm"
        interactive={!!onClick}
        className={styles.card}
      >
        {isEmpty ? (
          /* 空スロット */
          <div className={styles.emptyContent}>
            <Text
              variant="caption"
              color="dim"
            >
              Slot {slotIndex + 1}
            </Text>
          </div>
        ) : (
          /* 装着中 */
          <div className={styles.filledContent}>
            <span className={styles.patchIcon}>
              <Icon
                name={patch.iconName as IconName}
                size={20}
                color="var(--c-text-mid)"
              />
            </span>
            <div className={styles.patchInfo}>
              <Text
                variant="label"
                color="default"
              >
                {patch.name}
              </Text>
              <Badge
                text={`T${patch.tier}`}
                variant="patch-tier"
                tier={patch.tier}
              />
            </div>

            {onRemove && (
              <span
                className={styles.removeBtn}
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton
                  icon={
                    <Icon
                      name="close"
                      size={12}
                    />
                  }
                  label={`Remove ${patch.name}`}
                  size="sm"
                  variant="ghost"
                  onClick={onRemove}
                />
              </span>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
