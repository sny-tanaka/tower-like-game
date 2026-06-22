/**
 * BattleField — バトルフィールドの描画レイヤ Organism (デザインプレビュー用モック)
 *
 * 実装ではキャンバス/SVG で:
 *   - マシン (中央固定)
 *   - 敵 (ランダム角度スポーン)
 *   - 攻撃エフェクト
 *   - 索敵円 (薄く半透明)
 * を描く。本コンポーネントは「枠 + プレースホルダ」を提供し、デザイントークンに沿った
 * 背景・索敵円・マシンプレビューを描画する。
 *
 * props:
 *   - height: フィールド高さ (default '100%')
 *   - searchRadiusPct: 索敵円半径 (% of min(w,h)/2) default 50
 *   - showSearchCircle: 索敵円を出す (default true)
 *   - weapon: 装備中武器 (cutter は旋回半径も描画)
 *   - cutterRadiusPct: cutter 旋回半径表示
 *   - enemies: モック描画用 [{ angle, distance(0-1), kind: 'normal'/'elite'/'boss', hp: 0-1 }]
 *   - paused: 一時停止中の表示
 */
export function BattleField(props) {
  const {
    height = '100%',
    searchRadiusPct = 50,
    showSearchCircle = true,
    weapon = 'laser',
    cutterRadiusPct = 22,
    enemies = [],
    paused = false,
  } = props;

  const { Icon, Text } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    position: 'relative',
    width: '100%',
    height: height === 'auto' ? undefined : height,
    flex: height === 'auto' ? 1 : undefined,
    minHeight: 0,
    overflow: 'hidden',
    background: `
      radial-gradient(ellipse at center, rgba(78,228,246,0.045) 0%, transparent 60%),
      radial-gradient(circle at 20% 20%, rgba(169,107,255,0.06), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(78,228,246,0.05), transparent 50%),
      repeating-linear-gradient(0deg,  rgba(78,228,246,0.045) 0 1px, transparent 1px 24px),
      repeating-linear-gradient(90deg, rgba(78,228,246,0.045) 0 1px, transparent 1px 24px),
      var(--c-bg-deep)
    `,
    boxSizing: 'border-box',
    ...(props.style || {}),
  };

  const centerStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  };

  // Search circle (svg)
  const searchSvg =
    showSearchCircle &&
    React.createElement(
      'svg',
      {
        style: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        },
        viewBox: '-50 -50 100 100',
        preserveAspectRatio: 'xMidYMid meet',
      },
      React.createElement('circle', {
        cx: 0,
        cy: 0,
        r: searchRadiusPct,
        fill: 'none',
        stroke: 'rgba(78,228,246,0.25)',
        strokeWidth: 0.15,
        strokeDasharray: '0.5 0.8',
      }),
      weapon === 'cutter' &&
        React.createElement('circle', {
          cx: 0,
          cy: 0,
          r: cutterRadiusPct,
          fill: 'rgba(169,107,255,0.04)',
          stroke: 'rgba(169,107,255,0.35)',
          strokeWidth: 0.2,
          strokeDasharray: '0.8 0.3',
        })
    );

  // Enemy markers
  const enemyEls = enemies.map((e, i) => {
    const x = 50 + e.distance * Math.cos(e.angle) * 45;
    const y = 50 + e.distance * Math.sin(e.angle) * 45;
    const color =
      e.kind === 'boss'
        ? 'var(--c-danger)'
        : e.kind === 'elite'
          ? 'var(--c-warning)'
          : 'var(--c-text-mid)';
    const size = e.kind === 'boss' ? 22 : e.kind === 'elite' ? 16 : 12;
    return React.createElement(
      'div',
      {
        key: i,
        style: {
          position: 'absolute',
          left: x + '%',
          top: y + '%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          pointerEvents: 'none',
        },
      },
      React.createElement(
        'span',
        {
          style: {
            color,
            filter: `drop-shadow(0 0 4px ${
              color === 'var(--c-danger)'
                ? 'rgba(255,77,109,0.6)'
                : color === 'var(--c-warning)'
                  ? 'rgba(246,185,74,0.6)'
                  : 'rgba(167,184,216,0.4)'
            })`,
          },
        },
        React.createElement(Icon, { name: e.kind === 'boss' ? 'skull' : 'shield', size })
      ),
      e.hp != null &&
        React.createElement(
          'div',
          {
            style: {
              width: size + 4,
              height: 2,
              background: 'var(--c-bg-base)',
              borderRadius: 1,
              overflow: 'hidden',
            },
          },
          React.createElement('div', {
            style: {
              width: Math.max(0, Math.min(1, e.hp)) * 100 + '%',
              height: '100%',
              background:
                e.kind === 'boss'
                  ? 'var(--c-danger)'
                  : e.kind === 'elite'
                    ? 'var(--c-warning)'
                    : 'var(--c-hp)',
            },
          })
        )
    );
  });

  return React.createElement(
    'div',
    {
      style: wrapStyle,
      role: 'application',
      'aria-label': 'バトルフィールド',
      'data-weapon': weapon,
      'data-paused': paused,
    },

    // background search circle (under enemies)
    searchSvg,

    // enemies
    enemyEls,

    // center machine
    React.createElement(
      'div',
      { style: centerStyle },
      React.createElement(
        'div',
        {
          style: {
            width: 56,
            height: 56,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, rgba(78,228,246,0.4), rgba(78,228,246,0.08) 60%, transparent 80%)',
            border: '2px solid var(--c-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--c-primary-hi)',
            boxShadow: 'var(--glow-cyan-md)',
          },
        },
        React.createElement(Icon, { name: 'tower', size: 30 })
      )
    ),

    // paused indicator
    paused &&
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            inset: 0,
            background: 'rgba(2,4,10,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              padding: '10px 18px',
              background: 'var(--c-bg-elev)',
              border: '1px solid var(--c-primary)',
              borderRadius: 'var(--r-pill)',
              color: 'var(--c-primary)',
              boxShadow: 'var(--glow-cyan-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            },
          },
          React.createElement(Icon, { name: 'pause', size: 16 }),
          React.createElement(Text, { variant: 'label', color: 'primary' }, 'PAUSED')
        )
      )
  );
}
