import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { PageHeader } from '@/components/organisms/PageHeader';
import { WeaponDetailsTab } from '@/components/organisms/WeaponDetailsTab';
import { WeaponLevelUpgradeTab } from '@/components/organisms/WeaponLevelUpgradeTab';
import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type ArmoryTab = 'details' | 'upgrade';

const TABS = [
  { key: 'details' as ArmoryTab, label: '武器詳細' },
  { key: 'upgrade' as ArmoryTab, label: '共通強化' },
] as const;

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * ArmoryScreen — 武器庫画面。
 * '武器詳細' / '共通強化' の 2 タブ構成。
 */
export function ArmoryScreen() {
  const [activeTab, setActiveTab] = useState<ArmoryTab>('details');
  const { screen, navigate } = useNavigation();

  return (
    <AppShell
      header={
        <PageHeader
          title="武器庫"
          currencies={['bolt', 'alloy']}
          tabBar={
            <TabBar
              tabs={TABS}
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
          active={screen as 'preparation' | 'machine' | 'armory' | 'patches' | 'settings'}
          onChange={(target: Screen) => navigate(target)}
        />
      }
    >
      <div className={styles.content}>
        {activeTab === 'details' && <WeaponDetailsTab />}
        {activeTab === 'upgrade' && <WeaponLevelUpgradeTab />}
      </div>
    </AppShell>
  );
}
