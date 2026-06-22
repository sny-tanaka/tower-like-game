import { useId } from 'react';

import styles from './style.module.scss';

export interface BlastFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** 爆発半径 (vmin 単位) */
  radius?: number;
  /** 爆発色 (default: var(--c-warning)) */
  color?: string;
  /** アニメ時間 ms (default 520) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * BlastFx — Cannon 着弾点の範囲爆発。
 * 拡大するリング + 中央フラッシュで爆発範囲を表現。
 */
export function BlastFx({
  x,
  y,
  radius = 12,
  color = 'var(--c-warning)',
  duration = 520,
  onDone,
}: BlastFxProps) {
  const uid = useId().replace(/:/g, 'bl');
  const flashDuration = Math.round(duration * 0.5);

  const css = `
    @keyframes ${uid}-ring {
      0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-width: 3px; }
      30%  { transform: translate(-50%, -50%) scale(1);   opacity: 1; border-width: 3px; }
      100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; border-width: 1px; }
    }
    @keyframes ${uid}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
    }
    .${uid}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-ring  {
      position: absolute; left: 0; top: 0;
      width: ${radius * 2}vmin; height: ${radius * 2}vmin; border-radius: 50%;
      border: 3px solid ${color};
      box-shadow: 0 0 24px ${color}aa, inset 0 0 24px ${color}66;
      animation: ${uid}-ring ${duration}ms var(--ease-out) both;
    }
    .${uid}-flash {
      position: absolute; left: 0; top: 0;
      width: ${radius * 2}vmin; height: ${radius * 2}vmin; border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 60%);
      animation: ${uid}-flash ${flashDuration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-ring, .${uid}-flash { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-wrap ${styles.wrap}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onAnimationEnd={onDone}
      >
        <div className={`${uid}-flash`} />
        <div className={`${uid}-ring`} />
      </div>
    </>
  );
}
