import { describe, it, expect } from 'vitest';

import { evaluatePatches } from '@/game/patches';
import { applyPatchBoltCast } from '@/game/patches/boltCast';
import { applyPatchBonusDrop } from '@/game/patches/bonusDrop';
import { applyPatchBossKiller } from '@/game/patches/bossKiller';
import { applyPatchBurnHit } from '@/game/patches/burnHit';
import { applyPatchDamageImmune } from '@/game/patches/damageImmune';
import { applyPatchDoubleShot } from '@/game/patches/doubleShot';
import { applyPatchFreezeHit } from '@/game/patches/freezeHit';
import { applyPatchInstantKill } from '@/game/patches/instantKill';
import { applyPatchKillHeal } from '@/game/patches/killHeal';
import { applyPatchShieldRegen } from '@/game/patches/shieldRegen';
import type { EquippedPatch, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// ヘルパ
// ---------------------------------------------------------------------------

/** 常に指定値を返す rng */
const fixedRng = (v: number) => () => v;

const triggerAttackNormal: PatchTrigger = { type: 'onAttack', enemyKind: 'normal' };
const triggerAttackBoss: PatchTrigger = { type: 'onAttack', enemyKind: 'boss' };
const triggerAttackElite: PatchTrigger = { type: 'onAttack', enemyKind: 'elite' };
const triggerHit: PatchTrigger = { type: 'onHit', receivedDamage: BigNum.fromNumber(100) };
const triggerKillNormal: PatchTrigger = { type: 'onKill', enemyKind: 'normal' };
const triggerKillBoss: PatchTrigger = { type: 'onKill', enemyKind: 'boss' };
const triggerDrop: PatchTrigger = {
  type: 'onDropRoll',
  baseDrops: { screw: 10, bolt: 5, alloy: 0 },
};
const triggerInterval: PatchTrigger = { type: 'interval', deltaMs: 1000 };
const triggerWaveClear: PatchTrigger = { type: 'onWaveClear' };

// ---------------------------------------------------------------------------
// instantKill
// ---------------------------------------------------------------------------

describe('instantKill', () => {
  const patch: EquippedPatch = { name: 'instantKill', tier: 1 };

  it('onAttack(normal) + rng < prob → instantKill: true', () => {
    // T=1: p = 0.02 + (0.20-0.02)*1/(1+20) = 0.02 + 0.18/21 ≈ 0.02857
    const effect = applyPatchInstantKill(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.instantKill).toBe(true);
  });

  it('onAttack(normal) + rng >= prob → null', () => {
    const effect = applyPatchInstantKill(patch, triggerAttackNormal, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onAttack(boss) → null（ボスには発動しない）', () => {
    const effect = applyPatchInstantKill(patch, triggerAttackBoss, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('onAttack(elite) → null（エリートには発動しない）', () => {
    const effect = applyPatchInstantKill(patch, triggerAttackElite, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('onHit → null（対応外トリガー）', () => {
    const effect = applyPatchInstantKill(patch, triggerHit, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('Tier スケール: T10 の確率が T1 より高い', () => {
    const patchT10: EquippedPatch = { name: 'instantKill', tier: 10 };
    // T=1: p ≈ 2.857%  T=10: p = 0.02 + 0.18*10/30 ≈ 8%
    // prob(T10) ≈ 0.08 → rng=0.05 で T10 は発火、T1 は発火しない
    const rng05 = fixedRng(0.05);
    expect(applyPatchInstantKill(patch, triggerAttackNormal, rng05)).toBeNull();
    expect(applyPatchInstantKill(patchT10, triggerAttackNormal, rng05)?.instantKill).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// bossKiller
// ---------------------------------------------------------------------------

describe('bossKiller', () => {
  it('onAttack(boss) → damageMultiplier = 1 + 0.05*T', () => {
    const patch: EquippedPatch = { name: 'bossKiller', tier: 5 };
    const effect = applyPatchBossKiller(patch, triggerAttackBoss, fixedRng(0));
    expect(effect?.damageMultiplier).toBeCloseTo(1.25);
  });

  it('onAttack(elite) → damageMultiplier あり', () => {
    const patch: EquippedPatch = { name: 'bossKiller', tier: 1 };
    const effect = applyPatchBossKiller(patch, triggerAttackElite, fixedRng(0));
    expect(effect?.damageMultiplier).toBeCloseTo(1.05);
  });

  it('onAttack(normal) → null', () => {
    const patch: EquippedPatch = { name: 'bossKiller', tier: 5 };
    const effect = applyPatchBossKiller(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('onKill → null（対応外トリガー）', () => {
    const patch: EquippedPatch = { name: 'bossKiller', tier: 5 };
    const effect = applyPatchBossKiller(patch, triggerKillBoss, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// doubleShot
// ---------------------------------------------------------------------------

describe('doubleShot', () => {
  const patch: EquippedPatch = { name: 'doubleShot', tier: 1 };

  it('onAttack + rng < prob → extraShot: true', () => {
    const effect = applyPatchDoubleShot(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.extraShot).toBe(true);
  });

  it('onAttack + rng >= prob → null', () => {
    const effect = applyPatchDoubleShot(patch, triggerAttackNormal, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onHit → null（対応外トリガー）', () => {
    const effect = applyPatchDoubleShot(patch, triggerHit, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('Tier スケール: T=20 の確率が T=1 より高い', () => {
    const patchT20: EquippedPatch = { name: 'doubleShot', tier: 20 };
    // T=1: p ≈ 7.14%  T=20: p ≈ 27.5%
    // rng=0.15 で T1 は null、T20 は発火
    const rng15 = fixedRng(0.15);
    expect(applyPatchDoubleShot(patch, triggerAttackNormal, rng15)).toBeNull();
    expect(applyPatchDoubleShot(patchT20, triggerAttackNormal, rng15)?.extraShot).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// damageImmune
// ---------------------------------------------------------------------------

describe('damageImmune', () => {
  const patch: EquippedPatch = { name: 'damageImmune', tier: 1 };

  it('onHit + rng < prob → overrideReceivedDamage = ZERO', () => {
    const effect = applyPatchDamageImmune(patch, triggerHit, fixedRng(0));
    expect(effect?.overrideReceivedDamage?.isZero()).toBe(true);
  });

  it('onHit + rng >= prob → null', () => {
    const effect = applyPatchDamageImmune(patch, triggerHit, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onAttack → null（対応外トリガー）', () => {
    const effect = applyPatchDamageImmune(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('Tier スケール: T=10 の確率が T=1 より高い', () => {
    const patchT10: EquippedPatch = { name: 'damageImmune', tier: 10 };
    // T=1: p ≈ 4.29%  T=10: p = 3% + 27%*10/30 = 12%
    // rng=0.08 で T1 は null、T10 は発火
    const rng08 = fixedRng(0.08);
    expect(applyPatchDamageImmune(patch, triggerHit, rng08)).toBeNull();
    expect(
      applyPatchDamageImmune(patchT10, triggerHit, rng08)?.overrideReceivedDamage?.isZero()
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// killHeal
// ---------------------------------------------------------------------------

describe('killHeal', () => {
  it('onKill → heal = ceil(0.5 * T)', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 1 };
    const effect = applyPatchKillHeal(patch, triggerKillNormal, fixedRng(0));
    // T=1: ceil(0.5) = 1
    expect(effect?.heal?.toString()).toBe('1');
  });

  it('T=4 → heal = 2', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 4 };
    const effect = applyPatchKillHeal(patch, triggerKillNormal, fixedRng(0));
    // T=4: ceil(2.0) = 2
    expect(effect?.heal?.toString()).toBe('2');
  });

  it('T=5 → heal = ceil(2.5) = 3', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 5 };
    const effect = applyPatchKillHeal(patch, triggerKillNormal, fixedRng(0));
    expect(effect?.heal?.toString()).toBe('3');
  });

  it('onAttack → null（対応外トリガー）', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 1 };
    const effect = applyPatchKillHeal(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// shieldRegen
// ---------------------------------------------------------------------------

describe('shieldRegen', () => {
  it('onWaveClear → heal = 5 * T (HP 回復に振替)', () => {
    const patch: EquippedPatch = { name: 'shieldRegen', tier: 3 };
    const effect = applyPatchShieldRegen(patch, triggerWaveClear, fixedRng(0));
    expect(effect?.heal?.toString()).toBe('15');
  });

  it('onAttack → null（対応外トリガー）', () => {
    const patch: EquippedPatch = { name: 'shieldRegen', tier: 3 };
    const effect = applyPatchShieldRegen(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('interval → null (onWaveClear 専用に変更されたため)', () => {
    const patch: EquippedPatch = { name: 'shieldRegen', tier: 3 };
    const effect = applyPatchShieldRegen(patch, triggerInterval, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// bonusDrop
// ---------------------------------------------------------------------------

describe('bonusDrop', () => {
  const patch: EquippedPatch = { name: 'bonusDrop', tier: 1 };

  it('onDropRoll + rng < prob → dropMultiplier = 2', () => {
    const effect = applyPatchBonusDrop(patch, triggerDrop, fixedRng(0));
    expect(effect?.dropMultiplier).toBe(2);
  });

  it('onDropRoll + rng >= prob → null', () => {
    const effect = applyPatchBonusDrop(patch, triggerDrop, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onAttack → null（対応外トリガー）', () => {
    const effect = applyPatchBonusDrop(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// boltCast
// ---------------------------------------------------------------------------

describe('boltCast', () => {
  it('onWaveClear → boltGain = 5 * T (currencies.bolt 加算用)', () => {
    const patch: EquippedPatch = { name: 'boltCast', tier: 2 };
    const effect = applyPatchBoltCast(patch, triggerWaveClear, fixedRng(0));
    expect(effect?.boltGain?.toString()).toBe('10');
  });

  it('onAttack → null（対応外トリガー）', () => {
    const patch: EquippedPatch = { name: 'boltCast', tier: 1 };
    const effect = applyPatchBoltCast(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('interval → null (onWaveClear 専用に変更されたため)', () => {
    const patch: EquippedPatch = { name: 'boltCast', tier: 1 };
    const effect = applyPatchBoltCast(patch, triggerInterval, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// freezeHit
// ---------------------------------------------------------------------------

describe('freezeHit', () => {
  const patch: EquippedPatch = { name: 'freezeHit', tier: 1 };

  it('onAttack + rng < prob → freeze: true, freezeSec = 1 + 0.2*T', () => {
    const effect = applyPatchFreezeHit(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.freeze).toBe(true);
    expect(effect?.freezeSec).toBeCloseTo(1.2);
  });

  it('T=5 → freezeSec = 2.0', () => {
    const patchT5: EquippedPatch = { name: 'freezeHit', tier: 5 };
    const effect = applyPatchFreezeHit(patchT5, triggerAttackNormal, fixedRng(0));
    expect(effect?.freezeSec).toBeCloseTo(2.0);
  });

  it('onAttack + rng >= prob → null', () => {
    const effect = applyPatchFreezeHit(patch, triggerAttackNormal, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onHit → null（対応外トリガー）', () => {
    const effect = applyPatchFreezeHit(patch, triggerHit, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// burnHit
// ---------------------------------------------------------------------------

describe('burnHit', () => {
  const patch: EquippedPatch = { name: 'burnHit', tier: 1 };

  it('onAttack + rng < prob → burnSec = 1 + 0.2*T', () => {
    const effect = applyPatchBurnHit(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.burnSec).toBeCloseTo(1.2);
  });

  it('T=10 → burnSec = 3.0', () => {
    const patchT10: EquippedPatch = { name: 'burnHit', tier: 10 };
    const effect = applyPatchBurnHit(patchT10, triggerAttackNormal, fixedRng(0));
    expect(effect?.burnSec).toBeCloseTo(3.0);
  });

  it('onAttack + rng >= prob → null', () => {
    const effect = applyPatchBurnHit(patch, triggerAttackNormal, fixedRng(1));
    expect(effect).toBeNull();
  });

  it('onHit → null（対応外トリガー）', () => {
    const effect = applyPatchBurnHit(patch, triggerHit, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// evaluatePatches (統合)
// ---------------------------------------------------------------------------

describe('evaluatePatches', () => {
  it('空配列 → 空 PatchEffect', () => {
    const effect = evaluatePatches([], triggerAttackNormal, fixedRng(0));
    expect(effect).toEqual({});
  });

  it('発火しないパッチのみ → 空 PatchEffect', () => {
    const equipped: EquippedPatch[] = [{ name: 'shieldRegen', tier: 1 }];
    const effect = evaluatePatches(equipped, triggerAttackNormal, fixedRng(0));
    expect(effect).toEqual({});
  });

  it('bossKiller T5 のみ → damageMultiplier = 1.25', () => {
    const equipped: EquippedPatch[] = [{ name: 'bossKiller', tier: 5 }];
    const effect = evaluatePatches(equipped, triggerAttackBoss, fixedRng(0));
    expect(effect.damageMultiplier).toBeCloseTo(1.25);
  });

  it('複数パッチ同時: bossKiller T5 + bossKiller × 別名だが同トリガー → damageMultiplier が合算', () => {
    // 同名装着禁止なので実際には起きないが、統合ロジックのテスト用に同効果を2つ入れる
    // ここでは別のパッチ名でも damageMultiplier が返せるように bossKiller を2つ (tier 違い) 入れる
    // ただし仕様では同名装着禁止なので、tier 違いの別パッチとして扱う
    const equipped: EquippedPatch[] = [
      { name: 'bossKiller', tier: 5 },
      { name: 'bossKiller', tier: 5 },
    ];
    const effect = evaluatePatches(equipped, triggerAttackBoss, fixedRng(0));
    // 1.25 の2つ → 加算: 1 + 0.25 + 0.25 = 1.5
    expect(effect.damageMultiplier).toBeCloseTo(1.5);
  });

  it('killHeal + shieldRegen → killHeal は onKill、shieldRegen は onWaveClear → それぞれ別トリガー', () => {
    const equipped: EquippedPatch[] = [
      { name: 'killHeal', tier: 2 },
      { name: 'shieldRegen', tier: 2 },
    ];
    // onKill では killHeal のみ発火 (heal=1)
    const killEffect = evaluatePatches(equipped, triggerKillNormal, fixedRng(0));
    expect(killEffect.heal?.toString()).toBe('1');

    // onWaveClear では shieldRegen のみ発火 (heal=5*T=10)
    const clearEffect = evaluatePatches(equipped, triggerWaveClear, fixedRng(0));
    expect(clearEffect.heal?.toString()).toBe('10');
  });

  it('instantKill + doubleShot → onAttack(normal) で両方独立判定', () => {
    // rng=0 で両方発火
    const equipped: EquippedPatch[] = [
      { name: 'instantKill', tier: 1 },
      { name: 'doubleShot', tier: 1 },
    ];
    const effect = evaluatePatches(equipped, triggerAttackNormal, fixedRng(0));
    expect(effect.instantKill).toBe(true);
    expect(effect.extraShot).toBe(true);
  });

  it('damageImmune 発火 → overrideReceivedDamage = ZERO', () => {
    const equipped: EquippedPatch[] = [{ name: 'damageImmune', tier: 1 }];
    const effect = evaluatePatches(equipped, triggerHit, fixedRng(0));
    expect(effect.overrideReceivedDamage?.isZero()).toBe(true);
  });

  it('shieldRegen + boltCast (onWaveClear) → 両方発火し合算', () => {
    const equipped: EquippedPatch[] = [
      { name: 'shieldRegen', tier: 2 },
      { name: 'boltCast', tier: 3 },
    ];
    const effect = evaluatePatches(equipped, triggerWaveClear, fixedRng(0));
    // shieldRegen: heal=5*2=10、 boltCast: boltGain=5*3=15
    expect(effect.heal?.toString()).toBe('10');
    expect(effect.boltGain?.toString()).toBe('15');
  });

  it('freezeHit + burnHit → onAttack で両方発火', () => {
    const equipped: EquippedPatch[] = [
      { name: 'freezeHit', tier: 5 },
      { name: 'burnHit', tier: 5 },
    ];
    const effect = evaluatePatches(equipped, triggerAttackNormal, fixedRng(0));
    expect(effect.freeze).toBe(true);
    expect(effect.freezeSec).toBeCloseTo(2.0);
    expect(effect.burnSec).toBeCloseTo(2.0);
  });

  it('bonusDrop が onDropRoll で発火', () => {
    const equipped: EquippedPatch[] = [{ name: 'bonusDrop', tier: 10 }];
    const effect = evaluatePatches(equipped, triggerDrop, fixedRng(0));
    expect(effect.dropMultiplier).toBe(2);
  });
});
