import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  DamageEvent,
  DeathEvent,
  PickupEvent,
  ProjectileEvent,
} from '@/components/organisms/BattleField';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { calcReceivedDamage } from '@/game/damage';
import { scaledReward } from '@/game/enemies';
import { updateEnemyPosition } from '@/game/loop/enemyMovement';
import { buildMachineStats } from '@/game/loop/machineStats';
import { fireWeapon, getAttackPerSec } from '@/game/loop/weaponDispatch';
import { evaluatePatches } from '@/game/patches';
import { dropPatch } from '@/game/patches/drops';
import type { PatchDrop } from '@/game/patches/drops';
import type { EquippedPatch } from '@/game/patches.types';
import type { SpawnedEnemy } from '@/game/types';
import { buildTierWaves, getSpawnsAtTime } from '@/game/wave';
import { CANNON_SHELL_MS, cannonStats, cannonVolley } from '@/game/weapons/cannon';
import {
  cutterStartOverdrive,
  cutterStats,
  cutterTickOverdrive,
  type OverdriveState,
} from '@/game/weapons/cutter';
import { laserMegaBeam, laserStats } from '@/game/weapons/laser';
import { thunderPlasmaDischarge, thunderStats } from '@/game/weapons/thunder';
import { soundEngine } from '@/lib/audio';
import type { SoundId } from '@/lib/audio';
import { BigNum } from '@/lib/bignum';
import { vibrate } from '@/lib/haptics/vibrate';
import { useStore } from '@/store/index';
import { DEFAULT_ACTIVE_MAX_SEC } from '@/store/slices/battle';
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

/**
 * ボススポーン時刻 (wave 開始から何秒後にボスが出るか)。
 * src/game/wave.ts の UPPER_ENEMY_LEAD_SEC=1 と同じく「wave 終了 1 秒前」 を前提とする。
 */
export const BOSS_SPAWN_LEAD_SEC = 1;

/**
 * ウェーブ進行判定。
 *  - 通常 wave (1〜totalWaves-1): waveElapsedMs >= durationSec*1000 で advanceWave
 *  - 最終 wave (= totalWaves、 boss wave): 時間カウントダウンしない。
 *    「ボススポーン時刻を過ぎている」 かつ 「残敵 0」 で advanceTier
 *
 * @param waveElapsedMs    現 wave の経過 ms
 * @param durationSec      schedule.durationSec (= WAVE_DURATION_SEC)
 * @param currentWave      1〜totalWaves
 * @param totalWaves       1 tier の wave 数
 * @param enemiesCount     現在の生存敵数
 */
export function decideWaveAdvance(
  waveElapsedMs: number,
  durationSec: number,
  currentWave: number,
  totalWaves: number,
  enemiesCount: number
): AdvanceDecision {
  if (currentWave >= totalWaves) {
    // 最終 wave: ボス撃破 (= スポーン後の残敵 0) で advanceTier。 時間経過は無視
    const bossSpawnedMs = Math.max(0, (durationSec - BOSS_SPAWN_LEAD_SEC) * 1000);
    if (waveElapsedMs >= bossSpawnedMs && enemiesCount === 0) {
      return 'advanceTier';
    }
    return 'continue';
  }
  // 通常 wave: 時間経過で次へ
  if (waveElapsedMs < durationSec * 1000) return 'continue';
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

/** マシン本体への被ダメ近接判定距離 (%)。 距離 ≤ この値で敵がマシンに「接触」している扱い */
export const MELEE_CONTACT_RANGE = 5;

/**
 * 敵接触時のノックバック距離 (%)。 マシン中心から離れる方向に enemy.position をこの値だけ押し戻す。
 * 体感としてスマホ画面(短辺 ~400px)で約 20px 相当。 画面サイズが変わると見た目の px は変動する。
 * 「新規接触フレーム」のみ 1 回適用 (毎フレーム適用ではない) ので、再接近 → 再接触 → 再ノックバック
 * というサイクルでダメージ間隔が空く。
 */
export const KNOCKBACK_DISTANCE_PCT = 5;

/**
 * 純粋関数: ノックバック後の position を計算する。
 *
 * マシン中心 (center) から離れる方向の単位ベクトル × distancePct を position に加算し、
 * 結果を 0-100 にクランプして返す。 enemy.position が center と完全一致するケースでは
 * 単位ベクトルが定まらないため、その場では右方向 (dx=1, dy=0) にフォールバックする。
 */
export function applyKnockback(
  position: { x: number; y: number },
  center: { x: number; y: number },
  distancePct: number
): { x: number; y: number } {
  let dx = position.x - center.x;
  let dy = position.y - center.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) {
    dx = 1;
    dy = 0;
  } else {
    dx /= len;
    dy /= len;
  }
  return {
    x: Math.max(0, Math.min(100, position.x + dx * distancePct)),
    y: Math.max(0, Math.min(100, position.y + dy * distancePct)),
  };
}

