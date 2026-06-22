import type { Meta, StoryObj } from '@storybook/react';

import { PatchCard } from './index';

const meta: Meta<typeof PatchCard> = {
  title: 'Molecules/PatchCard',
  component: PatchCard,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatchCard>;

export const Default: Story = {
  args: {
    name: 'HP ブースト',
    iconName: 'heart',
    tier: 1,
    count: 3,
  },
};

export const Selected: Story = {
  args: {
    name: 'レーザー強化',
    iconName: 'laser',
    tier: 3,
    count: 1,
    selected: true,
  },
};

export const Tier5: Story = {
  args: {
    name: 'クリティカル',
    iconName: 'spark',
    tier: 5,
    count: 2,
  },
};

export const AllTiers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', padding: '16px', background: 'var(--c-bg-deep)' }}>
      {([1, 2, 3, 4, 5] as const).map((tier) => (
        <PatchCard
          key={tier}
          name={`T${tier} パッチ`}
          iconName="shield"
          tier={tier}
          count={tier}
        />
      ))}
    </div>
  ),
};

export const WithClick: Story = {
  args: {
    name: 'シールド',
    iconName: 'shield',
    tier: 2,
    count: 4,
    onClick: () => {
      alert('clicked');
    },
  },
};
