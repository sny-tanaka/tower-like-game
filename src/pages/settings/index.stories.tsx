import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

import { NavigationProvider } from '@/store/navigation';

const meta: Meta<typeof Page> = {
  title: 'Pages/SettingsScreen',
  component: Page,
  decorators: [
    (Story) => (
      <NavigationProvider initialScreen="settings">
        <Story />
      </NavigationProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
    viewport: { defaultViewport: 'iphone12' },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

/** デフォルト（音タブ） */
export const Default: Story = {};

/** ゲームタブ初期表示を模したい場合は Default から切り替えてください */
export const DefaultView: Story = {
  name: 'Default (音タブ)',
};
