import type { Meta, StoryObj } from '@storybook/react';

import { TierClearFx } from './index';

const meta: Meta<typeof TierClearFx> = {
  title: 'Fx/TierClearFx',
  component: TierClearFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    duration: { control: { type: 'range', min: 400, max: 4000, step: 100 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 300,
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
        TIER 3 CLEAR
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TierClearFx>;

export const Default: Story = {
  args: {
    duration: 1400,
  },
  render: (args) => (
    <TierClearFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Slow: Story = {
  args: {
    duration: 2800,
  },
  render: (args) => (
    <TierClearFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
