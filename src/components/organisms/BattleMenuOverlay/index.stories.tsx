import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BattleMenuOverlay } from './index';

const meta: Meta<typeof BattleMenuOverlay> = {
  title: 'Organisms/BattleMenuOverlay',
  component: BattleMenuOverlay,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BattleMenuOverlay>;

function DefaultStory() {
  const [open, setOpen] = useState(true);
  const [bgm, setBgm] = useState(0.8);
  const [se, setSe] = useState(0.7);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <BattleMenuOverlay
        open={open}
        bgmVolume={bgm}
        seVolume={se}
        onBgmChange={setBgm}
        onSeChange={setSe}
        onRetreat={() => alert('撤退!')}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

function ClosedStory() {
  const [bgm] = useState(0.5);
  const [se] = useState(0.5);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <BattleMenuOverlay
        open={false}
        bgmVolume={bgm}
        seVolume={se}
        onBgmChange={() => {}}
        onSeChange={() => {}}
        onRetreat={() => {}}
        onClose={() => {}}
      />
      <p style={{ color: 'var(--c-text)', padding: '1rem' }}>open=false の状態（何も表示されない）</p>
    </div>
  );
}

/** デフォルト表示（開いた状態） */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** 閉じた状態 */
export const Closed: Story = {
  render: () => <ClosedStory />,
};
