import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface WeaponStat {
  label: string;
  value: number | string;
  suffix?: string;
  /** primary 等のアクセントカラーで強調表示 */
  accent?: 'primary' | 'secondary' | 'warning';
}

export type WeaponPreviewLayout = 'tall' | 'wide';

export interface WeaponPreviewProps {
  weapon: WeaponType;
  name: string;
  description?: string;
  stats: ReadonlyArray<WeaponStat>;
  /** tall (出撃準備 — 縦カード) / wide (武器庫詳細 — 横カード) */
  layout?: WeaponPreviewLayout;
  /** 現在選択/使用中か */
  active?: boolean;
  /** locked 武器 */
  locked?: boolean;
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// アクセントカラーマッピング
// ---------------------------------------------------------------------------

const ACCENT_COLOR: Record<NonNullable<WeaponStat['accent']>, string> = {
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  warning: 'var(--c-warning)',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponPreview({
  weapon,
  name,
  description,
  stats,
  layout = 'tall',
  active = false,
  locked = false,
  onClick,
}: WeaponPreviewProps) {
  const isWide = layout === 'wide';

  return (
    <div
      className={[
        styles.wrapper,
        active ? styles.active : '',
        locked ? styles.locked : '',
        isWide ? styles.wide : styles.tall,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={locked ? undefined : onClick}
      role={onClick != null && !locked ? 'button' : undefined}
      tabIndex={onClick != null && !locked ? 0 : undefined}
      onKeyDown={
        onClick != null && !locked
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-pressed={onClick != null ? active : undefined}
    >
      <Card
        variant="elevated"
        padding="md"
        interactive={onClick != null && !locked}
        className={styles.card}
      >
        {/* ヘッダー: アイコン + 武器名 + description */}
        <div className={styles.header}>
          <span className={styles.iconWrap}>
            <Icon
              name={weapon}
              size={isWide ? 24 : 28}
              color={
                active
                  ? 'var(--c-primary)'
                  : locked
                    ? 'var(--c-text-disabled)'
                    : 'var(--c-text-mid)'
              }
            />
          </span>
          <div className={styles.headerText}>
            <Text
              variant={isWide ? 'label' : 'heading-3'}
              color={active ? 'primary' : locked ? 'disabled' : 'default'}
            >
              {name}
            </Text>
            {description != null && description.length > 0 && (
              <Text
                variant="caption"
                color="dim"
                className={styles.description}
              >
                {description}
              </Text>
            )}
          </div>
        </div>

        {/* ステータス一覧 */}
        {!locked && stats.length > 0 && (
          <ul className={styles.statList}>
            {stats.map((stat) => {
              const displayValue =
                stat.suffix != null
                  ? `${typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}${stat.suffix}`
                  : typeof stat.value === 'number'
                    ? stat.value.toLocaleString()
                    : stat.value;

              return (
                <li
                  key={stat.label}
                  className={styles.statRow}
                >
                  <Text
                    variant="caption"
                    color="dim"
                  >
                    {stat.label}
                  </Text>
                  <span
                    className={styles.statValue}
                    style={stat.accent != null ? { color: ACCENT_COLOR[stat.accent] } : undefined}
                  >
                    {displayValue}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* locked 表示 */}
        {locked && (
          <div className={styles.lockedBadge}>
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
      </Card>
    </div>
  );
}
