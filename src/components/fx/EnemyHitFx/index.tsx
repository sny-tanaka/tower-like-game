import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface EnemyHitFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** フラッシュ色 (default: var(--c-primary-hi)) */
  color?: string;
  /** アニメ時間 ms (default 220) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * EnemyHitFx — 敵被弾位置に短い光点フラッシュ。
 * 死亡しない打撃で頻繁に使う軽量演出。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値
 * (位置 / duration / color) は CSS 変数で渡す。
 */
export function EnemyHitFx({
  x,
  y,
  color = 'var(--c-primary-hi)',
  duration = 220,
  onDone,
}: EnemyHitFxProps) {
  const wrapStyle: CSSProperties = {
    ['--hit-x' as string]: `${x}%`,
    ['--hit-y' as string]: `${y}%`,
    ['--hit-duration' as string]: `${duration}ms`,
    ['--hit-color' as string]: color,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.dot} />
    </div>
  );
}
