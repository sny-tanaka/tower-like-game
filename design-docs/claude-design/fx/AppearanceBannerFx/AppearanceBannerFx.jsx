/**
 * AppearanceBannerFx — エリート / ボス出現時のフルスクリーンバナー演出
 * kind: 'elite' (warning) / 'boss' (danger 強)
 * name: 名前
 */
const KIND_PRESET = {
  elite: { color: 'var(--c-warning)', label: 'ELITE', glow: '0 0 16px rgba(246,185,74,0.6)' },
  boss: { color: 'var(--c-danger)', label: 'BOSS', glow: '0 0 24px rgba(255,77,109,0.7)' },
};

export function AppearanceBannerFx(props) {
  const { kind = 'elite', name, duration = 1600, onDone } = props;
  const { Text } = window.TowerLikeGame_28197d;
  const preset = KIND_PRESET[kind] || KIND_PRESET.elite;
  const id = React.useMemo(() => 'app-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-flash {
      0%   { opacity: 0; }
      10%  { opacity: 0.55; }
      40%  { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes ${id}-band {
      0%   { transform: translateY(-100%); opacity: 0; }
      12%  { transform: translateY(0);     opacity: 1; }
      80%  { transform: translateY(0);     opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    .${id}-w   { position: absolute; inset: 0; pointer-events: none; z-index: var(--z-fx-field); }
    .${id}-fl  { position: absolute; inset: 0; background: ${preset.color};
      mix-blend-mode: screen; animation: ${id}-flash ${duration}ms var(--ease-out) both; }
    .${id}-bd  {
      position: absolute; left: 0; right: 0; top: 30%;
      padding: 14px 0;
      background: linear-gradient(90deg, transparent, ${preset.color}33 50%, transparent),
                  linear-gradient(0deg,   rgba(10,15,28,0.85), rgba(10,15,28,0.85));
      border-top: 1px solid ${preset.color};
      border-bottom: 1px solid ${preset.color};
      box-shadow: ${preset.glow};
      text-align: center;
      animation: ${id}-band ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) { .${id}-fl, .${id}-bd { animation: none; opacity: 1; transform: none; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-fl' }),
      React.createElement(
        'div',
        { className: id + '-bd' },
        React.createElement(
          Text,
          {
            variant: 'label',
            style: {
              color: preset.color,
              fontSize: 12,
              letterSpacing: '0.32em',
              display: 'block',
              marginBottom: 4,
            },
          },
          preset.label
        ),
        React.createElement(
          Text,
          {
            variant: 'heading-1',
            style: {
              color: 'var(--c-text)',
              fontSize: 22,
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              display: 'block',
              textShadow: preset.glow,
            },
          },
          name || ''
        )
      )
    )
  );
}
