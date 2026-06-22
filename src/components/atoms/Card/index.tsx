import styles from './style.module.scss';

export type CardVariant = 'elevated' | 'flat' | 'outline';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  padding?: CardPadding;
  className?: string;
}

export function Card({
  children,
  variant = 'elevated',
  interactive = false,
  padding = 'md',
  className,
}: CardProps) {
  const classNames = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    interactive ? styles.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
