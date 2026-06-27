import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DamageEvent, DeathEvent, ProjectileEvent } from '@/components/organisms/BattleField';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { calcReceivedDamage } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import { scaledReward } from '@/game/enemies';
import { updateEnemyPosition } from '@/game/loop/enemyMovement';
import { buildMachineStats } from '@/game/loop/machineStats';
import { fireWeapon, getAttackPerSec } from '@/game/loop/weaponDispatch';
import { evaluatePatches } from '@/game/patches';
import { dropPatch } from '@/game/patches/drops';
import type { PatchDrop } from '@/game/patches/drops';
import type { EquippedPatch } from '@/game/patches.types';
import type { EnemyKind, SpawnedEnemy } from '@/game/types';
import { buildTierWaves, getSpawnsAtTime } from '@/game/wave';
import { cannonApplySplash, cannonStats, cannonVolley } from '@/game/weapons/cannon';
import {
  cutterStartOverdrive,
  cutterStats,
  cutterTickOverdrive,
  type OverdriveState,
} from '@/game/weapons/cutter';
import {
  LASER_MEGA_BEAM_WIDTH_PCT,
  LASER_UPPER_ENEMY_BONUS,
  laserMegaBeam,
  laserStats,
} from '@/game/weapons/laser';
import { WEAPON_RANGE_PCT } from '@/game/weapons/range';
import { thunderPlasmaDischarge, thunderStats } from '@/game/weapons/thunder';
import { soundEngine } from '@/lib/audio';
import type { SoundId } from '@/lib/audio';
import { BigNum } from '@/lib/bignum';
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

/**
 * 描画 fps の上限から 1 フレーム間隔 (ms) を計算する。
 * モバイル発熱対策で 30 / 45 / 60 を切り替えられるようにしているため引数で受け取る。
 * (可変 timestep なのでゲーム挙動は壊れない)
 */
export function frameIntervalMs(targetFps: number): number {
  return 1000 / targetFps;
}

