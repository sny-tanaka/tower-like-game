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
//
// 設計:
//   - getSnapshot に `getEnemyListVersion` を渡す。 enemyListVersion は addEnemy / removeEnemy
//     /clearEnemies のたびに +1 される。 通常 tick の `notifyFrame()` (= frameVersion +1)
//     では何も起きない。 listener は呼ばれるが getSnapshot の戻り値が同じなので React は
//     再 render を skip する。
//   - 結果として EnemyLayer の再 render は「敵が増えた / 減った瞬間のみ」 = 60 fps 中で
//     数 回。 中身の <EnemySprite> は React.memo + id が key なので、 既存 sprite は
//     一切 reconcile されない (= 親が再 render しても child は skip)。
//   - 位置の連続更新は EnemySprite 内の `subscribeEnemyPosition` → `el.style.transform`
//     書換えで完結する (React reconciliation を完全にバイパス)。
// ---------------------------------------------------------------------------

export interface EnemyLayerProps {
  machinePosition: { x: number; y: number };
}

export function EnemyLayer({ machinePosition }: EnemyLayerProps) {
  const store = useEntityStore();
  // 敵リスト構造変化 (addEnemy / removeEnemy / clearEnemies) でのみ再 render。
  // store.subscribe は frameVersion 変化のたびに listener を呼ぶが、
  // getEnemyListVersion の値が変わっていなければ React 側で再 render は skip される。
  useSyncExternalStore(store.subscribe, store.getEnemyListVersion);
  const enemies = store.getEnemies();

  return (
    <>
      {enemies.map((enemy) => (
        <EnemySprite
          key={enemy.id}
          id={enemy.id}
          machinePosition={machinePosition}
        />
      ))}
    </>
  );
}
