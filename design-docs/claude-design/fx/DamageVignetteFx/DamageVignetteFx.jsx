/**
 * DamageVignetteFx — マシン被ダメ時に画面端に赤ビネット
 * BattleScreen 全体に重ねる absolute フル。
 */
export function DamageVignetteFx(props) {
  const { duration = 420, onDone } = props;
  const id = React.useMemo(() => 'vgn-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-v {
      0%   { opacity: 0; }
      20%  { opacity: 1; }
      100% { opacity: 0; }
    }
    .${id} {
      position: absolute; inset: 0;
      pointer-events: none;
      background:
        radial-gradient(ellipse at center, transparent 50%, rgba(255,77,109,0.55) 95%),
        radial-gradient(ellipse at center, transparent 65%, rgba(255,77,109,0.3) 100%);
      animation: ${id}-v ${duration}ms var(--ease-out) both;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id, onAnimationEnd: onDone })
  );
}
