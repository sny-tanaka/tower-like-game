import type { Meta, StoryObj } from '@storybook/react';

import { HealFlashFx } from './index';

const meta: Meta<typeof HealFlashFx> = {
  title: 'Fx/HealFlashFx',
  component: HealFlashFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    duration: { control: { type: 'range', min: 100, max: 1500, step: 50 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 180,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-m)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--c-text)',
          fontFamily: 'var(--ff-display)',
          fontSize: 18,
        }}
      >
        HP REGEN
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HealFlashFx>;

export const Default: Story = {
  args: {
    duration: 480,
  },
  render: (args) => (
    <HealFlashFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Slow: Story = {
  args: {
    duration: 1000,
  },
  render: (args) => (
    <HealFlashFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
