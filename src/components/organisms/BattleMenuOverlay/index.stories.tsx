import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BattleMenuOverlay } from './index';

import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// Storybook helpers
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-C: BattleMenuOverlay は bgmVolume / seVolume を内部 `useStore` selector
 * で直接購読し、 setter (setBgmVolume / setSeVolume) も store から取得して Slider に直接渡す
 * ようになったため、 args を直接 props として渡せない。 Story 表示直前に `seedBattleState`
 * で store の初期音量を seed する。
 */
interface StoryArgs {
  /** BGM 音量初期値 (0.0〜1.0) */
  bgmVolume: number;
  /** SE 音量初期値 (0.0〜1.0) */
  seVolume: number;
  /** メニュー開閉状態 */
  open: boolean;
}

function StoryHarness(args: StoryArgs) {
  const [open, setOpen] = useState(args.open);

  useEffect(() => {
    resetBattleState();
    seedBattleState({ bgmVolume: args.bgmVolume, seVolume: args.seVolume });
  }, [args.bgmVolume, args.seVolume]);

  useEffect(() => {
    setOpen(args.open);
  }, [args.open]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'var(--c-bg-deep)',
      }}
    >
      <BattleMenuOverlay
        open={open}
        onRetreat={() => {
          // Storybook 上での撤退はコンソールログだけ (本番では Page 側で SE / 状態遷移を行う)
          console.log('[story] BattleMenuOverlay: 撤退');
        }}
        onClose={() => setOpen(false)}
      />
      {!open && (
        <p style={{ color: 'var(--c-text)', padding: '1rem' }}>
          メニューを閉じました。 args の open を true に戻すと再表示されます。
        </p>
      )}
    </div>
  );
}

const meta: Meta<typeof StoryHarness> = {
  title: 'Organisms/BattleMenuOverlay',
  component: StoryHarness,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  args: {
    bgmVolume: 0.8,
    seVolume: 0.7,
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof StoryHarness>;

/** デフォルト表示（開いた状態） */
export const Default: Story = {
  args: {
    bgmVolume: 0.8,
    seVolume: 0.7,
    open: true,
  },
};

/** 閉じた状態 */
export const Closed: Story = {
  args: {
    bgmVolume: 0.5,
    seVolume: 0.5,
    open: false,
  },
};
