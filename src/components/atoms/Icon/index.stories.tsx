import type { Meta, StoryObj } from '@storybook/react';

import type { IconName } from './index';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'close',
        'menu',
        'settings',
        'tower',
        'shield',
        'heart',
        'flame',
        'ice',
        'lightning',
        'skull',
        'spark',
        'target',
        'play',
        'pause',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'chevron-down',
        'check',
        'plus',
        'minus',
        'info',
        'arrow-up',
        'screw',
        'bolt',
        'alloy',
        'laser',
        'cannon',
        'thunder',
        'cutter',
      ],
    },
    size: { control: { type: 'range', min: 12, max: 64, step: 4 } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'tower',
    size: 32,
    color: '#00d9ff',
  },
};

export const UIIcons: Story = {
  render: () => {
    const uiIcons: IconName[] = [
      'close',
      'menu',
      'settings',
      'play',
      'pause',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'chevron-down',
      'check',
      'plus',
      'minus',
      'info',
      'arrow-up',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {uiIcons.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
          >
            <Icon
              name={name}
              size={24}
              color="var(--c-primary)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const GameIcons: Story = {
  render: () => {
    const gameIcons: IconName[] = [
      'tower',
      'shield',
      'heart',
      'flame',
      'ice',
      'lightning',
      'skull',
      'spark',
      'target',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {gameIcons.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
          >
            <Icon
              name={name}
              size={28}
              color="var(--c-secondary)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const CurrencyAndWeaponPlaceholders: Story = {
  render: () => {
    const placeholderIcons: IconName[] = [
      'screw',
      'bolt',
      'alloy',
      'laser',
      'cannon',
      'thunder',
      'cutter',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {placeholderIcons.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
          >
            <Icon
              name={name}
              size={28}
              color="var(--c-warning)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-end',
      }}
    >
      {([12, 16, 20, 24, 32, 40, 48] as const).map((s) => (
        <div
          key={s}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
        >
          <Icon
            name="tower"
            size={s}
            color="var(--c-primary)"
          />
          <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
};