/**
 * アクティブスキル CD 最大値 (秒)。 battle slice から再 export (互換のため残置)。
 * 値の真の定義は @/store/slices/battle に集約。
 */
export { DEFAULT_ACTIVE_MAX_SEC };

// ---------------------------------------------------------------------------
// 純粋関数: interval パッチトリガーの発火回数と残余 accumulator を計算する
// ---------------------------------------------------------------------------

export interface CalcIntervalTicksResult {
  /** 今フレームで発火する interval tick 数 */
  ticks: number;
  /** 次フレームへ持ち越す残余 accumulator (ms) */
  nextAccumulatorMs: number;
}

/**
 * interval パッチトリガーの発火回数と次フレームへ持ち越す残余を計算する。
 *
 * @param currentAccumulatorMs 現在の累積 ms
 * @param deltaSec             今フレームのゲーム内経過秒
 * @param thresholdMs          発火閾値 (通常 1000ms)
 */
export function calcIntervalTicks(
  currentAccumulatorMs: number,
  deltaSec: number,
  thresholdMs = 1000
): CalcIntervalTicksResult {
  const next = currentAccumulatorMs + deltaSec * 1000;
  const ticks = Math.floor(next / thresholdMs);
  const nextAccumulatorMs = next - ticks * thresholdMs;
  return { ticks, nextAccumulatorMs };
}

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

/**
 * 上位敵 (elite / miniboss / boss) の出現バナー演出イベント。
 * useBattleLoop が spawn 検知時に発火し、 battle 画面が AppearanceBannerFx をマウントする。
 */
export interface AppearanceEvent {
  id: string;
  kind: 'elite' | 'miniboss' | 'boss';
  /** 表示用の敵名 (例 "ELITE T1W5"。 battle 画面で生成しても良い) */
  name: string;
}

