/**
 * VolleyFx — Cannon Volley
 * 既定: 5 発を 72° 刻みで全方位に放射 (count × step = 360°)。
 *
 * spreadDeg を指定すると扇形にも対応可 (例: 90° で前方扇)。
 */
export function VolleyFx(props) {
  const {
    x = 50,
    y = 50,
    count = 5,
    spreadDeg = 360,
    range = 40,
    duration = 600,
    color = 'var(--c-warning)',
    onDone,
  } = props;
  const id = React.useMemo(() => 'vl-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-fly {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)   scale(1); opacity: 1; }
      80%  { transform: translate(-50%, -50%) rotate(var(--a)) translateY(${-range}vmin) scale(0.7); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(${-range}vmin) scale(0.3); opacity: 0; }
    }
    .${id}-w { position: absolute; left: ${x}%; top: ${y}%; pointer-events: none; }
    .${id}-b {
      position: absolute; left: 0; top: 0;
      width: 8px; height: 8px; border-radius: 50%;
      background: radial-gradient(circle, ${color}, ${color}88 60%, transparent 85%);
      box-shadow: 0 0 8px ${color};
      animation: ${id}-fly ${duration}ms var(--ease-out) both;
      transform-origin: 0 0;
    }
    @media (prefers-reduced-motion: reduce) { .${id}-b { animation-duration: 1ms; opacity: 0; } }
  `;
  // 360° 全方位なら 0°起点で count 等分、それ以外は扇形 (中心 0°、±spread/2)
  const full = spreadDeg >= 360;
  const balls = Array.from({ length: count }, (_, i) => {
    const a = full
      ? (360 / count) * i
      : count > 1
        ? -spreadDeg / 2 + (spreadDeg / (count - 1)) * i
        : 0;
    return React.createElement('div', {
      key: i,
      className: id + '-b',
      style: { ['--a']: a + 'deg' },
    });
  });
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id + '-w', onAnimationEnd: onDone }, ...balls)
  );
}