/** 前回描画からの経過 ms が targetFps の閾値を満たすか。 満たさない場合は rAF だけ再予約してスキップ */
export function shouldDrawFrame(elapsedMs: number, targetFps: number): boolean {
  return elapsedMs >= frameIntervalMs(targetFps);
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
 *    「ボススポーン時刻を過ぎている」 かつ 「ボスが残っていない」 で advanceTier。
 *    通常敵 (normal) の生存は無視する。 仕様: ボス撃破で Victory (通常敵が残っていても OK)。
 *    (BUG-W30-1: 旧実装は enemiesCount===0 必須で、 ボス出現後も通常敵が湧き続ける wave.ts の
 *    挙動と組み合わさって永久に advanceTier しなかった。 通常敵スポーン停止と併せて修正)
 *
 * @param waveElapsedMs    現 wave の経過 ms
 * @param durationSec      schedule.durationSec (= WAVE_DURATION_SEC)
 * @param currentWave      1〜totalWaves
 * @param totalWaves       1 tier の wave 数
 * @param bossAlive        ボス (kind==='boss') が enemiesRef に生存しているか
 */
export function decideWaveAdvance(
  waveElapsedMs: number,
  durationSec: number,
  currentWave: number,
  totalWaves: number,
  bossAlive: boolean
): AdvanceDecision {
  if (currentWave >= totalWaves) {
    // 最終 wave: ボス出現時刻を過ぎていてボス不在で advanceTier。 時間経過は無視
    const bossSpawnedMs = Math.max(0, (durationSec - BOSS_SPAWN_LEAD_SEC) * 1000);
    if (waveElapsedMs >= bossSpawnedMs && !bossAlive) {
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
 * ボス HP 60% 閾値 (v1.3.1)。 ボス wave 中、 ボス HP がこの比率を切ると
 * battle slice の bossWeakenedAtMs に現フレーム時刻が記録され、
 * wave.ts の countBossNormalSpawns 経由で雑魚スポーンが通常頻度で再開する。
 */
export const BOSS_WEAKENED_HP_THRESHOLD = 0.6;

/**
 * 敵接触時のノックバック距離 (%)。 マシン中心から離れる方向に enemy.position をこの値だけ押し戻す。
 * 体感としてスマホ画面(短辺 ~400px)で約 20px 相当。 画面サイズが変わると見た目の px は変動する。
 * 「新規接触フレーム」のみ 1 回適用 (毎フレーム適用ではない) ので、再接近 → 再接触 → 再ノックバック
 * というサイクルでダメージ間隔が空く。
 *
 * v1.3.1: normal (雑魚) は base 値 5。 上位敵は ATK 倍率と同じ係数で強化 (KNOCKBACK_DISTANCE_PCT_BY_KIND)。
 */
export const KNOCKBACK_DISTANCE_PCT = 5;

/**
 * 敵種別ごとのノックバック距離 (% フィールド、 v1.3.1)。
 * 上位敵 (elite/miniboss/boss) は ATK と同じ倍率で強化:
 * - normal: 5% (= base)
 * - elite: 6% (= 5 × 1.2)
 * - miniboss: 7.5% (= 5 × 1.5)
 * - boss: 15% (= 5 × 3.0、 重い一撃 → 距離取り直しの体感を更に強める調整)
 *
 * 結果: boss は単発の重い攻撃 → 押し戻されて長い再接近時間を必要とする。
 */
export const KNOCKBACK_DISTANCE_PCT_BY_KIND: Record<EnemyKind, number> = {
  normal: 5,
  elite: 6,
  miniboss: 7.5,
  boss: 15,
};

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

// 射程は武器別マップ (WEAPON_RANGE_PCT) で管理。
// Cutter の 14% は CutterOrbitFx の length=14vmin と一致 (視覚的な刃の範囲)。

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
  /**
   * 外部からの強制停止フラグ。 ResultDialog 表示中 (撤退 / gameover) に true を渡し、
   * 敵移動 / 武器発射 / spawn / wave 進行などをすべて止める。
   * 全滅 (machineHp=0) は内部判定で別途停止するが、 撤退などこちらでは判定できない
   * ローカル UI 状態のために外から渡す経路を用意する。
   */
  paused?: boolean;
  /**
   * 描画系 events (damageEvents / deathEvents / projectileEvents / appearanceEvents) の
   * state 更新を抑止する (v1.3.2)。 ゲームループ自体は通常通り走り、 敵 HP 減算 / 撃破判定 /
   * spawn / wave 進行は継続するが、 親が表示用に消費する Fx events だけ生成しない。
   *
   * 主用途: スクリーンセーバー中。 BattleField を unmount しているため Fx の完了通知
   * (onDamageDone 等) が来ず、 通常通り setDamageEvents で append すると state に
   * 溜まり続けて、 スクリーンセーバー閉じた瞬間に大量 Fx が一斉発火する。 これを防ぐ。
   *
   * true → false に切り替わったタイミングで events は再度貯まり始める。 切り替え瞬間に
   * 既存の events もクリアされる (= 残り Fx の再生はキャンセル)。
   */
  suspendRendering?: boolean;
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
  appearanceEvents: AppearanceEvent[];
  /** 現在 wave 内の経過秒 (0 〜 WAVE_DURATION_SEC) */
  waveElapsedSec: number;
  onDamageDone: (id: string) => void;
  onDeathDone: (id: string) => void;
  onProjectileDone: (id: string) => void;
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
  /**
   * Tier ボス撃破でクリア条件が成立したフラグ。
   * 一度立つと `onTierClearedAck` が呼ばれるまで保持される。
   * 親 (pages/battle) はこのフラグを検知して:
   *   1. useBattleLoop に paused=true を渡してゲームループを停止
   *   2. TierClearFx を表示
   *   3. TierClearFx onDone で `state.unlockNextTier(currentTier)` + `setResultStatus('clear')`
   *      + `onTierClearedAck()` を呼ぶ
   * 旧実装は decideWaveAdvance='advanceTier' で即座に `state.advanceTier()` を呼んで currentTier
   * を +1 していたため、 「Tier クリア → 勝手に次 Tier が始まる」 になっていた。 0.3.5 で廃止。
   */
  tierCleared: boolean;
  /** tierCleared フラグをリセット (親が消費したことを通知) */
  onTierClearedAck: () => void;
}

/** 通常敵が ボルト をドロップする確率 (02-currencies.md 仕様) */
export const NORMAL_BOLT_DROP_CHANCE = 0.5;

export function useBattleLoop({
  paused = false,
  suspendRendering = false,
}: UseBattleLoopOpts): UseBattleLoopResult {
  // paused は ref 経由で tick から最新値を読む (useEffect の再実行を避けるため)
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  // v1.3.2: 描画 events の生成抑止フラグ (スクリーンセーバー中など)。 ref 経由で tick から最新値を読む。
  const suspendRenderingRef = useRef(suspendRendering);
  suspendRenderingRef.current = suspendRendering;

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
   * 着弾遅延砲弾 (Cannon 専用、 v1.1.2)。 発射時には着弾点と splash メタデータだけを積み、
   * applyAtMs 到達時 (= shellMs 後) に **その時点の** 敵分布に対して
   * cannonApplySplash で距離減衰ダメ + 半円カット + onAttack パッチを評価する。
   *
   * v1.1.2 で「発射時点でヒット相手と damage を確定」 する旧仕様 (pendingCannonHits) から
   * 「着弾時の敵分布で splash 判定」 に変更したため、 飛翔中に敵が splash 内に入れば
   * ダメージを受け、 抜ければ受けない。
   */
  const pendingCannonShellsRef = useRef<
    Array<{
      blastX: number;
      blastY: number;
      isCrit: boolean;
      splashRadius: number;
      damageMul: number;
      applyAtMs: number;
    }>
  >([]);

  /**
   * Cutter 専用: ダメージ pop (DamagePopFx) の遅延発火キュー。
   * Cutter は 1 fire = 半円 sweep で複数敵に同時ヒットするが、 物理的には刃が各敵の角度に
   * 達した瞬間に当たるべき。 視覚 (CutterOrbitFx の回転刃) と pop 表示のズレを解消するため、
   * fire 時に各 hit の progressInSweep (0〜1) を見て `applyAtMs = fireMs + progress × intervalMs`
   * を計算し、 ここに積む。 tick 冒頭で applyAtMs を満たすものを setDamageEvents に流す。
   *
   * 敵 HP 減算 / onAttack / lifesteal は fire 時に即時実行 (シンプル化)。 遅延されるのは
   * 「ダメージ pop の表示時刻」 だけ。
   */
  const pendingCutterPopsRef = useRef<
    Array<{
      id: string;
      x: number;
      y: number;
      value: BigNum;
      crit: boolean;
      applyAtMs: number;
    }>
  >([]);

  /**
   * Fx 完了通知のバッファ (H2-3)。 onDamageDone / onDeathDone / onProjectileDone /
   * onAppearanceDone は Fx 演出完了時に複数同時に呼ばれることがあり、 各々で setState
   * (filter で配列再生成) を呼ぶと BattleField 全体が連鎖 re-render する。
   * 完了 ID をここに溜めて、 tick 冒頭で 1 回だけ filter + setState する。
   * (Fx unmount は 1 tick = ~16ms 遅れるが視覚への影響なし)
   */
  const pendingDamageRemovalsRef = useRef<Set<string>>(new Set());
  const pendingDeathRemovalsRef = useRef<Set<string>>(new Set());
  const pendingProjectileRemovalsRef = useRef<Set<string>>(new Set());
  const pendingAppearanceRemovalsRef = useRef<Set<string>>(new Set());

  const [enemies, setEnemies] = useState<SpawnedEnemy[]>([]);
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  const [deathEvents, setDeathEvents] = useState<DeathEvent[]>([]);
  const [projectileEvents, setProjectileEvents] = useState<ProjectileEvent[]>([]);
  const [appearanceEvents, setAppearanceEvents] = useState<AppearanceEvent[]>([]);
  const [waveElapsedSec, setWaveElapsedSec] = useState<number>(0);
  const [isOverdriveActive, setIsOverdriveActive] = useState<boolean>(false);

  // v1.3.2: suspendRendering が true になった瞬間に既存の描画 events と削除キューを全クリア
  // (= スクリーンセーバーを開いた瞬間に残っていた Fx を全部消す)。 false に戻ったタイミング
  // からは tick の append が再開され、 新規イベントだけ流れ始める。
  //
  // v1.3.5: suspendRendering 中は setEnemies / setWaveElapsedSec も tick 内で skip する
  // ため、 false 復帰時に最新の enemiesRef.current / waveElapsedMsRef.current を 1 回 sync
  // しないと、 BattleField が古い state で再 mount されて (敵が消えて見える / wave バーが
  // 古い位置で再開) しまう。
  useEffect(() => {
    if (suspendRendering) {
      setDamageEvents([]);
      setDeathEvents([]);
      setProjectileEvents([]);
      setAppearanceEvents([]);
      pendingDamageRemovalsRef.current = new Set();
      pendingDeathRemovalsRef.current = new Set();
      pendingProjectileRemovalsRef.current = new Set();
      pendingAppearanceRemovalsRef.current = new Set();
    } else {
      setEnemies(enemiesRef.current);
      setWaveElapsedSec(waveElapsedMsRef.current / 1000);
    }
  }, [suspendRendering]);

  // ---- ラン統計 3 state ----
  const [killCount, setKillCount] = useState<number>(0);
  /** 整数秒トラッキング用の float 累積 ref (setState は整数秒が変わったときのみ) */
  const runElapsedSecRef = useRef<number>(0);
  const [runElapsedSec, setRunElapsedSec] = useState<number>(0);
  const [droppedPatches, setDroppedPatches] = useState<PatchDrop[]>([]);
  /**
   * Tier ボス撃破でクリア成立した瞬間に true。 親 (pages/battle) が TierClearFx 表示 +
   * unlockNextTier + ResultDialog 表示までを行ったあと onTierClearedAck() でリセット。
   * tierCleared=true の間はゲームループを内部で自己停止 (tierClearedRef を deltaSec 計算で参照)。
   * 親に paused 引数として伝える必要はなく、 useBattleLoop 内部で完結する。
   */
  const [tierCleared, setTierCleared] = useState<boolean>(false);
  const tierClearedRef = useRef<boolean>(false);
  const onTierClearedAck = useCallback(() => {
    setTierCleared(false);
    tierClearedRef.current = false;
  }, []);

  const isRunActive = useStore((s) => s.isRunActive);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);

  // ---- machine stats を「入力が変わった時のみ」 再計算してキャッシュ (Issue #84) ----
  // buildMachineStats の入力 (machineMaxHp / machineLevels) が変わる経路:
  //   - machineLevels: 武器庫の upgradeMachine (ラン外) / hydrate のみ → **ラン中は変わらない**
  //   - machineMaxHp:  startRun と RunWorkshop の hpMul 強化 (recalcMachineMaxHpFromHpMul)
  // つまり戦闘ループ中の頻度は「強化したフレーム」 のみ。 useMemo で deps が変わったときだけ
  // 再計算し、 ref 経由で tick から参照する。 ラン中強化なしなら 0 回 / 強化 N 回なら N 回。
  const machineLevels = useStore((s) => s.machineLevels);
  const machineMaxHpStore = useStore((s) => s.machineMaxHp);
  const highestTier = useStore((s) => s.highestTier);
  const machineStats: MachineStats = useMemo(
    () =>
      buildMachineStats({
        machineMaxHp: machineMaxHpStore,
        machineLevels,
        highestTier,
        currentTier,
      }),
    [machineMaxHpStore, machineLevels, highestTier, currentTier]
  );
  const machineStatsRef = useRef(machineStats);
  machineStatsRef.current = machineStats;

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
      // 敵リスト全クリア時は飛翔中砲弾も Cutter の遅延 pop も無効にする
      pendingCannonShellsRef.current = [];
      pendingCutterPopsRef.current = [];
    }
  }, [currentTier, currentWave]);

  // ---- ラン開始時に統計 3 state + tierCleared フラグ + ref 系をリセット ----
  // isRunActive が false → true になる瞬間のみリセット (wave/tier 切替では isRunActive は変わらない)
  useEffect(() => {
    if (isRunActive) {
      setKillCount(0);
      setRunElapsedSec(0);
      runElapsedSecRef.current = 0;
      setDroppedPatches([]);
      // 前ラン (Tier クリア) で立った tierCleared が残っていれば確実にリセット
      setTierCleared(false);
      tierClearedRef.current = false;
      // v1.1.4: ラン跨ぎで累積していた ref 系をリセット。
      // Event ID counter 4 個は number なので容量上の問題は無いが、 ラン間で連番が
      // 引き継がれると id 重複の懸念があるため明示的にゼロから振り直す。
      damageEventIdRef.current = 0;
      deathEventIdRef.current = 0;
      projectileEventIdRef.current = 0;
      appearanceEventIdRef.current = 0;
      enemyIdCounterRef.current = 0;
      // 着弾遅延砲弾 / Cutter pop キューは前ラン途中の未着弾分が残るとロジック不整合の元
      pendingCannonShellsRef.current = [];
      pendingCutterPopsRef.current = [];
      // Fx 完了通知バッファも念のため空に (前ラン終了で flush 済みのはずだが二重防御)
      pendingDamageRemovalsRef.current = new Set();
      pendingDeathRemovalsRef.current = new Set();
      pendingProjectileRemovalsRef.current = new Set();
      pendingAppearanceRemovalsRef.current = new Set();
      // 浮動小数 accumulator も初期化して低 fps 時の累積誤差をリセット
      fireAccumulatorMsRef.current = 0;
      cutterAngleDegRef.current = 0;
    }
  }, [isRunActive]);

  // H2-3: Fx 完了通知は ref Set にバッファするだけ (setState を起こさない)。
  // 実際の配列フィルタ + setState は tick 冒頭で 1 回だけ flush する。
  // 同フレーム内に大量の Fx (DamagePopFx 等) が完了しても setState 連鎖が消える。
  const onDamageDone = useCallback((id: string) => {
    pendingDamageRemovalsRef.current.add(id);
  }, []);

  const onDeathDone = useCallback((id: string) => {
    pendingDeathRemovalsRef.current.add(id);
  }, []);

  const onProjectileDone = useCallback((id: string) => {
    pendingProjectileRemovalsRef.current.add(id);
  }, []);

  const onAppearanceDone = useCallback((id: string) => {
    pendingAppearanceRemovalsRef.current.add(id);
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
      // v1.3.4: 出撃中 Tier と 最新未クリア Tier の差で baseAttack に倍率がかかる
      highestTier: state.highestTier,
      currentTier: state.currentTier,
    });
    const effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - machine.activeCdReduction);
    const fired = state.triggerActive(effectiveCdSec);
    if (!fired) return false;

    // v1.3.5: スクリーンセーバー中は SE を抑止 (発熱対策)。
    // ループとロジックは継続するが、 オーディオパイプライン負荷は完全停止。
    if (!suspendRenderingRef.current) {
      soundEngine.play(WEAPON_ACTIVE_SOUND[state.currentWeapon]);
    }

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
          widthPct: LASER_MEGA_BEAM_WIDTH_PCT,
        });
        break;
      }
      case 'cannon': {
        const s = cannonStats(state.weaponLv);
        const boosted = { ...s, damageMul: s.damageMul * attackMul * machine.activePower };
        // v1.1.2: 着弾時にその時点の敵分布で splash 判定する (cannonApplySplash 経由)。
        // ここでは 5 発分の予測着弾点 (砲弾 × 敵直線運動の交点) と飛翔秒数を決めて
        // pendingCannonShells に積む。
        const r = cannonVolley(machine, boosted, enemiesRef.current);
        const nowGameMs = runElapsedGameMsRef.current;
        for (const shot of r.shots) {
          const shellMs = Math.max(0, Math.round(shot.flightSec * 1000));
          // 砲弾飛翔 (マシン → 予測着弾点)
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
          // radius にダメージ判定半径 (r.splashRadius、 フィールド % 半径) をそのまま流して
          // 「見た目 = 当たり判定」 を保証する
          projectileEventIdRef.current += 1;
          newProjectileEvents.push({
            id: `pe-${projectileEventIdRef.current}`,
            kind: 'blast',
            x: shot.blastX,
            y: shot.blastY,
            radius: r.splashRadius,
            delayMs: shellMs,
          });
          // 着弾遅延砲弾を pendingCannonShells に積む (着弾時に splash 計算)
          pendingCannonShellsRef.current.push({
            blastX: shot.blastX,
            blastY: shot.blastY,
            isCrit: false, // Volley はクリなし
            splashRadius: r.splashRadius,
            damageMul: r.damageMul,
            applyAtMs: nowGameMs + shellMs,
          });
        }
        break;
      }
      case 'thunder': {
        const s = thunderStats(state.weaponLv);
        const boosted = { ...s, damageMul: s.damageMul * attackMul * machine.activePower };
        const r = thunderPlasmaDischarge(machine, boosted, enemiesRef.current);
        // 全体攻撃の視覚: 対象全員に通常攻撃と同じ ThunderStrikeFx を落とす
        // (v1.1 で連鎖 → 全体落雷に変更。 ChainBoltFx は廃止)
        const strikeMs = 320;
        for (const hit of r.hits) {
          const enemy = enemiesRef.current.find((e) => e.id === hit.enemyId);
          if (enemy == null) continue;
          projectileEventIdRef.current += 1;
          newProjectileEvents.push({
            id: `pe-${projectileEventIdRef.current}`,
            kind: 'thunderStrike',
            x: enemy.position.x,
            y: enemy.position.y,
            durationMs: strikeMs,
          });
        }
        applyHits(r.hits);
        // Thunder lifesteal: Plasma 与ダメージの hpLifestealPct を machineHp に回復
        if (s.hpLifestealPct > 0 && r.hits.length > 0) {
          const totalDmg = r.hits.reduce((acc, h) => acc.add(h.damage), BigNum.ZERO);
          if (!totalDmg.isZero()) {
            state.addMachineHp(totalDmg.mulNumber(s.hpLifestealPct));
          }
        }
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

    // v1.3.2: スクリーンセーバー中は描画 events を蓄積しない (suspendRenderingRef=true で skip)
    if (!suspendRenderingRef.current) {
      if (newDamageEvents.length > 0) {
        setDamageEvents((prev) => [...prev, ...newDamageEvents]);
      }
      if (newProjectileEvents.length > 0) {
        setProjectileEvents((prev) => [...prev, ...newProjectileEvents]);
      }
    }
    return true;
  }, []);

  useEffect(() => {
    if (!isRunActive) return;

    const tick = (nowMs: number) => {
      const elapsedMs = nowMs - lastFrameMsRef.current;

      // 発熱対策: 描画 fps キャップ。 前回描画からの経過が targetFps の閾値未満なら
      // 処理スキップで rAF だけ再予約。 ゲーム判定は可変 timestep なので fps を落としても壊れない。
      // targetFps は設定 UI からプレイヤーが 30/45/60 を選択可能。
      if (!shouldDrawFrame(elapsedMs, useStore.getState().targetFps)) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrameMsRef.current = nowMs;

      // H2-3: Fx 完了通知をバッチフラッシュ。 同フレーム内に複数 Fx (DamagePopFx 等)
      // が完了しても setState 呼び出しを 1 回にまとめ、 BattleField の連鎖 re-render を回避。
      // pause/gameover 中もペンディングがあれば flush (= 残った Fx を確実にクリーンアップ)。
      if (pendingDamageRemovalsRef.current.size > 0) {
        const removed = pendingDamageRemovalsRef.current;
        pendingDamageRemovalsRef.current = new Set();
        setDamageEvents((prev) => prev.filter((e) => !removed.has(e.id)));
      }
      if (pendingDeathRemovalsRef.current.size > 0) {
        const removed = pendingDeathRemovalsRef.current;
        pendingDeathRemovalsRef.current = new Set();
        setDeathEvents((prev) => prev.filter((e) => !removed.has(e.id)));
      }
      if (pendingProjectileRemovalsRef.current.size > 0) {
        const removed = pendingProjectileRemovalsRef.current;
        pendingProjectileRemovalsRef.current = new Set();
        setProjectileEvents((prev) => prev.filter((e) => !removed.has(e.id)));
      }
      if (pendingAppearanceRemovalsRef.current.size > 0) {
        const removed = pendingAppearanceRemovalsRef.current;
        pendingAppearanceRemovalsRef.current = new Set();
        setAppearanceEvents((prev) => prev.filter((e) => !removed.has(e.id)));
      }

      const state = useStore.getState();
      // 全滅 (machineHp = 0) のときは ResultDialog 表示中なのでバトルを停止する。
      // 撤退時など外部 UI 状態は paused (ref 経由で最新値) で停止する。
      // どれも一時停止と同じ扱いで deltaSec=0 にする (敵移動 / 武器発射 / spawn / SE すべて止まる)
      const isGameOver = state.machineHp.isZero();
      const deltaSec = calcFrameGameSec(
        elapsedMs,
        // tierClearedRef.current=true の間は TierClearFx 演出中なのでループを完全停止
        // (親が ack するまで毎フレーム deltaSec=0)
        state.isPaused || isGameOver || pausedRef.current || tierClearedRef.current
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
            },
            // v1.3.1: boss wave 中のボス HP 60% フラグ。 null の間はボス出現後の雑魚 0、
            // 値が入ったらそこから通常頻度で雑魚再開。 詳細は wave.ts countBossNormalSpawns。
            state.bossWeakenedAtMs
          );
          if (newSpawns.length > 0) {
            enemiesRef.current = [...enemiesRef.current, ...newSpawns];
            // 上位敵 (elite / miniboss / boss) が混じっていれば AppearanceBannerFx を出す
            const upperSpawns = newSpawns.filter((s) => s.kind !== 'normal');
            if (upperSpawns.length > 0) {
              // ボス登場時に警告 SE を再生 (v1.3.5: スクリーンセーバー中は抑止)
              if (upperSpawns.some((s) => s.kind === 'boss') && !suspendRenderingRef.current) {
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
              // v1.3.2: スクリーンセーバー中は描画 events を蓄積しない
              if (!suspendRenderingRef.current) {
                setAppearanceEvents((prev) => [...prev, ...newAppearances]);
              }
            }
          }

          // ---- 敵移動 (frozen 中はスキップ。 nowGameMs 基準で期限判定) ----
          enemiesRef.current = enemiesRef.current.map((e) =>
            updateEnemyPosition(e, deltaSec, nowGameMs)
          );

          // ---- 状態異常 tick: 燃焼 DoT 適用 + 期限切れフィールドのクリア ----
          enemiesRef.current = enemiesRef.current.map((e) => {
            let next = e;
            // 燃焼: 期限内なら累積 ms を進めて 1 秒経過ごとに burnPerSec を 1 回 HP から減算する。
            // BigNum は整数演算で `mulNumber(deltaSec)` が天井丸めされて 60FPS で +60 倍暴走するため、
            // HP リジェネと同じ calcIntervalTicks 方式で「1 秒粒度の atomic 減算」に統一。
            if (
              next.burnUntilMs != null &&
              next.burnPerSec != null &&
              next.burnUntilMs > nowGameMs
            ) {
              const { ticks, nextAccumulatorMs } = calcIntervalTicks(
                next.burnAccumulatorMs ?? 0,
                deltaSec
              );
              if (ticks > 0) {
                next = {
                  ...next,
                  hp: next.hp.sub(next.burnPerSec.mulInt(ticks)),
                  burnAccumulatorMs: nextAccumulatorMs,
                };
              } else {
                next = { ...next, burnAccumulatorMs: nextAccumulatorMs };
              }
            }
            // 期限切れチェック (frozen / burn)
            const updates: Partial<SpawnedEnemy> = {};
            if (next.frozenUntilMs != null && next.frozenUntilMs <= nowGameMs) {
              updates.frozenUntilMs = undefined;
            }
            if (next.burnUntilMs != null && next.burnUntilMs <= nowGameMs) {
              updates.burnUntilMs = undefined;
              updates.burnPerSec = undefined;
              updates.burnAccumulatorMs = undefined;
            }
            if (Object.keys(updates).length > 0) {
              next = { ...next, ...updates };
            }
            return next;
          });

          // ---- 着弾遅延砲弾の消化 (Cannon 砲弾の着弾タイミング、 v1.1.2) ----
          // applyAtMs <= nowGameMs の pending 砲弾を抽出。 着弾位置で cannonApplySplash で
          // 距離減衰 + 半円カット + 着弾時点の敵分布から実ヒットを計算する。
          const expiredShells: typeof pendingCannonShellsRef.current = [];
          pendingCannonShellsRef.current = pendingCannonShellsRef.current.filter((sh) => {
            if (sh.applyAtMs <= nowGameMs) {
              expiredShells.push(sh);
              return false;
            }
            return true;
          });
          const delayedDamageEvents: DamageEvent[] = [];

          // ---- Cutter 遅延 pop の消化 ----
          // applyAtMs <= nowGameMs の pop を取り出して delayedDamageEvents に積む。
          // 視覚的な刃通過タイミング (= progressInSweep × intervalMs) で pop が出る。
          pendingCutterPopsRef.current = pendingCutterPopsRef.current.filter((pop) => {
            if (pop.applyAtMs <= nowGameMs) {
              delayedDamageEvents.push({
                id: pop.id,
                x: pop.x,
                y: pop.y,
                value: pop.value,
                crit: pop.crit,
              });
              return false;
            }
            return true;
          });

          if (expiredShells.length > 0) {
            const machineImpact = machineStatsRef.current;
            for (const shell of expiredShells) {
              const rawHits = cannonApplySplash(
                machineImpact,
                enemiesRef.current,
                shell.blastX,
                shell.blastY,
                shell.splashRadius,
                shell.damageMul,
                shell.isCrit
              );
              if (rawHits.length === 0) continue;

              const enemiesById = new Map<string, SpawnedEnemy>(
                enemiesRef.current.map((e) => [e.id, e])
              );
              // 着弾時に onAttack パッチを評価 (敵種別・ rng は着弾時点で確定)
              const augmentedHits = rawHits.map((hit) => {
                const target = enemiesById.get(hit.enemyId);
                let damage = hit.damage;
                let freeze = false;
                let freezeSec: number | undefined;
                let burnSec: number | undefined;
                if (target != null) {
                  const effect = evaluatePatches(
                    equippedPatchesArr,
                    { type: 'onAttack', enemyKind: target.kind },
                    Math.random
                  );
                  if (effect.damageMultiplier != null && effect.damageMultiplier !== 1) {
                    damage = damage.mulNumber(effect.damageMultiplier);
                  }
                  if (effect.extraShot) {
                    damage = damage.add(hit.damage);
                  }
                  if (effect.instantKill) {
                    damage = target.hp;
                  }
                  freeze = effect.freeze === true;
                  freezeSec = effect.freezeSec;
                  burnSec = effect.burnSec;
                }
                return { ...hit, damage, freeze, freezeSec, burnSec };
              });

              const augmentedById = new Map(augmentedHits.map((h) => [h.enemyId, h]));
              enemiesRef.current = enemiesRef.current.map((e) => {
                const hit = augmentedById.get(e.id);
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
                  const wasBurning = updated.burnUntilMs != null;
                  updated = {
                    ...updated,
                    burnUntilMs: Math.max(updated.burnUntilMs ?? 0, newBurnUntil),
                    burnPerSec: prev != null && prev.gt(newBurnPerSec) ? prev : newBurnPerSec,
                    burnAccumulatorMs: wasBurning ? updated.burnAccumulatorMs : 0,
                  };
                }
                return updated;
              });

              for (const hit of augmentedHits) {
                const enemy = enemiesById.get(hit.enemyId);
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
          // machine stats は useMemo + ref でキャッシュ済み (Issue #84)
          const machineTick = machineStatsRef.current;
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

          // ---- 射程内敵リストを 1 フレーム = 1 回キャッシュ (Issue #85) ----
          // 同フレーム内で敵 position は変動しないため、 発射ごとに map+filter+sort+map を
          // 回す必要はない。 撃破は死亡掃除 (後段) が走るまで enemiesRef に残るが、
          // fireWeapon は HP でフィルタしない (位置だけで当たり判定) ため、 同フレーム内の
          // 次 shot で「すでに hp<=0 の敵」 をターゲットに含めるのは従来挙動と同じ。
          //
          // accumulator が閾値未満で 1 発も発射されないフレームでは丸ごとスキップする
          // (低 fire rate 武器で「毎フレーム sortedInRange 計算」 になる退化を防ぐ)。
          if (fireAccumulatorMsRef.current >= intervalMs) {
            // 当たり判定半径: 武器別マップ WEAPON_RANGE_PCT (= 直径) × マシン索敵距離倍率 / 2
            // - 武器固定射程 (v1.1.1: cutter 10.89 / laser/thunder 27.22 / cannon 35) は **直径** %
            // - マシン本体「索敵距離」強化で漸近的に拡大
            //   (range_asymptotic: 150→450px、 倍率は range/150 で Lv 0 のとき 1.0)
            // - distanceFromMachine は中心 (50, 50) からの距離なので半径と比較する
            const machineRangeMul = machineTick.range / 150;
            const effectiveRangeRadius =
              (WEAPON_RANGE_PCT[state.currentWeapon] * machineRangeMul) / 2;
            // v1.3.1: 敵の hitRadius (= 描画半径 ×0.95) を射程判定に加味し、
            // 大きい敵 (boss など) の縁が射程に入っているなら対象に含める。
            const sortedInRange = enemiesRef.current
              .map((enemy) => ({ enemy, dist: distanceFromMachine(enemy.position) }))
              .filter(({ enemy, dist }) => dist <= effectiveRangeRadius + enemy.hitRadius)
              .sort((a, b) => a.dist - b.dist)
              .map(({ enemy }) => enemy);

            if (sortedInRange.length === 0) {
              // 射程内に敵がいなければ、 累積はそのまま温存 (敵が来たら即発射)
              fireAccumulatorMsRef.current = Math.min(fireAccumulatorMsRef.current, intervalMs);
            } else {
              while (
                fireAccumulatorMsRef.current >= intervalMs &&
                firedThisFrame < FIRE_PER_FRAME_CAP
              ) {
                fireAccumulatorMsRef.current -= intervalMs;
                firedThisFrame += 1;

                // 武器発射 SE (v1.3.5: スクリーンセーバー中は抑止)
                if (!suspendRenderingRef.current) {
                  soundEngine.play(WEAPON_SHOOT_SOUND[state.currentWeapon]);
                }

                const result = fireWeapon({
                  weapon: state.currentWeapon,
                  weaponLv: state.weaponLv,
                  machine: machineTick,
                  enemiesInRange: sortedInRange,
                  rng: Math.random,
                  cutterAngleDeg: cutterAngleDegRef.current,
                  attackMul,
                  // Cutter Overdrive 中は damageMul を 3 倍にする
                  cutterOverdriveDamageMul: overdriveStateRef.current.active
                    ? overdriveStateRef.current.damageMul
                    : 1,
                });
                // Cutter は刃の角度を 1 ヒットあたり前進。 次フレームの fire / 描画に反映
                if (result.cutterAngle != null) {
                  cutterAngleDegRef.current = result.cutterAngle;
                }

                // ---- Cannon 通常攻撃: 着弾遅延砲弾を pendingCannonShells に積み、
                //      砲弾飛翔 / 着弾爆発の Fx を発火する (v1.1.2)。 result.hits は常に空。
                if (
                  result.cannonShell != null &&
                  result.impactX != null &&
                  result.impactY != null
                ) {
                  const shellMs = Math.max(0, Math.round(result.cannonShell.flightSec * 1000));
                  pendingCannonShellsRef.current.push({
                    blastX: result.impactX,
                    blastY: result.impactY,
                    isCrit: result.cannonShell.isCrit,
                    splashRadius: result.cannonShell.splashRadius,
                    damageMul: result.cannonShell.damageMul,
                    applyAtMs: nowGameMs + shellMs,
                  });
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'cannonShell',
                    x1: MACHINE_CENTER_X,
                    y1: MACHINE_CENTER_Y,
                    x2: result.impactX,
                    y2: result.impactY,
                    durationMs: shellMs,
                  });
                  // radius にダメージ判定半径 (splashRadius、 フィールド % 半径) をそのまま流して
                  // 「見た目 = 当たり判定」 を保証する
                  projectileEventIdRef.current += 1;
                  newProjectileEvents.push({
                    id: `pj-${projectileEventIdRef.current}`,
                    kind: 'blast',
                    x: result.impactX,
                    y: result.impactY,
                    radius: result.cannonShell.splashRadius,
                    delayMs: shellMs,
                  });
                }

                // 敵 HP 減算 (immutable に置換) + onAttack パッチ適用
                if (result.hits.length > 0) {
                  // H2-2: hit ごとの enemiesRef.current.find() (O(N)) を避けるため、
                  // 「敵 ID → 敵」 Map を 1 度だけ構築 (O(N))。 同 hit 処理ブロック内の
                  // 3 箇所 (onAttack 評価 / DamageEvent 位置取得 / hitPositions) で使い回す。
                  // HP 減算後の Map 再構築は不要 (position は不変、 HP は read しない)。
                  const enemiesById = new Map<string, SpawnedEnemy>(
                    enemiesRef.current.map((e) => [e.id, e])
                  );
                  // 各 hit について onAttack パッチを評価し、 damage / 状態異常を補正
                  const augmentedHits = result.hits.map((hit) => {
                    const targetEnemy = enemiesById.get(hit.enemyId);
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
                    // Laser 上位敵バフ (v1.2.0): 装備武器が Laser かつ ターゲットが
                    // elite/miniboss/boss なら、 最終ダメに LASER_UPPER_ENEMY_BONUS (= ×2.0)。
                    // パッチや crit とは独立の武器特性レイヤー。
                    if (state.currentWeapon === 'laser' && targetEnemy.kind !== 'normal') {
                      finalDamage = finalDamage.mulNumber(LASER_UPPER_ENEMY_BONUS);
                    }
                    return {
                      ...hit,
                      damage: finalDamage,
                      freeze: effect.freeze === true,
                      freezeSec: effect.freezeSec,
                      burnSec: effect.burnSec,
                    };
                  });

                  // v1.1.2: cannon は result.hits が空で別途 pendingCannonShells に積むため、
                  // ここでは非 cannon 武器のみ即時 HP 減算 + DamageEvent 発火する。
                  {
                    const hitMap = new Map(augmentedHits.map((h) => [h.enemyId, h]));
                    enemiesRef.current = enemiesRef.current.map((e) => {
                      const hit = hitMap.get(e.id);
                      if (hit == null) return e;
                      let updated: SpawnedEnemy = { ...e, hp: e.hp.sub(hit.damage) };
                      // Thunder スタック反映 (v1.2.0): hit.thunderStackAfter があれば
                      // 敵オブジェクトに書き戻す。 thunderNormalAttack 内で計算済み (上限 5)。
                      if (hit.thunderStackAfter != null) {
                        updated = { ...updated, thunderStacks: hit.thunderStackAfter };
                      }
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
                        const wasBurning = updated.burnUntilMs != null;
                        updated = {
                          ...updated,
                          burnUntilMs: Math.max(updated.burnUntilMs ?? 0, newBurnUntil),
                          // 新規燃焼開始時のみ accumulator を 0 リセット
                          burnAccumulatorMs: wasBurning ? updated.burnAccumulatorMs : 0,
                          burnPerSec:
                            prevBurnPerSec != null && prevBurnPerSec.gt(newBurnPerSec)
                              ? prevBurnPerSec
                              : newBurnPerSec,
                        };
                      }
                      return updated;
                    });

                    // DamageEvent 発火 — augmented damage を表示に使う。
                    // Cutter は刃が物理的に各敵の角度に達した瞬間に pop すべきなので、
                    // progressInSweep × intervalMs ぶん遅延キュー (pendingCutterPopsRef) に積む。
                    // 他武器は即時発火 (newDamageEvents)。
                    for (const hit of augmentedHits) {
                      // H2-2: O(N) find() → O(1) Map.get()
                      const enemy = enemiesById.get(hit.enemyId);
                      damageEventIdRef.current += 1;
                      const popId = `de-${damageEventIdRef.current}`;
                      const popX = enemy?.position.x ?? 50;
                      const popY = enemy?.position.y ?? 50;
                      if (state.currentWeapon === 'cutter' && hit.progressInSweep != null) {
                        const delayMs = hit.progressInSweep * intervalMs;
                        pendingCutterPopsRef.current.push({
                          id: popId,
                          x: popX,
                          y: popY,
                          value: hit.damage,
                          crit: hit.crit ?? false,
                          applyAtMs: nowGameMs + delayMs,
                        });
                      } else {
                        newDamageEvents.push({
                          id: popId,
                          x: popX,
                          y: popY,
                          value: hit.damage,
                          crit: hit.crit,
                        });
                      }
                    }

                    // Thunder lifesteal: 与ダメージの hpLifestealPct を machineHp に回復
                    // (0.1% × weaponLv、Lv 0 で 0)
                    if (state.currentWeapon === 'thunder') {
                      const lifestealPct = thunderStats(state.weaponLv).hpLifestealPct;
                      if (lifestealPct > 0) {
                        const totalDmg = augmentedHits.reduce(
                          (acc, h) => acc.add(h.damage),
                          BigNum.ZERO
                        );
                        if (!totalDmg.isZero()) {
                          state.addMachineHp(totalDmg.mulNumber(lifestealPct));
                        }
                      }
                    }
                  }

                  // ---- ProjectileEvent 発火 (武器種ごとに弾道演出) ----
                  // laser:  マシン中心 → 各 hit 敵に LaserBeam (一直線、 貫通)
                  // cannon: マシン → 着弾点に砲弾 (CannonShellFx) → duration 後に Blast (BlastFx)
                  // thunder: 着弾点の真上から落雷 (ThunderStrikeFx) → duration 後に連鎖 (ChainBoltFx)
                  // cutter:  常時表示の CutterOrbitFx に任せるため発火ごとの projectile は生成しない
                  // H2-2: O(N) find() × hits 数 → O(1) Map.get() × hits 数
                  const hitPositions = augmentedHits
                    .map((h) => enemiesById.get(h.enemyId))
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
                  } else if (state.currentWeapon === 'thunder' && hitPositions.length > 0) {
                    // 各 hit (= 最大 THUNDER_BASE_CHAIN_COUNT 体) に独立して雷が降る
                    // (連鎖は仕様変更で廃止)。 hitPositions.length は実際にヒットした数。
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
            } // close else
          } // close if (fireAccumulatorMsRef.current >= intervalMs)

          // newDamageEvents (今フレーム発射の即時 hit) と delayedDamageEvents
          // (砲弾着弾の hit) をまとめて反映
          // v1.3.2: スクリーンセーバー中は描画 events を蓄積しない
          if (!suspendRenderingRef.current) {
            const allDamageEvents = [...newDamageEvents, ...delayedDamageEvents];
            if (allDamageEvents.length > 0) {
              setDamageEvents((prev) => [...prev, ...allDamageEvents]);
            }
            if (newProjectileEvents.length > 0) {
              setProjectileEvents((prev) => [...prev, ...newProjectileEvents]);
            }
          }

          // ---- 撃破処理 (HP <= 0) + onKill / onDropRoll パッチ評価 + 報酬獲得 + 各 Event ----
          // machineLevels 由来の倍率は 1 フレーム中変化しないので、 撃破ループ前に 1 度だけ
          // calcEffectValue を呼んで O(4N) → O(4) にキャッシュする (敵 N 体撃破時の発熱対策)。
          const screwGainMul = calcRunWorkshopMultiplier(state.runWorkshopLevels.screwGainMul);
          const machineScrewGainMul = calcEffectValue(
            MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'screwGain')!,
            state.machineLevels.screwGain
          );
          const boltGainMul = calcEffectValue(
            MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'boltGain')!,
            state.machineLevels.boltGain
          );
          const alloyGainMul = calcEffectValue(
            MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'alloyGain')!,
            state.machineLevels.alloyGain
          );
          const patchDropRateMulMachine = calcEffectValue(
            MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchDropRate')!,
            state.machineLevels.patchDropRate
          );
          const newDeathEvents: DeathEvent[] = [];
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
              const baseScrew = enemy.reward.screw;
              if (baseScrew > 0) {
                earnedScrew = earnedScrew.add(
                  BigNum.fromNumber(baseScrew * screwGainMul * machineScrewGainMul * dropMul)
                );
              }

              // --- ボルト (bolt): 通常敵は 50% 確率、 上位敵は 100% + boltGainMul ---
              const baseBolt = enemy.reward.bolt;
              if (baseBolt > 0) {
                const boltDropRoll =
                  enemy.kind === 'normal' ? Math.random() < NORMAL_BOLT_DROP_CHANCE : true;
                if (boltDropRoll) {
                  const scaledBolt = scaledReward(baseBolt, state.currentTier);
                  earnedBolt = earnedBolt.add(BigNum.fromNumber(scaledBolt * boltGainMul));
                }
              }

              // --- 超合金 (alloy): reward.alloyChance で reward.alloyAmount を獲得 + alloyGainMul ---
              if (enemy.reward.alloyChance > 0 && enemy.reward.alloyAmount > 0) {
                if (Math.random() < enemy.reward.alloyChance) {
                  const scaledAlloyAmount = scaledReward(
                    enemy.reward.alloyAmount,
                    state.currentTier
                  );
                  earnedAlloy = earnedAlloy.add(
                    BigNum.fromNumber(scaledAlloyAmount * alloyGainMul)
                  );
                }
              }

              // --- パッチドロップ (06-patches.md): ボス撃破時のみ。 ラン中 1 個まで。 ---
              // bonusDrop は「ネジのみ ×2」 なのでパッチドロップ率には影響しない。
              if (!state.runPatchDropped) {
                const dropped = dropPatch(
                  enemy.kind,
                  state.currentTier,
                  patchDropRateMulMachine,
                  Math.random
                );
                if (dropped != null) {
                  state.addPatch(dropped.name, dropped.tier, 1);
                  setDroppedPatches((prev) => [...prev, dropped]);
                  state.markRunPatchDropped();
                }
              }

              // 撃破 SE: boss/miniboss は bossKill、 それ以外は enemyKill
              // v1.3.5: スクリーンセーバー中は SE を抑止 (発熱対策)
              if (!suspendRenderingRef.current) {
                if (enemy.kind === 'boss' || enemy.kind === 'miniboss') {
                  soundEngine.play('bossKill');
                } else {
                  soundEngine.play('enemyKill');
                }
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
            // v1.3.2: スクリーンセーバー中は描画 events を蓄積しない (ロジック側 enemiesRef 更新は実施)
            if (!suspendRenderingRef.current) {
              setDeathEvents((prev) => [...prev, ...newDeathEvents]);
            }
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
          // machine stats は useMemo + ref でキャッシュ済み (Issue #84)
          const machineStats = machineStatsRef.current;
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
            // v1.3.1: 新規接触時、 敵 kind に応じたノックバック距離で押し戻す
            // (normal 5% / elite 6% / miniboss 7.5% / boss 10%)
            const kbDistance = KNOCKBACK_DISTANCE_PCT_BY_KIND[enemy.kind];
            return {
              ...enemy,
              position: applyKnockback(
                enemy.position,
                { x: MACHINE_CENTER_X, y: MACHINE_CENTER_Y },
                kbDistance
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
              // v1.3.5: スクリーンセーバー中は SE を抑止 (発熱対策)
              const hpAfter = useStore.getState().machineHp;
              if (!suspendRenderingRef.current) {
                if (hpAfter.isZero() && !hpBefore.isZero()) {
                  soundEngine.play('machineDown');
                } else {
                  soundEngine.play('machineHit');
                }
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
          // 最終 wave の判定は「ボス kind の敵が居るか」 のみ。 通常敵が残っていても
          // 仕様上 Victory なので無視する (BUG-W30-1)。
          const bossEnemy = enemiesRef.current.find((e) => e.kind === 'boss');
          const bossAlive = bossEnemy != null;
          // v1.3.1: ボス HP 60% 検知。 初回検知時のみ markBossWeakened 経由で
          // bossWeakenedAtMs に現在 wave 経過 ms を記録 (= 雑魚スポーン再開トリガー)。
          if (bossEnemy != null && state.bossWeakenedAtMs == null) {
            const hpCurrent = parseFloat(bossEnemy.hp.toString());
            const hpMax = parseFloat(bossEnemy.maxHp.toString());
            if (hpMax > 0 && hpCurrent / hpMax < BOSS_WEAKENED_HP_THRESHOLD) {
              state.markBossWeakened(waveElapsedMsRef.current);
            }
          }
          const decision = decideWaveAdvance(
            waveElapsedMsRef.current,
            schedule.durationSec,
            state.currentWave,
            tierWaves.length,
            bossAlive
          );
          if (decision === 'advanceWave' || decision === 'advanceTier') {
            // onWaveClear パッチ評価 (shieldRegen: HP heal、 boltCast: bolt gain)
            const clearEffect = evaluatePatches(
              equippedPatchesArr,
              { type: 'onWaveClear' },
              Math.random
            );
            // gameover (machineHp=0) のフレームで wave クリア判定が同時に成立すると、
            // heal で復活してゲームオーバーがキャンセルされてしまう。 isZero ガードで防ぐ。
            if (
              clearEffect.heal != null &&
              !clearEffect.heal.isZero() &&
              !useStore.getState().machineHp.isZero()
            ) {
              state.addMachineHp(clearEffect.heal);
            }
            if (clearEffect.boltGain != null && !clearEffect.boltGain.isZero()) {
              state.addBolt(clearEffect.boltGain);
            }
            if (decision === 'advanceWave') {
              state.advanceWave();
              // v1.3.5: スクリーンセーバー中は SE を抑止 (発熱対策)
              if (!suspendRenderingRef.current) {
                soundEngine.play('waveClear');
              }
              // wave 切替直後の同フレームで waveElapsedMsRef も 0 に揃える。
              // (currentWave 変化に反応する useEffect でも 0 にされるが、 そちらより前に
              //  setWaveElapsedSec(古い値) が走ってしまうと WaveProgressBar の AnimatedTimerBar
              //  が「残量 0 近く」で再マウントされ、 バーが満タンに戻らない。)
              waveElapsedMsRef.current = 0;
              prevWaveElapsedMsRef.current = 0;
            } else {
              // Tier クリア: state.advanceTier() は呼ばない (= currentTier を勝手に進めない)。
              // 親 (pages/battle) が tierCleared フラグを検知して TierClearFx → ResultDialog の
              // 順で表示し、 onTierClearedAck() を呼んでフラグをリセット。 次の出撃で
              // preparation 画面が表示される。
              // (旧 0.3.4 までは state.advanceTier() を呼んで currentTier を +1 していたため、
              //  ボス撃破後に勝手に次 Tier が開始してしまっていた)
              // v1.3.5: スクリーンセーバー中は SE を抑止 (発熱対策)
              if (!suspendRenderingRef.current) {
                soundEngine.play('tierClear');
              }
              setTierCleared(true);
              tierClearedRef.current = true; // 次フレームの tick で deltaSec=0 にする
              // wave 進行は止めるが waveElapsedMsRef はあえて触らない (= ボス出現演出後の
              // 静止状態を維持。 tierClearedRef で次フレーム以降の進行が止まる)
            }
          }
        }

        // pause / gameover 中は表示更新もスキップ (60fps 再描画で発熱するため、 deltaSec > 0 ブロック内に置く)
        // v1.3.5: スクリーンセーバー中も親 BattleScreen の毎フレーム re-render を止める
        // (BattleField は unmount 済みでも HUD / BattleScreen が enemies prop で再 render されるため)。
        // 復帰時 (suspendRendering=false 切替) に useEffect で 1 回 sync する。
        if (!suspendRenderingRef.current) {
          setEnemies(enemiesRef.current);
          setWaveElapsedSec(waveElapsedMsRef.current / 1000);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    // 発熱対策 (Step 1): タブ非可視中は rAF を完全停止し、 復帰時に lastFrameMs を
    // 再初期化してから rAF を再開する。 AudioContext は SoundEngine 側で suspend 済み。
    const startLoop = () => {
      if (rafIdRef.current != null) return;
      lastFrameMsRef.current = performance.now();
      rafIdRef.current = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    if (!document.hidden) startLoop();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      stopLoop();
    };
  }, [isRunActive, tierWaves, fireActive]);

  return {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    appearanceEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    onAppearanceDone,
    fireActive,
    isOverdriveActive,
    killCount,
    runElapsedSec,
    droppedPatches,
    tierCleared,
    onTierClearedAck,
  };
}
