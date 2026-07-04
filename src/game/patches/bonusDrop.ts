import { rollOverflowCount } from '@/game/patches/overflow';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ボーナスドロップ — オーバーフロー型（design-docs/15-balance-v1.5.0.md §1.2）:
 * 発動率 p = 5% + 1.5%×(T-1)、上限なし。 対象はネジのみ (現行どおり)。
 * 超過分は倍率段階に繰り越す: dropMultiplier = 1 + rollOverflowCount(p, rng)
 * (発動しなければ = rollOverflowCount が 0 のとき effect なし = 従来どおり倍率 1 相当)。
 * 例: p=150% → 確定 ×2 + 50% で ×3 (期待 ×2.5)。
 */
export function applyPatchBonusDrop(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onDropRoll') return null;

  const T = patch.tier;
  const prob = 0.05 + 0.015 * (T - 1);
  const count = rollOverflowCount(prob, rng);
  if (count <= 0) return null;
  return { dropMultiplier: 1 + count };
}
