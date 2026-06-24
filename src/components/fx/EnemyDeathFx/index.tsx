import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface EnemyDeathFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** パーティクル色 (default: var(--c-text-mid)) */
  color?: string;
  /** アニメ時間 ms (default 480) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

const SHARD_COUNT = 8;

/**
 * EnemyDeathFx — 敵撃破位置にパーティクル発散 + 中央フラッシュ。
 * 8 方向に粒子が飛び散る。Elite/Boss は color prop で色変更。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値
 * (位置 / duration / 色 / shard 角度) は CSS 変数で渡す。
 */
export function EnemyDeathFx({
  x,
  y,
  color = 'var(--c-text-mid)',
  duration = 480,
  onDone,
}: EnemyDeathFxProps) {
  // フラッシュの radial-gradient 色: デフォルト色はグレー系
  const flashColor = color === 'var(--c-text-mid)' ? 'rgba(167,184,216,0.9)' : color;

  const wrapStyle: CSSProperties = {
    ['--death-x' as string]: `${x}%`,
    ['--death-y' as string]: `${y}%`,
    ['--death-duration' as string]: `${duration}ms`,
    ['--death-color' as string]: color,
    ['--death-flash-color' as string]: flashColor,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.flash} />
      {Array.from({ length: SHARD_COUNT }, (_, i) => (
        <div
          key={i}
          className={styles.shard}
          style={{ ['--death-shard-angle' as string]: `${(i * 360) / SHARD_COUNT}deg` }}
        />
      ))}
    </div>
  );
}
