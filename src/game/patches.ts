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
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// パッチ適用ディスパッチャ
// ---------------------------------------------------------------------------

type PatchApplyFn = (
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
) => PatchEffect | null;

const PATCH_APPLY_MAP: Record<string, PatchApplyFn> = {
  instantKill: applyPatchInstantKill,
  bossKiller: applyPatchBossKiller,
  doubleShot: applyPatchDoubleShot,
  damageImmune: applyPatchDamageImmune,
  killHeal: applyPatchKillHeal,
  shieldRegen: applyPatchShieldRegen,
  bonusDrop: applyPatchBonusDrop,
  boltCast: applyPatchBoltCast,
  freezeHit: applyPatchFreezeHit,
  burnHit: applyPatchBurnHit,
};

// ---------------------------------------------------------------------------
// 効果のマージ
// ---------------------------------------------------------------------------

/**
 * 2 つの PatchEffect を合算してマージする。
 * - 数値: 加算
 * - 倍率 (damageMultiplier, dropMultiplier): 乗算ではなく各パッチ値の加算（仕様書§効果スタック「加算」）
 * - BigNum: add
 * - フラグ (instantKill, extraShot, freeze): OR
 * - overrideReceivedDamage: 先に発動した無効化を優先（ZERO を維持）
 */
function mergeEffects(a: PatchEffect, b: PatchEffect): PatchEffect {
  const result: PatchEffect = { ...a };

  // damageMultiplier: 加算（例: bossKiller T5 → 1.25、複数パッチ同時は加算）
  if (b.damageMultiplier !== undefined) {
    result.damageMultiplier = (result.damageMultiplier ?? 1) + (b.damageMultiplier - 1);
  }

  // instantKill: OR
  if (b.instantKill) result.instantKill = true;

  // overrideReceivedDamage: どちらかが ZERO なら ZERO を維持
  if (b.overrideReceivedDamage !== undefined) {
    if (result.overrideReceivedDamage === undefined) {
      result.overrideReceivedDamage = b.overrideReceivedDamage;
    } else {
      // 両方あれば小さい方（= 無効化優先）
      const aVal = result.overrideReceivedDamage;
      const bVal = b.overrideReceivedDamage;
      result.overrideReceivedDamage = aVal.lte(bVal) ? aVal : bVal;
    }
  }

  // heal: BigNum 加算
  if (b.heal !== undefined) {
    result.heal = (result.heal ?? BigNum.ZERO).add(b.heal);
  }

  // dropMultiplier: 加算（仕様書§加算ルール）
  if (b.dropMultiplier !== undefined) {
    result.dropMultiplier = (result.dropMultiplier ?? 1) + (b.dropMultiplier - 1);
  }

  // boltGain: BigNum 加算
  if (b.boltGain !== undefined) {
    result.boltGain = (result.boltGain ?? BigNum.ZERO).add(b.boltGain);
  }

  // extraShot: OR
  if (b.extraShot) result.extraShot = true;

  // freeze: OR（凍結秒数は長い方を採用）
  if (b.freeze) {
    result.freeze = true;
    result.freezeSec = Math.max(result.freezeSec ?? 0, b.freezeSec ?? 0);
  }

  // burnSec: 長い方を採用
  if (b.burnSec !== undefined) {
    result.burnSec = Math.max(result.burnSec ?? 0, b.burnSec);
  }

  return result;
}

// ---------------------------------------------------------------------------
// 統合評価関数
// ---------------------------------------------------------------------------

/**
 * 装着中の全パッチをイベントに対して評価し、効果を集約する。
 *
 * @param equipped - 装着中のパッチ配列
 * @param trigger  - 発火イベント
 * @param rng      - 乱数生成関数 [0, 1)
 * @returns 集約された PatchEffect（何も発火しない場合は空オブジェクト）
 */
export function evaluatePatches(
  equipped: EquippedPatch[],
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect {
  let merged: PatchEffect = {};

  for (const patch of equipped) {
    const applyFn = PATCH_APPLY_MAP[patch.name];
    if (applyFn === undefined) continue;

    const effect = applyFn(patch, trigger, rng);
    if (effect === null) continue;

    merged = mergeEffects(merged, effect);
  }

  return merged;
}
