/**
 * HealFlashFx — 回復時の緑フラッシュ (HP リジェネ / 回復パッチ発動)
 * 親の上に半透明緑のオーバーレイをフェード。
 */
export function HealFlashFx(props) {
  const { duration = 480, onDone } = props;
  const id = React.useMemo(() => 'hl-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-h {
      0%   { opacity: 0; }
      25%  { opacity: 1; }
      100% { opacity: 0; }
    }
    .${id} {
      position: absolute; inset: 0;
      pointer-events: none;
      background:
        radial-gradient(ellipse at center, rgba(70,226,160,0.35) 0%, transparent 70%);
      animation: ${id}-h ${duration}ms var(--ease-out) both;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id, onAnimationEnd: onDone })
  );
}
