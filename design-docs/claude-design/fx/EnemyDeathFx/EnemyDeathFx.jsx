/**
 * EnemyDeathFx — 敵撃破時のパーティクル発散
 * (x, y) [%] に絶対配置。8 方向に粒子が飛び散り中央でフラッシュ。
 */
export function EnemyDeathFx(props) {
  const { x = 50, y = 50, color = 'var(--c-text-mid)', duration = 480, onDone } = props;
  const id = React.useMemo(() => 'edth-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes ${id}-shard {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)   scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; }
    }
    .${id}-wrap { position: absolute; pointer-events: none; }
    .${id}-flash { position: absolute; left: 0; top: 0; width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, ${color === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : color}, transparent 65%);
      animation: ${id}-flash ${duration}ms var(--ease-out) both; }
    .${id}-shard { position: absolute; left: 0; top: 0; width: 4px; height: 4px; background: ${color};
      box-shadow: 0 0 4px ${color}; animation: ${id}-shard ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-flash, .${id}-shard { animation-duration: 1ms; opacity: 0; } }
  `;
  const N = 8;
  const shards = Array.from({ length: N }, (_, i) => React.createElement('div', {
    key: i, className: id + '-shard',
    style: { ['--a']: (i * 360 / N) + 'deg' },
  }));
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-wrap', style: { left: x + '%', top: y + '%' }, onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-flash' }),
      ...shards
    )
  );
}
