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
import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type PatchTab = 'equip' | 'inventory' | 'merge';

const PATCH_TABS: ReadonlyArray<TabBarItem<PatchTab>> = [
  { key: 'equip', label: '装着' },
  { key: 'inventory', label: '所持' },
  { key: 'merge', label: '合成' },
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * PatchScreen — パッチ庫画面。
 * AppShell.header: PageHeader (通貨なし) + TabBar (装着/所持/合成)
 * AppShell.main: タブに応じて PatchEquipTab / PatchInventoryTab / PatchMergeTab
 * AppShell.footer: BottomNav
 */
export function PatchScreen() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<PatchTab>('equip');

  const handleNavChange = (target: Screen) => {
    navigate(target);
  };

  return (
    <AppShell
      header={
        <PageHeader
          title="パッチ庫"
          currencies={[]}
          tabBar={
            <TabBar<PatchTab>
              tabs={PATCH_TABS}
              value={activeTab}
              onChange={setActiveTab}
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
