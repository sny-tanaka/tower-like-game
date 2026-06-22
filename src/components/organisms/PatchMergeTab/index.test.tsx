import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PatchMergeTab, calcMergeable, executeMergeAll } from './index';

import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// Pure logic tests
// ---------------------------------------------------------------------------

describe('calcMergeable', () => {
  it('count < 2 のエントリは除外', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 1 }],
      ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 3 }],
    ]);
    const result = calcMergeable(patches, 3);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('freezeHit');
  });

  it('tier >= maxTierLimit のエントリは除外', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#3', { name: 'damageImmune', tier: 3, count: 4 }],
      ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 2 }],
    ]);
    const result = calcMergeable(patches, 3);
    expect(result.length).toBe(1);
    expect(result[0].tier).toBe(2);
  });
});

describe('executeMergeAll', () => {
  it('2個 → 1個上位 Tier に合成', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 2 }],
    ]);
    const result = executeMergeAll(patches, 2);
    expect(result.get('damageImmune#1')).toBeUndefined();
    expect(result.get('damageImmune#2')?.count).toBe(1);
  });

  it('4個 → 2個 T2 → 1個 T3 と再帰合成', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 4 }],
    ]);
    const result = executeMergeAll(patches, 3);
    expect(result.get('damageImmune#1')).toBeUndefined();
    expect(result.get('damageImmune#2')).toBeUndefined();
    expect(result.get('damageImmune#3')?.count).toBe(1);
  });

  it('奇数個 (3) は余り 1 個が残る', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 3 }],
    ]);
    const result = executeMergeAll(patches, 2);
    expect(result.get('damageImmune#1')?.count).toBe(1);
    expect(result.get('damageImmune#2')?.count).toBe(1);
  });

  it('maxTierLimit を超えない (T3 に達したら止まる)', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 8 }],
    ]);
    const result = executeMergeAll(patches, 2); // maxTierLimit=2 なので T2 まで
    // T1 が全て消費されて T2 に合成
    expect(result.get('damageImmune#2')?.count).toBe(4);
    // T3 は生成されない
    expect(result.get('damageImmune#3')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Component tests
// ---------------------------------------------------------------------------

describe('PatchMergeTab', () => {
  it('合成可能なし時は空メッセージ表示', () => {
    render(<PatchMergeTab overridePatches={new Map()} />);
    expect(screen.getByText('合成可能なパッチがありません')).toBeDefined();
  });

  it('合成可能あり時はボタンが表示される', () => {
    const patches = new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 4 }],
    ]);
    render(<PatchMergeTab overridePatches={patches} />);
    const btn = screen.getByRole('button', { name: /一括合成/ });
    expect(btn).toBeDefined();
  });
});
