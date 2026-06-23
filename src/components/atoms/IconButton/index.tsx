import type { ReactNode } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';

export interface IconButtonProps {
  /**
   * アイコン。文字列（Icon Atom の name）または ReactNode を受け付ける。
   * - string の場合: Icon Atom を自動レンダリング
   * - ReactNode の場合: そのままレンダリング（後方互換）
   */
  icon: string | ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'default';
  /** ボタンの形状。square=角丸四角、round=円形 */
  shape?: 'square' | 'round';
  /** アクティブ状態（武器スロット等で選択中を示す） */
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ICON_SIZE: Record<'sm' | 'md' | 'lg', number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

export function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  shape = 'square',
  active = false,
  disabled = false,
  onClick,
}: IconButtonProps) {
  // 'default' は後方互換エイリアス → 'ghost' として扱う
  const resolvedVariant = variant === 'default' ? 'ghost' : variant;

  const iconNode =
    typeof icon === 'string' ? (
      <Icon
        name={icon as Parameters<typeof Icon>[0]['name']}
        size={ICON_SIZE[size]}
      />
    ) : (
      icon
    );

  return (
    <button
      type="button"
      className={[
        styles.iconButton,
        styles[`variant-${resolvedVariant}`],
        styles[`size-${size}`],
        shape === 'round' ? styles.round : '',
        active ? styles.active : '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      aria-disabled={disabled}
    >
      <span
        className={styles.iconWrap}
        aria-hidden="true"
      >
        {iconNode}
      </span>
    </button>
  );
}
