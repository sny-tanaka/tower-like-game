import type { CSSProperties } from 'react';

import styles from './style.module.scss';

export interface TapRingFxProps {
  /** field 内パーセント座標 X (0–100) — 攻撃対象の敵の位置 */
  x: number;
  /** field 内パーセント座標 Y (0–100) — 攻撃対象の敵の位置 */
  y: number;
  /**
   * アニメ時間 ms (default 800)。
   *
   * v1.4.0 初版は 320ms で「リング広がり」 だけだが、 DamagePopFx (800ms) と同時に
   * 親 FxLayer がアンマウントする設計のため、 320ms 完了後 480ms 間は opacity:0 の
   * 不活性 DOM ノードが残留してしまう (iOS Safari の paint tree / style 再計算負荷増)。
   * → duration を 800ms に揃えてアニメと寿命を一致させる (前半 320ms でリング広がり、
   * 残り 480ms は opacity 0 のまま静止)。
   */
  duration?: number;
  /** アニメ完了時に親へ通知 (Pool 戻し用) */
  onDone?: () => void;
}

/**
 * TapRingFx — v1.4.0 タップ攻撃のフィードバック Fx。
 *
 * 攻撃対象の敵位置から外向きに広がるシアンリング 1-shot。 「自分のタップがこの敵に当たった」
 * を視覚的に分かりやすくする。 `x` / `y` は field 内の % 座標 (EnemyHitFx と同じ規約)。
 *
 * 設計方針:
 *   - マウント = アニメ開始、 アンマウント = 停止 (親が条件付きレンダリング制御)
 *   - 静的 @keyframes は SCSS module 側、 インスタンス固有値 (位置 / duration) は CSS 変数
 *   - prefers-reduced-motion 時は即時 fade out (1ms duration)
 *   - 描画は border + background-radial-gradient のみ。 box-shadow / drop-shadow は使わない
 *     (v1.3.7-1.3.9 で発熱対策として撤廃した方針に従う)
 */
export function TapRingFx({ x, y, duration = 800, onDone }: TapRingFxProps) {
  const wrapStyle: CSSProperties = {
    ['--tap-x' as string]: `${x}%`,
    ['--tap-y' as string]: `${y}%`,
    ['--tap-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
      aria-hidden="true"
    >
      <div className={styles.ring} />
    </div>
  );
}
