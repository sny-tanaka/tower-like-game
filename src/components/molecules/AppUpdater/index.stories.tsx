import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppUpdater } from './index';

const meta: Meta<typeof AppUpdater> = {
  title: 'Molecules/AppUpdater',
  component: AppUpdater,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AppUpdater>;

export const HasUpdate: Story = {
  args: {
    banner: { kind: 'has-update' },
    onApply: () => {},
  },
};

export const UpToDate: Story = {
  args: {
    banner: { kind: 'up-to-date' },
    onApply: () => {},
  },
};

export const Hidden: Story = {
  args: {
    banner: null,
    onApply: () => {},
  },
  parameters: {
    docs: { description: { story: 'banner === null のとき何も描画しない' } },
  },
};
