import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PatchCard } from './index';

const meta: Meta<typeof PatchCard> = {
  title: 'Molecules/PatchCard',
  component: PatchCard,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatchCard>;

export const Default: Story = {
  args: {
    patchId: 'p1',
    name: '装甲補強',
    iconName: 'shield',
    tier: 1,
    count: 4,
    trigger: '常時',
    effect: '被ダメ -5%',
  },
};

export const Selected: Story = {
  args: {
    patchId: 'p3',
    name: '瞬殺装甲',
    iconName: 'skull',
    tier: 3,
    count: 1,
    trigger: 'HP 25% ↓',
    effect: '敵を即死',
    selected: true,
  },
};

export const Merging: Story = {
  args: {
    patchId: 'merge-a',
    name: '氷結トリガー',
    iconName: 'ice',
    tier: 2,
    count: 2,
    trigger: 'クリ時',
    effect: '2 秒凍結',
    merging: true,
  },
};

export const Locked: Story = {
  args: {
    patchId: 'lock-a',
    name: '覚醒コア',
    iconName: 'spark',
    tier: 5,
    count: 0,
    trigger: '???',
    effect: '???',
    locked: true,
  },
};

export const Disabled: Story = {
  args: {
    patchId: 'dis-a',
    name: '過剰負荷',
    iconName: 'flame',
    tier: 4,
    count: 3,
    trigger: '範囲時',
    effect: '燃焼継続',
    disabled: true,
  },
};

export const AllTiers: Story = {
  name: 'Tier 1-5',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        padding: 16,
        background: 'var(--c-bg-deep)',
      }}
    >
      <PatchCard
        patchId="p1"
        name="装甲補強"
        iconName="shield"
        tier={1}
        trigger="常時"
        effect="被ダメ -5%"
        count={4}
      />
      <PatchCard
        patchId="p2"
        name="氷結トリガー"
        iconName="ice"
        tier={2}
        trigger="クリ発動時"
        effect="2 秒凍結"
        count={2}
      />
      <PatchCard
        patchId="p3"
        name="瞬殺装甲"
        iconName="skull"
        tier={3}
        trigger="HP 25% 以下"
        effect="敵を即死"
        count={1}
        selected
      />
      <PatchCard
        patchId="p4"
        name="連鎖燃焼"
        iconName="flame"
        tier={4}
        trigger="貫通ヒット時"
        effect="周囲焼夷"
        count={1}
      />
      <PatchCard
        patchId="p5"
        name="覚醒コア"
        iconName="spark"
        tier={5}
        trigger="Wave 開始時"
        effect="全攻撃 +50%"
        count={1}
      />
    </div>
  ),
};

export const InteractiveSelection: Story = {
  name: '選択 (interactive)',
  render: () => {
    function Demo() {
      const [sel, setSel] = useState('instant-kill');
      const patches = [
        {
          id: 'instant-kill',
          name: '瞬殺装甲',
          icon: 'skull' as const,
          tier: 3,
          trigger: 'HP 25%↓',
          effect: '敵を即死',
        },
        {
          id: 'frost-bolt',
          name: '氷結トリガー',
          icon: 'ice' as const,
          tier: 2,
          trigger: 'クリ時',
          effect: '2 秒凍結',
        },
        {
          id: 'overload',
          name: '過剰負荷',
          icon: 'flame' as const,
          tier: 4,
          trigger: '範囲時',
          effect: '燃焼継続',
        },
        {
          id: 'shield-break',
          name: 'シールド貫通',
          icon: 'lightning' as const,
          tier: 5,
          trigger: '常時',
          effect: 'シールド無効',
        },
      ];
      return (
        <div style={{ background: 'var(--c-bg-deep)', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {patches.map((p) => (
              <PatchCard
                key={p.id}
                patchId={p.id}
                name={p.name}
                iconName={p.icon}
                tier={p.tier}
                trigger={p.trigger}
                effect={p.effect}
                count={1}
                selected={sel === p.id}
                onClick={() => setSel(p.id)}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--c-text-dim)', marginTop: 8 }}>
            selected: {sel}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const AllStates: Story = {
  name: '状態: 合成中 / ロック / 在庫 0',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        padding: 16,
        background: 'var(--c-bg-deep)',
      }}
    >
      <PatchCard
        patchId="merge-a"
        name="氷結トリガー"
        iconName="ice"
        tier={2}
        count={2}
        merging
        trigger="クリ時"
        effect="2 秒凍結"
      />
      <PatchCard
        patchId="lock-a"
        name="覚醒コア"
        iconName="spark"
        tier={5}
        count={0}
        locked
        trigger="???"
        effect="???"
      />
      <PatchCard
        patchId="zero-a"
        name="装甲補強"
        iconName="shield"
        tier={1}
        count={0}
        trigger="常時"
        effect="被ダメ -5%"
      />
      <PatchCard
        patchId="dis-a"
        name="過剰負荷"
        iconName="flame"
        tier={4}
        count={3}
        disabled
        trigger="範囲時"
        effect="燃焼継続"
      />
    </div>
  ),
};

export const Sizes: Story = {
  name: 'size sm / md / lg',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: 16,
        background: 'var(--c-bg-deep)',
        alignItems: 'flex-start',
      }}
    >
      <PatchCard
        patchId="s-sm"
        name="瞬殺装甲"
        iconName="skull"
        tier={3}
        trigger="HP25%↓"
        effect="即死"
        count={2}
        size="sm"
      />
      <PatchCard
        patchId="s-md"
        name="瞬殺装甲"
        iconName="skull"
        tier={3}
        trigger="HP25%↓"
        effect="即死"
        count={2}
        size="md"
      />
      <PatchCard
        patchId="s-lg"
        name="瞬殺装甲"
        iconName="skull"
        tier={3}
        trigger="HP25%↓"
        effect="即死"
        count={2}
        size="lg"
      />
    </div>
  ),
};
