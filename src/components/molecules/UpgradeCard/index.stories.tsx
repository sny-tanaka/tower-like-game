import type { Meta, StoryObj } from '@storybook/react';

import { UpgradeCard } from './index';

import { BigNum } from '@/lib/bignum/BigNum';




const meta: Meta<typeof UpgradeCard> = {
  title: 'Molecules/UpgradeCard',
  component: UpgradeCard,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof UpgradeCard>;

export const Default: Story = {
  args: {
    title: '最大 HP',
    currentLv: 3,
    currentValue: '+450',
    nextLvCost: BigNum.fromNumber(1200),
    canAfford: true,
    currency: 'screw',
  },
};

export const WithMaxLv: Story = {
  args: {
    title: '攻撃速度',
    currentLv: 5,
    currentValue: '2.50x',
    nextLvCost: BigNum.fromNumber(50000),
    canAfford: true,
    currency: 'bolt',
    maxLv: 10,
  },
};

export const CannotAfford: Story = {
  args: {
    title: 'アーマー',
    currentLv: 1,
    currentValue: '+100',
    nextLvCost: BigNum.fromNumber(99999999),
    canAfford: false,
    currency: 'alloy',
  },
};

export const Disabled: Story = {
  args: {
    title: '再生速度',
    currentLv: 0,
    currentValue: '0',
    nextLvCost: BigNum.fromNumber(500),
    canAfford: true,
    currency: 'screw',
    disabled: true,
  },
};

export const LargeCost: Story = {
  args: {
    title: 'ダメージ倍率',
    currentLv: 99,
    currentValue: '1.20B',
    nextLvCost: BigNum.fromNumber(1_500_000_000),
    canAfford: true,
    currency: 'bolt',
    maxLv: 100,
  },
};

export const AllCurrencies: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '16px', background: 'var(--c-bg-deep)' }}>
      <UpgradeCard
        title="最大 HP"
        currentLv={3}
        currentValue="+450"
        nextLvCost={BigNum.fromNumber(1200)}
        canAfford={true}
        currency="screw"
        onUpgrade={() => undefined}
      />
      <UpgradeCard
        title="攻撃速度"
        currentLv={5}
        currentValue="2.50x"
        nextLvCost={BigNum.fromNumber(50000)}
        canAfford={true}
        currency="bolt"
        onUpgrade={() => undefined}
      />
      <UpgradeCard
        title="アーマー"
        currentLv={2}
        currentValue="+200"
        nextLvCost={BigNum.fromNumber(8000)}
        canAfford={true}
        currency="alloy"
        onUpgrade={() => undefined}
      />
    </div>
  ),
};
