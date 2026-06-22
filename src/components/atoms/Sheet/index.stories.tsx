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
        >
          <div style={{ padding: '24px', color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
            <div
              style={{
                width: '40px',
                height: '4px',
                background: 'var(--c-border-hi)',
                borderRadius: 'var(--r-pill)',
                margin: '0 auto 20px',
              }}
            />
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
              width: '40px',
              height: '4px',
              background: 'var(--c-border-hi)',
              borderRadius: 'var(--r-pill)',
              margin: '0 auto 20px',
            }}
          />
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
