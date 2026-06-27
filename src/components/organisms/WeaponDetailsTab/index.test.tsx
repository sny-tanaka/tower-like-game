import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import {
  WeaponDetailsTab,
  buildCannonStats,
  buildCutterStats,
  buildLaserStats,
  buildThunderStats,
  calcMachineBaseAttack,
} from './index';

import { CANNON_BASE_DAMAGE_MUL } from '@/game/weapons/cannon';
import { CUTTER_BASE_DAMAGE_MUL } from '@/game/weapons/cutter';
import { LASER_BASE_DAMAGE_MUL } from '@/game/weapons/laser';
import { THUNDER_BASE_DAMAGE_MUL } from '@/game/weapons/thunder';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';

/** ゲーム実値と同じ BigNum 計算でダメージ表示文字列を作る */
function expectDamage(baseAttack: number, damageMul: number): string {
  return BigNum.fromNumber(baseAttack).mulNumber(damageMul).toString();
}

// ---------------------------------------------------------------------------
// テスト用ダミー値: baseAttack=100, machineRange=150 (=base, mul=1.0), machineAS=1.0
// ---------------------------------------------------------------------------

const BASE_ATTACK = 100;
const MACHINE_RANGE = 150; // Lv 0 (倍率 1.0)
const MACHINE_AS = 1.0; // Lv 0 (倍率 1.0)

describe('buildLaserStats (v1.1.1: 4 ステ DMG / 連射速度 / 射程 / Critical倍率)', () => {
  it('Lv 0 で DMG = baseAttack × LASER_BASE_DAMAGE_MUL', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(
      expectDamage(BASE_ATTACK, LASER_BASE_DAMAGE_MUL)
    );
  });

  it('表示ステは DMG / 連射速度 / 射程 / Critical倍率ボーナス の 4 つだけ', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    const labels = stats.map((s) => s.label);
    expect(labels).toEqual(['DMG', '連射速度', '射程', 'Critical倍率ボーナス']);
  });

  it('射程 = machineRange × WEAPON_RANGE_PCT.laser / 100 / 2 で m 表示 (= 半径)', () => {
    // WEAPON_RANGE_PCT は直径 % なので半径換算で /2:
    // v1.1.1 縮小後 laser = 35 × 7/9 = 27.222...
    // machineRange=300m × 27.222/100 / 2 ≈ 40.833... → round1 で 40.8m
    const stats = buildLaserStats(0, BASE_ATTACK, 300, MACHINE_AS);
    const range = stats.find((s) => s.label === '射程');
    expect(range?.value).toBe(40.8);
    expect(range?.suffix).toBe('m');
  });

  it('連射速度 = weapon.AS × machine.attackSpeed (v1.3.0: LASER_BASE_AS 1.25)', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, MACHINE_RANGE, 2.0); // machineAS=2.0
    const as = stats.find((s) => s.label === '連射速度');
    expect(as?.value).toBe(2.5); // 1.25 × 2.0
    expect(as?.suffix).toBe('/s');
  });
});

describe('buildCannonStats (v1.1.1: 4 ステ)', () => {
  it('Lv 0 で DMG = baseAttack × CANNON_BASE_DAMAGE_MUL', () => {
    const stats = buildCannonStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(
      expectDamage(BASE_ATTACK, CANNON_BASE_DAMAGE_MUL)
    );
  });

  it('表示ステは DMG / 連射速度 / 射程 / 爆発半径 の 4 つだけ', () => {
    const stats = buildCannonStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.map((s) => s.label)).toEqual(['DMG', '連射速度', '射程', '爆発半径']);
  });

  it('v1.1.2: Lv 0 で爆発半径 = 8 (フィールド % 半径 = ダメージ判定 = 見た目)', () => {
    const stats = buildCannonStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === '爆発半径')?.value).toBe(8);
  });
});

describe('buildThunderStats (v1.1.1: 4 ステ)', () => {
  it('Lv 0 で DMG = baseAttack × THUNDER_BASE_DAMAGE_MUL', () => {
    const stats = buildThunderStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(
      expectDamage(BASE_ATTACK, THUNDER_BASE_DAMAGE_MUL)
    );
  });

  it('表示ステは DMG / 連射速度 / 射程 / HP 回復率 の 4 つだけ', () => {
    const stats = buildThunderStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.map((s) => s.label)).toEqual(['DMG', '連射速度', '射程', 'HP 回復率']);
  });
});

describe('buildCutterStats (v1.1.1: 4 ステ)', () => {
  it('Lv 0 で DMG = baseAttack × CUTTER_BASE_DAMAGE_MUL', () => {
    const stats = buildCutterStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(
      expectDamage(BASE_ATTACK, CUTTER_BASE_DAMAGE_MUL)
    );
  });

  it('表示ステは DMG / 回転速度 / 射程 / Overdrive 持続 の 4 つだけ', () => {
    const stats = buildCutterStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.map((s) => s.label)).toEqual(['DMG', '回転速度', '射程', 'Overdrive 持続']);
  });

  it('Cutter の連射速度ラベルは「回転速度」(他武器の「連射速度」と区別)', () => {
    const stats = buildCutterStats(0, BASE_ATTACK, MACHINE_RANGE, MACHINE_AS);
    expect(stats.find((s) => s.label === '回転速度')).toBeDefined();
    expect(stats.find((s) => s.label === '連射速度')).toBeUndefined();
  });
});

describe('calcMachineBaseAttack', () => {
  it('Lv 0 で MACHINE_UPGRADE_ITEMS の baseAttack の baseValue を返す', () => {
    // v1.0.0: baseAttack item の baseValue = 100 (旧 1 → 100 リベース)
    expect(calcMachineBaseAttack(0)).toBe(100);
  });
});

// ---------------------------------------------------------------------------
// コンポーネントのレンダリングテスト
// ---------------------------------------------------------------------------

describe('WeaponDetailsTab', () => {
  beforeEach(() => {
    useStore.setState({ weaponLv: 0 });
  });

  it('4 武器名が全て表示される', () => {
    render(<WeaponDetailsTab />);
    expect(screen.getByText('LASER')).toBeDefined();
    expect(screen.getByText('CANNON')).toBeDefined();
    expect(screen.getByText('THUNDER')).toBeDefined();
    expect(screen.getByText('CUTTER')).toBeDefined();
  });

  it('role="tabpanel" aria-label="武器詳細" が付与される', () => {
    const { container } = render(<WeaponDetailsTab />);
    const panel = container.querySelector('[role="tabpanel"]');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-label')).toBe('武器詳細');
  });
});
