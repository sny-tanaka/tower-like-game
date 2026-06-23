import { useEffect, useState } from 'react';

import styles from './style.module.scss';

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
 * left/top を変化させ、 CSS transition で位置を補間する。
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

  const left = moved ? x2 : x1;
  const top = moved ? y2 : y1;
  const angleDeg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return (
    <div
      className={styles.shell}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}vmin`,
        height: `${size}vmin`,
        transition: `left ${duration}ms cubic-bezier(.4,0,.6,1), top ${duration}ms cubic-bezier(.4,0,.6,1)`,
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
