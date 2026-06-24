import type { Meta, StoryObj } from '@storybook/react';

import { PatchMergeTab } from './index';

import type { PatchEntry } from '@/store/slices/patches';

const meta: Meta<typeof PatchMergeTab> = {
  title: 'Organisms/PatchMergeTab',
  component: PatchMergeTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatchMergeTab>;

/** 合成可能ありパターン */
export const WithMergeable: Story = {
  args: {
    overridePatches: new Map<string, PatchEntry>([
      ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 8 }],
      ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 5 }],
      ['instantKill#3', { name: 'instantKill', tier: 3, count: 2 }],
    ]),
  },
};

/** 合成可能なし */
export const Empty: Story = {
  args: {
    overridePatches: new Map(),
  },
};

/** 高 Tier パッチのみ所持（T5×3 → T6 に合成可能） */
export const HighTierMergeable: Story = {
  args: {
    overridePatches: new Map<string, PatchEntry>([
      ['bossKiller#5', { name: 'bossKiller', tier: 5, count: 3 }],
    ]),
  },
};

/** 各パッチが 1 個ずつ（合成不可） */
export const AllSingleCount: Story = {
  args: {
    overridePatches: new Map<string, PatchEntry>([
      ['bossKiller#5', { name: 'bossKiller', tier: 5, count: 1 }],
      ['freezeHit#3', { name: 'freezeHit', tier: 3, count: 1 }],
    ]),
  },
};
