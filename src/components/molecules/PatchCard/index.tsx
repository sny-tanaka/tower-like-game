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
  sm: 22,
  md: 26,
  lg: 32,
};

const ICON_WRAP_SIZE: Record<PatchCardSize, number> = {
  sm: 38,
  md: 44,
  lg: 52,
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchCard({
  patchId,
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

  const iconWrapStyle: CSSProperties = {
    width: ICON_WRAP_SIZE[size],
    height: ICON_WRAP_SIZE[size],
    opacity: locked ? 0.35 : 1,
    background: locked
      ? 'var(--c-surface)'
      : `linear-gradient(135deg, ${tierColorVar}22, ${tierColorVar}08)`,
    border: locked ? '1px solid var(--c-border-faint)' : `1px solid ${tierColorVar}55`,
    filter: locked ? 'none' : `drop-shadow(0 0 4px ${tierColorVar}55)`,
  };

  const countDynamicStyle: CSSProperties = {
    background: count >= 2 ? `${tierColorVar}22` : undefined,
    borderColor: count >= 2 ? tierColorVar : undefined,
    color: count >= 2 ? tierColorVar : undefined,
  };

  return (
    <div
      data-patch-id={patchId}
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
        {/* Tier バッジ (左上) */}
        {!locked && (
          <span className={styles.tierBadge}>
            <Badge
              text={`T${clampedTier}`}
              variant="patch-tier"
              tier={tier}
            />
          </span>
        )}

        {/* 所持数 (右上) */}
        <span
          className={[styles.count, count === 0 ? styles.countZero : ''].filter(Boolean).join(' ')}
          style={countDynamicStyle}
        >
          ×{locked ? '?' : count}
        </span>

        {/* アイコン */}
        <div
          className={styles.iconWrap}
          style={iconWrapStyle}
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
          color={locked ? 'dim' : 'text'}
          className={styles.name}
        >
          {locked ? '???' : name}
        </Text>

        {/* trigger / effect — sm/md/lg すべてで表示 (locked 除く) */}
        {!locked && (
          <div className={styles.detail}>
            <span className={styles.trigger}>{trigger}</span>
            <span className={styles.effect}>{effect}</span>
          </div>
        )}

        {/* merging バッジ */}
        {merging && <span className={styles.mergingBadge}>合成中</span>}
      </Card>
    </div>
  );
}
