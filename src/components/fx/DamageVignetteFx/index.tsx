import { useId } from 'react';

export interface DamageVignetteFxProps {
  /** アニメーション時間 ms（デフォルト: 420） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * DamageVignetteFx — マシン被ダメ時に画面端に赤ビネットを表示する Fx。
 *
 * `position: absolute; inset: 0` で全画面に重なる。
 * `prefers-reduced-motion` 時はアニメーション超短縮で即消去。
 */
export function DamageVignetteFx({ duration = 420, onDone }: DamageVignetteFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `vgn-${uid}`;

  const css = `
    @keyframes ${id}-v {
      0%   { opacity: 0; }
      20%  { opacity: 1; }
      100% { opacity: 0; }
    }
    .${id} {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(ellipse at center, transparent 50%, rgba(255,77,109,0.55) 95%),
        radial-gradient(ellipse at center, transparent 65%, rgba(255,77,109,0.3) 100%);
      animation: ${id}-v ${duration}ms var(--ease-out) both;
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
