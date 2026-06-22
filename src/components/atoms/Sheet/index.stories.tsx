import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Sheet } from '.';

const meta: Meta<typeof Sheet> = {
  title: 'Atoms/Sheet',
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#04060d' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

function SheetDemo() {
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
        シートを開く
      </button>

      {open && (
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          edge="bottom"
          withHandle
          padding="md"
        >
          <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
            <div
              style={{
                fontSize: 'var(--fs-h3)',
                fontWeight: 'var(--fw-semibold)',
                marginBottom: '12px',
              }}
            >
              ボトムシート
            </div>
            <div style={{ color: 'var(--c-text-mid)', marginBottom: '24px' }}>
              画面下からスライドインするシートのサンプルです。
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: '10px 20px',
                background: 'var(--c-surface)',
                color: 'var(--c-text)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--r-m)',
                cursor: 'pointer',
                fontFamily: 'var(--ff-body)',
              }}
            >
              閉じる
            </button>
          </div>
        </Sheet>
      )}
    </div>
  );
}

export const Default: Story = {
  render: () => <SheetDemo />,
};

export const BottomWithHandle: Story = {
  name: 'bottom + handle',
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg-deep)', position: 'relative' }}>
      <Sheet
        open
        edge="bottom"
        withHandle
        padding="md"
      >
        <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
          <div
            style={{
              fontSize: 'var(--fs-h3)',
              fontWeight: 'var(--fw-semibold)',
              marginBottom: '8px',
            }}
          >
            ラン中ワークショップ
          </div>
          <div style={{ color: 'var(--c-text-mid)' }}>この上に UpgradeCard × 4 を並べる</div>
        </div>
      </Sheet>
    </div>
  ),
};

export const BottomNoHandle: Story = {
  name: 'bottom（ハンドル無し）',
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg-deep)', position: 'relative' }}>
      <Sheet
        open
        edge="bottom"
        padding="md"
      >
        <div style={{ color: 'var(--c-text-mid)', fontFamily: 'var(--ff-body)' }}>
          固定の下端パネル
        </div>
      </Sheet>
    </div>
  ),
};

export const Top: Story = {
  name: 'top（上端から）',
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg-deep)', position: 'relative' }}>
      <Sheet
        open
        edge="top"
        padding="md"
      >
        <div style={{ color: 'var(--c-text-mid)', fontFamily: 'var(--ff-body)' }}>
          画面上端から伸びるパネル
        </div>
      </Sheet>
    </div>
  ),
};

export const All: Story = {
  name: 'all（中央モーダル本体）',
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Sheet
        open
        edge="all"
        padding="md"
        style={{ width: 280 }}
      >
        <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
          <div
            style={{
              fontSize: 'var(--fs-h3)',
              fontWeight: 'var(--fw-semibold)',
              marginBottom: '8px',
            }}
          >
            センター配置
          </div>
          <div style={{ color: 'var(--c-text-mid)' }}>Overlay で包めばダイアログ完成</div>
        </div>
      </Sheet>
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-bg-deep)',
        position: 'relative',
      }}
    >
      <Sheet
        open
        position="bottom"
      >
        <div style={{ padding: '24px', color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
          <div
            style={{
              fontSize: 'var(--fs-h3)',
              fontWeight: 'var(--fw-semibold)',
              marginBottom: '8px',
            }}
          >
            シートコンテンツ
          </div>
          <div style={{ color: 'var(--c-text-mid)' }}>
            open=true でマウント直後にスライドインします。
          </div>
        </div>
      </Sheet>
    </div>
  ),
};
