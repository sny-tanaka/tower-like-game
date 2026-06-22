/**
 * WaveStartFx — ウェーブ開始時に上 HUD でウェーブ番号がスライドイン
 * waveNumber を中央バナーで一瞬表示してフェード。
 */
export function WaveStartFx(props) {
  const { waveNumber, duration = 1100, onDone } = props;
  const { Text } = window.TowerLikeGame_28197d;
  const id = React.useMemo(() => 'wv-' + Math.random().toString(36).slice(2, 8), []);
  const css = `
    @keyframes ${id}-in {
      0%   { transform: translate(-50%, -50%) translateX(-40px); opacity: 0; }
      18%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      75%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      100% { transform: translate(-50%, -50%) translateX(40px);  opacity: 0; }
    }
    .${id}-w { position: absolute; left: 50%; top: 26%; pointer-events: none;
      animation: ${id}-in ${duration}ms var(--ease-default) both; }
    .${id}-b { padding: 8px 16px; background: rgba(10,15,28,0.85);
      border: 1px solid var(--c-primary);
      border-radius: var(--r-pill);
      box-shadow: var(--glow-cyan-md);
      display: inline-flex; align-items: baseline; gap: 8px;
      backdrop-filter: blur(6px); }
    @media (prefers-reduced-motion: reduce) { .${id}-w { animation: none; opacity: 1; } }
  `;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement(
      'div',
      { className: id + '-w', onAnimationEnd: onDone },
      React.createElement(
        'div',
        { className: id + '-b' },
        React.createElement(
          Text,
          { variant: 'label', color: 'primary', style: { fontSize: 11 } },
          'WAVE'
        ),
        React.createElement(
          Text,
          {
            variant: 'numeric-l',
            color: 'primary',
            glow: true,
            style: { fontSize: 24, fontWeight: 700 },
          },
          String(waveNumber)
        )
      )
    )
  );
}
