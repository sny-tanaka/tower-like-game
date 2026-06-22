export type CardVariant =
  | 'default'
  | 'elevated'
  | 'sunken'
  | 'accent'
  | 'secondary'
  | 'danger'
  | 'ghost';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'sm' | 'md' | 'l';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  /** hover で border ハイライト + 持ち上げ */
  interactive?: boolean;
  /** タグ上書き (default 'div') */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
