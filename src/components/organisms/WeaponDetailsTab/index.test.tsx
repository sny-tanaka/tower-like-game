import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import {
  WeaponDetailsTab,
  calcDamageMul,
  calcAS,
  buildLaserStats,
  buildCannonStats,
  buildThunderStats,
  buildCutterStats,
} from './index';

import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// ステ計算ロジックのテスト
// ---------------------------------------------------------------------------

describe('calcDamageMul', () => {
  it('Lv 0 で ×1.0 を返す', () => {
    expect(calcDamageMul(0)).toBe(1.0);
  });

  it('Lv 1 で ×1.02 を返す', () => {
    expect(calcDamageMul(1)).toBeCloseTo(1.02, 5);
  });

  it('Lv 10 で ×1.22 付近を返す', () => {
    expect(calcDamageMul(10)).toBeCloseTo(1.2189944, 5);
  });
});

describe('calcAS', () => {
  it('Lv 0 で底値をそのまま返す', () => {
    expect(calcAS(1.0, 0)).toBe(1.0);
    expect(calcAS(0.5, 0)).toBe(0.5);
  });

  it('Lv 10 で底値 × 1.3 を返す', () => {
    expect(calcAS(1.0, 10)).toBeCloseTo(1.3, 5);
    expect(calcAS(2.0, 10)).toBeCloseTo(2.6, 5);
  });

  it('上限 10 /s を超えない（ハードキャップ）', () => {
    expect(calcAS(2.0, 1000)).toBe(10);
  });
});

describe('buildLaserStats', () => {
  it('Lv 0 で貫通数 = 1', () => {
    const stats = buildLaserStats(0);
    const penetrate = stats.find((s) => s.label === '貫通');
    expect(penetrate?.value).toBe(1);
  });

  it('Lv 10 で貫通数 = 2 (floor(1 + 0.1×10) = 2)', () => {
    const stats = buildLaserStats(10);
    const penetrate = stats.find((s) => s.label === '貫通');
    expect(penetrate?.value).toBe(2);
  });

  it('Lv 9 で貫通数 = 1 (floor(1 + 0.1×9) = floor(1.9) = 1)', () => {
    const stats = buildLaserStats(9);
    const penetrate = stats.find((s) => s.label === '貫通');
    expect(penetrate?.value).toBe(1);
  });

  it('射程ステは m 表記で保持される', () => {
    const stats = buildLaserStats(0);
    const range = stats.find((s) => s.label === '射程');
    expect(range?.suffix).toBe('m');
  });
});

describe('buildCannonStats', () => {
  it('Lv 0 で爆発半径 = 30 (suffix m)', () => {
    const stats = buildCannonStats(0);
    const radius = stats.find((s) => s.label === '半径');
    expect(radius?.value).toBe(30);
    expect(radius?.suffix).toBe('m');
  });

  it('Lv 10 で爆発半径 = 35', () => {
    const stats = buildCannonStats(10);
    const radius = stats.find((s) => s.label === '半径');
    expect(radius?.value).toBe(35);
  });
});

describe('buildThunderStats', () => {
  it('Lv 0 で連鎖数 = 7', () => {
    const stats = buildThunderStats(0);
    const chain = stats.find((s) => s.label === '連鎖');
    expect(chain?.value).toBe(7);
  });

  it('Lv 10 で連鎖数 = 8 (floor(7 + 0.1×10) = 8)', () => {
    const stats = buildThunderStats(10);
    const chain = stats.find((s) => s.label === '連鎖');
    expect(chain?.value).toBe(8);
  });

  it('Lv 5 で連鎖数 = 7 (floor(7 + 0.1×5) = floor(7.5) = 7)', () => {
    const stats = buildThunderStats(5);
    const chain = stats.find((s) => s.label === '連鎖');
    expect(chain?.value).toBe(7);
  });
});

describe('buildCutterStats', () => {
  it('Lv 0 で旋回半径 = 80 (suffix m)', () => {
    const stats = buildCutterStats(0);
    const radius = stats.find((s) => s.label === '旋回');
    expect(radius?.value).toBe(80);
    expect(radius?.suffix).toBe('m');
  });

  it('Lv 0 で同時ヒット数 = 1', () => {
    const stats = buildCutterStats(0);
    const simultaneous = stats.find((s) => s.label === '同時');
    expect(simultaneous?.value).toBe(1);
  });

  it('Lv 20 で同時ヒット数 = 2 (floor(1 + 0.05×20) = 2)', () => {
    const stats = buildCutterStats(20);
    const simultaneous = stats.find((s) => s.label === '同時');
    expect(simultaneous?.value).toBe(2);
  });

  it('Lv 10 で旋回半径 = 85', () => {
    const stats = buildCutterStats(10);
    const radius = stats.find((s) => s.label === '旋回');
    expect(radius?.value).toBe(85);
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

  it('weaponLv が変わるとステが反映される', () => {
    const { rerender } = render(<WeaponDetailsTab />);
    // Lv0 → Lv10 に更新
    useStore.setState({ weaponLv: 10 });
    rerender(<WeaponDetailsTab />);
    // Lv10 Laser: DMG = round(120 * 1.02^10) = round(120 * 1.2190) = round(146.28) = 146
    expect(screen.getByText('146')).toBeDefined();
  });
});
