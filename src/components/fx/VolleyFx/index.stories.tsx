import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { VolleyFx } from './index';

const meta: Meta<typeof VolleyFx> = {
  title: 'Fx/VolleyFx',
  component: VolleyFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof VolleyFx>;

function LoopStage({ count = 5, spreadDeg = 360 }: { count?: number; spreadDeg?: number }) {
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
      <VolleyFx
        key={key}
        x={50}
        y={50}
        count={count}
        spreadDeg={spreadDeg}
      />
    </div>
  );
}

export const AllDirection: Story = {
  name: '全方位 5 発',
  render: () => <LoopStage />,
};

export const FanShape: Story = {
  name: '扇形 90°',
  render: () => <LoopStage spreadDeg={90} />,
};
