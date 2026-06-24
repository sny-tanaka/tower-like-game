import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import type { TabBarItem } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { PageHeader } from '@/components/organisms/PageHeader';
import { PatchEquipTab } from '@/components/organisms/PatchEquipTab';
import { PatchInventoryTab } from '@/components/organisms/PatchInventoryTab';
import { PatchMergeTab } from '@/components/organisms/PatchMergeTab';
import { calcMergeable } from '@/components/organisms/PatchMergeTab';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';
import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';
import { MAX_PATCH_SLOTS } from '@/store/slices/equippedPatches';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type PatchTab = 'equip' | 'inventory' | 'merge';

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

function calcUnlockedSlots(patchSlotsLv: number): number {
  return Math.min(1 + patchSlotsLv, MAX_PATCH_SLOTS);
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * PatchScreen — パッチ庫画面。
 * AppShell.header: PageHeader (戻る + subtitle) + TabBar (装着/所持/合成、各バッジ付き)
 * AppShell.main: タブに応じて PatchEquipTab / PatchInventoryTab / PatchMergeTab
 * AppShell.footer: BottomNav
 */
export function PatchScreen() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<PatchTab>('equip');

  const equippedPatches = useStore((s) => s.equippedPatches);
  const patches = useStore((s) => s.patches);
  const patchSlotsLv = useStore((s) => s.machineLevels.patchSlots);

  const unlockedCount = calcUnlockedSlots(patchSlotsLv);
  const equippedCount = equippedPatches.size;
  const inventoryCount = patches.size;
  // 合成可能数は所持パッチの最大 Tier + 1 までを動的算出 (v0.3.0 で MAX_TIER 撤廃、 PatchMergeTab と同じロジック)
  const maxExistingTier = Math.max(1, ...Array.from(patches.values()).map((e) => e.tier));
  const mergeableCount = calcMergeable(patches, maxExistingTier + 1).length;

  const handleNavChange = (target: Screen) => {
    navigate(target);
  };

  const handleBack = () => {
    navigate('preparation');
  };

  const handleTabChange = (k: PatchTab) => {
    if (k === activeTab) return; // 同一タブ連打で SE を鳴らさない
    setActiveTab(k);
    soundEngine.play('tabSwitch');
  };

  const PATCH_TABS: ReadonlyArray<TabBarItem<PatchTab>> = [
    { key: 'equip', label: '装着', badge: `${equippedCount}/${unlockedCount}` },
    { key: 'inventory', label: '所持', badge: inventoryCount > 0 ? inventoryCount : undefined },
    { key: 'merge', label: '合成', badge: mergeableCount > 0 ? mergeableCount : undefined },
  ];

  return (
    <AppShell
      header={
        <PageHeader
          title="パッチ庫"
          subtitle={`装着 ${equippedCount}/${unlockedCount} ・ 在庫 ${inventoryCount} 種`}
          onBack={handleBack}
          currencies={[]}
          tabBar={
            <TabBar<PatchTab>
              tabs={PATCH_TABS}
              value={activeTab}
              onChange={handleTabChange}
              variant="underline"
              fullWidth
            />
          }
        />
      }
      footer={
        <BottomNav
          active="patches"
          onChange={handleNavChange}
        />
      }
    >
      <div className={styles.content}>
        {activeTab === 'equip' && <PatchEquipTab />}
        {activeTab === 'inventory' && <PatchInventoryTab />}
        {activeTab === 'merge' && <PatchMergeTab />}
      </div>
    </AppShell>
  );
}
