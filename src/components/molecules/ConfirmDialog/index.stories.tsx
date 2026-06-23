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

// ---------------------------------------------------------------------------
// default — 出撃確認
// ---------------------------------------------------------------------------
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
        title="出撃しますか？"
        message="Tier 7 から開始します。装備中のパッチが適用されます。"
        iconName="play"
        confirmLabel="出撃"
        cancelLabel="準備に戻る"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export const Default: Story = { render: () => <DefaultDialog /> };

// ---------------------------------------------------------------------------
// danger — 撤退確認
// ---------------------------------------------------------------------------
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
        variant="danger"
        title="ラン破棄して撤退？"
        message="このランで獲得したネジは失われます。ボルトと超合金は保持されます。"
        iconName="skull"
        confirmLabel="撤退する"
        cancelLabel="続行"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export const DangerVariant: Story = { render: () => <DangerDialog /> };

// ---------------------------------------------------------------------------
// danger — 全データリセット
// ---------------------------------------------------------------------------
export const DangerReset: Story = {
  name: 'danger — 全データリセット',
  args: {
    open: true,
    variant: 'danger',
    title: '全データをリセット？',
    message:
      'マシン強化 / 武器強化 / 所持パッチ含め、すべてが初期状態に戻ります。この操作は取り消せません。',
    iconName: 'shield',
    confirmLabel: 'リセット',
    cancelLabel: 'やめる',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  },
};

// ---------------------------------------------------------------------------
// icon なし
// ---------------------------------------------------------------------------
export const NoIcon: Story = {
  name: 'icon なし',
  args: {
    open: true,
    title: '設定を保存しました',
    message: '変更内容は次回起動時から反映されます。',
    confirmLabel: 'OK',
    cancelLabel: '戻る',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  },
};

export const NoMessage: Story = {
  name: 'icon なし / message なし',
  args: {
    open: true,
    title: 'よろしいですか？',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  },
};
