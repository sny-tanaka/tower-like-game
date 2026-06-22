/**
 * TitleScreen — タイトル画面 Page
 *
 * 構成:
 *   - TitleHeader: ロゴ
 *   - hero: 大型タワー + 同心リング + glow (静的な紋章)
 *   - TitleActions: 続きから / 新規 / 設定
 */
export function TitleScreen(props) {
  const {
    hasSave = false,
    lastSavedAt,
    onResume,
    onNewGame,
    onSettings,
    version = 'v0.1.0',
  } = props;
  const { AppShell, TitleHeader, TitleActions, Icon } = window.TowerLikeGame_28197d;

  const hero = React.createElement(
    'div',
    {
      style: {
        position: 'relative',
        width: 180,
        height: 180,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },

    // outer ring (cyan, dashed)
    React.createElement('div', {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '1px dashed rgba(78,228,246,0.55)',
        boxShadow: '0 0 24px rgba(78,228,246,0.18), inset 0 0 32px rgba(78,228,246,0.10)',
      },
    }),

    // middle ring (purple, dotted)
    React.createElement('div', {
      style: {
        position: 'absolute',
        inset: 22,
        borderRadius: '50%',
        border: '1px dotted rgba(169,107,255,0.55)',
      },
    }),

    // inner glow disc
    React.createElement('div', {
      style: {
        position: 'absolute',
        inset: 44,
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(78,228,246,0.18), transparent 70%)',
      },
    }),

    // corner accents (4 small triangles indicating geometry)
    [0, 90, 180, 270].map((deg) =>
      React.createElement('div', {
        key: deg,
        style: {
          position: 'absolute',
          width: 6,
          height: 6,
          background: 'var(--c-primary)',
          boxShadow: 'var(--glow-cyan-sm)',
          transform: `rotate(${deg}deg) translate(85px) rotate(45deg)`,
        },
      })
    ),

    // central tower
    React.createElement(
      'span',
      {
        style: {
          color: 'var(--c-primary-hi)',
          filter: 'drop-shadow(0 0 12px rgba(78,228,246,0.65))',
          display: 'inline-flex',
        },
      },
      React.createElement(Icon, { name: 'tower', size: 88 })
    )
  );

  return React.createElement(
    AppShell,
    {},
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', minHeight: '100%', paddingBottom: 32 } },
      React.createElement(TitleHeader, {
        subtitle: 'TOWER DEFENSE × INFINITE TIER',
        version,
        tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
      }),
      React.createElement(
        'div',
        {
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 16px',
          },
        },
        hero
      ),
      React.createElement(TitleActions, {
        hasSave,
        lastSavedAt,
        onResume,
        onNewGame,
        onSettings,
      })
    )
  );
}
