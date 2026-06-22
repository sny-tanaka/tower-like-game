import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

/**
 * ボルト鋳造:
 * 仕様書では「ウェーブクリア時にボルト +(5×T) 獲得」。
 * トリガーモデルでは interval イベントとして扱う。
 * boltCastDamage として全敵への固定ダメを返す。
 *
 * スケール: 線形 → boltCastDamage = BigNum(5 * T)
 */
export function applyPatchBoltCast(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'interval') return null;

  const T = patch.tier;
  return { boltCastDamage: BigNum.fromNumber(5 * T) };
}
