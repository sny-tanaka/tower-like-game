import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { DamagePopFx } from './index';

const meta: Meta<typeof DamagePopFx> = {
  title: 'Fx/DamagePopFx',
  component: DamagePopFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof DamagePopFx>;

/** ループ再生用ラッパー */
function LoopStage({ crit = false }: { crit?: boolean }) {
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
      <DamagePopFx
        key={key}
        value={crit ? 12345 : 987}
        x={50}
        y={60}
        crit={crit}
      />
    </div>
  );
}

export const Normal: Story = {
  render: () => <LoopStage />,
};

export const Crit: Story = {
  render: () => <LoopStage crit />,
};
