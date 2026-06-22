import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

const meta: Meta<typeof Page> = {
  title: 'Pages/Preparation',
  component: Page,
  decorators: [withAppContext('preparation')],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

/** デフォルト: T10 まで開放済 + T7 選択中 + 通貨 3 種に値あり (design ref と同条件) */
export const Default: Story = {
  args: {
    initialSelectedTier: 7,
  },
  decorators: [
    (Story) => {
      const { addBolt, addAlloy, addScrew, updateHighest } = useStore.getState();
      updateHighest(10, 1);
      addScrew(BigNum.fromNumber(245));
      addBolt(BigNum.fromNumber(1_230_000_000));
      addAlloy(BigNum.fromNumber(245));
      return <Story />;
    },
  ],
};

/** 初期状態 (T1 のみ・通貨 0) */
export const InitialState: Story = {
  name: '初期状態 (T1 のみ)',
};
