import type { ReactNode } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type CircularProgressColor = 'hp' | 'cd' | 'wave' | 'primary' | 'warning';

/** 4 段の名前付きサイズ。数値直指定も併用可能。 */
export type CircularProgressSizeName = 'xs' | 'sm' | 'md' | 'lg';

export type CircularProgressSize = number | CircularProgressSizeName;

/** 名前付き size → px のマップ */
const SIZE_PX_MAP: Record<CircularProgressSizeName, number> = {
  xs: 20,
  sm: 32,
  md: 48,
  lg: 64,
};

export interface CircularProgressProps {
  /**
   * 進捗値。
   * - `max` を指定しない場合: 0〜100 のパーセント値として扱う。
   * - `max` を指定する場合: 0〜max の絶対値として扱う（後方互換）。
   */
  value: number;
  /** 絶対値モード用の最大値。省略時は value を 0-100 のパーセントとして扱う。 */
  max?: number;
  /**
   * 径。数値 px もしくは 'xs' / 'sm' / 'md' / 'lg'。
   * - 'xs' = 20, 'sm' = 32, 'md' = 48, 'lg' = 64
   */
  size?: CircularProgressSize;
  color?: CircularProgressColor;
  thickness?: number;
  glow?: boolean;
  /** 中央にラベル文字を表示するか。`children` が渡された場合は children が優先される。 */
  showLabel?: boolean;
  /**
   * `showLabel` のエイリアス。design ref に合わせて追加。
   * 互換のため両方残し、どちらか true なら表示する。
   */
  withLabel?: boolean;
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
  withLabel = false,
  label,
  children,
}: CircularProgressProps) {
  // 名前付き size → px に解決
  const sizePx: number = typeof size === 'number' ? size : SIZE_PX_MAP[size];

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
  const center = sizePx / 2;
  const radius = center - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);

  // showLabel / withLabel どちらかが true なら中央ラベル領域を表示
  const labelEnabled = showLabel || withLabel;
  const hasCenter = labelEnabled || children != null;

  // showLabel のテキスト
  const labelText = label ?? `${Math.round(ratio * 100)}%`;

  return (
    <span
      className={styles.root}
      style={{ width: sizePx, height: sizePx }}
    >
      <svg
        className={styles.svg}
        width={sizePx}
        height={sizePx}
        viewBox={`0 0 ${sizePx} ${sizePx}`}
        xmlns="http://www.w3.org/2000/svg"
        role="progressbar"
        aria-valuenow={ariaValueNow}
        aria-valuemin={0}
        aria-valuemax={ariaValueMax}
        aria-label={label ?? `${ariaValueNow} / ${ariaValueMax}`}
      >
        {/* 背景トラック: 常時表示の薄いグレー（design ref より） */}
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
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
