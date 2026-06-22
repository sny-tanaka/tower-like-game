import type { Meta, StoryObj } from '@storybook/react-vite';

import { CurrencyAmount } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const meta: Meta<typeof CurrencyAmount> = {
  title: 'Atoms/CurrencyAmount',
  component: CurrencyAmount,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currency: {
      control: { type: 'select' },
      options: ['screw', 'bolt', 'alloy'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    delta: {
      control: { type: 'select' },
      options: [undefined, '+', '-'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
    showLabel: { control: 'boolean' },
    subtle: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CurrencyAmount>;

export const Default: Story = {
  args: {
    currency: 'screw',
    value: 1234,
    size: 'md',
  },
};

// --- 3 通貨 × 3 サイズ ---

export const AllCurrenciesAndSizes: Story = {
  name: '3 通貨 × 3 サイズ',
  render: () => {
    const currencies = ['screw', 'bolt', 'alloy'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sizes.map((size) => (
          <div
            key={size}
            style={{ display: 'flex', gap: '24px', alignItems: 'center' }}
          >
            <span
              style={{
                color: 'var(--c-text-dim)',
                fontSize: '11px',
                width: '24px',
              }}
            >
              {size}
            </span>
            {currencies.map((currency) => (
              <CurrencyAmount
                key={currency}
                currency={currency}
                value={BigNum.fromNumber(1_234_567)}
                size={size}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// --- delta あり / なし ---

export const WithDelta: Story = {
  name: 'delta あり / なし',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <CurrencyAmount
        currency="screw"
        value={500}
        size="md"
      />
      <CurrencyAmount
        currency="bolt"
        value={1_000_000}
        size="md"
        delta="+"
      />
      <CurrencyAmount
        currency="alloy"
        value={BigNum.fromNumber(9_999_999)}
        size="md"
        delta="-"
      />
    </div>
  ),
};

// --- 大きな数値 ---

export const LargeValues: Story = {
  name: '大きな数値',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <CurrencyAmount
        currency="screw"
        value={BigNum.fromString('1' + '0'.repeat(30))}
        size="lg"
      />
      <CurrencyAmount
        currency="bolt"
        value={BigNum.fromString('9' + '9'.repeat(9))}
        size="lg"
        delta="+"
      />
    </div>
  ),
};

// --- showLabel ---

export const WithShowLabel: Story = {
  name: 'showLabel（通貨名表示）',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <CurrencyAmount
        currency="screw"
        value={4280}
        size="md"
        showLabel
      />
      <CurrencyAmount
        currency="bolt"
        value={1234567}
        size="md"
        showLabel
      />
      <CurrencyAmount
        currency="alloy"
        value={12}
        size="md"
        showLabel
      />
    </div>
  ),
};

// --- subtle ---

export const Subtle: Story = {
  name: 'subtle（購入不可・条件未達）',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <CurrencyAmount
        currency="screw"
        value={9999}
        size="md"
        subtle
      />
      <CurrencyAmount
        currency="bolt"
        value={42}
        size="md"
        subtle
      />
      <CurrencyAmount
        currency="alloy"
        value={1}
        size="md"
        subtle
      />
    </div>
  ),
};

// --- align=end ---

export const AlignEnd: Story = {
  name: 'align=end（数値先行）',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <CurrencyAmount
        currency="screw"
        value={4280}
        size="md"
        align="end"
      />
      <CurrencyAmount
        currency="bolt"
        value={1234567}
        size="md"
        align="end"
      />
      <CurrencyAmount
        currency="alloy"
        value={12}
        size="md"
        align="end"
      />
    </div>
  ),
};
