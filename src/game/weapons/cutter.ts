import { calcOutgoingDamage, rollCrit } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// CutterStats
// ---------------------------------------------------------------------------

export interface CutterStats {
  /** 攻撃速度 (attacks/sec)。旋回ヒット間隔として扱う */
  attackPerSec: number;
  /** 旋回半径（px）。敵の position との距離比較に使う。Lv 不問で固定 */
  orbitRadius: number;
  /**
   * 刃の枚数。 Lv 不問で固定 2。
   * 視覚的な刃の本数 = 1 rotation あたりの 1 体あたりヒット数 (v1.1.2)。
   * blades=2 なら 1 rotation で各敵に 2 回ヒット (Blade A → Blade B が順に通過)。
   */
  blades: number;
  /** 通常攻撃ダメージ倍率 (×1.02^Lv) */
  damageMul: number;
  /** Overdrive 持続秒数 (8 + 0.1×Lv) */
  overdriveDurationSec: number;
  /** Overdrive 中の AS 倍率 */
  overdriveAttackSpeedMul: number;
  /** Overdrive 中のダメ倍率 (AS×ダメ×blades の DPS 倍率を生成) */
  overdriveDamageMul: number;
}

// ---------------------------------------------------------------------------
// cutterStats
// ---------------------------------------------------------------------------

/**
 * 武器強化 Lv から Cutter の各ステータスを計算する。
 *
 * v1.1.1 で武器Lv は damageMul / attackPerSec を一切伸ばさない仕様に変更。
 * Cutter の Lv 軸は「Overdrive 持続秒」1 軸のみ。
 *
 *   - 攻撃速度: 1.0 attacks/sec 固定
 *   - 旋回半径: 80 px 固定
 *   - 刃の枚数: 2 固定
 *   - ダメ倍率: 1.2 固定
 *   - Overdrive (Lv 軸): 持続 8 + 0.1×Lv 秒、AS×3 + ダメ×3 (DPS 倍率 9)
 */
/** Cutter 底値 attacks/sec (v1.3.0 で 1.0 → 0.5 に半減、 旋回テンポを落として 1 ヒットダメ倍化) */
export const CUTTER_BASE_AS = 0.5;
/** Cutter 旋回半径 (px)。 Lv 不問で固定 */
export const CUTTER_BASE_ORBIT_RADIUS = 80;
/** Cutter 刃の枚数。 Lv 不問で固定 2 */
export const CUTTER_BLADES = 2;
/**
 * Cutter 底値 武器ダメージ倍率 (v1.3.0 で 1.2 → 2.4 に倍化)。
 * 単体 DPS は AS × damageMul = 0.5 × 2.4 = 1.2 を維持、
 * 2 体同時時は 2.4 (blades=2 で 360° カバー)
 */
export const CUTTER_BASE_DAMAGE_MUL = 2.4;

export function cutterStats(weaponLv: number): CutterStats {
  // v1.1.1: attackPerSec / damageMul は武器Lv 不問の固定底値
  const attackPerSec = CUTTER_BASE_AS;
  const orbitRadius = CUTTER_BASE_ORBIT_RADIUS;
  const blades = CUTTER_BLADES;
  const damageMul = CUTTER_BASE_DAMAGE_MUL;
  // Cutter の Lv 軸: Overdrive 持続秒 (8 + 0.1 × Lv)
  const overdriveDurationSec = CUTTER_OVERDRIVE_BASE_DURATION_SEC + 0.1 * weaponLv;
  const overdriveDamageMul = CUTTER_OVERDRIVE_DAMAGE_MUL;

  return {
    attackPerSec,
    orbitRadius,
    blades,
    damageMul,
    overdriveDurationSec,
    overdriveAttackSpeedMul: CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
    overdriveDamageMul,
  };
}

