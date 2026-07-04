import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ダメージ無効 → ダメージバリア（design-docs/15-balance-v1.5.0.md §1.2, §4）:
 * 確率判定は廃止し、 Wave 開始時にバリア `1×T` 枚を展開する確定型の機構に置換した。
 * applyPatch* 関数自体は「何も発火しない」ため常に null を返す (onHit トリガー自体を廃止)。
 * バリア枚数の算出は getBarrierCapacity()、 消費 / 充填ロジックは
 * `src/game/patches/barrier.ts` の純粋関数 + store (`barrierStock`) 側で行う。
 */
export function applyPatchDamageImmune(
  _patch: EquippedPatch,
  _trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  return null;
}

/**
 * バリア容量 (1×T)。 damageImmune 未装着なら 0。
 */
export function getBarrierCapacity(patches: EquippedPatch[]): number {
  let maxTier = 0;
  for (const p of patches) {
    if (p.name === 'damageImmune' && p.tier > maxTier) maxTier = p.tier;
  }
  return maxTier;
}
