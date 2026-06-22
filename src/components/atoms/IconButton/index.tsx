import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface IconButtonProps {
  icon: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'ghost';
}

export function IconButton({
  icon,
  label,
  size = 'md',
  disabled = false,
  onClick,
  variant = 'default',
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={[styles.iconButton, styles[`variant-${variant}`], styles[`size-${size}`]]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled}
    >
      <span
        className={styles.iconWrap}
        aria-hidden="true"
      >
        {icon}
      </span>
    </button>
  );
}
