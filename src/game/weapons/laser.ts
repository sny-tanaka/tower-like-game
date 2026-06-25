import { calcOutgoingDamage, rollCrit } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// Laser 武器固有ステータス
// ---------------------------------------------------------------------------

/**
 * Laser 武器の固有ステ。laserStats(weaponLv) で取得する。
 *
 * スケール根拠（14-weapons-rebalance-v1.1.md より）:
 *   attackPerSec        = LASER_BASE_AS × (1 + 0.03 × Lv)   ← AS 底値 2.5
 *   pierce              = 1 (固定)                           ← Lv で増えない（v1.1 で固定化）
 *   damageMul           = LASER_BASE_DAMAGE_MUL × 1.02^Lv    ← 武器ダメ倍率（底値 0.8）
 *   megaDamageMul       = 50 × (1 + 0.05 × Lv)               ← Mega Beam ダメ倍率（base 50 に強化）
 *   critMultiplierBonus = 0.01 × Lv                          ← Critical倍率ボーナス（Lv 60 で +0.6）
 *
 * NOTE: critMultiplierBonus は通常攻撃のクリ時にのみ反映される。
 *       Mega Beam は isCrit=false 固定なので影響しない。
 */
export interface LaserStats {
  /** 通常攻撃連射数 (attacks/sec) */
  attackPerSec: number;
  /** 貫通数（最大同時ヒット数。v1.1 で 1 固定） */
  pierce: number;
  /** 武器ダメージ倍率（weapon.damageMultiplier に渡す値） */
  damageMul: number;
  /** Mega Beam ダメージ倍率（通常攻撃に対する乗数） */
  megaDamageMul: number;
  /** クリティカル倍率ボーナス（machine.critMultiplier への加算値） */
  critMultiplierBonus: number;
}

/** Laser 底値 attacks/sec */
export const LASER_BASE_AS = 2.5;
/** Laser 底値 武器ダメージ倍率（単体 DPS: 2.5 × 0.8 = 2.0） */
export const LASER_BASE_DAMAGE_MUL = 0.8;

/**
 * 武器強化 Lv から LaserStats を計算して返す。
 *
 * v1.1.1 で武器Lv は damageMul / attackPerSec / megaDamageMul を一切伸ばさない仕様に変更。
 * Laser の Lv 軸は「critMultiplier ボーナス」1 軸のみ。
 *
 * @param weaponLv  武器強化 Lv（0 以上の整数）
 */
export function laserStats(weaponLv: number): LaserStats {
  const lv = Math.max(0, weaponLv);

  // v1.1.1: attackPerSec / pierce / damageMul / megaDamageMul は武器Lv 不問の固定底値
  const attackPerSec = LASER_BASE_AS;
  const pierce = 1;
  const damageMul = LASER_BASE_DAMAGE_MUL;
  const megaDamageMul = 50;

  // Laser の Lv 軸: critMultiplier ボーナス +0.01 × Lv (Lv 60 で +0.6, Lv 100 で +1.0)
  const critMultiplierBonus = 0.01 * lv;

  return { attackPerSec, pierce, damageMul, megaDamageMul, critMultiplierBonus };
}

// ---------------------------------------------------------------------------
// Laser 通常攻撃
// ---------------------------------------------------------------------------

/** 通常攻撃 1 発のヒット結果 */
export interface LaserHit {
  enemyId: string;
  damage: BigNum;
  crit: boolean;
}

export interface LaserAttackResult {
  /** ヒットした敵ごとのダメージ情報。pierce 体を上限として距離遠い順 */
  hits: LaserHit[];
  /**
   * ビーム軌跡の終点（最も遠い敵を狙う方向）。
   * 敵が 0 体のとき beamX=0, beamY=0。
   * 位置は SpawnedEnemy.position (0-100 のパーセント座標) を使用。
   */
  beamX: number;
  beamY: number;
}

/**
 * Laser 通常攻撃。索敵範囲内の敵に最大 pierce 体ヒット。
 *
 * ターゲット選択:
 *   - 仕様「単体（最寄り）」に基づき先頭ターゲット（最寄り）を起点に貫通する。
 *   - enemiesInRange は呼び出し元が距離昇順でソート済みと仮定する。
 *   - beamX/Y は最も遠い敵（= ヒット対象の末尾）の position を返す。
 *
 * critMultiplier ボーナス:
 *   - stats.critMultiplierBonus を machine.critMultiplier に加算した値を使って計算する。
 *
 * @param machine        マシン本体ステ
 * @param stats          Laser 固有ステ
 * @param enemiesInRange 索敵距離内の敵リスト（距離昇順）
 * @param rng            0〜1 の乱数関数（Math.random() を渡さない。テスト用に外部注入）
 */
