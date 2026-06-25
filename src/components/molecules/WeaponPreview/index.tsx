import styles from './style.module.scss';

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
  /** アクティブスキルの説明文（カード末尾に「ACTIVE」ラベル付きで表示） */
  activeSkillDescription?: string;
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
  activeSkillDescription,
  stats,
  layout = 'tall',
  active = false,
  locked = false,
  onClick,
}: WeaponPreviewProps) {
  const isWide = layout === 'wide';
  const interactive = onClick != null && !locked;

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
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
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
      <div
        className={styles.card}
        style={interactive ? { cursor: 'pointer' } : undefined}
      >
        {/* シアン枠アイコンタイル */}
        <div
          className={styles.iconTile}
          aria-hidden
        >
          <Icon
            name={weapon}
            size={isWide ? 40 : 52}
          />
        </div>

        {/* 情報側 */}
        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <span className={styles.name}>{name}</span>
              {description != null && description.length > 0 && (
                <span className={styles.description}>{description}</span>
              )}
            </div>
          </div>

          {/* ステータス: 2x2 grid */}
          {!locked && stats.length > 0 && (
            <div className={styles.statGrid}>
              {stats.map((stat) => {
                const displayValue =
                  stat.suffix != null
                    ? `${typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}${stat.suffix}`
                    : typeof stat.value === 'number'
                      ? stat.value.toLocaleString()
                      : stat.value;
                return (
                  <div
                    key={stat.label}
                    className={styles.statChip}
                  >
                    <span className={styles.statLabel}>{stat.label}</span>
                    <span
                      className={styles.statValue}
                      style={stat.accent != null ? { color: ACCENT_COLOR[stat.accent] } : undefined}
                    >
                      {displayValue}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* アクティブスキル説明 (locked 中は非表示) */}
          {!locked && activeSkillDescription != null && activeSkillDescription.length > 0 && (
            <div className={styles.activeSkill}>
              <span className={styles.activeSkillLabel}>ACTIVE</span>
              <span className={styles.activeSkillText}>{activeSkillDescription}</span>
            </div>
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
        </div>
      </div>
    </div>
  );
}
