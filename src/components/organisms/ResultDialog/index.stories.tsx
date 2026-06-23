import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ResultDialog } from './index';

import { BigNum } from '@/lib/bignum/BigNum';


const meta: Meta<typeof ResultDialog> = {
  title: 'Organisms/ResultDialog',
  component: ResultDialog,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ResultDialog>;

const baseReward = {
  bolt: BigNum.fromNumber(12500),
  alloy: BigNum.fromNumber(3200),
  patches: [
    { name: 'パワーチップ', tier: 3, count: 2 },
    { name: 'スピードコア', tier: 2, count: 1 },
  ],
};

function ClearStory() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <ResultDialog
        open={open}
        status="clear"
        reachedTier={5}
        reachedWave={30}
        killed={248}
        elapsedSec={312}
        reward={baseReward}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

function GameoverStory() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <ResultDialog
        open={open}
        status="gameover"
        reachedTier={3}
        reachedWave={18}
        killed={110}
        elapsedSec={178}
        reward={{
          bolt: BigNum.fromNumber(4500),
          alloy: BigNum.fromNumber(800),
          patches: [],
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

function RetreatStory() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <ResultDialog
        open={open}
        status="retreat"
        reachedTier={4}
        reachedWave={22}
        killed={180}
        elapsedSec={240}
        reward={{
          bolt: BigNum.fromNumber(7800),
          alloy: BigNum.fromNumber(1500),
          patches: [{ name: 'デフレクタ', tier: 4, count: 1 }],
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

/** クリア */
export const Clear: Story = {
  render: () => <ClearStory />,
};

/** 全滅 */
export const Gameover: Story = {
  render: () => <GameoverStory />,
};

/** 撤退 */
export const Retreat: Story = {
  render: () => <RetreatStory />,
};
