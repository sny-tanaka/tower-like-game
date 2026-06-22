import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Toast } from './index';
import type { ToastKind } from './index';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastDemo({ kind }: { kind: ToastKind }) {
  const [open, setOpen] = useState(false);
  const messages: Record<ToastKind, string> = {
    info: '情報: アップグレードが適用されました',
    success: '成功: ウェーブをクリアしました！',
    error: 'エラー: 操作に失敗しました',
    warning: '警告: HP が低下しています',
  };
  return (
    <div style={{ padding: 16 }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          color: 'var(--c-text)',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        {kind} トーストを表示
      </button>
      <Toast
        open={open}
        kind={kind}
        message={messages[kind]}
        onDismiss={() => setOpen(false)}
      />
    </div>
  );
}

export const Info: Story = {
  render: () => <ToastDemo kind="info" />,
};

export const Success: Story = {
  render: () => <ToastDemo kind="success" />,
};

export const Error: Story = {
  render: () => <ToastDemo kind="error" />,
};

export const Warning: Story = {
  render: () => <ToastDemo kind="warning" />,
};

function AllKinds() {
  const kinds: ToastKind[] = ['info', 'success', 'error', 'warning'];
  const [visibleKind, setVisibleKind] = useState<ToastKind | null>(null);
  const messages: Record<ToastKind, string> = {
    info: '情報メッセージです',
    success: '成功しました！',
    error: 'エラーが発生しました',
    warning: '警告: 注意が必要です',
  };
  return (
    <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {kinds.map((k) => (
        <button
          key={k}
          onClick={() => setVisibleKind(k)}
          style={{
            color: 'var(--c-text)',
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          {k}
        </button>
      ))}
      {visibleKind != null && (
        <Toast
          open
          kind={visibleKind}
          message={messages[visibleKind]}
          onDismiss={() => setVisibleKind(null)}
        />
      )}
    </div>
  );
}

export const AllKindsDemo: Story = {
  render: () => <AllKinds />,
};
