/**
 * MegaBeamFx — Laser Mega Beam (画面端まで伸びる太いビーム)
 * 親内の (x, y) からアングル度の方向に太い直線ビームを撃つ。
 */
export function MegaBeamFx(props) {
  const {
    x = 50,
    y = 50,
    angle = 0,
    duration = 600,
    color = 'var(--c-primary-hi)',
    onDone,
  } = props;
  const id = React.useMemo(() => 'mb-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-grow {
      0%   { transform: scaleX(0)   scaleY(0.3); opacity: 0.6; }
      18%  { transform: scaleX(1)   scaleY(1);   opacity: 1; }
      70%  { transform: scaleX(1)   scaleY(1);   opacity: 1; }
      100% { transform: scaleX(1)   scaleY(0.2); opacity: 0; }
    }
    .${id} {
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: 150%; height: 12px;
      background: linear-gradient(90deg, ${color}, transparent 95%);
      box-shadow: 0 0 18px ${color}, 0 0 36px ${color}88;
      transform-origin: 0 50%;
      transform: rotate(${angle}deg);
      animation: ${id}-grow ${duration}ms var(--ease-out) both;
      pointer-events: none;
      border-radius: 6px;
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
