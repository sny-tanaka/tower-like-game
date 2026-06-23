import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

/**
 * ボルト鋳造:
 * 仕様書「ウェーブクリア時にボルト +(5×T) 獲得」。
 * トリガーは onWaveClear。 効果は boltGain (BigNum) として currencies.bolt に加算される。
 *
 * スケール: 線形 → boltGain = 5 * T
 */
export function applyPatchBoltCast(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onWaveClear') return null;

  const T = patch.tier;
  return { boltGain: BigNum.fromNumber(5 * T) };
}
