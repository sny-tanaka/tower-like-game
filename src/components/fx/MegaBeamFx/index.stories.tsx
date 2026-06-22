import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { MegaBeamFx } from './index';

const meta: Meta<typeof MegaBeamFx> = {
  title: 'Fx/MegaBeamFx',
  component: MegaBeamFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof MegaBeamFx>;

function LoopStage({ angle = -30 }: { angle?: number }) {
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
        overflow: 'hidden',
      }}
    >
      <MegaBeamFx
        key={key}
        x={10}
        y={50}
        angle={angle}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};

export const Diagonal: Story = {
  render: () => <LoopStage angle={-45} />,
};
