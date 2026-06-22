export type ProgressColor = 'hp' | 'cd' | 'wave' | 'shield' | 'xp' | 'danger';
export type ProgressVariant = 'solid' | 'neon';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** 現在値 */
  value: number;
  /** 最大値 (default 100) */
  max?: number;
  /** 配色プリセット */
  color?: ProgressColor;
  /** 塗り or ネオン上端 */
  variant?: ProgressVariant;
  /** 高さ。sm 4 / md 8 / lg 12 px */
  size?: ProgressSize;
  /** true で右→左に減少（残量バー） */
  reverse?: boolean;
  /** color='hp' のとき赤に切り替わるしきい値 (0-1) */
  lowThreshold?: number;
  /** インライン中央ラベル表示 */
  showLabel?: boolean;
  /** showLabel 時の文字列。省略時は % 表示 */
  label?: string;
}

export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
