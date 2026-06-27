import { memo, useEffect, useRef, useSyncExternalStore } from 'react';

import styles from './style.module.scss';
import { ENEMY_SIZE_CQMIN, spawnedEnemyToVisualType } from './visualTypes';

import { Enemy } from '@/components/molecules/Enemy';
import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// EnemySprite
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 3-C): EnemyLayer から個別の敵 sprite を切り出した imperative DOM 更新ノード。
//
// 設計意図:
//   - 位置は `subscribeEnemyPosition(id)` で raw subscribe → `el.style.transform = ...`
//     で直接書き込む。 React reconciliation を完全にバイパスして layout / paint を起こさず、
//     compositor 1 段で 60 fps 更新する。 35 体規模で fps が走り切る前提の設計。
//   - 状態 (HP / 状態異常) は `useSyncExternalStore` 経由で snapshot 購読 → 変化時だけ
//     React が再 render する。 位置と違って頻度は低い (秒オーダー) ため React 経由で OK。
//   - `React.memo` で props 同値時の親再 render をスキップ。 EnemyLayer は敵リスト構造変化
//     (enemyListVersion) でしか再 render しないので、 通常は EnemySprite まで到達しない。
//
// CSS 連携:
//   - `.field` は 140cqmin × 140cqmin の正方形 container。 敵 position (0-100%) は
//     「フィールドの % 」 で表現されているため、 cqmin 換算では `1% = 1.4cqmin` となる。
//   - 旧 `left: ${x}%; top: ${y}%; transform: translate(-50%, -50%)` と完全に同じ位置に来る:
//     `translate3d(${x * 1.4}cqmin, ${y * 1.4}cqmin, 0) translate(-50%, -50%)`
//   - `cqmin` は親 container query の短辺 1% という「絶対距離単位」 なので、 % のように
//     「要素自身基準」 で迷う問題が発生しない。 中央寄せ `translate(-50%, -50%)` も
//     要素自身基準で問題なく作用する。
// ---------------------------------------------------------------------------

/**
 * `.field` の cqmin スケール係数。 .field は 140cqmin × 140cqmin の正方形なので、
 * position の 100% を 140cqmin に変換するための定数。 .field の CSS サイズが将来
 * 変わったら本定数も合わせて見直す必要がある。
 *
 * (テストで position → transform を assert するときも同じ係数を使う。)
 */
export const FIELD_CQMIN_SCALE = 1.4;

/**
 * EnemySprite 内部で position から transform 文字列を生成する純粋関数。
 * テストと本体の両方で使うため named export。
 */
export function formatEnemyTransform(x: number, y: number): string {
  return `translate3d(${x * FIELD_CQMIN_SCALE}cqmin, ${
    y * FIELD_CQMIN_SCALE
  }cqmin, 0) translate(-50%, -50%)`;
}

export interface EnemySpriteProps {
  /** 敵 ID。 store から `getEnemyById` / `subscribeEnemyPosition` などで参照する */
  id: string;
  /**
   * マシン中心パーセント座標 (facing 計算用)。 通常は親 EnemyLayer から 1 つの値を全 sprite
   * に配ってあり、 マシンが動かない限り変化しない (= memo 比較で skip)。
   */
  machinePosition: { x: number; y: number };
}

export const EnemySprite = memo(function EnemySprite({ id, machinePosition }: EnemySpriteProps) {
  const store = useEntityStore();
  const ref = useRef<HTMLDivElement>(null);

  // ---- (1) 位置: raw subscribe + imperative DOM 書換え ----
  //
  // mount 直後に 1 度 apply (= 初期位置反映)。 以降は subscribeEnemyPosition の listener
  // から apply を呼ぶ。 listener 単位の購読なので、 別 ID の敵が動いても本 sprite には
  // 何も起きない (cost ゼロ)。
  useEffect(() => {
    const apply = () => {
      const enemy = store.getEnemyById(id);
      if (enemy == null || ref.current == null) return;
      ref.current.style.transform = formatEnemyTransform(enemy.position.x, enemy.position.y);
    };
    apply(); // 初期反映
    return store.subscribeEnemyPosition(id, apply);
  }, [id, store]);

  // ---- (2) 状態 (HP / 状態異常): useSyncExternalStore で snapshot 購読 ----
  //
  // snapshot は store 内 lazy キャッシュ (markEnemyStatusChanged で invalidate) なので
  // 状態が変わっていない敵は同一参照が返り、 React は再 render しない。
  const snapshot = useSyncExternalStore(
    (cb) => store.subscribeEnemyStatus(id, cb),
    () => store.getEnemyStatusSnapshot(id)
  );

  if (snapshot == null) return null;

  const visualType = spawnedEnemyToVisualType(snapshot.kind, snapshot.subtype);
  const status = snapshot.isFrozen ? 'frozen' : snapshot.isBurning ? 'burning' : 'normal';

  // ---- facing: 直近位置から再計算 ----
  //
  // status snapshot に含めないのは「位置と独立に頻繁に変わるが、 React 再 render の頻度には
  // 巻き込みたくない」 ため。 status が変わるタイミング (= ここに到達するタイミング) で
  // 最新位置を読み直して反映する。 敵 facing は連続的な追従ではなく状態変化時の更新で十分。
  const enemy = store.getEnemyById(id);
  const facing =
    enemy != null
      ? Math.atan2(machinePosition.y - enemy.position.y, machinePosition.x - enemy.position.x)
      : 0;

  return (
    <div
      ref={ref}
      data-enemy-id={id}
      className={styles.enemy}
    >
      <Enemy
        type={visualType}
        size={ENEMY_SIZE_CQMIN[visualType]}
        hp={snapshot.hpRatio}
        status={status}
        facing={facing}
      />
    </div>
  );
});
