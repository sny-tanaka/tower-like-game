import { useEffect, useState } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// v1.4.7: iOS メモリ対策 — left/top の CSS transition は毎フレーム layout 再計算を
// 誘発する (layout thrashing)。 Cannon 連発時は 20+ 発が同時飛翔するため負荷が大きい。
// EnemySprite.tsx (`formatEnemyTransform` / `FIELD_CQMIN_SCALE`) と同じ方式で、
// left/top はマウント時の値に固定し、 移動は transform (translate3d) の transition で
// 行うよう変更。 `.field` は 140cqmin × 140cqmin の正方形なので、 position の % を
// cqmin に変換するには 1% = 1.4cqmin (FIELD_CQMIN_SCALE) を用いる。
// ---------------------------------------------------------------------------

/**
 * `.field` の cqmin スケール係数。 EnemySprite.tsx の `FIELD_CQMIN_SCALE` と同じ値
 * (定義元は編集禁止のため値を複製)。 `.field` の CSS サイズが変わったら両方見直すこと。
 */
const FIELD_CQMIN_SCALE = 1.4;

/**
 * 砲弾の移動量 (dx, dy) から transform 文字列を生成する純粋関数。
 * `.shell` の SCSS 側に `transform: translate(-50%, -50%)` (中央寄せ) があるため、
 * 上書きしないよう `translate3d(...) translate(-50%, -50%)` の順で連結する。
 * テストと本体の両方で使うため named export。
 */
export function formatShellTransform(dx: number, dy: number): string {
  return `translate3d(${dx * FIELD_CQMIN_SCALE}cqmin, ${
    dy * FIELD_CQMIN_SCALE
  }cqmin, 0) translate(-50%, -50%)`;
}

export interface CannonShellFxProps {
  /** タワー側 % 座標 (default 50) */
  x1?: number;
  /** タワー側 % 座標 (default 50) */
  y1?: number;
  /** 着弾点 % 座標 (default 80) */
  x2?: number;
  /** 着弾点 % 座標 (default 20) */
  y2?: number;
  /** 飛翔時間 ms (default 480) */
  duration?: number;
  /** 弾の直径 vmin (default 3.4) */
  size?: number;
  /** 着弾通知 (duration + 20ms 後に呼ばれる) */
  onDone?: () => void;
}

/**
 * CannonShellFx — Cannon の砲弾が飛翔する Fx。
 *
 * 鋼鉄の砲弾が短い煙トレイルを引いて飛ぶ。 ビーム感を排し「ずっしりした球が飛ぶ」見た目。
 *
 * 実装: 初期マウント時 setMoved(false) → 20ms 後 setMoved(true) して
 * transform (translate3d) を変化させ、 CSS transition で位置を補間する。
 * left/top はマウント時の値に固定し、 以後変更しない (v1.4.7: layout thrashing 回避)。
 *
 * 着弾後の爆発演出 (BlastFx) は別途呼び出し側で発火する。
 */
export function CannonShellFx({
  x1 = 50,
  y1 = 50,
  x2 = 80,
  y2 = 20,
  duration = 480,
  size = 3.4,
  onDone,
}: CannonShellFxProps) {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setMoved(true);
    }, 20);
    const t2 = setTimeout(() => {
      onDone?.();
    }, duration + 20);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // 初回マウント時のみ実行 (props 変化に追従しない)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const angleDeg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const transform = moved ? formatShellTransform(x2 - x1, y2 - y1) : formatShellTransform(0, 0);

  return (
    <div
      className={styles.shell}
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${size}vmin`,
        height: `${size}vmin`,
        transform,
        transition: `transform ${duration}ms cubic-bezier(.4,0,.6,1)`,
      }}
    >
      <div
        className={styles.inner}
        style={{ transform: `rotate(${angleDeg}deg)` }}
      >
        <div className={styles.ball} />
        <div
          className={styles.highlight}
          style={{
            width: `${size * 0.32}vmin`,
            height: `${size * 0.32}vmin`,
          }}
        />
      </div>
    </div>
  );
}
