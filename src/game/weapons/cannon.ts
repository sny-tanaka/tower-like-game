/**
 * cannon.ts — Cannon 武器の戦闘ロジック（通常攻撃 + Volley アクティブ）
 *
 * 仕様: design-docs/tower-like-game/14-weapons-rebalance-v1.1.md (v1.1)
 *       design-docs/tower-like-game/05-weapons.md (旧仕様、参考用)
 *
 * Cannon 基本仕様 (v1.1):
 *   - 通常攻撃: 最寄り敵に着弾、爆発半径内の全敵にスプラッシュダメージ
 *   - 攻撃速度 底値: 0.5 attacks/sec
 *   - 武器ダメージ倍率 底値: 3.0（DPS 1.5）
 *   - 爆発半径 底値: 30 px（+0.5 px / Lv、小数 OK）
 *   - スプラッシュは「マシン背面側」をカット（半円判定）
 *   - アクティブ (Volley): 72° 刻み 5 発放射、各爆発半径は通常の ×3、
 *     1 発ダメ = 通常の ×10、各 shot にも半円カットを適用
 *   - アクティブ CD: グローバル `DEFAULT_ACTIVE_MAX_SEC = 60s` に統一（武器個別 CD は撤去）
 */

import { calcOutgoingDamage, rollCrit } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 定数
// ---------------------------------------------------------------------------

/** Cannon 底値 attacks/sec (v1.3.0 で 0.5 → 0.25 に半減、 未強化で 4 秒に 1 発) */
export const CANNON_BASE_AS = 0.25;

/** Cannon 底値 武器ダメージ倍率 (DPS = 0.25 × 6.0 = 1.5 を維持) */
export const CANNON_BASE_DAMAGE_MUL = 6.0;

/**
 * 爆発半径 底値 (フィールド % 半径)。
 *
 * v1.1.2 で「ダメージ判定半径 = BlastFx の見た目」 に統一する目的で大幅縮小。
 * 旧仕様は 30 を「px」 と称しつつ実体は「フィールド %」 として比較していたため、
 * Lv 0 の cannon でフィールド直径 60% の爆風判定が出てしまい、 BlastFx 見た目
 * (12 vmin ≒ フィールド 8.5%) と大きく乖離していた (= 明らかに範囲外でも当たる)。
 *
 * 新仕様: BASE = 8 (フィールド % 半径)、 Lv あたり +0.1 (Lv 100 で 18)。
 * 単位は 「敵 position の % 距離と同じ系」。 BlastFx 側もこの値で見た目を出す。
 */
const BASE_SPLASH_RADIUS_PCT = 8;

/** Lv あたりの splash 半径増分 (フィールド %) */
const SPLASH_RADIUS_PER_LV_PCT = 0.1;

/** Volley 発射数 */
export const VOLLEY_SHOTS = 5;

/** Volley 角度間隔 (度) */
const VOLLEY_SPREAD_DEG = 360 / VOLLEY_SHOTS; // 72°

/** Volley の爆発半径倍率 */
const VOLLEY_SPLASH_MUL = 3;

/** Volley 1 発ダメージ倍率（通常攻撃比、 v1.3.0 で 10 → 5 に半減: 通常 damageMul 倍化と相殺） */
const VOLLEY_DAMAGE_MUL = 5;

/**
 * 砲弾の飛翔速度 (% / 秒)。 マシン中心からの距離 (画面短辺 0-100%) を
 * (shellSpeed + enemy.speed) で割ったものが飛翔秒数になる。 速いほど予測着弾点は
 * 敵の現在位置に近づく。
 */
export const CANNON_SHELL_SPEED_PCT_PER_SEC = 50;

/**
 * 砲弾の飛翔時間 (ms) のフォールバック。 距離 0 の縮退時や、 計算上不要なケースで使う。
 * 通常は predictCannonImpact() の flightSec を使う (= 距離と enemy.speed で動的に決まる)。
 */
export const CANNON_SHELL_MS = 480;

/** マシン座標（フィールド中央固定。 useBattleLoop の MACHINE_CENTER と一致） */
const MACHINE_X = 50;
const MACHINE_Y = 50;

