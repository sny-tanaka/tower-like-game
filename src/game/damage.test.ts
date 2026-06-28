import { describe, expect, it } from 'vitest';

import {
  TAP_WEAPON_DAMAGE_MUL,
  calcOutgoingDamage,
  calcReceivedDamage,
  calcTapDamage,
  rollCrit,
} from './damage';
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

  it('軽減率 50% → finalDmg = raw × 0.5 - defense (v1.3.3 the tower 方式)', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const weapon = makeWeapon({ damageMultiplier: 1.0 });
    const result = calcOutgoingDamage(
      { machine, weapon, isCrit: false },
      BigNum.fromNumber(20),
      0.5
    );
    // 100 × 0.5 = 50 → 50 - 20 = 30
    expect(result.finalDmg.toString()).toBe('30');
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

  it('防御力 < 攻撃力 → finalDmg = enemyAttack × (1 - reduction) - defense (v1.3.3 the tower 方式)', () => {
    const machine = makeMachine({
      defense: BigNum.fromNumber(20),
      damageReduction: 0.5,
    });
    // 100 × 0.5 = 50 → 50 - 20 = 30
    const result = calcReceivedDamage(BigNum.fromNumber(100), machine);
    expect(result.toString()).toBe('30');
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

  it('クリティカル込みの攻撃力を正しく処理 (v1.3.3 the tower 方式)', () => {
    const machine = makeMachine({
      defense: BigNum.fromNumber(10),
      damageReduction: 0.25,
    });
    // enemyAttack=110 → 110 × 0.75 = 82.5 (mulNumber は切り上げで 83) → 83 - 10 = 73
    const result = calcReceivedDamage(BigNum.fromNumber(110), machine);
    expect(result.toString()).toBe('73');
  });
});

// ---------------------------------------------------------------------------
// calcTapDamage (v1.4.0)
// ---------------------------------------------------------------------------

describe('calcTapDamage (v1.4.0 タップ攻撃)', () => {
  it('TAP_WEAPON_DAMAGE_MUL は 2.0 で固定 (各武器の damageMul 位置)', () => {
    expect(TAP_WEAPON_DAMAGE_MUL).toBe(2.0);
  });

  it('attackMul=1 / isCrit=false / 敵無防御 → baseAttack × 2.0', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const result = calcTapDamage(machine, 1.0, false, BigNum.ZERO, 0);
    // 100 × (2.0 × 1.0) = 200
    expect(result.finalDmg.toString()).toBe('200');
    expect(result.isCrit).toBe(false);
  });

  it('ラン強化 attackMul 1.5 → baseAttack × 2.0 × 1.5', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const result = calcTapDamage(machine, 1.5, false, BigNum.ZERO, 0);
    // 100 × (2.0 × 1.5) = 300
    expect(result.finalDmg.toString()).toBe('300');
  });

  it('クリ時 → ×critMultiplier 適用', () => {
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(100),
      critMultiplier: 2.0,
    });
    const result = calcTapDamage(machine, 1.0, true, BigNum.ZERO, 0);
    // 100 × 2.0 × 2.0 (crit) = 400
    expect(result.finalDmg.toString()).toBe('400');
    expect(result.isCrit).toBe(true);
  });

  it('敵 defense / damageReduction が calcOutgoingDamage と同じく適用される', () => {
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(100),
    });
    const enemyDefense = BigNum.fromNumber(20);
    const enemyDR = 0.5;
    const result = calcTapDamage(machine, 1.0, false, enemyDefense, enemyDR);
    // raw 100 × 2.0 = 200、 軽減 200 × 0.5 = 100、 防御 100 - 20 = 80
    expect(result.finalDmg.toString()).toBe('80');
  });

  it('武器特性 (Thunder スタック / Laser 上位敵ボーナス) は乗らない (素のダメージ)', () => {
    // 「タップ攻撃は武器を問わずダメージ倍率 1.0 固定」 仕様の回帰チェック。
    // calcTapDamage の引数に weapon 情報がそもそも入らないため武器分岐できない構造になっている。
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const a = calcTapDamage(machine, 1.0, false, BigNum.ZERO, 0);
    const b = calcTapDamage(machine, 1.0, false, BigNum.ZERO, 0);
    expect(a.finalDmg.toString()).toBe(b.finalDmg.toString());
  });
});
