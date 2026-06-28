import type { MachineStats, WeaponStats } from './damage.types';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 公開インターフェース
// ---------------------------------------------------------------------------

export interface DamageCalcInput {
  machine: MachineStats;
  weapon: WeaponStats;
  isCrit: boolean;
}

export interface DamageCalcResult {
  /** クリ込みの raw_dmg */
  rawDmg: BigNum;
  /** 防御 / 軽減を考慮した最終ダメージ */
  finalDmg: BigNum;
  /** 入力をそのまま返す */
  isCrit: boolean;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

/**
 * 軽減率を適用する。
 * finalDmg = afterDefense × (1 − damageReduction)
 * 仕様: 切り上げ整数で返す（03-machine.md 表示・計算丸めルール）
 */
function applyReduction(afterDefense: BigNum, damageReduction: number): BigNum {
  if (afterDefense.isZero()) return BigNum.ZERO;
  if (damageReduction <= 0) return afterDefense;
  if (damageReduction >= 1) return BigNum.ZERO;

  // (1 - damageReduction) を有理数で乗算する
  const retainRate = 1 - damageReduction;
  return afterDefense.mulNumber(retainRate);
}

// ---------------------------------------------------------------------------
// 公開関数
// ---------------------------------------------------------------------------

/**
 * クリ判定ヘルパ。
 * rng を引数で受けることでテスト再現性を担保する。
 *
 * @param critRate  Critical率（0〜1）
 * @param rng       0〜1 の乱数を返す関数
 * @returns         クリ判定結果
 */
export function rollCrit(critRate: number, rng: () => number): boolean {
  if (critRate <= 0) return false;
  if (critRate >= 1) return true;
  return rng() < critRate;
}

/**
 * 攻撃側ダメージ計算（マシン → 敵）。
 * 敵側の防御 / 軽減を引数で受ける。
 *
 * 計算式 (v1.3.3 で the tower 方式に統一: 割合軽減 → 絶対防御):
 *   raw_dmg = baseAttack × weaponDamageMultiplier
 *   クリ時:  raw_dmg ×= critMultiplier
 *   finalDmg = max(0, raw_dmg × (1 − enemyDamageReduction) − enemyDefense)
 */
export function calcOutgoingDamage(
  input: DamageCalcInput,
  enemyDefense: BigNum,
  enemyDamageReduction: number
): DamageCalcResult {
  const { machine, weapon, isCrit } = input;

  // raw_dmg = baseAttack × damageMultiplier
  let rawDmg = machine.baseAttack.mulNumber(weapon.damageMultiplier);

  // クリ時: raw_dmg ×= critMultiplier
  if (isCrit) {
    rawDmg = rawDmg.mulNumber(machine.critMultiplier);
  }

  // v1.3.3: the tower 方式 — 先に割合軽減、 その後に絶対防御を引く
  // raw_dmg × (1 − enemyDamageReduction)
  const afterReduction = applyReduction(rawDmg, enemyDamageReduction);
  // max(0, afterReduction − enemyDefense)
  const finalDmg = afterReduction.sub(enemyDefense); // sub は 0 以上を保証

  return { rawDmg, finalDmg, isCrit };
}

/**
 * タップ攻撃の「武器ダメージ倍率」 (v1.4.0)。 各武器の damageMul の位置に入る基準値。
 *
 * 現行武器倍率 (v1.3.x): Laser 1.6 / Cannon 6.0 / Thunder 0.9 / Cutter 2.4
 * タップは武器特性 (Thunder スタック、 Laser 上位敵ボーナス、 Cannon splash 等) を持たない
 * 素の手動攻撃。 「手動要素を加える」 目的のためタップは武器より基本的に強くなる位置 (2.0) で固定。
 * Laser (1.6) / Cutter (2.4) / Thunder (0.9) より高め、 Cannon (6.0) よりは低い。
 */
export const TAP_WEAPON_DAMAGE_MUL = 2.0;

/**
 * タップ攻撃のダメージ計算 (v1.4.0)。
 *
 * 武器の damageMul の位置に `TAP_WEAPON_DAMAGE_MUL × attackMul` を入れて calcOutgoingDamage を
 * 呼ぶラッパー。 通常攻撃と同じく critRate / critMultiplier を適用するため、 isCrit と
 * critRate は呼出側で `rollCrit(machine.critRate, rng)` で判定して渡す。
 *
 * 計算式:
 *   rawDmg = baseAttack × (TAP_WEAPON_DAMAGE_MUL × attackMul)
 *   クリ時:  rawDmg ×= critMultiplier
 *   finalDmg = max(0, rawDmg × (1 − enemyDR) − enemyDefense)
 *
 * @param machine             マシンスタッツ (baseAttack / critMultiplier 等)
 * @param attackMul           ラン中強化 (RunWorkshop attackMul) の倍率 = 1.0 + 0.1 × Lv
 * @param isCrit              呼出側で rollCrit 判定した結果
 * @param enemyDefense        敵防御 (絶対値)
 * @param enemyDamageReduction 敵割合軽減 (0〜1)
 */
export function calcTapDamage(
  machine: MachineStats,
  attackMul: number,
  isCrit: boolean,
  enemyDefense: BigNum,
  enemyDamageReduction: number
): DamageCalcResult {
  return calcOutgoingDamage(
    {
      machine,
      weapon: { damageMultiplier: TAP_WEAPON_DAMAGE_MUL * attackMul },
      isCrit,
    },
    enemyDefense,
    enemyDamageReduction
  );
}

/**
 * 被弾側ダメージ計算（敵 → マシン）。
 * マシンの防御 / 軽減を考慮する。
 *
 * 計算式 (v1.3.3 で the tower 方式に統一: 割合軽減 → 絶対防御):
 *   finalDmg = max(0, enemyAttack × (1 − machine.damageReduction) − machine.defense)
 *
 * 順序の意味:
 *   - 割合軽減を先に適用 → どんな大ダメージも一定割合まで減衰
 *   - 絶対防御を後に引く → 軽減後のダメージから固定値を差し引く
 *   - 結果: 軽減率が高いほど絶対防御の効きが相対的に薄くなる (the tower と同じ挙動)
 */
export function calcReceivedDamage(enemyAttack: BigNum, machine: MachineStats): BigNum {
  // v1.3.3: the tower 方式 — 先に割合軽減
  const afterReduction = applyReduction(enemyAttack, machine.damageReduction);
  // max(0, afterReduction − defense)
  return afterReduction.sub(machine.defense); // sub は 0 以上を保証
}
