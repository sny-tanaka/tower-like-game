import { describe, expect, test } from 'vitest';

import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { buildMachineStats } from '@/game/loop/machineStats';
import { BigNum } from '@/lib/bignum';
import type { MachineLevels } from '@/store/slices/machine';

// MachineLevels の全キーを 0 で初期化するヘルパー
function makeZeroLevels(overrides: Partial<MachineLevels> = {}): MachineLevels {
  return {
    maxHp: 0,
    hpRegen: 0,
    damageReduction: 0,
    defense: 0,
    baseAttack: 0,
    attackSpeed: 0,
    range: 0,
    critRate: 0,
    critMultiplier: 0,
    activePower: 0,
    activeCdReduction: 0,
    screwGain: 0,
    boltGain: 0,
    alloyGain: 0,
    patchDropRate: 0,
    patchSlots: 0,
    ...overrides,
  };
}

const zeroHp = BigNum.fromNumber(100);

describe('buildMachineStats — 未反映 5 項目', () => {
  // --- attackSpeed ---
  test('attackSpeed Lv0 は 1.0 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 0 }),
    });
    expect(stats.attackSpeed).toBe(1);
  });

  test('attackSpeed Lv10 は calcEffectValue(attackSpeedItem, 10) と一致する', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed')!;
    const expected = calcEffectValue(item, 10);
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 10 }),
    });
    expect(stats.attackSpeed).toBe(expected);
  });

  // --- activePower ---
  test('activePower Lv0 は 1.0 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activePower: 0 }),
    });
    expect(stats.activePower).toBe(1.0);
  });

  test('activePower Lv50 は 1 + 0.03 × 50 = 2.5 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activePower: 50 }),
    });
    expect(stats.activePower).toBeCloseTo(2.5, 5);
  });

  // --- activeCdReduction ---
  test('activeCdReduction Lv0 は 0 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 0 }),
    });
    expect(stats.activeCdReduction).toBe(0);
  });

  test('activeCdReduction Lv100 は 0.5 × (1 - 1/(1+1)) = 0.25 を返す', () => {
    // asymptotic_half: r = 0.01 × 100 = 1, 値 = 0.5 × (1 - 1/(1+1)) = 0.25
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 100 }),
    });
    expect(stats.activeCdReduction).toBeCloseTo(0.25, 5);
  });
});
