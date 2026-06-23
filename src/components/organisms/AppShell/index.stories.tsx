import type { Meta, StoryObj } from '@storybook/react';

import { AppShell } from './index';

const meta: Meta<typeof AppShell> = {
  title: 'Organisms/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const PlaceholderHeader = () => (
  <div
    style={{
      padding: '12px 16px',
      color: 'var(--c-text)',
      fontFamily: 'var(--ff-display)',
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    マシン強化
  </div>
);

const PlaceholderFooter = () => (
  <div
    style={{
      padding: '14px 16px',
      color: 'var(--c-text-dim)',
      fontSize: 11,
      textAlign: 'center',
      fontFamily: 'var(--ff-numeric)',
    }}
  >
    武器 ×4 / アクティブ / ネジ / メニュー
  </div>
);

const PlaceholderContent = () => (
  <div
    style={{
      padding: 16,
      color: 'var(--c-text-mid)',
      fontSize: 12,
      lineHeight: 1.6,
      minHeight: 320,
    }}
  >
    スクロールメインエリア
    <br />
    <br />
    ・UpgradeCard ×N
    <br />
    ・MachineUpgradeTabs
    <br />
    ・etc...
  </div>
);

/** header + main（フッターなし） */
export const Default: Story = {
  args: {
    header: <PlaceholderHeader />,
    children: <PlaceholderContent />,
  },
};

/** header + main + footer（フル構成） */
export const WithFooter: Story = {
  args: {
    header: <PlaceholderHeader />,
    footer: <PlaceholderFooter />,
    children: <PlaceholderContent />,
  },
};

/** noScroll: BattleScreen 用の固定レイアウト */
export const Battle: Story = {
  args: {
    variant: 'battle',
    noScroll: true,
    header: (
      <div
        style={{
          padding: '12px 16px',
          color: 'var(--c-text)',
          fontFamily: 'var(--ff-display)',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        バトル — Tier 5 / Wave 12
      </div>
    ),
    footer: <PlaceholderFooter />,
    children: (
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--c-text-mid)',
          fontSize: 12,
        }}
      >
        BattleField (固定キャンバス)
        <br />
        マシン + 敵 + 攻撃エフェクト
      </div>
    ),
  },
};

/** main のみ（header / footer なし） */
export const MainOnly: Story = {
  args: {
    children: <PlaceholderContent />,
  },
};
