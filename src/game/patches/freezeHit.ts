import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * 凍結ヒット:
 * 攻撃時 X% で (1 + 0.2×T) 秒間 凍結（敵が動けない・攻撃しない）。
 * スケール: 漸近確率 T1=5%, max=50%, K=20 + 時間線形
 * p(T) = T1 + (max - T1) * T / (T + 20)
 * sec(T) = 1 + 0.2 * T
 */
export function applyPatchFreezeHit(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;

  const T = patch.tier;
  const T1 = 0.05;
  const max = 0.5;
  const prob = T1 + (max - T1) * T / (T + 20);

  if (rng() >= prob) return null;
  const freezeSec = 1 + 0.2 * T;
  return { freeze: true, freezeSec };
}
