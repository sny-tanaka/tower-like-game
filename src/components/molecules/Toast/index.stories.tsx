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

// ---------------------------------------------------------------------------
// kind 全種
// ---------------------------------------------------------------------------
export const AllKinds: Story = {
  name: 'kind',
  render: () => (
    <div
      style={{
        padding: 16,
        background: 'var(--c-bg-deep)',
        minHeight: '100vh',
        display: 'grid',
        gap: 10,
        alignContent: 'start',
      }}
    >
      <Toast
        kind="info"
        message="マシン強化を購入しました"
        open
        duration={0}
      />
      <Toast
        kind="success"
        message="Tier 7 をクリア！ ボルト +120"
        open
        duration={0}
      />
      <Toast
        kind="warning"
        message="HP が 25% を切りました"
        open
        duration={0}
      />
      <Toast
        kind="error"
        message="ロード失敗。データ整合性チェック中…"
        open
        duration={0}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// action 付き
// ---------------------------------------------------------------------------
export const WithAction: Story = {
  name: 'action 付き',
  render: () => (
    <div
      style={{
        padding: 16,
        background: 'var(--c-bg-deep)',
        minHeight: '100vh',
        display: 'grid',
        gap: 10,
        alignContent: 'start',
      }}
    >
      <Toast
        kind="success"
        message="パッチを合成しました"
        action={{ label: 'UNDO' }}
        open
        duration={0}
      />
      <Toast
        kind="warning"
        message="自動戦闘がオフです"
        action={{ label: 'ON にする' }}
        open
        duration={0}
      />
      <Toast
        kind="info"
        message="新しい武器が解放されました"
        action={{ label: '見る' }}
        open
        duration={0}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// icon 上書き
// ---------------------------------------------------------------------------
export const IconOverride: Story = {
  name: 'icon 上書き',
  render: () => (
    <div
      style={{
        padding: 16,
        background: 'var(--c-bg-deep)',
        minHeight: '100vh',
        display: 'grid',
        gap: 10,
        alignContent: 'start',
      }}
    >
      <Toast
        kind="info"
        iconName="bolt"
        message="ボルトを +12 獲得"
        open
        duration={0}
      />
      <Toast
        kind="info"
        iconName="alloy"
        message="超合金を +2 獲得"
        open
        duration={0}
      />
      <Toast
        kind="info"
        iconName="spark"
        message="パッチがドロップ！"
        open
        duration={0}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// インタラクティブ
// ---------------------------------------------------------------------------
function ToastDemo({ kind }: { kind: ToastKind }) {
  const [open, setOpen] = useState(false);
  const messages: Record<ToastKind, string> = {
    info: 'アップグレードが適用されました',
    success: 'ウェーブをクリアしました！',
    error: '操作に失敗しました',
    warning: 'HP が低下しています',
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

export const Info: Story = { render: () => <ToastDemo kind="info" /> };
export const Success: Story = { render: () => <ToastDemo kind="success" /> };
export const Error: Story = { render: () => <ToastDemo kind="error" /> };
export const Warning: Story = { render: () => <ToastDemo kind="warning" /> };
