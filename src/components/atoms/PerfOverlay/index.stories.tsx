import type { Meta, StoryObj } from '@storybook/react';

import { PerfOverlay } from './index';

const meta: Meta<typeof PerfOverlay> = {
  title: 'Atoms/PerfOverlay',
  component: PerfOverlay,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PerfOverlay>;

/** ?debug=perf 強制表示版 (rAF が回って fps が変動する) */
export const Default: Story = {
  args: { forceShow: true },
};
