import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface BlastFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** 爆発半径 (vmin 単位) */
  radius?: number;
  /** 爆発色 (default: var(--c-warning)) */
  color?: string;
  /** アニメ時間 ms (default 520) */
  duration?: number;
  /** アニメ開始遅延 ms (default 0)。 砲弾着弾後に爆発を出したい場合に使う */
  delayMs?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * BlastFx — Cannon 着弾点の範囲爆発。
 * 拡大するリング + 中央フラッシュで爆発範囲を表現。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値
 * (位置 / サイズ / 色 / duration / delay) は CSS 変数で渡す。
 */
export function BlastFx({
  x,
  y,
  radius = 12,
  color = 'var(--c-warning)',
  duration = 520,
  delayMs = 0,
  onDone,
}: BlastFxProps) {
  const flashDuration = Math.round(duration * 0.5);
  const wrapStyle: CSSProperties = {
    ['--blast-x' as string]: `${x}%`,
    ['--blast-y' as string]: `${y}%`,
    ['--blast-size' as string]: `${radius * 2}vmin`,
    ['--blast-color' as string]: color,
    ['--blast-color-aa' as string]: `${color}aa`,
    ['--blast-color-66' as string]: `${color}66`,
    ['--blast-duration' as string]: `${duration}ms`,
    ['--blast-flash-duration' as string]: `${flashDuration}ms`,
    ['--blast-delay' as string]: `${delayMs}ms`,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.flash} />
      <div className={styles.ring} />
    </div>
  );
}
