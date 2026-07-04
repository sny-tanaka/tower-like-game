import { rollOverflowCount } from '@/game/patches/overflow';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * インスタントキル — オーバーフロー型（design-docs/15-balance-v1.5.0.md §1.2）:
 * 発動率 p = 2% + 0.6%×(T-1)、上限なし。 対象は雑魚 (normal) のみ (現行どおり)。
 * 超過分は「フィールド上のランダムな雑魚 1 体を追加即死」に繰り越す:
 *   kills = floor(p) + (rng < frac(p) ? 1 : 0)
 * kills >= 1 なら攻撃対象を即死 (instantKill: true) + 残り (kills - 1) 体を
 * extraInstantKills としてループ側 (フィールド上のランダム抽選) に渡す。
 */
export function applyPatchInstantKill(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;
  // ボス類（elite / miniboss / boss）には発動しない
  if (trigger.enemyKind !== 'normal') return null;

  const T = patch.tier;
  const prob = 0.02 + 0.006 * (T - 1);
  const kills = rollOverflowCount(prob, rng);
  if (kills <= 0) return null;

  const effect: PatchEffect = { instantKill: true };
  if (kills > 1) {
    effect.extraInstantKills = kills - 1;
  }
  return effect;
}
