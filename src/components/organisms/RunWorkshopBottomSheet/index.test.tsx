import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
  calcRunWorkshopMultiplier,
} from './items';

import type { RunWorkshopLevels } from './index';
import { RunWorkshopBottomSheet } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// items.ts の純粋関数テスト
// ---------------------------------------------------------------------------

describe('calcRunWorkshopCost', () => {
  test('攻撃力倍率 Lv 0→1 のコストは baseCost=10', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    expect(calcRunWorkshopCost(item, 0)).toBe(10);
  });

  test('攻撃力倍率 Lv 1→2 は ceil(10 × 1.3^1) = 13', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    expect(calcRunWorkshopCost(item, 1)).toBe(13);
  });

  test('ネジ獲得倍率 Lv 0→1 のコストは baseCost=50', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'screwGainMul')!;
    expect(calcRunWorkshopCost(item, 0)).toBe(50);
  });

  test('ネジ獲得倍率 Lv 1→2 は ceil(50 × 1.4^1) = 70', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'screwGainMul')!;
    expect(calcRunWorkshopCost(item, 1)).toBe(70);
  });
});

describe('calcRunWorkshopMultiplier', () => {
  test('Lv 0 は ×1.0', () => {
    expect(calcRunWorkshopMultiplier(0)).toBeCloseTo(1.0);
  });

  test('Lv 1 は ×1.1', () => {
    expect(calcRunWorkshopMultiplier(1)).toBeCloseTo(1.1);
  });

  test('Lv 10 は ×2.0', () => {
    expect(calcRunWorkshopMultiplier(10)).toBeCloseTo(2.0);
  });
});

describe('calcRunWorkshopMultiLvCost', () => {
  test('+5 Lv のコスト = 各 Lv コストの合計', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    const expected = [0, 1, 2, 3, 4]
      .map((i) => calcRunWorkshopCost(item, i))
      .reduce((a, b) => a + b, 0);
    expect(calcRunWorkshopMultiLvCost(item, 0, 5)).toBe(expected);
  });

  test('delta=0 のコストは 0', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    expect(calcRunWorkshopMultiLvCost(item, 3, 0)).toBe(0);
  });
});

describe('calcRunWorkshopMaxLv', () => {
  test('ネジ 0 のとき lvDelta=0, totalCost=BigNum.ZERO', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    const result = calcRunWorkshopMaxLv(item, 0, BigNum.ZERO);
    expect(result.lvDelta).toBe(0);
    expect(result.totalCost.isZero()).toBe(true);
  });

  test('ネジ 10 あれば Lv 0 → 1 分(コスト10)が購入可能', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'attackMul')!;
    const result = calcRunWorkshopMaxLv(item, 0, BigNum.fromNumber(10));
    expect(result.lvDelta).toBeGreaterThanOrEqual(1);
    expect(result.totalCost.lte(BigNum.fromNumber(10))).toBe(true);
  });

  test('totalCost <= availableScrew を常に満たす', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'screwGainMul')!;
    const available = BigNum.fromNumber(300);
    const { totalCost } = calcRunWorkshopMaxLv(item, 0, available);
    expect(totalCost.lte(available)).toBe(true);
  });
});

describe('RUN_WORKSHOP_ITEMS', () => {
  test('4 項目が定義されている', () => {
    expect(RUN_WORKSHOP_ITEMS).toHaveLength(4);
  });

  test('全項目が異なる key を持つ', () => {
    const keys = RUN_WORKSHOP_ITEMS.map((i) => i.key);
    expect(new Set(keys).size).toBe(4);
  });

  test('主 3 項目の baseCost=10, growth=1.3', () => {
    const mainItems = RUN_WORKSHOP_ITEMS.filter((i) => i.key !== 'screwGainMul');
    for (const item of mainItems) {
      expect(item.baseCost).toBe(10);
      expect(item.costGrowth).toBeCloseTo(1.3);
    }
  });

  test('ネジ獲得倍率の baseCost=50, growth=1.4', () => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === 'screwGainMul')!;
    expect(item.baseCost).toBe(50);
    expect(item.costGrowth).toBeCloseTo(1.4);
  });
});

// ---------------------------------------------------------------------------
// RunWorkshopBottomSheet コンポーネントテスト
// ---------------------------------------------------------------------------

const defaultLevels: RunWorkshopLevels = {
  attackMul: 0,
  attackSpeedMul: 0,
  hpMul: 0,
  screwGainMul: 0,
};

describe('RunWorkshopBottomSheet', () => {
  test('open=false のとき何も描画されない', () => {
    render(
      <RunWorkshopBottomSheet
        open={false}
        screw={BigNum.fromNumber(0)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.queryByText('攻撃力倍率')).toBeNull();
  });

  test('open=true のとき 4 項目のタイトルが描画される', () => {
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(0)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.getByText('攻撃力倍率')).toBeInTheDocument();
    expect(screen.getByText('攻撃速度倍率')).toBeInTheDocument();
    expect(screen.getByText('HP 倍率')).toBeInTheDocument();
    expect(screen.getByText('ネジ獲得倍率')).toBeInTheDocument();
  });

  test('全 Lv 0 は "Lv 0" が 4 つ表示される', () => {
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(0)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
      />
    );
    const lv0Labels = screen.getAllByText('Lv 0');
    expect(lv0Labels).toHaveLength(4);
  });

  test('ネジ不足のとき +1 ボタンが disabled になる', () => {
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(0)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+1' });
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });

  test('ネジ十分のとき +1 ボタンが enabled になる', () => {
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(10_000)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+1' });
    for (const btn of buttons) {
      expect(btn).not.toBeDisabled();
    }
  });

  test('+1 ボタンクリックで onUpgrade が key と delta=1 で呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(10_000)}
        levels={defaultLevels}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+1' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 1);
  });

  test('+5 ボタンクリックで onUpgrade が delta=5 で呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(10_000)}
        levels={defaultLevels}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+5' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 5);
  });

  test('MAX ボタンクリックで onUpgrade が delta="max" で呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(10_000)}
        levels={defaultLevels}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: 'MAX' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 'max');
  });

  test('onClose が渡されたとき、バックドロップクリックで呼ばれる', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <RunWorkshopBottomSheet
        open={true}
        screw={BigNum.fromNumber(0)}
        levels={defaultLevels}
        onUpgrade={() => undefined}
        onClose={onClose}
      />
    );
    // Sheet のバックドロップ（position:fixed / transparent の div）をクリック
    // Sheet 内で onClose が渡された場合に描画される backdrop div を探す
    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeNull();
    if (backdrop) {
      await userEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });
});
