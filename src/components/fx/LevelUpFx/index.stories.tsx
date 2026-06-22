import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { LevelUpFx } from './index';

const meta: Meta<typeof LevelUpFx> = {
  title: 'Fx/LevelUpFx',
  component: LevelUpFx,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: 'var(--c-bg-deep)',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LevelUpFx>;

export const Default: Story = {
  args: {
    x: 50,
    y: 50,
    duration: 600,
  },
};

/** 左上コーナー寄りの位置で発火 */
export const TopLeft: Story = {
  args: {
    x: 20,
    y: 20,
    duration: 600,
  },
};

/** 右下コーナー寄りの位置で発火 */
export const BottomRight: Story = {
  args: {
    x: 80,
    y: 80,
    duration: 600,
  },
};

/** 高速版（短い duration） */
export const Fast: Story = {
  args: {
    x: 50,
    y: 50,
    duration: 300,
  },
};

/** UpgradeCard 上での使用イメージ */
export const OnCard: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 120,
        margin: '40px auto',
        background: 'var(--c-bg-elev)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--r-m)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--c-text)',
        fontFamily: 'var(--ff-display)',
      }}
    >
      Lv 5 → 6
      <LevelUpFx
        x={50}
        y={50}
        duration={600}
      />
    </div>
  ),
};

/** onDone コールバックのデモ */
function WithOnDoneStory() {
  const [done, setDone] = useState(false);
  return (
    <>
      {!done && (
        <LevelUpFx
          x={50}
          y={50}
          duration={600}
          onDone={() => setDone(true)}
        />
      )}
      {done && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--c-primary)',
            fontFamily: 'var(--ff-display)',
          }}
        >
          onDone fired!
        </div>
      )}
    </>
  );
}

export const WithOnDone: Story = {
  render: () => <WithOnDoneStory />,
};

/** 複数同時発火 */
export const MultipleSimultaneous: Story = {
  render: () => (
    <>
      <LevelUpFx
        x={25}
        y={40}
        duration={600}
      />
      <LevelUpFx
        x={50}
        y={60}
        duration={700}
      />
      <LevelUpFx
        x={75}
        y={40}
        duration={500}
      />
    </>
  ),
};
