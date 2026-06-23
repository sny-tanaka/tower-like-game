import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';

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
      options: ['sm', 'md', 'lg', 'xl'],
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

// ---------------------------------------------------------------------------
// showcase 用 共通スタイル (claude design ref と揃える)
// ---------------------------------------------------------------------------

const showcaseRoot: CSSProperties = {
  maxWidth: '660px',
  display: 'grid',
  gap: '22px',
  padding: '24px',
  color: 'var(--c-text)',
  fontFamily: 'var(--ff-body)',
};

const sectionStyle: CSSProperties = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: '18px 20px',
};

const sectionHeading: CSSProperties = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 14px',
};

const cellStyle: CSSProperties = {
  background: 'var(--c-bg-base)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-s)',
  padding: '14px 12px',
  display: 'grid',
  gap: '8px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '76px',
};

const cellLabel: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '9.5px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
};

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '90px 1fr 160px',
  gap: '14px',
  padding: '12px 0',
  alignItems: 'center',
  borderTop: '1px dashed var(--c-border-faint)',
};

const rowNameStyle: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '10.5px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
};

const rowMetaStyle: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '10px',
  color: 'var(--c-text-dim)',
  textAlign: 'right',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={sectionStyle}>
      <h2 style={sectionHeading}>{title}</h2>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// 既存 Story (互換維持)
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    currency: 'screw',
    value: 1234,
    size: 'md',
  },
};

export const AllCurrenciesAndSizes: Story = {
  name: '3 通貨 × 4 サイズ',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const currencies = ['screw', 'bolt', 'alloy'] as const;
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    return (
      <div style={showcaseRoot}>
        <Section title="currency × size">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sizes.map((size) => (
              <div
                key={size}
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '6px 4px',
                }}
              >
                <span
                  style={{
                    color: 'var(--c-text-dim)',
                    fontSize: '11px',
                    fontFamily: 'var(--ff-numeric)',
                    width: '28px',
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
        </Section>
      </div>
    );
  },
};

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

// ---------------------------------------------------------------------------
// 追加 showcase Story (claude design ref 準拠)
// ---------------------------------------------------------------------------

// --- ユースケース別 (currency × size の意味付け) ---

export const CurrencyBySizeRows: Story = {
  name: 'currency × size (ユースケース別)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="currency × size">
        <div style={{ ...rowStyle, borderTop: 0, paddingTop: '4px' }}>
          <div style={rowNameStyle}>screw · sm</div>
          <CurrencyAmount
            currency="screw"
            value={4280}
            size="sm"
          />
          <div style={rowMetaStyle}>ラン中 · インライン</div>
        </div>
        <div style={rowStyle}>
          <div style={rowNameStyle}>screw · md</div>
          <CurrencyAmount
            currency="screw"
            value={4280}
            size="md"
          />
          <div style={rowMetaStyle}>カード</div>
        </div>
        <div style={rowStyle}>
          <div style={rowNameStyle}>bolt · md</div>
          <CurrencyAmount
            currency="bolt"
            value={1234567}
            size="md"
          />
          <div style={rowMetaStyle}>永続強化 HUD</div>
        </div>
        <div style={rowStyle}>
          <div style={rowNameStyle}>alloy · md</div>
          <CurrencyAmount
            currency="alloy"
            value={845}
            size="md"
          />
          <div style={rowMetaStyle}>武器強化</div>
        </div>
        <div style={rowStyle}>
          <div style={rowNameStyle}>bolt · lg</div>
          <CurrencyAmount
            currency="bolt"
            value={BigNum.fromNumber(1.23e9)}
            size="lg"
          />
          <div style={rowMetaStyle}>Result ダイアログ</div>
        </div>
        <div style={rowStyle}>
          <div style={rowNameStyle}>alloy · xl</div>
          <CurrencyAmount
            currency="alloy"
            value={BigNum.fromNumber(42)}
            size="xl"
          />
          <div style={rowMetaStyle}>強調表示</div>
        </div>
      </Section>
    </div>
  ),
};

// --- delta + / - (3 通貨 × 2) ---

export const DeltaGrid: Story = {
  name: 'delta (+/-) × 3 通貨',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="delta (+/-)">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          <div style={cellStyle}>
            <CurrencyAmount
              currency="screw"
              value={120}
              delta="+"
              size="md"
            />
            <div style={cellLabel}>screw 獲得</div>
          </div>
          <div style={cellStyle}>
            <CurrencyAmount
              currency="bolt"
              value={45}
              delta="+"
              size="md"
            />
            <div style={cellLabel}>bolt 獲得</div>
          </div>
          <div style={cellStyle}>
            <CurrencyAmount
              currency="alloy"
              value={2}
              delta="+"
              size="md"
            />
            <div style={cellLabel}>alloy ドロップ</div>
          </div>
          <div style={cellStyle}>
            <CurrencyAmount
              currency="screw"
              value={500}
              delta="-"
              size="md"
            />
            <div style={cellLabel}>強化コスト</div>
          </div>
          <div style={cellStyle}>
            <CurrencyAmount
              currency="bolt"
              value={1200}
              delta="-"
              size="md"
            />
            <div style={cellLabel}>恒久強化</div>
          </div>
          <div style={cellStyle}>
            <CurrencyAmount
              currency="alloy"
              value={5}
              delta="-"
              size="md"
            />
            <div style={cellLabel}>武器強化</div>
          </div>
        </div>
      </Section>
    </div>
  ),
};

// --- 全 props showcase (claude design ref 準拠 一括) ---

export const FullShowcase: Story = {
  name: '全 props showcase',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="showLabel">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </Section>

      <Section title="subtle (購入不可 / 条件未達)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </Section>

      <Section title="align=end (右配置 / 数値先行)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </Section>
    </div>
  ),
};
