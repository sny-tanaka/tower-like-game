import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './index';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (StoryFn) => (
      <div style={{ padding: '24px', width: '300px' }}>
        <p style={{ color: 'white', margin: '0 0 8px' }}>上のテキスト</p>
        <StoryFn />
        <p style={{ color: 'white', margin: '8px 0 0' }}>下のテキスト</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (StoryFn) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px' }}>
        <span style={{ color: 'white' }}>左</span>
        <StoryFn />
        <span style={{ color: 'white' }}>右</span>
      </div>
    ),
  ],
};

export const CustomColor: Story = {
  args: {
    orientation: 'horizontal',
    color: 'var(--c-cyan)',
  },
  decorators: [
    (StoryFn) => (
      <div style={{ padding: '24px', width: '300px' }}>
        <StoryFn />
      </div>
    ),
  ],
};
