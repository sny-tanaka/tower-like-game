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
 * スケール根拠（05-weapons.md より）:
 *   attackPerSec = 1.0 × (1 + 0.03 × Lv)          ← AS 底値 1.0
 *   pierce       = floor(1 + 0.1 × Lv)              ← 貫通数: Lv0=1, +0.1/Lv, 切り捨て
 *   damageMul    = 1.02 ^ Lv                         ← 武器ダメ倍率
 *   megaCdSec    = 20 (固定)                          ← Mega Beam CD
 *   megaDamageMul = (1 + 0.05 × Lv) × 10            ← アクティブ威力底値×10、+0.05×底値/Lv スケール
 *
 * NOTE: 仕様書に通常攻撃の「武器固有ダメ倍率」底値は明記なし。
 *       calcOutgoingDamage の weapon.damageMultiplier で damageMul を渡すため
 *       damageMul を 1.02^Lv として統一する。
 */
export interface LaserStats {
  /** 通常攻撃連射数 (attacks/sec) */
  attackPerSec: number;
  /** 貫通数（最大同時ヒット数、切り捨て整数） */
  pierce: number;
  /** 武器ダメージ倍率（weapon.damageMultiplier に渡す値） */
  damageMul: number;
  /** Mega Beam クールダウン秒数（固定 20 秒） */
  megaCdSec: number;
  /** Mega Beam ダメージ倍率（通常攻撃に対する乗数） */
  megaDamageMul: number;
}

/**
 * 武器強化 Lv から LaserStats を計算して返す。
 *
 * @param weaponLv  武器強化 Lv（0 以上の整数）
 */
export function laserStats(weaponLv: number): LaserStats {
  const lv = Math.max(0, weaponLv);

  // AS: 底値 1.0 × (1 + 0.03 × Lv)
  const attackPerSec = 1.0 * (1 + 0.03 * lv);

  // 貫通数: floor(1 + 0.1 × Lv)  ← 仕様: Lv0=1, +0.1/Lv, 切り捨て
  const pierce = Math.floor(1 + 0.1 * lv);

  // 武器ダメ倍率: 1.02 ^ Lv
  const damageMul = Math.pow(1.02, lv);

  // Mega Beam CD: 固定 20 秒
  const megaCdSec = 20;

  // Mega Beam 威力: アクティブ底値 10 × (1 + 0.05 × Lv)
  // 仕様: アクティブ威力 = +0.05 × アクティブ底威力/Lv → 底値 10 × (1 + 0.05 × Lv)
  const megaDamageMul = 10 * (1 + 0.05 * lv);

  return { attackPerSec, pierce, damageMul, megaCdSec, megaDamageMul };
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

  const hits: LaserHit[] = targets.map((enemy) => {
    const isCrit = rollCrit(machine.critRate, rng);
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: stats.damageMul }, isCrit },
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
  /** 全敵へのヒット結果 */
  hits: MegaBeamHit[];
}

/**
 * Mega Beam アクティブ。画面端まで届く全敵に大ダメージ。
 *
 * アクティブ素ダメ = baseAttack × damageMul × megaDamageMul
 * クリ判定: なし（仕様に記載なし。通常攻撃と同様にクリが乗ることも考えられるが
 *            明示なしのため固定ダメとして実装。変更コメントで明記）
 * NOTE: 敵防御・軽減は BattleField 側が責務のため 0 で計算している。
 *
 * @param machine  マシン本体ステ
 * @param stats    Laser 固有ステ
 * @param enemies  全敵リスト（範囲外含む）
 */
export function laserMegaBeam(
  machine: MachineStats,
  stats: LaserStats,
  enemies: SpawnedEnemy[]
): MegaBeamResult {
  if (enemies.length === 0) {
    return { hits: [] };
  }

  // megaDamageMul は通常攻撃 damageMul に対する追加倍率
  const totalMul = stats.damageMul * stats.megaDamageMul;

  const hits: MegaBeamHit[] = enemies.map((enemy) => {
    // isCrit=false でクリなし固定
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: totalMul }, isCrit: false },
      BigNum.ZERO,
      0
    );
    return { enemyId: enemy.id, damage: result.finalDmg };
  });

  return { hits };
}
