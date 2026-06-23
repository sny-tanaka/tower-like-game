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
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// テスト用ダミー値: baseAttack=100, range=200 を渡して計算結果を検証
// ---------------------------------------------------------------------------

const BASE_ATTACK = 100;
const RANGE = 200;

describe('buildLaserStats', () => {
  it('Lv 0 で貫通数 = 1', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, RANGE);
    expect(stats.find((s) => s.label === '貫通')?.value).toBe(1);
  });

  it('Lv 10 で貫通数 = floor(1 + 0.1×10) = 2', () => {
    const stats = buildLaserStats(10, BASE_ATTACK, RANGE);
    expect(stats.find((s) => s.label === '貫通')?.value).toBe(2);
  });

  it('Lv 0 で DMG = baseAttack × LASER_BASE_DAMAGE_MUL', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, RANGE);
    const expected = Math.round(BASE_ATTACK * LASER_BASE_DAMAGE_MUL);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(expected);
  });

  it('射程は machineRange を suffix m で表示', () => {
    const stats = buildLaserStats(0, BASE_ATTACK, RANGE);
    const range = stats.find((s) => s.label === '射程');
    expect(range?.value).toBe(RANGE);
    expect(range?.suffix).toBe('m');
  });
});

describe('buildCannonStats', () => {
  it('Lv 0 で爆発半径 = 30', () => {
    const stats = buildCannonStats(0, BASE_ATTACK, RANGE);
    expect(stats.find((s) => s.label === '爆発半径')?.value).toBe(30);
  });

  it('Lv 0 で DMG = baseAttack × CANNON_BASE_DAMAGE_MUL', () => {
    const stats = buildCannonStats(0, BASE_ATTACK, RANGE);
    const expected = Math.round(BASE_ATTACK * CANNON_BASE_DAMAGE_MUL);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(expected);
  });
});

describe('buildThunderStats', () => {
  it('Lv 0 でターゲット数 = 3 (chainCount 固定値)', () => {
    const stats = buildThunderStats(0, BASE_ATTACK, RANGE);
    expect(stats.find((s) => s.label === 'ターゲット数')?.value).toBe(3);
  });

  it('Lv 0 で DMG = baseAttack × THUNDER_BASE_DAMAGE_MUL', () => {
    const stats = buildThunderStats(0, BASE_ATTACK, RANGE);
    const expected = Math.round(BASE_ATTACK * THUNDER_BASE_DAMAGE_MUL);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(expected);
  });
});

describe('buildCutterStats', () => {
  it('Lv 0 で回転半径 = 80', () => {
    const stats = buildCutterStats(0, BASE_ATTACK);
    expect(stats.find((s) => s.label === '回転半径')?.value).toBe(80);
  });

  it('Lv 0 で刃の数 = 1', () => {
    const stats = buildCutterStats(0, BASE_ATTACK);
    expect(stats.find((s) => s.label === '刃の数')?.value).toBe(1);
  });

  it('Lv 0 で DMG = baseAttack × CUTTER_BASE_DAMAGE_MUL', () => {
    const stats = buildCutterStats(0, BASE_ATTACK);
    const expected = Math.round(BASE_ATTACK * CUTTER_BASE_DAMAGE_MUL);
    expect(stats.find((s) => s.label === 'DMG')?.value).toBe(expected);
  });

  it('Cutter の連射速度ラベルは「回転速度」(他武器の「連射速度」と区別)', () => {
    const stats = buildCutterStats(0, BASE_ATTACK);
    expect(stats.find((s) => s.label === '回転速度')).toBeDefined();
    expect(stats.find((s) => s.label === '連射速度')).toBeUndefined();
  });
});

describe('calcMachineBaseAttack', () => {
  it('Lv 0 で MACHINE_UPGRADE_ITEMS の baseAttack の baseValue を返す', () => {
    // baseAttack item の baseValue = 1
    expect(calcMachineBaseAttack(0)).toBe(1);
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
