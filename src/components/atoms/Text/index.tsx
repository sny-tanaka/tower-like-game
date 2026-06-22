import type { ElementType, ReactNode } from 'react';

import styles from './style.module.scss';

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

export type TextColor = 'default' | 'mid' | 'dim' | 'disabled' | 'primary' | 'secondary' | 'danger';

export interface TextProps {
  variant?: TextVariant;
  children: ReactNode;
  as?: ElementType;
  color?: TextColor;
  className?: string;
}

/** variant に対応するデフォルトの HTML タグ */
function defaultTag(variant: TextVariant): ElementType {
  switch (variant) {
    case 'heading-1':
      return 'h1';
    case 'heading-2':
      return 'h2';
    case 'heading-3':
      return 'h3';
    case 'body':
    case 'caption':
    case 'numeric-l':
    case 'numeric-m':
    case 'numeric-s':
      return 'span';
    case 'label':
      return 'span';
    default:
      return 'span';
  }
}

export function Text({ variant = 'body', children, as, color = 'default', className }: TextProps) {
  const Tag = as ?? defaultTag(variant);

  const variantKey = variant.replace(/-/g, '_');

  return (
    <Tag
      className={[styles.text, styles[`variant_${variantKey}`], styles[`color_${color}`], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
