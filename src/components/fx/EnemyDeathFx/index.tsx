import { useId } from 'react';

import styles from './style.module.scss';

export interface EnemyDeathFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** パーティクル色 (default: var(--c-text-mid)) */
  color?: string;
  /** アニメ時間 ms (default 480) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

const SHARD_COUNT = 8;

/**
 * EnemyDeathFx — 敵撃破位置にパーティクル発散 + 中央フラッシュ。
 * 8 方向に粒子が飛び散る。Elite/Boss は color prop で色変更。
 */
export function EnemyDeathFx({
  x,
  y,
  color = 'var(--c-text-mid)',
  duration = 480,
  onDone,
}: EnemyDeathFxProps) {
  const uid = useId().replace(/:/g, 'ed');

  // フラッシュの radial-gradient 色: デフォルト色はグレー系
  const flashColor = color === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : color;

  const css = `
    @keyframes ${uid}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes ${uid}-shard {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)     scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; }
    }
    .${uid}-wrap  { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-flash {
      position: absolute; left: 0; top: 0;
      width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, ${flashColor}, transparent 65%);
      animation: ${uid}-flash ${duration}ms var(--ease-out) both;
    }
    .${uid}-shard {
      position: absolute; left: 0; top: 0;
      width: 4px; height: 4px;
      background: ${color};
      box-shadow: 0 0 4px ${color};
      animation: ${uid}-shard ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-flash, .${uid}-shard { animation-duration: 1ms; opacity: 0; }
    }
  `;

  const shards = Array.from({ length: SHARD_COUNT }, (_, i) => (
    <div
      key={i}
      className={`${uid}-shard`}
      style={{ '--a': `${(i * 360) / SHARD_COUNT}deg` } as React.CSSProperties}
    />
  ));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-wrap ${styles.wrap}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onAnimationEnd={onDone}
      >
        <div className={`${uid}-flash`} />
        {shards}
      </div>
    </>
  );
}
