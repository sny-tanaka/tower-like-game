import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { WeaponLevelUpgradeTab } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

const meta: Meta<typeof WeaponLevelUpgradeTab> = {
  title: 'Organisms/WeaponLevelUpgradeTab',
  component: WeaponLevelUpgradeTab,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponLevelUpgradeTab>;

/** store に weaponLv と alloy を注入するラッパー */
function WithWeaponState({
  weaponLv,
  alloy,
  children,
}: {
  weaponLv: number;
  alloy: number;
  children: React.ReactNode;
}) {
  useEffect(() => {
    useStore.setState({ weaponLv, alloy: BigNum.fromNumber(alloy) });
  }, [weaponLv, alloy]);
  return <>{children}</>;
}

/** Lv 0 — 初期状態 / alloy 余裕あり */
export const Level0Affordable: Story = {
  render: () => (
    <WithWeaponState
      weaponLv={0}
      alloy={500}
    >
      <WeaponLevelUpgradeTab />
    </WithWeaponState>
  ),
};

/** Lv 10 — 序盤 */
export const Level10: Story = {
  render: () => (
    <WithWeaponState
      weaponLv={10}
      alloy={2000}
    >
      <WeaponLevelUpgradeTab />
    </WithWeaponState>
  ),
};

/** Lv 38 — デザインサンプルに近い値 */
export const Level38: Story = {
  render: () => (
    <WithWeaponState
      weaponLv={38}
      alloy={245}
    >
      <WeaponLevelUpgradeTab />
    </WithWeaponState>
  ),
};

/** alloy 不足 — すべてのボタンが disabled */
export const InsufficientAlloy: Story = {
  render: () => (
    <WithWeaponState
      weaponLv={20}
      alloy={0}
    >
      <WeaponLevelUpgradeTab />
    </WithWeaponState>
  ),
};

/** Lv 50 — 中盤 */
export const Level50: Story = {
  render: () => (
    <WithWeaponState
      weaponLv={50}
      alloy={500000}
    >
      <WeaponLevelUpgradeTab />
    </WithWeaponState>
  ),
};
