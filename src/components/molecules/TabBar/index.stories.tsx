import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TabBar } from './index';

import { Icon } from '@/components/atoms/Icon';

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

const tabs = [
  { key: 'weapon', label: 'ウェポン' },
  { key: 'patch', label: 'パッチ' },
  { key: 'machine', label: 'マシン' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

function ControlledTabBar() {
  const [active, setActive] = useState<TabKey>('weapon');
  return (
    <TabBar
      tabs={tabs}
      active={active}
      onChange={setActive}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledTabBar />,
};

function ControlledWithIcons() {
  const tabsWithIcons = [
    {
      key: 'weapon',
      label: 'ウェポン',
      icon: (
        <Icon
          name="laser"
          size={14}
        />
      ),
    },
    {
      key: 'patch',
      label: 'パッチ',
      icon: (
        <Icon
          name="bolt"
          size={14}
        />
      ),
    },
    {
      key: 'machine',
      label: 'マシン',
      icon: (
        <Icon
          name="tower"
          size={14}
        />
      ),
    },
  ] as const;

  type Key = (typeof tabsWithIcons)[number]['key'];
  const [active, setActive] = useState<Key>('weapon');

  return (
    <TabBar
      tabs={tabsWithIcons}
      active={active}
      onChange={setActive}
    />
  );
}

export const WithIcons: Story = {
  render: () => <ControlledWithIcons />,
};

function FullWidthTabBar() {
  const [active, setActive] = useState<TabKey>('weapon');
  return (
    <div style={{ width: 360 }}>
      <TabBar
        tabs={tabs}
        active={active}
        onChange={setActive}
        fullWidth
      />
    </div>
  );
}

export const FullWidth: Story = {
  render: () => <FullWidthTabBar />,
};

function SmallTabBar() {
  const [active, setActive] = useState<TabKey>('patch');
  return (
    <TabBar
      tabs={tabs}
      active={active}
      onChange={setActive}
      size="sm"
    />
  );
}

export const Small: Story = {
  render: () => <SmallTabBar />,
};
