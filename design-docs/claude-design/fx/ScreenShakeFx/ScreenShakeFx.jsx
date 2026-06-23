/**
 * ScreenShakeFx — 画面全体のシェイク (大ダメ・大爆発・ボス出現)
 * children を包み、マウント直後に短時間シェイク。
 *
 * intensity: 'light' 4px / 'medium' 8px / 'heavy' 14px
 */
const INTENSITY = { light: 4, medium: 8, heavy: 14 };

export function ScreenShakeFx(props) {
  const { children, intensity = 'medium', duration = 360, onDone } = props;
  const id = React.useMemo(() => 'shk-' + Math.random().toString(36).slice(2, 8), []);
  const px = INTENSITY[intensity] || 8;
  // 6 keyframes for an erratic shake
  const css = `
    @keyframes ${id}-s {
      0%   { transform: translate(0, 0); }
      15%  { transform: translate(${-px}px, ${px / 2}px); }
      30%  { transform: translate(${px}px,  ${-px}px); }
      45%  { transform: translate(${-px / 2}px, ${px}px); }
      60%  { transform: translate(${px / 2}px,  ${-px / 2}px); }
      80%  { transform: translate(${-px / 3}px, ${px / 4}px); }
      100% { transform: translate(0, 0); }
    }
    .${id} { animation: ${id}-s ${duration}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) { .${id} { animation: none; } }
  `;
  return React.createElement(
    React.Fragment, null,
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),
    React.createElement('div', { className: id, onAnimationEnd: onDone, style: { width: '100%', height: '100%' } }, children)
  );
}
