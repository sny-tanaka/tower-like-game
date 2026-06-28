import { Fragment, useCallback, useSyncExternalStore } from 'react';

import { DamagePopFx } from '@/components/fx/DamagePopFx';
import { EnemyDeathFx } from '@/components/fx/EnemyDeathFx';
import { TapRingFx } from '@/components/fx/TapRingFx';
import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// FxLayer
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-B): BattleField から DamagePopFx / EnemyDeathFx を分離。
// useSyncExternalStore で entityStore を直接購読し、 frameVersion 変化のたびに
// re-render する (Page を経由しない)。
//
// onDone は entityStore.queueRemoval(kind, id) を直接呼ぶ。 useBattleLoop の onDamageDone
// 等の props は不要 (Phase 2-C で hook の戻り値からも削除予定)。
//
// EnemyHitFx は現状 useBattleLoop で配線されておらず、 events 配列も EMPTY_HIT_EVENTS。
// 配線が入ったタイミングで本 layer に追加する。
// ---------------------------------------------------------------------------

export function FxLayer() {
  const store = useEntityStore();
  useSyncExternalStore(store.subscribe, store.getSnapshot);
  const damageEvents = store.getDamageEvents();
  const deathEvents = store.getDeathEvents();

  // 安定参照のため useCallback (各 Fx の React.memo を活かす)
  const handleDamageDone = useCallback(
    (id: string) => {
      store.queueRemoval('damage', id);
    },
    [store]
  );
  const handleDeathDone = useCallback(
    (id: string) => {
      store.queueRemoval('death', id);
    },
    [store]
  );

  return (
    <>
      {/* v1.4.0: damageEvents を 1 回の map で DamagePopFx + (isTap なら) TapRingFx を並行 mount。
          TapRingFx はリング寿命を DamagePopFx と同じ 800ms に合わせてあるため、 同 ID の
          queueRemoval (= DamagePopFx の onDone) と同タイミングでアンマウントされる
          (= TapRingFx 完了後の不活性 DOM 残留問題を解消)。 */}
      {damageEvents.map((evt) => (
        <Fragment key={evt.id}>
          <DamagePopFx
            value={Number(evt.value.toString())}
            x={evt.x}
            y={evt.y}
            crit={evt.crit}
            onDone={() => handleDamageDone(evt.id)}
          />
          {evt.isTap && (
            <TapRingFx
              x={evt.x}
              y={evt.y}
            />
          )}
        </Fragment>
      ))}
      {deathEvents.map((evt) => (
        <EnemyDeathFx
          key={evt.id}
          x={evt.x}
          y={evt.y}
          onDone={() => handleDeathDone(evt.id)}
        />
      ))}
    </>
  );
}
