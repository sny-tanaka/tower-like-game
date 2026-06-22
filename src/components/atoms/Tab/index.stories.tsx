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
