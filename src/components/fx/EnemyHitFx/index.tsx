import { useId } from 'react';

import styles from './style.module.scss';

export interface EnemyHitFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** フラッシュ色 (default: var(--c-primary-hi)) */
  color?: string;
  /** アニメ時間 ms (default 220) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * EnemyHitFx — 敵被弾位置に短い光点フラッシュ。
 * 死亡しない打撃で頻繁に使う軽量演出。
 */
export function EnemyHitFx({
  x,
  y,
  color = 'var(--c-primary-hi)',
  duration = 220,
  onDone,
}: EnemyHitFxProps) {
  const uid = useId().replace(/:/g, 'eh');

  const css = `
    @keyframes ${uid}-f {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
    .${uid}-w { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-d {
      position: absolute;
      left: 0; top: 0;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, ${color}, transparent 60%);
      animation: ${uid}-f ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-d { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-w ${styles.wrap}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onAnimationEnd={onDone}
      >
        <div className={`${uid}-d`} />
      </div>
    </>
  );
}
