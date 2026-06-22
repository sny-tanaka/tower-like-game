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

// --- Showcase: claude design ref 同等の網羅性 ---
// 15 桁の scale セル (raw / A / B / ... / AA / AZ) + accent 7 色 + size 4 + prefix/suffix
export const Showcase: Story = {
  render: () => {
    // 任意桁の BigNum を生成: digits[i] = 1000^i のブロック。
    // 最上位 (index = i) に 1 を置けば 10^(3i) を表現できる。
    // e.g. [0, 1] => 1000 = "1.00A", [0, 0, 1] => 10^6 = "1.00B"
    const bnAtScale = (e: number): BigNum => {
      if (e <= 0) return BigNum.fromNumber(0);
      const digits = new Array<number>(e).fill(0);
      digits.push(1);
      return BigNum.fromJSON(digits);
    };

    // raw / A / B / ... / Y / Z / AA / AB / AY / AZ をカバー (15 セル)
    const scaleCells: Array<{ label: string; value: BigNum | number }> = [
      { label: 'raw 42', value: 42 },
      { label: 'raw 987', value: 987 },
      { label: 'A (1.00A)', value: bnAtScale(1) },
      { label: 'B (1.00B)', value: bnAtScale(2) },
      { label: 'C', value: bnAtScale(3) },
      { label: 'E', value: bnAtScale(5) },
      { label: 'H', value: bnAtScale(8) },
      { label: 'K', value: bnAtScale(11) },
      { label: 'O', value: bnAtScale(15) },
      { label: 'S', value: bnAtScale(19) },
      { label: 'Y', value: bnAtScale(25) },
      { label: 'Z (purple)', value: bnAtScale(26) },
      { label: 'AA (wrap)', value: bnAtScale(27) },
      { label: 'AB', value: bnAtScale(28) },
      { label: 'AZ', value: bnAtScale(52) },
    ];

    const accents: Array<{
      key: 'scale' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'dim';
    }> = [
      { key: 'scale' },
      { key: 'primary' },
      { key: 'secondary' },
      { key: 'danger' },
      { key: 'success' },
      { key: 'warning' },
      { key: 'dim' },
    ];

    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    const sectionTitle: React.CSSProperties = {
      color: 'var(--c-primary)',
      fontFamily: 'var(--ff-display)',
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginTop: '12px',
      marginBottom: '8px',
    };

    const labelStyle: React.CSSProperties = {
      color: 'var(--c-text-dim)',
      fontSize: '11px',
      fontFamily: 'monospace',
      minWidth: '120px',
    };

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '4px 0',
    };

    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '20px',
          minWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* --- Scale gradient (15 cells: raw → A → Z → AA → AZ) --- */}
        <div style={sectionTitle}>Scale gradient (15 cells)</div>
        {scaleCells.map(({ label, value }) => (
          <div
            key={label}
            style={rowStyle}
          >
            <span style={labelStyle}>{label}</span>
            <NumericDisplay
              value={value}
              size="lg"
              accentColor="scale"
              glow
            />
          </div>
        ))}

        {/* --- Accent colors (7 種) --- */}
        <div style={sectionTitle}>Accent colors (7)</div>
        {accents.map(({ key }) => (
          <div
            key={key}
            style={rowStyle}
          >
            <span style={labelStyle}>{key}</span>
            <NumericDisplay
              value={BigNum.fromNumber(1_234_567)}
              size="md"
              accentColor={key}
              glow
            />
            <NumericDisplay
              value={BigNum.fromNumber(1_234_567)}
              size="md"
              accentColor={key}
            />
          </div>
        ))}

        {/* --- Sizes (sm / md / lg / xl) --- */}
        <div style={sectionTitle}>Sizes (sm / md / lg / xl)</div>
        {sizes.map((s) => (
          <div
            key={s}
            style={rowStyle}
          >
            <span style={labelStyle}>{s}</span>
            <NumericDisplay
              value={BigNum.fromNumber(1_234_567)}
              size={s}
              accentColor="scale"
              glow
            />
          </div>
        ))}

        {/* --- prefix / suffix --- */}
        <div style={sectionTitle}>Prefix / Suffix</div>
        <div style={rowStyle}>
          <span style={labelStyle}>{'prefix "×"'}</span>
          <NumericDisplay
            value={BigNum.fromNumber(2_500)}
            size="lg"
            accentColor="primary"
            glow
            prefix="×"
          />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>{'suffix " Wave"'}</span>
          <NumericDisplay
            value={42}
            size="lg"
            accentColor="success"
            glow
            suffix=" Wave"
          />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>{'prefix "+" / suffix "%"'}</span>
          <NumericDisplay
            value={120}
            size="lg"
            accentColor="warning"
            glow
            prefix="+"
            suffix="%"
          />
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>{'prefix "−"'}</span>
          <NumericDisplay
            value={BigNum.fromNumber(7_500)}
            size="lg"
            accentColor="danger"
            glow
            prefix="−"
          />
        </div>
      </div>
    );
  },
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
