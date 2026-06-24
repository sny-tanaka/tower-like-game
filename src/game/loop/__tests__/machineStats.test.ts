import { describe, expect, test } from 'vitest';

import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { buildMachineStats } from '@/game/loop/machineStats';
import { ATTACK_PER_SEC_CAP } from '@/hooks/useBattleLoop';
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

  test('attackSpeed Lv50: 乗算なので Lv0 より大きくなる', () => {
    const stats0 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 0 }),
    });
    const stats50 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 50 }),
    });
    expect(stats50.attackSpeed).toBeGreaterThan(stats0.attackSpeed);
  });

  test('attackSpeed Lv100: calcEffectValue(attackSpeedItem, 100) と一致する', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed')!;
    const expected = calcEffectValue(item, 100);
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 100 }),
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

  test('activePower Lv1 は 1 + 0.03 × 1 = 1.03 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activePower: 1 }),
    });
    expect(stats.activePower).toBeCloseTo(1.03, 5);
  });

  test('activePower Lv50 は 1 + 0.03 × 50 = 2.5 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activePower: 50 }),
    });
    expect(stats.activePower).toBeCloseTo(2.5, 5);
  });

  test('activePower Lv100 は 1 + 0.03 × 100 = 4.0 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activePower: 100 }),
    });
    expect(stats.activePower).toBeCloseTo(4.0, 5);
  });

  // --- activeCdReduction ---
  test('activeCdReduction Lv0 は 0 を返す', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 0 }),
    });
    expect(stats.activeCdReduction).toBe(0);
  });

  test('activeCdReduction Lv100 は 0.50 (v1.0.0: linear +0.5%/Lv MAX Lv 100)', () => {
    // v1.0.0: 旧 asymptotic_half → 線形 +0.5%/Lv MAX Lv 100 = 50%
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 100 }),
    });
    expect(stats.activeCdReduction).toBeCloseTo(0.5, 5);
  });

  test('activeCdReduction MAX (Lv 100) で 0.5、 それ以上は同値でキャップ', () => {
    const stats100 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 100 }),
    });
    const stats10000 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 10000 }),
    });
    expect(stats100.activeCdReduction).toBeCloseTo(0.5, 5);
    expect(stats10000.activeCdReduction).toBeCloseTo(0.5, 5);
  });

  test('activeCdReduction Lv50 は 0.25 (線形の途中)', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 50 }),
    });
    expect(stats.activeCdReduction).toBeCloseTo(0.25, 5);
  });
});

// ---------------------------------------------------------------------------
// effectivePerSec の計算式検証 (ATTACK_PER_SEC_CAP + attackSpeed 乗算)
// useBattleLoop の tick 内の計算式:
//   effectivePerSec = Math.min(ATTACK_PER_SEC_CAP, basePerSec * machine.attackSpeed * attackSpeedMul * overdriveAsMul)
// をここでは純粋な算術式として検証する。
// ---------------------------------------------------------------------------

describe('effectivePerSec 計算式 — attackSpeed 乗算とキャップ', () => {
  test('ATTACK_PER_SEC_CAP 定数が 10 であること', () => {
    expect(ATTACK_PER_SEC_CAP).toBe(10);
  });

  test('attackSpeed Lv0(=1) のとき basePerSec はそのまま (乗算効果ゼロ)', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 0 }),
    });
    // attackSpeed=1 × basePerSec=2.5 = 2.5
    const basePerSec = 2.5;
    const effective = Math.min(ATTACK_PER_SEC_CAP, basePerSec * stats.attackSpeed);
    expect(effective).toBeCloseTo(2.5, 5);
  });

  test('attackSpeed Lv が高いとき effectivePerSec は ATTACK_PER_SEC_CAP でクランプされる', () => {
    // 高 Lv では attackSpeed が非常に大きくなるため上限に到達する
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 500 }),
    });
    const basePerSec = 2.5; // Laser の底 AS
    const effective = Math.min(ATTACK_PER_SEC_CAP, basePerSec * stats.attackSpeed);
    expect(effective).toBe(ATTACK_PER_SEC_CAP);
  });

  test('attackSpeed 乗算で effectivePerSec は Lv=0 より大きくなる', () => {
    const stats0 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 0 }),
    });
    const stats10 = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ attackSpeed: 10 }),
    });
    const basePerSec = 0.5; // 低 AS 武器を想定 (Thunder 底値 0.7 未満)
    const eff0 = Math.min(ATTACK_PER_SEC_CAP, basePerSec * stats0.attackSpeed);
    const eff10 = Math.min(ATTACK_PER_SEC_CAP, basePerSec * stats10.attackSpeed);
    expect(eff10).toBeGreaterThan(eff0);
  });
});

