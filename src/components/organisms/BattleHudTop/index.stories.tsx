import type { Meta, StoryObj } from '@storybook/react';

import { BattleHudTop } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const meta: Meta<typeof BattleHudTop> = {
  title: 'Organisms/BattleHudTop',
  component: BattleHudTop,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto', background: 'var(--c-bg-deep)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BattleHudTop>;

// ---------------------------------------------------------------------------
// 通常ウェーブ（HP 満タン）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '通常ウェーブ — HP 満タン',
  args: {
    hpCurrent: BigNum.fromNumber(1000),
    hpMax: BigNum.fromNumber(1000),
    tier: 3,
    wave: 5,
    totalWaves: 30,
    secondsRemaining: 18,
    secondsTotal: 26,
    isBossWave: false,
    enemiesRemaining: 12,
  },
};

// ---------------------------------------------------------------------------
// HP 低下（30% 未満）
// ---------------------------------------------------------------------------

export const LowHp: Story = {
  name: 'HP 低下 (20%)',
  args: {
    hpCurrent: BigNum.fromNumber(200),
    hpMax: BigNum.fromNumber(1000),
    tier: 5,
    wave: 12,
    totalWaves: 30,
    secondsRemaining: 8,
    secondsTotal: 26,
    isBossWave: false,
    enemiesRemaining: 6,
  },
};

// ---------------------------------------------------------------------------
// ボスウェーブ
// ---------------------------------------------------------------------------

export const BossWave: Story = {
  name: 'ボスウェーブ',
  args: {
    hpCurrent: BigNum.fromNumber(850),
    hpMax: BigNum.fromNumber(1000),
    tier: 7,
    wave: 30,
    totalWaves: 30,
    secondsRemaining: 3,
    secondsTotal: 26,
    isBossWave: true,
    nextMilestone: { wave: 30, kind: 'boss' },
    enemiesRemaining: 1,
  },
};

// ---------------------------------------------------------------------------
// エリートウェーブ
// ---------------------------------------------------------------------------

export const EliteWave: Story = {
  name: 'エリートウェーブ近接',
  args: {
    hpCurrent: BigNum.fromNumber(650),
    hpMax: BigNum.fromNumber(1000),
    tier: 4,
    wave: 9,
    totalWaves: 30,
    secondsRemaining: 20,
    secondsTotal: 26,
    isBossWave: false,
    nextMilestone: { wave: 10, kind: 'elite' },
    enemiesRemaining: 9,
  },
};

// ---------------------------------------------------------------------------
// 高 Tier（大きい数値）
// ---------------------------------------------------------------------------

export const HighTier: Story = {
  name: '高 Tier — 大きな数値',
  args: {
    hpCurrent: BigNum.fromNumber(123456789),
    hpMax: BigNum.fromNumber(200000000),
    tier: 10,
    wave: 22,
    totalWaves: 30,
    secondsRemaining: 14,
    secondsTotal: 26,
    isBossWave: false,
    nextMilestone: { wave: 30, kind: 'tier-up' },
    enemiesRemaining: 22,
  },
};
