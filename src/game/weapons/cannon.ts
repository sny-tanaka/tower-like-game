/**
 * cannon.ts — Cannon 武器の戦闘ロジック（通常攻撃 + Volley アクティブ）
 *
 * 仕様: design-docs/tower-like-game/05-weapons.md
 *
 * Cannon 基本仕様:
 *   - 通常攻撃: 最遠の敵に着弾、爆発半径内の全敵にスプラッシュダメージ
 *   - 攻撃速度 底値: 0.5 attacks/sec
 *   - 爆発半径 底値: 30 px（+0.5 px / Lv、小数 OK）
 *   - アクティブ (Volley): 72° 刻み 5 発放射、各爆発半径は通常の ×3、1 発ダメ = 通常の ×20
 *   - Volley CD: 25 秒
 */

import { calcOutgoingDamage, rollCrit } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 定数
// ---------------------------------------------------------------------------

/** Cannon 底値 attacks/sec (低速・高ダメ型 — 未強化状態で 2 秒に 1 発) */
export const CANNON_BASE_AS = 0.5;

/** Cannon 底値 武器ダメージ倍率 (高ダメ。 AS 0.5/s × 2.0 で DPS=1.0) */
export const CANNON_BASE_DAMAGE_MUL = 2.0;

/** 爆発半径 底値 (px) */
const BASE_SPLASH_RADIUS_PX = 30;

/** Volley CD 秒数 */
export const VOLLEY_CD_SEC = 25;

/** Volley 発射数 */
export const VOLLEY_SHOTS = 5;

/** Volley 角度間隔 (度) */
const VOLLEY_SPREAD_DEG = 360 / VOLLEY_SHOTS; // 72°

/** Volley の爆発半径倍率 */
const VOLLEY_SPLASH_MUL = 3;

/** Volley 1 発ダメージ倍率（通常攻撃比） */
const VOLLEY_DAMAGE_MUL = 20;

// ---------------------------------------------------------------------------
// CannonStats
// ---------------------------------------------------------------------------

export interface CannonStats {
  /** 実効 attacks/sec（マシン AS 倍率・RW は呼び出し元で適用済み想定） */
  attackPerSec: number;
  /** 爆発半径 (px)。小数 OK */
  splashRadius: number;
  /** 武器ダメージ倍率（Lv スケール） */
  damageMul: number;
  /** Volley CD (秒) */
  volleyCdSec: number;
  /** Volley 1 発ダメージ倍率（通常攻撃比） */
  volleyDamageMul: number;
  /** Volley 発射数 */
  volleyShots: number;
}

/**
 * 武器強化 Lv から CannonStats を計算する。
 *
 * Lv スケール（05-weapons.md 共通ルール）:
 *   - 武器ダメージ倍率: 1.02^Lv
 *   - 攻撃速度: BASE_AS × (1 + 0.03 × Lv)、上限 10
 *   - 爆発半径 (固有ステ): 30 + 0.5 × Lv (px)
 *   - Volley ダメージ倍率: VOLLEY_DAMAGE_MUL × (1 + 0.05 × Lv)
 *   - Volley CD: 25 秒（固定）
 *   - Volley 発射数: 5 発（固定）
 */
export function cannonStats(weaponLv: number): CannonStats {
  const lv = Math.max(0, Math.floor(weaponLv));

  // 武器ダメージ倍率: CANNON_BASE_DAMAGE_MUL × 1.02^Lv
  const damageMul = CANNON_BASE_DAMAGE_MUL * Math.pow(1.02, lv);

  // 攻撃速度: CANNON_BASE_AS × (1 + 0.03 × Lv)、上限 10
  const attackPerSec = Math.min(10, CANNON_BASE_AS * (1 + 0.03 * lv));

  // 爆発半径: 30 + 0.5 × Lv (px)
  const splashRadius = BASE_SPLASH_RADIUS_PX + 0.5 * lv;

  // Volley 1 発ダメ倍率: VOLLEY_DAMAGE_MUL × (1 + 0.05 × Lv)
  const volleyDamageMul = VOLLEY_DAMAGE_MUL * (1 + 0.05 * lv);

  return {
    attackPerSec,
    splashRadius,
    damageMul,
    volleyCdSec: VOLLEY_CD_SEC,
    volleyDamageMul,
    volleyShots: VOLLEY_SHOTS,
  };
}

