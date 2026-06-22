import type { Meta, StoryObj } from '@storybook/react';

import { MachineUpgradeList } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

const meta: Meta<typeof MachineUpgradeList> = {
  title: 'Organisms/MachineUpgradeList',
  component: MachineUpgradeList,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto', padding: 16, background: 'var(--c-bg-deep)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MachineUpgradeList>;

// ---------------------------------------------------------------------------
// デフォルト (全 Lv 0, ボルト 0 = 全 disabled)
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '全 Lv 0 — ボルト不足',
};

// ---------------------------------------------------------------------------
// ボルト豊富（全項目 +1 可能）
// ---------------------------------------------------------------------------

export const RichBolt: Story = {
  name: 'ボルト豊富 (1M)',
  decorators: [
    (Story) => {
      // Storybook でのみ store を書き換える
      const { addBolt } = useStore.getState();
      addBolt(BigNum.fromNumber(1_000_000));
      return <Story />;
    },
  ],
};

// ---------------------------------------------------------------------------
// 一部 Lv アップ済み
// ---------------------------------------------------------------------------

export const SomeLeveled: Story = {
  name: '一部 Lv アップ済み',
  decorators: [
    (Story) => {
      const { setMachineLv, addBolt } = useStore.getState();
      setMachineLv('maxHp', 5);
      setMachineLv('baseAttack', 10);
      setMachineLv('critRate', 3);
      setMachineLv('screwGain', 2);
      addBolt(BigNum.fromNumber(500));
      return <Story />;
    },
  ],
};

// ---------------------------------------------------------------------------
// patchSlots MAX (Lv 5 = MAXED)
// ---------------------------------------------------------------------------

export const PatchSlotsMaxed: Story = {
  name: 'patchSlots MAXED (Lv 5)',
  decorators: [
    (Story) => {
      const { setMachineLv, addBolt } = useStore.getState();
      setMachineLv('patchSlots', 5);
      addBolt(BigNum.fromNumber(1_000_000));
      return <Story />;
    },
  ],
};
