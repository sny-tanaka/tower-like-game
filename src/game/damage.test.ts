import { describe, expect, it } from 'vitest';

import { calcOutgoingDamage, calcReceivedDamage, rollCrit } from './damage';
import type { MachineStats, WeaponStats } from './damage.types';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テスト用ファクトリ
// ---------------------------------------------------------------------------

function makeMachine(overrides: Partial<MachineStats> = {}): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(100),
    defense: BigNum.fromNumber(10),
    damageReduction: 0,
    critRate: 0,
    critMultiplier: 1.5,
    maxHp: BigNum.fromNumber(1000),
    hpRegen: BigNum.fromNumber(1),
    attackSpeed: 1,
    activePower: 1,
    activeCdReduction: 0,
    range: 150,
    ...overrides,
  };
}

function makeWeapon(overrides: Partial<WeaponStats> = {}): WeaponStats {
  return {
    damageMultiplier: 1.0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// rollCrit
// ---------------------------------------------------------------------------

describe('rollCrit', () => {
  it('critRate=0 のとき常に false', () => {
    expect(rollCrit(0, () => 0)).toBe(false);
    expect(rollCrit(0, () => 0.99)).toBe(false);
  });

  it('critRate=1 のとき常に true', () => {
    expect(rollCrit(1, () => 0)).toBe(true);
    expect(rollCrit(1, () => 0.99)).toBe(true);
  });

  it('rng=0 のとき critRate > 0 なら true（境界: 0 < critRate）', () => {
    expect(rollCrit(0.01, () => 0)).toBe(true);
    expect(rollCrit(0.5, () => 0)).toBe(true);
  });

  it('rng=1 のとき critRate < 1 なら false（境界: rng >= critRate）', () => {
    // rng() の戻り値が 1.0 であれば critRate が何であれ false
    expect(rollCrit(0.99, () => 1)).toBe(false);
    expect(rollCrit(0.5, () => 1)).toBe(false);
  });

  it('rng が critRate と等しいとき false（rng < critRate でない）', () => {
    expect(rollCrit(0.5, () => 0.5)).toBe(false);
  });

  it('rng < critRate のとき true', () => {
    expect(rollCrit(0.5, () => 0.499)).toBe(true);
  });

  it('rng > critRate のとき false', () => {
    expect(rollCrit(0.5, () => 0.501)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// calcOutgoingDamage — 通常攻撃
// ---------------------------------------------------------------------------

describe('calcOutgoingDamage — 通常攻撃', () => {
  it('rawDmg = baseAttack × damageMultiplier', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 2.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.ZERO, 0);
    expect(result.rawDmg.toString()).toBe('200');
    expect(result.isCrit).toBe(false);
  });

  it('damageMultiplier=1.5 の小数倍率', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.5 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.ZERO, 0);
    expect(result.rawDmg.toString()).toBe('150');
  });
});

// ---------------------------------------------------------------------------
// calcOutgoingDamage — クリティカル
// ---------------------------------------------------------------------------

describe('calcOutgoingDamage — クリティカル', () => {
  it('クリ時: rawDmg ×= critMultiplier (1.5)', () => {
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(100),
      critMultiplier: 1.5,
    });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: true }, BigNum.ZERO, 0);
    // 100 × 1.0 × 1.5 = 150
    expect(result.rawDmg.toString()).toBe('150');
    expect(result.isCrit).toBe(true);
  });

  it('クリ時: rawDmg ×= critMultiplier (2.0)', () => {
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(200),
      critMultiplier: 2.0,
    });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: true }, BigNum.ZERO, 0);
    // 200 × 2.0 = 400
    expect(result.rawDmg.toString()).toBe('400');
  });

  it('非クリ時は critMultiplier を乗算しない', () => {
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(100),
      critMultiplier: 3.0,
    });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.ZERO, 0);
    expect(result.rawDmg.toString()).toBe('100');
  });
});

// ---------------------------------------------------------------------------
// calcOutgoingDamage — 防御力
// ---------------------------------------------------------------------------

