export type NumericDecimals = number | 'auto';
export type NumericAccent =
  | 'scale' // 桁数に応じて cyan → purple へ動的補間（既定）
  | 'text'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'dim';
export type NumericSize = 'sm' | 'md' | 'lg' | 'xl';

export interface NumericDisplayProps {
  /** 表示する値 (number) */
  value: number;
  /** 仮数部桁数。'auto' は 1000 未満なら 0, それ以上は 2 */
  decimals?: NumericDecimals;
  /** 値の前 (例 '×') */
  prefix?: string;
  /** 値の後 (例 '%', ' Wave') */
  suffix?: string;
  /** 配色 */
  accentColor?: NumericAccent;
  /** 高さ。sm 13 / md 18 / lg 28 / xl 36 px */
  size?: NumericSize;
  /** text-shadow グロー */
  glow?: boolean;
  align?: 'left' | 'right' | 'center';
}

export declare function NumericDisplay(props: NumericDisplayProps): JSX.Element;
export declare function formatScale(value: number, decimals?: NumericDecimals): string;
/** 桁 index を返す。raw=0, A=1, B=2, ..., Z=26, AA=27, ... */
export declare function scaleExponent(value: number): number;
/** 桁 index に対応する oklch 色（cyan→purple グラデ） */
export declare function scaleTierColor(e: number): { color: string; glow: string };
