/**
 * InstantKillFx — 即死発動時のフルスクリーンフラッシュ + 中心からのリング
 */
export function InstantKillFx(props) {
  const { duration = 520, onDone } = props;
  const id = React.useMemo(() => 'ik-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-fl {
      0%   { opacity: 0; }
      8%   { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ${id}-rg {
      0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 1; border-width: 4px; }
      100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; border-width: 1px; }
    }
    .${id}-w  { position: absolute; inset: 0; pointer-events: none; z-index: var(--z-fx-field); }
    .${id}-fl { position: absolute; inset: 0; background: rgba(255,77,109,0.6); mix-blend-mode: screen;
      animation: ${id}-fl ${duration}ms var(--ease-out) both; }
    .${id}-rg { position: absolute; left: 50%; top: 50%; width: 80%; padding-top: 80%; border-radius: 50%;
      border: 4px solid var(--c-danger);
      box-shadow: 0 0 32px var(--c-danger);
      animation: ${id}-rg ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-fl, .${id}-rg { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div', { className: id + '-w', onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-fl' }),
      React.createElement('div', { className: id + '-rg' })
    )
  );
}
