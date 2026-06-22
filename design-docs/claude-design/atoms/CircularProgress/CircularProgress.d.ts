export type CircularProgressColor =
  | 'cd'
  | 'wave'
  | 'hp'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'success'
  | string;

export interface CircularProgressProps {
  /** 現在値 */
  value: number;
  /** 最大値 (default 100) */
  max?: number;
  /** 径 px (default 32) */
  size?: number;
  /** リング太さ px (default 3) */
  thickness?: number;
  /** 配色プリセット or 任意 CSS 値 */
  color?: CircularProgressColor;
  /** 時計回り→反時計回り */
  reverse?: boolean;
  /** 中央にラベルを表示（label or children を入れる） */
  showLabel?: boolean;
  /** showLabel 時のテキスト。省略時は % */
  label?: string;
  /** ドロップシャドウのグロー付与 */
  glow?: boolean;
  /** 中央の任意要素（数値・アイコン等） */
  children?: React.ReactNode;
}

export declare function CircularProgress(props: CircularProgressProps): JSX.Element;
