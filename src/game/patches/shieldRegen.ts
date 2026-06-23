import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

/**
 * シールド再生:
 * 仕様書「ウェーブクリア時に HP +(5×T) 回復」。
 * トリガーは onWaveClear。 効果は heal (BigNum) として HP に加算される。
 *
 * スケール: 線形 → heal = 5 * T
 */
export function applyPatchShieldRegen(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onWaveClear') return null;

  const T = patch.tier;
  return { heal: BigNum.fromNumber(5 * T) };
}
