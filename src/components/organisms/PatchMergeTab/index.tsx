import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Stepper } from '@/components/atoms/Stepper';
import { Text } from '@/components/atoms/Text';
import { PatchCard } from '@/components/molecules/PatchCard';
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
  iconName: string;
}

export interface PatchMergeTabProps {
  /** ストーリー / テスト用オーバーライド */
  overridePatches?: Map<string, PatchEntry>;
}

// ---------------------------------------------------------------------------
// 合成ロジック
// ---------------------------------------------------------------------------

const PATCH_ICON_MAP: Record<string, string> = {
  instantKill: 'skull',
  bossKiller: 'skull',
  doubleShot: 'lightning',
  damageImmune: 'shield',
  killHeal: 'heart',
  shieldRegen: 'shield',
  bonusDrop: 'star',
  boltCast: 'lightning',
  freezeHit: 'ice',
  burnHit: 'flame',
};

/**
 * patches Map から Tier <= maxTierLimit で合成可能なエントリを抽出する。
 * count >= 2 のエントリが対象。
 */
export function calcMergeable(
  patches: Map<string, PatchEntry>,
  maxTierLimit: number
): MergeableEntry[] {
  const result: MergeableEntry[] = [];
  for (const entry of patches.values()) {
    if (entry.tier < maxTierLimit && entry.count >= 2) {
      result.push({
        name: entry.name,
        tier: entry.tier,
        count: entry.count,
        iconName: PATCH_ICON_MAP[entry.name] ?? 'spark',
      });
    }
  }
  return result.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
}

/**
 * 全合成を実行する。
 * Tier <= maxTierLimit の各エントリについて 2 → 1 (Tier+1) を繰り返す（再帰）。
 * 戻り値: 新しい patches Map
 */
export function executeMergeAll(
  patches: Map<string, PatchEntry>,
  maxTierLimit: number
): Map<string, PatchEntry> {
  let next = new Map(patches);
  let changed = true;

  while (changed) {
    changed = false;
    for (const entry of Array.from(next.values())) {
      if (entry.tier >= maxTierLimit) continue;
      if (entry.count < 2) continue;

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

export function PatchMergeTab({ overridePatches }: PatchMergeTabProps) {
  const storePatches = useStore((s) => s.patches);
  const addPatch = useStore((s) => s.addPatch);
  const consumePatch = useStore((s) => s.consumePatch);
  const pruneEmptyPatches = useStore((s) => s.pruneEmptyPatches);

  const patches = overridePatches ?? storePatches;

  // 所持パッチの最大 Tier を動的に算出
  const maxExistingTier = Math.max(1, ...Array.from(patches.values()).map((e) => e.tier));
  // ステッパーの上限: 現在所持の最高 Tier + 1（合成後に生まれうる最高 Tier）
  const stepperMax = maxExistingTier + 1;

  const [maxTierLimit, setMaxTierLimit] = useState<number>(maxExistingTier);

  const mergeable = calcMergeable(patches, maxTierLimit + 1);
  const canMerge = mergeable.length > 0;

  const handleMergeAll = () => {
    if (overridePatches) return; // オーバーライド時はストア操作しない
    const nextPatches = executeMergeAll(patches, maxTierLimit + 1);

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
      </div>

      {/* 合成対象リスト */}
      {canMerge ? (
        <>
          <div className={styles.mergeList}>
            {mergeable.map((entry) => (
              <PatchCard
                key={`${entry.name}#${entry.tier}`}
                patchId={`${entry.name}#${entry.tier}`}
                name={entry.name}
                iconName={entry.iconName as Parameters<typeof PatchCard>[0]['iconName']}
                tier={entry.tier}
                count={entry.count}
                trigger="-"
                effect="-"
                merging
                size="md"
              />
            ))}
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
