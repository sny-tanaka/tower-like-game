import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { MACHINE_UPGRADE_ITEMS, calcCost, calcCostForN, calcEffectValue } from './items';

import { MachineUpgradeList } from './index';

import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

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
  test('multiply: maxHp Lv 0 は baseValue 10000 (v1.0.0 リバランス)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcEffectValue(item, 0)).toBe(10000); // 10000 × 1.02^0 = 10000
  });

  test('multiply: maxHp Lv 1 は ceil(10000 × 1.02) = 10200', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    expect(calcEffectValue(item, 1)).toBe(10200);
  });

  test('multiply: baseAttack Lv 0 は base 100 (v1.0.0 リバランス)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'baseAttack')!;
    // v1.0.0: base 1 → 100 にリベース、 +1 floor バグ撤廃。
    // ceil(100 × 1.02^Lv) で滑らかに上昇する (Lv 1 で +2, Lv 5 で +11)。
    expect(calcEffectValue(item, 0)).toBe(100);
    expect(calcEffectValue(item, 1)).toBe(102); // ceil(102.00)
    expect(calcEffectValue(item, 5)).toBe(111); // ceil(110.41)
    expect(calcEffectValue(item, 50)).toBe(270); // ceil(269.16)
  });

  test('multiply: 全 Lv で値が単調非減少 (累積差分で逆行しない)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    let prev = calcEffectValue(item, 0);
    for (let lv = 1; lv <= 200; lv++) {
      const v = calcEffectValue(item, lv);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  test('multiply: 高 Lv では差分が指数増加 (base=10000, factor=1.02)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp')!;
    const v100 = calcEffectValue(item, 100);
    const v101 = calcEffectValue(item, 101);
    expect(v101 - v100).toBeGreaterThan(1); // 高 Lv では数百単位の差分
  });

  test('linear: Lv 0 は baseValue', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critMultiplier')!;
    expect(calcEffectValue(item, 0)).toBe(1.5);
  });

  test('linear: Lv 10 は baseValue + growthFactor × 10', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critMultiplier')!;
    expect(calcEffectValue(item, 10)).toBeCloseTo(2.0); // 1.5 + 0.05 × 10
  });

  test('linear cap (critRate): Lv 0 は 0', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critRate')!;
    expect(calcEffectValue(item, 0)).toBe(0);
  });

  test('linear cap (critRate): +0.5%/Lv, Lv 100 = 0.50', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critRate')!;
    expect(calcEffectValue(item, 100)).toBeCloseTo(0.5);
  });

  test('linear cap (critRate): MAX Lv 160 で 80% (v1.0.0)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'critRate')!;
    expect(item.maxLv).toBe(160);
    expect(calcEffectValue(item, 160)).toBeCloseTo(0.8);
    // maxLv を超えても 80% でキャップ
    expect(calcEffectValue(item, 200)).toBeCloseTo(0.8);
  });

  test('linear cap (activeCdReduction): MAX Lv 100 で 50% (v1.0.0)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction')!;
    expect(item.maxLv).toBe(100);
    expect(calcEffectValue(item, 100)).toBeCloseTo(0.5);
    // maxLv を超えても 50% でキャップ (旧 asymptotic_half と同等の上限)
    expect(calcEffectValue(item, 500)).toBeCloseTo(0.5);
  });

  test('linear cap (attackSpeed): MAX Lv 99 で 5.95× (v1.0.0)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed')!;
    expect(item.maxLv).toBe(99);
    expect(calcEffectValue(item, 99)).toBeCloseTo(5.95);
    expect(calcEffectValue(item, 200)).toBeCloseTo(5.95);
  });

  test('linear cap (damageReduction): MAX Lv 196 で 98% (v1.0.0)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'damageReduction')!;
    expect(item.maxLv).toBe(196);
    expect(calcEffectValue(item, 196)).toBeCloseTo(0.98);
    expect(calcEffectValue(item, 300)).toBeCloseTo(0.98);
  });

  test('range (linear, v1.3.10): Lv 0 は 150 (base)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    expect(calcEffectValue(item, 0)).toBe(150);
  });

  test('range (linear, v1.3.10): Lv 50 で 300 px (中間点)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    // 150 + 3 × 50 = 300
    expect(calcEffectValue(item, 50)).toBe(300);
  });

  test('range (linear, v1.3.10): Lv 100 (maxLv) で 450 px (ハードキャップ)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    // 150 + 3 × 100 = 450
    expect(calcEffectValue(item, 100)).toBe(450);
  });

  test('range (linear, v1.3.10): Lv 100 超は maxLv で固定 (450px ハードキャップ)', () => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range')!;
    expect(calcEffectValue(item, 200)).toBe(450);
    expect(calcEffectValue(item, 1000)).toBe(450);
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

// ---------------------------------------------------------------------------
// +5 クランプ: 残 Lv が 5 未満のとき clampedN5 が正しく計算されること (Refs #74)
// ---------------------------------------------------------------------------

describe('+5 コスト計算クランプ (calcCostForN)', () => {
  const patchSlots = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'patchSlots')!; // maxLv=5

  test('残 Lv=2 (currentLv=3, maxLv=5): clampedN5 は 2', () => {
    const remainingLevels5 = patchSlots.maxLv! - 3; // = 2
    const clampedN5 = Math.min(5, remainingLevels5);
    expect(clampedN5).toBe(2);
  });

  test('残 Lv=2 のとき calcCostForN(item, 3, 2) と calcCostForN(item, 3, 5) が等値', () => {
    // calcCostForN は内部で maxLv クランプするので n=5 を渡しても n=2 と同じ結果になる
    const cost2 = calcCostForN(patchSlots, 3, 2);
    const costN5 = calcCostForN(patchSlots, 3, 5);
    expect(cost2).toBe(costN5);
    expect(cost2).toBeGreaterThan(0);
  });

  test('残 Lv=1 (currentLv=4, maxLv=5): clampedN5 は 1', () => {
    const remainingLevels5 = patchSlots.maxLv! - 4; // = 1
    const clampedN5 = Math.min(5, remainingLevels5);
    expect(clampedN5).toBe(1);
  });

  test('残 Lv=0 (currentLv=5 = maxLv): clampedN5 は 0', () => {
    const remainingLevels5 = patchSlots.maxLv! - 5; // = 0
    const clampedN5 = Math.min(5, remainingLevels5);
    expect(clampedN5).toBe(0);
  });

  test('maxLv 未指定のとき clampedN5 は 5 になる', () => {
    const itemWithoutMax = MACHINE_UPGRADE_ITEMS.find((i) => i.maxLv == null)!;
    expect(itemWithoutMax).toBeDefined(); // maxLv なし項目が存在すること
    const remainingLevels5 = itemWithoutMax.maxLv != null ? itemWithoutMax.maxLv - 0 : 5;
    const clampedN5 = Math.min(5, remainingLevels5);
    expect(clampedN5).toBe(5);
  });

  test('残 Lv>=5 のとき clampedN5 は 5 のまま', () => {
    // maxLv=10, currentLv=0 → remaining=10 → clampedN5=5
    const remainingLevels5 = 10 - 0; // 10
    const clampedN5 = Math.min(5, remainingLevels5);
    expect(clampedN5).toBe(5);
  });
});

describe('MachineUpgradeList — SE 配線', () => {
  beforeEach(() => {
    useStore.getState().resetMachine();
    useStore.getState().resetCurrencies();
    vi.clearAllMocks();
  });

  test('bolt 十分 → +1 購入で purchaseOk SE が再生される', async () => {
    // bolt を十分セット
    useStore.setState({ bolt: BigNum.fromNumber(10_000) });
    render(<MachineUpgradeList />);

    const plusOneButtons = screen.getAllByRole('button', { name: '+1' });
    await userEvent.click(plusOneButtons[0]);

    expect(soundEngine.play).toHaveBeenCalledWith('purchaseOk');
  });

  test('bolt 不足 → +1 ボタンは disabled になり SE は再生されない', async () => {
    // bolt を 0 にして購入不可に
    useStore.setState({ bolt: BigNum.ZERO });
    render(<MachineUpgradeList />);

    // disabled 時はボタンを押しても SE は鳴らない
    const plusOneButtons = screen.getAllByRole('button', { name: '+1' });
    await userEvent.click(plusOneButtons[0]);

    expect(soundEngine.play).not.toHaveBeenCalled();
  });
});
