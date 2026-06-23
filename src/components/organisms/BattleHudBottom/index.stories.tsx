import type { Meta, StoryObj } from '@storybook/react';

import { BattleHudBottom } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const meta: Meta<typeof BattleHudBottom> = {
  title: 'Organisms/BattleHudBottom',
  component: BattleHudBottom,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 412,
          margin: '0 auto',
          background: 'var(--c-bg-deep)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    screw: BigNum.fromNumber(12345),
    earnedBolt: BigNum.fromNumber(0),
    equippedWeapon: 'laser',
    weaponCds: { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    activeCd: 0,
    activeMax: 300,
    isAutoActive: false,
    onSwitchWeapon: () => {},
    onActivate: () => {},
    onToggleAuto: () => {},
    isPaused: false,
    onTogglePause: () => {},
    onOpenScreenSaver: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BattleHudBottom>;

// ---------------------------------------------------------------------------
// デフォルト（通常状態）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '通常状態 — アクティブ可能',
};

// ---------------------------------------------------------------------------
// アクティブ CD 中
// ---------------------------------------------------------------------------

export const ActiveOnCd: Story = {
  name: 'アクティブ CD 中',
  args: {
    activeCd: 180,
    activeMax: 300,
  },
};

// ---------------------------------------------------------------------------
// 自動モード
// ---------------------------------------------------------------------------

export const AutoMode: Story = {
  name: '自動モード ON',
  args: {
    isAutoActive: true,
  },
};

// ---------------------------------------------------------------------------
// 武器切替 CD 中
// ---------------------------------------------------------------------------

export const WeaponSwapCd: Story = {
  name: '武器切替 CD 中',
  args: {
    equippedWeapon: 'cannon',
    weaponCds: { laser: 40, cannon: 100, thunder: 55, cutter: 20 },
  },
};

// ---------------------------------------------------------------------------
// 一時停止中
// ---------------------------------------------------------------------------

export const Paused: Story = {
  name: '一時停止中',
  args: {
    isPaused: true,
  },
};

// ---------------------------------------------------------------------------
// ネジ大量
// ---------------------------------------------------------------------------

export const RichScrew: Story = {
  name: 'ネジ大量',
  args: {
    screw: BigNum.fromNumber(9999999),
  },
};

// ---------------------------------------------------------------------------
// Cutter 装備
// ---------------------------------------------------------------------------

export const CutterEquipped: Story = {
  name: 'Cutter 装備',
  args: {
    equippedWeapon: 'cutter',
  },
};

// ---------------------------------------------------------------------------
// ボトムシート展開 (workshop open)
// ---------------------------------------------------------------------------

export const WorkshopOpen: Story = {
  name: 'ボトムシート展開 (ワークショップ表示)',
  args: {
    isWorkshopOpen: true,
  },
};
