/**
 * TierClearFx — Tier クリア時のフィナーレ全画面演出
 * 1) 緑→cyan の二段フラッシュ
 * 2) 中央から放射状の光線
 * 3) 上下に走るネオンライン
 */
export function TierClearFx(props) {
  const { duration = 1400, onDone } = props;
  const id = React.useMemo(() => 'tc-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-flash {
      0%   { opacity: 0; background: radial-gradient(ellipse at center, rgba(70,226,160,0.5), transparent 65%); }
      8%   { opacity: 1; background: radial-gradient(ellipse at center, rgba(70,226,160,0.5), transparent 65%); }
      30%  { opacity: 0; }
      40%  { opacity: 1; background: radial-gradient(ellipse at center, rgba(78,228,246,0.5), transparent 65%); }
      100% { opacity: 0; }
    }
    @keyframes ${id}-ray {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(0); opacity: 0; }
      20%  { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(1); opacity: 0; }
    }
    @keyframes ${id}-band {
      0%   { transform: scaleX(0); opacity: 1; }
      30%  { transform: scaleX(1); opacity: 1; }
      100% { transform: scaleX(1); opacity: 0; }
    }
    .${id}-w  { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
    .${id}-fl { position: absolute; inset: 0; animation: ${id}-flash ${duration}ms var(--ease-out) both; }
    .${id}-rw { position: absolute; left: 50%; top: 50%; width: 4px; height: 70%;
      background: linear-gradient(180deg, transparent, var(--c-primary-hi), transparent);
      transform-origin: 50% 50%;
      animation: ${id}-ray ${Math.round(duration * 0.85)}ms var(--ease-out) both; }
    .${id}-bd { position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--c-primary-hi), transparent);
      box-shadow: 0 0 12px var(--c-primary-hi);
      transform-origin: 0 50%;
      animation: ${id}-band ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-fl, .${id}-rw, .${id}-bd { animation-duration: 1ms; opacity: 0; } }
  `;
  const rays = [0, 45, 90, 135].map((a) =>
    React.createElement('div', {
      key: a,
      className: id + '-rw',
      style: { ['--a']: a + 'deg' },
    })
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-fl' }),
      React.createElement('div', { className: id + '-bd', style: { top: '34%' } }),
      React.createElement('div', { className: id + '-bd', style: { top: '64%' } }),
      ...rays
    )
  );
}
