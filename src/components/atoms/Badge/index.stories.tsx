import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['tier', 'elite', 'boss', 'patch-tier', 'default'],
    },
    tier: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: 'Normal',
    variant: 'default',
  },
};

export const Elite: Story = {
  args: {
    text: 'ELITE',
    variant: 'elite',
  },
};

export const Boss: Story = {
  args: {
    text: 'BOSS',
    variant: 'boss',
    glow: true,
  },
};

export const Tier5: Story = {
  args: {
    text: 'Tier 5',
    variant: 'tier',
    tier: 5,
  },
};

export const Tier10WithGlow: Story = {
  args: {
    text: 'Tier 10',
    variant: 'tier',
    tier: 10,
    glow: true,
  },
};

export const PatchTier3: Story = {
  args: {
    text: 'T3',
    variant: 'patch-tier',
    tier: 3,
  },
};

export const AllTierColors: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
        <Badge
          key={t}
          text={`Tier ${t}`}
          variant="tier"
          tier={t}
        />
      ))}
    </div>
  ),
};

export const AllPatchTierColors: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5].map((t) => (
        <Badge
          key={t}
          text={`PT${t}`}
          variant="patch-tier"
          tier={t}
          glow
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge
        text="Default"
        variant="default"
      />
      <Badge
        text="Tier 7"
        variant="tier"
        tier={7}
      />
      <Badge
        text="Elite"
        variant="elite"
      />
      <Badge
        text="Boss"
        variant="boss"
      />
      <Badge
        text="PT3"
        variant="patch-tier"
        tier={3}
      />
    </div>
  ),
};

export const GlowComparison: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      <Badge
        text="Elite (glow off)"
        variant="elite"
        glow={false}
      />
      <Badge
        text="Elite (glow on)"
        variant="elite"
        glow={true}
      />
      <Badge
        text="Boss (glow on)"
        variant="boss"
        glow={true}
      />
    </div>
  ),
};
