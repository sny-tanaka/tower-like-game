import type { CSSProperties } from 'react';

import styles from './Divider.module.scss';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DividerProps {
  /** 'horizontal'（デフォルト）または 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  /** 区切り線の色。CSS カスタムプロパティや色値を指定可能。デフォルト: var(--c-border-faint) */
  color?: string;
  /** 追加クラス */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Divider — コンテンツ間の区切り線 Atom。
 * horizontal は `<hr>` ベース、vertical は `<span role="separator">` ベース。
 * 色は CSS 変数 `--c-border-faint` を既定値として参照する。
 */
export function Divider({ orientation = 'horizontal', color, className }: DividerProps) {
  const style = color ? ({ '--divider-color': color } as CSSProperties) : undefined;

  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={[styles.vertical, className].filter(Boolean).join(' ')}
        style={style}
      />
    );
  }

  return (
    <hr
      className={[styles.horizontal, className].filter(Boolean).join(' ')}
      style={style}
    />
  );
}
