import type { Meta, StoryObj } from '@storybook/react';

import { PatchSlot } from './index';

const meta: Meta<typeof PatchSlot> = {
  title: 'Molecules/PatchSlot',
  component: PatchSlot,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    slotIndex: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof PatchSlot>;

export const Empty: Story = {
  args: {
    slotIndex: 0,
    patch: null,
  },
};

export const FilledTier1: Story = {
  args: {
    slotIndex: 0,
    patch: {
      name: 'Iron Skin',
      iconName: 'shield',
      tier: 1,
    },
  },
};

export const FilledTier3: Story = {
  args: {
    slotIndex: 1,
    patch: {
      name: 'Rapid Fire',
      iconName: 'lightning',
      tier: 3,
    },
  },
};

export const FilledTier5WithRemove: Story = {
  args: {
    slotIndex: 2,
    patch: {
      name: 'Ultima Core',
      iconName: 'spark',
      tier: 5,
    },
    onRemove: () => alert('Remove clicked'),
  },
};

export const WithOnClick: Story = {
  args: {
    slotIndex: 3,
    patch: {
      name: 'Flame Burst',
      iconName: 'flame',
      tier: 2,
    },
    onClick: () => alert('Slot clicked'),
    onRemove: () => alert('Remove clicked'),
  },
};

export const AllSlots: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 160px)',
        gap: '8px',
      }}
    >
      <PatchSlot
        slotIndex={0}
        patch={{
          name: 'Iron Skin',
          iconName: 'shield',
          tier: 1,
        }}
        onRemove={() => {}}
      />
      <PatchSlot
        slotIndex={1}
        patch={{
          name: 'Rapid Fire',
          iconName: 'lightning',
          tier: 3,
        }}
        onRemove={() => {}}
      />
      <PatchSlot
        slotIndex={2}
        patch={null}
      />
      <PatchSlot
        slotIndex={3}
        patch={{
          name: 'Ultima Core',
          iconName: 'spark',
          tier: 5,
        }}
        onRemove={() => {}}
      />
      <PatchSlot
        slotIndex={4}
        patch={null}
      />
      <PatchSlot
        slotIndex={5}
        patch={null}
      />
    </div>
  ),
};
