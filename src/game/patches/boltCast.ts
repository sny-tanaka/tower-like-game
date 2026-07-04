import { findPatchTier } from '@/game/patches/patchUtils';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ボルト鋳造（design-docs/15-balance-v1.5.0.md §1.2）:
 * onWaveClear の boltGain トリガーは廃止し、 常時パッシブ (ボルト獲得量 ×(1 + 0.02×T)) に変更した。
 * applyPatch* 関数自体は「何も発火しない」ため常に null を返す。
 * 実際の倍率は getBoltGainMultiplier() で取得し、 useBattleLoop の敵撃破ボルト報酬計算箇所で乗算する。
 */
export function applyPatchBoltCast(
  _patch: EquippedPatch,
  _trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  return null;
}

/**
 * ボルト獲得倍率 (1 + 0.02×T)。 boltCast 未装着なら 1.0 (無補正)。
 */
export function getBoltGainMultiplier(patches: EquippedPatch[]): number {
  const maxTier = findPatchTier(patches, 'boltCast');
  if (maxTier <= 0) return 1;
  return 1 + 0.02 * maxTier;
}
