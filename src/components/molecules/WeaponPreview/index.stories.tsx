import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { WeaponPreview } from './index';

const WEAPON_DATA = {
  laser: {
    name: 'LASER',
    description: '高速直進ビーム。貫通でき、連発で削り続ける。',
    stats: [
      { label: 'DAMAGE', value: 120, accent: 'primary' as const },
      { label: '貫通数', value: 3 },
      { label: '射程', value: 580, suffix: 'm' },
      { label: '連射', value: 6.2, suffix: '/s' },
    ],
  },
  cannon: {
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぎ払う重火力。',
    stats: [
      { label: 'DAMAGE', value: 480, accent: 'primary' as const },
      { label: '爆発半径', value: 120, suffix: 'm' },
      { label: '射程', value: 520, suffix: 'm' },
      { label: '連射', value: 0.9, suffix: '/s' },
    ],
  },
  thunder: {
    name: 'THUNDER',
    description: '隣接敵に連鎖する電撃。シールドに有効。',
    stats: [
      { label: 'DAMAGE', value: 84, accent: 'primary' as const },
      { label: '連鎖数', value: 5 },
      { label: '射程', value: 420, suffix: 'm' },
      { label: '連射', value: 3.4, suffix: '/s' },
    ],
  },
  cutter: {
    name: 'CUTTER',
    description: '旋回斬撃。マシン周囲を高速で回りつつ攻撃。',
    stats: [
      { label: 'DAMAGE', value: 62, accent: 'primary' as const },
      { label: '旋回半径', value: 180, suffix: 'm' },
      { label: '同時ヒット', value: 4 },
      { label: '連射', value: 8.0, suffix: '/s' },
    ],
  },
} as const;

const meta: Meta<typeof WeaponPreview> = {
  title: 'Molecules/WeaponPreview',
  component: WeaponPreview,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  argTypes: {
    weapon: { control: 'select', options: ['laser', 'cannon', 'thunder', 'cutter'] },
    layout: { control: 'select', options: ['tall', 'wide'] },
    active: { control: 'boolean' },
    locked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponPreview>;

export const TallActive: Story = {
  name: 'tall — active (laser)',
  args: {
    weapon: 'laser',
    name: WEAPON_DATA.laser.name,
    description: WEAPON_DATA.laser.description,
    stats: [...WEAPON_DATA.laser.stats],
    layout: 'tall',
    active: true,
  },
};

export const TallIdle: Story = {
  name: 'tall — idle (cannon)',
  args: {
    weapon: 'cannon',
    name: WEAPON_DATA.cannon.name,
    description: WEAPON_DATA.cannon.description,
    stats: [...WEAPON_DATA.cannon.stats],
    layout: 'tall',
    active: false,
  },
};

export const WideActive: Story = {
  name: 'wide — active',
  args: {
    weapon: 'laser',
    name: WEAPON_DATA.laser.name,
    description: WEAPON_DATA.laser.description,
    stats: [...WEAPON_DATA.laser.stats],
    layout: 'wide',
    active: true,
  },
};

export const WideIdle: Story = {
  name: 'wide — idle',
  args: {
    weapon: 'cannon',
    name: WEAPON_DATA.cannon.name,
    description: WEAPON_DATA.cannon.description,
    stats: [...WEAPON_DATA.cannon.stats],
    layout: 'wide',
    active: false,
  },
};

export const TallInteractive: Story = {
  name: 'tall — 出撃準備 武器選択 (interactive)',
  render: () => {
    function Demo() {
      const [active, setActive] = useState<string>('laser');
      return (
        <div
          style={{
            background: 'var(--c-bg-deep)',
            padding: 16,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            maxWidth: 412,
          }}
        >
          {(['laser', 'cannon', 'thunder', 'cutter'] as const).map((k) => (
            <WeaponPreview
              key={k}
              weapon={k}
              name={WEAPON_DATA[k].name}
              description={WEAPON_DATA[k].description}
              stats={[...WEAPON_DATA[k].stats]}
              layout="tall"
              active={active === k}
              onClick={() => setActive(k)}
            />
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};

export const WideList: Story = {
  name: 'wide — 武器庫詳細タブ',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 16,
        display: 'grid',
        gap: 10,
        maxWidth: 412,
      }}
    >
      <WeaponPreview
        weapon="laser"
        name={WEAPON_DATA.laser.name}
        description={WEAPON_DATA.laser.description}
        stats={[...WEAPON_DATA.laser.stats]}
        layout="wide"
        active
      />
      <WeaponPreview
        weapon="cannon"
        name={WEAPON_DATA.cannon.name}
        description={WEAPON_DATA.cannon.description}
        stats={[...WEAPON_DATA.cannon.stats]}
        layout="wide"
      />
      <WeaponPreview
        weapon="thunder"
        name={WEAPON_DATA.thunder.name}
        description={WEAPON_DATA.thunder.description}
        stats={[...WEAPON_DATA.thunder.stats]}
        layout="wide"
      />
      <WeaponPreview
        weapon="cutter"
        name={WEAPON_DATA.cutter.name}
        description={WEAPON_DATA.cutter.description}
        stats={[...WEAPON_DATA.cutter.stats]}
        layout="wide"
      />
    </div>
  ),
};
