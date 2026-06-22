import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

/**
 * battle slice にラン中の典型的な値を流し込むラッパー。
 * design ref と同程度の HUD 状態 (T5 / 通貨大 / 残敵あり) を再現する。
 */
function WithBattleSeed({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useStore.setState({
      isRunActive: true,
      currentTier: 5,
      currentWave: 12,
      machineHp: 785,
      machineMaxHp: 1085,
      screw: BigNum.fromNumber(4.28e21),
      currentWeapon: 'laser',
      activeCdSec: 0,
      isAutoActive: false,
      gameSpeed: 1,
    });
  }, []);
  return <>{children}</>;
}

const meta: Meta<typeof Page> = {
  title: 'Pages/Battle',
  component: Page,
  decorators: [withAppContext('battle')],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

/** デフォルト: T5 / W12 ボス手前の進行中ラン (design ref と同等) */
export const Default: Story = {
  render: () => (
    <WithBattleSeed>
      <Page />
    </WithBattleSeed>
  ),
};

/** ボトムシート展開: アップグレード Badge をタップした状態 (design ref と同条件) */
export const WorkshopOpen: Story = {
  name: 'ボトムシート展開',
  render: () => (
    <WithBattleSeed>
      <WorkshopAutoOpen />
    </WithBattleSeed>
  ),
};

/** マウント直後にアップグレードボタンを 1 度クリックしてシートを開いた状態を撮影する */
function WorkshopAutoOpen() {
  useEffect(() => {
    const btn = document.querySelector(
      'button[aria-label="アップグレードを開く"]'
    ) as HTMLButtonElement | null;
    btn?.click();
  }, []);
  return <Page />;
}
