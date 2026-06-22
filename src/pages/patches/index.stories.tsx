import type { Meta, StoryObj } from '@storybook/react';

import { PatchScreen } from './index';

import { withAppContext } from '@/__stories__/decorators';

const meta: Meta<typeof PatchScreen> = {
  title: 'Pages/PatchScreen',
  component: PatchScreen,
  decorators: [withAppContext('patches')],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
    viewport: { defaultViewport: 'iphone12' },
  },
};

export default meta;
type Story = StoryObj<typeof PatchScreen>;

/** デフォルト（装着タブ） */
export const Default: Story = {};
