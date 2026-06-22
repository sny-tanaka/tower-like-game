import { useId } from 'react';

import styles from './style.module.scss';

export interface VolleyFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** 発射数 (default 5) */
  count?: number;
  /** 扇形角度 deg (default 360 = 全方位) */
  spreadDeg?: number;
  /** 弾の到達距離 vmin (default 40) */
  range?: number;
  /** アニメ時間 ms (default 600) */
  duration?: number;
  /** 弾色 (default: var(--c-warning)) */
  color?: string;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * VolleyFx — Cannon Volley 演出。
 * 全方位 (spreadDeg=360) または扇形に count 発を同時発射。
 */
export function VolleyFx({
  x,
  y,
  count = 5,
  spreadDeg = 360,
  range = 40,
  duration = 600,
  color = 'var(--c-warning)',
  onDone,
}: VolleyFxProps) {
  const uid = useId().replace(/:/g, 'vl');

  const css = `
    @keyframes ${uid}-fly {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)         scale(1);   opacity: 1; }
      80%  { transform: translate(-50%, -50%) rotate(var(--a)) translateY(${-range}vmin) scale(0.7); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(${-range}vmin) scale(0.3); opacity: 0; }
    }
    .${uid}-w { position: absolute; left: ${x}%; top: ${y}%; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-b {
      position: absolute; left: 0; top: 0;
      width: 8px; height: 8px; border-radius: 50%;
      background: radial-gradient(circle, ${color}, ${color}88 60%, transparent 85%);
      box-shadow: 0 0 8px ${color};
      animation: ${uid}-fly ${duration}ms var(--ease-out) both;
      transform-origin: 0 0;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-b { animation-duration: 1ms; opacity: 0; }
    }
  `;

  const full = spreadDeg >= 360;
  const balls = Array.from({ length: count }, (_, i) => {
    const a = full
      ? (360 / count) * i
      : count > 1
        ? -spreadDeg / 2 + (spreadDeg / (count - 1)) * i
        : 0;
    return (
      <div
        key={i}
        className={`${uid}-b`}
        style={{ '--a': `${a}deg` } as React.CSSProperties}
      />
    );
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-w ${styles.wrap}`}
        onAnimationEnd={onDone}
      >
        {balls}
      </div>
    </>
  );
}
