import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface LaserBeamFxProps {
  /** 発射元 X % */
  x1: number;
  /** 発射元 Y % */
  y1: number;
  /** 着弾点 X % */
  x2: number;
  /** 着弾点 Y % */
  y2: number;
  /** ビーム色 (default: var(--c-primary)) */
  color?: string;
  /** アニメ時間 ms (default 220) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * LaserBeamFx — Laser 発射演出。
 * (x1, y1) → (x2, y2) を結ぶ細いビームが一瞬伸びてフェード。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値
 * (位置 / 長さ / 角度 / 色 / duration) は CSS 変数で渡す。
 * angle は @keyframes 内の transform: rotate(var(--beam-angle)) で展開される。
 */
export function LaserBeamFx({
  x1,
  y1,
  x2,
  y2,
  color = 'var(--c-primary)',
  duration = 220,
  onDone,
}: LaserBeamFxProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const beamStyle: CSSProperties = {
    ['--beam-x' as string]: `${x1}%`,
    ['--beam-y' as string]: `${y1}%`,
    ['--beam-length' as string]: `${length}%`,
    ['--beam-angle' as string]: `${angle}deg`,
    ['--beam-color' as string]: color,
    ['--beam-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={styles.beam}
      style={beamStyle}
      onAnimationEnd={onDone}
    />
  );
}
