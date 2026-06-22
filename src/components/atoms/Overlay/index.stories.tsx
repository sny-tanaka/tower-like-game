import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Overlay } from '.';

import { Card } from '@/components/atoms/Card';

const meta: Meta<typeof Overlay> = {
  title: 'Atoms/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#04060d' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

function DialogContent({ onClose }: { onClose?: () => void }) {
  return (
    <Card
      variant="elevated"
      padding="lg"
    >
      <div
        style={{
          color: 'var(--c-text)',
          fontFamily: 'var(--ff-body)',
          minWidth: '280px',
          maxWidth: '400px',
        }}
      >
        <div
          style={{
            fontSize: 'var(--fs-h3)',
            fontWeight: 'var(--fw-semibold)',
            marginBottom: '12px',
            color: 'var(--c-primary)',
          }}
        >
          ダイアログタイトル
        </div>
        <div
          style={{
            color: 'var(--c-text-mid)',
            marginBottom: '24px',
            lineHeight: 'var(--lh-normal)',
          }}
        >
          Overlay は全画面ディムバックドロップを提供します。 「閉じる × ボタン」はこの Dialog
          の責務です。
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'var(--c-surface)',
              color: 'var(--c-text)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--r-m)',
              cursor: 'pointer',
              fontFamily: 'var(--ff-body)',
            }}
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'var(--c-primary)',
              color: 'var(--c-bg-deep)',
              border: 'none',
              borderRadius: 'var(--r-m)',
              cursor: 'pointer',
              fontFamily: 'var(--ff-body)',
              fontWeight: 'var(--fw-semibold)',
            }}
          >
            確認
          </button>
        </div>
      </div>
    </Card>
  );
}

function OverlayDemo({ dismissible }: { dismissible?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 24px',
          background: 'var(--c-primary)',
          color: 'var(--c-bg-deep)',
          border: 'none',
          borderRadius: 'var(--r-m)',
          cursor: 'pointer',
          fontFamily: 'var(--ff-body)',
          fontSize: 'var(--fs-body)',
          fontWeight: 'var(--fw-semibold)',
        }}
      >
        オーバーレイを開く {dismissible === false ? '(dismissible=false)' : ''}
      </button>

      {open && (
        <Overlay
          open={open}
          onClose={() => setOpen(false)}
          dismissible={dismissible}
        >
          <DialogContent onClose={() => setOpen(false)} />
        </Overlay>
      )}
    </div>
  );
}

export const Default: Story = {
  render: () => <OverlayDemo dismissible />,
};

export const NotDismissible: Story = {
  render: () => <OverlayDemo dismissible={false} />,
  name: 'dismissible=false（背景クリック無効）',
};

export const Open: Story = {
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-bg-base)',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: '24px',
          color: 'var(--c-text)',
          fontFamily: 'var(--ff-body)',
        }}
      >
        背景のコンテンツ
      </div>
      <Overlay open>
        <DialogContent />
      </Overlay>
    </div>
  ),
};
