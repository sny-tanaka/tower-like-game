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
  /** 刃の枚数（旋回上で同時に判定される刃の数）。Lv 不問で固定 2 */
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
/** Cutter 底値 attacks/sec。 1 fire = 「視覚 1 周のうち 1 / blades 分」 を判定する周期 */
export const CUTTER_BASE_AS = 1.0;
/** Cutter 旋回半径 (px)。 Lv 不問で固定 */
export const CUTTER_BASE_ORBIT_RADIUS = 80;
/** Cutter 刃の枚数。 Lv 不問で固定 2 */
export const CUTTER_BLADES = 2;
/**
 * Cutter 底値 武器ダメージ倍率。 単体 DPS は AS × damageMul = 1.0 × 1.2 = 1.2、
 * 2 体同時時は 2.4 (blades=2 で 360° カバー)
 */
export const CUTTER_BASE_DAMAGE_MUL = 1.2;

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
  hits: Array<{ enemyId: string; damage: BigNum; crit: boolean }>;
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
 * 担当範囲とし、 その範囲内 (= orbitRadius 以内 + 角度) に居る敵にヒット判定。
 * 全 blades 個の担当範囲を合わせると 360° = 全周をカバーする (= 「視覚的に刃が通過した = 当たる」)。
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

  // 敵がいずれかの刃の sweep 範囲に入っていればヒット候補
  const onSweep = enemiesInRange.filter((enemy) => {
    const dx = enemy.position.x - machineX;
    const dy = enemy.position.y - machineY;
    const enemyAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return bladeStarts.some((start) => isAngleInRange(enemyAngle, start, sweepDeg));
  });

  // blades 枚数 = 1 fire で同時にヒットできる敵の最大数
  const targets = onSweep.slice(0, effectiveBlades);

  const hits = targets.map((enemy) => {
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
