import type { Meta, StoryObj } from '@storybook/react';

import { DataSettingsTab } from './index';

const meta: Meta<typeof DataSettingsTab> = {
  title: 'Organisms/DataSettingsTab',
  component: DataSettingsTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DataSettingsTab>;

/** ストレージ情報あり */
export const Default: Story = {
  args: {
    storageInfo: {
      usedKb: 142,
      slots: 1,
      lastSavedAt: '12 分前',
    },
    onExport: async () => {
      await new Promise((r) => setTimeout(r, 500));
      alert('エクスポート完了 (Storybook モック)');
    },
    onImport: async (file) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(`インポート: ${file.name} (Storybook モック)`);
    },
    onReset: async () => {
      await new Promise((r) => setTimeout(r, 300));
      alert('リセット完了 (Storybook モック)');
    },
  },
};

/** ストレージ情報なし */
export const NoStorageInfo: Story = {
  args: {
    onExport: () => {},
    onImport: () => {},
    onReset: () => {},
  },
};
