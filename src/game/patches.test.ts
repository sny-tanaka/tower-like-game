import { describe, it, expect } from 'vitest';

import { evaluatePatches } from '@/game/patches';
import { applyPatchBoltCast, getBoltGainMultiplier } from '@/game/patches/boltCast';
import { applyPatchBonusDrop } from '@/game/patches/bonusDrop';
import { applyPatchBossKiller } from '@/game/patches/bossKiller';
import { applyPatchBurnHit } from '@/game/patches/burnHit';
import { applyPatchDamageImmune, getBarrierCapacity } from '@/game/patches/damageImmune';
import { applyPatchDoubleShot } from '@/game/patches/doubleShot';
import { applyPatchFreezeHit, getFrozenDamageBonusMul } from '@/game/patches/freezeHit';
import { applyPatchInstantKill } from '@/game/patches/instantKill';
import { applyPatchKillHeal } from '@/game/patches/killHeal';
import { applyPatchShieldRegen, getShieldRegenMultiplier } from '@/game/patches/shieldRegen';
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
const killTrigger = (hpRegen: number): PatchTrigger => ({
  type: 'onKill',
  enemyKind: 'normal',
  hpRegen: BigNum.fromNumber(hpRegen),
});
const triggerKillNormal = killTrigger(10);
const triggerKillBoss: PatchTrigger = {
  type: 'onKill',
  enemyKind: 'boss',
  hpRegen: BigNum.fromNumber(10),
};
const triggerDrop: PatchTrigger = {
  type: 'onDropRoll',
  baseDrops: { screw: 10, bolt: 5, alloy: 0 },
};
const triggerInterval: PatchTrigger = { type: 'interval', deltaMs: 1000 };
const triggerWaveClear: PatchTrigger = { type: 'onWaveClear' };

// ---------------------------------------------------------------------------
// instantKill — オーバーフロー型: p = 2% + 0.6%*(T-1)
// ---------------------------------------------------------------------------

