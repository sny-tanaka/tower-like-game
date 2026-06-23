import { useId } from 'react';

export interface TierClearFxProps {
  /** アニメーション時間 ms（デフォルト: 1400） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/** 光線の角度（4 方向 = 0 / 45 / 90 / 135 度） */
const RAY_ANGLES = [0, 45, 90, 135] as const;

/**
 * TierClearFx — Tier クリア時のフィナーレ全画面演出 Fx。
 *
 * 1) 緑 → cyan の二段フラッシュ（radial-gradient）
 * 2) 中央から放射状の光線（4 方向）
 * 3) 上下に走るネオンライン（2 本）
 *
 * `prefers-reduced-motion` 時はアニメーション超短縮で即消去。
 */
export function TierClearFx({ duration = 1400, onDone }: TierClearFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `tc-${uid}`;
  const rayDuration = Math.round(duration * 0.85);

  const css = `
    @keyframes ${id}-flash {
      0%   { opacity: 0; background: radial-gradient(ellipse at center, rgba(70,226,160,0.5), transparent 65%); }
      8%   { opacity: 1; background: radial-gradient(ellipse at center, rgba(70,226,160,0.5), transparent 65%); }
      30%  { opacity: 0; }
      40%  { opacity: 1; background: radial-gradient(ellipse at center, rgba(78,228,246,0.5), transparent 65%); }
      100% { opacity: 0; }
    }
    @keyframes ${id}-ray {
      0%   { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(0); opacity: 0; }
      20%  { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(var(--a)) scaleY(1); opacity: 0; }
    }
    @keyframes ${id}-band {
      0%   { transform: scaleX(0); opacity: 1; }
      30%  { transform: scaleX(1); opacity: 1; }
      100% { transform: scaleX(1); opacity: 0; }
    }
    .${id}-w {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: var(--z-fx-field);
    }
    .${id}-fl {
      position: absolute;
      inset: 0;
      animation: ${id}-flash ${duration}ms var(--ease-out) both;
    }
    .${id}-rw {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 4px;
      height: 70%;
      background: linear-gradient(180deg, transparent, var(--c-primary-hi), transparent);
      transform-origin: 50% 50%;
      animation: ${id}-ray ${rayDuration}ms var(--ease-out) both;
    }
    .${id}-bd {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--c-primary-hi), transparent);
      box-shadow: 0 0 12px var(--c-primary-hi);
      transform-origin: 0 50%;
      animation: ${id}-band ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-fl, .${id}-rw, .${id}-bd { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${id}-w`}
        onAnimationEnd={onDone}
      >
        <div className={`${id}-fl`} />
        <div
          className={`${id}-bd`}
          style={{ top: '34%' }}
        />
        <div
          className={`${id}-bd`}
          style={{ top: '64%' }}
        />
        {RAY_ANGLES.map((angle) => (
          <div
            key={angle}
            className={`${id}-rw`}
            style={{ ['--a' as string]: `${angle}deg` }}
          />
        ))}
      </div>
    </>
  );
}
