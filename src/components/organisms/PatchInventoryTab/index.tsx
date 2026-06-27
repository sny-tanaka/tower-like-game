import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { PatchCard } from '@/components/molecules/PatchCard';
import type { PatchName } from '@/data/schema';
import { getPatchDisplayInfo } from '@/game/patches/displayInfo';
import { useStore } from '@/store';
import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface PatchInventoryTabProps {
  /** ストーリー / テスト用オーバーライド */
  overridePatches?: Map<string, PatchEntry>;
  overrideEquipped?: Map<number, { name: PatchName; tier: number }>;
  selectedId?: string | null;
  onSelect?: (patchKey: string | null) => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchInventoryTab({
  overridePatches,
  overrideEquipped,
  selectedId,
  onSelect,
}: PatchInventoryTabProps) {
  const storePatches = useStore((s) => s.patches);
  const storeEquipped = useStore((s) => s.equippedPatches);

  const patches = overridePatches ?? storePatches;
  const equipped = overrideEquipped ?? storeEquipped;

  // 装着済みのパッチ名セット
  const equippedNames = new Set<string>(Array.from(equipped.values()).map((e) => e.name));

  const entries = Array.from(patches.values());

  if (entries.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>
          <Text
            variant="body"
            color="dim"
          >
            パッチを所持していません
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">パッチ在庫</Text>
        <Text
          variant="caption"
          color="dim"
        >
          {entries.length} 種類
        </Text>
      </div>
      <div className={styles.grid}>
        {entries.map((entry) => {
          const key = `${entry.name}#${entry.tier}`;
          const isEquipped = equippedNames.has(entry.name);
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
              selected={selectedId === key}
              // v1.3.4: 装備中は ??? ではなく「装備中」 バッジを付けて通常表示する
              equipped={isEquipped}
              onClick={onSelect ? () => onSelect(selectedId === key ? null : key) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
