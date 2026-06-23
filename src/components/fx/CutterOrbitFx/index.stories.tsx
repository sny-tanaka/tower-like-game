import type { Meta, StoryObj } from '@storybook/react';

import { CutterOrbitFx } from './index';

const meta: Meta<typeof CutterOrbitFx> = {
  title: 'Fx/CutterOrbitFx',
  component: CutterOrbitFx,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    cx: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    cy: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    length: { control: { type: 'range', min: 5, max: 30, step: 1 } },
    thickness: { control: { type: 'range', min: 1, max: 5, step: 0.2 } },
    blades: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    rotateMs: { control: { type: 'range', min: 200, max: 3000, step: 50 } },
    direction: { control: 'select', options: ['cw', 'ccw'] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 360,
          background: 'var(--c-bg-deep)',
          border: '1px solid var(--c-border)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CutterOrbitFx>;

export const Default: Story = {
  args: { cx: 50, cy: 50, length: 14, thickness: 2.2, blades: 2, rotateMs: 1300 },
};

export const FourBladesFast: Story = {
  args: { cx: 50, cy: 50, length: 14, blades: 4, rotateMs: 700 },
};

export const CounterClockwise: Story = {
  args: { cx: 50, cy: 50, blades: 3, rotateMs: 1500, direction: 'ccw' },
};

export const FiniteDuration: Story = {
  args: { cx: 50, cy: 50, blades: 2, rotateMs: 800, duration: 3000 },
};
