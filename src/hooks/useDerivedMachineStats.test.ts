import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  DEFAULT_MACHINE_ATTACK_SPEED_MUL,
  DEFAULT_MACHINE_RANGE_PX,
  useDerivedMachineStats,
} from './useDerivedMachineStats';

import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

afterEach(() => {
  resetBattleState();
});

function getExpectedRangePx(rangeLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range');
  if (item == null) return DEFAULT_MACHINE_RANGE_PX;
  return calcEffectValue(item, rangeLv);
}

function getExpectedAttackSpeedMul(attackSpeedLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed');
  if (item == null) return DEFAULT_MACHINE_ATTACK_SPEED_MUL;
  return calcEffectValue(item, attackSpeedLv);
}

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('useDerivedMachineStats', () => {
  it('デフォルト (Lv 0) で MACHINE_UPGRADE_ITEMS の初期効果値を返す', () => {
    seedBattleState();
    const { result } = renderHook(() => useDerivedMachineStats());
    expect(result.current.machineRangePx).toBe(getExpectedRangePx(0));
    expect(result.current.machineAttackSpeedMul).toBe(getExpectedAttackSpeedMul(0));
  });

  it('range Lv を上げると machineRangePx が増える (calcEffectValue 経由)', () => {
    seedBattleState({ machineLevels: { range: 10 } });
    const { result } = renderHook(() => useDerivedMachineStats());
    expect(result.current.machineRangePx).toBe(getExpectedRangePx(10));
    expect(result.current.machineRangePx).toBeGreaterThan(getExpectedRangePx(0));
  });

  it('attackSpeed Lv を上げると machineAttackSpeedMul が増える (calcEffectValue 経由)', () => {
    seedBattleState({ machineLevels: { attackSpeed: 20 } });
    const { result } = renderHook(() => useDerivedMachineStats());
    expect(result.current.machineAttackSpeedMul).toBe(getExpectedAttackSpeedMul(20));
    expect(result.current.machineAttackSpeedMul).toBeGreaterThan(getExpectedAttackSpeedMul(0));
  });

  it('range / attackSpeed 以外の machineLevels 変化では値が変わらない', () => {
    // 初期状態
    seedBattleState();
    const { result, rerender } = renderHook(() => useDerivedMachineStats());
    const baselineRange = result.current.machineRangePx;
    const baselineAs = result.current.machineAttackSpeedMul;

    // activeCdReduction だけ変える (range / attackSpeed には影響しないはず)
    seedBattleState({ machineLevels: { activeCdReduction: 30 } });
    rerender();
    expect(result.current.machineRangePx).toBe(baselineRange);
    expect(result.current.machineAttackSpeedMul).toBe(baselineAs);
  });

  it('range Lv 変化で参照が更新される (useMemo の依存ピン)', () => {
    seedBattleState({ machineLevels: { range: 5 } });
    const { result, rerender } = renderHook(() => useDerivedMachineStats());
    const before = result.current.machineRangePx;
    seedBattleState({ machineLevels: { range: 15 } });
    rerender();
    expect(result.current.machineRangePx).not.toBe(before);
    expect(result.current.machineRangePx).toBe(getExpectedRangePx(15));
  });
});
