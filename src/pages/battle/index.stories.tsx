import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';

const meta: Meta<typeof Page> = {
  title: 'Pages/Battle',
  component: Page,
  decorators: [withAppContext('battle')],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

/** デフォルト: ラン開始直後の状態 */
export const Default: Story = {};
