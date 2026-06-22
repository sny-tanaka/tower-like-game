/**
 * PickupFx — 通貨 / アイテム獲得時に HUD まで吸い込まれる演出
 * 通貨アイコン (screw/bolt/alloy/spark) が指定座標から targetX/Y へ
 * 弧を描いて飛んで小さくなる。
 */
export function PickupFx(props) {
  const {
    icon = 'screw',
    x = 50,
    y = 70,
    targetX = 90,
    targetY = 5,
    color = 'var(--c-screw)',
    duration = 540,
    onDone,
  } = props;
  const { Icon } = window.TowerLikeGame_28197d;
  const id = React.useMemo(() => 'pk-' + Math.random().toString(36).slice(2, 8), []);
  // arc via 3-stop keyframe (control point above midpoint)
  const midX = (x + targetX) / 2;
  const midY = Math.min(x, targetX, y, targetY) - 8;
  const css = `
    @keyframes ${id}-arc {
      0%   { left: ${x}%;     top: ${y}%;     transform: translate(-50%,-50%) scale(1);   opacity: 1; }
      40%  { left: ${midX}%;  top: ${midY}%;  transform: translate(-50%,-50%) scale(1.1); opacity: 1; }
      100% { left: ${targetX}%; top: ${targetY}%; transform: translate(-50%,-50%) scale(0.4); opacity: 0; }
    }
    .${id} {
      position: absolute;
      color: ${color};
      filter: drop-shadow(0 0 4px ${color});
      animation: ${id}-arc ${duration}ms var(--ease-default) both;
      pointer-events: none;
      display: inline-flex;
    }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id, onAnimationEnd: onDone },
      React.createElement(Icon, { name: icon, size: 18 })
    )
  );
}
