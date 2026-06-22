import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface TabProps {
  label: string;
  active: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

/**
 * 単独の Tab Atom。複数を並べる TabBar は Molecule 層。
 * active=true のとき下線 + テキスト色変化。
 */
export function Tab({ label, active, onClick, icon }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={[styles.tab, active ? styles.active : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {icon != null && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      <span
        className={styles.indicator}
        aria-hidden="true"
      />
    </button>
  );
}
