import styles from './style.module.scss';

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'sunken'
  | 'ghost'
  | 'accent'
  | 'secondary'
  | 'danger'
  // 後方互換エイリアス
  | 'flat'
  | 'outline';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'sm' | 'md' | 'l';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  padding?: CardPadding;
  radius?: CardRadius;
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  interactive = false,
  padding = 'md',
  radius,
  className,
}: CardProps) {
  const classNames = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    radius != null ? styles[`radius-${radius}`] : '',
    interactive ? styles.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
