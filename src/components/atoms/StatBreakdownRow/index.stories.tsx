import type { Meta, StoryObj } from '@storybook/react';

import { StatBreakdownRow } from './index';

const meta: Meta<typeof StatBreakdownRow> = {
  title: 'Atoms/StatBreakdownRow',
  component: StatBreakdownRow,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof StatBreakdownRow>;

/** 攻撃力: 基礎 × 永続 × Tier差 × 武器 × ラン = 最終値 + クリ時 note */
export const Attack: Story = {
  args: {
    title: '攻撃力',
    parts: [
      { kind: 'base', display: '100' },
      { kind: 'mul', display: '1.49', label: '永続' },
      { kind: 'mul', display: '1.44', label: 'Tier差' },
      { kind: 'mul', display: '0.90', label: '武器(Thunder)' },
      { kind: 'mul', display: '1.50', label: 'ラン' },
      { kind: 'final', display: '290' },
    ],
    note: 'クリ時 ×2.00 = 580',
  },
};

/** 攻撃速度: 基礎 +加算 × ラン倍率 + note */
export const AttackSpeed: Story = {
  args: {
    title: '攻撃速度',
    parts: [
      { kind: 'base', display: '1.00×' },
      { kind: 'add', display: '+1.00', label: '永続' },
      { kind: 'mul', display: '1.30', label: 'ラン' },
      { kind: 'final', display: '2.60×' },
    ],
    cap: '永続上限 5.95×',
    note: '武器(Thunder) 1.00/秒 → 実 2.60/秒 (0.38秒/発)',
  },
};

/** クリ率: 加算のみのシンプル表示 */
export const CritRate: Story = {
  args: {
    title: 'Critical率',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: '+25%', label: '永続' },
      { kind: 'final', display: '25%' },
    ],
    cap: '上限 80%',
  },
};

/** クリ倍率: Laser 装備時に武器ボーナスが付くケース */
export const CritMultiplierWithLaser: Story = {
  args: {
    title: 'Critical倍率',
    parts: [
      { kind: 'base', display: '1.50×' },
      { kind: 'add', display: '+0.50', label: '永続' },
      { kind: 'add', display: '+0.30', label: '武器(Laser)' },
      { kind: 'final', display: '2.30×' },
    ],
  },
};

/** 最大HP: BigNum 表記 */
export const MaxHp: Story = {
  args: {
    title: '最大HP',
    parts: [
      { kind: 'base', display: '10.00A' },
      { kind: 'mul', display: '1.49', label: '永続' },
      { kind: 'mul', display: '1.50', label: 'ラン' },
      { kind: 'final', display: '22.4A' },
    ],
  },
};

/** 被ダメ軽減: 加算 + 上限 cap */
export const DamageReduction: Story = {
  args: {
    title: '被ダメ軽減',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: '+50%', label: '永続' },
      { kind: 'final', display: '50%' },
    ],
    cap: '上限 98%',
  },
};

/** 索敵距離: 加算項が文字列 (漸近成長) */
export const Range: Story = {
  args: {
    title: '索敵距離',
    parts: [
      { kind: 'base', display: '150' },
      { kind: 'add', display: '漸近成長', label: '永続' },
      { kind: 'final', display: '263px' },
    ],
    cap: '上限 450px',
  },
};

/** アクティブCD短縮: cap + note */
export const ActiveCdReduction: Story = {
  args: {
    title: 'アクティブCD短縮',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: '+25%', label: '永続' },
      { kind: 'final', display: '25%' },
    ],
    cap: '上限 50%',
    note: 'CD 60秒 × (1-25%) = 45.0秒',
  },
};

/** ハイパースケール: 1000 倍超を BigNum suffix で短縮表記する例 */
export const HypeScale: Story = {
  name: 'BigNum 倍率 (1.40A)',
  args: {
    title: '攻撃力 (高Lv想定)',
    parts: [
      { kind: 'base', display: '100' },
      { kind: 'mul', display: '1.40A', label: '永続' },
      { kind: 'mul', display: '2.00B', label: 'Tier差' },
      { kind: 'mul', display: '1.50', label: 'ラン' },
      { kind: 'final', display: '4.20D' },
    ],
    note: 'クリ時 ×2.00 = 8.40D',
  },
};
