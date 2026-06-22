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
      options: [
        'default',
        'text',
        'mid',
        'dim',
        'disabled',
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    truncate: { control: 'boolean' },
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

export const Truncate: Story = {
  name: 'truncate（末尾省略）',
  render: () => (
    <div
      style={{
        width: 280,
        background: 'var(--c-bg-base)',
        border: '1px solid var(--c-border-faint)',
        borderRadius: 'var(--r-s)',
        padding: 10,
      }}
    >
      <Text
        variant="body"
        truncate
      >
        このテキストは 1 行に収まりきらない長さで、末尾は省略される仕様です。
      </Text>
    </div>
  ),
};

export const Align: Story = {
  name: 'align',
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 280 }}>
      <Text
        variant="body"
        align="left"
      >
        左揃え (default)
      </Text>
      <Text
        variant="body"
        align="center"
      >
        中央揃え
      </Text>
      <Text
        variant="body"
        align="right"
      >
        右揃え
      </Text>
    </div>
  ),
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
      'success',
      'warning',
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
