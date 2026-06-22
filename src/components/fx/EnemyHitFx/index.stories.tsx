import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { EnemyHitFx } from './index';

const meta: Meta<typeof EnemyHitFx> = {
  title: 'Fx/EnemyHitFx',
  component: EnemyHitFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof EnemyHitFx>;

function LoopStage({ color }: { color?: string }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 500);
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
      <EnemyHitFx
        key={key}
        x={50}
        y={50}
        color={color}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};

export const DangerColor: Story = {
  render: () => <LoopStage color="var(--c-danger)" />,
};
