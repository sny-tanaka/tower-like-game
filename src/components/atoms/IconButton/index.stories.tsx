import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './index';

import { Icon } from '@/components/atoms/Icon';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: (
      <Icon
        name="settings"
        size={18}
      />
    ),
    label: '設定',
    size: 'md',
    variant: 'default',
  },
};

export const Ghost: Story = {
  args: {
    icon: (
      <Icon
        name="close"
        size={18}
      />
    ),
    label: '閉じる',
    size: 'md',
    variant: 'ghost',
  },
};

export const SmallSize: Story = {
  args: {
    icon: (
      <Icon
        name="menu"
        size={14}
      />
    ),
    label: 'メニュー',
    size: 'sm',
    variant: 'default',
  },
};

export const LargeSize: Story = {
  args: {
    icon: (
      <Icon
        name="play"
        size={22}
      />
    ),
    label: '再生',
    size: 'lg',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    icon: (
      <Icon
        name="settings"
        size={18}
      />
    ),
    label: '設定（無効）',
    size: 'md',
    variant: 'default',
    disabled: true,
  },
};

// claude design ref と同等の網羅性ショーケース。
// variant 4 (primary / secondary / ghost / danger) × size 3 (sm / md / lg) × shape (square / round) × selected / disabled。
export const Showcase: Story = {
  render: () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    const shapes = ['square', 'round'] as const;
    const iconForVariant: Record<
      (typeof variants)[number],
      'settings' | 'check' | 'menu' | 'close'
    > = {
      primary: 'check',
      secondary: 'settings',
      ghost: 'menu',
      danger: 'close',
    };

    const labelStyle: React.CSSProperties = {
      color: 'var(--c-text-dim)',
      fontSize: '11px',
      fontFamily: 'monospace',
      minWidth: '110px',
    };

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    };

    const sectionTitle: React.CSSProperties = {
      color: 'var(--c-primary)',
      fontFamily: 'var(--ff-display)',
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginTop: '8px',
      marginBottom: '4px',
    };

    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minWidth: '560px',
        }}
      >
        {/* --- Variant × Size (square) --- */}
        <div>
          <div style={sectionTitle}>Variants × Sizes (square)</div>
          {variants.map((variant) => (
            <div
              key={variant}
              style={{ ...rowStyle, marginBottom: '8px' }}
            >
              <span style={labelStyle}>{variant}</span>
              {sizes.map((size) => (
                <IconButton
                  key={size}
                  icon={iconForVariant[variant]}
                  label={`${variant} ${size}`}
                  variant={variant}
                  size={size}
                />
              ))}
            </div>
          ))}
        </div>

        {/* --- Shape: round --- */}
        <div>
          <div style={sectionTitle}>Shape: round</div>
          {variants.map((variant) => (
            <div
              key={variant}
              style={{ ...rowStyle, marginBottom: '8px' }}
            >
              <span style={labelStyle}>{variant} (round)</span>
              {sizes.map((size) => (
                <IconButton
                  key={size}
                  icon={iconForVariant[variant]}
                  label={`${variant} ${size} round`}
                  variant={variant}
                  size={size}
                  shape="round"
                />
              ))}
            </div>
          ))}
        </div>

        {/* --- Selected (active) --- */}
        <div>
          <div style={sectionTitle}>Selected (active)</div>
          {shapes.map((shape) => (
            <div
              key={shape}
              style={{ ...rowStyle, marginBottom: '8px' }}
            >
              <span style={labelStyle}>active / {shape}</span>
              {variants.map((variant) => (
                <IconButton
                  key={variant}
                  icon={iconForVariant[variant]}
                  label={`${variant} active ${shape}`}
                  variant={variant}
                  size="md"
                  shape={shape}
                  active
                />
              ))}
            </div>
          ))}
        </div>

        {/* --- Disabled --- */}
        <div>
          <div style={sectionTitle}>Disabled</div>
          {shapes.map((shape) => (
            <div
              key={shape}
              style={{ ...rowStyle, marginBottom: '8px' }}
            >
              <span style={labelStyle}>disabled / {shape}</span>
              {variants.map((variant) => (
                <IconButton
                  key={variant}
                  icon={iconForVariant[variant]}
                  label={`${variant} disabled ${shape}`}
                  variant={variant}
                  size="md"
                  shape={shape}
                  disabled
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <IconButton
          icon={
            <Icon
              name="settings"
              size={12}
            />
          }
          label="sm default"
          size="sm"
          variant="default"
        />
        <IconButton
          icon={
            <Icon
              name="settings"
              size={16}
            />
          }
          label="md default"
          size="md"
          variant="default"
        />
        <IconButton
          icon={
            <Icon
              name="settings"
              size={20}
            />
          }
          label="lg default"
          size="lg"
          variant="default"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <IconButton
          icon={
            <Icon
              name="close"
              size={12}
            />
          }
          label="sm ghost"
          size="sm"
          variant="ghost"
        />
        <IconButton
          icon={
            <Icon
              name="close"
              size={16}
            />
          }
          label="md ghost"
          size="md"
          variant="ghost"
        />
        <IconButton
          icon={
            <Icon
              name="close"
              size={20}
            />
          }
          label="lg ghost"
          size="lg"
          variant="ghost"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <IconButton
          icon={
            <Icon
              name="settings"
              size={16}
            />
          }
          label="disabled"
          size="md"
          variant="default"
          disabled
        />
        <IconButton
          icon={
            <Icon
              name="close"
              size={16}
            />
          }
          label="ghost disabled"
          size="md"
          variant="ghost"
          disabled
        />
      </div>
    </div>
  ),
};
