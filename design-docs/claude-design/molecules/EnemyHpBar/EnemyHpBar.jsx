/**
 * EnemyHpBar — エリート / ボスの HP 表示 (Text + Badge + ProgressBar)
 *
 * variant:
 *   normal  通常エネミー (使わないが拡張用)
 *   elite   エリート (warning カラー + Elite バッジ)
 *   boss    ボス (danger カラー + Boss バッジ + 大型)
 *
 * 表示要素:
 *   - Badge (Elite / Boss / 任意 Tier)
 *   - 名前 (Text body)
 *   - HP 値 (NumericDisplay) - 右寄せ
 *   - ProgressBar - 下段
 */
export function EnemyHpBar(props) {
  const {
    name,
    current,
    max,
    variant = 'elite',
    tier,
    showValue = true,
    size = 'md', // 'sm' / 'md' / 'lg'
  } = props;

  const sizeMap = {
    sm: { barH: 'sm', gap: 4, pad: 8, fs: 12 },
    md: { barH: 'md', gap: 6, pad: 10, fs: 13 },
    lg: { barH: 'lg', gap: 8, pad: 12, fs: 15 },
  };
  const s = sizeMap[size] || sizeMap.md;
  const { Badge, Text, ProgressBar, NumericDisplay } = window.TowerLikeGame_28197d;

  const isBoss = variant === 'boss';
  const accent = isBoss ? 'danger' : variant === 'elite' ? 'warning' : 'text';

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: s.gap + 'px',
    padding: s.pad + 'px ' + (s.pad + 4) + 'px',
    background: isBoss
      ? 'linear-gradient(180deg, rgba(255,77,109,0.12), rgba(255,77,109,0.04))'
      : variant === 'elite'
        ? 'linear-gradient(180deg, rgba(246,185,74,0.10), rgba(246,185,74,0.03))'
        : 'var(--c-bg-elev)',
    border:
      '1px solid ' +
      (isBoss
        ? 'rgba(255,77,109,0.45)'
        : variant === 'elite'
          ? 'rgba(246,185,74,0.40)'
          : 'var(--c-border-faint)'),
    borderRadius: 'var(--r-s)',
    boxShadow: isBoss ? '0 0 12px rgba(255,77,109,0.25)' : 'none',
  };

  const headerStyle = { display: 'flex', alignItems: 'center', gap: 8 };
  const nameStyle = { flex: 1, minWidth: 0 };

  return React.createElement(
    'div',
    { style: wrapStyle, 'data-variant': variant, role: 'group', 'aria-label': name + ' HP' },
    React.createElement(
      'div',
      { style: headerStyle },
      React.createElement(Badge, {
        variant: isBoss
          ? 'boss'
          : variant === 'elite'
            ? 'elite'
            : tier != null
              ? 'tier'
              : 'neutral',
        text: isBoss ? 'BOSS' : variant === 'elite' ? 'ELITE' : tier != null ? null : 'NORMAL',
        tier: tier != null ? tier : 1,
        size: size === 'sm' ? 'sm' : 'md',
        glow: isBoss,
      }),
      React.createElement(
        Text,
        {
          variant: 'body',
          color: accent,
          style: {
            ...nameStyle,
            fontSize: s.fs + 'px',
            fontWeight: 'var(--fw-semibold)',
            fontFamily: 'var(--ff-display)',
          },
          truncate: true,
        },
        name
      ),
      showValue &&
        React.createElement(
          'span',
          {
            style: {
              display: 'inline-flex',
              gap: 6,
              alignItems: 'baseline',
              fontFamily: 'var(--ff-numeric)',
            },
          },
          React.createElement(NumericDisplay, { value: current, size: 'sm', accentColor: accent }),
          React.createElement('span', { style: { color: 'var(--c-text-dim)', fontSize: 10 } }, '/'),
          React.createElement(NumericDisplay, { value: max, size: 'sm', accentColor: 'dim' })
        )
    ),
    React.createElement(ProgressBar, {
      value: current,
      max,
      color: isBoss ? 'danger' : variant === 'elite' ? 'xp' : 'hp',
      variant: 'solid',
      size: s.barH,
    })
  );
}
