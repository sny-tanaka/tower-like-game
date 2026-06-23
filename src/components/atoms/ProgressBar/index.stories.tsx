import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['hp', 'hp-low', 'cd', 'wave', 'shield', 'xp', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showLabel: { control: 'boolean' },
    glow: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    color: 'primary',
    size: 'md',
    showLabel: false,
    glow: false,
  },
};

// --- 0% / 50% / 100% ---

export const States: Story = {
  name: '0% / 50% / 100%',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ProgressBar
        value={0}
        max={100}
        color="hp"
        size="md"
      />
      <ProgressBar
        value={50}
        max={100}
        color="hp"
        size="md"
      />
      <ProgressBar
        value={100}
        max={100}
        color="hp"
        size="md"
      />
    </div>
  ),
};

// --- color バリエーション ---

export const Colors: Story = {
  render: () => {
    const colors = ['hp', 'hp-low', 'cd', 'wave', 'shield', 'primary', 'secondary'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span
              style={{
                color: 'var(--c-text-dim)',
                fontSize: '11px',
                width: '70px',
              }}
            >
              {color}
            </span>
            <div style={{ flex: 1 }}>
              <ProgressBar
                value={65}
                max={100}
                color={color}
                size="md"
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// --- サイズ比較 ---

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ProgressBar
        value={70}
        max={100}
        size="sm"
        color="primary"
      />
      <ProgressBar
        value={70}
        max={100}
        size="md"
        color="primary"
      />
      <ProgressBar
        value={70}
        max={100}
        size="lg"
        color="primary"
      />
    </div>
  ),
};

// --- showLabel ---

export const WithLabel: Story = {
  name: 'showLabel=true (lg 推奨)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ProgressBar
        value={42}
        max={100}
        size="lg"
        color="hp"
        showLabel
      />
      <ProgressBar
        value={3}
        max={10}
        size="lg"
        color="cd"
        showLabel
      />
    </div>
  ),
};

// --- glow ---

export const WithGlow: Story = {
  name: 'glow=true',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ProgressBar
        value={80}
        max={100}
        color="hp"
        size="md"
        glow
      />
      <ProgressBar
        value={30}
        max={100}
        color="hp-low"
        size="md"
        glow
      />
      <ProgressBar
        value={50}
        max={100}
        color="wave"
        size="md"
        glow
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// claude design ref 準拠 Showcase
//   - HP / HP-low / Shield / CD / Wave / XP の 6 系統
//   - size sm / md / lg を 1 画面で比較
//   - label / trailingLabel (showLabel + label) スロット
// ---------------------------------------------------------------------------

const showcaseRowStyle = {
  display: 'grid',
  gridTemplateColumns: '80px 1fr 60px',
  alignItems: 'center',
  gap: 12,
} as const;

const showcaseLabelStyle = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-text-dim)',
} as const;

const showcaseTrailingStyle = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--c-text-mid)',
  letterSpacing: 'var(--ls-num)',
  textAlign: 'right' as const,
};

const showcaseSectionStyle = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: 14,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 10,
};

const showcaseHeadingStyle = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase' as const,
  color: 'var(--c-primary)',
  margin: '0 0 4px',
};

interface ShowcaseRowProps {
  label: string;
  color: 'hp' | 'hp-low' | 'shield' | 'cd' | 'wave' | 'xp';
  value: number;
  max: number;
  trailing: string;
  variant?: 'solid' | 'neon';
}

function ShowcaseRow({ label, color, value, max, trailing, variant = 'solid' }: ShowcaseRowProps) {
  return (
    <div style={showcaseRowStyle}>
      <span style={showcaseLabelStyle}>{label}</span>
      <ProgressBar
        value={value}
        max={max}
        color={color}
        size="md"
        variant={variant}
      />
      <span style={showcaseTrailingStyle}>{trailing}</span>
    </div>
  );
}

export const Showcase: Story = {
  name: 'Showcase — HP / HP-low / Shield / CD / Wave / XP × sm/md/lg',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 412,
          padding: 16,
          background: 'var(--c-bg-deep)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>color presets — md</h3>
        <ShowcaseRow
          label="hp"
          color="hp"
          value={68}
          max={100}
          trailing="68 / 100"
        />
        <ShowcaseRow
          label="hp-low"
          color="hp-low"
          value={18}
          max={100}
          trailing="18 / 100"
        />
        <ShowcaseRow
          label="shield"
          color="shield"
          value={50}
          max={100}
          trailing="50 / 100"
          variant="neon"
        />
        <ShowcaseRow
          label="cd"
          color="cd"
          value={42}
          max={100}
          trailing="2.1s"
          variant="neon"
        />
        <ShowcaseRow
          label="wave"
          color="wave"
          value={72}
          max={100}
          trailing="WAVE 12"
          variant="neon"
        />
        <ShowcaseRow
          label="xp"
          color="xp"
          value={250}
          max={400}
          trailing="LV 7"
        />
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>sizes — sm / md / lg</h3>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>sm</span>
          <ProgressBar
            value={70}
            max={100}
            color="hp"
            size="sm"
          />
          <span style={showcaseTrailingStyle}>70%</span>
        </div>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>md</span>
          <ProgressBar
            value={70}
            max={100}
            color="hp"
            size="md"
          />
          <span style={showcaseTrailingStyle}>70%</span>
        </div>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>lg</span>
          <ProgressBar
            value={70}
            max={100}
            color="hp"
            size="lg"
            showLabel
            label="70 / 100"
          />
          <span style={showcaseTrailingStyle}>inline</span>
        </div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>label / trailingLabel slots</h3>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>inline</span>
          <ProgressBar
            value={42}
            max={100}
            color="hp"
            size="lg"
            showLabel
          />
          <span style={showcaseTrailingStyle}>42%</span>
        </div>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>custom</span>
          <ProgressBar
            value={3}
            max={10}
            color="cd"
            size="lg"
            variant="neon"
            showLabel
            label="CD 3 / 10"
          />
          <span style={showcaseTrailingStyle}>1.2s</span>
        </div>
        <div style={showcaseRowStyle}>
          <span style={showcaseLabelStyle}>reverse</span>
          <ProgressBar
            value={32}
            max={100}
            color="wave"
            size="md"
            variant="neon"
            reverse
          />
          <span style={showcaseTrailingStyle}>残 32%</span>
        </div>
      </section>
    </>
  ),
};
