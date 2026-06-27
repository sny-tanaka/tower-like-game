import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Stepper } from '@/components/atoms/Stepper';
import { Text } from '@/components/atoms/Text';
import { PatchCard } from '@/components/molecules/PatchCard';
import type { PatchName } from '@/data/schema';
import { getPatchDisplayInfo } from '@/game/patches/displayInfo';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';
import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface MergeableEntry {
  name: string;
  tier: number;
  count: number;
}

export interface PatchMergeTabProps {
  /** ストーリー / テスト用オーバーライド */
  overridePatches?: Map<string, PatchEntry>;
  /**
   * テスト / ストーリー用: highestTier (= 最新未クリア Tier) のオーバーライド。
   * 省略時は store.highestTier を使う。
   */
  overrideHighestTier?: number;
}

// ---------------------------------------------------------------------------
// 合成ロジック
// ---------------------------------------------------------------------------

/**
 * patches Map から Tier <= maxTierLimit で合成可能なエントリを抽出する。
 * count >= 2 のエントリが対象。
 *
 * v1.3.4: 合成結果 Tier (= entry.tier + 1) が highestTier 以上なら不可。
 * 「最新未クリア Tier (= highestTier) のパッチは合成で作れず、 出撃ドロップ狙い」 の仕様。
 *
 * @param patches      所持パッチマップ
 * @param maxTierLimit 合成結果上限 Tier (この値以下のものだけが結果 Tier として許可)
 * @param highestTier  最新未クリア Tier。 合成結果がこの値以上なら不可。 省略時は無制限。
 */
export function calcMergeable(
  patches: Map<string, PatchEntry>,
  maxTierLimit: number,
  highestTier?: number
): MergeableEntry[] {
  const result: MergeableEntry[] = [];
  for (const entry of patches.values()) {
    if (entry.count < 2) continue;
    // 結果 Tier (= entry.tier + 1) が maxTierLimit を超えない
    if (entry.tier >= maxTierLimit) continue;
    // v1.3.4: 結果 Tier が最新未クリア Tier (highestTier) 以上なら不可
    if (highestTier != null && entry.tier + 1 >= highestTier) continue;
    result.push({
      name: entry.name,
      tier: entry.tier,
      count: entry.count,
    });
  }
  return result.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
}

/**
 * 全合成を実行する。
 * Tier <= maxTierLimit の各エントリについて 2 → 1 (Tier+1) を繰り返す（再帰）。
 * v1.3.4: highestTier 指定時は「結果 Tier >= highestTier」 のエントリは合成しない。
 *
 * @param highestTier  最新未クリア Tier。 結果がこの値以上の合成は実行しない。
 */
