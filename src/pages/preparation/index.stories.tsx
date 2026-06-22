import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';

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

/** デフォルト: Tier 選択タブ */
export const Default: Story = {};