/** Cutter アクティブ (Overdrive) の底値持続秒 (Lv で +0.1/Lv 延長) */
export const CUTTER_OVERDRIVE_BASE_DURATION_SEC = 8;
/** Cutter アクティブ (Overdrive) 中の攻撃速度倍率 */
export const CUTTER_OVERDRIVE_ATTACK_SPEED_MUL = 3;
/** Cutter アクティブ (Overdrive) 中のダメージ倍率 (AS×3 と合わせて DPS×9) */
export const CUTTER_OVERDRIVE_DAMAGE_MUL = 3;

/**
 * 純粋関数: 攻撃速度 (attacks/sec) と刃の枚数から CutterOrbitFx の 1 周時間 (ms) を算出。
 *
 * Cutter は「刃 N 枚 = 1 周あたり N ヒット」なので、 attackPerSec ヒット/秒 を
 * 視覚的な「刃の回転」で表現するには rotateMs = (blades / attackPerSec) × 1000。
 * 例: attackPerSec=1, blades=2 → 2000ms (= 2 秒で 1 周、 1 周で 2 ヒット)
 */
export function calcCutterRotateMs(attackPerSec: number, blades: number): number {
  if (attackPerSec <= 0) return Number.POSITIVE_INFINITY;
  return (blades / attackPerSec) * 1000;
}

// ---------------------------------------------------------------------------
// cutterNormalAttack
// ---------------------------------------------------------------------------

export interface CutterAttackResult {
  hits: Array<{
    enemyId: string;
    damage: BigNum;
    crit: boolean;
    /**
     * sweep 内で刃が敵の角度に達するまでの進行率 (0〜1)。
     * useBattleLoop が DamagePopFx の発火を `progressInSweep × intervalMs` だけ遅延させ、
     * 視覚上の刃通過タイミングと pop 表示タイミングを一致させる。
     * 0 = sweep 開始時にいる敵 (即 pop), 1 = sweep 終端にいる敵 (intervalMs 後 pop)。
     */
    progressInSweep: number;
  }>;
  /** 旋回した角度（度）。描画用 */
  angle: number;
}

/**
 * 2 つの角度 (度) の最短差を返す。 例: shortestAngleDiff(350, 10) = 20 (340 ではない)。
 * 戻り値は常に 0〜180 の非負値。
 */
