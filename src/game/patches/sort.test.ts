import { describe, expect, it } from 'vitest';

import {
  compareByKindThenTier,
  maxTierPerKind,
  patchNamePriority,
  sortByKindThenTier,
} from './sort';

import type { PatchName } from '@/data/schema';

interface Entry {
  name: PatchName;
  tier: number;
  count?: number;
}

describe('patchNamePriority', () => {
  it('PATCH_POOL 先頭の instantKill が 0', () => {
    expect(patchNamePriority('instantKill')).toBe(0);
  });

  it('PATCH_POOL の順序で番号が付く (freezeHit=8, burnHit=9)', () => {
    expect(patchNamePriority('freezeHit')).toBe(8);
    expect(patchNamePriority('burnHit')).toBe(9);
  });
});

describe('compareByKindThenTier', () => {
  it('種別が違えば PATCH_POOL 順で並ぶ', () => {
    // freezeHit(8) < burnHit(9)
    expect(
      compareByKindThenTier({ name: 'freezeHit', tier: 1 }, { name: 'burnHit', tier: 9 })
    ).toBeLessThan(0);
  });

  it('同種別なら tier 降順', () => {
    expect(
      compareByKindThenTier({ name: 'freezeHit', tier: 5 }, { name: 'freezeHit', tier: 3 })
    ).toBeLessThan(0);
    expect(
      compareByKindThenTier({ name: 'freezeHit', tier: 2 }, { name: 'freezeHit', tier: 5 })
    ).toBeGreaterThan(0);
  });

  it('完全一致は 0', () => {
    expect(
      compareByKindThenTier({ name: 'freezeHit', tier: 5 }, { name: 'freezeHit', tier: 5 })
    ).toBe(0);
  });
});

describe('sortByKindThenTier', () => {
  it('ユーザー例と一致: T5凍結 → T4凍結 → T5燃焼 → T2燃焼', () => {
    const input: Entry[] = [
      { name: 'burnHit', tier: 2 },
      { name: 'freezeHit', tier: 4 },
      { name: 'burnHit', tier: 5 },
      { name: 'freezeHit', tier: 5 },
    ];
    const sorted = sortByKindThenTier(input);
    expect(sorted).toEqual([
      { name: 'freezeHit', tier: 5 },
      { name: 'freezeHit', tier: 4 },
      { name: 'burnHit', tier: 5 },
      { name: 'burnHit', tier: 2 },
    ]);
  });

  it('入力配列を破壊しない', () => {
    const input: Entry[] = [
      { name: 'burnHit', tier: 2 },
      { name: 'freezeHit', tier: 5 },
    ];
    const original = [...input];
    sortByKindThenTier(input);
    expect(input).toEqual(original);
  });

  it('空配列でも動く', () => {
    expect(sortByKindThenTier([])).toEqual([]);
  });
});

describe('maxTierPerKind', () => {
  it('種別ごとに tier 最大のみ残す', () => {
    const input: Entry[] = [
      { name: 'freezeHit', tier: 3 },
      { name: 'freezeHit', tier: 5 },
      { name: 'freezeHit', tier: 4 },
      { name: 'burnHit', tier: 2 },
      { name: 'burnHit', tier: 1 },
    ];
    const result = maxTierPerKind(input);
    expect(result).toEqual([
      { name: 'freezeHit', tier: 5 },
      { name: 'burnHit', tier: 2 },
    ]);
  });

  it('種別が 1 つずつしかない場合も並び順は PATCH_POOL 順', () => {
    const input: Entry[] = [
      { name: 'burnHit', tier: 1 },
      { name: 'instantKill', tier: 3 },
      { name: 'freezeHit', tier: 2 },
    ];
    const result = maxTierPerKind(input);
    expect(result.map((e) => e.name)).toEqual(['instantKill', 'freezeHit', 'burnHit']);
  });

  it('count などの追加フィールドを保持する', () => {
    const input: Entry[] = [
      { name: 'freezeHit', tier: 3, count: 2 },
      { name: 'freezeHit', tier: 5, count: 1 },
    ];
    const result = maxTierPerKind(input);
    expect(result).toEqual([{ name: 'freezeHit', tier: 5, count: 1 }]);
  });
});
