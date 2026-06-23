import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { PageHeader } from '@/components/organisms/PageHeader';
import { WeaponDetailsTab } from '@/components/organisms/WeaponDetailsTab';
import { WeaponLevelUpgradeTab } from '@/components/organisms/WeaponLevelUpgradeTab';
import { soundEngine } from '@/lib/audio';
import { useNavigation } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type ArmoryTab = 'details' | 'upgrade';

const TABS = [
  { key: 'details' as ArmoryTab, label: '詳細' },
  { key: 'upgrade' as ArmoryTab, label: '強化' },
] as const;

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export interface ArmoryScreenProps {
  /** 初期表示タブ（テスト・ストーリーから上書き可。デフォルト: 'details'） */
  initialTab?: ArmoryTab;
}

/**
 * ArmoryScreen — 武器庫画面。
 * '詳細' / '強化' の 2 タブ構成。
 */
export function ArmoryScreen(props: ArmoryScreenProps = {}) {
  const { initialTab = 'details' } = props;
  const [activeTab, setActiveTab] = useState<ArmoryTab>(initialTab);
  const { screen, navigate } = useNavigation();

  const handleTabChange = (k: ArmoryTab) => {
    setActiveTab(k);
    soundEngine.play('tabSwitch');
  };

  return (
    <AppShell
      header={
        <PageHeader
          title="武器庫"
          currencies={['bolt', 'alloy']}
          onBack={() => navigate('preparation')}
          tabBar={
            <TabBar
              tabs={TABS}
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
          active={screen as 'preparation' | 'machine' | 'armory' | 'patches' | 'settings'}
          onChange={navigate}
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
