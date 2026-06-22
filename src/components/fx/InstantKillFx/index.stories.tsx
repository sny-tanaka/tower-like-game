import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { InstantKillFx } from './index';

const meta: Meta<typeof InstantKillFx> = {
  title: 'Fx/InstantKillFx',
  component: InstantKillFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof InstantKillFx>;

function LoopStage() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 1500);
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
      <InstantKillFx key={key} />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};
