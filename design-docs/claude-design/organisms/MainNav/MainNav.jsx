/**
 * MainNav — 出撃準備画面から他画面への導線 Organism
 *
 * 2×3 のグリッド (5 項目: マシン / 武器庫 / パッチ庫 / 設定 / タイトル)
 * 各タイルは: Icon (大) + Text (label) + 任意 Badge (新着など)
 *
 * - items: [{ key, label, iconName, iconColor?, badge?, disabled?, onClick }]
 * - columns: 2 (default) / 3
 *
 * spec 上は MainNav は出撃準備画面のみ。他画面は PageHeader の onBack で戻る。
 */
export function MainNav(props) {
  const { items = [], columns = 2 } = props;
  const { Icon, Text, Badge } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: 10,
  };

  return React.createElement(
    'nav',
    { style: wrapStyle, 'aria-label': 'メインナビゲーション' },
    items.map((it) => {
      const tone = it.iconColor || 'var(--c-primary)';
      const glow =
        tone === 'var(--c-secondary)'
          ? 'rgba(169,107,255,0.4)'
          : tone === 'var(--c-warning)'
            ? 'rgba(246,185,74,0.4)'
            : tone === 'var(--c-danger)'
              ? 'rgba(255,77,109,0.4)'
              : 'rgba(78,228,246,0.4)';
      return React.createElement(
        'button',
        {
          key: it.key,
          type: 'button',
          disabled: it.disabled,
          onClick: it.disabled ? undefined : it.onClick,
          style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '18px 12px 14px',
            background: 'var(--c-bg-elev)',
            border: '1px solid var(--c-border-faint)',
            borderRadius: 'var(--r-m)',
            cursor: it.disabled ? 'not-allowed' : 'pointer',
            opacity: it.disabled ? 0.5 : 1,
            color: 'var(--c-text)',
            fontFamily: 'inherit',
            transition:
              'border var(--mo-fast) var(--ease-out), box-shadow var(--mo-fast) var(--ease-out)',
            boxSizing: 'border-box',
            userSelect: 'none',
            minHeight: 86,
          },
          'data-key': it.key,
        },

        it.badge != null &&
          React.createElement(
            'span',
            { style: { position: 'absolute', top: 8, right: 8 } },
            React.createElement(Badge, {
              text: String(it.badge),
              variant: typeof it.badge === 'string' && it.badge === '!' ? 'warning' : 'info',
              size: 'sm',
              glow: true,
            })
          ),

        React.createElement(
          'span',
          {
            style: {
              width: 36,
              height: 36,
              borderRadius: 'var(--r-m)',
              background: `linear-gradient(135deg, ${glow.replace('0.4', '0.18')}, ${glow.replace('0.4', '0.04')})`,
              border: `1px solid ${glow.replace('0.4', '0.5')}`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tone,
              filter: `drop-shadow(0 0 6px ${glow})`,
            },
          },
          React.createElement(Icon, { name: it.iconName, size: 22 })
        ),

        React.createElement(
          Text,
          {
            variant: 'label',
            color: 'mid',
            align: 'center',
            style: { fontSize: 10.5, lineHeight: 1.2 },
          },
          it.label
        )
      );
    })
  );
}
