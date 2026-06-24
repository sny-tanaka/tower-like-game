import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface MachineHitFxProps {
  /** マシン中心の x 座標 (0-100、 .field 空間) */
  cx: number;
  /** マシン中心の y 座標 (0-100、 .field 空間) */
  cy: number;
  /** アニメ長 ms (デフォルト 280) */
  duration?: number;
  /** 完了時のコールバック (= 親で再マウントトリガーをリセット) */
  onDone?: () => void;
}

/**
 * MachineHitFx — マシン本体被ダメ時の赤フラッシュ Fx。
 *
 * 画面全体ビネット (旧 DamageVignetteFx) はチカチカで鬱陶しいため、
 * マシン本体周辺だけが局所的に赤くフラッシュする方式に置換。
 *
 * - .field 空間 (0-100) の cx/cy にマウント
 * - 半径 ~40px の赤発光を一瞬出して 280ms で消える
 * - `prefers-reduced-motion` 時は超短縮で即消去
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 位置 / duration は CSS 変数で渡す。
 */
export function MachineHitFx({ cx, cy, duration = 280, onDone }: MachineHitFxProps) {
  const flashStyle: CSSProperties = {
    ['--mhf-x' as string]: `${cx}%`,
    ['--mhf-y' as string]: `${cy}%`,
    ['--mhf-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={styles.flash}
      style={flashStyle}
      onAnimationEnd={onDone}
      aria-hidden="true"
    />
  );
}
