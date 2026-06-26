import type { Meta, StoryObj } from '@storybook/react';

import { PatchEquipTab } from './index';

import type { PatchName } from '@/data/schema';
import type { PatchEntry } from '@/store/slices/patches';

const meta: Meta<typeof PatchEquipTab> = {
  title: 'Organisms/PatchEquipTab',
  component: PatchEquipTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatchEquipTab>;

const samplePatches = new Map<string, PatchEntry>([
  ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 4 }],
  ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 2 }],
  ['instantKill#3', { name: 'instantKill', tier: 3, count: 1 }],
  ['burnHit#4', { name: 'burnHit', tier: 4, count: 1 }],
]);

const sampleEquipped = new Map<number, { name: PatchName; tier: number }>([
  [0, { name: 'damageImmune', tier: 1 }],
  [1, { name: 'freezeHit', tier: 2 }],
]);

/** 2スロット解放、2枚装着 */
export const Default: Story = {
  args: {
    overridePatches: samplePatches,
    overrideEquipped: sampleEquipped,
    overridePatchSlotsLv: 3,
  },
};

/** スロット全解放・全空き */
export const AllUnlocked: Story = {
  args: {
    overridePatches: samplePatches,
    overrideEquipped: new Map(),
    overridePatchSlotsLv: 5,
  },
};

/** 初期スロット（Lv0 = 1スロット解放）*/
export const InitialSlot: Story = {
  args: {
    overridePatches: samplePatches,
    overrideEquipped: new Map(),
    overridePatchSlotsLv: 0,
  },
};

/** 全スロット満杯 */
export const FullEquipped: Story = {
  args: {
    overridePatches: samplePatches,
    overrideEquipped: new Map<number, { name: PatchName; tier: number }>([
      [0, { name: 'damageImmune', tier: 1 }],
      [1, { name: 'freezeHit', tier: 2 }],
      [2, { name: 'instantKill', tier: 3 }],
      [3, { name: 'burnHit', tier: 4 }],
      [4, { name: 'killHeal', tier: 1 }],
      [5, { name: 'boltCast', tier: 2 }],
    ]),
    overridePatchSlotsLv: 5,
  },
};
