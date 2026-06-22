import { useId } from 'react';

import styles from './style.module.scss';

export interface OverdriveAuraFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** オーラの直径 px (default 80) */
  size?: number;
  /** オーラ色 (default: var(--c-secondary)) */
  color?: string;
}

/**
 * OverdriveAuraFx — Cutter Overdrive 発動中のループ系オーラ。
 * マシン周囲に 2 重の回転光輪 + パルスを描画。
 * ループ系: onDone / duration なし。親の unmount で停止。
 */
export function OverdriveAuraFx({
  x,
  y,
  size = 80,
  color = 'var(--c-secondary)',
}: OverdriveAuraFxProps) {
  const uid = useId().replace(/:/g, 'oa');

  const css = `
    @keyframes ${uid}-rot   { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
    @keyframes ${uid}-rot-r { from { transform: rotate(360deg); } to { transform: rotate(0deg);   } }
    @keyframes ${uid}-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
    .${uid}-w {
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: ${size}px; height: ${size}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: var(--z-fx-field);
      animation: ${uid}-pulse 1.2s ease-in-out infinite;
    }
    .${uid}-r1 {
      position: absolute; inset: 0; border-radius: 50%;
      border: 2px dashed ${color};
      box-shadow: 0 0 16px ${color}88;
      animation: ${uid}-rot 2.4s linear infinite;
    }
    .${uid}-r2 {
      position: absolute; inset: 12px; border-radius: 50%;
      border: 1px solid ${color};
      opacity: 0.6;
      animation: ${uid}-rot-r 3.6s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-w, .${uid}-r1, .${uid}-r2 { animation: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`${uid}-w ${styles.wrap}`}>
        <div className={`${uid}-r1`} />
        <div className={`${uid}-r2`} />
      </div>
    </>
  );
}
