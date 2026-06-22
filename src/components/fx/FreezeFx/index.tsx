import { useId } from 'react';

import styles from './style.module.scss';

export interface FreezeFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** スノーフレークの直径 px (default 18) */
  size?: number;
}

/**
 * FreezeFx — 凍結発動演出 (ループ系)。
 * 敵に氷晶が貼り付くスノーフレーク + パルス。親 unmount で停止。
 */
export function FreezeFx({ x, y, size = 18 }: FreezeFxProps) {
  const uid = useId().replace(/:/g, 'fz');
  const half = size / 2;

  const css = `
    @keyframes ${uid}-pulse {
      0%, 100% { opacity: 0.7; transform: rotate(0deg)   translate(-50%, -50%); }
      50%      { opacity: 1;   transform: rotate(8deg)   translate(-50%, -50%); }
    }
    .${uid}-w { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-c {
      position: absolute; left: 0; top: 0;
      color: var(--c-primary-hi);
      filter: drop-shadow(0 0 6px rgba(138,243,255,0.7));
      transform-origin: 0 0;
      animation: ${uid}-pulse 1.6s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-c { animation: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-w ${styles.wrap}`}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <svg
          className={`${uid}-c`}
          width={size}
          height={size}
          viewBox={`${-half - 2} ${-half - 2} ${size + 4} ${size + 4}`}
          style={{ display: 'block' }}
        >
          {[0, 60, 120].map((deg) => (
            <line
              key={deg}
              x1={-half}
              y1={0}
              x2={half}
              y2={0}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle
            cx={0}
            cy={0}
            r={2.2}
            fill="currentColor"
          />
        </svg>
      </div>
    </>
  );
}
