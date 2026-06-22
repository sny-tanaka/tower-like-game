import { useId } from 'react';

import styles from './style.module.scss';

export interface ChainBoltFxPoint {
  x: number;
  y: number;
}

export interface ChainBoltFxProps {
  /** 連鎖経路の % 座標配列 (親内座標、2点以上必須) */
  points: ChainBoltFxPoint[];
  /** 電撃色 (default: var(--c-primary)) */
  color?: string;
  /** 1セグメントあたりの ms (default 80) */
  segmentMs?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * ChainBoltFx — Thunder Plasma Discharge 連鎖電撃。
 * SVG polyline でジグザグ電撃を描き、stroke-dashoffset で描画アニメ。
 */
export function ChainBoltFx({
  points,
  color = 'var(--c-primary)',
  segmentMs = 80,
  onDone,
}: ChainBoltFxProps) {
  const uid = useId().replace(/:/g, 'cb');

  if (points.length < 2) return null;

  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const total = (points.length - 1) * segmentMs + 200;

  const css = `
    @keyframes ${uid}-draw {
      0%   { stroke-dashoffset: 200; opacity: 1; }
      80%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    .${uid} { animation: ${uid}-draw ${total}ms var(--ease-out) both; }
    @media (prefers-reduced-motion: reduce) {
      .${uid} { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.svg}
        onAnimationEnd={onDone}
      >
        <path
          className={uid}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={200}
          style={{ filter: `drop-shadow(0 0 1.5px ${color})` }}
        />
      </svg>
    </>
  );
}
