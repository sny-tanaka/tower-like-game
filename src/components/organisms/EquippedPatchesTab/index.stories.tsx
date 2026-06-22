import type { Meta, StoryObj } from '@storybook/react';

import { EquippedPatchesTab } from './index';

const meta: Meta<typeof EquippedPatchesTab> = {
  title: 'Organisms/EquippedPatchesTab',
  component: EquippedPatchesTab,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EquippedPatchesTab>;

/** 未装着状態（store のデフォルト: equippedPatches = 空 Map） */
export const Empty: Story = {
  args: {
    onOpenPatchScreen: () => alert('パッチ庫遷移'),
  },
};

/** 装備変更ボタン無し */
export const NoOpenButton: Story = {
  args: {
    onOpenPatchScreen: undefined,
  },
};
