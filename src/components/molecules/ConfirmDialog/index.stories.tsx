import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ConfirmDialog } from './index';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function DefaultDialog() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          color: 'var(--c-text)',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          margin: '16px',
        }}
      >
        ダイアログを開く
      </button>
      <ConfirmDialog
        open={open}
        title="撤退しますか？"
        message="現在のランの進捗は保存されません。"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultDialog />,
};

function DangerDialog() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          color: 'var(--c-text)',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          margin: '16px',
        }}
      >
        Danger ダイアログを開く
      </button>
      <ConfirmDialog
        open={open}
        title="データをリセットしますか？"
        message="この操作は元に戻せません。すべての進捗データが削除されます。"
        confirmLabel="リセット"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        variant="danger"
      />
    </>
  );
}

export const DangerVariant: Story = {
  render: () => <DangerDialog />,
};

export const NoMessage: Story = {
  args: {
    open: true,
    title: 'よろしいですか？',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  },
};

export const CustomLabels: Story = {
  args: {
    open: true,
    title: '撤退確認',
    message: 'ランを終了しますか？',
    confirmLabel: '撤退する',
    cancelLabel: 'やめておく',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  },
};
