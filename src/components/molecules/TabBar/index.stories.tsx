import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TabBar } from './index';

const meta: Meta<typeof TabBar> = {
  title: 'Molecules/TabBar',
  component: TabBar,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

// ---------------------------------------------------------------------------
// マシン強化 5 タブ
// ---------------------------------------------------------------------------
export const MachineUpgrade: Story = {
  name: 'マシン強化 5 タブ (underline / fullWidth)',
  render: () => {
    function Demo() {
      const [value, setValue] = useState('defense');
      return (
        <div style={{ maxWidth: 412 }}>
          <TabBar
            tabs={[
              { key: 'defense', label: '防御' },
              { key: 'attack', label: '攻撃' },
              { key: 'active', label: 'アクティブ' },
              { key: 'economy', label: '経済' },
              { key: 'slot', label: 'スロット' },
            ]}
            value={value}
            onChange={setValue}
            fullWidth
          />
          <div style={{ fontSize: 11, color: 'var(--c-text-dim)', marginTop: 8 }}>
            selected: {value}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

// ---------------------------------------------------------------------------
// アイコン付き
// ---------------------------------------------------------------------------
export const WithIcons: Story = {
  name: '武器庫 (underline + icon + fullWidth)',
  render: () => {
    function Demo() {
      const [value, setValue] = useState('laser');
      return (
        <div style={{ maxWidth: 412 }}>
          <TabBar
            tabs={[
              { key: 'laser', label: 'LASER', iconName: 'laser' },
              { key: 'cannon', label: 'CANNON', iconName: 'cannon' },
              { key: 'thunder', label: 'THUNDER', iconName: 'thunder' },
              { key: 'cutter', label: 'CUTTER', iconName: 'cutter' },
            ]}
            value={value}
            onChange={setValue}
            fullWidth
          />
          <div style={{ fontSize: 11, color: 'var(--c-text-dim)', marginTop: 8 }}>
            selected: {value}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

// ---------------------------------------------------------------------------
// バッジ
// ---------------------------------------------------------------------------
export const WithBadge: Story = {
  name: 'パッチ庫 (badge)',
  render: () => {
    function Demo() {
      const [value, setValue] = useState('equipped');
      return (
        <div style={{ maxWidth: 412 }}>
          <TabBar
            tabs={[
              { key: 'equipped', label: '装着', badge: '6/8' },
              { key: 'inventory', label: '所持', badge: 42 },
              { key: 'merge', label: '合成', badge: '!' },
            ]}
            value={value}
            onChange={setValue}
            fullWidth
          />
        </div>
      );
    }
    return <Demo />;
  },
};

// ---------------------------------------------------------------------------
// pill (速度選択)
// ---------------------------------------------------------------------------
export const PillSpeed: Story = {
  name: '速度 (pill / center)',
  render: () => {
    function Demo() {
      const [value, setValue] = useState('x2');
      return (
        <TabBar
          variant="pill"
          size="sm"
          tabs={[
            { key: 'x1', label: '×1' },
            { key: 'x2', label: '×2' },
            { key: 'x4', label: '×4' },
            { key: 'x8', label: '×8' },
          ]}
          value={value}
          onChange={setValue}
          align="center"
        />
      );
    }
    return <Demo />;
  },
};

// ---------------------------------------------------------------------------
// disabled item
// ---------------------------------------------------------------------------
export const DisabledItem: Story = {
  name: '設定 (disabled item)',
  render: () => {
    function Demo() {
      const [value, setValue] = useState('sound');
      return (
        <div style={{ maxWidth: 412 }}>
          <TabBar
            tabs={[
              { key: 'sound', label: 'サウンド' },
              { key: 'game', label: 'ゲーム' },
              { key: 'data', label: 'データ' },
              { key: 'about', label: 'ABOUT', disabled: true },
            ]}
            value={value}
            onChange={setValue}
            fullWidth
          />
          <div style={{ fontSize: 11, color: 'var(--c-text-dim)', marginTop: 8 }}>
            selected: {value}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
