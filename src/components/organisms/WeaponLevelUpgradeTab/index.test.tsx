import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import {
  WeaponLevelUpgradeTab,
  calcWeaponUpgradeCost,
  calcCumulativeCost,
  calcMaxLevels,
  buildStatsImpact,
} from './index';

import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

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
  it('baseAttackLv=0 と baseAttackLv=10 でビフォーDMG が異なる', () => {
    const a = buildStatsImpact(0, 0, 0);
    const b = buildStatsImpact(0, 10, 0);
    expect(a[0]!.before).not.toBe(b[0]!.before);
  });

  it('LASER DMG は weaponLv+1 で上昇する', () => {
    // weaponLv=100, baseAttackLv=100 で before/after の差が BigNum 切り上げを上回ることを確認
    const items = buildStatsImpact(100, 100, 0);
    const item = items.find((i) => i.label === 'LASER DMG')!;
    // v1.0.1: DMG 表記は BigNum.toDisplay() 由来 ("12.34A" 等)。 parseFloat で先頭数値を取って大小比較。
    // 桁数が変わる場合は接尾文字 (A/B/C/...) で順序判定する必要があるが、
    // weaponLv+1 の差はわずかなので同じ桁内に収まる前提。
    expect(parseFloat(item.after)).toBeGreaterThan(parseFloat(item.before));
  });

  it('LASER DMG が旧ハードコード値 120 と一致しない（実値を使っている）', () => {
    // baseAttackLv=0, weaponLv=0 のとき baseAttack=1, damageMul=0.4 → DMG=1
    const items = buildStatsImpact(0, 0, 0);
    const laser = items.find((i) => i.label === 'LASER DMG')!;
    expect(laser.before).not.toBe('120');
  });

  // -------------------------------------------------------------------------
  // 追加テスト (#68 カバレッジ充実)
  // -------------------------------------------------------------------------

  it('返り値は LASER / CANNON / THUNDER / CUTTER DMG の 4 行を持つ', () => {
    const items = buildStatsImpact(0, 0, 0);
    const labels = items.map((i) => i.label);
    expect(labels).toContain('LASER DMG');
    expect(labels).toContain('CANNON DMG');
    expect(labels).toContain('THUNDER DMG');
    expect(labels).toContain('CUTTER DMG');
    expect(items).toHaveLength(4);
  });

  it('CANNON DMG が旧ハードコード値 480 と一致しない（実値を使っている）', () => {
    // baseAttackLv=0 のとき baseAttack=1, CANNON_BASE_DAMAGE_MUL=2.0 → DMG=2（旧=480 と乖離）
    const items = buildStatsImpact(0, 0, 0);
    const cannon = items.find((i) => i.label === 'CANNON DMG')!;
    expect(cannon.before).not.toBe('480');
  });

  it('THUNDER DMG が旧ハードコード値 84 と一致しない（実値を使っている）', () => {
    // baseAttackLv=0 のとき baseAttack=1, THUNDER_BASE_DAMAGE_MUL=0.18 → DMG=1（旧=84 と乖離）
    const items = buildStatsImpact(0, 0, 0);
    const thunder = items.find((i) => i.label === 'THUNDER DMG')!;
    expect(thunder.before).not.toBe('84');
  });

  it('CUTTER DMG が旧ハードコード値 62 と一致しない（実値を使っている）', () => {
    // baseAttackLv=0 のとき baseAttack=1, CUTTER_BASE_DAMAGE_MUL=1.2 → DMG=2（旧=62 と乖離）
    const items = buildStatsImpact(0, 0, 0);
    const cutter = items.find((i) => i.label === 'CUTTER DMG')!;
    expect(cutter.before).not.toBe('62');
  });

  it('weaponLv=0 境界: 全 4 武器の before は "0" でなく実値を返す', () => {
    const items = buildStatsImpact(0, 0, 0);
    for (const item of items) {
      expect(item.before).not.toBe('0');
    }
  });

  it('CANNON DMG は weaponLv+1 で上昇する', () => {
    const items = buildStatsImpact(100, 100, 0);
    const cannon = items.find((i) => i.label === 'CANNON DMG')!;
    // v1.0.1: DMG は BigNum.toDisplay() ("xx.yyA") → parseFloat で先頭値を抽出
    expect(parseFloat(cannon.after)).toBeGreaterThan(parseFloat(cannon.before));
  });

  it('THUNDER DMG は weaponLv+1 で上昇する', () => {
    const items = buildStatsImpact(100, 100, 0);
    const thunder = items.find((i) => i.label === 'THUNDER DMG')!;
    expect(parseFloat(thunder.after)).toBeGreaterThan(parseFloat(thunder.before));
  });

  it('CUTTER DMG は weaponLv+1 で上昇する', () => {
    const items = buildStatsImpact(100, 100, 0);
    const cutter = items.find((i) => i.label === 'CUTTER DMG')!;
    expect(parseFloat(cutter.after)).toBeGreaterThan(parseFloat(cutter.before));
  });

  it('rangeLv は LASER DMG に影響しない（射程変化はダメージ計算に関与しない）', () => {
    const atRangeZero = buildStatsImpact(10, 10, 0);
    const atRangeHigh = buildStatsImpact(10, 10, 100);
    const laserZero = atRangeZero.find((i) => i.label === 'LASER DMG')!;
    const laserHigh = atRangeHigh.find((i) => i.label === 'LASER DMG')!;
    expect(laserZero.before).toBe(laserHigh.before);
    expect(laserZero.after).toBe(laserHigh.after);
  });

  it('baseAttackLv が高いほど全武器の DMG が大きい', () => {
    const low = buildStatsImpact(10, 0, 0);
    const high = buildStatsImpact(10, 50, 0);
    for (let i = 0; i < low.length; i++) {
      expect(Number(high[i]!.before)).toBeGreaterThan(Number(low[i]!.before));
    }
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

describe('WeaponLevelUpgradeTab — SE 配線', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('alloy 十分 → +1 購入で purchaseOk SE が再生される', () => {
    useStore.setState({ weaponLv: 0, alloy: BigNum.fromNumber(1000) });
    render(<WeaponLevelUpgradeTab />);
    const buttons = screen.getAllByRole('button');
    const plusOneBtn = buttons.find((b) => b.textContent === '+1');
    fireEvent.click(plusOneBtn!);
    expect(soundEngine.play).toHaveBeenCalledWith('purchaseOk');
  });

  it('alloy 不足 → +1 ボタンは disabled になり SE は一切再生されない', () => {
    useStore.setState({ weaponLv: 0, alloy: BigNum.ZERO });
    render(<WeaponLevelUpgradeTab />);
    const buttons = screen.getAllByRole('button');
    const plusOneBtn = buttons.find((b) => b.textContent === '+1');
    // alloy 不足の場合 +1 ボタンは disabled になる
    expect(plusOneBtn).toHaveAttribute('disabled');
    // disabled ボタンは onClick が undefined になるため SE は鳴らない
    fireEvent.click(plusOneBtn!);
    expect(soundEngine.play).not.toHaveBeenCalled();
  });
});
