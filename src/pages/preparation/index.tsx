import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import type { TabBarItem } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { EquippedPatchesTab } from '@/components/organisms/EquippedPatchesTab';
import { InitialWeaponTab } from '@/components/organisms/InitialWeaponTab';
import { LaunchButton } from '@/components/organisms/LaunchButton';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { PageHeader } from '@/components/organisms/PageHeader';
import { TierSelectTab } from '@/components/organisms/TierSelectTab';
import { BigNum } from '@/lib/bignum';
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

export interface PreparationPageProps {
  /**
   * 選択中 Tier の初期値。
   * 未指定の場合は `highestTier`（最低 1）を初期値にする。
   * Story / テストで挙動を固定したいときに利用する。
   */
  initialSelectedTier?: number;
}

/**
 * PreparationScreen — 出撃準備画面。
 *
 * 3 タブ（Tier 選択 / 初期装備武器 / パッチ確認）を TabBar で切替。
 * フッターは LaunchButton + BottomNav の 2 段固定。
 */
export function Page(props: PreparationPageProps) {
  const { initialSelectedTier } = props;
  const { navigate } = useNavigation();

  // アクティブなタブ
  const [activeTab, setActiveTab] = useState<PreparationTab>('tier');

  // 選択中 Tier（初期値は props > highestTier > 1 の優先順）
  const highestTier = useStore((s) => s.highestTier);
  const [selectedTier, setSelectedTier] = useState<number>(
    initialSelectedTier != null ? initialSelectedTier : Math.max(1, highestTier)
  );

  // LaunchButton に渡すサマリー情報
  const initialWeapon = useStore((s) => s.initialWeapon);
  const equippedPatches = useStore((s) => s.equippedPatches);
  const patchCount = [...equippedPatches.values()].length;

  // startRun に渡す: 永続強化 maxHp Lv から baseMachineMaxHp を算出
  const machineLevels = useStore((s) => s.machineLevels);
  const startRun = useStore((s) => s.startRun);

  function handleLaunch() {
    const maxHpItem = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp');
    const baseMaxHpNum = maxHpItem != null ? calcEffectValue(maxHpItem, machineLevels.maxHp) : 100;
    startRun({
      initialWeapon,
      baseMachineMaxHp: BigNum.fromNumber(baseMaxHpNum),
    });
    navigate('battle');
  }

  const header = (
    <PageHeader
      title="出撃準備"
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
