import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

const meta: Meta<typeof Page> = {
  title: 'Pages/Machine',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withAppContext('machine')],
};

export default meta;
type Story = StoryObj<typeof Page>;

/** デフォルト（全 Lv 0, ボルト 0） */
export const Default: Story = {
  name: 'デフォルト — 全 Lv 0',
};

/** ボルト豊富（全項目 +1 可能） */
export const RichBolt: Story = {
  name: 'ボルト豊富 (1M)',
  decorators: [
    (Story) => {
      const { addBolt } = useStore.getState();
      addBolt(BigNum.fromNumber(1_000_000));
      return <Story />;
    },
  ],
};

/** 一部 Lv アップ済み */
export const SomeLeveled: Story = {
  name: '一部 Lv アップ済み',
  decorators: [
    (Story) => {
      const { setMachineLv, addBolt } = useStore.getState();
      setMachineLv('maxHp', 5);
      setMachineLv('baseAttack', 10);
      setMachineLv('critRate', 3);
      addBolt(BigNum.fromNumber(500));
      return <Story />;
    },
  ],
};
