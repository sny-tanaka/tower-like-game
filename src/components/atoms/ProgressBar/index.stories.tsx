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
      options: ['hp', 'hp-low', 'cd', 'wave', 'shield', 'primary', 'secondary'],
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