export function laserNormalAttack(
  machine: MachineStats,
  stats: LaserStats,
  enemiesInRange: SpawnedEnemy[],
  rng: () => number
): LaserAttackResult {
  if (enemiesInRange.length === 0) {
    return { hits: [], beamX: 0, beamY: 0 };
  }

  // pierce 体まで選択（距離昇順の先頭から）
  const targets = enemiesInRange.slice(0, stats.pierce);

  // critMultiplier ボーナスを machine に加算した一時的なステを作る
  const machineWithCritBonus: MachineStats = {
    ...machine,
    critMultiplier: machine.critMultiplier + stats.critMultiplierBonus,
  };

  const hits: LaserHit[] = targets.map((enemy) => {
    const isCrit = rollCrit(machine.critRate, rng);
    const result = calcOutgoingDamage(
      { machine: machineWithCritBonus, weapon: { damageMultiplier: stats.damageMul }, isCrit },
      BigNum.ZERO, // 敵の防御・軽減は BattleField 側で管理する想定（純粋計算層では 0 渡し）
      0
    );
    return { enemyId: enemy.id, damage: result.finalDmg, crit: isCrit };
  });

  // 最も遠い敵（= targets の末尾）の位置をビーム終点に使う
  const farthest = targets[targets.length - 1];
  const beamX = farthest.position.x;
  const beamY = farthest.position.y;

  return { hits, beamX, beamY };
}

// ---------------------------------------------------------------------------
// Mega Beam アクティブ
// ---------------------------------------------------------------------------

/** Mega Beam のヒット結果（クリ判定なし。仕様に記述なしのためアクティブはクリなし） */
export interface MegaBeamHit {
  enemyId: string;
  damage: BigNum;
}

export interface MegaBeamResult {
  /** ビーム上にいる敵へのヒット結果 */
  hits: MegaBeamHit[];
}

/**
 * Mega Beam の幅 (パーセント)。 v1.1 で 6% → 12% に強化。
 * BattleField 座標系 (短辺 0-100%) における太いビームの幅。
 */
export const LASER_MEGA_BEAM_WIDTH_PCT = 12;

/**
 * Mega Beam アクティブ。 マシン中心 (machineX, machineY) から angleDeg 方向に伸びる、
 * 幅 beamWidthPct の太いビーム。 そのビーム矩形上にいる敵だけにダメージ。
 *
 * 判定:
 *  - 敵の (ex - mx, ey - my) を角度方向 (cos, sin) と垂直方向 (-sin, cos) に射影
 *  - 軸方向 (parallel) > 0 (= 後方にいる敵は対象外) かつ
 *  - 垂直距離 (perpendicular) の絶対値 ≤ beamWidthPct/2 → ヒット
 *
 * アクティブ素ダメ = baseAttack × damageMul × megaDamageMul、 クリなし。
 *
 * @param machine          マシン本体ステ
 * @param stats            Laser 固有ステ
 * @param enemies          全敵リスト
 * @param angleDeg         ビームを発射する角度 (0=右、 90=下。 CSS rotate 互換)
 * @param machineX         マシン中心 X % (default 50)
 * @param machineY         マシン中心 Y % (default 50)
 * @param beamWidthPct     ビーム幅 % (default LASER_MEGA_BEAM_WIDTH_PCT)
 */
export function laserMegaBeam(
  machine: MachineStats,
  stats: LaserStats,
  enemies: SpawnedEnemy[],
  angleDeg = 0,
  machineX = 50,
  machineY = 50,
  beamWidthPct = LASER_MEGA_BEAM_WIDTH_PCT
): MegaBeamResult {
  if (enemies.length === 0) {
    return { hits: [] };
  }

  const angleRad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const halfWidth = beamWidthPct / 2;

  // megaDamageMul は通常攻撃 damageMul に対する追加倍率
  const totalMul = stats.damageMul * stats.megaDamageMul;

  const hits: MegaBeamHit[] = [];
  for (const enemy of enemies) {
    const dx = enemy.position.x - machineX;
    const dy = enemy.position.y - machineY;
    // ビーム軸方向への射影 (進行方向)
    const parallel = dx * cos + dy * sin;
    if (parallel <= 0) continue; // ビーム背後にいる敵は当たらない
    // 垂直方向への射影 (ビーム軸からの離れ)
    const perpendicular = -dx * sin + dy * cos;
    if (Math.abs(perpendicular) > halfWidth) continue;

    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: totalMul }, isCrit: false },
      BigNum.ZERO,
      0
    );
    hits.push({ enemyId: enemy.id, damage: result.finalDmg });
  }

  return { hits };
}
