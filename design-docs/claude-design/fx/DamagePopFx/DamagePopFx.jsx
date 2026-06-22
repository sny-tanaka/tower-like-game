/**
 * DamagePopFx — 敵にダメージが入った瞬間に数値が浮き上がるフィードバック
 *
 * バトルフィールド上の (x, y) [%] に絶対配置。
 * 上方向に 24px 浮きながらフェードアウト。
 *
 * props:
 *   - value: 表示数値 (NumericDisplay 経由)
 *   - x, y: 親 (BattleField) 内のパーセント座標
 *   - crit: クリ表示にするか (大きめ + warning 色)
 *   - duration: ms (default 800)
 *   - onDone()
 */
export function DamagePopFx(props) {
  const { value, x = 50, y = 50, crit = false, duration = 800, onDone } = props;
  const { NumericDisplay } = window.TowerLikeGame_28197d;
  const id = React.useMemo(() => 'dmg-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-pop {
      0%   { transform: translate(-50%, 0) scale(${crit ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${crit ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${crit ? 1 : 0.95}); opacity: 0; }
    }
    .${id} {
      position: absolute;
      animation: ${id}-pop ${duration}ms var(--ease-out) both;
      pointer-events: none;
      filter: drop-shadow(0 0 4px ${crit ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) { .${id} { animation-duration: 1ms; opacity: 0; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id, style: { left: x + '%', top: y + '%' }, onAnimationEnd: onDone },
      React.createElement(NumericDisplay, {
        value,
        size: crit ? 'lg' : 'md',
        accentColor: crit ? 'warning' : 'text',
        glow: true,
        style: crit ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 },
      })
    )
  );
}
