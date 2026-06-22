/**
 * Tab — タブ 1 枚 Atom (TabBar Molecule の構成単位)
 *
 * 状態:
 *   active=true  下線 (cyan, glow) + 文字 primary
 *   active=false 文字 dim、hover でほんのり明るく
 *
 * variant:
 *   underline  デフォルト。バー下に発光ライン
 *   pill       角丸塗りつぶし（小さなセグメント控え）
 *
 * size: sm (32) / md (40)
 * badge: 数値やドットを右肩に
 */
export function Tab(props) {
  const {
    label,
    active = false,
    disabled = false,
    variant = 'underline',
    size = 'md',
    badge = null,
    onClick,
    iconLeft = null,
  } = props;

  const sizeMap = { sm: 32, md: 40 };
  const h = sizeMap[size] || sizeMap.md;

  const baseStyle = {
    position: 'relative',
    height: h + 'px',
    padding: '0 14px',
    fontFamily: 'var(--ff-display)',
    fontSize: size === 'sm' ? 12 : 13,
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--ls-loose)',
    textTransform: 'uppercase',
    color: active ? 'var(--c-primary)' : 'var(--c-text-dim)',
    background: 'transparent',
    border: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    opacity: disabled ? 0.4 : 1,
    transition: 'color var(--mo-fast) var(--ease-out)',
    textShadow: active ? 'var(--glow-cyan-sm)' : 'none',
    userSelect: 'none',
  };

  if (variant === 'pill') {
    Object.assign(baseStyle, {
      borderRadius: 'var(--r-pill)',
      padding: '0 14px',
      background: active ? 'var(--c-primary-bg)' : 'transparent',
      border: active ? '1px solid var(--c-primary)' : '1px solid var(--c-border-faint)',
      color: active ? 'var(--c-primary)' : 'var(--c-text-mid)',
      boxShadow: active ? 'var(--glow-cyan-sm)' : 'none',
    });
  }

  const underline =
    variant === 'underline' && active
      ? React.createElement('div', {
          style: {
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 0,
            height: 2,
            background: 'var(--c-primary)',
            boxShadow: 'var(--glow-cyan-sm)',
            borderRadius: 'var(--r-pill)',
          },
        })
      : null;

  const badgeEl =
    badge != null
      ? React.createElement(
          'span',
          {
            style: {
              fontFamily: 'var(--ff-numeric)',
              fontSize: 10,
              fontWeight: 'var(--fw-semibold)',
              color: active ? 'var(--c-bg-deep)' : 'var(--c-text)',
              background: active ? 'var(--c-primary)' : 'var(--c-surface-hi)',
              borderRadius: 'var(--r-pill)',
              padding: '1px 6px',
              minWidth: 16,
              textAlign: 'center',
              letterSpacing: 'var(--ls-num)',
              marginLeft: 2,
            },
          },
          badge
        )
      : null;

  return React.createElement(
    'button',
    {
      type: 'button',
      role: 'tab',
      'aria-selected': active,
      disabled,
      onClick: disabled ? undefined : onClick,
      style: baseStyle,
      'data-active': active,
    },
    iconLeft,
    label,
    badgeEl,
    underline
  );
}
