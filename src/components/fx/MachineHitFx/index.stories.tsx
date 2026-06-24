import type { Meta, StoryObj } from '@storybook/react';

import { MachineHitFx } from './index';

const meta: Meta<typeof MachineHitFx> = {
  title: 'fx/MachineHitFx',
  component: MachineHitFx,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 400,
          height: 400,
          background: 'var(--c-bg-deep)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MachineHitFx>;

export const Default: Story = {
  args: { cx: 50, cy: 50 },
};

export const TopLeft: Story = {
  args: { cx: 25, cy: 25 },
};

export const LongDuration: Story = {
  args: { cx: 50, cy: 50, duration: 800 },
};
