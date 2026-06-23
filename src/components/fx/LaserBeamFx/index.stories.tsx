import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { LaserBeamFx } from './index';

const meta: Meta<typeof LaserBeamFx> = {
  title: 'Fx/LaserBeamFx',
  component: LaserBeamFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof LaserBeamFx>;

function LoopStage() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 600);
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
      <LaserBeamFx
        key={key}
        x1={50}
        y1={80}
        x2={80}
        y2={20}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};
