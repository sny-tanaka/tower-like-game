import { useEffect, useMemo, useRef, useState } from 'react';

import type { SpawnedEnemy } from '@/game/types';
import { buildTierWaves, getSpawnsAtTime } from '@/game/wave';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// 純粋関数: 1 フレームの「ゲーム時間 (秒)」を計算する
//   - 一時停止中は 0 (副作用なし)
//   - gameSpeed (1x/2x/3x) で実時間を倍化
//   - 過大な elapsedMs (タブ復帰直後など) を 1 秒上限でクランプ
// ---------------------------------------------------------------------------

/** Tick 1 回で進めるゲーム時間 (秒) の上限。 タブ非アクティブ復帰時の暴走を防ぐ */
export const MAX_FRAME_GAME_SEC = 1.0;

export function calcFrameGameSec(
  elapsedMs: number,
  gameSpeed: 1 | 2 | 3,
  isPaused: boolean
): number {
  if (isPaused) return 0;
  const gameTimeSec = (elapsedMs * gameSpeed) / 1000;
  return Math.min(MAX_FRAME_GAME_SEC, Math.max(0, gameTimeSec));
}

// ---------------------------------------------------------------------------
// 純粋関数: Wave 終了判定
//   - waveElapsedMs >= durationSec * 1000 で Wave 終了
//   - Tier 最終 Wave 終了 → advanceTier、 それ以外 → advanceWave
// ---------------------------------------------------------------------------

export type AdvanceDecision = 'continue' | 'advanceWave' | 'advanceTier';

export function decideWaveAdvance(
  waveElapsedMs: number,
  durationSec: number,
  currentWave: number,
  totalWaves: number
): AdvanceDecision {
  if (waveElapsedMs < durationSec * 1000) return 'continue';
  if (currentWave >= totalWaves) return 'advanceTier';
  return 'advanceWave';
}

// ---------------------------------------------------------------------------
// useBattleLoop
//
// Battle 画面で呼ぶカスタムフック。
// - isRunActive=true の間 requestAnimationFrame で連続 Tick
// - 毎フレーム: 実時間差 × gameSpeed をゲーム時間に変換し、 store の
//   tickCooldowns(deltaSec) を呼ぶ
// - 毎フレーム: 現 Wave スケジュールから getSpawnsAtTime で新規 spawn 取得 →
//   enemies state に積む
// - Wave 終了で advanceWave / 全 Wave 終了で advanceTier、 waveElapsedMs リセット
// - isPaused=true 中は CD 減算 / spawn / advance すべてスキップ (ループ継続)
//
// 武器発射 / 被ダメ等は #91 / #92 で追加する。
// ---------------------------------------------------------------------------

export interface UseBattleLoopResult {
  enemies: SpawnedEnemy[];
}

export function useBattleLoop(): UseBattleLoopResult {
  const rafIdRef = useRef<number | null>(null);
  const lastFrameMsRef = useRef<number>(0);
  const waveElapsedMsRef = useRef<number>(0);
  const prevWaveElapsedMsRef = useRef<number>(0);
  const enemiesRef = useRef<SpawnedEnemy[]>([]);
  const idCounterRef = useRef<number>(0);

  const [enemies, setEnemies] = useState<SpawnedEnemy[]>([]);

  const isRunActive = useStore((s) => s.isRunActive);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);

  // Tier 切替時のみ build。 30 wave の Schedule[] を生成。
  const tierWaves = useMemo(() => buildTierWaves(currentTier), [currentTier]);

  // Wave 切替時に経過時間と現在の敵をリセット
  useEffect(() => {
    waveElapsedMsRef.current = 0;
    prevWaveElapsedMsRef.current = 0;
    enemiesRef.current = [];
    setEnemies([]);
  }, [currentTier, currentWave]);

  useEffect(() => {
    if (!isRunActive) return;

    const tick = (nowMs: number) => {
      const elapsedMs = nowMs - lastFrameMsRef.current;
      lastFrameMsRef.current = nowMs;

      const state = useStore.getState();
      const deltaSec = calcFrameGameSec(elapsedMs, state.gameSpeed, state.isPaused);

      if (deltaSec > 0) {
        // CD 減算
        state.tickCooldowns(deltaSec);

        // Wave 経過時間を進める
        prevWaveElapsedMsRef.current = waveElapsedMsRef.current;
        waveElapsedMsRef.current += deltaSec * 1000;

        const schedule = tierWaves[state.currentWave - 1];
        if (schedule != null) {
          // 敵 spawn (差分のみ取得)
          const newSpawns = getSpawnsAtTime(
            schedule,
            waveElapsedMsRef.current,
            prevWaveElapsedMsRef.current,
            Math.random,
            () => {
              idCounterRef.current += 1;
              return `e-${state.currentTier}-${state.currentWave}-${idCounterRef.current}`;
            }
          );
          if (newSpawns.length > 0) {
            enemiesRef.current = [...enemiesRef.current, ...newSpawns];
            setEnemies(enemiesRef.current);
          }

          // Wave 終了判定
          const decision = decideWaveAdvance(
            waveElapsedMsRef.current,
            schedule.durationSec,
            state.currentWave,
            tierWaves.length
          );
          if (decision === 'advanceWave') {
            state.advanceWave();
          } else if (decision === 'advanceTier') {
            state.advanceTier();
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    lastFrameMsRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isRunActive, tierWaves]);

  return { enemies };
}
