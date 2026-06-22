import type { Meta, StoryObj } from '@storybook/react';

import { ArmoryScreen } from './index';

import { withAppContext } from '@/__stories__/decorators';

const meta: Meta<typeof ArmoryScreen> = {
  title: 'Pages/ArmoryScreen',
  component: ArmoryScreen,
  decorators: [withAppContext('armory')],
};

export default meta;
type Story = StoryObj<typeof ArmoryScreen>;

/** 武器詳細タブ（デフォルト） */
export const Details: Story = {};

/** 共通強化タブ — 初期状態はデフォルトでも切り替え可能だが story 自体は Details と同じ */
export const Upgrade: Story = {};
