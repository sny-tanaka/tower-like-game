import { describe, expect, test } from 'vitest';

import { applyPatchBonusDrop } from '@/game/patches/bonusDrop';
import { applyPatchBurnHit } from '@/game/patches/burnHit';
import { applyPatchDoubleShot } from '@/game/patches/doubleShot';
import { applyPatchFreezeHit } from '@/game/patches/freezeHit';
import { applyPatchInstantKill } from '@/game/patches/instantKill';
import { PROB_PARAMS, linearProb } from '@/game/patches/probability';
import type { EquippedPatch } from '@/game/patches.types';

describe('linearProb', () => {
  test('t1 + step×(T-1) を返す (T1 は t1 そのまま)', () => {
    expect(linearProb(1, PROB_PARAMS.doubleShotLike)).toBeCloseTo(0.05);
    expect(linearProb(10, PROB_PARAMS.doubleShotLike)).toBeCloseTo(0.05 + 0.015 * 9);
  });

  test('instantKill パラメータ (t1=0.02, step=0.006)', () => {
    expect(linearProb(1, PROB_PARAMS.instantKill)).toBeCloseTo(0.02);
    expect(linearProb(10, PROB_PARAMS.instantKill)).toBeCloseTo(0.02 + 0.006 * 9);
  });
});

// ---------------------------------------------------------------------------
// 「表示 (displayInfo.ts) と実装 (各パッチの applyPatch*) が同じ式・同じパラメータを
// 参照している」ことを保証する回帰テスト。 レビュー指摘 (二重定義解消) の要件:
// probability.ts の PROB_PARAMS / linearProb を唯一の発動率ソースとし、
// 実装側が rng の閾値としてまさにこの値を使っていることを、
// 「rng に prob ちょうど未満/以上を与えたときの発火/不発の境界」で確認する。
// ---------------------------------------------------------------------------
describe('表示と実装が同じ発動率式を参照している (probability.ts 一本化の回帰防止)', () => {
  const patch = (name: EquippedPatch['name'], tier: number): EquippedPatch => ({ name, tier });

  test('doubleShot: T5 の発動率は linearProb(5, doubleShotLike) と一致する', () => {
    const T = 5;
    const prob = linearProb(T, PROB_PARAMS.doubleShotLike);
    // rng が prob ちょうどなら「発動しない」 側 (rollOverflowCount: frac>0 && rng()<frac)
    const rngAtBoundary = () => prob;
    const rngJustBelow = () => Math.max(0, prob - 1e-9);
    expect(
      applyPatchDoubleShot(
        patch('doubleShot', T),
        { type: 'onAttack', enemyKind: 'normal' },
        rngAtBoundary
      )
    ).toBeNull();
    expect(
      applyPatchDoubleShot(
        patch('doubleShot', T),
        { type: 'onAttack', enemyKind: 'normal' },
        rngJustBelow
      )?.extraShots
    ).toBe(1);
  });

  test('instantKill: T5 の発動率は linearProb(5, instantKill) と一致する', () => {
    const T = 5;
    const prob = linearProb(T, PROB_PARAMS.instantKill);
    const rngAtBoundary = () => prob;
    const rngJustBelow = () => Math.max(0, prob - 1e-9);
    expect(
      applyPatchInstantKill(
        patch('instantKill', T),
        { type: 'onAttack', enemyKind: 'normal' },
        rngAtBoundary
      )
    ).toBeNull();
    expect(
      applyPatchInstantKill(
        patch('instantKill', T),
        { type: 'onAttack', enemyKind: 'normal' },
        rngJustBelow
      )?.instantKill
    ).toBe(true);
  });

  test('bonusDrop: T5 の発動率は linearProb(5, doubleShotLike) と一致する', () => {
    const T = 5;
    const prob = linearProb(T, PROB_PARAMS.doubleShotLike);
    const rngAtBoundary = () => prob;
    const rngJustBelow = () => Math.max(0, prob - 1e-9);
    const trigger = { type: 'onDropRoll' as const, baseDrops: { screw: 1, bolt: 0, alloy: 0 } };
    expect(applyPatchBonusDrop(patch('bonusDrop', T), trigger, rngAtBoundary)).toBeNull();
    expect(applyPatchBonusDrop(patch('bonusDrop', T), trigger, rngJustBelow)?.dropMultiplier).toBe(
      2
    );
  });

  test('freezeHit: T5 の発動率は min(1, linearProb(5, doubleShotLike)) と一致する', () => {
    const T = 5;
    const prob = Math.min(1, linearProb(T, PROB_PARAMS.doubleShotLike));
    const rngAtBoundary = () => prob;
    const rngJustBelow = () => Math.max(0, prob - 1e-9);
    const trigger = { type: 'onAttack' as const, enemyKind: 'normal' as const };
    expect(applyPatchFreezeHit(patch('freezeHit', T), trigger, rngAtBoundary)).toBeNull();
    expect(applyPatchFreezeHit(patch('freezeHit', T), trigger, rngJustBelow)?.freeze).toBe(true);
  });

  test('burnHit: T5 の発動率は min(1, linearProb(5, doubleShotLike)) と一致する', () => {
    const T = 5;
    const prob = Math.min(1, linearProb(T, PROB_PARAMS.doubleShotLike));
    const rngAtBoundary = () => prob;
    const rngJustBelow = () => Math.max(0, prob - 1e-9);
    const trigger = { type: 'onAttack' as const, enemyKind: 'normal' as const };
    expect(applyPatchBurnHit(patch('burnHit', T), trigger, rngAtBoundary)).toBeNull();
    expect(applyPatchBurnHit(patch('burnHit', T), trigger, rngJustBelow)?.burnSec).toBeCloseTo(
      1 + 0.2 * T
    );
  });
});
