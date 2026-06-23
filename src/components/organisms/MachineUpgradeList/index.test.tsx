import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import { MACHINE_UPGRADE_ITEMS, calcCost, calcEffectValue } from './items';

import { MachineUpgradeList } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// テスト前に store をリセット
// ---------------------------------------------------------------------------

beforeEach(() => {
  useStore.getState().resetMachine();
  useStore.getState().resetCurrencies();
});

// ---------------------------------------------------------------------------
// items.ts の純粋関数テスト
// ---------------------------------------------------------------------------

describe('calcEffectValue', () => {
  test('multiply: Lv 0 は baseValue をそのまま切り上げ', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcEffectValue(item, 0)).toBe(100); // 100 × 1.02^0 = 100
  });

  test('multiply: Lv 1 は baseValue × growthFactor 切り上げ', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcEffectValue(item, 1)).toBe(102); // 100 × 1.02 = 102
  });

  test('multiply: 累積差分で base=1 でも Lv up で必ず +1 上がる', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'baseAttack')!;
    // base=1, factor=1.02 では従来 ceil(1 × 1.02^Lv) で Lv 1〜35 まで 2 のまま停滞していたが、
    // 新仕様は「累積差分 + 最低 +1」 で必ず Lv up で増える
    expect(calcEffectValue(item, 0)).toBe(1);
    expect(calcEffectValue(item, 1)).toBe(2);
    expect(calcEffectValue(item, 5)).toBe(6); // 1 + 5
    expect(calcEffectValue(item, 50)).toBe(51); // 1 + 50
  });

  test('multiply: 高 Lv では差分が指数増加 (base=100, factor=1.02)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    // base=100, factor=1.02 → 高 Lv では差分も指数的に増える
    const v100 = calcEffectValue(item, 100);
    const v101 = calcEffectValue(item, 101);
    expect(v101 - v100).toBeGreaterThan(1); // 最低 +1 を超えて指数加速
  });

  test('linear: Lv 0 は baseValue', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critMultiplier')!;
    expect(calcEffectValue(item, 0)).toBe(1.5);
  });

  test('linear: Lv 10 は baseValue + growthFactor × 10', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critMultiplier')!;
    expect(calcEffectValue(item, 10)).toBeCloseTo(2.0); // 1.5 + 0.05 × 10
  });

  test('asymptotic: Lv 0 は 0', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critRate')!;
    expect(calcEffectValue(item, 0)).toBe(0);
  });

  test('asymptotic: Lv 100 は約 0.5', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critRate')!;
    // r = 0.01 × 100 = 1, 1 - 1/(1+1) = 0.5
    expect(calcEffectValue(item, 100)).toBeCloseTo(0.5);
  });

  test('asymptotic_half: Lv 100 は約 0.25 (CD 漸近)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction')!;
    // r = 0.01 × 100 = 1, 0.5 × (1 - 1/(1+1)) = 0.25
    expect(calcEffectValue(item, 100)).toBeCloseTo(0.25);
  });

  test('range_asymptotic: Lv 0 は 150 (base)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    expect(calcEffectValue(item, 0)).toBe(150);
  });

  test('range_asymptotic: Lv 100 は約 275 px', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    // r = 0.01 × 100 = 1, 150 + 250 × (1 - 0.5) = 150 + 125 = 275
    expect(calcEffectValue(item, 100)).toBe(275);
  });

  test('fixed_step: patchSlots Lv 0 = 1', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!;
    expect(calcEffectValue(item, 0)).toBe(1);
  });

  test('fixed_step: patchSlots Lv 3 = 4', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!;
    expect(calcEffectValue(item, 3)).toBe(4);
  });
});

describe('calcCost', () => {
  test('Defensive 系 Lv 0→1 のコストは baseCost=100', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcCost(item, 0)).toBe(100); // 100 × 1.10^0 = 100
  });

  test('Defensive 系 Lv 1→2 のコストは切り上げ整数', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcCost(item, 1)).toBe(Math.ceil(100 * 1.1));
  });

  test('Economic 系 Lv 0→1 のコストは baseCost=200', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'screwGain')!;
    expect(calcCost(item, 0)).toBe(200);
  });

  test('patchSlots Lv 0→1 のコストは 2000', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!;
    expect(calcCost(item, 0)).toBe(2000);
  });

  test('patchSlots Lv 1→2 のコストは 20000', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!;
    expect(calcCost(item, 1)).toBe(20000); // 2000 × 10^1
  });
});

describe('MACHINE_UPGRADE_ITEMS', () => {
  test('全 16 項目が定義されている', () => {
    expect(MACHINE_UPGRADE_ITEMS).toHaveLength(16);
  });

  test('全項目が異なる key を持つ', () => {
    const keys = MACHINE_UPGRADE_ITEMS.map((i) => i.key);
    expect(new Set(keys).size).toBe(16);
  });

  test('各カテゴリの項目数が仕様通り', () => {
    const counts: Record<string, number> = {};
    for (const item of MACHINE_UPGRADE_ITEMS) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    expect(counts['defense']).toBe(4);
    expect(counts['offense']).toBe(5);
    expect(counts['active']).toBe(2);
    expect(counts['economy']).toBe(4);
    expect(counts['slot']).toBe(1);
  });

  test('patchSlots の maxLv は 5', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!;
    expect(item.maxLv).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// MachineUpgradeList コンポーネントテスト
// ---------------------------------------------------------------------------

describe('MachineUpgradeList', () => {
  test('全 16 項目のタイトルが描画される', () => {
    render(<MachineUpgradeList />);
    for (const item of MACHINE_UPGRADE_ITEMS) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  test('初期状態（Lv 0）では全項目が "Lv 0" と表示される', () => {
    render(<MachineUpgradeList />);
    const lv0Labels = screen.getAllByText('Lv 0');
    expect(lv0Labels).toHaveLength(16);
  });

  test('ボルト不足時は +1 ボタンが disabled', () => {
    // bolt = 0 のままレンダー
    render(<MachineUpgradeList />);
    const buttons = screen.getAllByRole('button', { name: '+1' });
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });

  test('ボルト十分 → +1 クリックで Lv が 1 上がりボルトが減る', async () => {
    useStore.getState().addBolt(BigNum.fromNumber(10_000));
    render(<MachineUpgradeList />);

    // maxHp の +1 ボタン（disabled 解除されているはず）
    const buttons = screen.getAllByRole('button', { name: '+1' });
    await userEvent.click(buttons[0]);

    // machineLevels['maxHp'] が 1 になっているはず
    expect(useStore.getState().machineLevels['maxHp']).toBe(1);
    // bolt が減っているはず（cost = 100）
    expect(useStore.getState().bolt.lt(BigNum.fromNumber(10_000))).toBe(true);
  });

  test('patchSlots が maxLv(5) に達すると MAX バッジが表示される', () => {
    useStore.getState().setMachineLv('patchSlots', 5);
    const { container } = render(<MachineUpgradeList />);
    // maxed=true のカードは data-maxed="true" 属性を持つ
    const maxedCards = container.querySelectorAll('[data-maxed="true"]');
    expect(maxedCards.length).toBeGreaterThanOrEqual(1);
    // patchSlots カード内に MAX バッジが存在
    const patchSlotsCard = Array.from(maxedCards).find(
      (el) => el.getAttribute('aria-label') === 'パッチスロット数'
    );
    expect(patchSlotsCard).toBeDefined();
    expect(patchSlotsCard!.textContent).toContain('MAX');
  });
});
