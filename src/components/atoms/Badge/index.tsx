import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface BadgeProps {
  /** 表示テキスト。variant='tier'/'patch-tier' では省略可（tier番号から自動生成）。 */
  text?: string;
  variant?:
    | 'tier'
    | 'elite'
    | 'boss'
    | 'patch-tier'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'neutral'
    | 'default'; // 後方互換エイリアス（neutral と同様）
  tier?: number;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  /** アイコンをテキスト左に表示 */
  iconLeft?: ReactNode;
}

/**
 * Tier / Elite / Boss / Patch-Tier / Semantic の各バッジ。
 * glow=true でネオングローエフェクト付き。
 * tier prop は variant='tier' のとき 1〜12 を対応トークン色にマップ。
 */
export function Badge({
  text,
  variant = 'neutral',
  tier,
  size = 'md',
  glow = false,
  iconLeft,
}: BadgeProps) {
  // tier / patch-tier のインライン CSS 変数
  let tierStyle: React.CSSProperties | undefined;

  // 'default' は後方互換エイリアス → 'neutral' として扱う
  const resolvedVariant = variant === 'default' ? 'neutral' : variant;

  if (resolvedVariant === 'tier' && tier != null) {
    const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 12);
    // tier 11, 12 は c-tier-10 をフォールバックに使う（トークンが 10 まで）
    const tokenTier = Math.min(clampedTier, 10);
    tierStyle = {
      '--badge-color': `var(--c-tier-${tokenTier})`,
    } as React.CSSProperties;
  } else if (resolvedVariant === 'patch-tier' && tier != null) {
    const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 5);
    tierStyle = {
      '--badge-color': `var(--c-patch-t${clampedTier})`,
    } as React.CSSProperties;
  }

  // テキスト自動生成（tier/patch-tier で text が未指定の場合）
  let displayText = text;
  if (displayText == null) {
    if (resolvedVariant === 'tier' && tier != null) {
      displayText = `T${tier}`;
    } else if (resolvedVariant === 'patch-tier' && tier != null) {
      displayText = `T${tier}`;
    } else {
      displayText = '';
    }
  }

  return (
    <span
      className={[
        styles.badge,
        styles[`variant-${resolvedVariant}`],
        styles[`size-${size}`],
        glow ? styles.glow : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={tierStyle}
    >
      {iconLeft != null && (
        <span
          className={styles.iconLeft}
          aria-hidden="true"
        >
          {iconLeft}
        </span>
      )}
      {displayText}
    </span>
  );
}
