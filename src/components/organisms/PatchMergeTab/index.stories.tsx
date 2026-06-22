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

/** Tier5 のみ所持（上限なので合成不可） */
export const OnlyMaxTier: Story = {
  args: {
    overridePatches: new Map<string, PatchEntry>([
      ['bossKiller#5', { name: 'bossKiller', tier: 5, count: 3 }],
    ]),
  },
};
