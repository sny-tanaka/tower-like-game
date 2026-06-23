import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TierSelectTab } from './index';

const meta: Meta<typeof TierSelectTab> = {
  title: 'Organisms/TierSelectTab',
  component: TierSelectTab,
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
type Story = StoryObj<typeof TierSelectTab>;

/**
 * 序盤: highestTier=5, selectedTier=3
 * Note: store の highestTier はデフォルト 0 → maxTier=1 になる。
 * Storybook ではストア初期値のまま表示。
 */
export const Default: Story = {
  args: {
    selectedTier: 1,
  },
};

/** 選択中のインタラクティブデモ（useState で動かす） */
export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState(1);
      return (
        <div>
          <TierSelectTab
            selectedTier={selected}
            onSelect={setSelected}
          />
          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              color: 'var(--c-text-dim)',
              fontFamily: 'var(--ff-numeric)',
            }}
          >
            選択中: T{selected}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

/** disabled なし（onSelect 未指定） */
export const ReadOnly: Story = {
  args: {
    selectedTier: 1,
    onSelect: undefined,
  },
};
