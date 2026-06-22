import type { ReactNode } from 'react';
import { useId } from 'react';

/**
 * ドリフト経路定義。
 * 各 path は [[left%, top%], ...] の座標リスト。
 * 要素は短時間だけ表示 → フェードアウト → 別位置へ瞬間移動 → 再表示のサイクル。
 */
const PATHS: [number, number][][] = [
  [
    [20, 28],
    [78, 38],
    [42, 72],
    [85, 82],
  ],
  [
    [62, 18],
    [16, 48],
    [82, 62],
    [32, 86],
  ],
  [
    [80, 24],
    [44, 55],
    [14, 76],
    [70, 90],
  ],
  [
    [34, 30],
    [90, 52],
    [26, 68],
    [58, 86],
  ],
  [
    [50, 14],
    [22, 42],
    [76, 70],
    [46, 94],
  ],
];

export interface ScreenSaverFxProps {
  /** ドリフトさせるコンテンツ一覧 */
  items?: ReactNode[];
  /** タワーコンポジット（リング + glow パルス）を中央に描画するか */
  showTower?: boolean;
  /** showTower=true 時にリングの中央に置くコンテンツ */
  towerContent?: ReactNode;
  /** 1 周のサイクル秒数（デフォルト: 24） */
  cycleSeconds?: number;
}

/**
 * ScreenSaverFx — スクリーンセーバー起動時のフルスクリーン軽量ループアニメ Fx。
 *
 * 焼き付き防止のため各要素は異なる経路上を漂い、一定時間ごとに位置を変える。
 * ループ系 Fx なので duration は持たず、unmount で停止。
 *
 * `prefers-reduced-motion: reduce` 時は最初の 1 件のみ静止表示。
 */
export function ScreenSaverFx({
  items = [],
  showTower = false,
  towerContent = null,
  cycleSeconds = 24,
}: ScreenSaverFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `ssfx-${uid}`;

  // 各経路の @keyframes を生成
  const driftCss = PATHS.map((path, idx) => {
    const segLen = 100 / path.length;
    const frames = path
      .map(([x, y], i) => {
        const s = i * segLen;
        return `
          ${s}%               { left: ${x}%; top: ${y}%; opacity: 0; }
          ${(s + 3).toFixed(2)}%   { left: ${x}%; top: ${y}%; opacity: 1; }
          ${(s + segLen - 7).toFixed(2)}%  { left: ${x}%; top: ${y}%; opacity: 1; }
          ${(s + segLen - 3).toFixed(2)}%  { left: ${x}%; top: ${y}%; opacity: 0; }
        `;
      })
      .join('');
    return `@keyframes ${id}-drift-${idx + 1} { ${frames} 100% { opacity: 0; } }`;
  }).join('\n');

  const pathAnimations = PATHS.map(
    (_, i) =>
      `.${id}-p${i + 1} { animation: ${id}-drift-${i + 1} ${cycleSeconds}s linear infinite; }`
  ).join('\n');

  const css = `
    .${id}-slot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      will-change: left, top, opacity;
    }
    ${pathAnimations}
    ${driftCss}

    /* tower composite (rings + glow pulse + slow rotation) */
    @keyframes ${id}-rot   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
    @keyframes ${id}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes ${id}-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes ${id}-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(78,228,246,0.55)) drop-shadow(0 0 16px rgba(78,228,246,0.25)); }
      50%      { filter: drop-shadow(0 0 14px rgba(78,228,246,0.85)) drop-shadow(0 0 32px rgba(78,228,246,0.5)); }
    }
    .${id}-tower {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${id}-tower-r1 {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid var(--c-primary);
      box-shadow: var(--glow-cyan-md), inset 0 0 32px rgba(78,228,246,0.18);
      animation: ${id}-rot 18s linear infinite;
    }
    .${id}-tower-r2 {
      position: absolute;
      inset: 14px;
      border-radius: 50%;
      border: 1px dashed rgba(169,107,255,0.6);
      animation: ${id}-rot-r 24s linear infinite;
    }
    .${id}-tower-core {
      color: var(--c-primary-hi);
      animation: ${id}-pulse 3.6s var(--ease-default) infinite, ${id}-glow 3.6s var(--ease-default) infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-slot { animation: none !important; opacity: 0.55 !important; }
      .${id}-slot:not(.${id}-rm-show) { display: none; }
      .${id}-rm-show { position: relative; transform: none; left: auto; top: auto; }
      .${id}-tower-r1, .${id}-tower-r2, .${id}-tower-core { animation: none !important; }
    }
  `;

  const tower = (
    <div className={`${id}-tower`}>
      <div className={`${id}-tower-r1`} />
      <div className={`${id}-tower-r2`} />
      <div className={`${id}-tower-core`}>{towerContent}</div>
    </div>
  );

  const allItems = showTower ? [tower, ...items] : [...items];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      data-screen-saver-fx={id}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {allItems.map((item, i) => {
        const pathIdx = (i % PATHS.length) + 1;
        const delay = -(i * (cycleSeconds / Math.max(allItems.length, 1)));
        return (
          <div
            key={i}
            className={`${id}-slot ${id}-p${pathIdx}${i === 0 ? ` ${id}-rm-show` : ''}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
