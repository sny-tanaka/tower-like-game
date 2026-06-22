import type { Meta, StoryObj } from '@storybook/react';

import { UpgradeCard } from './index';

const meta: Meta<typeof UpgradeCard> = {
  title: 'Molecules/UpgradeCard',
  component: UpgradeCard,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof UpgradeCard>;

// ---------------------------------------------------------------------------
// マシン強化 — bolt / primary
// ---------------------------------------------------------------------------

export const MachineHpBolt: Story = {
  name: 'Machine — HP (bolt)',
  args: {
    title: '最大 HP',
    iconName: 'heart',
    currentLabel: 'Lv 4',
    before: 1200,
    after: 1320,
    currency: 'bolt',
    accent: 'primary',
    options: [
      { amount: '+1', cost: 80 },
      { amount: '+5', cost: 380 },
      { amount: 'MAX', cost: 720, disabled: true },
    ],
  },
};

export const MachineDamageBolt: Story = {
  name: 'Machine — Damage (bolt)',
  args: {
    title: 'ダメージ倍率',
    iconName: 'laser',
    currentLabel: 'Lv 12',
    before: 1.4,
    after: 1.5,
    beforeSuffix: '×',
    currency: 'bolt',
    accent: 'primary',
    options: [
      { amount: '+1', cost: 420 },
      { amount: '+5', cost: 2_000 },
      { amount: 'MAX', cost: 5_400 },
    ],
  },
};

// ---------------------------------------------------------------------------
// 武器強化 — alloy / secondary
// ---------------------------------------------------------------------------

export const WeaponLevelAlloy: Story = {
  name: 'Weapon — Lv (alloy)',
  args: {
    title: '武器 Lv',
    iconName: 'cutter',
    iconColor: 'var(--c-secondary)',
    currentLabel: 'Lv 38',
    before: 28000,
    after: 32500,
    currency: 'alloy',
    accent: 'secondary',
    options: [
      { amount: '+1', cost: 12 },
      { amount: '+5', cost: 55 },
      { amount: 'MAX', cost: 240 },
    ],
  },
};

// ---------------------------------------------------------------------------
// ラン中 WS — screw / warning
// ---------------------------------------------------------------------------

export const RunFireRateScrew: Story = {
  name: 'Run WS — FireRate (screw)',
  args: {
    title: '連射速度',
    iconName: 'thunder',
    iconColor: 'var(--c-warning)',
    currentLabel: 'Lv 3',
    before: 1.15,
    after: 1.2,
    beforeSuffix: '×',
    currency: 'screw',
    accent: 'warning',
    options: [
      { amount: '+1', cost: 24 },
      { amount: '+5', cost: 130 },
      { amount: 'MAX', cost: 410 },
    ],
  },
};

export const RunAllDisabled: Story = {
  name: 'Run WS — all disabled',
  args: {
    title: 'クリ率',
    iconName: 'spark',
    iconColor: 'var(--c-warning)',
    currentLabel: 'Lv 7',
    before: 18,
    after: 20,
    beforeSuffix: '%',
    currency: 'screw',
    accent: 'warning',
    options: [
      { amount: '+1', cost: 88, disabled: true },
      { amount: '+5', cost: 460, disabled: true },
      { amount: 'MAX', cost: 1200, disabled: true },
    ],
  },
};

// ---------------------------------------------------------------------------
// 説明文付き
// ---------------------------------------------------------------------------

export const WithDescription: Story = {
  name: 'With description (1 col)',
  args: {
    title: 'シールド貫通',
    description: '敵シールドを無効化、全攻撃が直接 HP に通る',
    iconName: 'shield',
    currentLabel: 'Lv 1',
    before: 20,
    after: 25,
    beforeSuffix: '%',
    currency: 'bolt',
    accent: 'primary',
    options: [
      { amount: '+1', cost: 60 },
      { amount: '+5', cost: 290 },
      { amount: 'MAX', cost: 700 },
    ],
  },
};

// ---------------------------------------------------------------------------
// 上限到達
// ---------------------------------------------------------------------------

export const Maxed: Story = {
  name: 'Maxed',
  args: {
    title: 'シールド貫通',
    iconName: 'shield',
    currentLabel: 'Lv 20',
    before: 100,
    beforeSuffix: '%',
    currency: 'bolt',
    accent: 'primary',
    maxed: true,
  },
};

// ---------------------------------------------------------------------------
// 2 列グリッド（デザインリファレンスのレイアウト確認用）
// ---------------------------------------------------------------------------

export const GridTwoCol: Story = {
  name: '2 col grid (マシン強化)',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 16,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        maxWidth: 412,
      }}
    >
      <UpgradeCard
        title="最大 HP"
        iconName="heart"
        currentLabel="Lv 4"
        before={1200}
        after={1320}
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 80 },
          { amount: '+5', cost: 380 },
          { amount: 'MAX', cost: 720, disabled: true },
        ]}
      />
      <UpgradeCard
        title="ダメージ倍率"
        iconName="laser"
        currentLabel="Lv 12"
        before={1.4}
        after={1.5}
        beforeSuffix="×"
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 420 },
          { amount: '+5', cost: 2_000 },
          { amount: 'MAX', cost: 5_400 },
        ]}
      />
      <UpgradeCard
        title="シールド"
        iconName="shield"
        currentLabel="Lv 2"
        before={120}
        after={180}
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 50 },
          { amount: '+5', cost: 240 },
          { amount: 'MAX', cost: 480 },
        ]}
      />
      <UpgradeCard
        title="リジェネ率"
        iconName="spark"
        currentLabel="Lv 7"
        before={4.5}
        after={5.0}
        beforeSuffix="/s"
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 110 },
          { amount: '+5', cost: 500, disabled: true },
          { amount: 'MAX', cost: 1_200, disabled: true },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 高 Tier 大きい数値
// ---------------------------------------------------------------------------

export const HighTierLargeNumbers: Story = {
  name: 'High Tier — large numbers',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 16,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        maxWidth: 412,
      }}
    >
      <UpgradeCard
        title="最大 HP"
        iconName="heart"
        currentLabel="Lv 42"
        before={1.23e8}
        after={1.505e8}
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 1.205e8 },
          { amount: '+5', cost: 5.5e8 },
          { amount: 'MAX', cost: 1.505e9 },
        ]}
      />
      <UpgradeCard
        title="ダメージ倍率"
        iconName="laser"
        currentLabel="Lv 88"
        before={150.5e6}
        after={150.5e9}
        currency="bolt"
        accent="primary"
        options={[
          { amount: '+1', cost: 1.505e8 },
          { amount: '+5', cost: 7.2e8 },
          { amount: 'MAX', cost: 1.505e9, disabled: true },
        ]}
      />
    </div>
  ),
};
