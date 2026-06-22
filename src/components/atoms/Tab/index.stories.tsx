import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Tab } from './index';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';

const meta: Meta<typeof Tab> = {
  title: 'Atoms/Tab',
  component: Tab,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    active: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const ActiveTab: Story = {
  args: {
    label: 'Weapons',
    active: true,
  },
};

export const InactiveTab: Story = {
  args: {
    label: 'Patches',
    active: false,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Shield',
    active: true,
    icon: (
      <Icon
        name="shield"
        size={14}
      />
    ),
  },
};

export const InactiveWithIcon: Story = {
  args: {
    label: 'Battle',
    active: false,
    icon: (
      <Icon
        name="lightning"
        size={14}
      />
    ),
  },
};

function TabBarSimulationComponent() {
  const tabs = ['準備', 'マシン', '武器庫', 'パッチ', '設定'];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{ background: 'var(--c-bg-base)', borderBottom: '1px solid rgba(0,217,255,0.15)' }}>
      <div style={{ display: 'flex' }}>
        {tabs.map((label, i) => (
          <Tab
            key={label}
            label={label}
            active={i === activeIndex}
            onClick={() => {
              setActiveIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export const TabBarSimulation: Story = {
  render: () => <TabBarSimulationComponent />,
};

interface TabBarWithIconsEntry {
  label: string;
  icon: IconName;
}

function TabBarWithIconsComponent() {
  const tabs: TabBarWithIconsEntry[] = [
    { label: '準備', icon: 'target' },
    { label: 'マシン', icon: 'tower' },
    { label: '武器庫', icon: 'lightning' },
    { label: 'パッチ', icon: 'spark' },
    { label: '設定', icon: 'settings' },
  ];
  const [activeIndex, setActiveIndex] = useState(2);
  return (
    <div style={{ background: 'var(--c-bg-base)', borderBottom: '1px solid rgba(0,217,255,0.15)' }}>
      <div style={{ display: 'flex' }}>
        {tabs.map(({ label, icon }, i) => (
          <Tab
            key={label}
            label={label}
            active={i === activeIndex}
            onClick={() => {
              setActiveIndex(i);
            }}
            icon={
              <Icon
                name={icon}
                size={14}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

export const TabBarWithIcons: Story = {
  render: () => <TabBarWithIconsComponent />,
};

// ---------------------------------------------------------------------------
// claude design ref 準拠 Showcase
//   - underline / underline+icon / underline+badge / pill / disabled
//   - 各パターンを 1 画面で active / inactive 並べて比較
// ---------------------------------------------------------------------------

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

const showcaseRowStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  borderBottom: '1px solid var(--c-border-faint)',
  paddingBottom: 0,
};

const showcaseCaptionStyle = {
  fontFamily: 'var(--ff-body)',
  fontSize: 11,
  color: 'var(--c-text-dim)',
  marginTop: 4,
};

export const Showcase: Story = {
  name: 'Showcase — underline / +icon / +badge / pill / disabled',
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
        <h3 style={showcaseHeadingStyle}>underline (default)</h3>
        <div style={showcaseRowStyle}>
          <Tab
            label="準備"
            active
          />
          <Tab
            label="マシン"
            active={false}
          />
          <Tab
            label="武器庫"
            active={false}
          />
          <Tab
            label="パッチ"
            active={false}
          />
        </div>
        <div style={showcaseCaptionStyle}>active = cyan underline + glow / inactive = dim text</div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>underline + icon</h3>
        <div style={showcaseRowStyle}>
          <Tab
            label="準備"
            active
            icon={
              <Icon
                name="target"
                size={14}
              />
            }
          />
          <Tab
            label="武器庫"
            active={false}
            icon={
              <Icon
                name="lightning"
                size={14}
              />
            }
          />
          <Tab
            label="パッチ"
            active={false}
            icon={
              <Icon
                name="spark"
                size={14}
              />
            }
          />
          <Tab
            label="設定"
            active={false}
            icon={
              <Icon
                name="settings"
                size={14}
              />
            }
          />
        </div>
        <div style={showcaseCaptionStyle}>iconLeft スロット (Icon Atom を渡す)</div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>underline + badge</h3>
        <div style={showcaseRowStyle}>
          <Tab
            label="マシン"
            active
            badge={3}
          />
          <Tab
            label="武器庫"
            active={false}
            badge={12}
          />
          <Tab
            label="パッチ"
            active={false}
            badge="NEW"
          />
        </div>
        <div style={showcaseCaptionStyle}>数値 / 文字列いずれも可。active で配色反転</div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>pill</h3>
        <div style={{ display: 'flex', gap: 6, padding: '4px 0' }}>
          <Tab
            label="ALL"
            active
            variant="pill"
            size="sm"
          />
          <Tab
            label="HP"
            active={false}
            variant="pill"
            size="sm"
          />
          <Tab
            label="DMG"
            active={false}
            variant="pill"
            size="sm"
          />
          <Tab
            label="CD"
            active={false}
            variant="pill"
            size="sm"
          />
        </div>
        <div style={showcaseCaptionStyle}>セグメント控え向けの小さな pill 形状</div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>disabled</h3>
        <div style={showcaseRowStyle}>
          <Tab
            label="準備"
            active
          />
          <Tab
            label="マシン"
            active={false}
          />
          <Tab
            label="ロック中"
            active={false}
            disabled
            icon={
              <Icon
                name="shield"
                size={14}
              />
            }
          />
          <Tab
            label="解放後"
            active={false}
            disabled
            badge="?"
          />
        </div>
        <div style={showcaseCaptionStyle}>opacity 0.4 + not-allowed cursor</div>
      </section>
    </>
  ),
};
