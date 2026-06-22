import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  /** アイコンをラベル左に表示（iconLeft の後方互換エイリアス） */
  icon?: ReactNode;
  /** アイコンをラベル左に表示 */
  iconLeft?: ReactNode;
  /** タブ形式: underline（デフォルト）/ pill */
  variant?: 'underline' | 'pill';
  /** サイズ: md（デフォルト）/ sm */
  size?: 'sm' | 'md';
  /** バッジ表示（数値や文字列） */
  badge?: string | number;
  disabled?: boolean;
}

/**
 * 単独の Tab Atom。複数を並べる TabBar は Molecule 層。
 * active=true のとき下線（underline）またはpill強調（pill variant）。
 */
export function Tab({
  label,
  active = false,
  onClick,
  icon,
  iconLeft,
  variant = 'underline',
  size = 'md',
  badge,
  disabled = false,
}: TabProps) {
  const iconNode = iconLeft ?? icon;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={[
        styles.tab,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        active ? styles.active : '',
        disabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={disabled ? undefined : onClick}
    >
      {iconNode != null && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {iconNode}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {badge != null && <span className={styles.badge}>{badge}</span>}
      {variant === 'underline' && (
        <span
          className={styles.indicator}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
