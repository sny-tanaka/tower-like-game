import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface MegaBeamFxProps {
  /** 発射元 X % */
  x: number;
  /** 発射元 Y % */
  y: number;
  /** ビームの発射角度 (deg, 0=右向き) */
  angle?: number;
  /** アニメ時間 ms (default 600) */
  duration?: number;
  /** ビーム色 (default: var(--c-primary-hi)) */
  color?: string;
  /**
   * ビームの太さ (親 = .field の % 単位)。
   * laser.ts の LASER_MEGA_BEAM_WIDTH_PCT (= 12) と揃えてヒット判定と視覚を一致させる。
   * default: 12
   */
  widthPct?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * MegaBeamFx — Laser Mega Beam。
 * (x, y) から angle 方向に太いビームが画面端まで伸びる。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値
 * (位置 / 角度 / 色 / duration) は CSS 変数で渡す。
 */
export function MegaBeamFx({
  x,
  y,
  angle = 0,
  duration = 600,
  color = 'var(--c-primary-hi)',
  widthPct = 12,
  onDone,
}: MegaBeamFxProps) {
  const beamStyle: CSSProperties = {
    ['--mb-x' as string]: `${x}%`,
    ['--mb-y' as string]: `${y}%`,
    ['--mb-angle' as string]: `${angle}deg`,
    ['--mb-color' as string]: color,
    ['--mb-duration' as string]: `${duration}ms`,
    ['--mb-width' as string]: `${widthPct}%`,
  };

  return (
    <div
      className={styles.beam}
      style={beamStyle}
      onAnimationEnd={onDone}
    />
  );
}
