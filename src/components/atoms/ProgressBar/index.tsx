import type { CSSProperties } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type ProgressBarColor = 'hp' | 'hp-low' | 'cd' | 'wave' | 'shield' | 'primary' | 'secondary';

export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  max: number;
  color?: ProgressBarColor;
  size?: ProgressBarSize;
  showLabel?: boolean;
  glow?: boolean;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー
// ---------------------------------------------------------------------------

const COLOR_VAR: Record<ProgressBarColor, string> = {
  hp: 'var(--c-hp)',
  'hp-low': 'var(--c-hp-low)',
  cd: 'var(--c-cd)',
  wave: 'var(--c-wave)',
  shield: 'var(--c-shield)',
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
};

const GLOW_VAR: Record<ProgressBarColor, string> = {
  hp: 'var(--glow-success-md)',
  'hp-low': 'var(--glow-danger-md)',
  cd: 'var(--glow-cyan-md)',
  wave: 'var(--glow-purple-md)',
  shield: 'var(--glow-cyan-md)',
  primary: 'var(--glow-cyan-md)',
  secondary: 'var(--glow-purple-md)',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function ProgressBar({
  value,
  max,
  color = 'primary',
  size = 'md',
  showLabel = false,
  glow = false,
}: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const safeValue = Math.min(Math.max(0, value), safeMax);
  const pct = (safeValue / safeMax) * 100;

  const colorVar = COLOR_VAR[color];
  const glowVar = glow ? GLOW_VAR[color] : undefined;

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const fillStyle: CSSProperties = {
    width: `${pct}%`,
    backgroundColor: colorVar,
    ...(glowVar !== undefined ? { boxShadow: glowVar } : {}),
  };

  return (
    <div
      className={`${styles.root} ${sizeClass}`}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={`${safeValue} / ${safeMax}`}
    >
      <div
        className={styles.fill}
        style={fillStyle}
      />
      {showLabel && (
        <span className={styles.label}>
          {safeValue} / {safeMax}
        </span>
      )}
    </div>
  );
}
