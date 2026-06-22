import type { Meta, StoryObj } from '@storybook/react';

import { TitleHeader } from './index';

const meta: Meta<typeof TitleHeader> = {
  title: 'Organisms/TitleHeader',
  component: TitleHeader,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleHeader>;

/** フルセット (subtitle + tagline + version) */
export const Full: Story = {
  args: {
    subtitle: 'TOWER DEFENSE × INFINITE TIER',
    version: 'v0.1.0',
    tagline: 'マシン + 武器 + パッチで攻略する放置寄りラン',
  },
};

/** 最小（タイトルのみ）*/
export const Minimal: Story = {
  args: {},
};

/** バージョンのみ */
export const VersionOnly: Story = {
  args: {
    version: 'v0.2.4-rc.1',
  },
};

/** カスタムタイトル */
export const CustomTitle: Story = {
  args: {
    title: 'TOWER LIKE GAME CUSTOM',
    subtitle: 'カスタムサブタイトル',
    version: 'v1.0.0',
  },
};
