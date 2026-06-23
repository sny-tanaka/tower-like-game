import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DamageEvent, DeathEvent } from '@/components/organisms/BattleField';
import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { calcReceivedDamage } from '@/game/damage';
import { buildMachineStats } from '@/game/loop/machineStats';
import { fireWeapon, getAttackPerSec } from '@/game/loop/weaponDispatch';
import type { SpawnedEnemy } from '@/game/types';
import { buildTierWaves, getSpawnsAtTime } from '@/game/wave';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// 純粋関数: 1 フレームの「ゲーム時間 (秒)」を計算する
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
// 純粋関数: 敵 position (0-100%) からマシン中心 (50, 50) までの距離
// ---------------------------------------------------------------------------

export const MACHINE_CENTER_X = 50;
export const MACHINE_CENTER_Y = 50;

export function distanceFromMachine(position: { x: number; y: number }): number {
  const dx = position.x - MACHINE_CENTER_X;
  const dy = position.y - MACHINE_CENTER_Y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** 仕様: 攻撃速度 hard cap = 10 attacks/sec (design-docs/04-run-workshop.md L64) */
export const ATTACK_PER_SEC_CAP = 10;

/** マシン本体への被ダメ近接判定距離 (%)。 現状は敵移動ロジック未実装のための placeholder */
export const MELEE_CONTACT_RANGE = 5;

/** アクティブスキル CD 最大値 (秒)。 デフォルト 30 秒 */
export const DEFAULT_ACTIVE_MAX_SEC = 30;

// ---------------------------------------------------------------------------
// useBattleLoop
// ---------------------------------------------------------------------------

export interface UseBattleLoopOpts {
  /** 射程 (0-100%)。 マシン中心 (50,50) からこの距離以下の敵が射程内 */
  range: number;
}

export interface UseBattleLoopResult {
  enemies: SpawnedEnemy[];
  damageEvents: DamageEvent[];
  deathEvents: DeathEvent[];
  onDamageDone: (id: string) => void;
  onDeathDone: (id: string) => void;
}

export function useBattleLoop({ range }: UseBattleLoopOpts): UseBattleLoopResult {
  const rafIdRef = useRef<number | null>(null);
  const lastFrameMsRef = useRef<number>(0);
  const waveElapsedMsRef = useRef<number>(0);
  const prevWaveElapsedMsRef = useRef<number>(0);
  const enemiesRef = useRef<SpawnedEnemy[]>([]);
  const enemyIdCounterRef = useRef<number>(0);
  const fireAccumulatorMsRef = useRef<number>(0);
  const cutterAngleDegRef = useRef<number>(0);
  const damageEventIdRef = useRef<number>(0);
  const deathEventIdRef = useRef<number>(0);

  const [enemies, setEnemies] = useState<SpawnedEnemy[]>([]);
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  const [deathEvents, setDeathEvents] = useState<DeathEvent[]>([]);

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

  const onDamageDone = useCallback((id: string) => {
    setDamageEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const onDeathDone = useCallback((id: string) => {
    setDeathEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    if (!isRunActive) return;

    const tick = (nowMs: number) => {
      const elapsedMs = nowMs - lastFrameMsRef.current;
      lastFrameMsRef.current = nowMs;

      const state = useStore.getState();
      const deltaSec = calcFrameGameSec(elapsedMs, state.gameSpeed, state.isPaused);

      if (deltaSec > 0) {
        // ---- CD 減算 ----
        state.tickCooldowns(deltaSec);

        // ---- アクティブスキル自動発動 ----
        // isAutoActive=true で activeCdSec=0 なら triggerActive を呼ぶ。
        // 威力 (各武器の Mega Beam / Volley / Plasma / Overdrive) の engine 連携は別 issue。
        if (state.isAutoActive && state.activeCdSec <= 0) {
          state.triggerActive(DEFAULT_ACTIVE_MAX_SEC);
        }

        // ---- Wave 経過時間を進める ----
        prevWaveElapsedMsRef.current = waveElapsedMsRef.current;
        waveElapsedMsRef.current += deltaSec * 1000;

        const schedule = tierWaves[state.currentWave - 1];
        if (schedule != null) {
          // 敵 spawn
          const newSpawns = getSpawnsAtTime(
            schedule,
            waveElapsedMsRef.current,
            prevWaveElapsedMsRef.current,
            Math.random,
            () => {
              enemyIdCounterRef.current += 1;
              return `e-${state.currentTier}-${state.currentWave}-${enemyIdCounterRef.current}`;
            }
          );
          if (newSpawns.length > 0) {
            enemiesRef.current = [...enemiesRef.current, ...newSpawns];
          }

          // ---- 武器発射 ----
          const attackMulLv = state.runWorkshopLevels.attackMul;
          const attackSpeedMulLv = state.runWorkshopLevels.attackSpeedMul;
          const attackMul = calcRunWorkshopMultiplier(attackMulLv);
          const attackSpeedMul = calcRunWorkshopMultiplier(attackSpeedMulLv);
          const basePerSec = getAttackPerSec(state.currentWeapon, state.weaponLv);
          const effectivePerSec = Math.min(ATTACK_PER_SEC_CAP, basePerSec * attackSpeedMul);
          const intervalMs = effectivePerSec > 0 ? 1000 / effectivePerSec : Infinity;

          fireAccumulatorMsRef.current += deltaSec * 1000;
          let firedThisFrame = 0;
          const FIRE_PER_FRAME_CAP = 10;
          const newDamageEvents: DamageEvent[] = [];

          while (
            fireAccumulatorMsRef.current >= intervalMs &&
            firedThisFrame < FIRE_PER_FRAME_CAP
          ) {
            // 射程内の敵を距離昇順で取得
            const sortedInRange = enemiesRef.current
              .map((enemy) => ({ enemy, dist: distanceFromMachine(enemy.position) }))
              .filter(({ dist }) => dist <= range)
              .sort((a, b) => a.dist - b.dist)
              .map(({ enemy }) => enemy);

            if (sortedInRange.length === 0) {
              // 射程内に敵がいなければ、 累積はそのまま温存 (敵が来たら即発射)
              fireAccumulatorMsRef.current = Math.min(fireAccumulatorMsRef.current, intervalMs);
              break;
            }

            fireAccumulatorMsRef.current -= intervalMs;
            firedThisFrame += 1;

            const machine = buildMachineStats({ machineMaxHp: state.machineMaxHp });
            const result = fireWeapon({
              weapon: state.currentWeapon,
              weaponLv: state.weaponLv,
              machine,
              enemiesInRange: sortedInRange,
              rng: Math.random,
              cutterAngleDeg: cutterAngleDegRef.current,
              attackMul,
            });

            // 敵 HP 減算 (immutable に置換)
            if (result.hits.length > 0) {
              const hitMap = new Map(result.hits.map((h) => [h.enemyId, h]));
              enemiesRef.current = enemiesRef.current.map((e) => {
                const hit = hitMap.get(e.id);
                if (hit == null) return e;
                return { ...e, hp: e.hp.sub(hit.damage) };
              });

              // DamageEvent 発火 — enemy 位置から
              for (const hit of result.hits) {
                const enemy = enemiesRef.current.find((e) => e.id === hit.enemyId);
                damageEventIdRef.current += 1;
                newDamageEvents.push({
                  id: `de-${damageEventIdRef.current}`,
                  x: enemy?.position.x ?? 50,
                  y: enemy?.position.y ?? 50,
                  value: hit.damage,
                  crit: hit.crit,
                });
              }
            }
          }

          if (newDamageEvents.length > 0) {
            setDamageEvents((prev) => [...prev, ...newDamageEvents]);
          }

          // ---- 撃破処理 (HP <= 0) + ネジ獲得 (screwGainMul 反映) + DeathEvent ----
          const screwGainMul = calcRunWorkshopMultiplier(state.runWorkshopLevels.screwGainMul);
          const newDeathEvents: DeathEvent[] = [];
          const survivors: SpawnedEnemy[] = [];
          let earnedScrew = BigNum.ZERO;
          for (const enemy of enemiesRef.current) {
            if (enemy.hp.lte(BigNum.ZERO)) {
              deathEventIdRef.current += 1;
              newDeathEvents.push({
                id: `dh-${deathEventIdRef.current}`,
                x: enemy.position.x,
                y: enemy.position.y,
              });
              const baseScrew = enemy.reward.screw;
              if (baseScrew > 0) {
                earnedScrew = earnedScrew.add(BigNum.fromNumber(baseScrew * screwGainMul));
              }
            } else {
              survivors.push(enemy);
            }
          }
          if (newDeathEvents.length > 0) {
            enemiesRef.current = survivors;
            setDeathEvents((prev) => [...prev, ...newDeathEvents]);
          }
          if (!earnedScrew.isZero()) {
            state.addScrew(earnedScrew);
          }

          // ---- 被ダメ処理 (マシン近接の敵から enemy.atk × deltaSec) ----
          // 敵移動ロジック未実装のため、 spawn 時点で近接位置にいる場合のみ被ダメ発生する placeholder。
          // 敵移動 + 経路は別 issue で実装する。
          const machineStats = buildMachineStats({ machineMaxHp: state.machineMaxHp });
          let totalReceived = BigNum.ZERO;
          for (const enemy of enemiesRef.current) {
            if (distanceFromMachine(enemy.position) <= MELEE_CONTACT_RANGE) {
              const dmgPerSec = calcReceivedDamage(enemy.atk, machineStats);
              totalReceived = totalReceived.add(dmgPerSec.mulNumber(deltaSec));
            }
          }
          if (!totalReceived.isZero()) {
            state.damageHp(totalReceived);
          }

          // ---- Wave 終了判定 ----
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

      setEnemies(enemiesRef.current);

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
  }, [isRunActive, tierWaves, range]);

  return { enemies, damageEvents, deathEvents, onDamageDone, onDeathDone };
}
