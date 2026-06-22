export type BadgeVariant =
  | 'tier'
  | 'patch-tier'
  | 'elite'
  | 'boss'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** 表示文字列。tier / patch-tier では省略可（自動で 'T<n>'） */
  text?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** variant=tier / patch-tier で使用 */
  tier?: number;
  /** ネオン発光 */
  glow?: boolean;
  iconLeft?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
