import type { Meta, StoryObj } from '@storybook/react';

import { WaveProgressBar } from './index';

const meta: Meta<typeof WaveProgressBar> = {
  title: 'Molecules/WaveProgressBar',
  component: WaveProgressBar,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof WaveProgressBar>;

export const Default: Story = {
  args: {
    waveNumber: 3,
    secondsLeft: 42,
    secondsMax: 60,
  },
};

export const LowTime: Story = {
  name: 'Low time (3s)',
  args: {
    waveNumber: 3,
    secondsLeft: 3,
    secondsMax: 60,
  },
};

export const MilestoneElite: Story = {
  name: 'Milestone — elite',
  args: {
    waveNumber: 4,
    secondsLeft: 50,
    secondsMax: 60,
    nextMilestone: { wave: 5, kind: 'elite' },
  },
};

export const MilestoneBoss: Story = {
  name: 'Milestone — boss',
  args: {
    waveNumber: 9,
    secondsLeft: 28,
    secondsMax: 60,
    nextMilestone: { wave: 10, kind: 'boss' },
  },
};

export const MilestoneTierUp: Story = {
  name: 'Milestone — tier-up',
  args: {
    waveNumber: 14,
    secondsLeft: 32,
    secondsMax: 60,
    nextMilestone: { wave: 15, kind: 'tier-up' },
  },
};

export const ShowSecondsFalse: Story = {
  name: 'showSeconds=false',
  args: {
    waveNumber: 5,
    secondsLeft: 40,
    secondsMax: 60,
    nextMilestone: { wave: 10, kind: 'boss' },
    showSeconds: false,
  },
};

export const AllSizes: Story = {
  name: 'size sm / md / lg',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 24,
        display: 'grid',
        gap: 14,
        maxWidth: 660,
      }}
    >
      <WaveProgressBar
        waveNumber={7}
        secondsLeft={35}
        secondsMax={60}
        size="sm"
      />
      <WaveProgressBar
        waveNumber={7}
        secondsLeft={35}
        secondsMax={60}
        size="md"
      />
      <WaveProgressBar
        waveNumber={7}
        secondsLeft={35}
        secondsMax={60}
        size="lg"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All states',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 24,
        display: 'grid',
        gap: 14,
        maxWidth: 660,
      }}
    >
      <WaveProgressBar
        waveNumber={3}
        secondsLeft={42}
        secondsMax={60}
      />
      <WaveProgressBar
        waveNumber={3}
        secondsLeft={18}
        secondsMax={60}
      />
      <WaveProgressBar
        waveNumber={4}
        secondsLeft={50}
        secondsMax={60}
        nextMilestone={{ wave: 5, kind: 'elite' }}
      />
      <WaveProgressBar
        waveNumber={9}
        secondsLeft={28}
        secondsMax={60}
        nextMilestone={{ wave: 10, kind: 'boss' }}
      />
      <WaveProgressBar
        waveNumber={19}
        secondsLeft={10}
        secondsMax={60}
        nextMilestone={{ wave: 20, kind: 'boss' }}
      />
      <WaveProgressBar
        waveNumber={14}
        secondsLeft={32}
        secondsMax={60}
        nextMilestone={{ wave: 15, kind: 'tier-up' }}
      />
    </div>
  ),
};
