export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** ボタン文字列。children と二者択一 */
  label?: string;
  /** 見た目バリアント */
  variant?: ButtonVariant;
  /** 高さ。sm=32 / md=40 / lg=48 */
  size?: ButtonSize;
  /** 押下不可 */
  disabled?: boolean;
  /** 親幅いっぱいに広げる */
  fullWidth?: boolean;
  /** 左アイコン（Icon Atom など） */
  iconLeft?: React.ReactNode;
  /** 右アイコン */
  iconRight?: React.ReactNode;
  /** タップ */
  onClick?: () => void;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
