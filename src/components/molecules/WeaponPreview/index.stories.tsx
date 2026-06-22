import type { Meta, StoryObj } from '@storybook/react';

import { WeaponPreview } from './index';

const laserStats = [
  { label: '攻撃力', value: '120' },
  { label: '攻撃速度', value: '2.5/s' },
  { label: '貫通数', value: '3' },
  { label: '射程', value: '180px' },
];

const cannonStats = [
  { label: '攻撃力', value: '350' },
  { label: '攻撃速度', value: '0.8/s' },
  { label: '爆発範囲', value: '60px' },
  { label: '射程', value: '150px' },
];

const thunderStats = [
  { label: '攻撃力', value: '80' },
  { label: '連鎖数', value: '5' },
  { label: '連鎖距離', value: '80px' },
  { label: '射程', value: '200px' },
];

const cutterStats = [
  { label: '攻撃力', value: '200' },
  { label: '攻撃速度', value: '1.5/s' },
  { label: '旋回半径', value: '100px' },
  { label: '持続時間', value: '2.0s' },
];

const meta: Meta<typeof WeaponPreview> = {
  title: 'Molecules/WeaponPreview',
  component: WeaponPreview,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    weapon: {
      control: 'select',
      options: ['laser', 'cannon', 'thunder', 'cutter'],
    },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponPreview>;

export const Laser: Story = {
  args: {
    weapon: 'laser',
    name: 'Laser',
    stats: laserStats,
    activeName: 'Mega Beam',
    activeDesc: '前方直線状の全敵に大ダメージを与える貫通レーザーを3秒間照射。',
    selected: false,
  },
};

export const LaserSelected: Story = {
  args: {
    weapon: 'laser',
    name: 'Laser',
    stats: laserStats,
    activeName: 'Mega Beam',
    activeDesc: '前方直線状の全敵に大ダメージを与える貫通レーザーを3秒間照射。',
    selected: true,
  },
};

export const Cannon: Story = {
  args: {
    weapon: 'cannon',
    name: 'Cannon',
    stats: cannonStats,
    activeName: 'Hyper Shell',
    activeDesc: '超大型砲弾を発射。着弾点に広範囲の爆発を引き起こす。',
    selected: false,
  },
};

export const Thunder: Story = {
  args: {
    weapon: 'thunder',
    name: 'Thunder',
    stats: thunderStats,
    activeName: 'Storm Chain',
    activeDesc: '周囲の最大10体に雷が連鎖し、連鎖するごとにダメージが増加する。',
    selected: false,
  },
};

export const Cutter: Story = {
  args: {
    weapon: 'cutter',
    name: 'Cutter',
    stats: cutterStats,
    activeName: 'Blade Vortex',
    activeDesc: '周囲を高速回転する刃で敵を切り裂くフィールドを展開する。',
    selected: false,
  },
};

export const AllWeapons: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 200px)',
        gap: '12px',
      }}
    >
      <WeaponPreview
        weapon="laser"
        name="Laser"
        stats={laserStats}
        activeName="Mega Beam"
        activeDesc="前方直線状の全敵に大ダメージを与える貫通レーザーを3秒間照射。"
        selected={true}
      />
      <WeaponPreview
        weapon="cannon"
        name="Cannon"
        stats={cannonStats}
        activeName="Hyper Shell"
        activeDesc="超大型砲弾を発射。着弾点に広範囲の爆発を引き起こす。"
      />
      <WeaponPreview
        weapon="thunder"
        name="Thunder"
        stats={thunderStats}
        activeName="Storm Chain"
        activeDesc="周囲の最大10体に雷が連鎖し、連鎖するごとにダメージが増加する。"
      />
      <WeaponPreview
        weapon="cutter"
        name="Cutter"
        stats={cutterStats}
        activeName="Blade Vortex"
        activeDesc="周囲を高速回転する刃で敵を切り裂くフィールドを展開する。"
      />
    </div>
  ),
};
