import type { CSSProperties } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type ProgressBarColor =
  | 'hp'
  | 'hp-low'
  | 'cd'
  | 'wave'
  | 'shield'
  | 'xp'
  | 'primary'
  | 'secondary';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'solid' | 'neon';

export interface ProgressBarProps {
  value: number;
  max: number;
  color?: ProgressBarColor;
  size?: ProgressBarSize;
  /** solid: 通常のべた塗り, neon: ネオングロー付き */
  variant?: ProgressBarVariant;
  showLabel?: boolean;
  /** showLabel=true のときに表示するカスタムラベルテキスト */
  label?: string;
  glow?: boolean;
  /** true のとき右から左方向（残量表示）に描画 */
  reverse?: boolean;
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
  xp: 'var(--c-success)',
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
};

const GLOW_VAR: Record<ProgressBarColor, string> = {
  hp: 'var(--glow-success-md)',
  'hp-low': 'var(--glow-danger-md)',
  cd: 'var(--glow-cyan-md)',
  wave: 'var(--glow-purple-md)',
  shield: 'var(--glow-cyan-md)',
  xp: 'var(--glow-success-md)',
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
  variant = 'solid',
  showLabel = false,
  label,
  glow = false,
  reverse = false,
}: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const safeValue = Math.min(Math.max(0, value), safeMax);
  const pct = (safeValue / safeMax) * 100;

  const colorVar = COLOR_VAR[color];
  const glowVar = glow || variant === 'neon' ? GLOW_VAR[color] : undefined;

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const fillStyle: CSSProperties = {
    width: `${pct}%`,
    backgroundColor: colorVar,
    ...(glowVar != null ? { boxShadow: glowVar } : {}),
    ...(reverse ? { marginLeft: 'auto' } : {}),
  };

  // カスタムラベルか自動生成か
  const labelContent = label ?? `${safeValue} / ${safeMax}`;

  return (
    <div
      className={`${styles.root} ${sizeClass}`}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label ?? `${safeValue} / ${safeMax}`}
    >
      <div
        className={styles.fill}
        style={fillStyle}
      />
      {showLabel && <span className={styles.label}>{labelContent}</span>}
    </div>
  );
}
