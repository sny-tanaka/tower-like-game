import type { Meta, StoryObj } from '@storybook/react';

import { WaveStartFx } from './index';

const meta: Meta<typeof WaveStartFx> = {
  title: 'Fx/WaveStartFx',
  component: WaveStartFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    waveNumber: { control: { type: 'number' } },
    duration: { control: { type: 'range', min: 300, max: 3000, step: 100 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 200,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-m)',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WaveStartFx>;

export const Wave1: Story = {
  args: {
    waveNumber: 1,
    duration: 1100,
  },
  render: (args) => (
    <WaveStartFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Wave42: Story = {
  args: {
    waveNumber: 42,
    duration: 1100,
  },
  render: (args) => (
    <WaveStartFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Wave100: Story = {
  args: {
    waveNumber: 100,
    duration: 1100,
  },
  render: (args) => (
    <WaveStartFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
