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
export function cutterStats(weaponLv: number): CutterStats {
  const BASE_AS = 2.0;
  const BASE_ORBIT_RADIUS = 80;
  const BASE_SIMULTANEOUS_HITS = 1;

  const attackPerSec = BASE_AS * (1 + 0.03 * weaponLv);
  const orbitRadius = BASE_ORBIT_RADIUS + 0.5 * weaponLv;
  const simultaneousHits = Math.floor(BASE_SIMULTANEOUS_HITS + 0.05 * weaponLv);
  const damageMul = Math.pow(1.02, weaponLv);
  const overdriveCdSec = 35;
  const overdriveDurationSec = 8;
  const overdriveAttackSpeedMul = 3;
  const overdriveDamageMul = 1;

  return {
    attackPerSec,
    orbitRadius,
    simultaneousHits,
    damageMul,
    overdriveCdSec,
    overdriveDurationSec,
    overdriveAttackSpeedMul,
    overdriveDamageMul,
  };
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
 * Cutter 通常攻撃。
 *
 * 旋回半径上（position が orbitRadius 以内）の敵を対象に、
 * simultaneousHits 体まで同時ヒットする。
 *
 * 敵の選定: enemiesInRange 先頭から simultaneousHits 体。
 * 旋回角度は currentAngleDeg + 360/attackPerSec の増分で更新される（描画用）。
 */
export function cutterNormalAttack(
  machine: MachineStats,
  stats: CutterStats,
  enemiesInRange: SpawnedEnemy[],
  currentAngleDeg: number,
  rng: () => number
): CutterAttackResult {
  // 旋回半径内の敵に絞る
  // position は 0-100 のパーセント値なので、orbitRadius はピクセル単位を想定。
  // ゲームロジック側で「orbitRadius 以内」の敵を渡してもらう前提だが、
  // 念のため distance チェックも行う（position 単位系は caller に依存するため、
  // ここでは渡された enemiesInRange をそのまま使用する）。
  const targets = enemiesInRange.slice(0, stats.simultaneousHits);

  const hits = targets.map((enemy) => {
    const isCrit = rollCrit(machine.critRate, rng);
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: stats.damageMul }, isCrit },
      BigNum.ZERO, // 敵防御力は caller 側が事前にフィルタ済み想定（0 でパス）
      0
    );
    return {
      enemyId: enemy.id,
      damage: result.finalDmg,
      crit: isCrit,
    };
  });

  // 旋回角度の更新（1 attack あたりの進み）
  const angle = (currentAngleDeg + 360 / stats.attackPerSec) % 360;

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
