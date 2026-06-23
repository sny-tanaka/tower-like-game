import type { Meta, StoryObj } from '@storybook/react';

import { Enemy } from './index';

const meta: Meta<typeof Enemy> = {
  title: 'Molecules/Enemy',
  component: Enemy,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['standard', 'swift', 'tough', 'elite', 'miniboss', 'boss'],
    },
    size: { control: { type: 'range', min: 8, max: 100, step: 2 } },
    hp: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    showHp: { control: 'boolean' },
    facing: { control: { type: 'range', min: 0, max: 6.283, step: 0.1 } },
    status: { control: 'select', options: ['normal', 'frozen', 'burning'] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 40,
          background: 'var(--c-bg-base)',
          display: 'inline-block',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Enemy>;

export const Standard: Story = {
  args: { type: 'standard' },
};

export const Swift: Story = {
  args: { type: 'swift', facing: Math.PI },
};

export const Tough: Story = {
  args: { type: 'tough' },
};

export const Elite: Story = {
  args: { type: 'elite', hp: 0.7 },
};

export const Miniboss: Story = {
  args: { type: 'miniboss', hp: 0.5, facing: Math.PI / 4 },
};

export const Boss: Story = {
  args: { type: 'boss', hp: 0.85, facing: 0 },
};

export const FrozenStandard: Story = {
  args: { type: 'standard', status: 'frozen' },
};

export const BurningElite: Story = {
  args: { type: 'elite', hp: 0.4, status: 'burning' },
};

// 6 種を 1 画面に並べる比較ビュー
export const AllTypesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Enemy type="standard" />
      <Enemy type="swift" />
      <Enemy type="tough" />
      <Enemy
        type="elite"
        hp={0.8}
      />
      <Enemy
        type="miniboss"
        hp={0.6}
      />
      <Enemy
        type="boss"
        hp={0.95}
      />
    </div>
  ),
};
