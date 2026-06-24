import type { CSSProperties, ReactNode } from 'react';

import styles from './style.module.scss';

/**
 * ドリフト経路の本数。 各経路の座標は style.module.scss 内の drift1〜drift5
 * @keyframes に静的定義されている (Issue #87)。 経路数を増減する場合は SCSS
 * 側にも @keyframes と .pN クラスを追加すること。
 */
const PATH_COUNT = 5;
const PATH_CLASSES = [styles.p1, styles.p2, styles.p3, styles.p4, styles.p5];

export interface ScreenSaverFxProps {
  /** ドリフトさせるコンテンツ一覧 */
  items?: ReactNode[];
  /** タワーコンポジット（リング + glow パルス）を中央に描画するか */
  showTower?: boolean;
  /** showTower=true 時にリングの中央に置くコンテンツ */
  towerContent?: ReactNode;
  /** 1 周のサイクル秒数（デフォルト: 24） */
  cycleSeconds?: number;
}

/**
 * ScreenSaverFx — スクリーンセーバー起動時のフルスクリーン軽量ループアニメ Fx。
 *
 * 焼き付き防止のため各要素は異なる経路上を漂い、一定時間ごとに位置を変える。
 * ループ系 Fx なので duration は持たず、unmount で停止。
 *
 * `prefers-reduced-motion: reduce` 時は最初の 1 件のみ静止表示。
 *
 * Issue #87: @keyframes は SCSS module に静的定義 (drift1〜drift5)。
 * 各 item は (index % PATH_COUNT) でいずれかの drift クラスに割り当てられ、
 * インスタンス固有値 (cycleSeconds、 各 item の delay) は CSS 変数で渡す。
 */
export function ScreenSaverFx({
  items = [],
  showTower = false,
  towerContent = null,
  cycleSeconds = 24,
}: ScreenSaverFxProps) {
  const tower = (
    <div className={styles.tower}>
      <div className={styles.towerR1} />
      <div className={styles.towerR2} />
      <div className={styles.towerCore}>{towerContent}</div>
    </div>
  );

  const allItems = showTower ? [tower, ...items] : [...items];

  return (
    <div
      className={styles.root}
      data-screen-saver-fx="ssfx"
    >
      {allItems.map((item, i) => {
        const pathClass = PATH_CLASSES[i % PATH_COUNT];
        const delay = -(i * (cycleSeconds / Math.max(allItems.length, 1)));
        const slotStyle: CSSProperties = {
          ['--ss-cycle' as string]: `${cycleSeconds}s`,
          ['--ss-delay' as string]: `${delay}s`,
        };
        return (
          <div
            key={i}
            className={`${styles.slot} ${pathClass}${i === 0 ? ` ${styles.rmShow}` : ''}`}
            style={slotStyle}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
