import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type PatchCardSize = 'sm' | 'md' | 'lg';

export interface PatchCardProps {
  patchId: string;
  name: string;
  iconName: IconName;
  tier: number;
  count: number;
  trigger: string;
  effect: string;
  selected?: boolean;
  merging?: boolean;
  locked?: boolean;
  disabled?: boolean;
  size?: PatchCardSize;
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// サイズ設定
// ---------------------------------------------------------------------------

const ICON_SIZE: Record<PatchCardSize, number> = {
  sm: 18,
  md: 24,
  lg: 30,
};

const ICON_WRAP_SIZE: Record<PatchCardSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchCard({
  name,
  iconName,
  tier,
  count,
  trigger,
  effect,
  selected = false,
  merging = false,
  locked = false,
  disabled = false,
  size = 'md',
  onClick,
}: PatchCardProps) {
  const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 5);
  const tierColorVar = `var(--c-patch-t${clampedTier})`;

  const isInteractive = onClick != null && !disabled && !locked;

  const rootStyle: CSSProperties = (() => {
    if (selected) return { boxShadow: 'var(--glow-cyan-md)' };
    if (merging) return { boxShadow: 'var(--glow-purple-md)' };
    return {} as CSSProperties;
  })();

  return (
    <div
      className={[
        styles.root,
        selected ? styles.selected : '',
        merging ? styles.merging : '',
        locked ? styles.locked : '',
        disabled ? styles.disabled : '',
        styles[`size-${size}`],
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
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
      aria-pressed={isInteractive ? selected : undefined}
      aria-disabled={disabled || locked ? true : undefined}
    >
      <Card
        variant="elevated"
        padding="sm"
        interactive={isInteractive}
        className={styles.card}
      >
        {/* アイコン */}
        <div
          className={styles.iconWrap}
          style={{
            width: ICON_WRAP_SIZE[size],
            height: ICON_WRAP_SIZE[size],
            opacity: locked ? 0.35 : 1,
          }}
        >
          <Icon
            name={locked ? 'close' : iconName}
            size={ICON_SIZE[size]}
            color={locked ? 'var(--c-text-disabled)' : tierColorVar}
          />
        </div>

        {/* 名前 */}
        <Text
          variant="caption"
          color={locked ? 'dim' : 'mid'}
          className={styles.name}
        >
          {locked ? '???' : name}
        </Text>

        {/* Tier バッジ */}
        {!locked && (
          <Badge
            text={`T${clampedTier}`}
            variant="patch-tier"
            tier={tier}
          />
        )}

        {/* trigger / effect — sm サイズでは省略 */}
        {size !== 'sm' && !locked && (
          <div className={styles.detail}>
            <span className={styles.trigger}>{trigger}</span>
            <span className={styles.effect}>{effect}</span>
          </div>
        )}

        {/* 所持数 */}
        <span
          className={[styles.count, count === 0 ? styles.countZero : ''].filter(Boolean).join(' ')}
          style={{ color: count === 0 ? 'var(--c-text-disabled)' : tierColorVar }}
        >
          ×{locked ? '?' : count}
        </span>

        {/* merging バッジ */}
        {merging && <span className={styles.mergingBadge}>合成中</span>}
      </Card>
    </div>
  );
}
