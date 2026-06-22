import type { Meta, StoryObj } from '@storybook/react';

import { WeaponSlotIcon } from './index';

const meta: Meta<typeof WeaponSlotIcon> = {
  title: 'Molecules/WeaponSlotIcon',
  component: WeaponSlotIcon,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    weapon: {
      control: 'select',
      options: ['laser', 'cannon', 'thunder', 'cutter'],
    },
    equipped: { control: 'boolean' },
    cdRemaining: {
      control: { type: 'range', min: 0, max: 3, step: 1 },
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponSlotIcon>;

export const Default: Story = {
  args: {
    weapon: 'laser',
    equipped: false,
  },
};

export const Equipped: Story = {
  args: {
    weapon: 'laser',
    equipped: true,
  },
};

export const WithCooldown: Story = {
  args: {
    weapon: 'cannon',
    equipped: false,
    cdRemaining: 2,
  },
};

export const EquippedWithCooldown: Story = {
  args: {
    weapon: 'thunder',
    equipped: true,
    cdRemaining: 1,
  },
};

export const Disabled: Story = {
  args: {
    weapon: 'cutter',
    equipped: false,
    disabled: true,
  },
};

export const AllWeapons: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '24px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <WeaponSlotIcon
        weapon="laser"
        equipped={true}
      />
      <WeaponSlotIcon
        weapon="cannon"
        equipped={false}
      />
      <WeaponSlotIcon
        weapon="thunder"
        equipped={false}
        cdRemaining={2}
      />
      <WeaponSlotIcon
        weapon="cutter"
        equipped={false}
      />
    </div>
  ),
};

export const CooldownStates: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '24px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        cdRemaining={3}
      />
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        cdRemaining={2}
      />
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        cdRemaining={1}
      />
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        cdRemaining={0}
      />
    </div>
  ),
};
