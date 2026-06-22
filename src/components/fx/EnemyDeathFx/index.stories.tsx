import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { EnemyDeathFx } from './index';

const meta: Meta<typeof EnemyDeathFx> = {
  title: 'Fx/EnemyDeathFx',
  component: EnemyDeathFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof EnemyDeathFx>;

function LoopStage({ color }: { color?: string }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 1000);
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
      <EnemyDeathFx
        key={key}
        x={50}
        y={50}
        color={color}
      />
    </div>
  );
}

export const Normal: Story = {
  render: () => <LoopStage />,
};

export const Elite: Story = {
  render: () => <LoopStage color="var(--c-warning)" />,
};

export const Boss: Story = {
  render: () => <LoopStage color="var(--c-danger)" />,
};