export interface UseBattleLoopResult {
  enemies: SpawnedEnemy[];
  damageEvents: DamageEvent[];
  deathEvents: DeathEvent[];
  projectileEvents: ProjectileEvent[];
  pickupEvents: PickupEvent[];
  appearanceEvents: AppearanceEvent[];
  /** 現在 wave 内の経過秒 (0 〜 WAVE_DURATION_SEC) */
  waveElapsedSec: number;
  onDamageDone: (id: string) => void;
  onDeathDone: (id: string) => void;
  onProjectileDone: (id: string) => void;
  onPickupDone: (id: string) => void;
  onAppearanceDone: (id: string) => void;
  /**
   * アクティブスキル発動。 store.triggerActive (CD セット + activeCdSec=max) を呼んだ上で、
   * 現在装備武器に応じて Mega Beam / Volley / Plasma Discharge / Overdrive を実行する。
   * 既存の triggerActive() を直接呼ぶ代わりにこの関数を使うと、 SE / 視覚 Fx / 敵 HP 減算
   * もまとめて配線される。
   * @returns 発動した場合 true、 CD 中など発動できなかった場合 false
   */
  fireActive: () => boolean;
  /** Cutter Overdrive 中 (battle 画面で OverdriveAuraFx を表示するためのフラグ) */
  isOverdriveActive: boolean;
  /** このランで撃破した敵の総数 */
  killCount: number;
  /** このランの経過秒 (整数秒単位) */
  runElapsedSec: number;
  /** このランでドロップしたパッチ一覧 */
  droppedPatches: PatchDrop[];
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
  const appearanceEventIdRef = useRef<number>(0);
  /**
   * ラン開始からのゲーム内累積時間 (ms)。
   * wave 切替で 0 リセットしない (wave 跨ぎの状態異常期限判定に使う)。
   * deltaSec * 1000 で累積する「ゲーム内時間」。
   */
  const runElapsedGameMsRef = useRef<number>(0);
  /**
   * interval パッチトリガー用の累積ゲーム内時間 (ms)。
   * 1000ms を超えるたびに evaluatePatches({ type: 'interval', deltaMs: 1000 }) を呼ぶ。
   * ラン開始 / wave 切替でリセットしない（interval は絶対時間ベース）。
   */
  const intervalAccumulatorMsRef = useRef<number>(0);
  /**
   * HP リジェネ用の累積 ms。
   * BigNum は整数しか持てず `hpRegen.mulNumber(deltaSec)` は天井丸めで 1 になってしまう
   * (例: 1 × 0.0167 = 1 → 60FPS で +60/秒の暴走リジェネ)。 そのため
   * 「1 秒ごとに hpRegen 値を 1 回 atomic に加算」 方式に変更し、 1 秒未満は累積するだけにする。
   */
  const hpRegenAccumulatorMsRef = useRef<number>(0);
  /**
   * 前フレームに「接触中」だった敵 ID の集合。 ノックバックは「新規接触したフレームのみ」
   * 適用するための状態遷移マーカー。 frame N で接触 → frame N+1 で非接触 (押し戻された) →
   * frame N+M で再接触 → ノックバック再発火、 というサイクルでダメージ間隔を空ける。
   */
  const prevContactSetRef = useRef<Set<string>>(new Set());
  /**
   * Cutter Overdrive (8s AS×3 バフ) の現在状態。 active=true の間、 通常攻撃の
   * effectivePerSec に overdriveStateRef.current.attackSpeedMul を乗算する。
   */
  const overdriveStateRef = useRef<OverdriveState>({
    active: false,
    remainingSec: 0,
    attackSpeedMul: 1,
    damageMul: 1,
  });
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
  const [appearanceEvents, setAppearanceEvents] = useState<AppearanceEvent[]>([]);
  const [waveElapsedSec, setWaveElapsedSec] = useState<number>(0);
  const [isOverdriveActive, setIsOverdriveActive] = useState<boolean>(false);

  // ---- ラン統計 3 state ----
  const [killCount, setKillCount] = useState<number>(0);
  /** 整数秒トラッキング用の float 累積 ref (setState は整数秒が変わったときのみ) */
  const runElapsedSecRef = useRef<number>(0);
  const [runElapsedSec, setRunElapsedSec] = useState<number>(0);
  const [droppedPatches, setDroppedPatches] = useState<PatchDrop[]>([]);

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

  // ---- ラン開始時に統計 3 state をリセット ----
  // isRunActive が false → true になる瞬間のみリセット (wave/tier 切替では isRunActive は変わらない)
  useEffect(() => {
    if (isRunActive) {
      setKillCount(0);
      setRunElapsedSec(0);
      runElapsedSecRef.current = 0;
      setDroppedPatches([]);
    }
  }, [isRunActive]);

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

