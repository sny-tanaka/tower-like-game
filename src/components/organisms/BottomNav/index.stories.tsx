import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BottomNav } from './index';
import type { BottomNavProps } from './index';

const meta: Meta<typeof BottomNav> = {
  title: 'Organisms/BottomNav',
  component: BottomNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

/** インタラクティブ用の wrapper コンポーネント */
function InteractiveWrapper() {
  const [active, setActive] = useState<BottomNavProps['active']>('preparation');
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(10, 15, 28, 0.9)',
        borderTop: '1px solid var(--c-border-faint)',
      }}
    >
      <BottomNav
        active={active}
        onChange={(s) => setActive(s as BottomNavProps['active'])}
      />
    </div>
  );
}

/** インタラクティブ: クリックでタブが切り替わる */
export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
};

/** 準備タブがアクティブ */
export const ActivePreparation: Story = {
  args: {
    active: 'preparation',
    onChange: () => {},
  },
};

/** マシンタブがアクティブ */
export const ActiveMachine: Story = {
  args: {
    active: 'machine',
    onChange: () => {},
  },
};

/** 武器庫タブがアクティブ + バッジ */
export const ActiveArmoryWithBadge: Story = {
  args: {
    active: 'armory',
    onChange: () => {},
    badges: { armory: 3, patches: '!' },
  },
};

/** 設定タブがアクティブ */
export const ActiveSettings: Story = {
  args: {
    active: 'settings',
    onChange: () => {},
  },
};
