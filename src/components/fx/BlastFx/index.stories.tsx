import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BlastFx } from './index';

const meta: Meta<typeof BlastFx> = {
  title: 'Fx/BlastFx',
  component: BlastFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof BlastFx>;

function LoopStage({ radius, color }: { radius?: number; color?: string }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 240,
        background: 'var(--c-bg-base)',
        border: '1px solid var(--c-border-faint)',
        borderRadius: 8,
      }}
    >
      <BlastFx
        key={key}
        x={50}
        y={50}
        radius={radius}
        color={color}
      />
    </div>
  );
}

export const Small: Story = {
  render: () => (
    <LoopStage
      radius={8}
      color="var(--c-warning)"
    />
  ),
};

export const Large: Story = {
  render: () => (
    <LoopStage
      radius={18}
      color="var(--c-danger)"
    />
  ),
};
