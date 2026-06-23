/**
 * EnemyHitFx — 敵被弾時の小フラッシュ + 衝撃マーク
 * (x, y) 中心に短い光点。死亡しない打撃で頻繁に使う。
 */
export function EnemyHitFx(props) {
  const { x = 50, y = 50, color = 'var(--c-primary-hi)', duration = 220, onDone } = props;
  const id = React.useMemo(() => 'hit-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-f {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
    .${id}-w { position: absolute; pointer-events: none; }
    .${id}-d { position: absolute; left: 0; top: 0; width: 12px; height: 12px; border-radius: 50%;
      background: radial-gradient(circle, ${color}, transparent 60%);
      animation: ${id}-f ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-d { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id + '-w', style: { left: x + '%', top: y + '%' }, onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-d' })
    )
  );
}
