import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheetHandle } from './index';

const meta: Meta<typeof BottomSheetHandle> = {
  title: 'Molecules/BottomSheetHandle',
  component: BottomSheetHandle,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheetHandle>;

export const Default: Story = {};

export const InSheetContext: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-elev)',
        borderRadius: 'var(--r-l) var(--r-l) 0 0',
        width: 360,
        padding: '0 16px 16px',
        boxShadow: 'var(--sh-high)',
      }}
    >
      <BottomSheetHandle />
      <div style={{ color: 'var(--c-text)', fontSize: 'var(--fs-body)' }}>
        ボトムシートのコンテンツ例
      </div>
    </div>
  ),
};
