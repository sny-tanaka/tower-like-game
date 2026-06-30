import { useCallback, useSyncExternalStore } from 'react';

import { BlastFx } from '@/components/fx/BlastFx';
import { CannonShellFx } from '@/components/fx/CannonShellFx';
import { ChainBoltFx } from '@/components/fx/ChainBoltFx';
import { LaserBeamFx } from '@/components/fx/LaserBeamFx';
import { MegaBeamFx } from '@/components/fx/MegaBeamFx';
import { ThunderStrikeFx } from '@/components/fx/ThunderStrikeFx';
import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// ProjectileLayer
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-B): BattleField から弾道 / 着弾 Fx を分離。
// useSyncExternalStore で entityStore を直接購読し、 frameVersion 変化のたびに re-render する。
//
// laser / cannonShell / blast / thunderStrike / chain / megaBeam の 6 種の Fx を扱う。
// onDone は entityStore.queueRemoval('projectile', id) を直接呼ぶ。
// ---------------------------------------------------------------------------

export function ProjectileLayer() {
  const store = useEntityStore();
  useSyncExternalStore(store.subscribe, store.getSnapshot);
  const projectileEvents = store.getProjectileEvents();

  const handleDone = useCallback(
    (id: string) => {
      store.queueRemoval('projectile', id);
    },
    [store]
  );

  return (
    <>
      {projectileEvents.map((evt) => {
        switch (evt.kind) {
          case 'laser':
            return (
              <LaserBeamFx
                key={evt.id}
                x1={evt.x1}
                y1={evt.y1}
                x2={evt.x2}
                y2={evt.y2}
                onDone={() => handleDone(evt.id)}
              />
            );
          case 'cannonShell':
            return (
              <CannonShellFx
                key={evt.id}
                x1={evt.x1}
                y1={evt.y1}
                x2={evt.x2}
                y2={evt.y2}
                duration={evt.durationMs}
                onDone={() => handleDone(evt.id)}
              />
            );
          case 'blast':
            return (
              <BlastFx
                key={evt.id}
                x={evt.x}
                y={evt.y}
                radius={evt.radius}
                delayMs={evt.delayMs}
                onDone={() => handleDone(evt.id)}
              />
            );
          case 'thunderStrike':
            return (
              <ThunderStrikeFx
                key={evt.id}
                x={evt.x}
                y={evt.y}
                duration={evt.durationMs}
                /* v1.4.2: variant='plasma' (Plasma Discharge) は通常攻撃 (シアン) と
                 * 見分けがつくよう紫で描画する。 通常攻撃は ThunderStrikeFx のデフォルト
                 * 色 (var(--c-primary)) のままにする。 */
                color={evt.variant === 'plasma' ? 'var(--c-secondary)' : undefined}
                onDone={() => handleDone(evt.id)}
              />
            );
          case 'chain':
            return (
              <ChainBoltFx
                key={evt.id}
                points={evt.points}
                delayMs={evt.delayMs}
                onDone={() => handleDone(evt.id)}
              />
            );
          case 'megaBeam':
            return (
              <MegaBeamFx
                key={evt.id}
                x={evt.x}
                y={evt.y}
                angle={evt.angle}
                widthPct={evt.widthPct}
                onDone={() => handleDone(evt.id)}
              />
            );
        }
      })}
    </>
  );
}
