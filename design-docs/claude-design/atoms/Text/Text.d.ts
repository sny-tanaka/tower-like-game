export type TextVariant =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'body'
  | 'caption'
  | 'label'
  | 'numeric-l'
  | 'numeric-m'
  | 'numeric-s';

export type TextColor =
  | 'text'
  | 'mid'
  | 'dim'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | string; // 任意の CSS 値も許容

export interface TextProps {
  variant?: TextVariant;
  /** 描画タグ。省略時は variant に応じた h1/h2/p/span */
  as?: keyof JSX.IntrinsicElements;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  /** 'label' variant 以外でも強制大文字化。省略時は variant に依存 */
  uppercase?: boolean;
  /** 1 行省略 */
  truncate?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Text(props: TextProps): JSX.Element;
