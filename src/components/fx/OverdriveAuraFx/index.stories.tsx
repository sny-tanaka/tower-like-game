import type { Meta, StoryObj } from '@storybook/react';

import { OverdriveAuraFx } from './index';

const meta: Meta<typeof OverdriveAuraFx> = {
  title: 'Fx/OverdriveAuraFx',
  component: OverdriveAuraFx,
  parameters: { backgrounds: { default: 'dark' } },
};

export default meta;
type Story = StoryObj<typeof OverdriveAuraFx>;

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
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    </div>
  ),
};

export const CyanVariant: Story = {
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
      <OverdriveAuraFx
        x={50}
        y={50}
        color="var(--c-primary)"
        size={100}
      />
    </div>
  ),
};
