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
 * 計算式:
 *   raw_dmg = baseAttack × weaponDamageMultiplier
 *   クリ時:  raw_dmg ×= critMultiplier
 *   finalDmg = max(0, raw_dmg − enemyDefense) × (1 − enemyDamageReduction)
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

  // max(0, raw_dmg − enemyDefense)
  const afterDefense = rawDmg.sub(enemyDefense); // sub は 0 以上を保証

  // × (1 − enemyDamageReduction)
  const finalDmg = applyReduction(afterDefense, enemyDamageReduction);

  return { rawDmg, finalDmg, isCrit };
}

/**
 * 被弾側ダメージ計算（敵 → マシン）。
 * マシンの防御 / 軽減を考慮する。
 *
 * 計算式:
 *   finalDmg = max(0, enemyAttack − machine.defense) × (1 − machine.damageReduction)
 */
export function calcReceivedDamage(enemyAttack: BigNum, machine: MachineStats): BigNum {
  // max(0, enemyAttack − defense)
  const afterDefense = enemyAttack.sub(machine.defense); // sub は 0 以上を保証

  // × (1 − damageReduction)
  return applyReduction(afterDefense, machine.damageReduction);
}
