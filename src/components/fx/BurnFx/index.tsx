import { useId } from 'react';

import styles from './style.module.scss';

export interface BurnFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** 炎色 (default: var(--c-danger)) */
  color?: string;
}

/**
 * BurnFx — 燃焼継続演出 (ループ系)。
 * 敵から炎が立ち上がる。親 unmount で停止。
 */
export function BurnFx({ x, y, color = 'var(--c-danger)' }: BurnFxProps) {
  const uid = useId().replace(/:/g, 'bn');

  const css = `
    @keyframes ${uid}-flick {
      0%, 100% { transform: translate(-50%, -50%) scale(0.9, 1.1); opacity: 0.85; }
      50%      { transform: translate(-50%, -50%) scale(1.1, 0.9); opacity: 1; }
    }
    @keyframes ${uid}-up {
      0%   { transform: translate(-50%, 0)     scale(1);   opacity: 0.9; }
      100% { transform: translate(-50%, -14px) scale(0.4); opacity: 0; }
    }
    .${uid}-w    { position: absolute; pointer-events: none; z-index: var(--z-fx-field); }
    .${uid}-core {
      position: absolute; left: 0; top: 0;
      width: 16px; height: 22px;
      border-radius: 50% 50% 40% 40%;
      background: radial-gradient(ellipse at center bottom, #ffd97a, ${color} 60%, transparent 90%);
      filter: drop-shadow(0 0 6px ${color}aa);
      animation: ${uid}-flick 360ms ease-in-out infinite;
    }
    .${uid}-em {
      position: absolute; left: 0; top: -2px;
      width: 4px; height: 4px; border-radius: 50%;
      background: ${color};
      opacity: 0;
      animation: ${uid}-up 700ms ease-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-core, .${uid}-em { animation: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-w ${styles.wrap}`}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <div className={`${uid}-core`} />
        <div
          className={`${uid}-em`}
          style={{ animationDelay: '0ms' }}
        />
        <div
          className={`${uid}-em`}
          style={{ animationDelay: '180ms', left: '4px' }}
        />
        <div
          className={`${uid}-em`}
          style={{ animationDelay: '360ms', left: '-4px' }}
        />
      </div>
    </>
  );
}
