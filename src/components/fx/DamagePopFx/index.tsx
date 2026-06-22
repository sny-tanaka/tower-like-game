import { useId } from 'react';

import styles from './style.module.scss';

import { NumericDisplay } from '@/components/atoms/NumericDisplay';

export interface DamagePopFxProps {
  /** 表示ダメージ数値 */
  value: number;
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** クリティカル表示: 大きめ + warning 色 */
  crit?: boolean;
  /** アニメ時間 ms (default 800) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * DamagePopFx — 敵被弾位置に数値がポップしてフェードアウト。
 * crit=true でクリティカル強調表示（大きめ + warning 色）。
 */
export function DamagePopFx({
  value,
  x,
  y,
  crit = false,
  duration = 800,
  onDone,
}: DamagePopFxProps) {
  const uid = useId().replace(/:/g, 'dp');

  const css = `
    @keyframes ${uid}-pop {
      0%   { transform: translate(-50%, 0) scale(${crit ? 0.6 : 0.8}); opacity: 0; }
      15%  { transform: translate(-50%, -4px) scale(${crit ? 1.15 : 1}); opacity: 1; }
      100% { transform: translate(-50%, -28px) scale(${crit ? 1 : 0.95}); opacity: 0; }
    }
    .${uid} {
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      animation: ${uid}-pop ${duration}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
      filter: drop-shadow(0 0 4px ${crit ? 'rgba(246,185,74,0.7)' : 'rgba(255,255,255,0.45)'});
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid} { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid} ${styles.root}`}
        onAnimationEnd={onDone}
      >
        <NumericDisplay
          value={value}
          size={crit ? 'lg' : 'md'}
          accentColor={crit ? 'warning' : 'scale'}
          glow
          style={crit ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 }}
        />
      </div>
    </>
  );
}
