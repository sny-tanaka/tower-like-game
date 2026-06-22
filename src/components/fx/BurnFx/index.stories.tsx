import type { Meta, StoryObj } from '@storybook/react';

import { BurnFx } from './index';

const meta: Meta<typeof BurnFx> = {
  title: 'Fx/BurnFx',
  component: BurnFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof BurnFx>;

export const Default: Story = {
  render: () => (
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
      <BurnFx
        x={50}
        y={60}
      />
    </div>
  ),
};

export const MultipleEnemies: Story = {
  render: () => (
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
      <BurnFx
        x={25}
        y={50}
      />
      <BurnFx
        x={50}
        y={65}
      />
      <BurnFx
        x={75}
        y={45}
      />
    </div>
  ),
};
