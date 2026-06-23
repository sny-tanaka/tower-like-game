import { useId } from 'react';

export interface LevelUpFxProps {
  x: number;
  y: number;
  duration?: number;
  onDone?: () => void;
}

const SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

/**
 * LevelUpFx — 強化購入時にカード上で発火するキラキラ演出。
 * 中央バーストフラッシュ + 8 方向スパークを放射状に広げる。
 * マウント = 再生開始、アンマウント = 停止。
 */
export function LevelUpFx({ x, y, duration = 600, onDone }: LevelUpFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `lvl-${uid}`;

  const css = `
    @keyframes ${id}-burst {
      0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      40%  { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
    }
    @keyframes ${id}-spark {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)     scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) translateY(-18px) scale(0.4); opacity: 0; }
    }
    .${id}-w {
      position: absolute;
      pointer-events: none;
    }
    .${id}-b {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--c-primary-hi) 0%, transparent 70%);
      box-shadow: var(--glow-cyan-md);
      animation: ${id}-burst ${duration}ms var(--ease-out) both;
    }
    .${id}-s {
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 4px;
      background: var(--c-primary-hi);
      box-shadow: 0 0 4px var(--c-primary-hi);
      transform-origin: 0 0;
      animation: ${id}-spark ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-b, .${id}-s { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${id}-w`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onAnimationEnd={onDone}
      >
        <div className={`${id}-b`} />
        {SPARK_ANGLES.map((angle) => (
          <div
            key={angle}
            className={`${id}-s`}
            style={{ ['--a' as string]: `${angle}deg` }}
          />
        ))}
      </div>
    </>
  );
}
