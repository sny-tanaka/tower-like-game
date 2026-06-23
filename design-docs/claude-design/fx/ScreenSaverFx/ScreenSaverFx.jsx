/**
 * ScreenSaverFx — 焼き付き防止用ドリフト演出
 *
 * 焼き付きを防ぐため:
 *   - 何ひとつ同じ位置に常時描画しない
 *   - 各要素は短時間 (~3s) だけ表示 → フェードアウト → 別位置へ瞬間移動 → 再表示
 *
 * 5 種類のあらかじめ定義された経路 (path-1〜5) があり、各 item は index に応じて
 * 経路を割り当てられ、animation-delay で時間差を付ける。
 *
 * props:
 *   - items: ReactNode[]   表示するもの (例 文字列 / Icon / 数値)
 *   - showTower: 中央タワー (リング + アイコン + glow パルス) を内蔵描画。
 *                これも items と同じくドリフトする
 *   - towerContent: showTower=true 時、リングの中央に置く要素 (default は何も置かない)
 *   - cycleSeconds: 1 周のサイクル秒数 (default 24)
 *
 * すべての @keyframes はここに集約。Atom/Molecule/Organism には書かない。
 * prefers-reduced-motion: reduce 時は最初の 1 件のみ静止表示。
 */
export function ScreenSaverFx(props) {
  const { items = [], showTower = false, towerContent = null, cycleSeconds = 24 } = props;

  const id = React.useMemo(() => 'ssfx-' + Math.random().toString(36).slice(2, 8), []);

  const PATHS = [
    [[20, 28], [78, 38], [42, 72], [85, 82]],
    [[62, 18], [16, 48], [82, 62], [32, 86]],
    [[80, 24], [44, 55], [14, 76], [70, 90]],
    [[34, 30], [90, 52], [26, 68], [58, 86]],
    [[50, 14], [22, 42], [76, 70], [46, 94]],
  ];

  const driftCss = PATHS.map((path, idx) => {
    const segLen = 100 / path.length;
    const frames = path.map(([x, y], i) => {
      const s = i * segLen;
      return `
        ${s}%               { left: ${x}%; top: ${y}%; opacity: 0; }
        ${(s + 3).toFixed(2)}%   { left: ${x}%; top: ${y}%; opacity: 1; }
        ${(s + segLen - 7).toFixed(2)}%  { left: ${x}%; top: ${y}%; opacity: 1; }
        ${(s + segLen - 3).toFixed(2)}%  { left: ${x}%; top: ${y}%; opacity: 0; }
      `;
    }).join('');
    return `@keyframes ${id}-drift-${idx + 1} { ${frames} 100% { opacity: 0; } }`;
  }).join('\n');

  const styleEl = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
    .${id}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${PATHS.map((_, i) => `.${id}-p${i + 1} { animation: ${id}-drift-${i + 1} ${cycleSeconds}s linear infinite; }`).join('\n')}
    ${driftCss}

    /* tower composite (rings + glow pulse + slow rotation) */
    @keyframes ${id}-rot   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes ${id}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes ${id}-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes ${id}-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(78,228,246,0.55)) drop-shadow(0 0 16px rgba(78,228,246,0.25)); }
      50%      { filter: drop-shadow(0 0 14px rgba(78,228,246,0.85)) drop-shadow(0 0 32px rgba(78,228,246,0.5)); }
    }
    .${id}-tower      { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
    .${id}-tower-r1   { position: absolute; inset: 0;  border-radius: 50%; border: 1px solid var(--c-primary); box-shadow: var(--glow-cyan-md), inset 0 0 32px rgba(78,228,246,0.18); animation: ${id}-rot 18s linear infinite; }
    .${id}-tower-r2   { position: absolute; inset: 14px; border-radius: 50%; border: 1px dashed rgba(169,107,255,0.6); animation: ${id}-rot-r 24s linear infinite; }
    .${id}-tower-core { color: var(--c-primary-hi); animation: ${id}-pulse 3.6s var(--ease-default) infinite, ${id}-glow 3.6s var(--ease-default) infinite; }

    @media (prefers-reduced-motion: reduce) {
      .${id}-slot { animation: none !important; opacity: 0.55 !important; }
      .${id}-slot:not(.${id}-rm-show) { display: none; }
      .${id}-rm-show { position: relative; transform: none; left: auto; top: auto; }
      .${id}-tower-r1, .${id}-tower-r2, .${id}-tower-core { animation: none !important; }
    }
  ` } });

  const wrapStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  const tower = React.createElement(
    'div',
    { className: id + '-tower' },
    React.createElement('div', { className: id + '-tower-r1' }),
    React.createElement('div', { className: id + '-tower-r2' }),
    React.createElement('div', { className: id + '-tower-core' }, towerContent)
  );

  // tower を items 配列の先頭に挿入してドリフトに混ぜる
  const allItems = showTower ? [tower, ...items] : items;

  return React.createElement(
    'div',
    { style: wrapStyle, 'data-screen-saver-fx': id },
    styleEl,
    allItems.map((item, i) => {
      const pathIdx = (i % PATHS.length) + 1;
      const delay = -(i * (cycleSeconds / Math.max(allItems.length, 1)));
      return React.createElement(
        'div',
        {
          key: i,
          className: `${id}-slot ${id}-p${pathIdx}${i === 0 ? ' ' + id + '-rm-show' : ''}`,
          style: { animationDelay: delay + 's' },
        },
        item
      );
    })
  );
}
