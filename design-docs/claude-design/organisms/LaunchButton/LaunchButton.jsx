/**
 * LaunchButton — 出撃ボタン Organism (出撃準備画面のフッタ)
 *
 * タブ共通のフッタとして固定。Tier + 武器 + パッチ概要を併記し、出撃ボタン。
 *
 * - tier: 選択中 Tier
 * - weaponKind: 選択中武器
 * - patchCount: 装着パッチ数
 * - disabled: 出撃不可 (極まれな条件チェック用)
 * - onLaunch
 * - sticky: position:sticky bottom:0 (default true)
 */
export function LaunchButton(props) {
  const { tier, weaponKind, patchCount = 0, disabled = false, onLaunch, sticky = true } = props;

  const { Button, Icon, Badge, Text } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    padding: '12px 14px',
    background: 'linear-gradient(0deg, var(--c-bg-deep) 0%, rgba(10,15,28,0.85) 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderTop: '1px solid var(--c-border-faint)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    position: sticky ? 'sticky' : 'relative',
    bottom: 0,
    zIndex: 'var(--z-hud)',
  };

  const summaryStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--ff-display)',
    fontSize: 11,
    letterSpacing: 'var(--ls-loose)',
    textTransform: 'uppercase',
  };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'group', 'aria-label': '出撃' },

    // summary
    React.createElement(
      'div',
      { style: summaryStyle },
      tier != null && React.createElement(Badge, { variant: 'tier', tier, size: 'sm' }),
      weaponKind &&
        React.createElement(
          'span',
          {
            style: {
              color: 'var(--c-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              filter: 'drop-shadow(var(--glow-cyan-sm))',
            },
          },
          React.createElement(Icon, { name: weaponKind, size: 14 }),
          React.createElement(
            'span',
            { style: { color: 'var(--c-text-mid)', fontSize: 10, fontWeight: 600 } },
            weaponKind.toUpperCase()
          )
        ),
      React.createElement(
        'span',
        {
          style: {
            color: 'var(--c-text-dim)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--ff-numeric)',
            fontSize: 11,
          },
        },
        React.createElement(Icon, { name: 'spark', size: 12 }),
        'PATCH ×' + patchCount
      )
    ),

    // big launch button
    React.createElement(Button, {
      label: '出撃',
      variant: 'primary',
      size: 'lg',
      fullWidth: true,
      disabled,
      iconLeft: React.createElement(Icon, { name: 'tower', size: 18 }),
      onClick: onLaunch,
    })
  );
}
