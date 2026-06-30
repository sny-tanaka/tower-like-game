import type { Meta, StoryObj } from '@storybook/react';

import { ThunderStrikeFx } from './index';

const meta: Meta<typeof ThunderStrikeFx> = {
  title: 'Fx/ThunderStrikeFx',
  component: ThunderStrikeFx,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    x: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    y: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    fromY: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    duration: { control: { type: 'range', min: 100, max: 1500, step: 50 } },
    segments: { control: { type: 'range', min: 3, max: 16, step: 1 } },
    jaggedness: { control: { type: 'range', min: 0, max: 10, step: 0.5 } },
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
type Story = StoryObj<typeof ThunderStrikeFx>;

export const Default: Story = {
  args: { x: 50, y: 60, fromY: 0, duration: 320, segments: 7, jaggedness: 3.5 },
  render: (args) => (
    <ThunderStrikeFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const ShortStrike: Story = {
  args: { x: 70, y: 35, fromY: 0, duration: 200 },
  render: (args) => (
    <ThunderStrikeFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const HighJaggedness: Story = {
  args: { x: 50, y: 70, jaggedness: 8, segments: 12 },
  render: (args) => (
    <ThunderStrikeFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

/**
 * v1.4.2: Plasma Discharge アクティブスキル用の紫サンダー。
 * 通常攻撃 (シアン) と Plasma Discharge (全体落雷) を見た目で区別する。
 */
export const PlasmaPurple: Story = {
  args: { x: 50, y: 60, fromY: 0, duration: 320, color: 'var(--c-secondary)' },
  render: (args) => (
    <ThunderStrikeFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
