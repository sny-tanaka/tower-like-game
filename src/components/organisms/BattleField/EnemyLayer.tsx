import { useSyncExternalStore } from 'react';

import { EnemySprite } from './EnemySprite';

import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// EnemyLayer
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-B): BattleField から敵 sprite ループを分離。
// v1.3.7 (Phase 3-C): 敵 sprite 本体を `EnemySprite` (per-id imperative DOM 更新) に切り出し、
// 本コンポーネントは「mount / unmount 制御」 だけを担う薄い layer に縮小した。
// v1.4.8: 敵スプライトの描画キャップ (MAX_RENDERED_ENEMIES) 対応。 `store.isEnemyVisible(id)`
// で可視 ID のみマウントするようフィルタする (ゲームロジック / enemiesRef には一切影響しない、
// DOM にマウントする EnemySprite の数だけを絞り込む)。
//
// 設計:
//   - getSnapshot に `getEnemyListAndVisibilityVersion` を渡す。 これは「敵リスト構造変化
//     (enemyListVersion)」 と 「可視集合の変化 (visibleEnemyIdsVersion、 敵の増減なしでも
//     キャップ境界を跨ぐと変化する)」 の両方で単調増加する合成値。 通常 tick の
//     `notifyFrame()` (= frameVersion +1) だけでは変化しないため、 React は再 render を
//     skip する。
//   - 結果として EnemyLayer の再 render は「敵が増えた / 減った瞬間」 または「250ms
//     スロットルの可視集合再計算で実際に集合が変わった瞬間」 のみ。 中身の <EnemySprite> は
//     React.memo + id が key なので、 既存 sprite は一切 reconcile されない (= 親が再 render
//     しても child は skip)。
//   - 位置の連続更新は EnemySprite 内の `subscribeEnemyPosition` → `el.style.transform`
//     書換えで完結する (React reconciliation を完全にバイパス)。
// ---------------------------------------------------------------------------

export interface EnemyLayerProps {
  machinePosition: { x: number; y: number };
}

export function EnemyLayer({ machinePosition }: EnemyLayerProps) {
  const store = useEntityStore();
  // 敵リスト構造変化 (addEnemy / removeEnemy / clearEnemies) または可視集合変化でのみ再 render。
  // store.subscribe は frameVersion 変化のたびに listener を呼ぶが、
  // getEnemyListAndVisibilityVersion の値が変わっていなければ React 側で再 render は skip される。
  useSyncExternalStore(store.subscribe, store.getEnemyListAndVisibilityVersion);
  const enemies = store.getEnemies();

  return (
    <>
      {enemies.map((enemy) =>
        store.isEnemyVisible(enemy.id) ? (
          <EnemySprite
            key={enemy.id}
            id={enemy.id}
            machinePosition={machinePosition}
          />
        ) : null
      )}
    </>
  );
}
