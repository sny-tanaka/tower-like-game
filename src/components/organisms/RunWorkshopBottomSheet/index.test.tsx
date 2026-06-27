import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';

import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
  calcRunWorkshopMultiplier,
} from './items';

import { RunWorkshopBottomSheet } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

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
//
// v1.3.7 Phase 4-C: RunWorkshopBottomSheet は screw / runWorkshopLevels / runWorkshopAutoEnabled
// を内部 useStore selector で直接購読するようになったため、 props から渡せない (= seed する必要がある)。
// 親 props として残っているのは open / callback (onUpgrade / onToggleAuto / onClose)。

// 各テスト後に store を defaultBattleState 相当に戻す (state リーク防止)
afterEach(() => {
  resetBattleState();
});

describe('RunWorkshopBottomSheet', () => {
  test('open=false のとき何も描画されない', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={false}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.queryByText('攻撃力倍率')).toBeNull();
  });

  test('open=true のとき 4 項目のタイトルが描画される', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.getByText('攻撃力倍率')).toBeInTheDocument();
    expect(screen.getByText('攻撃速度倍率')).toBeInTheDocument();
    expect(screen.getByText('HP 倍率')).toBeInTheDocument();
    expect(screen.getByText('ネジ獲得倍率')).toBeInTheDocument();
  });

  test('全 Lv 0 は "Lv 0" が 4 つ表示される', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
      />
    );
    const lv0Labels = screen.getAllByText('Lv 0');
    expect(lv0Labels).toHaveLength(4);
  });

  test('ネジ不足のとき +1 ボタンが disabled になる', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+1' });
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });

  test('ネジ十分のとき +1 ボタンが enabled になる', () => {
    seedBattleState({ screw: BigNum.fromNumber(10_000) });
    render(
      <RunWorkshopBottomSheet
        open={true}
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
    seedBattleState({ screw: BigNum.fromNumber(10_000) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+1' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 1);
  });

  test('+5 ボタンクリックで onUpgrade が delta=5 で呼ばれる', async () => {
    const onUpgrade = vi.fn();
    seedBattleState({ screw: BigNum.fromNumber(10_000) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '+5' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 5);
  });

  test('MAX ボタンクリックで onUpgrade が delta="max" で呼ばれる', async () => {
    const onUpgrade = vi.fn();
    seedBattleState({ screw: BigNum.fromNumber(10_000) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={onUpgrade}
      />
    );
    const buttons = screen.getAllByRole('button', { name: 'MAX' });
    await userEvent.click(buttons[0]);
    expect(onUpgrade).toHaveBeenCalledWith('attackMul', 'max');
  });

  test('onClose が渡されたとき、ヘッダーの閉じるボタン (chevron-down) で呼ばれる', async () => {
    const onClose = vi.fn();
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
        onClose={onClose}
      />
    );
    const closeBtn = screen.getByRole('button', { name: '閉じる' });
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('onToggleAuto 未指定なら AUTO トグルは描画されない', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.queryAllByRole('button', { name: /AUTO/ })).toHaveLength(0);
  });

  test('onToggleAuto 指定で 4 つの AUTO トグルが描画される', () => {
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
        onToggleAuto={() => undefined}
      />
    );
    expect(screen.getAllByRole('button', { name: /AUTO/ })).toHaveLength(4);
  });

  test('autoEnabled の各 key の値が各カードに伝播する', () => {
    seedBattleState({
      screw: BigNum.fromNumber(0),
      runWorkshopAutoEnabled: {
        attackMul: true,
        attackSpeedMul: false,
        hpMul: true,
        screwGainMul: false,
      },
    });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
        onToggleAuto={() => undefined}
      />
    );
    const autoBtns = screen.getAllByRole('button', { name: /AUTO/ });
    // RUN_WORKSHOP_ITEMS の順: attackMul, attackSpeedMul, hpMul, screwGainMul
    expect(autoBtns[0]).toHaveAttribute('aria-pressed', 'true');
    expect(autoBtns[1]).toHaveAttribute('aria-pressed', 'false');
    expect(autoBtns[2]).toHaveAttribute('aria-pressed', 'true');
    expect(autoBtns[3]).toHaveAttribute('aria-pressed', 'false');
  });

  test('AUTO トグルクリックで onToggleAuto が (key, next) で呼ばれる', async () => {
    const onToggleAuto = vi.fn();
    seedBattleState({ screw: BigNum.fromNumber(0) });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
        onToggleAuto={onToggleAuto}
      />
    );
    const autoBtns = screen.getAllByRole('button', { name: /AUTO/ });
    await userEvent.click(autoBtns[0]); // attackMul
    expect(onToggleAuto).toHaveBeenCalledWith('attackMul', true);
  });

  test('levels seed で渡した Lv が反映される', () => {
    seedBattleState({
      screw: BigNum.fromNumber(0),
      runWorkshopLevels: {
        attackMul: 5,
        attackSpeedMul: 3,
        hpMul: 2,
        screwGainMul: 1,
      },
    });
    render(
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={() => undefined}
      />
    );
    expect(screen.getByText('Lv 5')).toBeInTheDocument();
    expect(screen.getByText('Lv 3')).toBeInTheDocument();
    expect(screen.getByText('Lv 2')).toBeInTheDocument();
    expect(screen.getByText('Lv 1')).toBeInTheDocument();
  });
});
