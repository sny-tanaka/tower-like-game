import { findPatchTier } from '@/game/patches/patchUtils';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * シールド再生（design-docs/15-balance-v1.5.0.md §1.2）:
 * onWaveClear の heal トリガーは廃止し、 常時パッシブ (リジェネ ×(1 + 0.05×T)) に変更した。
 * applyPatch* 関数自体は「何も発火しない」ため常に null を返す
 * (evaluatePatches の onWaveClear / onAttack 等どのトリガーにも反応しない)。
 * 実際の倍率は getShieldRegenMultiplier() で取得し、 useBattleLoop の HP リジェネ適用箇所で乗算する。
 */
export function applyPatchShieldRegen(
  _patch: EquippedPatch,
  _trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  return null;
}

/**
 * リジェネ倍率 (1 + 0.05×T)。 shieldRegen 未装着なら 1.0 (無補正)。
 */
export function getShieldRegenMultiplier(patches: EquippedPatch[]): number {
  const maxTier = findPatchTier(patches, 'shieldRegen');
  if (maxTier <= 0) return 1;
  return 1 + 0.05 * maxTier;
}