// ---------------------------------------------------------------------------
// アクティブ CD 短縮: DEFAULT_ACTIVE_MAX_SEC × (1 - activeCdReduction)
// ---------------------------------------------------------------------------

describe('activeCdReduction によるアクティブ CD 短縮', () => {
  const DEFAULT_ACTIVE_MAX_SEC = 60; // battle.ts の定数と一致させる

  test('activeCdReduction=0 のとき effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 0 }),
    });
    const effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - stats.activeCdReduction);
    expect(effectiveCdSec).toBeCloseTo(DEFAULT_ACTIVE_MAX_SEC, 5);
  });

  test('activeCdReduction Lv50(=0.25) のとき effectiveCdSec = 60 × 0.75 = 45', () => {
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 50 }),
    });
    const effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - stats.activeCdReduction);
    expect(effectiveCdSec).toBeCloseTo(45, 2);
  });

  test('activeCdReduction MAX (Lv 100) で effectiveCdSec = 30 秒 (60 × 0.5、 cap 50%)', () => {
    // v1.0.0: MAX Lv 100 で 50% 減 = 効果的に 30 秒 (60 × 0.5)
    const stats = buildMachineStats({
      machineMaxHp: zeroHp,
      machineLevels: makeZeroLevels({ activeCdReduction: 100000 }),
    });
    const effectiveCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - stats.activeCdReduction);
    expect(effectiveCdSec).toBeCloseTo(30, 5);
    expect(effectiveCdSec).toBeLessThanOrEqual(DEFAULT_ACTIVE_MAX_SEC);
  });
});

// ---------------------------------------------------------------------------
// 経済系 gainMul (screwGain / boltGain / alloyGain)
// useBattleLoop では buildMachineStats を経由せず calcEffectValue を直接呼ぶ設計だが、
// MACHINE_UPGRADE_ITEMS の定義が正しいことを検証する。
// ---------------------------------------------------------------------------

describe('経済系 gainMul — MACHINE_UPGRADE_ITEMS 定義の正しさ', () => {
  test('screwGain Lv0 は 1.0 を返す (線形, 初期値 1.0)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'screwGain')!;
    expect(calcEffectValue(item, 0)).toBe(1.0);
  });

  test('screwGain Lv10 は 1.0 + 0.03 × 10 = 1.3 を返す', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'screwGain')!;
    expect(calcEffectValue(item, 10)).toBeCloseTo(1.3, 5);
  });

  test('boltGain Lv0 は 1.0 を返す', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'boltGain')!;
    expect(calcEffectValue(item, 0)).toBe(1.0);
  });

  test('boltGain Lv50 は 1.0 + 0.03 × 50 = 2.5 を返す', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'boltGain')!;
    expect(calcEffectValue(item, 50)).toBeCloseTo(2.5, 5);
  });

  test('alloyGain Lv0 は 1.0 を返す', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'alloyGain')!;
    expect(calcEffectValue(item, 0)).toBe(1.0);
  });

  test('alloyGain Lv100 は 1.0 + 0.03 × 100 = 4.0 を返す', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'alloyGain')!;
    expect(calcEffectValue(item, 100)).toBeCloseTo(4.0, 5);
  });

  test('screwGain / boltGain / alloyGain は同一スケール (linear +0.03/Lv) を持つ', () => {
    const keys = ['screwGain', 'boltGain', 'alloyGain'] as const;
    const lv = 30;
    const expected = 1.0 + 0.03 * lv; // 1.9
    for (const key of keys) {
      const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === key)!;
      expect(calcEffectValue(item, lv)).toBeCloseTo(expected, 5);
    }
  });
});
