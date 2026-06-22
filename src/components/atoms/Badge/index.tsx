import styles from './style.module.scss';

export interface BadgeProps {
  text: string;
  variant?: 'tier' | 'elite' | 'boss' | 'patch-tier' | 'default';
  tier?: number;
  glow?: boolean;
}

/**
 * Tier / Elite / Boss / Patch-Tier / Default の各バッジ。
 * glow=true でネオングローエフェクト付き。
 * tier prop は variant='tier' のとき 1〜10 を対応トークン色にマップ。
 */
export function Badge({ text, variant = 'default', tier, glow = false }: BadgeProps) {
  // tier / patch-tier のインライン CSS 変数
  let tierStyle: React.CSSProperties | undefined;
  if (variant === 'tier' && tier != null) {
    const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 10);
    tierStyle = {
      '--badge-color': `var(--c-tier-${clampedTier})`,
    } as React.CSSProperties;
  } else if (variant === 'patch-tier' && tier != null) {
    const clampedTier = Math.min(Math.max(1, Math.floor(tier)), 5);
    tierStyle = {
      '--badge-color': `var(--c-patch-t${clampedTier})`,
    } as React.CSSProperties;
  }

  return (
    <span
      className={[styles.badge, styles[`variant-${variant}`], glow ? styles.glow : '']
        .filter(Boolean)
        .join(' ')}
      style={tierStyle}
    >
      {text}
    </span>
  );
}
