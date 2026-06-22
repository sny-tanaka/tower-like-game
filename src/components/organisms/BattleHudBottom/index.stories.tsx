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
    equippedWeapon: 'laser',
    weaponCds: { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    activeCd: 0,
    activeMax: 300,
    isAutoActive: false,
    onSwitchWeapon: () => {},
    onActivate: () => {},
    onToggleAuto: () => {},
    gameSpeed: 1,
    onSpeedChange: () => {},
    isPaused: false,
    onTogglePause: () => {},
    onOpenMenu: () => {},
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
// 速度 2x
// ---------------------------------------------------------------------------

export const Speed2x: Story = {
  name: '速度 2x',
  args: {
    gameSpeed: 2,
  },
};

// ---------------------------------------------------------------------------
// 速度 3x + ネジ大量
// ---------------------------------------------------------------------------

export const Speed3xRichScrew: Story = {
  name: '速度 3x + ネジ大量',
  args: {
    gameSpeed: 3,
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
