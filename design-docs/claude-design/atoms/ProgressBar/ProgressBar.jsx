/**
 * ProgressBar — 線形プログレス Atom
 *
 * color プリセット:
 *   hp        緑 → low 時に赤（threshold で切替）
 *   cd        cyan（武器クールタイム）
 *   wave      purple（ウェーブ残量）
 *   shield    light-cyan（シールド）
 *   xp        warning 黄
 *
 * variant:
 *   solid     塗りつぶし（HP / shield / xp）
 *   neon      上端ハイライト + glow（CD / wave 用）
 *
 * size: sm (4) / md (8) / lg (12) px
 * reverse: true で右から左へ減少（Wave 残量など）
 *
 * アニメ・パルスは Fx 側。ここは width transition のみ。
 */
export function ProgressBar(props) {
  const {
    value,
    max = 100,
    color = 'hp',
    variant = 'solid',
    size = 'md',
    reverse = false,
    lowThreshold = 0.3,
    showLabel = false,
    label,
  } = props;

  const pct = Math.max(0, Math.min(1, value / max));
  const isLow = color === 'hp' && pct <= lowThreshold;

  const sizeMap = { sm: 4, md: 8, lg: 12 };
  const h = sizeMap[size] || sizeMap.md;

  const fillColor = isLow
    ? 'var(--c-hp-low)'
    : {
        hp: 'var(--c-hp)',
        cd: 'var(--c-cd)',
        wave: 'var(--c-wave)',
        shield: 'var(--c-shield)',
        xp: 'var(--c-warning)',
        danger: 'var(--c-danger)',
      }[color] || 'var(--c-primary)';

  const glowShadow =
    {
      cd: 'var(--glow-cyan-sm)',
      wave: 'var(--glow-purple-sm)',
      shield: 'var(--glow-cyan-sm)',
    }[color] || 'none';

  const trackStyle = {
    position: 'relative',
    width: '100%',
    height: h + 'px',
    background: 'var(--c-bg-base)',
    border: '1px solid var(--c-border-faint)',
    borderRadius: 'var(--r-pill)',
    overflow: 'hidden',
  };

  const fillStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    [reverse ? 'right' : 'left']: 0,
    width: pct * 100 + '%',
    background:
      variant === 'neon'
        ? `linear-gradient(180deg, ${fillColor} 0%, ${fillColor} 60%, transparent 100%)`
        : fillColor,
    boxShadow: variant === 'neon' ? glowShadow : 'none',
    borderRadius: 'var(--r-pill)',
    transition:
      'width var(--mo-mid) var(--ease-default), background var(--mo-fast) var(--ease-out)',
  };

  // Optional inline label (centered)
  const labelStyle = showLabel
    ? {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--ff-numeric)',
        fontSize: Math.max(10, h - 2) + 'px',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--c-text)',
        letterSpacing: 'var(--ls-num)',
        mixBlendMode: 'normal',
        textShadow: '0 1px 2px rgba(0,0,0,0.6)',
        pointerEvents: 'none',
      }
    : null;

  return React.createElement(
    'div',
    {
      style: trackStyle,
      role: 'progressbar',
      'aria-valuenow': value,
      'aria-valuemax': max,
      'data-color': color,
    },
    React.createElement('div', { style: fillStyle }),
    showLabel
      ? React.createElement(
          'div',
          { style: labelStyle },
          label != null ? label : Math.round(pct * 100) + '%'
        )
      : null
  );
}