/**
 * 砲弾と敵の衝突予測。 敵がマシン中心に向かって直線移動すると仮定して
 * 「砲弾と敵がぶつかる位置 + 飛翔秒数」 を計算する。
 *
 * 解析: 敵が距離 |D| (= |target - machine|) からマシン方向に速度 V_enemy で移動し、
 *      砲弾がマシンから速度 S_shell で発射されるとき、
 *        flightSec = |D| / (S_shell + V_enemy)
 *        impact    = machine + (target - machine) × S_shell / (S_shell + V_enemy)
 *
 * 想定: 敵はマシンに向かって直線移動する (= ノックバック中などは想定外)。
 *
 * @param targetX     発射時点の敵 X (%)
 * @param targetY     発射時点の敵 Y (%)
 * @param targetSpeed 敵の移動速度 (% / 秒、 マシン方向への magnitude)
 * @param shellSpeed  砲弾速度 (% / 秒、 default CANNON_SHELL_SPEED_PCT_PER_SEC)
 */
export function predictCannonImpact(
  targetX: number,
  targetY: number,
  targetSpeed: number,
  shellSpeed: number = CANNON_SHELL_SPEED_PCT_PER_SEC
): { blastX: number; blastY: number; flightSec: number } {
  const dx = targetX - MACHINE_X;
  const dy = targetY - MACHINE_Y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= 0) {
    return { blastX: MACHINE_X, blastY: MACHINE_Y, flightSec: 0 };
  }
  const combinedSpeed = Math.max(0, shellSpeed) + Math.max(0, targetSpeed);
  if (combinedSpeed <= 0) {
    // 静止砲弾 + 静止敵: 飛翔せず現在位置で着弾
    return { blastX: targetX, blastY: targetY, flightSec: 0 };
  }
  const flightSec = distance / combinedSpeed;
  const factor = shellSpeed / combinedSpeed; // = S_shell / (S_shell + V_enemy)
  return {
    blastX: MACHINE_X + dx * factor,
    blastY: MACHINE_Y + dy * factor,
    flightSec,
  };
}

// ---------------------------------------------------------------------------
// CannonStats
// ---------------------------------------------------------------------------

export interface CannonStats {
  /** 実効 attacks/sec（マシン AS 倍率・RW は呼び出し元で適用済み想定） */
  attackPerSec: number;
  /** 爆発半径 (フィールド % 半径、 敵 position の % 距離と直接比較する系)。 小数 OK */
  splashRadius: number;
  /** 武器ダメージ倍率（Lv スケール） */
  damageMul: number;
  /** Volley 1 発ダメージ倍率（通常攻撃比） */
  volleyDamageMul: number;
  /** Volley 発射数 */
  volleyShots: number;
}

/**
 * 武器強化 Lv から CannonStats を計算する。
 *
 * v1.1.1 で武器Lv はマシン強化のように damageMul / attackPerSec / volleyDamageMul を
 * 一切伸ばさない仕様に変更。Cannon の Lv 軸は「splash 半径」 1 軸のみ。
 *
 *   - 武器ダメージ倍率: CANNON_BASE_DAMAGE_MUL (固定)
 *   - 攻撃速度: CANNON_BASE_AS (固定)
 *   - 爆発半径 (Lv 軸): 30 + 0.5 × Lv (px)
 *   - Volley ダメージ倍率: VOLLEY_DAMAGE_MUL (固定)
 *   - Volley 発射数: 5 発（固定）
 */
export function cannonStats(weaponLv: number): CannonStats {
  const lv = Math.max(0, Math.floor(weaponLv));

  // v1.1.1: damageMul / attackPerSec / volleyDamageMul は武器Lv 不問の固定底値
  const damageMul = CANNON_BASE_DAMAGE_MUL;
  const attackPerSec = CANNON_BASE_AS;
  const volleyDamageMul = VOLLEY_DAMAGE_MUL;

  // Cannon の Lv 軸: splash 半径 (8 + 0.1 × Lv) フィールド %。
  // 単位は敵 position の % 距離と同じ系 (cannonApplySplash の dist() と直接比較)。
  // BlastFx 側もこの値で見た目を出す (= 「見た目 = 当たり判定」 を保証)。
  const splashRadius = BASE_SPLASH_RADIUS_PCT + SPLASH_RADIUS_PER_LV_PCT * lv;

  return {
    attackPerSec,
    splashRadius,
    damageMul,
    volleyDamageMul,
    volleyShots: VOLLEY_SHOTS,
  };
}

