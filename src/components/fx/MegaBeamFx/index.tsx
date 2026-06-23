import { useId } from 'react';

import styles from './style.module.scss';

export interface MegaBeamFxProps {
  /** 発射元 X % */
  x: number;
  /** 発射元 Y % */
  y: number;
  /** ビームの発射角度 (deg, 0=右向き) */
  angle?: number;
  /** アニメ時間 ms (default 600) */
  duration?: number;
  /** ビーム色 (default: var(--c-primary-hi)) */
  color?: string;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * MegaBeamFx — Laser Mega Beam。
 * (x, y) から angle 方向に太いビームが画面端まで伸びる。
 */
export function MegaBeamFx({
  x,
  y,
  angle = 0,
  duration = 600,
  color = 'var(--c-primary-hi)',
  onDone,
}: MegaBeamFxProps) {
  const uid = useId().replace(/:/g, 'mb');

  const css = `
    @keyframes ${uid}-grow {
      0%   { transform: rotate(${angle}deg) scaleX(0)   scaleY(0.3); opacity: 0.6; }
      18%  { transform: rotate(${angle}deg) scaleX(1)   scaleY(1);   opacity: 1; }
      70%  { transform: rotate(${angle}deg) scaleX(1)   scaleY(1);   opacity: 1; }
      100% { transform: rotate(${angle}deg) scaleX(1)   scaleY(0.2); opacity: 0; }
    }
    .${uid} {
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: 150%; height: 12px;
      background: linear-gradient(90deg, ${color}, transparent 95%);
      box-shadow: 0 0 18px ${color}, 0 0 36px ${color}88;
      transform-origin: 0 50%;
      animation: ${uid}-grow ${duration}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      border-radius: 6px;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid} { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid} ${styles.beam}`}
        onAnimationEnd={onDone}
      />
    </>
  );
}
