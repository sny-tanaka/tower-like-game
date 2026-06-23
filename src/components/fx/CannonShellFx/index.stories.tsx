import type { Meta, StoryObj } from '@storybook/react';

import { CannonShellFx } from './index';

const meta: Meta<typeof CannonShellFx> = {
  title: 'Fx/CannonShellFx',
  component: CannonShellFx,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    x1: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    y1: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    x2: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    y2: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    duration: { control: { type: 'range', min: 100, max: 2000, step: 50 } },
    size: { control: { type: 'range', min: 1, max: 10, step: 0.2 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 360,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CannonShellFx>;

export const Default: Story = {
  args: { x1: 50, y1: 50, x2: 80, y2: 20, duration: 480 },
  render: (args) => (
    <CannonShellFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const ShortFlight: Story = {
  args: { x1: 50, y1: 50, x2: 60, y2: 40, duration: 240 },
  render: (args) => (
    <CannonShellFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const LongFlight: Story = {
  args: { x1: 50, y1: 50, x2: 10, y2: 90, duration: 900, size: 5 },
  render: (args) => (
    <CannonShellFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
