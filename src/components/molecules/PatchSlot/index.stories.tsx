import type { Meta, StoryObj } from '@storybook/react';

import { PatchSlot } from './index';

const meta: Meta<typeof PatchSlot> = {
  title: 'Molecules/PatchSlot',
  component: PatchSlot,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PatchSlot>;

export const Empty: Story = {
  args: { slotIndex: 1 },
};

export const Locked: Story = {
  args: { slotIndex: 8, locked: true },
};

export const FilledTier1: Story = {
  name: 'filled — Tier 1',
  args: {
    patch: {
      patchId: 'p1',
      name: '装甲補強',
      iconName: 'shield',
      tier: 1,
      trigger: '常時',
      effect: '被ダメ -5%',
      count: 4,
    },
  },
};

export const FilledTier3: Story = {
  name: 'filled — Tier 3',
  args: {
    patch: {
      patchId: 'p3',
      name: '瞬殺装甲',
      iconName: 'skull',
      tier: 3,
      trigger: 'HP 25% ↓',
      effect: '敵を即死',
      count: 1,
    },
  },
};

export const FilledTier5: Story = {
  name: 'filled — Tier 5',
  args: {
    patch: {
      patchId: 'p5',
      name: '覚醒コア',
      iconName: 'spark',
      tier: 5,
      trigger: 'Wave 開始',
      effect: '全攻撃 +50%',
      count: 1,
    },
  },
};

export const EightSlots: Story = {
  name: '装着画面 8 スロット (6 装着 + 1 空き + 1 ロック)',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        maxWidth: 412,
      }}
    >
      <PatchSlot
        patch={{
          patchId: 'p1',
          name: '装甲補強',
          iconName: 'shield',
          tier: 1,
          trigger: '常時',
          effect: '被ダメ -5%',
          count: 4,
        }}
      />
      <PatchSlot
        patch={{
          patchId: 'p2',
          name: '氷結トリガー',
          iconName: 'ice',
          tier: 2,
          trigger: 'クリ発動時',
          effect: '2 秒凍結',
          count: 2,
        }}
      />
      <PatchSlot
        patch={{
          patchId: 'p3',
          name: '瞬殺装甲',
          iconName: 'skull',
          tier: 3,
          trigger: 'HP 25% ↓',
          effect: '敵を即死',
          count: 1,
        }}
      />
      <PatchSlot
        patch={{
          patchId: 'p4',
          name: '連鎖燃焼',
          iconName: 'flame',
          tier: 4,
          trigger: '貫通時',
          effect: '周囲焼夷',
          count: 1,
        }}
      />
      <PatchSlot
        patch={{
          patchId: 'p5',
          name: '覚醒コア',
          iconName: 'spark',
          tier: 5,
          trigger: 'Wave 開始',
          effect: '全攻撃 +50%',
          count: 1,
        }}
      />
      <PatchSlot
        patch={{
          patchId: 'p6',
          name: 'シールド貫通',
          iconName: 'lightning',
          tier: 3,
          trigger: '常時',
          effect: 'シールド無効',
          count: 1,
        }}
      />
      <PatchSlot slotIndex={7} />
      <PatchSlot
        locked
        slotIndex={8}
      />
    </div>
  ),
};

export const Sizes: Story = {
  name: 'size sm / md / lg',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 300,
      }}
    >
      <PatchSlot
        size="sm"
        patch={{
          patchId: 'pa',
          name: '瞬殺装甲',
          iconName: 'skull',
          tier: 3,
          trigger: 'HP25%↓',
          effect: '即死',
          count: 1,
        }}
      />
      <PatchSlot
        size="md"
        patch={{
          patchId: 'pb',
          name: '瞬殺装甲',
          iconName: 'skull',
          tier: 3,
          trigger: 'HP25%↓',
          effect: '即死',
          count: 1,
        }}
      />
      <PatchSlot
        size="lg"
        patch={{
          patchId: 'pc',
          name: '瞬殺装甲',
          iconName: 'skull',
          tier: 3,
          trigger: 'HP25%↓',
          effect: '即死',
          count: 1,
        }}
      />
    </div>
  ),
};
