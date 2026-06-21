import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';

const meta: Meta<typeof Page> = {
  title: 'Pages/Home',
  component: Page,
  decorators: [withAppContext()],
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {};
