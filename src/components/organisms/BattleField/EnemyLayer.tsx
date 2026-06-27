import { useSyncExternalStore } from 'react';

import styles from './style.module.scss';
import { ENEMY_SIZE_CQMIN, spawnedEnemyToVisualType } from './visualTypes';

import { Enemy } from '@/components/molecules/Enemy';
import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// EnemyLayer
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-B): BattleField から敵 sprite ループを分離。
// useSyncExternalStore で entityStore を直接購読し、 frameVersion 変化のたびに
// re-render する (Page を経由しない)。
//
// 親 (BattleField) は machinePosition を props で渡す (敵 facing 計算用)。
//
// Phase 3 で個別 EnemySprite に分解 (= 各 sprite が自身の id だけ subscribe + CSS 変数
// で imperative 書換え) する予定。 Phase 2-B では layer 全体が 1 単位で re-render する。
// ---------------------------------------------------------------------------

export interface EnemyLayerProps {
  machinePosition: { x: number; y: number };
}

export function EnemyLayer({ machinePosition }: EnemyLayerProps) {
  const store = useEntityStore();
  // version 変化だけ subscribe (= 配列参照は同じでも version が変わったら re-render)
  useSyncExternalStore(store.subscribe, store.getSnapshot);
  const enemies = store.getEnemies();

  const machineX = machinePosition.x;
  const machineY = machinePosition.y;

  return (
    <>
      {enemies.map((enemy) => {
        const visualType = spawnedEnemyToVisualType(enemy.kind, enemy.subtype);
        const isFrozen = enemy.frozenUntilMs != null;
        const isBurning = enemy.burnUntilMs != null;
        const status = isFrozen ? 'frozen' : isBurning ? 'burning' : 'normal';
        const hpCurrent = parseFloat(enemy.hp.toString());
        const hpMaxNum = Math.max(0.0001, parseFloat(enemy.maxHp.toString()));
        const hpRatio = Math.max(0, Math.min(1, hpCurrent / hpMaxNum));
        const facing = Math.atan2(machineY - enemy.position.y, machineX - enemy.position.x);

        return (
          <div
            key={enemy.id}
            data-enemy-id={enemy.id}
            className={styles.enemy}
            style={{
              left: `${enemy.position.x}%`,
              top: `${enemy.position.y}%`,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Enemy
              type={visualType}
              size={ENEMY_SIZE_CQMIN[visualType]}
              hp={hpRatio}
              status={status}
              facing={facing}
            />
          </div>
        );
      })}
    </>
  );
}
