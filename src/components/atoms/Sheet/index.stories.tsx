import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
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

// ---------------------------------------------------------------------------
// claude design ref 準拠 Showcase
//   - open=true 状態で bottom+handle / bottom / top / all の 4 パターンを 1 画面に
//   - 各セクションが「シートを開くボタンの上に直接 Sheet を載せ初期 open」状態
//   - design ref は edge ごとに 1 セクションで stage を区切る
// 注: 実装の edgeBottom/edgeTop/edgeSide は position: fixed なので、複数同時
//     表示すると重なる。Showcase では edge="all" (position: relative) を使った
//     合成表示で各パターンの見た目を 1 画面で比較できるようにする。
// ---------------------------------------------------------------------------

const showcaseSectionStyle = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: 14,
} as const;

const showcaseHeadingStyle = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 12px',
} as const;

const stageBottomStyle = {
  background: 'var(--c-bg-base)',
  borderRadius: 'var(--r-m)',
  padding: '24px 0 0',
  minHeight: 160,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
  overflow: 'hidden',
} as const;

const stageTopStyle = {
  background: 'var(--c-bg-base)',
  borderRadius: 'var(--r-m)',
  padding: '0 0 24px',
  minHeight: 160,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
} as const;

const stageCenterStyle = {
  background: 'var(--c-bg-base)',
  borderRadius: 'var(--r-m)',
  padding: 16,
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
} as const;

/**
 * Stage 内で Sheet を「擬似 edge」で表示するヘルパー。
 * 実装の Sheet は edge=bottom/top/side で position: fixed のため、Stage に閉じ込めるには
 * style override で position:absolute + 角丸を Stage 端に合わせる。design ref 同様に
 * 1 ページに 4 パターン並べる showcase 用途。
 */
function StagedSheetMock({
  edge,
  withHandle,
  children,
}: {
  edge: 'bottom' | 'top' | 'all';
  withHandle?: boolean;
  children: ReactNode;
}) {
  const overrideByEdge: Record<typeof edge, CSSProperties> = {
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    top: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
    all: {
      width: 280,
    },
  };
  return (
    <Sheet
      open
      edge={edge}
      withHandle={withHandle}
      padding="md"
      style={overrideByEdge[edge]}
    >
      {children}
    </Sheet>
  );
}

const sheetHeading = {
  fontSize: 14,
  fontWeight: 'var(--fw-semibold)' as const,
  marginBottom: 6,
  color: 'var(--c-text)',
  fontFamily: 'var(--ff-body)',
};
const sheetCaption = {
  fontSize: 12,
  color: 'var(--c-text-mid)',
  fontFamily: 'var(--ff-body)',
};

export const Showcase: Story = {
  name: 'Showcase — bottom+handle / bottom / top / all',
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 16,
        maxWidth: 412,
        margin: '0 auto',
        padding: 16,
        background: 'var(--c-bg-deep)',
      }}
    >
      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>bottom + handle (ラン中 WS, BattleMenu)</h3>
        <div style={stageBottomStyle}>
          <StagedSheetMock
            edge="bottom"
            withHandle
          >
            <div style={sheetHeading}>ラン中ワークショップ</div>
            <div style={sheetCaption}>この上に UpgradeCard × 4 を並べる</div>
          </StagedSheetMock>
        </div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>bottom (ハンドル無し)</h3>
        <div style={stageBottomStyle}>
          <StagedSheetMock edge="bottom">
            <div style={sheetCaption}>固定の下端パネル</div>
          </StagedSheetMock>
        </div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>top (バトル上 HUD のオーバーレイ等)</h3>
        <div style={stageTopStyle}>
          <StagedSheetMock edge="top">
            <div style={sheetCaption}>画面上端から伸びるパネル</div>
          </StagedSheetMock>
        </div>
      </section>

      <section style={showcaseSectionStyle}>
        <h3 style={showcaseHeadingStyle}>all (中央モーダル本体として)</h3>
        <div style={stageCenterStyle}>
          <StagedSheetMock edge="all">
            <div style={sheetHeading}>センター配置</div>
            <div style={sheetCaption}>Overlay で包めばダイアログ完成</div>
          </StagedSheetMock>
        </div>
      </section>
    </div>
  ),
};

// 「シートを開くボタンの上に直接 Sheet を載せ、初期 open 状態で見える」Story
export const OpenOverButton: Story = {
  name: 'Showcase — open=true でボタン上に重ねる',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--c-bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <button
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
      <Sheet
        open
        edge="bottom"
        withHandle
        padding="md"
      >
        <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)' }}>
          <div style={sheetHeading}>初期 open=true</div>
          <div style={sheetCaption}>マウント直後からシートが展開された状態を確認できます。</div>
        </div>
      </Sheet>
    </div>
  ),
};
