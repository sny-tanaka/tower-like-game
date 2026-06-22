import type { ReactNode } from 'react';
import { useId } from 'react';

/** 揺れの強度プリセット (px) */
const INTENSITY_PX = {
  small: 4,
  medium: 8,
  large: 14,
} as const;

export interface ScreenShakeFxProps {
  children: ReactNode;
  /** 揺れの強度（デフォルト: 'medium'） */
  intensity?: keyof typeof INTENSITY_PX;
  /** アニメーション時間 ms（デフォルト: 360） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * ScreenShakeFx — 大ダメ・大爆発・ボス出現で画面全体を揺らす Fx。
 *
 * children を包み、マウント直後に短時間シェイクする。
 * 6 keyframes で不規則なシェイクを演出。
 * `prefers-reduced-motion` 時はアニメーション無効。
 */
export function ScreenShakeFx({
  children,
  intensity = 'medium',
  duration = 360,
  onDone,
}: ScreenShakeFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `shk-${uid}`;
  const px = INTENSITY_PX[intensity];

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
    .${id} {
      animation: ${id}-s ${duration}ms var(--ease-out) both;
      width: 100%;
      height: 100%;
    }
    @media (prefers-reduced-motion: reduce) {
      .${id} { animation: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={id}
        onAnimationEnd={onDone}
      >
        {children}
      </div>
    </>
  );
}
