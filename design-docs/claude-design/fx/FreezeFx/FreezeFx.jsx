/**
 * FreezeFx — 凍結 (敵に氷晶が貼り付くループ + 青みフィルタ)
 */
export function FreezeFx(props) {
  const { x = 50, y = 50, size = 18 } = props;
  const id = React.useMemo(() => 'frz-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-pulse {
      0%, 100% { opacity: 0.7; transform: rotate(0deg)  translate(-50%, -50%); }
      50%      { opacity: 1;   transform: rotate(8deg)  translate(-50%, -50%); }
    }
    .${id}-w { position: absolute; pointer-events: none; }
    .${id}-c { position: absolute; left: 0; top: 0; color: var(--c-primary-hi);
      filter: drop-shadow(0 0 6px rgba(138,243,255,0.7));
      transform-origin: 0 0;
      animation: ${id}-pulse 1.6s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .${id}-c { animation: none; } }
  `;
  // simple snowflake-ish shape: 3 lines at 60° each + center dot
  const lines = [0, 60, 120].map((deg) =>
    React.createElement('line', {
      key: deg,
      x1: -size / 2,
      y1: 0,
      x2: size / 2,
      y2: 0,
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      transform: `rotate(${deg})`,
    })
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', style: { left: x + '%', top: y + '%' } },
      React.createElement(
        'svg',
        {
          className: id + '-c',
          width: size,
          height: size,
          viewBox: `${-size / 2 - 2} ${-size / 2 - 2} ${size + 4} ${size + 4}`,
          style: { display: 'block' },
        },
        ...lines,
        React.createElement('circle', { cx: 0, cy: 0, r: 2.2, fill: 'currentColor' })
      )
    )
  );
}
