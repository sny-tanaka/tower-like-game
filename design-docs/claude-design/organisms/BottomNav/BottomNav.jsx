/**
 * BottomNav — モバイル標準のボトムナビゲーション Organism
 *
 * 主要画面間の遷移用 (準備 / マシン / 武器庫 / パッチ / 設定)。
 * AppShell の footer スロットに配置。
 *
 * - items: [{ key, label, iconName, badge?, disabled? }]
 * - active: 現在のキー
 * - onChange(key)
 */
export function BottomNav(props) {
  const { items = [], active, onChange } = props;
  const { Icon, Text, Badge } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${items.length}, 1fr)`,
    background: 'rgba(10,15,28,0.92)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderTop: '1px solid var(--c-border-faint)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  };

  return React.createElement(
    'nav',
    { style: wrapStyle, role: 'navigation', 'aria-label': 'メイン' },
    items.map((it) => {
      const isActive = it.key === active;
      return React.createElement(
        'button',
        {
          key: it.key,
          type: 'button',
          disabled: it.disabled,
          onClick: it.disabled ? undefined : () => onChange && onChange(it.key),
          'aria-current': isActive ? 'page' : undefined,
          style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: '8px 4px 6px',
            background: 'transparent',
            border: 0,
            cursor: it.disabled ? 'not-allowed' : 'pointer',
            opacity: it.disabled ? 0.4 : 1,
            color: isActive ? 'var(--c-primary)' : 'var(--c-text-dim)',
            transition: 'color var(--mo-fast) var(--ease-out)',
            userSelect: 'none',
          },
        },
        // top highlight bar
        isActive &&
          React.createElement('span', {
            style: {
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: 2,
              background: 'var(--c-primary)',
              borderRadius: '0 0 var(--r-pill) var(--r-pill)',
              boxShadow: 'var(--glow-cyan-sm)',
            },
          }),

        // badge
        it.badge != null &&
          React.createElement(
            'span',
            { style: { position: 'absolute', top: 4, right: 8 } },
            React.createElement(Badge, {
              text: String(it.badge),
              variant: it.badge === '!' ? 'warning' : 'info',
              size: 'sm',
              glow: true,
            })
          ),

        // icon
        React.createElement(
          'span',
          {
            style: {
              filter: isActive ? 'drop-shadow(var(--glow-cyan-sm))' : 'none',
              transition: 'filter var(--mo-fast) var(--ease-out)',
            },
          },
          React.createElement(Icon, { name: it.iconName, size: 22 })
        ),

        // label
        React.createElement(
          Text,
          {
            variant: 'label',
            color: isActive ? 'primary' : 'dim',
            align: 'center',
            style: { fontSize: 9.5, lineHeight: 1, letterSpacing: '0.06em' },
          },
          it.label
        )
      );
    })
  );
}
