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

export interface PatchCardProps {
  name: string;
  iconName: IconName;
  tier: number;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchCard({ name, iconName, tier, count, selected = false, onClick }: PatchCardProps) {
  const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 5);
  const tierColorVar = `var(--c-patch-t${clampedTier})`;

  const rootStyle: CSSProperties = selected
    ? { boxShadow: 'var(--glow-cyan-md)' }
    : undefined as unknown as CSSProperties;

  return (
    <div
      className={[styles.root, selected ? styles.selected : ''].filter(Boolean).join(' ')}
      style={rootStyle}
      onClick={onClick}
      role={onClick !== undefined ? 'button' : undefined}
      tabIndex={onClick !== undefined ? 0 : undefined}
      onKeyDown={
        onClick !== undefined
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <Card
        variant="elevated"
        padding="sm"
        interactive={onClick !== undefined}
        className={styles.card}
      >
        {/* アイコン */}
        <div className={styles.iconWrap}>
          <Icon
            name={iconName}
            size={24}
            color={tierColorVar}
          />
        </div>

        {/* 名前 */}
        <Text
          variant="caption"
          color="mid"
          className={styles.name}
        >
          {name}
        </Text>

        {/* Tier バッジ */}
        <Badge
          text={`T${clampedTier}`}
          variant="patch-tier"
          tier={tier}
        />

        {/* 所持数 */}
        <span
          className={styles.count}
          style={{ color: tierColorVar }}
        >
          ×{count}
        </span>
      </Card>
    </div>
  );
}
