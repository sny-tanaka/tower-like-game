import { useEffect, useRef, useState } from 'react';

import { markRunEnded, markRunStarted, saveSnapshot } from './crashSnapshot';

import type { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// useDiagnosticsStats — 戦闘画面 (Battle Page) 専用の診断データ収集 hook
// ---------------------------------------------------------------------------
//
// v1.4.8: production 実機 (特に iOS) のメモリ枯渇原因調査用。 2 つの独立した責務を持つ:
//
//   1. クラッシュ検知連携 (常時動作、 diagnosticsEnabled に関わらず ON):
//      - isRunActive の false→true / true→false を `useStore.subscribe` で外から購読し、
//        markRunStarted / markRunEnded を呼ぶ (battle slice 自体は編集しない)。
//      - ラン中 5 秒間隔 + wave 変化時に saveSnapshot() へスナップショットを渡す。
//
//   2. オーバーレイ表示用データ収集 (diagnosticsEnabled=true のときだけ動作):
//      - FPS (rAF カウンタ) / 敵数 / Fx イベント数 / DOM ノード数 / JS ヒープ MB を
//        500ms 間隔で集計し、 DiagnosticsOverlay 表示用の state を返す。
//      - OFF のときは rAF ループ自体を回さない (= コストほぼゼロ)。
//
// 依存方向: 本 hook は BattleEntityStore (敵数 / Fx イベント数) と useStore (isRunActive /
// currentTier / currentWave / currentWeapon) を読むだけで、 battle slice / BattleEntityStore
// 本体には一切書き込まない (読み取り専用)。 crashSnapshot モジュール自体は battle 側を
// 一切知らない (依存の向きは常に diagnostics 側が battle 側を読みに行く一方向)。
// ---------------------------------------------------------------------------

/** オーバーレイ表示用の 500ms スナップショット */
export interface DiagnosticsDisplayStats {
  fps: number;
  enemyCount: number;
  fxEventCount: number;
  domCount: number;
  /** Chrome 限定。 取れない環境では null (オーバーレイ側で行ごと非表示にする) */
  heapMB: number | null;
}

interface PerformanceWithMemory extends Performance {
  memory?: { usedJSHeapSize: number };
}

const OVERLAY_UPDATE_INTERVAL_MS = 500;
const DOM_COUNT_THROTTLE_MS = 1000;
const CRASH_SNAPSHOT_INTERVAL_MS = 5000;

/** BattleEntityStore の 4 種イベント数の合計を Fx イベント数として扱う */
function readFxEventCount(entityStore: BattleEntityStore): number {
  return (
    entityStore.getDamageEvents().length +
    entityStore.getDeathEvents().length +
    entityStore.getProjectileEvents().length +
    entityStore.getAppearanceEvents().length
  );
}

function readHeapMB(): number | null {
  const perf = performance as PerformanceWithMemory;
  if (perf.memory == null) return null;
  return perf.memory.usedJSHeapSize / 1024 / 1024;
}

/**
 * Battle Page 専用の診断 hook。
 *
 * @param diagnosticsEnabled 設定 (`useStore(s => s.diagnosticsEnabled)`)。 false のときは
 *   オーバーレイ用の rAF / setInterval を一切起動しない (クラッシュ検知連携は別 effect で
 *   常時動作する)。
 * @param runElapsedSec useBattleLoop が返す経過秒数 (battle slice にはない値のため、
 *   battle slice を経由せず Page から直接渡してもらう)。
 * @param entityStore useBattleLoop の戻り値の BattleEntityStore インスタンス。
 *   Page は `<BattleEntityStoreProvider>` の外側 (JSX を返す前) でこの hook を呼ぶため、
 *   Context 経由 (`useEntityStore()`) ではなく Page が既に持っているインスタンスを
 *   直接引数で受け取る。
 * @returns オーバーレイ表示用の集計値。 diagnosticsEnabled=false のときは null。
 */
export function useDiagnosticsStats(
  diagnosticsEnabled: boolean,
  runElapsedSec: number,
  entityStore: BattleEntityStore
): DiagnosticsDisplayStats | null {
  const [stats, setStats] = useState<DiagnosticsDisplayStats | null>(null);

  // runElapsedSec / entityStore は毎 render 変わりうる値なので ref に同期し、
  // setInterval コールバック内では常に最新値を読む (interval 自体は再生成しない)。
  const runElapsedSecRef = useRef(runElapsedSec);
  runElapsedSecRef.current = runElapsedSec;
  const entityStoreRef = useRef(entityStore);
  entityStoreRef.current = entityStore;

  // -------------------------------------------------------------------------
  // 責務 1: クラッシュ検知連携 (常時動作。 diagnosticsEnabled を見ない)
  // -------------------------------------------------------------------------
  useEffect(() => {
    // isRunActive の変化を battle slice に手を加えずに外側から購読する。
    // 初回 subscribe 時点の値では発火しない (= 購読開始後の遷移のみ検知)。
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.isRunActive === prevState.isRunActive) return;
      if (state.isRunActive) {
        markRunStarted();
      } else {
        markRunEnded();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let lastWave = useStore.getState().currentWave;

    const takeSnapshot = () => {
      const s = useStore.getState();
      if (!s.isRunActive) return;
      const es = entityStoreRef.current;
      saveSnapshot({
        tier: s.currentTier,
        wave: s.currentWave,
        runElapsedSec: Math.floor(runElapsedSecRef.current),
        weapon: s.currentWeapon,
        enemyCount: es.getEnemies().length,
        fxEventCount: readFxEventCount(es),
        heapMB: readHeapMB(),
        appVersion: typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : 'unknown',
      });
    };

    // 5 秒間隔
    const intervalId = setInterval(takeSnapshot, CRASH_SNAPSHOT_INTERVAL_MS);
    // wave 変化検知 (setInterval とは別に 1 秒ポーリングで比較。 wave 切替は稀な頻度のため
    // 軽量な setInterval で十分。 useStore.subscribe で battle slice 全体を見張ると
    // 他フィールド変化でも走ってしまうため currentWave だけを見るポーリングにする)
    const waveCheckId = setInterval(() => {
      const currentWave = useStore.getState().currentWave;
      if (currentWave !== lastWave) {
        lastWave = currentWave;
        takeSnapshot();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(waveCheckId);
    };
  }, []);

  // -------------------------------------------------------------------------
  // 責務 2: オーバーレイ表示用データ収集 (diagnosticsEnabled=true のときだけ動作)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!diagnosticsEnabled) {
      setStats(null);
      return;
    }

    let rafId: number | null = null;
    const frameTimesRef: number[] = [];
    let lastUiUpdateMs = performance.now();
    let lastDomCountMs = 0;
    let cachedDomCount = 0;

    const tick = (now: number) => {
      frameTimesRef.push(now);
      const cutoff = now - 1000;
      while (frameTimesRef.length > 0 && frameTimesRef[0]! < cutoff) {
        frameTimesRef.shift();
      }

      if (now - lastUiUpdateMs >= OVERLAY_UPDATE_INTERVAL_MS) {
        lastUiUpdateMs = now;

        if (now - lastDomCountMs >= DOM_COUNT_THROTTLE_MS) {
          lastDomCountMs = now;
          cachedDomCount =
            typeof document !== 'undefined' ? document.getElementsByTagName('*').length : 0;
        }

        const es = entityStoreRef.current;
        setStats({
          fps: frameTimesRef.length,
          enemyCount: es.getEnemies().length,
          fxEventCount: readFxEventCount(es),
          domCount: cachedDomCount,
          heapMB: readHeapMB(),
        });
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [diagnosticsEnabled]);

  return stats;
}
