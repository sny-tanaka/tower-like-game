import { useEffect, useState } from 'react';

import type { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// useBossPhase
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-C): bossPhase 判定 (= wave 30 でボスが出現したか) を Page から hook に
// 切り出す。 既存実装は Page の `useEffect([enemies])` で判定していたが、 enemies が Page の
// state から消えるため (entityStore 経由になる)、 hook 内で entityStore を subscribe する。
//
// 仕様:
//   - currentWave !== 30 のときは常に false
//   - wave 30 中に entityStore の enemies に boss が含まれたら true
//   - wave 30 から抜けた瞬間に false にリセット
//
// BGM 切替 (battleNormal ↔ battleBoss) に使われる。 pages/battle で
// `useEffect([bossPhase, isScreenSaverOpen], () => soundEngine.playBgm(...))` で連動。
// ---------------------------------------------------------------------------

export function useBossPhase(entityStore: BattleEntityStore): boolean {
  const currentWave = useStore((s) => s.currentWave);
  const [bossPhase, setBossPhase] = useState(false);

  useEffect(() => {
    if (currentWave !== 30) {
      // wave 30 を抜けた瞬間に false にリセット (既存 Page の useEffect([currentWave]) と同じ挙動)
      setBossPhase(false);
      return;
    }
    // wave 30 中: entityStore.subscribe で frameVersion 変化を聞き、 boss 検出で setBossPhase(true)
    const checkBoss = () => {
      const enemies = entityStore.getEnemies();
      if (enemies.some((e) => e.kind === 'boss')) {
        setBossPhase(true);
      }
    };
    // 初回チェック (subscribe が走る前に既に boss が居る可能性)
    checkBoss();
    return entityStore.subscribe(checkBoss);
  }, [entityStore, currentWave]);

  return bossPhase;
}
