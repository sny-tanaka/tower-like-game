import type { Meta, StoryObj } from '@storybook/react';

import { WaveProgressBar } from './index';

const meta: Meta<typeof WaveProgressBar> = {
  title: 'Molecules/WaveProgressBar',
  component: WaveProgressBar,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof WaveProgressBar>;

export const Default: Story = {
  args: {
    currentWave: 3,
    totalWaves: 10,
    secondsRemaining: 45,
    secondsTotal: 60,
  },
};

export const BossWave: Story = {
  args: {
    currentWave: 5,
    totalWaves: 10,
    secondsRemaining: 30,
    secondsTotal: 90,
    isBossWave: true,
  },
};

export const AlmostDone: Story = {
  args: {
    currentWave: 9,
    totalWaves: 10,
    secondsRemaining: 5,
    secondsTotal: 60,
  },
};

export const LastWave: Story = {
  args: {
    currentWave: 10,
    totalWaves: 10,
    secondsRemaining: 60,
    secondsTotal: 60,
    isBossWave: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'var(--c-bg-deep)',
        minWidth: '280px',
      }}
    >
      <WaveProgressBar
        currentWave={1}
        totalWaves={10}
        secondsRemaining={60}
        secondsTotal={60}
      />
      <WaveProgressBar
        currentWave={3}
        totalWaves={10}
        secondsRemaining={30}
        secondsTotal={60}
      />
      <WaveProgressBar
        currentWave={5}
        totalWaves={10}
        secondsRemaining={45}
        secondsTotal={90}
        isBossWave={true}
      />
      <WaveProgressBar
        currentWave={10}
        totalWaves={10}
        secondsRemaining={10}
        secondsTotal={60}
      />
    </div>
  ),
};
