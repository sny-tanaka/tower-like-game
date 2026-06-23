import type { CSSProperties, ElementType, ReactNode } from 'react';

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

export type TextColor =
  | 'default'
  | 'text'
  | 'mid'
  | 'dim'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning';

export type TextAlign = 'left' | 'center' | 'right';

export interface TextProps {
  variant?: TextVariant;
  children: ReactNode;
  as?: ElementType;
  color?: TextColor;
  className?: string;
  /** 1 行に収めて末尾を省略（overflow: hidden + text-overflow: ellipsis） */
  truncate?: boolean;
  /** テキスト整列 */
  align?: TextAlign;
  /** インラインスタイル（Storybook 等からの上書き用） */
  style?: CSSProperties;
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

export function Text({
  variant = 'body',
  children,
  as,
  color = 'default',
  className,
  truncate,
  align,
  style,
}: TextProps) {
  const Tag = as ?? defaultTag(variant);

  const variantKey = variant.replace(/-/g, '_');
  // color の 'text' は 'default' の別名として扱う
  const colorKey = color === 'text' ? 'default' : color;

  return (
    <Tag
      className={[
        styles.text,
        styles[`variant_${variantKey}`],
        styles[`color_${colorKey}`],
        truncate ? styles.truncate : '',
        align ? styles[`align_${align}`] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </Tag>
  );
}
