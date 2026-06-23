import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ChainBoltFx } from './index';

const meta: Meta<typeof ChainBoltFx> = {
  title: 'Fx/ChainBoltFx',
  component: ChainBoltFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof ChainBoltFx>;

const CHAIN_POINTS = [
  { x: 50, y: 80 },
  { x: 35, y: 55 },
  { x: 60, y: 40 },
  { x: 45, y: 20 },
];

function LoopStage() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 700);
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
      <ChainBoltFx
        key={key}
        points={CHAIN_POINTS}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};
