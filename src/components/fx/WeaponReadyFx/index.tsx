import styles from './style.module.scss';

/**
 * WeaponReadyFx — 武器スロットが ready 状態のときに発光パルスを重ねる Fx。
 *
 * - マウント = アニメ開始、アンマウント = 停止（親が条件付きレンダリングで制御）
 * - `position: absolute; inset: 0` で親スロットに完全に重なる
 * - `border-radius: inherit` で親の角丸を引き継ぐ
 * - `prefers-reduced-motion` 時はアニメーションなし（ボーダー発光は維持）
 */
export function WeaponReadyFx() {
  return (
    <span
      className={styles.pulse}
      aria-hidden="true"
    />
  );
}
