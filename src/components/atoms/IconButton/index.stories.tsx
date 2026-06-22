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
