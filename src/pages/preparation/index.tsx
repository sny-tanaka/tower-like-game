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
import { soundEngine } from '@/lib/audio';
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
    const baseMaxHpNum =
      maxHpItem != null ? calcEffectValue(maxHpItem, machineLevels.maxHp) : 10000;
    const activeCdReductionItem = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction');
    const activeCdReduction =
      activeCdReductionItem != null
        ? calcEffectValue(activeCdReductionItem, machineLevels.activeCdReduction)
        : 0;
    startRun({
      initialWeapon,
      baseMachineMaxHp: BigNum.fromNumber(baseMaxHpNum),
      activeCdReduction,
      initialTier: selectedTier,
    });
    soundEngine.play('launch');
    navigate('battle');
  }

  /**
   * DEV 限定デバッグ出撃。 W28 から開始 + ネジ/ボルト/超合金を各 1A (1e9) 持って出撃。
   * Tier クリアフローを短時間で検証するためのショートカット。
   * 本番ビルドでは呼ばれない (UI 側の `import.meta.env.DEV` ガードで消える)。
   */
  function handleLaunchDebug() {
    const maxHpItem = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'maxHp');
    const baseMaxHpNum =
      maxHpItem != null ? calcEffectValue(maxHpItem, machineLevels.maxHp) : 10000;
    const activeCdReductionItem = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction');
    const activeCdReduction =
      activeCdReductionItem != null
        ? calcEffectValue(activeCdReductionItem, machineLevels.activeCdReduction)
        : 0;
    const huge = BigNum.fromNumber(1e9);
    const state = useStore.getState();
    // ボルト / 超合金は currencies slice (startRun でリセットされない) なので先に加算 OK
    state.addBolt(huge);
    state.addAlloy(huge);
    startRun({
      initialWeapon,
      baseMachineMaxHp: BigNum.fromNumber(baseMaxHpNum),
      activeCdReduction,
      initialTier: selectedTier,
      initialWave: 28,
    });
    // ネジは battle slice の中 (startRun で screw=ZERO にリセットされる) → startRun の後に加算
    useStore.getState().addScrew(huge);
    soundEngine.play('launch');
    navigate('battle');
  }

  const handleTabChange = (k: PreparationTab) => {
    if (k === activeTab) return; // 同一タブ連打で SE を鳴らさない
    setActiveTab(k);
    soundEngine.play('tabSwitch');
  };

  const header = (
    <PageHeader
      title="出撃準備"
      currencies={['bolt', 'alloy']}
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
      {/* DEV 限定: W28 + ネジ/ボルト/超合金 1A デバッグ出撃。
          import.meta.env.DEV のリテラル false 評価で本番ビルドからは消える (tree shaking)。 */}
      {import.meta.env.DEV && (
        <div className={styles.debugContainer}>
          <button
            type="button"
            className={styles.debugButton}
            onClick={handleLaunchDebug}
            data-testid="debug-launch"
          >
            [DEV] W28 開始 + ネジ/ボルト/合金 1A
          </button>
        </div>
      )}
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
