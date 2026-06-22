import { useId } from 'react';

export interface HealFlashFxProps {
  /** アニメーション時間 ms（デフォルト: 480） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * HealFlashFx — HP リジェネ・回復パッチ発動時に画面全体へ緑フラッシュをかける Fx。
 *
 * `position: absolute; inset: 0` で全画面に重なる中央放射グラデーション。
 * `prefers-reduced-motion` 時はアニメーション超短縮で即消去。
 */
export function HealFlashFx({ duration = 480, onDone }: HealFlashFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `hl-${uid}`;

  const css = `
    @keyframes ${id}-h {
      0%   { opacity: 0; }
      25%  { opacity: 1; }
      100% { opacity: 0; }
    }
    .${id} {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(ellipse at center, rgba(70,226,160,0.35) 0%, transparent 70%);
      animation: ${id}-h ${duration}ms var(--ease-out) both;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) {
      .${id} { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={id}
        onAnimationEnd={onDone}
      />
    </>
  );
}
