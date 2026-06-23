import type { Meta, StoryObj } from '@storybook/react';

import { FreezeFx } from './index';

const meta: Meta<typeof FreezeFx> = {
  title: 'Fx/FreezeFx',
  component: FreezeFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof FreezeFx>;

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
      <FreezeFx
        x={50}
        y={50}
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
      <FreezeFx
        x={25}
        y={40}
      />
      <FreezeFx
        x={50}
        y={60}
      />
      <FreezeFx
        x={75}
        y={35}
      />
    </div>
  ),
};
