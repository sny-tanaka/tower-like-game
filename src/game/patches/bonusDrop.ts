import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ボーナスドロップ:
 * 撃破時 X% でドロップ ×2。
 * スケール: 漸近確率 T1=5%, max=50%, K=20
 * p(T) = T1 + (max - T1) * T / (T + 20)
 */
export function applyPatchBonusDrop(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onDropRoll') return null;

  const T = patch.tier;
  const T1 = 0.05;
  const max = 0.5;
  const prob = T1 + (max - T1) * T / (T + 20);

  if (rng() >= prob) return null;
  return { dropMultiplier: 2 };
}
