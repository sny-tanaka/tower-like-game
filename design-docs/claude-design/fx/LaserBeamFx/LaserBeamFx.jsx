/**
 * LaserBeamFx — 細い直線ビームが一瞬伸びる (Laser 武器)
 *
 * 親内の (x1, y1) → (x2, y2) % 座標を結ぶビーム。
 */
export function LaserBeamFx(props) {
  const {
    x1 = 50,
    y1 = 50,
    x2 = 80,
    y2 = 30,
    duration = 220,
    color = 'var(--c-primary)',
    onDone,
  } = props;
  const id = React.useMemo(() => 'lsr-' + Math.random().toString(36).slice(2, 8), []);

  const css = `
    @keyframes ${id}-beam {
      0%   { transform: scaleX(0);   opacity: 1; }
      30%  { transform: scaleX(1);   opacity: 1; }
      100% { transform: scaleX(1);   opacity: 0; }
    }
    .${id} {
      position: absolute;
      height: 2px;
      background: ${color};
      transform-origin: 0 50%;
      box-shadow: 0 0 6px ${color}, 0 0 14px ${color};
      animation: ${id}-beam ${duration}ms var(--ease-out) both;
      pointer-events: none;
    }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;

  // distance & angle in % (with vw/vh approximation)
  const dx = x2 - x1,
    dy = y2 - y1;
  // use vmin so % look approximately correct in square-ish containers
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', {
      className: id,
      style: {
        left: x1 + '%',
        top: y1 + '%',
        width: length + '%',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
      },
      onAnimationEnd: onDone,
    })
  );
}
