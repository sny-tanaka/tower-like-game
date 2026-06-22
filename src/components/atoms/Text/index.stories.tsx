import type { Meta, StoryObj } from '@storybook/react';

import type { TextColor, TextVariant } from './index';
import { Text } from './index';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-1',
        'heading-2',
        'heading-3',
        'body',
        'caption',
        'label',
        'numeric-l',
        'numeric-m',
        'numeric-s',
      ],
    },
    color: {
      control: 'select',
      options: ['default', 'mid', 'dim', 'disabled', 'primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
  args: {
    variant: 'heading-1',
    children: 'Tower Defense',
    color: 'primary',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'heading-2',
    children: 'Machine Upgrade',
    color: 'default',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'heading-3',
    children: 'Weapons',
    color: 'default',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Defend your tower against endless waves of enemies.',
    color: 'default',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Wave 42 / Tier 3',
    color: 'dim',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Attack Power',
    color: 'mid',
  },
};

export const NumericLarge: Story = {
  args: {
    variant: 'numeric-l',
    children: '150.5B',
    color: 'primary',
  },
};

export const NumericMedium: Story = {
  args: {
    variant: 'numeric-m',
    children: '12.3A',
    color: 'default',
  },
};

export const NumericSmall: Story = {
  args: {
    variant: 'numeric-s',
    children: '999',
    color: 'secondary',
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: TextVariant[] = [
      'heading-1',
      'heading-2',
      'heading-3',
      'body',
      'caption',
      'label',
      'numeric-l',
      'numeric-m',
      'numeric-s',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {variants.map((v) => (
          <Text
            key={v}
            variant={v}
          >
            {v} — Sample Text
          </Text>
        ))}
      </div>
    );
  },
};

export const AllColors: Story = {
  render: () => {
    const colors: TextColor[] = [
      'default',
      'mid',
      'dim',
      'disabled',
      'primary',
      'secondary',
      'danger',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {colors.map((c) => (
          <Text
            key={c}
            variant="body"
            color={c}
          >
            {c} — Neon Cyber Future
          </Text>
        ))}
      </div>
    );
  },
};
