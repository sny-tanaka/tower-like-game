import type { Meta, StoryObj } from '@storybook/react-vite';

import { CircularProgress } from './index';

const meta: Meta<typeof CircularProgress> = {
  title: 'Atoms/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['hp', 'cd', 'wave', 'primary'],
    },
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
    thickness: { control: { type: 'range', min: 1, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: 24,
    color: 'primary',
    thickness: 3,
  },
};

// --- 各 color ---

export const Colors: Story = {
  render: () => {
    const colors = ['hp', 'cd', 'wave', 'primary'] as const;
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CircularProgress
              value={65}
              max={100}
              size={40}
              color={color}
            />
            <span style={{ color: 'var(--c-text-dim)', fontSize: '11px' }}>{color}</span>
          </div>
        ))}
      </div>
    );
  },
};

// --- サイズバリエーション ---

export const Sizes: Story = {
  render: () => {
    const sizes = [16, 24, 32, 48, 64] as const;
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {sizes.map((size) => (
          <CircularProgress
            key={size}
            value={70}
            max={100}
            size={size}
            color="primary"
          />
        ))}
      </div>
    );
  },
};

// --- 0% / 50% / 100% ---

export const States: Story = {
  name: '0% / 50% / 100%',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <CircularProgress
        value={0}
        max={100}
        size={40}
        color="cd"
      />
      <CircularProgress
        value={50}
        max={100}
        size={40}
        color="cd"
      />
      <CircularProgress
        value={100}
        max={100}
        size={40}
        color="cd"
      />
    </div>
  ),
};

// --- thickness バリエーション ---

export const Thickness: Story = {
  render: () => {
    const thicknesses = [1, 2, 3, 5, 8] as const;
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {thicknesses.map((t) => (
          <div
            key={t}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CircularProgress
              value={70}
              max={100}
              size={40}
              thickness={t}
              color="primary"
            />
            <span style={{ color: 'var(--c-text-dim)', fontSize: '11px' }}>{t}px</span>
          </div>
        ))}
      </div>
    );
  },
};