// ---------------------------------------------------------------------------
// cannonNormalAttack / cannonApplySplash
//
// v1.1.2: 「発射時にヒットを確定」 する旧仕様から「発射時は着弾点だけ決め、
// 着弾時 (= shellMs 後) の敵分布で splash 判定 + 距離減衰ダメ」 に変更。
//
// 1. cannonNormalAttack: 着弾点 (= 最寄り敵の現在位置) と クリ ロールのみ返す
// 2. cannonApplySplash:  着弾時にその瞬間の敵分布に対して splash 判定 + 距離減衰ダメ
// ---------------------------------------------------------------------------

/** Splash 半径ギリギリで残るダメージ倍率 (中心 = 1.0、 ギリギリ = SPLASH_EDGE_FACTOR) */
export const SPLASH_EDGE_FACTOR = 0.3;

export interface CannonAttackHit {
  enemyId: string;
  damage: BigNum;
  crit: boolean;
}

export interface CannonAttackResult {
  /** 予測着弾点の X 座標（パーセント、 砲弾と敵の交点） */
  blastX: number;
  /** 予測着弾点の Y 座標（パーセント、 砲弾と敵の交点） */
  blastY: number;
  /** 砲弾の飛翔秒数 (= 距離 / (shellSpeed + targetSpeed))。 0 のときは即時着弾 */
  flightSec: number;
  /** クリ判定（発射時 1 回ロール、 全 splash ヒットに適用） */
  isCrit: boolean;
  /** スプラッシュ半径 (px) — 着弾時の判定に使う */
  splashRadius: number;
  /**
   * スプラッシュ damageMul (calcOutgoingDamage に渡す値)。
   * 距離 0 (中心) で 1.0 倍 → 距離 splashRadius で SPLASH_EDGE_FACTOR 倍。
   */
  damageMul: number;
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
 * 半円カット判定。
 *
 * マシン → 着弾点ベクトルと、マシン → 敵ベクトルの内積が正であれば、
 * 敵はマシンより着弾側（前方）にいると判定する。内積が 0 以下の場合は
 * マシン背面側とみなしてスプラッシュ対象から除外する。
 *
 * 仕様: design-docs/tower-like-game/14-weapons-rebalance-v1.1.md
 *   `(ex - mx) × (bx - mx) + (ey - my) × (by - my) > 0`
 *
 * @returns true ならスプラッシュ対象、false なら背面側でカット
 */
function isInFrontSemicircle(
  blastX: number,
  blastY: number,
  enemyX: number,
  enemyY: number
): boolean {
  const bx = blastX - MACHINE_X;
  const by = blastY - MACHINE_Y;
  const ex = enemyX - MACHINE_X;
  const ey = enemyY - MACHINE_Y;
  return ex * bx + ey * by > 0;
}

/**
 * Cannon 通常攻撃 (発射時)。
 *
 * v1.1.2: ヒット判定は **着弾時** に [`cannonApplySplash`] で行う。
 * ここでは着弾点 (= 最寄り敵の現在位置) と クリ ロールだけ決定する。
 *
 * @param machine          マシンステータス
 * @param stats            Cannon ステータス（cannonStats() で生成、 attackMul 等は呼出側で乗算済み）
 * @param enemiesInRange   射程内の敵一覧 (発射時点)
 * @param rng              [0, 1) の乱数を返す関数
 */
export function cannonNormalAttack(
  machine: MachineStats,
  stats: CannonStats,
  enemiesInRange: SpawnedEnemy[],
  rng: () => number
): CannonAttackResult {
  const splashRadius = stats.splashRadius;
  const damageMul = stats.damageMul;

  if (enemiesInRange.length === 0) {
    return {
      blastX: MACHINE_X,
      blastY: MACHINE_Y,
      flightSec: 0,
      isCrit: false,
      splashRadius,
      damageMul,
    };
  }

  // ターゲット = 最寄り敵 (発射時点での position)
  let nearestEnemy = enemiesInRange[0]!;
  let minD = dist(MACHINE_X, MACHINE_Y, nearestEnemy.position.x, nearestEnemy.position.y);

  for (let i = 1; i < enemiesInRange.length; i++) {
    const e = enemiesInRange[i]!;
    const d = dist(MACHINE_X, MACHINE_Y, e.position.x, e.position.y);
    if (d < minD) {
      minD = d;
      nearestEnemy = e;
    }
  }

  // 砲弾と敵の交点を予測 (敵は射撃時点の位置 + マシン方向への直線運動を仮定)
  const impact = predictCannonImpact(
    nearestEnemy.position.x,
    nearestEnemy.position.y,
    nearestEnemy.speed
  );

  // クリ判定（1 回ロール、 着弾時の全 splash ヒットに適用）
  const isCrit = rollCrit(machine.critRate, rng);

  return {
    blastX: impact.blastX,
    blastY: impact.blastY,
    flightSec: impact.flightSec,
    isCrit,
    splashRadius,
    damageMul,
  };
}

/**
 * Cannon 砲弾の着弾時 splash 判定 + 距離減衰ダメ。
 *
 * 距離減衰:
 *   - 中心 (d=0)            : 100% (×1.0)
 *   - 半径ギリギリ (d=splashRadius) : SPLASH_EDGE_FACTOR = 30%
 *   - 線形補間: `falloff = 1 - (1 - SPLASH_EDGE_FACTOR) × (d / splashRadius)`
 *
 * マシン背面側 (半円カット) はヒット対象外。
 *
 * @param machine        マシンステータス (着弾時点)
 * @param enemies        着弾時点の全敵リスト (画面上全敵を渡す想定)
 * @param blastX         着弾点 X
 * @param blastY         着弾点 Y
 * @param splashRadius   スプラッシュ半径 (px)
 * @param damageMul      base damageMul (calcOutgoingDamage に渡す damageMultiplier の中心値、 attackMul 等は前処理済み)
 * @param isCrit         発射時に決定したクリ判定 (全 splash ヒットに同じ値を適用)
 */
export function cannonApplySplash(
  machine: MachineStats,
  enemies: SpawnedEnemy[],
  blastX: number,
  blastY: number,
  splashRadius: number,
  damageMul: number,
  isCrit: boolean
): CannonAttackHit[] {
  const hits: CannonAttackHit[] = [];
  for (const enemy of enemies) {
    const d = dist(blastX, blastY, enemy.position.x, enemy.position.y);
    // v1.3.1: 敵のヒット判定半径 (= 描画半径 × 0.95) を加味。 ボスのような大きい敵の縁に
    // 爆風がかかったときも命中扱いになる。 距離減衰計算は敵中心までの距離 d で行う
    // (= 縁ギリギリで当たった敵もちゃんとフォールオフでダメが減る)。
    const effectiveRadius = splashRadius + enemy.hitRadius;
    if (d > effectiveRadius) continue;
    if (!isInFrontSemicircle(blastX, blastY, enemy.position.x, enemy.position.y)) continue;

    // 距離減衰: 中心 1.0 → 半径ギリギリ SPLASH_EDGE_FACTOR
    // splashRadius=0 (縮退) は中心の敵だけが d=0 で含まれ、 ゼロ除算回避して falloff=1.0
    // フォールオフ計算は元の splashRadius を分母にする (hitRadius は判定だけの拡張、 ダメ計算には影響しない)
    const dForFalloff = Math.min(d, splashRadius);
    const falloff =
      splashRadius > 0 ? 1 - (1 - SPLASH_EDGE_FACTOR) * (dForFalloff / splashRadius) : 1;

    const result = calcOutgoingDamage(
      {
        machine,
        weapon: { damageMultiplier: damageMul * falloff },
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
  return hits;
}

// ---------------------------------------------------------------------------
// cannonVolley
// ---------------------------------------------------------------------------

export interface VolleyShot {
  /** ターゲットの敵 ID（範囲内に敵がいない場合は null） */
  targetEnemyId: string | null;
  /** 予測着弾点 X (パーセント、 砲弾と敵の交点) */
  blastX: number;
  /** 予測着弾点 Y (パーセント、 砲弾と敵の交点) */
  blastY: number;
  /** 砲弾の飛翔秒数。 ターゲットなしの仮想砲弾は固定距離 100 を shellSpeed で割った値 */
  flightSec: number;
}

export interface VolleyResult {
  shots: VolleyShot[];
  /** 各 shot の splash 半径 (= stats.splashRadius × VOLLEY_SPLASH_MUL) */
  splashRadius: number;
  /** 各 shot の damageMul (= stats.damageMul × stats.volleyDamageMul) */
  damageMul: number;
}

/**
 * Volley アクティブスキル (発射時)。
 *
 * v1.1.2: 通常攻撃と同じく、 ヒット判定は **着弾時** に [`cannonApplySplash`] で行う。
 * ここでは 5 発分の着弾点だけ決定する (= 各 shot のターゲットを射影法で選ぶ)。
 *
 * 動作:
 *   1. 全敵の中で最近の敵の方向を基準角 (0°) として 72° 刻みで 5 方向に発射
 *   2. 各方向につき、 その方向に最も射影成分が大きい敵 (正面) を着弾点とする
 *      (方向上に敵がいない場合は仮想着弾点)
 *   3. ダメ判定は 着弾時 に cannonApplySplash で半円カット + 距離減衰
 *
 * @param machine     マシンステータス
 * @param stats       Cannon ステータス
 * @param enemies     フィールド上のすべての敵 (発射時点)
 * @param spreadDeg   扇形の広がり角度 (省略時は 360°、 =72° 刻み 5 発)
 */
export function cannonVolley(
  machine: MachineStats,
  stats: CannonStats,
  enemies: SpawnedEnemy[],
  spreadDeg?: number
): VolleyResult {
  void machine; // 着弾時に machine を使うため発射時には不要

  // 発射角度の基準を決める
  // 起点: 全敵の中で最近の敵の方向（敵がいなければ右方向 = 0°）
  let baseDeg = 0;
  if (enemies.length > 0) {
    let nearest = enemies[0]!;
    let minD = dist(MACHINE_X, MACHINE_Y, nearest.position.x, nearest.position.y);
    for (let i = 1; i < enemies.length; i++) {
      const e = enemies[i]!;
      const d = dist(MACHINE_X, MACHINE_Y, e.position.x, e.position.y);
      if (d < minD) {
        minD = d;
        nearest = e;
      }
    }
    const dx = nearest.position.x - MACHINE_X;
    const dy = nearest.position.y - MACHINE_Y;
    baseDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  // 各ショットの角度を計算
  const totalSpread = spreadDeg !== undefined ? spreadDeg : VOLLEY_SPREAD_DEG * stats.volleyShots;
  const angleStep = totalSpread / stats.volleyShots;
  const volleySplashRadius = stats.splashRadius * VOLLEY_SPLASH_MUL;
  const volleyDamageMul = stats.damageMul * stats.volleyDamageMul;

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
      const ex = e.position.x - MACHINE_X;
      const ey = e.position.y - MACHINE_Y;
      const proj = ex * dirX + ey * dirY;
      if (proj > 0 && proj > maxProj) {
        maxProj = proj;
        targetEnemy = e;
      }
    }

    // 予測着弾点の決定 (砲弾と敵の交点)
    let blastX: number;
    let blastY: number;
    let flightSec: number;

    if (targetEnemy !== null) {
      const impact = predictCannonImpact(
        targetEnemy.position.x,
        targetEnemy.position.y,
        targetEnemy.speed
      );
      blastX = impact.blastX;
      blastY = impact.blastY;
      flightSec = impact.flightSec;
    } else {
      // 仮想着弾点 (マシンから固定距離 100 先)。 敵がいないので静止標的扱い
      blastX = MACHINE_X + dirX * 100;
      blastY = MACHINE_Y + dirY * 100;
      flightSec = 100 / CANNON_SHELL_SPEED_PCT_PER_SEC;
    }

    shots.push({
      targetEnemyId: targetEnemy?.id ?? null,
      blastX,
      blastY,
      flightSec,
    });
  }

  return { shots, splashRadius: volleySplashRadius, damageMul: volleyDamageMul };
}
