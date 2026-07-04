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
 * - フラグ (instantKill, freeze): OR
 * - extraShots, extraInstantKills: 加算
 * - burnDotFraction: 大きい方
 */
function mergeEffects(a: PatchEffect, b: PatchEffect): PatchEffect {
  const result: PatchEffect = { ...a };

  // damageMultiplier: 加算（例: bossKiller T5 → 1.25、複数パッチ同時は加算）
  if (b.damageMultiplier !== undefined) {
    result.damageMultiplier = (result.damageMultiplier ?? 1) + (b.damageMultiplier - 1);
  }

  // instantKill: OR
  if (b.instantKill) result.instantKill = true;

  // extraInstantKills: 加算
  if (b.extraInstantKills !== undefined) {
    result.extraInstantKills = (result.extraInstantKills ?? 0) + b.extraInstantKills;
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

  // extraShots: 加算
  if (b.extraShots !== undefined) {
    result.extraShots = (result.extraShots ?? 0) + b.extraShots;
  }

  // freeze: OR（凍結秒数は長い方を採用）
  if (b.freeze) {
    result.freeze = true;
    result.freezeSec = Math.max(result.freezeSec ?? 0, b.freezeSec ?? 0);
  }

  // burnSec: 長い方を採用
  if (b.burnSec !== undefined) {
    result.burnSec = Math.max(result.burnSec ?? 0, b.burnSec);
  }

  // burnDotFraction: 大きい方を採用
  if (b.burnDotFraction !== undefined) {
    result.burnDotFraction = Math.max(result.burnDotFraction ?? 0, b.burnDotFraction);
  }

  return result;
}

// ---------------------------------------------------------------------------
// 統合評価関数
// ---------------------------------------------------------------------------

/**
 * 「効果なし」 を表す共有 immutable オブジェクト。
 * 装着パッチが 0 件 or 該当 trigger が空のとき、 毎呼び出しで `{}` を new せず
 * これを返す。 H2-8: 戦闘ループの evaluatePatches は onAttack / onKill / onHit 等で
 * 毎フレーム複数回呼ばれるため、 GC 圧と新規オブジェクトの allocate を排除する。
 * (`Object.freeze` で mutation を防止。 spread copy で使用するため freeze していても安全)
 */
const EMPTY_EFFECT: PatchEffect = Object.freeze({}) as PatchEffect;

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
  // H2-8: 装着パッチが 0 件なら即座に共有 EMPTY_EFFECT を返す。
  // 序盤 (パッチ未装着) のランでは evaluatePatches が毎フレーム複数回呼ばれるため
  // ループに入らない早期 return で空回り CPU を排除。
  if (equipped.length === 0) return EMPTY_EFFECT;

  let merged: PatchEffect | null = null;

  for (const patch of equipped) {
    const applyFn = PATCH_APPLY_MAP[patch.name];
    if (applyFn === undefined) continue;

    const effect = applyFn(patch, trigger, rng);
    if (effect === null) continue;

    // H2-8: 最初の effect は merge せずそのまま採用 (merge は 2 件目以降で初めて allocate)。
    // 該当 trigger を持つパッチが 1 件もないケース (装着パッチ ≠ 0 だが trigger 不一致)、
    // または 1 件だけのケースで `{ ...{}, ...effect }` のような無駄な new を防ぐ。
    merged = merged === null ? effect : mergeEffects(merged, effect);
  }

  // 1 件も該当 effect がなければ共有 EMPTY_EFFECT
  return merged ?? EMPTY_EFFECT;
}
