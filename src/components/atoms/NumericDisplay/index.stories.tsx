import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumericDisplay } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const meta: Meta<typeof NumericDisplay> = {
  title: 'Atoms/NumericDisplay',
  component: NumericDisplay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    accentColor: {
      control: { type: 'select' },
      options: ['scale', 'primary', 'secondary', 'danger', 'success'],
    },
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NumericDisplay>;

// --- 基本 ---

export const Default: Story = {
  args: {
    value: 42,
    size: 'md',
    accentColor: 'scale',
    glow: false,
  },
};

export const WithGlow: Story = {
  args: {
    value: BigNum.fromNumber(1_500_000),
    size: 'lg',
    accentColor: 'scale',
    glow: true,
  },
};

// --- サイズ比較 ---

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <NumericDisplay
        value={1234}
        size="sm"
      />
      <NumericDisplay
        value={1234}
        size="md"
      />
      <NumericDisplay
        value={1234}
        size="lg"
      />
    </div>
  ),
};

// --- scale 動的色グラデーション（< 1000 → A → Z） ---

export const ScaleGradient: Story = {
  name: 'Scale gradient (< 1000 → A → Z)',
  render: () => {
    const values: Array<{ label: string; value: BigNum | number }> = [
      { label: '< 1000 (raw)', value: 999 },
      { label: 'A (1.00A)', value: BigNum.fromNumber(1_000) },
      { label: 'B (1.23B)', value: BigNum.fromNumber(1_234_567) },
      { label: 'C (1.00C)', value: BigNum.fromNumber(1_000_000_000) },
      { label: 'D', value: BigNum.fromNumber(1_000_000_000_000) },
      { label: 'E', value: BigNum.fromNumber(1_000_000_000_000_000) },
      { label: 'J (mid)', value: BigNum.fromString('1' + '0'.repeat(30)) },
      { label: 'Z (purple)', value: BigNum.fromString('1' + '0'.repeat(78)) },
      { label: 'AA (wrap)', value: BigNum.fromString('1' + '0'.repeat(81)) },
      { label: 'BB', value: BigNum.fromString('1' + '0'.repeat(156)) },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '16px',
        }}
      >
        {values.map(({ label, value }) => (
          <div
            key={label}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <span
              style={{
                color: 'var(--c-text-dim)',
                fontSize: '11px',
                width: '100px',
                fontFamily: 'monospace',
              }}
            >
              {label}
            </span>
            <NumericDisplay
              value={value}
              size="lg"
              accentColor="scale"
              glow
            />
          </div>
        ))}
      </div>
    );
  },
};

// --- accentColor バリエーション ---

export const AccentColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(['scale', 'primary', 'secondary', 'danger', 'success'] as const).map((color) => (
        <div
          key={color}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <span
            style={{
              color: 'var(--c-text-dim)',
              fontSize: '11px',
              width: '80px',
            }}
          >
            {color}
          </span>
          <NumericDisplay
            value={BigNum.fromNumber(1_234_567)}
            size="md"
            accentColor={color}
            glow
          />
        </div>
      ))}
    </div>
  ),
};

// --- number を渡しても動作する ---

export const NumberInput: Story = {
  name: 'number prop (auto BigNum.fromNumber)',
  args: {
    value: 123456789,
    size: 'md',
    accentColor: 'scale',
    glow: true,
  },
};
