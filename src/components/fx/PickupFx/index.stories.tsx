import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PickupFx } from './index';

const meta: Meta<typeof PickupFx> = {
  title: 'Fx/PickupFx',
  component: PickupFx,
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
type Story = StoryObj<typeof PickupFx>;

export const ScrewPickup: Story = {
  args: {
    x: 50,
    y: 70,
    targetX: 90,
    targetY: 5,
    iconName: 'screw',
    duration: 400,
  },
};

export const BoltPickup: Story = {
  args: {
    x: 30,
    y: 60,
    targetX: 85,
    targetY: 8,
    iconName: 'bolt',
    duration: 400,
  },
};

export const AlloyPickup: Story = {
  args: {
    x: 60,
    y: 50,
    targetX: 92,
    targetY: 12,
    iconName: 'alloy',
    duration: 400,
  },
};

/** 3 通貨を並べてアイコン・色の違いを確認 */
export const AllCurrencies: Story = {
  render: () => (
    <>
      <PickupFx
        key="screw"
        x={25}
        y={70}
        targetX={90}
        targetY={5}
        iconName="screw"
        duration={400}
      />
      <PickupFx
        key="bolt"
        x={50}
        y={70}
        targetX={90}
        targetY={5}
        iconName="bolt"
        duration={500}
      />
      <PickupFx
        key="alloy"
        x={75}
        y={70}
        targetX={90}
        targetY={5}
        iconName="alloy"
        duration={600}
      />
    </>
  ),
};

/** onDone コールバックのデモ — アニメーション完了後にメッセージ表示 */
function WithOnDoneStory() {
  const [done, setDone] = useState(false);
  return (
    <>
      {!done && (
        <PickupFx
          x={50}
          y={70}
          targetX={90}
          targetY={5}
          iconName="bolt"
          duration={400}
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
