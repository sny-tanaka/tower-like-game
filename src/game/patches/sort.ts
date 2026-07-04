import { PATCH_POOL } from './drops';

import type { PatchName } from '@/data/schema';

// ---------------------------------------------------------------------------
// パッチの並び順 (v1.5.4)
// ---------------------------------------------------------------------------
//
// パッチ一覧・装備 UI での並び順を統一するためのヘルパー。
//
// 種別 (name) は `PATCH_POOL` (drops.ts) の順、 同一種別内は tier 降順。
// 例: T5 freezeHit → T4 freezeHit → T5 burnHit → T2 burnHit
//
// 種別優先度は PATCH_POOL の宣言順を採用する。 プールに含まれない名前は
// フォールバックで末尾に回す (安全側)。

/** 名前 → 種別優先度 (小さいほど先) */
const NAME_ORDER: ReadonlyMap<PatchName, number> = new Map(
  PATCH_POOL.map((name, i) => [name, i] as const)
);

/**
 * name → priority 番号 (小さいほど先)。 プール外は 999。
 */
export function patchNamePriority(name: PatchName): number {
  return NAME_ORDER.get(name) ?? 999;
}

/**
 * 「種別 → tier 降順」 で 2 パッチを比較する共通コンパレータ。
 * 種別が同じで tier も同じなら 0 (安定ソート前提)。
 */
export function compareByKindThenTier<T extends { name: PatchName; tier: number }>(
  a: T,
  b: T
): number {
  const na = patchNamePriority(a.name);
  const nb = patchNamePriority(b.name);
  if (na !== nb) return na - nb;
  return b.tier - a.tier; // tier 降順
}

/**
 * エントリ配列を「種別 → tier 降順」 でソートした新しい配列を返す。 入力は変更しない。
 */
export function sortByKindThenTier<T extends { name: PatchName; tier: number }>(
  entries: readonly T[]
): T[] {
  return [...entries].sort(compareByKindThenTier);
}

/**
 * 「同種のパッチは最大 tier のみ」 に集約した配列を返す (v1.5.4 装備 UI 用)。
 *
 * - 各種別ごとに tier が最大のエントリだけを残す (それ以外は破棄)
 * - 装備 UI では低 tier を装備することはないため、 候補一覧から除外する
 * - 返り値は `sortByKindThenTier` で並び替え済み
 */
export function maxTierPerKind<T extends { name: PatchName; tier: number }>(
  entries: readonly T[]
): T[] {
  const best = new Map<PatchName, T>();
  for (const e of entries) {
    const prev = best.get(e.name);
    if (prev == null || e.tier > prev.tier) {
      best.set(e.name, e);
    }
  }
  return sortByKindThenTier(Array.from(best.values()));
}