  const onAppearanceDone = useCallback((id: string) => {
    setAppearanceEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ---------------------------------------------------------------------------
  // アクティブスキル発動 (manual / auto 共通)
  // store.triggerActive で CD セット + 武器ごとの active 関数を呼び、 敵 HP 減算 / DamageEvent
  // / ProjectileEvent を生成して配信する。 Cutter は overdriveStateRef を更新するのみで
  // 効果 (AS×3 8s) は tick の effectivePerSec 計算側で乗算される。
  // ---------------------------------------------------------------------------
  const fireActive = useCallback((): boolean => {
    const state = useStore.getState();
    if (state.activeCdSec > 0 || state.machineHp.isZero() || !state.isRunActive) {
      return false;
    }
    const machine = buildMachineStats({
      machineMaxHp: state.machineMaxHp,
      machineLevels: state.machineLevels,
    });
    const effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - machine.activeCdReduction);
    const fired = state.triggerActive(effectiveCdSec);
    if (!fired) return false;

    soundEngine.play(WEAPON_ACTIVE_SOUND[state.currentWeapon]);
    vibrate(15);

    const attackMul = calcRunWorkshopMultiplier(state.runWorkshopLevels.attackMul);
    const newDamageEvents: DamageEvent[] = [];
    const newProjectileEvents: ProjectileEvent[] = [];

    const applyHits = (hits: Array<{ enemyId: string; damage: BigNum; crit?: boolean }>): void => {
      const hitMap = new Map(hits.map((h) => [h.enemyId, h]));
      enemiesRef.current = enemiesRef.current.map((e) => {
        const hit = hitMap.get(e.id);
        if (hit == null) return e;
        damageEventIdRef.current += 1;
        newDamageEvents.push({
          id: `de-${damageEventIdRef.current}`,
          x: e.position.x,
          y: e.position.y,
          value: hit.damage,
          crit: hit.crit ?? false,
        });
        return { ...e, hp: e.hp.sub(hit.damage) };
      });
    };

    switch (state.currentWeapon) {
      case 'laser': {
        const s = laserStats(state.weaponLv);
        const boosted = { ...s, damageMul: s.damageMul * attackMul * machine.activePower };
        // ビーム発射角度: 最寄り敵の方向 (敵がいなければ右 = 0°)
        let angleDeg = 0;
        if (enemiesRef.current.length > 0) {
          const nearest = enemiesRef.current.reduce((acc, e) =>
            distanceFromMachine(e.position) < distanceFromMachine(acc.position) ? e : acc
          );
          const dx = nearest.position.x - MACHINE_CENTER_X;
          const dy = nearest.position.y - MACHINE_CENTER_Y;
          angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        }
        // ビーム軸 + 幅で hit 判定 (描画する MegaBeamFx と同じ angle / width)
        const r = laserMegaBeam(
          machine,
          boosted,
          enemiesRef.current,
          angleDeg,
          MACHINE_CENTER_X,
          MACHINE_CENTER_Y
        );
        applyHits(r.hits.map((h) => ({ enemyId: h.enemyId, damage: h.damage })));
        projectileEventIdRef.current += 1;
        newProjectileEvents.push({
          id: `pe-${projectileEventIdRef.current}`,
          kind: 'megaBeam',
          x: MACHINE_CENTER_X,
          y: MACHINE_CENTER_Y,
          angle: angleDeg,
        });
        break;
      }
      case 'cannon': {
        const s = cannonStats(state.weaponLv);
        const boosted = { ...s, damageMul: s.damageMul * attackMul * machine.activePower };
        const r = cannonVolley(machine, boosted, enemiesRef.current);
        // 通常攻撃と同じ shellMs (砲弾飛翔時間) を共有。 砲弾飛翔 + 着弾後爆発 +
        // 着弾と同じタイミングで HP 減算するため pendingCannonHits に積む。
        const shellMs = CANNON_SHELL_MS;
        const nowGameMs = runElapsedGameMsRef.current;
        for (const shot of r.shots) {
          // 砲弾飛翔 (マシン → 着弾点)
          projectileEventIdRef.current += 1;
          newProjectileEvents.push({
            id: `pe-${projectileEventIdRef.current}`,
            kind: 'cannonShell',
            x1: MACHINE_CENTER_X,
            y1: MACHINE_CENTER_Y,
            x2: shot.blastX,
            y2: shot.blastY,
            durationMs: shellMs,
          });
          // 着弾後爆発 (delayMs で砲弾着弾と同期)
          projectileEventIdRef.current += 1;
          newProjectileEvents.push({
            id: `pe-${projectileEventIdRef.current}`,
            kind: 'blast',
            x: shot.blastX,
            y: shot.blastY,
            delayMs: shellMs,
          });
          // shot.hits 全員のダメージを着弾遅延 hit として登録 (通常攻撃と同じ経路)
          for (const hit of shot.hits) {
            pendingCannonHitsRef.current.push({
              enemyId: hit.enemyId,
              damage: hit.damage,
              crit: false,
              freeze: false,
              applyAtMs: nowGameMs + shellMs,
            });
          }
        }
        break;
      }
      case 'thunder': {
        const s = thunderStats(state.weaponLv);
        const boosted = { ...s, damageMul: s.damageMul * attackMul * machine.activePower };
        const r = thunderPlasmaDischarge(machine, boosted, enemiesRef.current);
        // 連鎖の視覚: マシン → hit 順に points を結ぶ
        const points: { x: number; y: number }[] = [{ x: MACHINE_CENTER_X, y: MACHINE_CENTER_Y }];
        for (const hit of r.hits) {
          const enemy = enemiesRef.current.find((e) => e.id === hit.enemyId);
          if (enemy != null) {
            points.push({ x: enemy.position.x, y: enemy.position.y });
          }
        }
        if (points.length > 1) {
          projectileEventIdRef.current += 1;
          newProjectileEvents.push({
            id: `pe-${projectileEventIdRef.current}`,
            kind: 'chain',
            points,
          });
        }
        applyHits(r.hits);
        break;
      }
      case 'cutter': {
        const s = cutterStats(state.weaponLv);
        overdriveStateRef.current = cutterStartOverdrive(s);
        setIsOverdriveActive(true);
        // 視覚 (OverdriveAuraFx) は battle 画面が isOverdriveActive を見て制御する
        break;
      }
    }

    if (newDamageEvents.length > 0) {
      setDamageEvents((prev) => [...prev, ...newDamageEvents]);
    }
    if (newProjectileEvents.length > 0) {
      setProjectileEvents((prev) => [...prev, ...newProjectileEvents]);
    }
    return true;
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

        // ---- ラン経過秒の更新 (整数秒が変わったときのみ setState) ----
        {
          const prevIntSec = Math.floor(runElapsedSecRef.current);
          runElapsedSecRef.current += deltaSec;
          const nextIntSec = Math.floor(runElapsedSecRef.current);
          if (nextIntSec !== prevIntSec) {
            setRunElapsedSec(nextIntSec);
          }
        }

        // ---- 装着パッチ配列 (Map → Array) ----
        const equippedPatchesArr: EquippedPatch[] = Array.from(state.equippedPatches.values());

        // ---- interval パッチトリガー ----
        {
          const { ticks, nextAccumulatorMs } = calcIntervalTicks(
            intervalAccumulatorMsRef.current,
            deltaSec
          );
          intervalAccumulatorMsRef.current = nextAccumulatorMs;
          for (let i = 0; i < ticks; i++) {
            const intervalEffect = evaluatePatches(
              equippedPatchesArr,
              { type: 'interval', deltaMs: 1000 },
              Math.random
            );
            // heal: machineHp に加算 (atomic、 同 tick 内の他の更新と競合しない)
            if (intervalEffect.heal != null && !intervalEffect.heal.isZero()) {
              state.addMachineHp(intervalEffect.heal);
            }
            // boltGain: addBolt
            if (intervalEffect.boltGain != null && !intervalEffect.boltGain.isZero()) {
              state.addBolt(intervalEffect.boltGain);
            }
          }
        }

        // ---- CD 減算 ----
        state.tickCooldowns(deltaSec);

        // ---- アクティブスキル自動発動 ----
        // isAutoActive=true で activeCdSec=0 なら fireActive を呼ぶ (manual / auto 共通経路)。
        if (state.isAutoActive && state.activeCdSec <= 0) {
          fireActive();
        }

        // ---- Cutter Overdrive 状態の tick ----
        if (overdriveStateRef.current.active) {
          overdriveStateRef.current = cutterTickOverdrive(overdriveStateRef.current, deltaSec);
          if (!overdriveStateRef.current.active) {
            setIsOverdriveActive(false);
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
            // 上位敵 (elite / miniboss / boss) が混じっていれば AppearanceBannerFx を出す
            const upperSpawns = newSpawns.filter((s) => s.kind !== 'normal');
            if (upperSpawns.length > 0) {
              // ボス登場時に警告 SE を再生
              if (upperSpawns.some((s) => s.kind === 'boss')) {
                soundEngine.play('bossWarn');
              }
              const newAppearances: AppearanceEvent[] = upperSpawns.map((s) => {
                appearanceEventIdRef.current += 1;
                const kind = s.kind as 'elite' | 'miniboss' | 'boss';
                const label =
                  kind === 'boss'
                    ? `TIER ${state.currentTier} BOSS`
                    : kind === 'miniboss'
                      ? `MINI BOSS T${state.currentTier}W${state.currentWave}`
                      : `ELITE T${state.currentTier}W${state.currentWave}`;
                return {
                  id: `ap-${appearanceEventIdRef.current}`,
                  kind,
                  name: label,
                };
              });
              setAppearanceEvents((prev) => [...prev, ...newAppearances]);
            }
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
          // Cutter Overdrive 中は attackSpeedMul に overdriveStateRef.current.attackSpeedMul も乗算
          const overdriveAsMul = overdriveStateRef.current.active
            ? overdriveStateRef.current.attackSpeedMul
            : 1;
          // tick ループ内の machine stats (attackSpeed 反映のため先行取得)
          const machineTick = buildMachineStats({
            machineMaxHp: state.machineMaxHp,
            machineLevels: state.machineLevels,
          });
          const effectivePerSec = Math.min(
            ATTACK_PER_SEC_CAP,
            basePerSec * machineTick.attackSpeed * attackSpeedMul * overdriveAsMul
          );
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

            const result = fireWeapon({
              weapon: state.currentWeapon,
              weaponLv: state.weaponLv,
              machine: machineTick,
              enemiesInRange: sortedInRange,
              rng: Math.random,
              cutterAngleDeg: cutterAngleDegRef.current,
              attackMul,
            });
            // Cutter は刃の角度を 1 ヒットあたり前進。 次フレームの fire / 描画に反映
            if (result.cutterAngle != null) {
              cutterAngleDegRef.current = result.cutterAngle;
            }

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
                for (const hit of augmentedHits) {
                  pendingCannonHitsRef.current.push({
                    enemyId: hit.enemyId,
                    damage: hit.damage,
                    crit: hit.crit ?? false,
                    freeze: hit.freeze,
                    freezeSec: hit.freezeSec,
                    burnSec: hit.burnSec,
                    applyAtMs: nowGameMs + CANNON_SHELL_MS,
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
                // 1 ショット = 1 砲弾 + 1 爆発。 splash 内の複数敵にダメージが入っても
                // 物理的に飛翔する砲弾は 1 個 (result.impactX/Y = cannonNormalAttack の blastX/Y)。
                const shellMs = CANNON_SHELL_MS;
                const impactX = result.impactX;
                const impactY = result.impactY;
                if (impactX != null && impactY != null) {
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'cannonShell',
                    x1: MACHINE_CENTER_X,
                    y1: MACHINE_CENTER_Y,
                    x2: impactX,
                    y2: impactY,
                    durationMs: shellMs,
                  });
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'blast',
                    x: impactX,
                    y: impactY,
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
          let killedThisFrame = 0;
          for (const enemy of enemiesRef.current) {
            if (enemy.hp.lte(BigNum.ZERO)) {
              killedThisFrame += 1;
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

              // --- ネジ (screw): 常時獲得 + screwGainMul (RW) × machineScrewGainMul + dropMul ---
              const machineScrewGainMul = calcEffectValue(
                MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'screwGain')!,
                state.machineLevels.screwGain
              );
              const baseScrew = enemy.reward.screw;
              if (baseScrew > 0) {
                earnedScrew = earnedScrew.add(
                  BigNum.fromNumber(baseScrew * screwGainMul * machineScrewGainMul * dropMul)
                );
                pickupEventIdRef.current += 1;
                newPickupEvents.push({
                  id: `pk-${pickupEventIdRef.current}`,
                  x: enemy.position.x,
                  y: enemy.position.y,
                  iconName: 'screw',
                });
              }

              // --- ボルト (bolt): 通常敵は 50% 確率、 上位敵は 100% + boltGainMul + dropMul ---
              const boltGainMul = calcEffectValue(
                MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'boltGain')!,
                state.machineLevels.boltGain
              );
              const baseBolt = enemy.reward.bolt;
              if (baseBolt > 0) {
                const boltDropRoll =
                  enemy.kind === 'normal' ? Math.random() < NORMAL_BOLT_DROP_CHANCE : true;
                if (boltDropRoll) {
                  const scaledBolt = scaledReward(baseBolt, state.currentTier);
                  earnedBolt = earnedBolt.add(
                    BigNum.fromNumber(scaledBolt * boltGainMul * dropMul)
                  );
                  pickupEventIdRef.current += 1;
                  newPickupEvents.push({
                    id: `pk-${pickupEventIdRef.current}`,
                    x: enemy.position.x,
                    y: enemy.position.y,
                    iconName: 'bolt',
                  });
                }
              }

              // --- 超合金 (alloy): reward.alloyChance で reward.alloyAmount を獲得 + alloyGainMul + dropMul ---
              const alloyGainMul = calcEffectValue(
                MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'alloyGain')!,
                state.machineLevels.alloyGain
              );
              if (enemy.reward.alloyChance > 0 && enemy.reward.alloyAmount > 0) {
                if (Math.random() < enemy.reward.alloyChance) {
                  const scaledAlloyAmount = scaledReward(
                    enemy.reward.alloyAmount,
                    state.currentTier
                  );
                  earnedAlloy = earnedAlloy.add(
                    BigNum.fromNumber(scaledAlloyAmount * alloyGainMul * dropMul)
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

              // --- パッチドロップ (06-patches.md): elite/miniboss/boss のみ ---
              // patchDropRate = machine 強化 (linear) × bonusDrop パッチの dropMultiplier
              const patchDropRateMul =
                calcEffectValue(
                  MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchDropRate')!,
                  state.machineLevels.patchDropRate
                ) * dropMul;
              const dropped = dropPatch(
                enemy.kind,
                state.currentTier,
                patchDropRateMul,
                Math.random
              );
              if (dropped != null) {
                state.addPatch(dropped.name, dropped.tier, 1);
                setDroppedPatches((prev) => [...prev, dropped]);
              }

              // 撃破 SE: boss/miniboss は bossKill、 それ以外は enemyKill
              if (enemy.kind === 'boss' || enemy.kind === 'miniboss') {
                soundEngine.play('bossKill');
                vibrate([40, 30, 40]);
              } else {
                soundEngine.play('enemyKill');
                vibrate(8);
              }
            } else {
              survivors.push(enemy);
            }
          }
          // 撃破数を 1 フレーム分まとめて setState (1 体ごとに呼ぶと React の追加 render が連鎖し発熱)
          if (killedThisFrame > 0) {
            setKillCount((c) => c + killedThisFrame);
          }
          // onKill heal を機体 HP に加算 (atomic、 同 tick 内の他の更新と競合しない)
          if (!totalKillHeal.isZero()) {
            state.addMachineHp(totalKillHeal);
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

          // ---- 被ダメ処理 (マシン近接の敵から enemy.atk × deltaSec) + onHit パッチ
          //      + 新規接触敵へのノックバック ----
          // ダメージは「接触してる時間 × DPS」(現状通り)。 ノックバックは「新規接触フレームのみ」
          // 適用し、 押し戻された敵は MELEE 外に出るため次フレーム以降は DPS が止まる。
          // 敵が enemy.speed で再接近 → 再接触したらまたノックバック + 短時間 DPS、 を繰り返す。
          const machineStats = buildMachineStats({
            machineMaxHp: state.machineMaxHp,
            machineLevels: state.machineLevels,
          });
          let totalReceived = BigNum.ZERO;
          const newContactSet = new Set<string>();
          enemiesRef.current = enemiesRef.current.map((enemy) => {
            const dist = distanceFromMachine(enemy.position);
            if (dist > MELEE_CONTACT_RANGE) {
              return enemy;
            }
            // 接触中: DPS 加算
            const dmgPerSec = calcReceivedDamage(enemy.atk, machineStats);
            totalReceived = totalReceived.add(dmgPerSec.mulNumber(deltaSec));
            newContactSet.add(enemy.id);
            // 継続接触はノックバックなし (毎フレーム押し戻すと不自然なため)
            if (prevContactSetRef.current.has(enemy.id)) {
              return enemy;
            }
            // 新規接触: マシン中心 (50, 50) から離れる方向に KNOCKBACK_DISTANCE_PCT 押し戻す
            return {
              ...enemy,
              position: applyKnockback(
                enemy.position,
                { x: MACHINE_CENTER_X, y: MACHINE_CENTER_Y },
                KNOCKBACK_DISTANCE_PCT
              ),
            };
          });
          prevContactSetRef.current = newContactSet;
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
              if (hpAfter.isZero() && !hpBefore.isZero()) {
                soundEngine.play('machineDown');
                vibrate([100, 50, 100, 50, 100]);
              } else {
                soundEngine.play('machineHit');
                vibrate(20);
              }
            }
          }

          // ---- HP リジェネ (1 秒ごとに hpRegen 量を加算) ----
          // BigNum は整数しか持てず、 `hpRegen.mulNumber(deltaSec)` は天井丸めで毎フレーム +1
          // (= +60/秒) になってしまう。 そのため 1 秒ごとに 1 回 atomic に加算する方式にする。
          {
            const { ticks, nextAccumulatorMs } = calcIntervalTicks(
              hpRegenAccumulatorMsRef.current,
              deltaSec
            );
            hpRegenAccumulatorMsRef.current = nextAccumulatorMs;
            if (ticks > 0 && !useStore.getState().machineHp.isZero()) {
              state.addMachineHp(machineStats.hpRegen.mulInt(ticks));
            }
          }

          // ---- Wave 終了判定 (最終 wave は時間でなくボス撃破で advance) ----
          const decision = decideWaveAdvance(
            waveElapsedMsRef.current,
            schedule.durationSec,
            state.currentWave,
            tierWaves.length,
            enemiesRef.current.length
          );
          if (decision === 'advanceWave' || decision === 'advanceTier') {
            // onWaveClear パッチ評価 (shieldRegen: HP heal、 boltCast: bolt gain)
            const clearEffect = evaluatePatches(
              equippedPatchesArr,
              { type: 'onWaveClear' },
              Math.random
            );
            if (clearEffect.heal != null && !clearEffect.heal.isZero()) {
              state.addMachineHp(clearEffect.heal);
            }
            if (clearEffect.boltGain != null && !clearEffect.boltGain.isZero()) {
              state.addBolt(clearEffect.boltGain);
            }
            if (decision === 'advanceWave') {
              state.advanceWave();
              soundEngine.play('waveClear');
              vibrate(15);
            } else {
              state.advanceTier();
              soundEngine.play('tierClear');
              vibrate([40, 30, 40]);
            }
            // wave / tier 切替直後の同フレームで waveElapsedMsRef も 0 に揃える。
            // (currentWave 変化に反応する useEffect でも 0 にされるが、 そちらより前に
            //  setWaveElapsedSec(古い値) が走ってしまうと WaveProgressBar の AnimatedTimerBar
            //  が「残量 0 近く」で再マウントされ、 バーが満タンに戻らない。)
            waveElapsedMsRef.current = 0;
            prevWaveElapsedMsRef.current = 0;
          }
        }

        // pause / gameover 中は表示更新もスキップ (60fps 再描画で発熱するため、 deltaSec > 0 ブロック内に置く)
        setEnemies(enemiesRef.current);
        setWaveElapsedSec(waveElapsedMsRef.current / 1000);
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
  }, [isRunActive, tierWaves, range, fireActive]);

  return {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    pickupEvents,
    appearanceEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    onPickupDone,
    onAppearanceDone,
    fireActive,
    isOverdriveActive,
    killCount,
    runElapsedSec,
    droppedPatches,
  };
}
