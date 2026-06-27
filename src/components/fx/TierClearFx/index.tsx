import type { CSSProperties } from 'react';

import styles from './style.module.scss';

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
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 duration / 各 ray の角度は
 * CSS 変数で渡す。
 */
export function TierClearFx({ duration = 1400, onDone }: TierClearFxProps) {
  const rayDuration = Math.round(duration * 0.85);

  const wrapStyle: CSSProperties = {
    ['--tc-duration' as string]: `${duration}ms`,
    ['--tc-ray-duration' as string]: `${rayDuration}ms`,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.flash} />
      <div className={`${styles.band} ${styles.bandTop}`} />
      <div className={`${styles.band} ${styles.bandBottom}`} />
      {RAY_ANGLES.map((angle) => (
        <div
          key={angle}
          className={styles.ray}
          style={{ ['--tc-a' as string]: `${angle}deg` }}
        />
      ))}
    </div>
  );
}