export function shortestAngleDiff(a: number, b: number): number {
  let d = (((a - b) % 360) + 360) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/**
 * 角度 angle が「角度範囲 [startDeg, startDeg + spanDeg]」 (CCW 方向) に入っているか。
 * 360° をまたぐ場合 (start=350, span=20 で end=10) も正しく扱う。
 */
export function isAngleInRange(angleDeg: number, startDeg: number, spanDeg: number): boolean {
  const norm = (v: number) => ((v % 360) + 360) % 360;
  const a = norm(angleDeg);
  const s = norm(startDeg);
  const offset = norm(a - s);
  return offset <= spanDeg;
}

/**
 * Cutter 通常攻撃。
 *
 * 1 fire = 「視覚 1 周の 1 / blades 分」 を担当する判定。 各刃 (blades 個、 360/blades 度間隔) が
 * 前フレームの fire 時点 currentAngleDeg から sweepDeg(=360/blades) 度 進む間に通過する弧 を
 * 担当範囲とし、 その範囲内 (= orbitRadius 以内 + 角度) に居る **全敵** にヒット判定。
 * 全 blades 個の担当範囲を合わせると 360° = 全周をカバーする (= 「視覚的に刃が通過した = 当たる」)。
 *
 * v1.1.2: 刃が物理的に通過した敵全員にダメージを与える仕様に変更。
 * 「最大 effectiveBlades 体」 という旧上限は撤廃。
 *   1 fire (= sweepDeg 進行) の間に N 体が刃の弧上にいれば N 体全員にヒット。
 *   1 rotation (= blades fires) すると、 各敵は blades 回ヒットを受ける
 *   (blades=2 の場合、 異なるフレームで Blade A と Blade B が順に通過するため)。
 *
 * blades は通常 stats.blades (= CUTTER_BLADES = 2) を使う。 引数で明示した場合はそれを優先する
 * (テスト用)。
 *
 * @param machine           マシンステ
 * @param stats             Cutter ステ
 * @param enemiesInRange    旋回半径 (orbitRadius) 以内の敵 (caller がフィルタ済み)
 * @param currentAngleDeg   前 fire 時の基準刃の角度 (度)。 useBattleLoop の cutterAngleDegRef
 * @param rng               クリ判定用
 * @param blades            刃の枚数 (省略時 stats.blades)
 * @param machineX          マシン中心 X % (default 50)
 * @param machineY          マシン中心 Y % (default 50)
 */
export function cutterNormalAttack(
  machine: MachineStats,
  stats: CutterStats,
  enemiesInRange: SpawnedEnemy[],
  currentAngleDeg: number,
  rng: () => number,
  blades?: number,
  machineX = 50,
  machineY = 50
): CutterAttackResult {
  const effectiveBlades = blades ?? stats.blades;
  // 各刃が担当する弧 = sweepDeg。 effectiveBlades 個の弧を合計すると 360° (全周カバー)
  const sweepDeg = 360 / effectiveBlades;
  // 担当弧の開始角度: 基準刃 (currentAngleDeg) からの各刃のオフセット位置
  const bladeStarts: number[] = [];
  for (let i = 0; i < effectiveBlades; i++) {
    bladeStarts.push(currentAngleDeg + i * sweepDeg);
  }

  // 敵がいずれかの刃の sweep 範囲に入っていればヒット (v1.1.2 で上限撤廃 — 刃が触れた敵全員)。
  // 各敵について「最も早く通過する刃」 の progressInSweep (0〜1) を求める。
  // 視覚と pop タイミングを一致させるため useBattleLoop で applyAtMs に反映する。
  const norm = (v: number) => ((v % 360) + 360) % 360;
  const targets: Array<{ enemy: SpawnedEnemy; progressInSweep: number }> = [];
  for (const enemy of enemiesInRange) {
    const dx = enemy.position.x - machineX;
    const dy = enemy.position.y - machineY;
    const enemyAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    let best: number | null = null;
    for (const start of bladeStarts) {
      if (!isAngleInRange(enemyAngle, start, sweepDeg)) continue;
      const progress = norm(enemyAngle - start) / sweepDeg;
      if (best == null || progress < best) best = progress;
    }
    if (best == null) continue;
    targets.push({ enemy, progressInSweep: Math.max(0, Math.min(1, best)) });
  }

  const hits = targets.map(({ enemy, progressInSweep }) => {
    const isCrit = rollCrit(machine.critRate, rng);
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: stats.damageMul }, isCrit },
      BigNum.ZERO,
      0
    );
    return {
      enemyId: enemy.id,
      damage: result.finalDmg,
      crit: isCrit,
      progressInSweep,
    };
  });

  // 旋回角度の更新: 視覚的にも 1 fire で sweepDeg ぶん進む (= rotateMs と完全同期)
  const angle = (((currentAngleDeg + sweepDeg) % 360) + 360) % 360;

  return { hits, angle };
}

// ---------------------------------------------------------------------------
// Overdrive
// ---------------------------------------------------------------------------

export interface OverdriveState {
  active: boolean;
  remainingSec: number;
  attackSpeedMul: number;
  damageMul: number;
}

/**
 * Overdrive を開始し、初期状態を返す。
 */
export function cutterStartOverdrive(stats: CutterStats): OverdriveState {
  return {
    active: true,
    remainingSec: stats.overdriveDurationSec,
    attackSpeedMul: stats.overdriveAttackSpeedMul,
    damageMul: stats.overdriveDamageMul,
  };
}

/**
 * Overdrive 状態を deltaSec 秒進める。
 * remainingSec が 0 以下になったら active=false を返す。
 * イミュータブル: 新しい OverdriveState を返す。
 */
export function cutterTickOverdrive(state: OverdriveState, deltaSec: number): OverdriveState {
  if (!state.active) return state;

  const remainingSec = state.remainingSec - deltaSec;

  if (remainingSec <= 0) {
    return {
      active: false,
      remainingSec: 0,
      attackSpeedMul: 1,
      damageMul: 1,
    };
  }

  return { ...state, remainingSec };
}