describe('calcOutgoingDamage — 防御力', () => {
  it('防御 < raw_dmg → finalDmg = raw_dmg - defense', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const enemyDefense = BigNum.fromNumber(30);
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, enemyDefense, 0);
    // 100 - 30 = 70
    expect(result.finalDmg.toString()).toBe('70');
  });

  it('防御 > raw_dmg → finalDmg = 0（クランプ）', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(10) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const enemyDefense = BigNum.fromNumber(50);
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, enemyDefense, 0);
    expect(result.finalDmg.toString()).toBe('0');
  });

  it('防御 = raw_dmg → finalDmg = 0', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(50) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const enemyDefense = BigNum.fromNumber(50);
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, enemyDefense, 0);
    expect(result.finalDmg.toString()).toBe('0');
  });
});

// ---------------------------------------------------------------------------
// calcOutgoingDamage — 被ダメ軽減率
// ---------------------------------------------------------------------------

describe('calcOutgoingDamage — 軽減率', () => {
  it('軽減率 0% → finalDmg = raw - defense', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.fromNumber(20), 0);
    // (100 - 20) × 1.0 = 80
    expect(result.finalDmg.toString()).toBe('80');
  });

  it('軽減率 50% → finalDmg = (raw - defense) × 0.5', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage(
      { machine, weapon, isCrit: false },
      BigNum.fromNumber(20),
      0.5
    );
    // (100 - 20) × 0.5 = 40
    expect(result.finalDmg.toString()).toBe('40');
  });

  it('軽減率 100% → finalDmg = 0', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.ZERO, 1);
    expect(result.finalDmg.toString()).toBe('0');
  });

  it('軽減率 33.3% → 概ね 2/3 に軽減', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(300) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    // 300 × (1 - 1/3) = 200
    const result = calcOutgoingDamage({ machine, weapon, isCrit: false }, BigNum.ZERO, 1 / 3);
    // mulNumber は切り上げ整数なので 200 or 201 の範囲を許容
    const val = parseInt(result.finalDmg.toString(), 10);
    expect(val).toBeGreaterThanOrEqual(200);
    expect(val).toBeLessThanOrEqual(201);
  });
});

// ---------------------------------------------------------------------------
// calcReceivedDamage
// ---------------------------------------------------------------------------

describe('calcReceivedDamage', () => {
  it('防御力と軽減率がゼロの場合: finalDmg = enemyAttack', () => {
    const machine = makeMachine({
      defense: BigNum.ZERO,
      damageReduction: 0,
    });
    const result = calcReceivedDamage(BigNum.fromNumber(100), machine);
    expect(result.toString()).toBe('100');
  });

  it('防御力 < 攻撃力 → finalDmg = (enemyAttack - defense) × (1 - reduction)', () => {
    const machine = makeMachine({
      defense: BigNum.fromNumber(20),
      damageReduction: 0.5,
    });
    // (100 - 20) × 0.5 = 40
    const result = calcReceivedDamage(BigNum.fromNumber(100), machine);
    expect(result.toString()).toBe('40');
  });

  it('防御力 > 攻撃力 → finalDmg = 0', () => {
    const machine = makeMachine({
      defense: BigNum.fromNumber(200),
      damageReduction: 0,
    });
    const result = calcReceivedDamage(BigNum.fromNumber(50), machine);
    expect(result.toString()).toBe('0');
  });

  it('軽減率 100% → finalDmg = 0', () => {
    const machine = makeMachine({
      defense: BigNum.ZERO,
      damageReduction: 1,
    });
    const result = calcReceivedDamage(BigNum.fromNumber(100), machine);
    expect(result.toString()).toBe('0');
  });

  it('軽減率 50% → 半減', () => {
    const machine = makeMachine({
      defense: BigNum.ZERO,
      damageReduction: 0.5,
    });
    // 200 × 0.5 = 100
    const result = calcReceivedDamage(BigNum.fromNumber(200), machine);
    expect(result.toString()).toBe('100');
  });

  it('クリティカル込みの攻撃力を正しく処理', () => {
    const machine = makeMachine({
      defense: BigNum.fromNumber(10),
      damageReduction: 0.25,
    });
    // enemyAttack=110, afterDefense=100, finalDmg = 100 × 0.75 = 75
    const result = calcReceivedDamage(BigNum.fromNumber(110), machine);
    expect(result.toString()).toBe('75');
  });
});
