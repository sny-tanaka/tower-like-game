import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { WeaponDetailsTab } from './index';

import { useStore } from '@/store/index';

const meta: Meta<typeof WeaponDetailsTab> = {
  title: 'Organisms/WeaponDetailsTab',
  component: WeaponDetailsTab,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponDetailsTab>;

/** store に weaponLv を注入するラッパー */
function WithWeaponLv({ weaponLv, children }: { weaponLv: number; children: React.ReactNode }) {
  useEffect(() => {
    useStore.setState({ weaponLv });
  }, [weaponLv]);
  return <>{children}</>;
}

/** Lv 0 — 初期状態 */
export const Level0: Story = {
  render: () => (
    <WithWeaponLv weaponLv={0}>
      <WeaponDetailsTab />
    </WithWeaponLv>
  ),
};

/** Lv 10 — 序盤強化 */
export const Level10: Story = {
  render: () => (
    <WithWeaponLv weaponLv={10}>
      <WeaponDetailsTab />
    </WithWeaponLv>
  ),
};

/** Lv 50 — 中盤 */
export const Level50: Story = {
  render: () => (
    <WithWeaponLv weaponLv={50}>
      <WeaponDetailsTab />
    </WithWeaponLv>
  ),
};

/** Lv 100 — 高レベル */
export const Level100: Story = {
  render: () => (
    <WithWeaponLv weaponLv={100}>
      <WeaponDetailsTab />
    </WithWeaponLv>
  ),
};
