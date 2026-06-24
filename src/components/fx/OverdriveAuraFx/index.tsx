import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface OverdriveAuraFxProps {
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** オーラの直径 px (default 80) */
  size?: number;
  /** オーラ色 (default: var(--c-secondary)) */
  color?: string;
}

/**
 * OverdriveAuraFx — Cutter Overdrive 発動中のループ系オーラ。
 * マシン周囲に 2 重の回転光輪 + パルスを描画。
 * ループ系: onDone / duration なし。親の unmount で停止。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 位置 / サイズ / 色は CSS 変数で渡す。
 * box-shadow の透明度違い色は color-mix で生成 (旧実装: ${color}88 文字列結合)。
 */
export function OverdriveAuraFx({
  x,
  y,
  size = 80,
  color = 'var(--c-secondary)',
}: OverdriveAuraFxProps) {
  const wrapStyle: CSSProperties = {
    ['--oa-x' as string]: `${x}%`,
    ['--oa-y' as string]: `${y}%`,
    ['--oa-size' as string]: `${size}px`,
    ['--oa-color' as string]: color,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
    >
      <div className={styles.r1} />
      <div className={styles.r2} />
    </div>
  );
}
