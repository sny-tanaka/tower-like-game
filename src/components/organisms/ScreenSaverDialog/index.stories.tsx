import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ScreenSaverDialog } from './index';

const meta: Meta<typeof ScreenSaverDialog> = {
  title: 'Organisms/ScreenSaverDialog',
  component: ScreenSaverDialog,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ScreenSaverDialog>;

function DefaultStory() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <p style={{ color: 'var(--c-text)', padding: '1rem', position: 'relative', zIndex: 0 }}>
        背景: バトル画面（ゲームは継続）
      </p>
      <ScreenSaverDialog
        open={open}
        onClose={() => setOpen(false)}
      />
      {!open && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            style={{ color: 'var(--c-text)', padding: '0.5rem 1rem', border: '1px solid var(--c-border)', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}
            onClick={() => setOpen(true)}
          >
            スクリーンセーバーを起動
          </button>
        </div>
      )}
    </div>
  );
}

function ClosedStory() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--c-bg-deep)' }}>
      <ScreenSaverDialog
        open={false}
        onClose={() => {}}
      />
      <p style={{ color: 'var(--c-text)', padding: '1rem' }}>open=false の状態（何も表示されない）</p>
    </div>
  );
}

/** スクリーンセーバー起動中（画面タップで閉じる） */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** 閉じた状態 */
export const Closed: Story = {
  render: () => <ClosedStory />,
};
