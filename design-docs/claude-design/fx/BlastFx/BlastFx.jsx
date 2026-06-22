/**
 * BlastFx — Cannon 着弾点の範囲爆発 (拡大する円 + フラッシュ)
 *
 * radius は親の % 単位 (BattleField の min(w,h)) — 視覚的な爆発半径。
 */
export function BlastFx(props) {
  const { x = 50, y = 50, radius = 12, color = 'var(--c-warning)', duration = 520, onDone } = props;
  const id = React.useMemo(() => 'blst-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-ring {
      0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-width: 3px; }
      30%  { transform: translate(-50%, -50%) scale(1);   opacity: 1; border-width: 3px; }
      100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; border-width: 1px; }
    }
    @keyframes ${id}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
    }
    .${id}-wrap   { position: absolute; pointer-events: none; }
    .${id}-ring   { position: absolute; left: 0; top: 0;
      width: ${radius * 2}vmin; height: ${radius * 2}vmin; border-radius: 50%;
      border: 3px solid ${color};
      box-shadow: 0 0 24px ${color}aa, inset 0 0 24px ${color}66;
      animation: ${id}-ring ${duration}ms var(--ease-out) both; }
    .${id}-flash  { position: absolute; left: 0; top: 0;
      width: ${radius * 2}vmin; height: ${radius * 2}vmin; border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 60%);
      animation: ${id}-flash ${Math.round(duration * 0.5)}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-ring, .${id}-flash { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-wrap', style: { left: x + '%', top: y + '%' }, onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-flash' }),
      React.createElement('div', { className: id + '-ring' })
    )
  );
}
