import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '.';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#04060d' }],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'outline'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleContent = () => (
  <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-body)' }}>
    <div
      style={{ marginBottom: '4px', fontWeight: 'var(--fw-semibold)', color: 'var(--c-primary)' }}
    >
      カードタイトル
    </div>
    <div style={{ color: 'var(--c-text-mid)' }}>カードの内容テキスト</div>
  </div>
);

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    interactive: true,
    children: <SampleContent />,
  },
};

export const PaddingNone: Story = {
  args: {
    variant: 'elevated',
    padding: 'none',
    children: <div style={{ padding: '8px', color: 'var(--c-text)' }}>padding: none</div>,
  },
};

export const PaddingSm: Story = {
  args: {
    variant: 'elevated',
    padding: 'sm',
    children: <SampleContent />,
  },
};

export const PaddingLg: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    children: <SampleContent />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', maxWidth: '600px' }}>
      {(['elevated', 'flat', 'outline'] as const).map((variant) =>
        (['none', 'sm', 'md', 'lg'] as const).map((padding) => (
          <Card
            key={`${variant}-${padding}`}
            variant={variant}
            padding={padding}
          >
            <div
              style={{
                fontSize: 'var(--fs-caption)',
                color: 'var(--c-text-mid)',
                minWidth: '100px',
              }}
            >
              {variant} / {padding}
            </div>
          </Card>
        ))
      )}
    </div>
  ),
};
