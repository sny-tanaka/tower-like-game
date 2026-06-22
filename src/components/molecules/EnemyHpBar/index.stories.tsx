import type { Meta, StoryObj } from '@storybook/react';

import { EnemyHpBar } from './index';

import { BigNum } from '@/lib/bignum/BigNum';


const meta: Meta<typeof EnemyHpBar> = {
  title: 'Molecules/EnemyHpBar',
  component: EnemyHpBar,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EnemyHpBar>;

export const Default: Story = {
  args: {
    name: 'ゴブリン兵長',
    currentHp: BigNum.fromNumber(800),
    maxHp: BigNum.fromNumber(1000),
  },
};

export const Elite: Story = {
  args: {
    name: 'エリートオーク',
    currentHp: BigNum.fromNumber(6000),
    maxHp: BigNum.fromNumber(10000),
    type: 'elite',
  },
};

export const Boss: Story = {
  args: {
    name: 'ドラゴンロード',
    currentHp: BigNum.fromNumber(50000),
    maxHp: BigNum.fromNumber(100000),
    type: 'boss',
  },
};

export const LowHp: Story = {
  args: {
    name: 'ゴブリン兵長',
    currentHp: BigNum.fromNumber(200),
    maxHp: BigNum.fromNumber(1000),
  },
};

export const BossLowHp: Story = {
  args: {
    name: 'ドラゴンロード',
    currentHp: BigNum.fromNumber(5000),
    maxHp: BigNum.fromNumber(100000),
    type: 'boss',
  },
};

export const BigNumValues: Story = {
  args: {
    name: '伝説のタイタン',
    currentHp: BigNum.fromNumber(1_500_000_000),
    maxHp: BigNum.fromNumber(2_000_000_000),
    type: 'boss',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'var(--c-bg-deep)',
        minWidth: '280px',
      }}
    >
      <EnemyHpBar
        name="通常敵"
        currentHp={BigNum.fromNumber(700)}
        maxHp={BigNum.fromNumber(1000)}
      />
      <EnemyHpBar
        name="エリート敵"
        currentHp={BigNum.fromNumber(3000)}
        maxHp={BigNum.fromNumber(5000)}
        type="elite"
      />
      <EnemyHpBar
        name="ボス敵"
        currentHp={BigNum.fromNumber(80000)}
        maxHp={BigNum.fromNumber(100000)}
        type="boss"
      />
      <EnemyHpBar
        name="瀕死のボス"
        currentHp={BigNum.fromNumber(15000)}
        maxHp={BigNum.fromNumber(100000)}
        type="boss"
      />
    </div>
  ),
};
