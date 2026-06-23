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
    current: BigNum.fromNumber(800),
    max: BigNum.fromNumber(1000),
    variant: 'normal',
  },
};

export const Elite: Story = {
  args: {
    name: '装甲斥候 mk.III',
    current: BigNum.fromNumber(1280),
    max: BigNum.fromNumber(1500),
    variant: 'elite',
  },
};

export const Boss: Story = {
  args: {
    name: 'Tier 5 ボス: 双角ヴァングィア',
    current: BigNum.fromNumber(4_500_000),
    max: BigNum.fromNumber(5_200_000),
    variant: 'boss',
    size: 'lg',
  },
};

export const Normal: Story = {
  name: 'normal（Tier 表示）',
  render: () => (
    <div style={{ display: 'grid', gap: '10px', minWidth: '320px' }}>
      <EnemyHpBar
        variant="normal"
        tier={3}
        name="ジャンク兵 ×8"
        current={840}
        max={1200}
        size="sm"
      />
      <EnemyHpBar
        variant="normal"
        tier={7}
        name="高 Tier 通常敵"
        current={520}
        max={1200}
        size="sm"
      />
    </div>
  ),
};

export const ShowValueFalse: Story = {
  name: 'showValue=false（バーのみ）',
  render: () => (
    <div style={{ display: 'grid', gap: '10px', minWidth: '320px' }}>
      <EnemyHpBar
        variant="elite"
        name="装甲斥候 mk.III"
        current={1280}
        max={1500}
        showValue={false}
      />
      <EnemyHpBar
        variant="boss"
        name="Tier 5 ボス"
        current={4_500_000}
        max={5_200_000}
        showValue={false}
      />
    </div>
  ),
};

export const LowHp: Story = {
  args: {
    name: 'ゴブリン兵長',
    current: BigNum.fromNumber(200),
    max: BigNum.fromNumber(1000),
  },
};

export const BossLowHp: Story = {
  args: {
    name: 'ドラゴンロード',
    current: BigNum.fromNumber(5000),
    max: BigNum.fromNumber(100000),
    variant: 'boss',
  },
};

export const BigNumValues: Story = {
  args: {
    name: '伝説のタイタン',
    current: BigNum.fromNumber(1_500_000_000),
    max: BigNum.fromNumber(2_000_000_000),
    variant: 'boss',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'var(--c-bg-deep)',
        minWidth: '320px',
      }}
    >
      <EnemyHpBar
        variant="normal"
        tier={3}
        name="通常敵"
        current={BigNum.fromNumber(700)}
        max={BigNum.fromNumber(1000)}
        size="sm"
      />
      <EnemyHpBar
        variant="elite"
        name="エリート敵"
        current={BigNum.fromNumber(3000)}
        max={BigNum.fromNumber(5000)}
      />
      <EnemyHpBar
        variant="boss"
        name="ボス敵"
        current={BigNum.fromNumber(80000)}
        max={BigNum.fromNumber(100000)}
        size="lg"
      />
      <EnemyHpBar
        variant="boss"
        name="瀕死のボス"
        current={BigNum.fromNumber(15000)}
        max={BigNum.fromNumber(100000)}
        size="lg"
      />
    </div>
  ),
};
