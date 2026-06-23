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
  /** 旋回半径（px）。敵の position との距離比較に使う */
  orbitRadius: number;
  /** 同時ヒット数（旋回上の敵に同時にダメージを与える最大数） */
  simultaneousHits: number;
  /** 通常攻撃ダメージ倍率 (×1.02^Lv) */
  damageMul: number;
  /** Overdrive CD（秒） */
  overdriveCdSec: number;
  /** Overdrive 持続秒数 */
  overdriveDurationSec: number;
  /** Overdrive 中の AS 倍率 */
  overdriveAttackSpeedMul: number;
  /** Overdrive 中のダメ倍率（仕様: AS バフのみなので 1.0） */
  overdriveDamageMul: number;
}

// ---------------------------------------------------------------------------
// cutterStats
// ---------------------------------------------------------------------------

/**
 * 武器強化 Lv から Cutter の各ステータスを計算する。
 *
 * 仕様 (05-weapons.md):
 *   - 攻撃速度底値: 2.0 attacks/sec、+0.03×2.0/Lv
 *   - 旋回半径: 80px + 0.5px/Lv
 *   - 同時ヒット数: floor(1 + 0.05×Lv)
 *   - ダメ倍率: 1.02^Lv
 *   - Overdrive: 持続 8s、AS×3、ダメ倍率×1（なし）、CD 35s
 */
/** Cutter 底値 attacks/sec。 1 fire = 「視覚 1 周のうち 1 / blades 分」 を判定する周期 */
export const CUTTER_BASE_AS = 2.5;
/** Cutter 底値 旋回半径 (px) */
export const CUTTER_BASE_ORBIT_RADIUS = 80;
/** Cutter 底値 同時ヒット数 */
export const CUTTER_BASE_SIMULTANEOUS_HITS = 1;
/**
 * Cutter 底値 武器ダメージ倍率。 DPS は AS × damageMul で 2.5 × 1.2 = 3.0 を維持。
 * (回転速度を半分にして 1 撃の威力を倍にする方針)
 */
export const CUTTER_BASE_DAMAGE_MUL = 1.2;

export function cutterStats(weaponLv: number): CutterStats {
  const attackPerSec = CUTTER_BASE_AS * (1 + 0.03 * weaponLv);
  const orbitRadius = CUTTER_BASE_ORBIT_RADIUS + 0.5 * weaponLv;
  const simultaneousHits = Math.floor(CUTTER_BASE_SIMULTANEOUS_HITS + 0.05 * weaponLv);
  const damageMul = CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, weaponLv);
  const overdriveDamageMul = 1;

  return {
    attackPerSec,
    orbitRadius,
    simultaneousHits,
    damageMul,
    overdriveCdSec: CUTTER_OVERDRIVE_CD_SEC,
    overdriveDurationSec: CUTTER_OVERDRIVE_DURATION_SEC,
    overdriveAttackSpeedMul: CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
    overdriveDamageMul,
  };
}

/** Cutter アクティブ (Overdrive) のクールダウン秒 */
export const CUTTER_OVERDRIVE_CD_SEC = 35;
/** Cutter アクティブ (Overdrive) の持続秒 */
export const CUTTER_OVERDRIVE_DURATION_SEC = 8;
/** Cutter アクティブ (Overdrive) 中の攻撃速度倍率 */
export const CUTTER_OVERDRIVE_ATTACK_SPEED_MUL = 3;

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
 * @param machine           マシンステ
 * @param stats             Cutter ステ
 * @param enemiesInRange    旋回半径 (orbitRadius) 以内の敵 (caller がフィルタ済み)
 * @param currentAngleDeg   前 fire 時の基準刃の角度 (度)。 useBattleLoop の cutterAngleDegRef
 * @param rng               クリ判定用
 * @param blades            刃の枚数 (default 2)
 * @param machineX          マシン中心 X % (default 50)
 * @param machineY          マシン中心 Y % (default 50)
 */
export function cutterNormalAttack(
  machine: MachineStats,
  stats: CutterStats,
  enemiesInRange: SpawnedEnemy[],
  currentAngleDeg: number,
  rng: () => number,
  blades = 2,
  machineX = 50,
  machineY = 50
): CutterAttackResult {
  // 各刃が担当する弧 = sweepDeg。 blades 個の弧を合計すると 360° (全周カバー)
  const sweepDeg = 360 / blades;
  // 担当弧の開始角度: 基準刃 (currentAngleDeg) からの各刃のオフセット位置
  const bladeStarts: number[] = [];
  for (let i = 0; i < blades; i++) {
    bladeStarts.push(currentAngleDeg + i * sweepDeg);
  }

  // 敵がいずれかの刃の sweep 範囲に入っていればヒット候補
  const onSweep = enemiesInRange.filter((enemy) => {
    const dx = enemy.position.x - machineX;
    const dy = enemy.position.y - machineY;
    const enemyAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return bladeStarts.some((start) => isAngleInRange(enemyAngle, start, sweepDeg));
  });

  const targets = onSweep.slice(0, stats.simultaneousHits);

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
