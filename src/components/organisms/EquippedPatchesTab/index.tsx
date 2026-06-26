import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { PatchSlot } from '@/components/molecules/PatchSlot';
import type { PatchInfo } from '@/components/molecules/PatchSlot';
import { getPatchDisplayInfo } from '@/game/patches/displayInfo';
import { useStore } from '@/store';
import { MAX_PATCH_SLOTS } from '@/store/slices/equippedPatches';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface EquippedPatchesTabProps {
  /** パッチ庫画面への遷移コールバック */
  onOpenPatchScreen?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * EquippedPatchesTab — 出撃準備画面の装着パッチ確認タブ Organism
 *
 * 装着中のパッチを読み取り専用で一覧表示する。
 * パッチスロット数は machine.patchSlots Lv から計算（BASE 1 + Lv）。
 * 編集はパッチ庫画面で行う。
 */
export function EquippedPatchesTab({ onOpenPatchScreen }: EquippedPatchesTabProps) {
  const equippedPatches = useStore((s) => s.equippedPatches);
  const patchSlotsLv = useStore((s) => s.machineLevels.patchSlots);

  // スロット総数: 初期 1 + patchSlots Lv（上限 MAX_PATCH_SLOTS = 6）
  const slotCount = Math.min(1 + patchSlotsLv, MAX_PATCH_SLOTS);

  // slot 配列を生成
  const slots: { kind: 'filled' | 'empty'; patch: PatchInfo | null; idx: number }[] = [];
  for (let i = 0; i < slotCount; i++) {
    const entry = equippedPatches.get(i);
    if (entry != null) {
      const info = getPatchDisplayInfo(entry.name, entry.tier);
      const patchInfo: PatchInfo = {
        patchId: `${entry.name}#${entry.tier}`,
        name: info.name,
        iconName: info.iconName,
        tier: entry.tier,
        trigger: info.trigger,
        effect: info.effect,
        count: 1,
      };
      slots.push({ kind: 'filled', patch: patchInfo, idx: i + 1 });
    } else {
      slots.push({ kind: 'empty', patch: null, idx: i + 1 });
    }
  }

  const equippedCount = [...equippedPatches.values()].length;

  return (
    <div
      role="tabpanel"
      aria-label="装着パッチ"
      className={styles.wrapper}
    >
      {/* ヘッダー */}
      <div className={styles.header}>
        <Text
          variant="caption"
          color="mid"
          className={styles.headerLabel}
        >
          装着 {equippedCount} / {slotCount}
        </Text>
        {onOpenPatchScreen != null && (
          <Button
            label="装備変更"
            variant="ghost"
            size="sm"
            iconRight={
              <Icon
                name="chevron-right"
                size={14}
              />
            }
            onClick={onOpenPatchScreen}
          />
        )}
      </div>

      {/* パッチなしの場合 */}
      {equippedCount === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Icon
              name="plus"
              size={24}
              color="var(--c-text-dim)"
            />
          </span>
          <Text
            variant="body"
            color="dim"
            align="center"
          >
            パッチが装着されていません
          </Text>
          {onOpenPatchScreen != null && (
            <Button
              label="パッチ庫を開く"
              variant="secondary"
              size="sm"
              onClick={onOpenPatchScreen}
            />
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {slots.map((s, i) => (
            <PatchSlot
              key={i}
              patch={s.patch}
              slotIndex={s.idx}
              onClick={onOpenPatchScreen}
            />
          ))}
        </div>
      )}

      {/* 注釈 */}
      <Text
        variant="caption"
        color="dim"
        align="center"
        as="p"
        className={styles.note}
      >
        変更はパッチ庫で行えます
      </Text>
    </div>
  );
}
