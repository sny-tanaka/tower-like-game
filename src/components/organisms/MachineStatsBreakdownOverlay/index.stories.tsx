import type { Meta, StoryObj } from '@storybook/react';

import { MachineStatsBreakdownOverlay } from './index';

const meta: Meta<typeof MachineStatsBreakdownOverlay> = {
  title: 'Organisms/MachineStatsBreakdownOverlay',
  component: MachineStatsBreakdownOverlay,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MachineStatsBreakdownOverlay>;

/**
 * 初期状態 (machineLevels 全 0, currentWeapon=laser, currentTier=1) の表示。
 * store の default state が反映されるので、 開いて閉じるだけの動作確認用。
 */
export const Open: Story = {
  args: {
    open: true,
    onClose: () => {
      console.log('onClose');
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
};
