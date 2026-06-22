/**
 * BurnFx — 燃焼継続 (敵から炎が立ち上る、ループ)
 * 親が unmount するまで継続。
 */
export function BurnFx(props) {
  const { x = 50, y = 50, color = 'var(--c-danger)' } = props;
  const id = React.useMemo(() => 'brn-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-flick {
      0%, 100% { transform: translate(-50%, -50%) scale(0.9, 1.1); opacity: 0.85; }
      50%      { transform: translate(-50%, -50%) scale(1.1, 0.9); opacity: 1; }
    }
    @keyframes ${id}-up {
      0%   { transform: translate(-50%, 0)    scale(1);   opacity: 0.9; }
      100% { transform: translate(-50%, -14px) scale(0.4); opacity: 0; }
    }
    .${id}-w { position: absolute; pointer-events: none; }
    .${id}-core { position: absolute; left: 0; top: 0; width: 16px; height: 22px; border-radius: 50% 50% 40% 40%;
      background: radial-gradient(ellipse at center bottom, #ffd97a, ${color} 60%, transparent 90%);
      filter: drop-shadow(0 0 6px ${color}aa);
      animation: ${id}-flick 360ms ease-in-out infinite; }
    .${id}-em { position: absolute; left: 0; top: -2px; width: 4px; height: 4px; border-radius: 50%; background: ${color}; opacity: 0;
      animation: ${id}-up 700ms ease-out infinite; }
    @media (prefers-reduced-motion: reduce) { .${id}-core, .${id}-em { animation: none; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', style: { left: x + '%', top: y + '%' } },
      React.createElement('div', { className: id + '-core' }),
      React.createElement('div', { className: id + '-em', style: { animationDelay: '0ms' } }),
      React.createElement('div', {
        className: id + '-em',
        style: { animationDelay: '180ms', left: '4px' },
      }),
      React.createElement('div', {
        className: id + '-em',
        style: { animationDelay: '360ms', left: '-4px' },
      })
    )
  );
}
