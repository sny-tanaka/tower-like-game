import { describe, expect, it } from 'vitest';

import {
  PATCH_BASE_DROP_RATE,
  PATCH_POOL,
  dropPatch,
  rollPatchDrop,
  selectPatchName,
  selectPatchTier,
} from './drops';

// ---------------------------------------------------------------------------
// rollPatchDrop
// ---------------------------------------------------------------------------

describe('rollPatchDrop', () => {
  it('通常敵は常に false (base 0%)', () => {
    expect(rollPatchDrop('normal', 1, () => 0)).toBe(false);
    expect(rollPatchDrop('normal', 100, () => 0)).toBe(false);
  });

  it('エリート base 1%: rng=0 で true、 rng=0.01 で false (境界)', () => {
    expect(rollPatchDrop('elite', 1, () => 0)).toBe(true);
    expect(rollPatchDrop('elite', 1, () => 0.011)).toBe(false);
  });

  it('ミニボス base 5%: rng=0.04 で true、 rng=0.06 で false', () => {
    expect(rollPatchDrop('miniboss', 1, () => 0.04)).toBe(true);
    expect(rollPatchDrop('miniboss', 1, () => 0.06)).toBe(false);
  });

  it('Tier ボス base 20%: rng=0.15 で true、 rng=0.25 で false', () => {
    expect(rollPatchDrop('boss', 1, () => 0.15)).toBe(true);
    expect(rollPatchDrop('boss', 1, () => 0.25)).toBe(false);
  });

  it('patchDropRateMul が乗算される (boss 20% × 2 = 40%)', () => {
    expect(rollPatchDrop('boss', 2, () => 0.35)).toBe(true);
    expect(rollPatchDrop('boss', 2, () => 0.45)).toBe(false);
  });

  it('実効ドロップ率は 1.0 (= 100%) でクランプ', () => {
    expect(rollPatchDrop('boss', 100, () => 0.99)).toBe(true);
  });

  it('PATCH_BASE_DROP_RATE が仕様通り', () => {
    expect(PATCH_BASE_DROP_RATE.normal).toBe(0);
    expect(PATCH_BASE_DROP_RATE.elite).toBeCloseTo(0.01);
    expect(PATCH_BASE_DROP_RATE.miniboss).toBeCloseTo(0.05);
    expect(PATCH_BASE_DROP_RATE.boss).toBeCloseTo(0.2);
  });
});

// ---------------------------------------------------------------------------
// selectPatchTier
// ---------------------------------------------------------------------------

describe('selectPatchTier', () => {
  it('到達 Tier 1 は常に 1 が返る', () => {
    expect(selectPatchTier(1, () => 0)).toBe(1);
    expect(selectPatchTier(1, () => 0.99)).toBe(1);
  });

  it('到達 Tier 2 は重み [2, 1] (合計 3): rng < 2/3 で T1、 rng >= 2/3 で T2', () => {
    expect(selectPatchTier(2, () => 0.0)).toBe(1);
    expect(selectPatchTier(2, () => 0.5)).toBe(1);
    expect(selectPatchTier(2, () => 0.66)).toBe(1); // 2/3 直前
    expect(selectPatchTier(2, () => 0.67)).toBe(2); // 2/3 直後
    expect(selectPatchTier(2, () => 0.99)).toBe(2);
  });

  it('到達 Tier 10 では仕様表通り T1 が約 18.2%、 T10 が約 1.8%', () => {
    // 統計的サンプリング (rng が一様分布) で T1 が最頻出になることを確認
    const samples = 10_000;
    const counts: Record<number, number> = {};
    let seed = 1;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < samples; i++) {
      const t = selectPatchTier(10, rng);
      counts[t] = (counts[t] ?? 0) + 1;
    }
    // T1 は約 18%、 T10 は約 2% の理論値
    const t1Rate = (counts[1] ?? 0) / samples;
    const t10Rate = (counts[10] ?? 0) / samples;
    expect(t1Rate).toBeGreaterThan(0.15);
    expect(t1Rate).toBeLessThan(0.22);
    expect(t10Rate).toBeLessThan(0.04);
  });

  it('到達 Tier 0 / 負値でも最低 1 を返す', () => {
    expect(selectPatchTier(0, () => 0.5)).toBe(1);
    expect(selectPatchTier(-3, () => 0.5)).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// selectPatchName
// ---------------------------------------------------------------------------

describe('selectPatchName', () => {
  it('プールは 10 種', () => {
    expect(PATCH_POOL).toHaveLength(10);
  });

  it('rng=0 でプール先頭、 rng=0.99 でプール末尾', () => {
    expect(selectPatchName(() => 0)).toBe(PATCH_POOL[0]);
    expect(selectPatchName(() => 0.99)).toBe(PATCH_POOL[9]);
  });

  it('全インデックスが選ばれうる (均等抽選)', () => {
    const picks = new Set<string>();
    for (let i = 0; i < 10; i++) {
      // i/10 の rng で各 index がカバーされる
      picks.add(selectPatchName(() => i / 10));
    }
    expect(picks.size).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// dropPatch (統合)
// ---------------------------------------------------------------------------

describe('dropPatch', () => {
  it('通常敵は常に null', () => {
    expect(dropPatch('normal', 5, 100, () => 0)).toBeNull();
  });

  it('ドロップ失敗時は null', () => {
    expect(dropPatch('elite', 5, 1, () => 0.5)).toBeNull(); // 1% < 50%
  });

  it('ドロップ成功時は { name, tier } を返す', () => {
    const result = dropPatch('boss', 5, 1, () => 0); // boss 20%、 rng=0 で必ず成立
    expect(result).not.toBeNull();
    expect(result!.tier).toBeGreaterThanOrEqual(1);
    expect(result!.tier).toBeLessThanOrEqual(5);
    expect(PATCH_POOL).toContain(result!.name);
  });
});