describe('instantKill', () => {
  const patch: EquippedPatch = { name: 'instantKill', tier: 1 };

  it('onAttack(normal) + rng < prob → instantKill: true', () => {
    // T=1: p = 0.02
    const effect = applyPatchInstantKill(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.instantKill).toBe(true);
    expect(effect?.extraInstantKills).toBeUndefined();
  });

  it('onAttack(normal) + rng >= prob → null', () => {
    const effect = applyPatchInstantKill(patch, triggerAttackNormal, fixedRng(0.999));
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

  it('T31: p = 0.02 + 0.006*30 = 0.2 → rng=0.15 で発火、rng=0.25 で不発', () => {
    const patchT31: EquippedPatch = { name: 'instantKill', tier: 31 };
    expect(applyPatchInstantKill(patchT31, triggerAttackNormal, fixedRng(0.15))?.instantKill).toBe(
      true
    );
    expect(applyPatchInstantKill(patchT31, triggerAttackNormal, fixedRng(0.25))).toBeNull();
  });

  it('T64: p = 0.02 + 0.006*63 = 0.398 (100% 未満、超過なし)', () => {
    const patchT64: EquippedPatch = { name: 'instantKill', tier: 64 };
    const effect = applyPatchInstantKill(patchT64, triggerAttackNormal, fixedRng(0.39));
    expect(effect?.instantKill).toBe(true);
    expect(effect?.extraInstantKills).toBeUndefined();
  });

  it('p が 100% を超えたら extraInstantKills が繰り越される (T=200 で p=2.194)', () => {
    // T=200: p = 0.02 + 0.006*199 = 1.214
    const patchT200: EquippedPatch = { name: 'instantKill', tier: 200 };
    // frac = 0.214, rng=0 → floor(1.214)=1 + 1 = 2 kills → instantKill + extraInstantKills=1
    const effect = applyPatchInstantKill(patchT200, triggerAttackNormal, fixedRng(0));
    expect(effect?.instantKill).toBe(true);
    expect(effect?.extraInstantKills).toBe(1);
  });

  it('Tier スケール: T10 の確率が T1 より高い', () => {
    const patchT10: EquippedPatch = { name: 'instantKill', tier: 10 };
    // T1: p=0.02  T10: p = 0.02 + 0.006*9 = 0.074
    const rng05 = fixedRng(0.05);
    expect(applyPatchInstantKill(patch, triggerAttackNormal, rng05)).toBeNull();
    expect(applyPatchInstantKill(patchT10, triggerAttackNormal, rng05)?.instantKill).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// bossKiller (変更なし)
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
// doubleShot — オーバーフロー型: p = 5% + 1.5%*(T-1)
// ---------------------------------------------------------------------------

describe('doubleShot', () => {
  const patch: EquippedPatch = { name: 'doubleShot', tier: 1 };

  it('onAttack + rng < prob → extraShots: 1', () => {
    // T1: p=0.05 → frac=0.05, floor=0. rng=0 < 0.05 → 1
    const effect = applyPatchDoubleShot(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.extraShots).toBe(1);
  });

  it('onAttack + rng >= prob → null', () => {
    const effect = applyPatchDoubleShot(patch, triggerAttackNormal, fixedRng(0.999));
    expect(effect).toBeNull();
  });

  it('onHit 相当のトリガーは存在しないため onDropRoll で null（対応外トリガー）', () => {
    const effect = applyPatchDoubleShot(patch, triggerDrop, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('Tier スケール: T=31 で p=50%、T=1 より高い', () => {
    const patchT31: EquippedPatch = { name: 'doubleShot', tier: 31 };
    // T1: p=5%  T31: p = 0.05 + 0.015*30 = 0.5
    const rng30 = fixedRng(0.3);
    expect(applyPatchDoubleShot(patch, triggerAttackNormal, rng30)).toBeNull();
    expect(applyPatchDoubleShot(patchT31, triggerAttackNormal, rng30)?.extraShots).toBe(1);
  });

  it('T=64 → p ≈ 0.995 (100%未満)。 rng=0.99 で発火', () => {
    const patchT64: EquippedPatch = { name: 'doubleShot', tier: 64 };
    const effect = applyPatchDoubleShot(patchT64, triggerAttackNormal, fixedRng(0.99));
    expect(effect?.extraShots).toBe(1);
  });

  it('T=97 → p = 1.49 (150% 超過)。 rng=0 で確定2 + 端数49%で3、rng=0.999 で確定2止まり', () => {
    const patchT97: EquippedPatch = { name: 'doubleShot', tier: 97 };
    expect(applyPatchDoubleShot(patchT97, triggerAttackNormal, fixedRng(0))?.extraShots).toBe(2);
    expect(applyPatchDoubleShot(patchT97, triggerAttackNormal, fixedRng(0.999))?.extraShots).toBe(
      1
    );
  });
});

// ---------------------------------------------------------------------------
// damageImmune → バリア機構 (確率廃止、常に null)
// ---------------------------------------------------------------------------

describe('damageImmune', () => {
  const patch: EquippedPatch = { name: 'damageImmune', tier: 5 };

  it('applyPatchDamageImmune は常に null (確率判定なし、onHit トリガー自体廃止)', () => {
    expect(applyPatchDamageImmune(patch, triggerAttackNormal, fixedRng(0))).toBeNull();
    expect(applyPatchDamageImmune(patch, triggerWaveClear, fixedRng(0))).toBeNull();
    expect(applyPatchDamageImmune(patch, triggerKillNormal, fixedRng(0))).toBeNull();
  });

  it('getBarrierCapacity: 未装着 → 0', () => {
    expect(getBarrierCapacity([])).toBe(0);
  });

  it('getBarrierCapacity: T1 → 1、T10 → 10 (1×T)', () => {
    expect(getBarrierCapacity([{ name: 'damageImmune', tier: 1 }])).toBe(1);
    expect(getBarrierCapacity([{ name: 'damageImmune', tier: 10 }])).toBe(10);
  });

  it('getBarrierCapacity: 他パッチが混ざっていても damageImmune の Tier を拾う', () => {
    const patches: EquippedPatch[] = [
      { name: 'bossKiller', tier: 20 },
      { name: 'damageImmune', tier: 7 },
    ];
    expect(getBarrierCapacity(patches)).toBe(7);
  });
});

// ---------------------------------------------------------------------------
// killHeal — hpRegen 基準
// ---------------------------------------------------------------------------

describe('killHeal', () => {
  it('onKill → heal = hpRegen × 0.2 × T (T=1, hpRegen=10 → 2)', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 1 };
    const effect = applyPatchKillHeal(patch, killTrigger(10), fixedRng(0));
    // 10 * 0.2 * 1 = 2
    expect(effect?.heal?.toString()).toBe('2');
  });

  it('T=5, hpRegen=10 → heal = 10*0.2*5 = 10', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 5 };
    const effect = applyPatchKillHeal(patch, killTrigger(10), fixedRng(0));
    expect(effect?.heal?.toString()).toBe('10');
  });

  it('hpRegen が変われば heal も比例して変わる (乗算で追従)', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 2 };
    const effectLowRegen = applyPatchKillHeal(patch, killTrigger(5), fixedRng(0));
    const effectHighRegen = applyPatchKillHeal(patch, killTrigger(50), fixedRng(0));
    // T=2: heal = hpRegen * 0.4
    expect(effectLowRegen?.heal?.toString()).toBe('2');
    expect(effectHighRegen?.heal?.toString()).toBe('20');
  });

  it('onAttack → null（対応外トリガー）', () => {
    const patch: EquippedPatch = { name: 'killHeal', tier: 1 };
    const effect = applyPatchKillHeal(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// shieldRegen — 常時パッシブ化 (onWaveClear の heal は廃止)
// ---------------------------------------------------------------------------

describe('shieldRegen', () => {
  it('applyPatchShieldRegen は常に null (onWaveClear の heal を廃止)', () => {
    const patch: EquippedPatch = { name: 'shieldRegen', tier: 3 };
    expect(applyPatchShieldRegen(patch, triggerWaveClear, fixedRng(0))).toBeNull();
    expect(applyPatchShieldRegen(patch, triggerAttackNormal, fixedRng(0))).toBeNull();
    expect(applyPatchShieldRegen(patch, triggerInterval, fixedRng(0))).toBeNull();
  });

  it('getShieldRegenMultiplier: 未装着 → 1.0', () => {
    expect(getShieldRegenMultiplier([])).toBe(1);
  });

  it('getShieldRegenMultiplier: T1 → 1.05、T10 → 1.5 (1+0.05×T)', () => {
    expect(getShieldRegenMultiplier([{ name: 'shieldRegen', tier: 1 }])).toBeCloseTo(1.05);
    expect(getShieldRegenMultiplier([{ name: 'shieldRegen', tier: 10 }])).toBeCloseTo(1.5);
  });
});

// ---------------------------------------------------------------------------
// bonusDrop — オーバーフロー型: p = 5% + 1.5%*(T-1)、超過は倍率段階
// ---------------------------------------------------------------------------

describe('bonusDrop', () => {
  const patch: EquippedPatch = { name: 'bonusDrop', tier: 1 };

  it('onDropRoll + rng < prob → dropMultiplier = 2', () => {
    const effect = applyPatchBonusDrop(patch, triggerDrop, fixedRng(0));
    expect(effect?.dropMultiplier).toBe(2);
  });

  it('onDropRoll + rng >= prob → null', () => {
    const effect = applyPatchBonusDrop(patch, triggerDrop, fixedRng(0.999));
    expect(effect).toBeNull();
  });

  it('onAttack → null（対応外トリガー）', () => {
    const effect = applyPatchBonusDrop(patch, triggerAttackNormal, fixedRng(0));
    expect(effect).toBeNull();
  });

  it('T=10 → p = 0.05 + 0.015*9 = 0.185 (100%未満、超過なし)', () => {
    const patchT10: EquippedPatch = { name: 'bonusDrop', tier: 10 };
    expect(applyPatchBonusDrop(patchT10, triggerDrop, fixedRng(0.1))?.dropMultiplier).toBe(2);
    expect(applyPatchBonusDrop(patchT10, triggerDrop, fixedRng(0.2))).toBeNull();
  });

  it('T=31 → p = 0.05 + 0.015*30 = 0.5 (T1 より高い)', () => {
    const patchT31: EquippedPatch = { name: 'bonusDrop', tier: 31 };
    const rng30 = fixedRng(0.3);
    expect(applyPatchBonusDrop(patch, triggerDrop, rng30)).toBeNull();
    expect(applyPatchBonusDrop(patchT31, triggerDrop, rng30)?.dropMultiplier).toBe(2);
  });

  it('T=64 → p ≈ 0.995 (100%未満)', () => {
    const patchT64: EquippedPatch = { name: 'bonusDrop', tier: 64 };
    expect(applyPatchBonusDrop(patchT64, triggerDrop, fixedRng(0.99))?.dropMultiplier).toBe(2);
  });

  it('T=97 → p=1.49、超過分は dropMultiplier に繰り越し (確定x2 + 49%でx3)', () => {
    const patchT97: EquippedPatch = { name: 'bonusDrop', tier: 97 };
    expect(applyPatchBonusDrop(patchT97, triggerDrop, fixedRng(0))?.dropMultiplier).toBe(3);
    expect(applyPatchBonusDrop(patchT97, triggerDrop, fixedRng(0.999))?.dropMultiplier).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// boltCast — 常時パッシブ化 (onWaveClear の boltGain は廃止)
// ---------------------------------------------------------------------------

describe('boltCast', () => {
  it('applyPatchBoltCast は常に null (onWaveClear の boltGain を廃止)', () => {
    const patch: EquippedPatch = { name: 'boltCast', tier: 2 };
    expect(applyPatchBoltCast(patch, triggerWaveClear, fixedRng(0))).toBeNull();
    expect(applyPatchBoltCast(patch, triggerAttackNormal, fixedRng(0))).toBeNull();
    expect(applyPatchBoltCast(patch, triggerInterval, fixedRng(0))).toBeNull();
  });

  it('getBoltGainMultiplier: 未装着 → 1.0', () => {
    expect(getBoltGainMultiplier([])).toBe(1);
  });

  it('getBoltGainMultiplier: T1 → 1.02、T10 → 1.2 (1+0.02×T)', () => {
    expect(getBoltGainMultiplier([{ name: 'boltCast', tier: 1 }])).toBeCloseTo(1.02);
    expect(getBoltGainMultiplier([{ name: 'boltCast', tier: 10 }])).toBeCloseTo(1.2);
  });
});

// ---------------------------------------------------------------------------
// freezeHit — 別軸型: 発動率は 100% 飽和、凍結中与ダメ+2%×T は別軸
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
    const effect = applyPatchFreezeHit(patch, triggerAttackNormal, fixedRng(0.999));
    expect(effect).toBeNull();
  });

  it('T=31 → p = 0.05 + 0.015*30 = 0.5 (T1 より高い)', () => {
    const patchT31: EquippedPatch = { name: 'freezeHit', tier: 31 };
    const rng30 = fixedRng(0.3);
    expect(applyPatchFreezeHit(patch, triggerAttackNormal, rng30)).toBeNull();
    expect(applyPatchFreezeHit(patchT31, triggerAttackNormal, rng30)?.freeze).toBe(true);
  });

  it('T=64 → p ≈ 0.995 (100%未満)', () => {
    const patchT64: EquippedPatch = { name: 'freezeHit', tier: 64 };
    expect(applyPatchFreezeHit(patchT64, triggerAttackNormal, fixedRng(0.99))?.freeze).toBe(true);
  });

  it('T=100 (p が理論上 100% 超) でも発動率は 1.0 に飽和し繰り越しなし', () => {
    const patchT100: EquippedPatch = { name: 'freezeHit', tier: 100 };
    // rng=0.999 でも必ず発火 (min(1,...) で 100%)
    expect(applyPatchFreezeHit(patchT100, triggerAttackNormal, fixedRng(0.999))?.freeze).toBe(true);
  });

  it('getFrozenDamageBonusMul: 未装着 → 1.0', () => {
    expect(getFrozenDamageBonusMul([])).toBe(1);
  });

  it('getFrozenDamageBonusMul: T1 → 1.02、T10 → 1.2 (1+0.02×T)', () => {
    expect(getFrozenDamageBonusMul([{ name: 'freezeHit', tier: 1 }])).toBeCloseTo(1.02);
    expect(getFrozenDamageBonusMul([{ name: 'freezeHit', tier: 10 }])).toBeCloseTo(1.2);
  });
});

// ---------------------------------------------------------------------------
// burnHit — 別軸型: 発動率は 100% 飽和、DoT係数(30+3×T)%/秒
// ---------------------------------------------------------------------------

describe('burnHit', () => {
  const patch: EquippedPatch = { name: 'burnHit', tier: 1 };

  it('onAttack + rng < prob → burnSec = 1 + 0.2*T, burnDotFraction = 0.30 + 0.03*T', () => {
    const effect = applyPatchBurnHit(patch, triggerAttackNormal, fixedRng(0));
    expect(effect?.burnSec).toBeCloseTo(1.2);
    expect(effect?.burnDotFraction).toBeCloseTo(0.33);
  });

  it('T=10 → burnSec = 3.0, burnDotFraction = 0.6', () => {
    const patchT10: EquippedPatch = { name: 'burnHit', tier: 10 };
    const effect = applyPatchBurnHit(patchT10, triggerAttackNormal, fixedRng(0));
    expect(effect?.burnSec).toBeCloseTo(3.0);
    expect(effect?.burnDotFraction).toBeCloseTo(0.6);
  });

  it('T=24 → burnDotFraction ≈ 1.02 (毎秒通常攻撃1発分に到達する Tier)', () => {
    const patchT24: EquippedPatch = { name: 'burnHit', tier: 24 };
    const effect = applyPatchBurnHit(patchT24, triggerAttackNormal, fixedRng(0));
    // 0.30 + 0.03*24 = 1.02
    expect(effect?.burnDotFraction).toBeCloseTo(1.02);
  });

  it('onAttack + rng >= prob → null', () => {
    const effect = applyPatchBurnHit(patch, triggerAttackNormal, fixedRng(0.999));
    expect(effect).toBeNull();
  });

  it('T=31 → p = 0.05 + 0.015*30 = 0.5 (T1 より高い)', () => {
    const patchT31: EquippedPatch = { name: 'burnHit', tier: 31 };
    const rng30 = fixedRng(0.3);
    expect(applyPatchBurnHit(patch, triggerAttackNormal, rng30)).toBeNull();
    expect(applyPatchBurnHit(patchT31, triggerAttackNormal, rng30)).not.toBeNull();
  });

  it('T=64 → p ≈ 0.995 (100%未満)', () => {
    const patchT64: EquippedPatch = { name: 'burnHit', tier: 64 };
    expect(applyPatchBurnHit(patchT64, triggerAttackNormal, fixedRng(0.99))).not.toBeNull();
  });

  it('T=100 でも発動率は 1.0 に飽和', () => {
    const patchT100: EquippedPatch = { name: 'burnHit', tier: 100 };
    expect(applyPatchBurnHit(patchT100, triggerAttackNormal, fixedRng(0.999))).not.toBeNull();
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
    const equipped: EquippedPatch[] = [
      { name: 'bossKiller', tier: 5 },
      { name: 'bossKiller', tier: 5 },
    ];
    const effect = evaluatePatches(equipped, triggerAttackBoss, fixedRng(0));
    // 1.25 の2つ → 加算: 1 + 0.25 + 0.25 = 1.5
    expect(effect.damageMultiplier).toBeCloseTo(1.5);
  });

  it('killHeal + shieldRegen → killHeal は onKill、shieldRegen は常時パッシブ化されたためどのトリガーでも発火しない', () => {
    const equipped: EquippedPatch[] = [
      { name: 'killHeal', tier: 2 },
      { name: 'shieldRegen', tier: 2 },
    ];
    // onKill では killHeal のみ発火 (heal = hpRegen(10) * 0.2 * 2 = 4)
    const killEffect = evaluatePatches(equipped, killTrigger(10), fixedRng(0));
    expect(killEffect.heal?.toString()).toBe('4');

    // onWaveClear では shieldRegen はもう何も発火しない (パッシブ化されたため空)
    const clearEffect = evaluatePatches(equipped, triggerWaveClear, fixedRng(0));
    expect(clearEffect).toEqual({});
  });

  it('instantKill + doubleShot → onAttack(normal) で両方独立判定', () => {
    // rng=0 で両方発火 (T1: instantKill p=0.02, doubleShot p=0.05)
    const equipped: EquippedPatch[] = [
      { name: 'instantKill', tier: 1 },
      { name: 'doubleShot', tier: 1 },
    ];
    const effect = evaluatePatches(equipped, triggerAttackNormal, fixedRng(0));
    expect(effect.instantKill).toBe(true);
    expect(effect.extraShots).toBe(1);
  });

  it('damageImmune 装着でも onAttack / onKill 等どのトリガーでも PatchEffect は空 (バリアは store 側で管理)', () => {
    const equipped: EquippedPatch[] = [{ name: 'damageImmune', tier: 1 }];
    const effect = evaluatePatches(equipped, triggerAttackNormal, fixedRng(0));
    expect(effect).toEqual({});
  });

  it('boltCast (パッシブ化) は onWaveClear でも発火しない', () => {
    const equipped: EquippedPatch[] = [
      { name: 'shieldRegen', tier: 2 },
      { name: 'boltCast', tier: 3 },
    ];
    const effect = evaluatePatches(equipped, triggerWaveClear, fixedRng(0));
    expect(effect).toEqual({});
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
    expect(effect.burnDotFraction).toBeCloseTo(0.45); // 0.3 + 0.03*5
  });

  it('bonusDrop が onDropRoll で発火', () => {
    const equipped: EquippedPatch[] = [{ name: 'bonusDrop', tier: 10 }];
    const effect = evaluatePatches(equipped, triggerDrop, fixedRng(0));
    // T10: p = 0.05 + 0.015*9 = 0.185 → floor=0, frac=0.185, rng=0 < frac → count=1 → multiplier=2
    expect(effect.dropMultiplier).toBe(2);
  });
});
