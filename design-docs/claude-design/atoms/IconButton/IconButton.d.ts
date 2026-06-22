export type IconButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type IconButtonShape = 'square' | 'round';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  /** Icon の name 文字列、または任意 ReactNode (SVG など) */
  icon: string | React.ReactNode;
  /** aria-label。必須 */
  label: string;
  variant?: IconButtonVariant;
  shape?: IconButtonShape;
  size?: IconButtonSize;
  /** アイコン径上書き。省略時は size に応じた自動値 */
  iconSize?: number;
  /** 選択状態（武器スロット選択中など） */
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
