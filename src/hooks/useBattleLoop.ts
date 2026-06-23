import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  DamageEvent,
  DeathEvent,
  PickupEvent,
  ProjectileEvent,
} from '@/components/organisms/BattleField';
import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { calcReceivedDamage } from '@/game/damage';
import { updateEnemyPosition } from '@/game/loop/enemyMovement';
import { buildMachineStats } from '@/game/loop/machineStats';
import { fireWeapon, getAttackPerSec } from '@/game/loop/weaponDispatch';
import { evaluatePatches } from '@/game/patches';
import type { EquippedPatch } from '@/game/patches.types';
import type { SpawnedEnemy } from '@/game/types';
import { buildTierWaves, getSpawnsAtTime } from '@/game/wave';
import { soundEngine } from '@/lib/audio';
import type { SoundId } from '@/lib/audio';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// 純粋関数: 1 フレームの「ゲーム時間 (秒)」を計算する
// ---------------------------------------------------------------------------

/** Tick 1 回で進めるゲーム時間 (秒) の上限。 タブ非アクティブ復帰時の暴走を防ぐ */
export const MAX_FRAME_GAME_SEC = 1.0;

export function calcFrameGameSec(elapsedMs: number, isPaused: boolean): number {
  if (isPaused) return 0;
  const gameTimeSec = elapsedMs / 1000;
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
// 純粋関数: Tier / Wave 切替時のリセット判定
// ---------------------------------------------------------------------------

export interface WaveTransitionReset {
  /** Wave 経過時間 (spawn 進行) をリセットするか */
  resetElapsed: boolean;
  /** 敵リストをクリアするか */
  resetEnemies: boolean;
}

/**
 * Tier / Wave 切替時にリセットすべき内容を判定する。
 * - Tier 切替: 経過時間 + 敵リストの両方をリセット
 * - Wave 切替 (同 Tier 内): 経過時間のみリセット（敵は wave を跨いで生存）
 * - 切替なし: 何もしない
 */
export function decideTransitionReset(
  prevTier: number,
  newTier: number,
  prevWave: number,
  newWave: number
): WaveTransitionReset {
  const tierChanged = prevTier !== newTier;
  const waveChanged = prevWave !== newWave;
  return {
    resetElapsed: tierChanged || waveChanged,
    resetEnemies: tierChanged,
  };
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

/**
 * Cutter (回転刃武器) の当たり判定半径 (%)。
 * CutterOrbitFx の length=14vmin と合わせ、 視覚的な刃の範囲内の敵のみヒットする。
 * 通常の索敵半径 (DEFAULT_RANGE) より小さく設定 — cutter は近接武器の差別化。
 */
export const CUTTER_ORBIT_RANGE_PCT = 14;

// ---------------------------------------------------------------------------
// 武器 SoundId マッピング
// ---------------------------------------------------------------------------

const WEAPON_SHOOT_SOUND: Record<WeaponType, SoundId> = {
  laser: 'laserShoot',
  cannon: 'cannonShoot',
  thunder: 'thunderShoot',
  cutter: 'cutterShoot',
};

const WEAPON_ACTIVE_SOUND: Record<WeaponType, SoundId> = {
  laser: 'activeLaser',
  cannon: 'activeCannon',
  thunder: 'activeThunder',
  cutter: 'activeCutter',
};

// ---------------------------------------------------------------------------
// useBattleLoop
// ---------------------------------------------------------------------------

export interface UseBattleLoopOpts {
  /** 射程 (0-100%)。 マシン中心 (50,50) からこの距離以下の敵が射程内 */
  range: number;
  /**
   * 外部からの強制停止フラグ。 ResultDialog 表示中 (撤退 / gameover) に true を渡し、
   * 敵移動 / 武器発射 / spawn / wave 進行などをすべて止める。
   * 全滅 (machineHp=0) は内部判定で別途停止するが、 撤退などこちらでは判定できない
   * ローカル UI 状態のために外から渡す経路を用意する。
   */
  paused?: boolean;
}

export interface UseBattleLoopResult {
  enemies: SpawnedEnemy[];
  damageEvents: DamageEvent[];
  deathEvents: DeathEvent[];
  projectileEvents: ProjectileEvent[];
  pickupEvents: PickupEvent[];
  /** 現在 wave 内の経過秒 (0 〜 WAVE_DURATION_SEC) */
  waveElapsedSec: number;
  onDamageDone: (id: string) => void;
  onDeathDone: (id: string) => void;
  onProjectileDone: (id: string) => void;
  onPickupDone: (id: string) => void;
}

/** 通常敵が ボルト をドロップする確率 (02-currencies.md 仕様) */
export const NORMAL_BOLT_DROP_CHANCE = 0.5;

export function useBattleLoop({ range, paused = false }: UseBattleLoopOpts): UseBattleLoopResult {
  // paused は ref 経由で tick から最新値を読む (useEffect の再実行を避けるため)
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

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
  const projectileEventIdRef = useRef<number>(0);
  const pickupEventIdRef = useRef<number>(0);
  /**
   * ラン開始からのゲーム内累積時間 (ms)。
   * wave 切替で 0 リセットしない (wave 跨ぎの状態異常期限判定に使う)。
   * deltaSec * 1000 で累積する「ゲーム内時間」。
   */
  const runElapsedGameMsRef = useRef<number>(0);
  /**
   * 着弾遅延 hit (Cannon 専用)。 砲弾の飛翔中はダメージを保留し、
   * applyAtMs 到達時に敵 HP 減算 + DamageEvent / 状態異常付与を行う。
   */
  const pendingCannonHitsRef = useRef<
    Array<{
      enemyId: string;
      damage: BigNum;
      crit: boolean;
      freeze: boolean;
      freezeSec?: number;
      burnSec?: number;
      applyAtMs: number;
    }>
  >([]);

  const [enemies, setEnemies] = useState<SpawnedEnemy[]>([]);
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  const [deathEvents, setDeathEvents] = useState<DeathEvent[]>([]);
  const [projectileEvents, setProjectileEvents] = useState<ProjectileEvent[]>([]);
  const [pickupEvents, setPickupEvents] = useState<PickupEvent[]>([]);
  const [waveElapsedSec, setWaveElapsedSec] = useState<number>(0);

  const isRunActive = useStore((s) => s.isRunActive);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);

  // Tier 切替時のみ build。 30 wave の Schedule[] を生成。
  const tierWaves = useMemo(() => buildTierWaves(currentTier), [currentTier]);

  // 前回の Tier / Wave (切替検知用)
  const prevTierRef = useRef(currentTier);
  const prevWaveRef = useRef(currentWave);

  // Tier 切替: 経過時間 + 敵リストをリセット
  // Wave 切替: 経過時間のみリセット (敵は wave を跨いで生存)
  useEffect(() => {
    const reset = decideTransitionReset(
      prevTierRef.current,
      currentTier,
      prevWaveRef.current,
      currentWave
    );
    prevTierRef.current = currentTier;
    prevWaveRef.current = currentWave;

    if (reset.resetElapsed) {
      waveElapsedMsRef.current = 0;
      prevWaveElapsedMsRef.current = 0;
      setWaveElapsedSec(0);
    }
    if (reset.resetEnemies) {
      enemiesRef.current = [];
      setEnemies([]);
      // 敵リスト全クリア時は pending hit も無効にする
      pendingCannonHitsRef.current = [];
    }
  }, [currentTier, currentWave]);

  const onDamageDone = useCallback((id: string) => {
    setDamageEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const onDeathDone = useCallback((id: string) => {
    setDeathEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const onProjectileDone = useCallback((id: string) => {
    setProjectileEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const onPickupDone = useCallback((id: string) => {
    setPickupEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    if (!isRunActive) return;

    const tick = (nowMs: number) => {
      const elapsedMs = nowMs - lastFrameMsRef.current;
      lastFrameMsRef.current = nowMs;

      const state = useStore.getState();
      // 全滅 (machineHp = 0) のときは ResultDialog 表示中なのでバトルを停止する。
      // 撤退時など外部 UI 状態は paused (ref 経由で最新値) で停止する。
      // どれも一時停止と同じ扱いで deltaSec=0 にする (敵移動 / 武器発射 / spawn / SE すべて止まる)
      const isGameOver = state.machineHp.isZero();
      const deltaSec = calcFrameGameSec(
        elapsedMs,
        state.isPaused || isGameOver || pausedRef.current
      );

      if (deltaSec > 0) {
        // ---- ラン累積ゲーム内時間を進める (状態異常期限判定の基準) ----
        runElapsedGameMsRef.current += deltaSec * 1000;
        const nowGameMs = runElapsedGameMsRef.current;

        // ---- 装着パッチ配列 (Map → Array) ----
        const equippedPatchesArr: EquippedPatch[] = Array.from(state.equippedPatches.values());

        // ---- CD 減算 ----
        state.tickCooldowns(deltaSec);

        // ---- アクティブスキル自動発動 ----
        // isAutoActive=true で activeCdSec=0 なら triggerActive を呼ぶ。
        // 威力 (各武器の Mega Beam / Volley / Plasma / Overdrive) の engine 連携は別 issue。
        if (state.isAutoActive && state.activeCdSec <= 0) {
          const fired = state.triggerActive(DEFAULT_ACTIVE_MAX_SEC);
          if (fired) {
            soundEngine.play(WEAPON_ACTIVE_SOUND[state.currentWeapon]);
          }
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

          // ---- 敵移動 (frozen 中はスキップ。 nowGameMs 基準で期限判定) ----
          enemiesRef.current = enemiesRef.current.map((e) =>
            updateEnemyPosition(e, deltaSec, nowGameMs)
          );

          // ---- 状態異常 tick: 燃焼 DoT 適用 + 期限切れフィールドのクリア ----
          enemiesRef.current = enemiesRef.current.map((e) => {
            let next = e;
            // 燃焼: 期限内なら毎秒 burnPerSec を HP から減算
            if (
              next.burnUntilMs != null &&
              next.burnPerSec != null &&
              next.burnUntilMs > nowGameMs
            ) {
              const dmg = next.burnPerSec.mulNumber(deltaSec);
              next = { ...next, hp: next.hp.sub(dmg) };
            }
            // 期限切れチェック (frozen / burn)
            const updates: Partial<SpawnedEnemy> = {};
            if (next.frozenUntilMs != null && next.frozenUntilMs <= nowGameMs) {
              updates.frozenUntilMs = undefined;
            }
            if (next.burnUntilMs != null && next.burnUntilMs <= nowGameMs) {
              updates.burnUntilMs = undefined;
              updates.burnPerSec = undefined;
            }
            if (Object.keys(updates).length > 0) {
              next = { ...next, ...updates };
            }
            return next;
          });

          // ---- 着弾遅延 hit の消化 (Cannon 砲弾の着弾タイミングで HP 減算) ----
          // applyAtMs <= nowGameMs の pending hit を抽出して敵 HP 減算 + DamageEvent 発火。
          const expiredHits: typeof pendingCannonHitsRef.current = [];
          pendingCannonHitsRef.current = pendingCannonHitsRef.current.filter((ph) => {
            if (ph.applyAtMs <= nowGameMs) {
              expiredHits.push(ph);
              return false;
            }
            return true;
          });
          const delayedDamageEvents: DamageEvent[] = [];
          if (expiredHits.length > 0) {
            const hitMap = new Map(expiredHits.map((h) => [h.enemyId, h]));
            enemiesRef.current = enemiesRef.current.map((e) => {
              const hit = hitMap.get(e.id);
              if (hit == null) return e;
              let updated: SpawnedEnemy = { ...e, hp: e.hp.sub(hit.damage) };
              if (hit.freeze && hit.freezeSec != null && hit.freezeSec > 0) {
                const newFrozenUntil = nowGameMs + hit.freezeSec * 1000;
                updated = {
                  ...updated,
                  frozenUntilMs: Math.max(updated.frozenUntilMs ?? 0, newFrozenUntil),
                };
              }
              if (hit.burnSec != null && hit.burnSec > 0) {
                const newBurnUntil = nowGameMs + hit.burnSec * 1000;
                const newBurnPerSec = hit.damage.mulNumber(0.3);
                const prev = updated.burnPerSec;
                updated = {
                  ...updated,
                  burnUntilMs: Math.max(updated.burnUntilMs ?? 0, newBurnUntil),
                  burnPerSec: prev != null && prev.gt(newBurnPerSec) ? prev : newBurnPerSec,
                };
              }
              return updated;
            });
            for (const hit of expiredHits) {
              const enemy = enemiesRef.current.find((e) => e.id === hit.enemyId);
              damageEventIdRef.current += 1;
              delayedDamageEvents.push({
                id: `de-${damageEventIdRef.current}`,
                x: enemy?.position.x ?? 50,
                y: enemy?.position.y ?? 50,
                value: hit.damage,
                crit: hit.crit,
              });
            }
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
          const newProjectileEvents: ProjectileEvent[] = [];

          while (
            fireAccumulatorMsRef.current >= intervalMs &&
            firedThisFrame < FIRE_PER_FRAME_CAP
          ) {
            // 当たり判定半径: cutter は CutterOrbitFx の刃の長さに合わせて短く、
            // それ以外は通常の索敵範囲 (range)
            const effectiveRange =
              state.currentWeapon === 'cutter' ? CUTTER_ORBIT_RANGE_PCT : range;
            // 射程内の敵を距離昇順で取得
            const sortedInRange = enemiesRef.current
              .map((enemy) => ({ enemy, dist: distanceFromMachine(enemy.position) }))
              .filter(({ dist }) => dist <= effectiveRange)
              .sort((a, b) => a.dist - b.dist)
              .map(({ enemy }) => enemy);

            if (sortedInRange.length === 0) {
              // 射程内に敵がいなければ、 累積はそのまま温存 (敵が来たら即発射)
              fireAccumulatorMsRef.current = Math.min(fireAccumulatorMsRef.current, intervalMs);
              break;
            }

            fireAccumulatorMsRef.current -= intervalMs;
            firedThisFrame += 1;

            // 武器発射 SE
            soundEngine.play(WEAPON_SHOOT_SOUND[state.currentWeapon]);

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

            // 敵 HP 減算 (immutable に置換) + onAttack パッチ適用
            if (result.hits.length > 0) {
              // 各 hit について onAttack パッチを評価し、 damage / 状態異常を補正
              const augmentedHits = result.hits.map((hit) => {
                const targetEnemy = enemiesRef.current.find((e) => e.id === hit.enemyId);
                if (targetEnemy == null) {
                  return {
                    ...hit,
                    freeze: false as const,
                    freezeSec: undefined as number | undefined,
                    burnSec: undefined as number | undefined,
                  };
                }
                const effect = evaluatePatches(
                  equippedPatchesArr,
                  { type: 'onAttack', enemyKind: targetEnemy.kind },
                  Math.random
                );
                let finalDamage = hit.damage;
                if (effect.damageMultiplier != null && effect.damageMultiplier !== 1) {
                  finalDamage = finalDamage.mulNumber(effect.damageMultiplier);
                }
                if (effect.extraShot) {
                  // 簡略実装: 2 発相当の合計ダメージ
                  finalDamage = finalDamage.add(hit.damage);
                }
                if (effect.instantKill) {
                  // 雑魚を即死させる: 敵 HP 以上のダメージで上書き
                  finalDamage = targetEnemy.hp;
                }
                return {
                  ...hit,
                  damage: finalDamage,
                  freeze: effect.freeze === true,
                  freezeSec: effect.freezeSec,
                  burnSec: effect.burnSec,
                };
              });

              // Cannon は砲弾飛翔中なので、 hit 適用を着弾まで遅延する。
              // それ以外の武器は即時 HP 減算 + DamageEvent 発火。
              if (state.currentWeapon === 'cannon') {
                const cannonShellMs = 480;
                for (const hit of augmentedHits) {
                  pendingCannonHitsRef.current.push({
                    enemyId: hit.enemyId,
                    damage: hit.damage,
                    crit: hit.crit ?? false,
                    freeze: hit.freeze,
                    freezeSec: hit.freezeSec,
                    burnSec: hit.burnSec,
                    applyAtMs: nowGameMs + cannonShellMs,
                  });
                }
              } else {
                const hitMap = new Map(augmentedHits.map((h) => [h.enemyId, h]));
                enemiesRef.current = enemiesRef.current.map((e) => {
                  const hit = hitMap.get(e.id);
                  if (hit == null) return e;
                  let updated: SpawnedEnemy = { ...e, hp: e.hp.sub(hit.damage) };
                  // 凍結付与: 既存があれば長い方を採用
                  if (hit.freeze && hit.freezeSec != null && hit.freezeSec > 0) {
                    const newFrozenUntil = nowGameMs + hit.freezeSec * 1000;
                    updated = {
                      ...updated,
                      frozenUntilMs: Math.max(updated.frozenUntilMs ?? 0, newFrozenUntil),
                    };
                  }
                  // 燃焼付与: 期限は長い方、 burnPerSec は強い方
                  if (hit.burnSec != null && hit.burnSec > 0) {
                    const newBurnUntil = nowGameMs + hit.burnSec * 1000;
                    const newBurnPerSec = hit.damage.mulNumber(0.3);
                    const prevBurnPerSec = updated.burnPerSec;
                    updated = {
                      ...updated,
                      burnUntilMs: Math.max(updated.burnUntilMs ?? 0, newBurnUntil),
                      burnPerSec:
                        prevBurnPerSec != null && prevBurnPerSec.gt(newBurnPerSec)
                          ? prevBurnPerSec
                          : newBurnPerSec,
                    };
                  }
                  return updated;
                });

                // DamageEvent 発火 — augmented damage を表示に使う
                for (const hit of augmentedHits) {
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

              // ---- ProjectileEvent 発火 (武器種ごとに弾道演出) ----
              // laser:  マシン中心 → 各 hit 敵に LaserBeam (一直線、 貫通)
              // cannon: マシン → 着弾点に砲弾 (CannonShellFx) → duration 後に Blast (BlastFx)
              // thunder: 着弾点の真上から落雷 (ThunderStrikeFx) → duration 後に連鎖 (ChainBoltFx)
              // cutter:  常時表示の CutterOrbitFx に任せるため発火ごとの projectile は生成しない
              const hitPositions = augmentedHits
                .map((h) => enemiesRef.current.find((e) => e.id === h.enemyId))
                .filter((e): e is SpawnedEnemy => e != null)
                .map((e) => ({ x: e.position.x, y: e.position.y }));

              if (state.currentWeapon === 'laser') {
                for (const pos of hitPositions) {
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'laser',
                    x1: MACHINE_CENTER_X,
                    y1: MACHINE_CENTER_Y,
                    x2: pos.x,
                    y2: pos.y,
                  });
                }
              } else if (state.currentWeapon === 'cannon') {
                // 砲弾飛翔 + 着弾後爆発の 2 段階。 砲弾の飛翔時間 (480ms) は CannonShellFx と揃える
                const shellMs = 480;
                for (const pos of hitPositions) {
                  // 砲弾飛翔
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'cannonShell',
                    x1: MACHINE_CENTER_X,
                    y1: MACHINE_CENTER_Y,
                    x2: pos.x,
                    y2: pos.y,
                    durationMs: shellMs,
                  });
                  // 着弾後の爆発 (delayMs で砲弾着弾と同期)
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'blast',
                    x: pos.x,
                    y: pos.y,
                    delayMs: shellMs,
                  });
                }
              } else if (state.currentWeapon === 'thunder' && hitPositions.length > 0) {
                // 3 体に同時落雷 (連鎖は仕様変更で廃止、 各 hit に独立して雷が降る)
                const strikeMs = 320;
                for (const pos of hitPositions) {
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'thunderStrike',
                    x: pos.x,
                    y: pos.y,
                    durationMs: strikeMs,
                  });
                }
              }
            }
          }

          // newDamageEvents (今フレーム発射の即時 hit) と delayedDamageEvents
          // (砲弾着弾の hit) をまとめて反映
          const allDamageEvents = [...newDamageEvents, ...delayedDamageEvents];
          if (allDamageEvents.length > 0) {
            setDamageEvents((prev) => [...prev, ...allDamageEvents]);
          }
          if (newProjectileEvents.length > 0) {
            setProjectileEvents((prev) => [...prev, ...newProjectileEvents]);
          }

          // ---- 撃破処理 (HP <= 0) + onKill / onDropRoll パッチ評価 + 報酬獲得 + 各 Event ----
          const screwGainMul = calcRunWorkshopMultiplier(state.runWorkshopLevels.screwGainMul);
          const newDeathEvents: DeathEvent[] = [];
          const newPickupEvents: PickupEvent[] = [];
          const survivors: SpawnedEnemy[] = [];
          let earnedScrew = BigNum.ZERO;
          let earnedBolt = BigNum.ZERO;
          let earnedAlloy = BigNum.ZERO;
          let totalKillHeal = BigNum.ZERO;
          for (const enemy of enemiesRef.current) {
            if (enemy.hp.lte(BigNum.ZERO)) {
              deathEventIdRef.current += 1;
              newDeathEvents.push({
                id: `dh-${deathEventIdRef.current}`,
                x: enemy.position.x,
                y: enemy.position.y,
              });

              // --- onKill パッチ評価 (killHeal の heal を集計) ---
              const killEffect = evaluatePatches(
                equippedPatchesArr,
                { type: 'onKill', enemyKind: enemy.kind },
                Math.random
              );
              if (killEffect.heal != null) {
                totalKillHeal = totalKillHeal.add(killEffect.heal);
              }

              // --- onDropRoll パッチ評価 (bonusDrop の dropMultiplier) ---
              const dropEffect = evaluatePatches(
                equippedPatchesArr,
                {
                  type: 'onDropRoll',
                  baseDrops: {
                    screw: enemy.reward.screw,
                    bolt: enemy.reward.bolt,
                    alloy: enemy.reward.alloyAmount,
                  },
                },
                Math.random
              );
              const dropMul = dropEffect.dropMultiplier ?? 1;

              // --- ネジ (screw): 常時獲得 + screwGainMul + dropMul ---
              const baseScrew = enemy.reward.screw;
              if (baseScrew > 0) {
                earnedScrew = earnedScrew.add(
                  BigNum.fromNumber(baseScrew * screwGainMul * dropMul)
                );
                pickupEventIdRef.current += 1;
                newPickupEvents.push({
                  id: `pk-${pickupEventIdRef.current}`,
                  x: enemy.position.x,
                  y: enemy.position.y,
                  iconName: 'screw',
                });
              }

              // --- ボルト (bolt): 通常敵は 50% 確率、 上位敵は 100% + dropMul ---
              const baseBolt = enemy.reward.bolt;
              if (baseBolt > 0) {
                const boltDropRoll =
                  enemy.kind === 'normal' ? Math.random() < NORMAL_BOLT_DROP_CHANCE : true;
                if (boltDropRoll) {
                  earnedBolt = earnedBolt.add(BigNum.fromNumber(baseBolt * dropMul));
                  pickupEventIdRef.current += 1;
                  newPickupEvents.push({
                    id: `pk-${pickupEventIdRef.current}`,
                    x: enemy.position.x,
                    y: enemy.position.y,
                    iconName: 'bolt',
                  });
                }
              }

              // --- 超合金 (alloy): reward.alloyChance で reward.alloyAmount を獲得 + dropMul ---
              if (enemy.reward.alloyChance > 0 && enemy.reward.alloyAmount > 0) {
                if (Math.random() < enemy.reward.alloyChance) {
                  earnedAlloy = earnedAlloy.add(
                    BigNum.fromNumber(enemy.reward.alloyAmount * dropMul)
                  );
                  pickupEventIdRef.current += 1;
                  newPickupEvents.push({
                    id: `pk-${pickupEventIdRef.current}`,
                    x: enemy.position.x,
                    y: enemy.position.y,
                    iconName: 'alloy',
                  });
                }
              }

              // 撃破 SE: boss/miniboss は bossKill、 それ以外は enemyKill
              soundEngine.play(
                enemy.kind === 'boss' || enemy.kind === 'miniboss' ? 'bossKill' : 'enemyKill'
              );
            } else {
              survivors.push(enemy);
            }
          }
          // onKill heal を機体 HP に加算 (現在 HP + heal、 setMachineHp が max クランプ)
          if (!totalKillHeal.isZero()) {
            state.setMachineHp(state.machineHp.add(totalKillHeal));
          }
          if (newDeathEvents.length > 0) {
            enemiesRef.current = survivors;
            setDeathEvents((prev) => [...prev, ...newDeathEvents]);
          }
          if (newPickupEvents.length > 0) {
            setPickupEvents((prev) => [...prev, ...newPickupEvents]);
          }
          if (!earnedScrew.isZero()) {
            state.addScrew(earnedScrew);
          }
          if (!earnedBolt.isZero()) {
            state.addBolt(earnedBolt);
          }
          if (!earnedAlloy.isZero()) {
            state.addAlloy(earnedAlloy);
          }

          // ---- 被ダメ処理 (マシン近接の敵から enemy.atk × deltaSec) + onHit パッチ ----
          const machineStats = buildMachineStats({ machineMaxHp: state.machineMaxHp });
          let totalReceived = BigNum.ZERO;
          for (const enemy of enemiesRef.current) {
            if (distanceFromMachine(enemy.position) <= MELEE_CONTACT_RANGE) {
              const dmgPerSec = calcReceivedDamage(enemy.atk, machineStats);
              totalReceived = totalReceived.add(dmgPerSec.mulNumber(deltaSec));
            }
          }
          if (!totalReceived.isZero()) {
            // onHit パッチ評価 (damageImmune で overrideReceivedDamage = 0 になる可能性)
            const hitEffect = evaluatePatches(
              equippedPatchesArr,
              { type: 'onHit', receivedDamage: totalReceived },
              Math.random
            );
            const actualReceived = hitEffect.overrideReceivedDamage ?? totalReceived;
            if (!actualReceived.isZero()) {
              const hpBefore = state.machineHp;
              state.damageHp(actualReceived);
              // 被ダメ SE: マシンが落ちたら machineDown / それ以外は machineHit
              const hpAfter = useStore.getState().machineHp;
              soundEngine.play(
                hpAfter.isZero() && !hpBefore.isZero() ? 'machineDown' : 'machineHit'
              );
            }
          }

          // ---- Wave 終了判定 ----
          const decision = decideWaveAdvance(
            waveElapsedMsRef.current,
            schedule.durationSec,
            state.currentWave,
            tierWaves.length
          );
          if (decision === 'advanceWave' || decision === 'advanceTier') {
            // onWaveClear パッチ評価 (shieldRegen: HP heal、 boltCast: bolt gain)
            const clearEffect = evaluatePatches(
              equippedPatchesArr,
              { type: 'onWaveClear' },
              Math.random
            );
            if (clearEffect.heal != null && !clearEffect.heal.isZero()) {
              state.setMachineHp(state.machineHp.add(clearEffect.heal));
            }
            if (clearEffect.boltGain != null && !clearEffect.boltGain.isZero()) {
              state.addBolt(clearEffect.boltGain);
            }
            if (decision === 'advanceWave') {
              state.advanceWave();
              soundEngine.play('waveClear');
            } else {
              state.advanceTier();
              soundEngine.play('tierClear');
            }
          }
        }
      }

      setEnemies(enemiesRef.current);
      setWaveElapsedSec(waveElapsedMsRef.current / 1000);

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

  return {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    pickupEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    onPickupDone,
  };
}
