/**
 * LevelUpFx — 強化購入時に UpgradeCard 上で発火するキラキラ演出
 *
 * 想定使用シーン:
 *   - マシン強化画面で +1 / +5 / MAX ボタンを押した瞬間
 *   - 武器強化画面で同上
 *   - ラン中 WS の 4 項目を強化した瞬間
 *   - パッチ庫の Tier UP 演出 (MergeSuccess の前段として併用可)
 *
 * 親 UpgradeCard 内に absolute で被せる。中央バーストフラッシュ + 8 方向スパーク。
 */
export function LevelUpFx(props) {
  const { x = 50, y = 50, color = 'var(--c-primary-hi)', duration = 640, onDone } = props;
  const id = React.useMemo(() => 'lvl-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-burst {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      40%  { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
    }
    @keyframes ${id}-spark {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)   scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-18px) scale(0.4); opacity: 0; }
    }
    .${id}-w { position: absolute; pointer-events: none; }
    .${id}-b { position: absolute; left: 0; top: 0; width: 24px; height: 24px; border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      animation: ${id}-burst ${duration}ms var(--ease-out) both; }
    .${id}-s { position: absolute; left: 0; top: 0; width: 4px; height: 4px; background: ${color};
      box-shadow: 0 0 4px ${color}; transform-origin: 0 0;
      animation: ${id}-spark ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id}-b, .${id}-s { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', style: { left: x + '%', top: y + '%' }, onAnimationEnd: onDone },
      React.createElement('div', { className: id + '-b' }),
      [0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
        React.createElement('div', {
          key: a,
          className: id + '-s',
          style: { ['--a']: a + 'deg' },
        })
      )
    )
  );
}