export function executeMergeAll(
  patches: Map<string, PatchEntry>,
  maxTierLimit: number,
  highestTier?: number
): Map<string, PatchEntry> {
  let next = new Map(patches);
  let changed = true;

  while (changed) {
    changed = false;
    for (const entry of Array.from(next.values())) {
      if (entry.tier >= maxTierLimit) continue;
      if (entry.count < 2) continue;
      // v1.3.4: 結果 Tier が最新未クリア Tier (highestTier) 以上なら合成不可
      if (highestTier != null && entry.tier + 1 >= highestTier) continue;

      const key = `${entry.name}#${entry.tier}`;
      const mergeCount = Math.floor(entry.count / 2);
      const remainder = entry.count % 2;
      const nextTier = entry.tier + 1;
      const nextKey = `${entry.name}#${nextTier}`;

      const nextEntry = next.get(nextKey);
      const nextCount = (nextEntry?.count ?? 0) + mergeCount;

      next = new Map(next);
      if (remainder === 0) {
        next.delete(key);
      } else {
        next.set(key, { ...entry, count: remainder });
      }
      next.set(nextKey, { name: entry.name, tier: nextTier, count: nextCount });
      changed = true;
    }
  }

  return next;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchMergeTab({ overridePatches, overrideHighestTier }: PatchMergeTabProps) {
  const storePatches = useStore((s) => s.patches);
  const storeHighestTier = useStore((s) => s.highestTier);
  const addPatch = useStore((s) => s.addPatch);
  const consumePatch = useStore((s) => s.consumePatch);
  const pruneEmptyPatches = useStore((s) => s.pruneEmptyPatches);

  const patches = overridePatches ?? storePatches;
  const highestTier = overrideHighestTier ?? storeHighestTier;

  // 所持パッチの最大 Tier を動的に算出
  const maxExistingTier = Math.max(1, ...Array.from(patches.values()).map((e) => e.tier));
  // ステッパーの上限: 現在所持の最高 Tier + 1（合成後に生まれうる最高 Tier）
  // v1.3.4: ただし「最新未クリア Tier (highestTier) 以上は合成不可」 制約に合わせて、
  // ステッパー上限を min(maxExistingTier + 1, highestTier - 1) でクランプ。
  // 例: highestTier = 5 (= Tier5 が未クリア) のとき、 合成結果は最大 T4 まで。
  const stepperMaxRaw = maxExistingTier + 1;
  const stepperMax = Math.max(1, Math.min(stepperMaxRaw, highestTier - 1));

  const [maxTierLimit, setMaxTierLimit] = useState<number>(Math.min(maxExistingTier, stepperMax));

  const mergeable = calcMergeable(patches, maxTierLimit + 1, highestTier);
  const canMerge = mergeable.length > 0;

  const handleMergeAll = () => {
    if (overridePatches) return; // オーバーライド時はストア操作しない
    const nextPatches = executeMergeAll(patches, maxTierLimit + 1, highestTier);

    // 変化があるかチェック
    const hasChanges = [...nextPatches].some(([key, entry]) => {
      const current = patches.get(key);
      return (current?.count ?? 0) !== entry.count;
    });

    // 差分をストアに反映
    // 消費: 現在 - 次
    for (const [key, entry] of patches) {
      const next = nextPatches.get(key);
      const nextCount = next?.count ?? 0;
      if (nextCount < entry.count) {
        consumePatch(entry.name, entry.tier, entry.count - nextCount);
      }
    }
    // 追加: 次 - 現在
    for (const [key, entry] of nextPatches) {
      const current = patches.get(key);
      const currentCount = current?.count ?? 0;
      if (entry.count > currentCount) {
        addPatch(entry.name, entry.tier, entry.count - currentCount);
      }
    }
    pruneEmptyPatches();
    soundEngine.play(hasChanges ? 'purchaseOk' : 'reject');
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">パッチ合成</Text>
      </div>

      {/* Tier上限 Stepper */}
      <div className={styles.tierControl}>
        <Text
          variant="label"
          color="mid"
        >
          合成上限 Tier
        </Text>
        <div className={styles.tierStepperRow}>
          <Stepper
            value={maxTierLimit}
            min={1}
            max={stepperMax}
            onChange={setMaxTierLimit}
          />
          <Text
            variant="caption"
            color="dim"
          >
            T{maxTierLimit} 以下を T{maxTierLimit + 1} に合成
          </Text>
        </div>
        {/* v1.3.4: 最新未クリア Tier のパッチは合成不可 (= 出撃ドロップ狙い) のヒント */}
        <Text
          variant="caption"
          color="dim"
        >
          最新 Tier (T{highestTier}) のパッチは合成で作れません。 出撃でドロップを狙ってください。
        </Text>
      </div>

      {/* 合成対象リスト */}
      {canMerge ? (
        <>
          <div className={styles.mergeList}>
            {mergeable.map((entry) => {
              const info = getPatchDisplayInfo(entry.name as PatchName, entry.tier);
              return (
                <PatchCard
                  key={`${entry.name}#${entry.tier}`}
                  patchId={`${entry.name}#${entry.tier}`}
                  name={info.name}
                  iconName={info.iconName}
                  tier={entry.tier}
                  count={entry.count}
                  trigger={info.trigger}
                  effect={info.effect}
                  merging
                  size="md"
                />
              );
            })}
          </div>
          <Button
            label={`一括合成 (${mergeable.length} 種類)`}
            variant="primary"
            fullWidth
            onClick={handleMergeAll}
          />
        </>
      ) : (
        <div className={styles.empty}>
          <Text
            variant="body"
            color="dim"
          >
            合成可能なパッチがありません
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            同じ Tier のパッチが 2 個以上あると合成できます
          </Text>
        </div>
      )}
    </div>
  );
}
