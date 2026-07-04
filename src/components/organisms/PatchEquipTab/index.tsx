import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Overlay } from '@/components/atoms/Overlay';
import { Text } from '@/components/atoms/Text';
import { PatchCard } from '@/components/molecules/PatchCard';
import { PatchSlot } from '@/components/molecules/PatchSlot';
import type { PatchInfo } from '@/components/molecules/PatchSlot';
import type { PatchName } from '@/data/schema';
import { getPatchDisplayInfo } from '@/game/patches/displayInfo';
import { maxTierPerKind } from '@/game/patches/sort';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';
import { MAX_PATCH_SLOTS } from '@/store/slices/equippedPatches';
import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface PatchEquipTabProps {
  /** ストーリー / テスト用オーバーライド (省略時はstoreから取得) */
  overridePatches?: Map<string, PatchEntry>;
  overrideEquipped?: Map<number, { name: PatchName; tier: number }>;
  overridePatchSlotsLv?: number;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

/** patchSlots Lv から解放スロット数を算出 (初期1 + Lv = 1〜6) */
function calcUnlockedSlots(patchSlotsLv: number): number {
  return Math.min(1 + patchSlotsLv, MAX_PATCH_SLOTS);
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchEquipTab({
  overridePatches,
  overrideEquipped,
  overridePatchSlotsLv,
}: PatchEquipTabProps) {
  const storePatches = useStore((s) => s.patches);
  const storeEquipped = useStore((s) => s.equippedPatches);
  const storePatchSlotsLv = useStore((s) => s.machineLevels.patchSlots);
  const equipPatch = useStore((s) => s.equipPatch);
  const unequipPatch = useStore((s) => s.unequipPatch);

  const patches = overridePatches ?? storePatches;
  const equipped = overrideEquipped ?? storeEquipped;
  const patchSlotsLv = overridePatchSlotsLv ?? storePatchSlotsLv;
  const unlockedCount = calcUnlockedSlots(patchSlotsLv);

  // 装着パッチ選択ダイアログ: null = 非表示、 値 = 対象スロット番号
  const [pickerSlotIndex, setPickerSlotIndex] = useState<number | null>(null);

  // 装着済みスロット → PatchSlot 用 PatchInfo に変換
  const buildPatchInfo = (slotIndex: number): PatchInfo | null => {
    const entry = equipped.get(slotIndex);
    if (!entry) return null;
    const key = `${entry.name}#${entry.tier}`;
    const invEntry = patches.get(key);
    const info = getPatchDisplayInfo(entry.name, entry.tier);
    return {
      patchId: key,
      name: info.name,
      iconName: info.iconName,
      tier: entry.tier,
      trigger: info.trigger,
      effect: info.effect,
      count: invEntry?.count ?? 0,
    };
  };

  const handleSlotClick = (slotIndex: number) => {
    const entry = equipped.get(slotIndex);
    if (entry) {
      // 装着済み → 取り外し
      unequipPatch(slotIndex);
      return;
    }
    // 空きスロット → 在庫から選ぶダイアログを開く
    setPickerSlotIndex(slotIndex);
  };

  // 装着候補: 在庫にあり、 かつ同名が他スロットに装着されてないもの。
  // v1.5.4: 種別ごとに tier 最大のものだけを候補にする (低 tier を装備することはないため)。
  //         並び順は「種別 (PATCH_POOL 順) → tier 降順」 で統一する。
  const equippedNames = new Set(Array.from(equipped.values()).map((e) => e.name));
  const candidates = maxTierPerKind(
    Array.from(patches.values()).filter((p) => !equippedNames.has(p.name))
  );

  const handlePickPatch = (name: PatchEntry['name'], tier: number) => {
    if (pickerSlotIndex == null) return;
    const ok = equipPatch(pickerSlotIndex, name, tier);
    if (ok) {
      setPickerSlotIndex(null);
      soundEngine.play('purchaseOk');
    } else {
      soundEngine.play('reject');
    }
  };

  const lockedCount = MAX_PATCH_SLOTS - unlockedCount;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerTitleRow}>
          <Text variant="heading-3">装着スロット</Text>
          <Text
            variant="caption"
            color="mid"
            className={styles.headerCount}
          >
            {equipped.size}/{unlockedCount}
          </Text>
        </div>
        <Text
          variant="caption"
          color="dim"
        >
          ({MAX_PATCH_SLOTS} スロット中 {lockedCount} ロック・{equipped.size} / {unlockedCount}{' '}
          装着中)
        </Text>
      </div>

      <div className={styles.slotGrid}>
        {Array.from({ length: MAX_PATCH_SLOTS }, (_, i) => {
          const isLocked = i >= unlockedCount;
          const patchInfo = isLocked ? null : buildPatchInfo(i);
          return (
            <PatchSlot
              key={i}
              slotIndex={i + 1}
              patch={patchInfo}
              locked={isLocked}
              size="md"
              onClick={isLocked ? undefined : () => handleSlotClick(i)}
            />
          );
        })}
      </div>

      {equipped.size === 0 && unlockedCount > 0 && (
        <Text
          variant="caption"
          color="dim"
          className={styles.emptyHint}
        >
          パッチ庫からパッチを選んで装着してください
        </Text>
      )}

      {/* 装着候補ダイアログ: 空きスロットタップで開く */}
      {pickerSlotIndex != null && (
        <Overlay
          open
          onClose={() => setPickerSlotIndex(null)}
          dismissible
        >
          <div className={styles.pickerDialog}>
            <Card
              variant="elevated"
              padding="lg"
            >
              <div className={styles.pickerHeader}>
                <Text
                  variant="heading-3"
                  as="h2"
                >
                  スロット {pickerSlotIndex + 1} に装着
                </Text>
                <Text
                  variant="caption"
                  color="dim"
                >
                  在庫から選択 ({candidates.length} 種)
                </Text>
              </div>

              {candidates.length === 0 ? (
                <Text
                  variant="body"
                  color="dim"
                  className={styles.pickerEmpty}
                >
                  装着可能なパッチが在庫にありません
                </Text>
              ) : (
                <div className={styles.pickerGrid}>
                  {candidates.map((entry) => {
                    const key = `${entry.name}#${entry.tier}`;
                    const info = getPatchDisplayInfo(entry.name, entry.tier);
                    return (
                      <PatchCard
                        key={key}
                        patchId={key}
                        name={info.name}
                        iconName={info.iconName}
                        tier={entry.tier}
                        count={entry.count}
                        trigger={info.trigger}
                        effect={info.effect}
                        onClick={() => handlePickPatch(entry.name, entry.tier)}
                      />
                    );
                  })}
                </div>
              )}

              <div className={styles.pickerActions}>
                <Button
                  label="キャンセル"
                  variant="ghost"
                  fullWidth
                  onClick={() => setPickerSlotIndex(null)}
                />
              </div>
            </Card>
          </div>
        </Overlay>
      )}
    </div>
  );
}