// ---------------------------------------------------------------------------
// cannonNormalAttack
// ---------------------------------------------------------------------------

export interface CannonAttackHit {
  enemyId: string;
  damage: BigNum;
  crit: boolean;
}

export interface CannonAttackResult {
  /** スプラッシュでヒットした敵のダメージ情報一覧 */
  hits: CannonAttackHit[];
  /** 着弾点の X 座標（パーセント） */
  blastX: number;
  /** 着弾点の Y 座標（パーセント） */
  blastY: number;
}

/**
 * 2 点間のユークリッド距離を計算する（パーセント座標系）。
 */
function dist(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Cannon 通常攻撃。
 *
 * 動作:
 *   1. `enemiesInRange` の中で最も遠い敵（マシン基点 x=0, y=50 と仮定）を
 *      着弾点として選ぶ
 *   2. 着弾点を中心に `splashRadius` 内の全敵にダメージを与える
 *   3. クリ判定は 1 回ロールして全スプラッシュヒットに適用
 *
 * @param machine          マシンステータス
 * @param stats            Cannon ステータス（cannonStats() で生成）
 * @param enemiesInRange   射程内の敵一覧
 * @param rng              [0, 1) の乱数を返す関数
 */
export function cannonNormalAttack(
  machine: MachineStats,
  stats: CannonStats,
  enemiesInRange: SpawnedEnemy[],
  rng: () => number
): CannonAttackResult {
  if (enemiesInRange.length === 0) {
    return { hits: [], blastX: 50, blastY: 50 };
  }

  // マシン座標（フィールド中央固定。 useBattleLoop の MACHINE_CENTER と一致）
  const machineX = 50;
  const machineY = 50;

  // 着弾点 = 最寄り敵 (design-docs/05-weapons.md 仕様)
  let nearestEnemy = enemiesInRange[0]!;
  let minD = dist(machineX, machineY, nearestEnemy.position.x, nearestEnemy.position.y);

  for (let i = 1; i < enemiesInRange.length; i++) {
    const e = enemiesInRange[i]!;
    const d = dist(machineX, machineY, e.position.x, e.position.y);
    if (d < minD) {
      minD = d;
      nearestEnemy = e;
    }
  }

  const blastX = nearestEnemy.position.x;
  const blastY = nearestEnemy.position.y;

  // クリ判定（1 回ロール、全スプラッシュヒットに適用）
  const isCrit = rollCrit(machine.critRate, rng);

  // スプラッシュ範囲内の全敵にダメージ
  const hits: CannonAttackHit[] = [];

  for (const enemy of enemiesInRange) {
    const d = dist(blastX, blastY, enemy.position.x, enemy.position.y);
    if (d <= stats.splashRadius) {
      const result = calcOutgoingDamage(
        {
          machine,
          weapon: { damageMultiplier: stats.damageMul },
          isCrit,
        },
        BigNum.ZERO,
        0
      );
      hits.push({
        enemyId: enemy.id,
        damage: result.finalDmg,
        crit: isCrit,
      });
    }
  }

  return { hits, blastX, blastY };
}

// ---------------------------------------------------------------------------
// cannonVolley
// ---------------------------------------------------------------------------

export interface VolleyShot {
  /** ターゲットの敵 ID（範囲内に敵がいない場合は null） */
  targetEnemyId: string | null;
  /** 着弾点 X (パーセント) */
  blastX: number;
  /** 着弾点 Y (パーセント) */
  blastY: number;
  /** この shot でヒットした敵のダメージ情報 */
  hits: Array<{ enemyId: string; damage: BigNum }>;
}

export interface VolleyResult {
  shots: VolleyShot[];
}

/**
 * Volley アクティブスキル。
 *
 * 動作:
 *   1. 全敵の中で最近の敵の方向を基準角 (0°) として 72° 刻みで 5 方向に発射
 *   2. 各方向につき、その方向に最も射影成分が大きい敵（正面）を着弾点とする
 *      （方向上に敵がいない場合は仮想着弾点）
 *   3. 各着弾点を中心に splashRadius × 3 内の全敵にダメージ
 *   4. ダメージ = 通常攻撃の volleyDamageMul 倍（クリ判定なし）
 *
 * @param machine     マシンステータス
 * @param stats       Cannon ステータス
 * @param enemies     フィールド上のすべての敵
 * @param spreadDeg   扇形の広がり角度（省略時は 360°、=72° 刻み 5 発）
 */
export function cannonVolley(
  machine: MachineStats,
  stats: CannonStats,
  enemies: SpawnedEnemy[],
  spreadDeg?: number
): VolleyResult {
  const machineX = 0;
  const machineY = 50;

  // 発射角度の基準を決める
  // 起点: 全敵の中で最近の敵の方向（敵がいなければ右方向 = 0°）
  let baseDeg = 0;
  if (enemies.length > 0) {
    let nearest = enemies[0]!;
    let minD = dist(machineX, machineY, nearest.position.x, nearest.position.y);
    for (let i = 1; i < enemies.length; i++) {
      const e = enemies[i]!;
      const d = dist(machineX, machineY, e.position.x, e.position.y);
      if (d < minD) {
        minD = d;
        nearest = e;
      }
    }
    const dx = nearest.position.x - machineX;
    const dy = nearest.position.y - machineY;
    baseDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  // 各ショットの角度を計算
  const totalSpread = spreadDeg !== undefined ? spreadDeg : VOLLEY_SPREAD_DEG * stats.volleyShots;
  const angleStep = totalSpread / stats.volleyShots;
  const volleySplashRadius = stats.splashRadius * VOLLEY_SPLASH_MUL;

  const shots: VolleyShot[] = [];

  for (let i = 0; i < stats.volleyShots; i++) {
    const angleDeg = baseDeg + angleStep * i;
    const angleRad = (angleDeg * Math.PI) / 180;

    // この方向に最も近い敵を着弾点とする
    // 実装: 各敵を方向ベクトルに射影し、最も射影成分が大きい（正面）敵を選ぶ
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);

    let targetEnemy: SpawnedEnemy | null = null;
    let maxProj = -Infinity;

    for (const e of enemies) {
      const ex = e.position.x - machineX;
      const ey = e.position.y - machineY;
      const proj = ex * dirX + ey * dirY;
      if (proj > 0 && proj > maxProj) {
        maxProj = proj;
        targetEnemy = e;
      }
    }

    // 着弾点の決定
    let blastX: number;
    let blastY: number;

    if (targetEnemy !== null) {
      blastX = targetEnemy.position.x;
      blastY = targetEnemy.position.y;
    } else {
      // 仮想着弾点（マシンから固定距離 100 先）
      blastX = machineX + dirX * 100;
      blastY = machineY + dirY * 100;
    }

    // 着弾点周囲の敵にダメージ
    const shotHits: Array<{ enemyId: string; damage: BigNum }> = [];

    for (const e of enemies) {
      const d = dist(blastX, blastY, e.position.x, e.position.y);
      if (d <= volleySplashRadius) {
        const result = calcOutgoingDamage(
          {
            machine,
            weapon: { damageMultiplier: stats.damageMul * stats.volleyDamageMul },
            isCrit: false,
          },
          BigNum.ZERO,
          0
        );
        shotHits.push({
          enemyId: e.id,
          damage: result.finalDmg,
        });
      }
    }

    shots.push({
      targetEnemyId: targetEnemy?.id ?? null,
      blastX,
      blastY,
      hits: shotHits,
    });
  }

  return { shots };
}
