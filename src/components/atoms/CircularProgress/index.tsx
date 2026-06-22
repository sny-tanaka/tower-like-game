import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type CircularProgressColor = 'hp' | 'cd' | 'wave' | 'primary';

export interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  color?: CircularProgressColor;
  thickness?: number;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー
// ---------------------------------------------------------------------------

const COLOR_VAR: Record<CircularProgressColor, string> = {
  hp: 'var(--c-hp)',
  cd: 'var(--c-cd)',
  wave: 'var(--c-wave)',
  primary: 'var(--c-primary)',
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
}: CircularProgressProps) {
  const safeMax = Math.max(1, max);
  const safeValue = Math.min(Math.max(0, value), safeMax);
  const ratio = safeValue / safeMax;

  const colorVar = COLOR_VAR[color];

  // SVG 円弧の計算
  // center, radius は thickness を考慮
  const center = size / 2;
  const radius = center - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);

  return (
    <svg
      className={styles.root}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={`${safeValue} / ${safeMax}`}
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
        // 12時方向から開始するため -90度 回転
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  );
}
