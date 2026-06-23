import { useId } from 'react';

import styles from './style.module.scss';

export interface LaserBeamFxProps {
  /** 発射元 X % */
  x1: number;
  /** 発射元 Y % */
  y1: number;
  /** 着弾点 X % */
  x2: number;
  /** 着弾点 Y % */
  y2: number;
  /** ビーム色 (default: var(--c-primary)) */
  color?: string;
  /** アニメ時間 ms (default 220) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * LaserBeamFx — Laser 発射演出。
 * (x1, y1) → (x2, y2) を結ぶ細いビームが一瞬伸びてフェード。
 */
export function LaserBeamFx({
  x1,
  y1,
  x2,
  y2,
  color = 'var(--c-primary)',
  duration = 220,
  onDone,
}: LaserBeamFxProps) {
  const uid = useId().replace(/:/g, 'lb');

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const css = `
    @keyframes ${uid}-beam {
      0%   { transform: rotate(${angle}deg) scaleX(0); opacity: 1; }
      30%  { transform: rotate(${angle}deg) scaleX(1); opacity: 1; }
      100% { transform: rotate(${angle}deg) scaleX(1); opacity: 0; }
    }
    .${uid} {
      position: absolute;
      left: ${x1}%; top: ${y1}%;
      width: ${length}%;
      height: 2px;
      background: ${color};
      transform-origin: 0 50%;
      box-shadow: 0 0 6px ${color}, 0 0 14px ${color};
      animation: ${uid}-beam ${duration}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
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
