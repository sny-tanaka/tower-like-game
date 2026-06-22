import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import type { TabBarItem } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { EquippedPatchesTab } from '@/components/organisms/EquippedPatchesTab';
import { InitialWeaponTab } from '@/components/organisms/InitialWeaponTab';
import { LaunchButton } from '@/components/organisms/LaunchButton';
import { PageHeader } from '@/components/organisms/PageHeader';
import { TierSelectTab } from '@/components/organisms/TierSelectTab';
import { useStore } from '@/store';
import { useNavigation } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type PreparationTab = 'tier' | 'weapon' | 'patches';

const TABS: ReadonlyArray<TabBarItem<PreparationTab>> = [
  { key: 'tier', label: 'TIER' },
  { key: 'weapon', label: '武器' },
  { key: 'patches', label: 'パッチ' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

/**
 * PreparationScreen — 出撃準備画面。
 *
 * 3 タブ（Tier 選択 / 初期装備武器 / パッチ確認）を TabBar で切替。
 * フッターは LaunchButton + BottomNav の 2 段固定。
 */
export function Page() {
  const { navigate } = useNavigation();

  // アクティブなタブ
  const [activeTab, setActiveTab] = useState<PreparationTab>('tier');

  // 選択中 Tier（初期値は highestTier or 1）
  const highestTier = useStore((s) => s.highestTier);
  const [selectedTier, setSelectedTier] = useState<number>(Math.max(1, highestTier));

  // LaunchButton に渡すサマリー情報
  const initialWeapon = useStore((s) => s.initialWeapon);
  const equippedPatches = useStore((s) => s.equippedPatches);
  const patchCount = [...equippedPatches.values()].length;

  function handleLaunch() {
    navigate('battle');
  }

  const header = (
    <PageHeader
      title="出撃準備"
      currencies={['screw', 'bolt', 'alloy']}
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
  );

  const footer = (
    <div className={styles.footer}>
      <LaunchButton
        tier={selectedTier}
        weaponKind={initialWeapon}
        patchCount={patchCount}
        sticky={false}
        onLaunch={handleLaunch}
      />
      <BottomNav
        active="preparation"
        onChange={(screen) => navigate(screen)}
      />
    </div>
  );

  return (
    <AppShell
      header={header}
      footer={footer}
    >
      <div className={styles.tabPanel}>
        {activeTab === 'tier' && (
          <TierSelectTab
            selectedTier={selectedTier}
            onSelect={setSelectedTier}
          />
        )}
        {activeTab === 'weapon' && <InitialWeaponTab />}
        {activeTab === 'patches' && (
          <EquippedPatchesTab onOpenPatchScreen={() => navigate('patches')} />
        )}
      </div>
    </AppShell>
  );
}
