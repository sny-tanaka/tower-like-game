import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { PatchMergeTab, calcMergeable, executeMergeAll } from './index';

import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';
import type { PatchEntry } from '@/store/slices/patches';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

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

  it('T5 パッチを 2 個所持しているとき T6 への合成が calcMergeable に含まれる', () => {
    const patches = new Map<string, PatchEntry>([
      ['burnHit#5', { name: 'burnHit', tier: 5, count: 2 }],
    ]);
    // maxAllowedTier = maxExistingTier(5) + 1 = 6
    const result = calcMergeable(patches, 6);
    expect(result).toHaveLength(1);
    expect(result[0].tier).toBe(5);
  });

  it('T6 パッチを 2 個所持しているとき T7 への合成が calcMergeable に含まれる', () => {
    const patches = new Map<string, PatchEntry>([
      ['burnHit#6', { name: 'burnHit', tier: 6, count: 2 }],
    ]);
    // maxAllowedTier = maxExistingTier(6) + 1 = 7
    const result = calcMergeable(patches, 7);
    expect(result).toHaveLength(1);
    expect(result[0].tier).toBe(6);
  });

  it('パッチ 0 個のとき空配列を返す', () => {
    const result = calcMergeable(new Map(), 2);
    expect(result).toHaveLength(0);
  });

  it('T100 の高 Tier パッチが 2 個あるとき合成対象に含まれる', () => {
    const patches = new Map<string, PatchEntry>([
      ['boltCast#100', { name: 'boltCast', tier: 100, count: 2 }],
    ]);
    const result = calcMergeable(patches, 101);
    expect(result).toHaveLength(1);
    expect(result[0].tier).toBe(100);
  });

  it('結果は Tier 昇順でソートされる', () => {
    const patches = new Map<string, PatchEntry>([
      ['freezeHit#3', { name: 'freezeHit', tier: 3, count: 2 }],
      ['burnHit#1', { name: 'burnHit', tier: 1, count: 2 }],
      ['damageImmune#2', { name: 'damageImmune', tier: 2, count: 2 }],
    ]);
    const result = calcMergeable(patches, 4);
    expect(result.map((e) => e.tier)).toEqual([1, 2, 3]);
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

  it('T5 パッチ 2 個 → T6 に合成できる (MAX_TIER 制限なし)', () => {
    const patches = new Map<string, PatchEntry>([
      ['freezeHit#5', { name: 'freezeHit', tier: 5, count: 2 }],
    ]);
    // maxTierLimit = maxExistingTier(5) + 1 = 6
    const result = executeMergeAll(patches, 6);
    expect(result.get('freezeHit#5')).toBeUndefined();
    expect(result.get('freezeHit#6')?.count).toBe(1);
  });

  it('T6 パッチ 2 個 → T7 に合成できる (無限 Tier 対応)', () => {
    const patches = new Map<string, PatchEntry>([
      ['freezeHit#6', { name: 'freezeHit', tier: 6, count: 2 }],
    ]);
    // maxTierLimit = maxExistingTier(6) + 1 = 7
    const result = executeMergeAll(patches, 7);
    expect(result.get('freezeHit#6')).toBeUndefined();
    expect(result.get('freezeHit#7')?.count).toBe(1);
  });

  it('T5 × 8 個 → 連続合成で T8 まで到達する', () => {
    // T5×8 → T6×4 → T7×2 → T8×1
    const patches = new Map<string, PatchEntry>([
      ['freezeHit#5', { name: 'freezeHit', tier: 5, count: 8 }],
    ]);
    // maxTierLimit = T8 まで許可
    const result = executeMergeAll(patches, 8);
    expect(result.get('freezeHit#5')).toBeUndefined();
    expect(result.get('freezeHit#6')).toBeUndefined();
    expect(result.get('freezeHit#7')).toBeUndefined();
    expect(result.get('freezeHit#8')?.count).toBe(1);
  });

  it('複数種類パッチが混在するとき各種が独立して合成される', () => {
    const patches = new Map<string, PatchEntry>([
      ['burnHit#1', { name: 'burnHit', tier: 1, count: 2 }],
      ['freezeHit#1', { name: 'freezeHit', tier: 1, count: 2 }],
    ]);
    const result = executeMergeAll(patches, 2);
    expect(result.get('burnHit#1')).toBeUndefined();
    expect(result.get('burnHit#2')?.count).toBe(1);
    expect(result.get('freezeHit#1')).toBeUndefined();
    expect(result.get('freezeHit#2')?.count).toBe(1);
  });

  it('パッチ 0 個のとき空 Map を返す', () => {
    const result = executeMergeAll(new Map(), 5);
    expect(result.size).toBe(0);
  });

  it('T100 × 2 個 → T101 に合成できる (高 Tier 境界値)', () => {
    const patches = new Map<string, PatchEntry>([
      ['burnHit#100', { name: 'burnHit', tier: 100, count: 2 }],
    ]);
    const result = executeMergeAll(patches, 101);
    expect(result.get('burnHit#100')).toBeUndefined();
    expect(result.get('burnHit#101')?.count).toBe(1);
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

  it('maxExistingTier が 7 のとき、ステッパーの + ボタンが Tier8 まで押せる（max = 8）', () => {
    // T7 パッチを所持 → stepperMax = 7 + 1 = 8, 初期 maxTierLimit = 7
    // maxTierLimit(7) + 1(8) <= stepperMax(8) なので + ボタンは有効
    const patches = new Map<string, PatchEntry>([
      ['burnHit#7', { name: 'burnHit', tier: 7, count: 1 }],
    ]);
    render(<PatchMergeTab overridePatches={patches} />);
    const incrementBtn = screen.getByRole('button', { name: '増加' });
    // 初期値 maxTierLimit = 7, max = 8 → まだ上げられる
    expect(incrementBtn).not.toBeDisabled();
  });

  it('T5 パッチ 2 個所持時は合成ボタンが表示される (MAX_TIER 制限なし)', () => {
    const patches = new Map<string, PatchEntry>([
      ['instantKill#5', { name: 'instantKill', tier: 5, count: 2 }],
    ]);
    render(<PatchMergeTab overridePatches={patches} />);
    // 初期 maxTierLimit = 5, calcMergeable(patches, 5+1=6) → tier=5, count=2 は含まれる
    const btn = screen.getByRole('button', { name: /一括合成/ });
    expect(btn).toBeDefined();
  });

  it('パッチ 0 個のとき合成不可メッセージが表示され、ステッパーの値は 1 になる', () => {
    render(<PatchMergeTab overridePatches={new Map()} />);
    expect(screen.getByText('合成可能なパッチがありません')).toBeDefined();
    // stepperMax = Math.max(1) + 1 = 2, 初期 maxTierLimit = Math.max(1) = 1
    // ステッパー表示値が 1 であることを確認
    const stepperValue = screen.getByText('1');
    expect(stepperValue).toBeDefined();
  });

  it('各パッチを 1 個ずつ所持のとき合成対象なしと表示される', () => {
    const patches = new Map<string, PatchEntry>([
      ['burnHit#1', { name: 'burnHit', tier: 1, count: 1 }],
      ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 1 }],
      ['damageImmune#3', { name: 'damageImmune', tier: 3, count: 1 }],
    ]);
    render(<PatchMergeTab overridePatches={patches} />);
    expect(screen.getByText('合成可能なパッチがありません')).toBeDefined();
  });

  it('ステッパーの減少ボタンは min=1 のとき初期値が 1 なら無効化される (パッチ 0 個)', () => {
    render(<PatchMergeTab overridePatches={new Map()} />);
    const decrementBtn = screen.getByRole('button', { name: '減少' });
    // 初期値 = maxExistingTier = 1, min = 1 → 減少不可
    expect(decrementBtn).toBeDisabled();
  });

  describe('SE 配線', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('overridePatches モードでは一括合成ボタンを押しても SE は鳴らない', () => {
      const patches = new Map<string, PatchEntry>([
        ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 2 }],
      ]);
      // overridePatches はストア操作しないため SE は再生されない
      render(<PatchMergeTab overridePatches={patches} />);
      const mergeBtn = screen.getByRole('button', { name: /一括合成/ });
      fireEvent.click(mergeBtn);
      expect(soundEngine.play).not.toHaveBeenCalled();
    });

    it('ストアモードでマージ対象あり → 一括合成で purchaseOk SE が鳴る', () => {
      // ストアに合成可能パッチ (tier=1, count=2) をセット
      useStore.setState({
        patches: new Map([['damageImmune#1', { name: 'damageImmune', tier: 1, count: 2 }]]),
        machineLevels: { ...useStore.getState().machineLevels, patchSlots: 0 },
      });
      render(<PatchMergeTab />);
      const mergeBtn = screen.getByRole('button', { name: /一括合成/ });
      fireEvent.click(mergeBtn);
      expect(soundEngine.play).toHaveBeenCalledWith('purchaseOk');
    });

    it('ストアモードで count=1 のときは「一括合成」 ボタンが存在しない (合成不可表示)', () => {
      useStore.setState({
        patches: new Map([['damageImmune#1', { name: 'damageImmune', tier: 1, count: 1 }]]),
        machineLevels: { ...useStore.getState().machineLevels, patchSlots: 0 },
      });
      render(<PatchMergeTab />);
      expect(screen.queryByRole('button', { name: /一括合成/ })).toBeNull();
    });
  });
});
