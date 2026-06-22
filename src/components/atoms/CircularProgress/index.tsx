import type { ReactNode } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type CircularProgressColor = 'hp' | 'cd' | 'wave' | 'primary' | 'warning';

export interface CircularProgressProps {
  /**
   * 進捗値。
   * - `max` を指定しない場合: 0〜100 のパーセント値として扱う。
   * - `max` を指定する場合: 0〜max の絶対値として扱う（後方互換）。
   */
  value: number;
  /** 絶対値モード用の最大値。省略時は value を 0-100 のパーセントとして扱う。 */
  max?: number;
  size?: number;
  color?: CircularProgressColor;
  thickness?: number;
  glow?: boolean;
  showLabel?: boolean;
  /** showLabel=true のときに表示する文字列。省略時は value% を表示。 */
  label?: string;
  /** 中央に表示する子要素（Icon等） */
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー
// ---------------------------------------------------------------------------

const COLOR_VAR: Record<CircularProgressColor, string> = {
  hp: 'var(--c-hp)',
  cd: 'var(--c-cd)',
  wave: 'var(--c-wave)',
  primary: 'var(--c-primary)',
  warning: 'var(--c-warning)',
};

const GLOW_VAR: Record<CircularProgressColor, string> = {
  hp: 'var(--glow-success-md)',
  cd: 'var(--glow-cyan-md)',
  wave: 'var(--glow-purple-md)',
  primary: 'var(--glow-cyan-md)',
  warning: '0 0 12px rgba(246,185,74,0.55)',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function CircularProgress({
  value,
  max,
  size = 24,
  color = 'primary',
  thickness = 3,
  glow = false,
  showLabel = false,
  label,
  children,
}: CircularProgressProps) {
  // max が指定されていれば絶対値モード（後方互換）、なければパーセントモード
  const ratio =
    max != null
      ? Math.min(Math.max(0, value), Math.max(1, max)) / Math.max(1, max)
      : Math.min(Math.max(0, value), 100) / 100;

  // aria 用の値
  const ariaValueNow = max != null ? Math.min(Math.max(0, value), Math.max(1, max)) : value;
  const ariaValueMax = max != null ? Math.max(1, max) : 100;

  const colorVar = COLOR_VAR[color];
  const glowStyle = glow ? GLOW_VAR[color] : undefined;

  // SVG 円弧の計算
  const center = size / 2;
  const radius = center - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);

  const hasCenter = showLabel || children != null;

  // showLabel のテキスト
  const labelText = label ?? `${Math.round(ratio * 100)}%`;

  return (
    <span
      className={styles.root}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.svg}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="progressbar"
        aria-valuenow={ariaValueNow}
        aria-valuemin={0}
        aria-valuemax={ariaValueMax}
        aria-label={label ?? `${ariaValueNow} / ${ariaValueMax}`}
      >
        {/* 背景トラック */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--c-surface)"
          strokeWidth={thickness}
        />
        {/* 進捗アーク */}
        <circle
          className={styles.arc}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={colorVar}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={glowStyle != null ? { filter: `drop-shadow(0 0 4px ${colorVar})` } : undefined}
          // 12時方向から開始するため -90度 回転
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      {/* 中央コンテンツ（label または children） */}
      {hasCenter && (
        <span className={styles.center}>
          {children != null ? (
            children
          ) : (
            <span
              className={styles.labelText}
              style={{ color: colorVar }}
            >
              {labelText}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
