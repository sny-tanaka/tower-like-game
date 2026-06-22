import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';

export interface WeaponStat {
  label: string;
  value: string;
}

export interface WeaponPreviewProps {
  weapon: WeaponType;
  name: string;
  stats: ReadonlyArray<WeaponStat>;
  activeName: string;
  activeDesc: string;
  selected?: boolean;
  onClick?: () => void;
}

export function WeaponPreview({
  weapon,
  name,
  stats,
  activeName,
  activeDesc,
  selected = false,
  onClick,
}: WeaponPreviewProps) {
  return (
    <div
      className={[styles.wrapper, selected ? styles.selected : ''].filter(Boolean).join(' ')}
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
      aria-pressed={onClick ? selected : undefined}
    >
      <Card
        variant="elevated"
        padding="md"
        interactive={!!onClick}
        className={styles.card}
      >
        {/* 上段: アイコン + 武器名 */}
        <div className={styles.header}>
          <span className={styles.iconWrap}>
            <Icon
              name={weapon}
              size={28}
              color={selected ? 'var(--c-primary)' : 'var(--c-text-mid)'}
            />
          </span>
          <Text
            variant="heading-3"
            color={selected ? 'primary' : 'default'}
          >
            {name}
          </Text>
        </div>

        {/* 中段: ステータス一覧 */}
        <ul className={styles.statList}>
          {stats.map((stat) => (
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
              <Text
                variant="label"
                color="mid"
              >
                {stat.value}
              </Text>
            </li>
          ))}
        </ul>

        {/* 下段: アクティブ */}
        <div className={styles.activeSection}>
          <Text
            variant="label"
            color="primary"
          >
            アクティブ: {activeName}
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            {activeDesc}
          </Text>
        </div>
      </Card>
    </div>
  );
}
