import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        fullWidth ? styles.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {iconLeft != null && (
        <span
          className={styles.iconLeft}
          aria-hidden="true"
        >
          {iconLeft}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {iconRight != null ? (
        <span
          className={styles.iconRight}
          aria-hidden="true"
        >
          {iconRight}
        </span>
      ) : iconLeft != null ? (
        // iconLeft の対称スペーサー: label をボタン全体に対して真の中央に揃える
        <span
          className={`${styles.iconRight} ${styles.iconSpacer}`}
          aria-hidden="true"
        >
          {iconLeft}
        </span>
      ) : null}
    </button>
  );
}
