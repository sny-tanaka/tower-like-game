import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PatchInventoryTab } from './index';

import type { PatchName } from '@/data/schema';
import type { PatchEntry } from '@/store/slices/patches';

const meta: Meta<typeof PatchInventoryTab> = {
  title: 'Organisms/PatchInventoryTab',
  component: PatchInventoryTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatchInventoryTab>;

const samplePatches = new Map<string, PatchEntry>([
  ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 8 }],
  ['damageImmune#2', { name: 'damageImmune', tier: 2, count: 3 }],
  ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 5 }],
  ['instantKill#3', { name: 'instantKill', tier: 3, count: 2 }],
  ['burnHit#4', { name: 'burnHit', tier: 4, count: 1 }],
  ['bossKiller#5', { name: 'bossKiller', tier: 5, count: 1 }],
]);

function DefaultStory() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <PatchInventoryTab
      overridePatches={samplePatches}
      overrideEquipped={new Map()}
      selectedId={sel}
      onSelect={setSel}
    />
  );
}

function WithEquippedStory() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <PatchInventoryTab
      overridePatches={samplePatches}
      overrideEquipped={
        new Map<number, { name: PatchName; tier: number }>([
          [0, { name: 'damageImmune', tier: 1 }],
          [1, { name: 'freezeHit', tier: 2 }],
        ])
      }
      selectedId={sel}
      onSelect={setSel}
    />
  );
}

/** 通常表示（選択可） */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** 装着済みパッチがロック表示 */
export const WithEquipped: Story = {
  render: () => <WithEquippedStory />,
};

/** 在庫なし */
export const Empty: Story = {
  args: {
    overridePatches: new Map(),
    overrideEquipped: new Map(),
  },
};
