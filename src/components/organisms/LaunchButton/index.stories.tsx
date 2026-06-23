import type { Meta, StoryObj } from '@storybook/react';

import { LaunchButton } from './index';

const meta: Meta<typeof LaunchButton> = {
  title: 'Organisms/LaunchButton',
  component: LaunchButton,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LaunchButton>;

/** 標準: Tier 7 / Laser / パッチ 4 */
export const Default: Story = {
  args: {
    tier: 7,
    weaponKind: 'laser',
    patchCount: 4,
    sticky: false,
    onLaunch: () => alert('出撃！'),
  },
};

/** 高 Tier + Cutter + 満載 */
export const HighTierCutter: Story = {
  args: {
    tier: 12,
    weaponKind: 'cutter',
    patchCount: 6,
    sticky: false,
  },
};

/** Disabled */
export const Disabled: Story = {
  args: {
    tier: 1,
    weaponKind: 'cannon',
    patchCount: 0,
    sticky: false,
    disabled: true,
  },
};

/** Tier・武器未指定（最小） */
export const Minimal: Story = {
  args: {
    sticky: false,
    onLaunch: () => alert('出撃！'),
  },
};

/** Sticky（フッター固定デモ） */
export const StickyFooter: Story = {
  args: {
    tier: 5,
    weaponKind: 'thunder',
    patchCount: 3,
    sticky: true,
    onLaunch: () => alert('出撃！'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 412,
          margin: '0 auto',
          height: 300,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ height: 400, padding: 16, color: 'var(--c-text-dim)', fontSize: 12 }}>
          スクロールコンテンツ（ここに出撃準備タブが入る）
        </div>
        <Story />
      </div>
    ),
  ],
};
