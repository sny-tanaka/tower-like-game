import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import {
  WeaponLevelUpgradeTab,
  calcWeaponUpgradeCost,
  calcCumulativeCost,
  calcMaxLevels,
  buildStatsImpact,
} from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// コスト計算ロジックのテスト
// ---------------------------------------------------------------------------

/** BigNum を数値に変換するヘルパー（BigNum には toNumber がないので toDisplay で代用） */
function bnToNum(bn: BigNum): number {
  return parseFloat(bn.toDisplay());
}

describe('calcWeaponUpgradeCost', () => {
  it('Lv 0 → 1 のコストは ceil(200 × 1.12^0) = 200', () => {
    expect(bnToNum(calcWeaponUpgradeCost(0))).toBe(200);
  });

  it('Lv 1 → 2 のコストは ceil(200 × 1.12^1) ≈ 224〜225', () => {
    // 浮動小数点誤差で ceil(200*1.12) = ceil(224.0000...03) = 225 になる場合がある
    const cost = bnToNum(calcWeaponUpgradeCost(1));
    expect(cost).toBeGreaterThanOrEqual(224);
    expect(cost).toBeLessThanOrEqual(225);
  });

  it('Lv 9 → 10 のコストは仕様値 555 付近', () => {
    // 仕様: 05-weapons.md 代表 Lv より「9→10: 555」
    const cost = bnToNum(calcWeaponUpgradeCost(9));
    expect(cost).toBeGreaterThanOrEqual(553);
    expect(cost).toBeLessThanOrEqual(557);
  });
});

describe('calcCumulativeCost', () => {
  it('Lv0 から +1 の累計コストは Lv0 単発コスト', () => {
    const single = bnToNum(calcWeaponUpgradeCost(0));
    const cumul = bnToNum(calcCumulativeCost(0, 1));
    expect(cumul).toBe(single);
  });

  it('Lv0 から +0 の累計コストは 0', () => {
    expect(bnToNum(calcCumulativeCost(0, 0))).toBe(0);
  });
});

describe('calcMaxLevels', () => {
  it('alloy が 0 なら 0 Lv しか上げられない', () => {
    expect(calcMaxLevels(0, BigNum.ZERO)).toBe(0);
  });

  it('alloy 200 で Lv 0 から 1 Lv 上げられる', () => {
    expect(calcMaxLevels(0, BigNum.fromNumber(200))).toBe(1);
  });

  it('alloy 199 で Lv 0 からは上げられない', () => {
    expect(calcMaxLevels(0, BigNum.fromNumber(199))).toBe(0);
  });
});

describe('buildStatsImpact', () => {
  it('Lv 0 → 1 の laser DMG が 120 → 122 程度', () => {
    const impact = buildStatsImpact(0);
    const laser = impact.find((i) => i.label === 'LASER DMG');
    expect(laser?.before).toBe(120);
    expect(laser?.after).toBe(122); // round(120 * 1.02) = round(122.4) = 122
  });

  it('Lv 0 → 1 の THUNDER 連鎖は 7 → 7 (floor(7 + 0.1) = 7)', () => {
    const impact = buildStatsImpact(0);
    const thunder = impact.find((i) => i.label === 'THUNDER 連鎖');
    expect(thunder?.before).toBe(7);
    expect(thunder?.after).toBe(7);
  });

  it('Lv 9 → 10 の THUNDER 連鎖は 7 → 8', () => {
    const impact = buildStatsImpact(9);
    const thunder = impact.find((i) => i.label === 'THUNDER 連鎖');
    expect(thunder?.before).toBe(7); // floor(7 + 0.1*9) = floor(7.9) = 7
    expect(thunder?.after).toBe(8); // floor(7 + 0.1*10) = floor(8.0) = 8
  });

  it('suffix: CANNON 半径は m', () => {
    const impact = buildStatsImpact(0);
    const cannon = impact.find((i) => i.label === 'CANNON 半径');
    expect(cannon?.suffix).toBe('m');
  });
});

// ---------------------------------------------------------------------------
// コンポーネントのレンダリングテスト
// ---------------------------------------------------------------------------

describe('WeaponLevelUpgradeTab', () => {
  beforeEach(() => {
    useStore.setState({ weaponLv: 0, alloy: BigNum.fromNumber(1000) });
  });

  it('role="tabpanel" aria-label="武器強化" が付与される', () => {
    const { container } = render(<WeaponLevelUpgradeTab />);
    const panel = container.querySelector('[role="tabpanel"]');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-label')).toBe('武器強化');
  });

  it('武器強化 Lv のタイトルが表示される', () => {
    render(<WeaponLevelUpgradeTab />);
    expect(screen.getByText('武器強化 Lv')).toBeDefined();
  });

  it('現在の Lv が表示される', () => {
    render(<WeaponLevelUpgradeTab />);
    expect(screen.getByText('Lv 0')).toBeDefined();
  });

  it('効果プレビューの見出しが表示される', () => {
    render(<WeaponLevelUpgradeTab />);
    expect(screen.getByText('次 Lv での効果プレビュー')).toBeDefined();
  });

  it('alloy が不足している場合、+1 ボタンが disabled になる', () => {
    useStore.setState({ weaponLv: 0, alloy: BigNum.fromNumber(0) });
    render(<WeaponLevelUpgradeTab />);
    // Button の disabled チェック: +1 ボタンを探す
    const buttons = screen.getAllByRole('button');
    const plusOneBtn = buttons.find((b) => b.textContent === '+1');
    expect(plusOneBtn).toBeDefined();
    expect(plusOneBtn?.hasAttribute('disabled')).toBe(true);
  });

  it('+1 ボタンクリックで weaponLv が上がり alloy が減る', () => {
    useStore.setState({ weaponLv: 0, alloy: BigNum.fromNumber(1000) });
    render(<WeaponLevelUpgradeTab />);
    const buttons = screen.getAllByRole('button');
    const plusOneBtn = buttons.find((b) => b.textContent === '+1');
    expect(plusOneBtn).toBeDefined();
    fireEvent.click(plusOneBtn!);
    // Lv 0 → 1, cost = 200, alloy 1000 - 200 = 800
    expect(useStore.getState().weaponLv).toBe(1);
    // alloy 1000 - 200 (Lv0 cost) = 800
    expect(parseFloat(useStore.getState().alloy.toDisplay())).toBe(800);
  });
});
