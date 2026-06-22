/**
 * ChainBoltFx — Thunder 連鎖電撃 (折れ線ジグザグが連鎖する敵に飛ぶ)
 *
 * points: [{x, y}, ...] のチェイン経路 (%, 親内座標)。
 * 各セグメントの稲妻が順次走る。
 */
export function ChainBoltFx(props) {
  const { points = [], color = 'var(--c-primary)', segmentMs = 80, onDone } = props;
  const id = React.useMemo(() => 'chn-' + Math.random().toString(36).slice(2, 8), []);
  if (points.length < 2) return null;

  // SVG polyline path string
  const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ' ' + p.y).join(' ');
  const total = (points.length - 1) * segmentMs + 200;

  const css = `
    @keyframes ${id}-draw {
      0%   { stroke-dashoffset: 200; opacity: 1; }
      80%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    .${id} { animation: ${id}-draw ${total}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'svg',
      {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        style: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        },
        onAnimationEnd: onDone,
      },
      React.createElement('path', {
        className: id,
        d,
        fill: 'none',
        stroke: color,
        strokeWidth: 0.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: 200,
        style: { filter: `drop-shadow(0 0 1.5px ${color})` },
      })
    )
  );
}
