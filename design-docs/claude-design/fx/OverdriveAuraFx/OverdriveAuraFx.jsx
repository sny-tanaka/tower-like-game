/**
 * OverdriveAuraFx — Cutter Overdrive 中のマシン周囲の残像オーラ (ループ)
 * 中心 (x, y) % の周りを 2 重の回転光輪 + 軽いパルス。
 */
export function OverdriveAuraFx(props) {
  const { x = 50, y = 50, size = 80, color = 'var(--c-secondary)' } = props;
  const id = React.useMemo(() => 'ovd-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-rot   { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
    @keyframes ${id}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg);   } }
    @keyframes ${id}-pulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
    .${id}-w { position: absolute; left: ${x}%; top: ${y}%; width: ${size}px; height: ${size}px;
      transform: translate(-50%, -50%); pointer-events: none;
      animation: ${id}-pulse 1.2s ease-in-out infinite; }
    .${id}-r1 { position: absolute; inset: 0; border-radius: 50%;
      border: 2px dashed ${color};
      box-shadow: 0 0 16px ${color}88;
      animation: ${id}-rot 2.4s linear infinite; }
    .${id}-r2 { position: absolute; inset: 12px; border-radius: 50%;
      border: 1px solid ${color};
      animation: ${id}-rot-r 3.6s linear infinite; opacity: 0.6; }
    @media (prefers-reduced-motion: reduce) { .${id}-w, .${id}-r1, .${id}-r2 { animation: none; } }
  `;
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id + '-w' },
      React.createElement('div', { className: id + '-r1' }),
      React.createElement('div', { className: id + '-r2' })
    )
  );
}
