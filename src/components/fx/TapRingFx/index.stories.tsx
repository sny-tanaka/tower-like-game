import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { TapRingFx } from './index';

const meta: Meta<typeof TapRingFx> = {
  title: 'Fx/TapRingFx',
  component: TapRingFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof TapRingFx>;

/** 0.5 秒間隔で再生し続ける確認用ステージ */
function LoopStage({ duration }: { duration?: number }) {
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
      <TapRingFx
        key={key}
        x={50}
        y={50}
        duration={duration}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LoopStage />,
};

export const Short: Story = {
  name: '短縮版 (duration 320ms)',
  render: () => <LoopStage duration={320} />,
};
