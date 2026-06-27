import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { RunWorkshopKey, RunWorkshopLevels } from './items';
import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
} from './items';

import { RunWorkshopBottomSheet } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// Storybook helpers
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-C: RunWorkshopBottomSheet は screw / runWorkshopLevels / runWorkshopAutoEnabled
 * を内部 `useStore` selector で直接購読するようになったため、 args を直接 props として渡せない。
 * Story 表示直前に `seedBattleState` で store に値を書き込み、 RunWorkshopBottomSheet はそれを
 * subscribe する形に変更。
 */
interface StoryArgs {
  /** ネジ残高 (整数で指定) */
  screw: number;
  /** RunWorkshop 4 項目の現在 Lv */
  levels: RunWorkshopLevels;
  /** RunWorkshop 4 項目の AUTO ON/OFF (省略時は全 false で seed) */
  autoEnabled?: {
    attackMul: boolean;
    attackSpeedMul: boolean;
    hpMul: boolean;
    screwGainMul: boolean;
  };
  /** onToggleAuto を渡すかどうか (= AUTO トグル UI を表示するか) */
  showAutoToggle?: boolean;
}

function StoryHarness(args: StoryArgs) {
  useEffect(() => {
    resetBattleState();
    seedBattleState({
      screw: BigNum.fromNumber(args.screw),
      runWorkshopLevels: args.levels,
      runWorkshopAutoEnabled: args.autoEnabled,
    });
  }, [args.screw, args.levels, args.autoEnabled]);

  return (
    <RunWorkshopBottomSheet
      open={true}
      onUpgrade={() => undefined}
      onToggleAuto={args.showAutoToggle === true ? () => undefined : undefined}
    />
  );
}

const meta: Meta<typeof StoryHarness> = {
  title: 'Organisms/RunWorkshopBottomSheet',
  component: StoryHarness,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof StoryHarness>;

// ---------------------------------------------------------------------------
// デフォルト初期状態（全 Lv 0 / ネジ 0 = 全 disabled）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '全 Lv 0 — ネジ不足（全 disabled）',
  args: {
    screw: 0,
    levels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  },
};

// ---------------------------------------------------------------------------
// ネジ豊富（全 +1 可能）
// ---------------------------------------------------------------------------

export const RichScrew: Story = {
  name: 'ネジ豊富 (1,000)',
  args: {
    screw: 1_000,
    levels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
  },
};

// ---------------------------------------------------------------------------
// 一部 Lv アップ済み
// ---------------------------------------------------------------------------

export const SomeLeveled: Story = {
  name: '一部 Lv アップ済み',
  args: {
    screw: 500,
    levels: { attackMul: 5, attackSpeedMul: 3, hpMul: 2, screwGainMul: 1 },
  },
};

// ---------------------------------------------------------------------------
// AUTO トグル: 一部 ON / 全 ON のビジュアル確認
// ---------------------------------------------------------------------------

export const WithAutoPartialOn: Story = {
  name: 'AUTO トグル (攻撃 + HP のみ ON)',
  args: {
    screw: 1_000,
    levels: { attackMul: 2, attackSpeedMul: 0, hpMul: 1, screwGainMul: 0 },
    autoEnabled: {
      attackMul: true,
      attackSpeedMul: false,
      hpMul: true,
      screwGainMul: false,
    },
    showAutoToggle: true,
  },
};

export const WithAutoAllOn: Story = {
  name: 'AUTO トグル (全 ON)',
  args: {
    screw: 1_000,
    levels: { attackMul: 5, attackSpeedMul: 5, hpMul: 5, screwGainMul: 2 },
    autoEnabled: {
      attackMul: true,
      attackSpeedMul: true,
      hpMul: true,
      screwGainMul: true,
    },
    showAutoToggle: true,
  },
};

// ---------------------------------------------------------------------------
// インタラクティブ（状態付き）— store を直接操作して Lv 上げを試せる
// ---------------------------------------------------------------------------

function InteractiveStory() {
  const [, force] = useState(0);

  useEffect(() => {
    resetBattleState();
    seedBattleState({
      screw: BigNum.fromNumber(10_000),
      runWorkshopLevels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
    });
  }, []);

  const handleUpgrade = (key: RunWorkshopKey, delta: 1 | 5 | 'max') => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === key);
    if (!item) return;

    const state = useStore.getState();
    const currentLv = state.runWorkshopLevels[key];
    const screw = state.screw;

    if (delta === 1) {
      const cost = BigNum.fromNumber(calcRunWorkshopCost(item, currentLv));
      if (screw.lt(cost)) return;
      useStore.setState({
        screw: screw.sub(cost),
        runWorkshopLevels: { ...state.runWorkshopLevels, [key]: currentLv + 1 },
      });
    } else if (delta === 5) {
      const cost5 = BigNum.fromNumber(calcRunWorkshopMultiLvCost(item, currentLv, 5));
      if (screw.lt(cost5)) return;
      useStore.setState({
        screw: screw.sub(cost5),
        runWorkshopLevels: { ...state.runWorkshopLevels, [key]: currentLv + 5 },
      });
    } else {
      const { lvDelta, totalCost } = calcRunWorkshopMaxLv(item, currentLv, screw);
      if (lvDelta === 0) return;
      useStore.setState({
        screw: screw.sub(totalCost),
        runWorkshopLevels: { ...state.runWorkshopLevels, [key]: currentLv + lvDelta },
      });
    }
    // Storybook 上で store 変更を即時反映させる (RunWorkshopBottomSheet 自体は subscribe で
    // 自動更新されるが、 ヘッダーの「ネジ残高」 表示用に親も再 render を促す)
    force((n) => n + 1);
  };

  return (
    <div style={{ background: 'var(--c-bg-deep)', minHeight: '100vh', position: 'relative' }}>
      <div style={{ padding: 16, color: 'var(--c-text)' }}>
        <p>ネジ残高: {useStore.getState().screw.toDisplay()}</p>
      </div>
      <RunWorkshopBottomSheet
        open={true}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}

export const Interactive: Story = {
  name: 'インタラクティブ（Lv 上げ操作可）',
  render: () => <InteractiveStory />,
};

// ---------------------------------------------------------------------------
// 高 Tier — 大きいネジ数
// ---------------------------------------------------------------------------

export const HighTier: Story = {
  name: 'High Tier — Lv 20 / 大量ネジ',
  args: {
    screw: 500_000,
    levels: { attackMul: 20, attackSpeedMul: 20, hpMul: 20, screwGainMul: 10 },
  },
};
