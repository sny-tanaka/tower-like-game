/**
 * ChainBoltFx — Thunder 連鎖電撃 (ジグザグした稲妻が順次連鎖する敵に飛ぶ)
 *
 * points: [{x, y}, ...] のチェイン経路 (%, 親内座標)。
 * 各セグメントは直線ではなく、雷らしいジグザグに自動分割される。
 */
export function ChainBoltFx(props) {
  const { points = [], color = 'var(--c-primary)', segmentMs = 90, jaggedness = 2.2, subdivisions = 4, onDone } = props;
  const id = React.useMemo(() => 'chn-' + Math.random().toString(36).slice(2, 8), []);
  if (points.length < 2) return null;

  // 各セグメント (P_i → P_{i+1}) を subdivisions 分割し、垂直方向にランダムオフセット
  const d = React.useMemo(() => {
    const all = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len; // perpendicular
      if (i === 0) all.push(a);
      for (let j = 1; j < subdivisions; j++) {
        const t = j / subdivisions;
        const mx = a.x + dx * t;
        const my = a.y + dy * t;
        const off = (Math.random() - 0.5) * 2 * jaggedness;
        all.push({ x: mx + nx * off, y: my + ny * off });
      }
      all.push(b);
    }
    return all.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(2) + ' ' + p.y.toFixed(2)).join(' ');
  }, []);
  const total = (points.length - 1) * segmentMs + 200;

  const css = `
    @keyframes ${id}-draw {
      0%   { stroke-dashoffset: 300; opacity: 1; }
      80%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    .${id} { animation: ${id}-draw ${total}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;

  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'svg',
      {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
        onAnimationEnd: onDone,
      },
      // 外側 glow
      React.createElement('path', {
        className: id,
        d,
        fill: 'none',
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: 300,
        style: { filter: `drop-shadow(0 0 3px ${color})`, opacity: 0.5 },
      }),
      // 内側コア (白)
      React.createElement('path', {
        className: id,
        d,
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 0.55,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: 300,
        style: { filter: `drop-shadow(0 0 1.5px ${color}) drop-shadow(0 0 3px ${color})` },
      })
    )
  );
}
