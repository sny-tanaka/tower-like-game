import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { ArmoryScreen } from './index';
import type { ArmoryScreenProps } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

/**
 * 通貨残高と weaponLv を store にシードする小さなラッパー。
 * PageHeader の通貨表示や強化タブのコスト判定を有効にするため、
 * story 起動時に値を流し込む。
 */
function WithArmorySeed({
  bolt = 1_234_567_000,
  alloy = 245,
  weaponLv = 38,
  children,
}: {
  bolt?: number;
  alloy?: number;
  weaponLv?: number;
  children: React.ReactNode;
}) {
  useEffect(() => {
    useStore.setState({
      bolt: BigNum.fromNumber(bolt),
      alloy: BigNum.fromNumber(alloy),
      weaponLv,
    });
  }, [bolt, alloy, weaponLv]);
  return <>{children}</>;
}

const meta: Meta<ArmoryScreenProps> = {
  title: 'Pages/ArmoryScreen',
  component: ArmoryScreen,
  decorators: [withAppContext('armory')],
};

export default meta;
type Story = StoryObj<ArmoryScreenProps>;

/** 詳細タブ — 武器一覧を確認 */
export const Details: Story = {
  render: () => (
    <WithArmorySeed>
      <ArmoryScreen initialTab="details" />
    </WithArmorySeed>
  ),
};

/** 強化タブ — 共通強化 Lv を表示 */
export const Upgrade: Story = {
  render: () => (
    <WithArmorySeed>
      <ArmoryScreen initialTab="upgrade" />
    </WithArmorySeed>
  ),
};
