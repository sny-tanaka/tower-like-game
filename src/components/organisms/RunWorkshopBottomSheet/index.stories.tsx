import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { RunWorkshopKey } from './items';
import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
} from './items';

import type { RunWorkshopLevels } from './index';
import { RunWorkshopBottomSheet } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const meta: Meta<typeof RunWorkshopBottomSheet> = {
  title: 'Organisms/RunWorkshopBottomSheet',
  component: RunWorkshopBottomSheet,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof RunWorkshopBottomSheet>;

// ---------------------------------------------------------------------------
// デフォルト初期状態（全 Lv 0 / ネジ 0 = 全 disabled）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '全 Lv 0 — ネジ不足（全 disabled）',
  args: {
    open: true,
    screw: BigNum.fromNumber(0),
    levels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
    onUpgrade: () => undefined,
  },
};

// ---------------------------------------------------------------------------
// ネジ豊富（全 +1 可能）
// ---------------------------------------------------------------------------

export const RichScrew: Story = {
  name: 'ネジ豊富 (1,000)',
  args: {
    open: true,
    screw: BigNum.fromNumber(1_000),
    levels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
    onUpgrade: () => undefined,
  },
};

// ---------------------------------------------------------------------------
// 一部 Lv アップ済み
// ---------------------------------------------------------------------------

export const SomeLeveled: Story = {
  name: '一部 Lv アップ済み',
  args: {
    open: true,
    screw: BigNum.fromNumber(500),
    levels: { attackMul: 5, attackSpeedMul: 3, hpMul: 2, screwGainMul: 1 },
    onUpgrade: () => undefined,
  },
};

// ---------------------------------------------------------------------------
// インタラクティブ（状態付き）— コンポーネントとして定義して hooks ルールを満たす
// ---------------------------------------------------------------------------

function InteractiveStory() {
  const [screw, setScrew] = useState(BigNum.fromNumber(10_000));
  const [levels, setLevels] = useState<RunWorkshopLevels>({
    attackMul: 0,
    attackSpeedMul: 0,
    hpMul: 0,
    screwGainMul: 0,
  });

  const handleUpgrade = (key: RunWorkshopKey, delta: 1 | 5 | 'max') => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === key);
    if (!item) return;

    const currentLv = levels[key];

    if (delta === 1) {
      const cost = BigNum.fromNumber(calcRunWorkshopCost(item, currentLv));
      if (screw.lt(cost)) return;
      setScrew(screw.sub(cost));
      setLevels((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    } else if (delta === 5) {
      const cost5 = BigNum.fromNumber(calcRunWorkshopMultiLvCost(item, currentLv, 5));
      if (screw.lt(cost5)) return;
      setScrew(screw.sub(cost5));
      setLevels((prev) => ({ ...prev, [key]: prev[key] + 5 }));
    } else {
      const { lvDelta, totalCost } = calcRunWorkshopMaxLv(item, currentLv, screw);
      if (lvDelta === 0) return;
      setScrew(screw.sub(totalCost));
      setLevels((prev) => ({ ...prev, [key]: prev[key] + lvDelta }));
    }
  };

  return (
    <div style={{ background: 'var(--c-bg-deep)', minHeight: '100vh', position: 'relative' }}>
      <div style={{ padding: 16, color: 'var(--c-text)' }}>
        <p>ネジ残高: {screw.toDisplay()}</p>
      </div>
      <RunWorkshopBottomSheet
        open={true}
        screw={screw}
        levels={levels}
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
    open: true,
    screw: BigNum.fromNumber(500_000),
    levels: { attackMul: 20, attackSpeedMul: 20, hpMul: 20, screwGainMul: 10 },
    onUpgrade: () => undefined,
  },
};
