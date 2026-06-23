import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BottomSheetHandle } from './index';

const meta: Meta<typeof BottomSheetHandle> = {
  title: 'Molecules/BottomSheetHandle',
  component: BottomSheetHandle,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  argTypes: {
    dragging: { control: 'boolean' },
    width: { control: { type: 'range', min: 20, max: 120, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheetHandle>;

const sheetStyle: React.CSSProperties = {
  background: 'var(--c-bg-elev)',
  borderTop: '1px solid var(--c-border)',
  borderRadius: 'var(--r-l) var(--r-l) 0 0',
  paddingBottom: '14px',
};

const sheetBody: React.CSSProperties = {
  padding: '10px 16px 4px',
  color: 'var(--c-text-mid)',
  fontSize: '12px',
  textAlign: 'center',
};

export const Default: Story = {};

export const IdleAndDragging: Story = {
  name: 'idle / dragging',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={sheetStyle}>
        <BottomSheetHandle />
        <div style={sheetBody}>idle</div>
      </div>
      <div style={sheetStyle}>
        <BottomSheetHandle dragging />
        <div style={sheetBody}>dragging (cyan-glow)</div>
      </div>
    </div>
  ),
};

function InteractiveDemo() {
  const [drag, setDrag] = useState(false);
  return (
    <div
      style={sheetStyle}
      onPointerUp={() => setDrag(false)}
      onPointerLeave={() => setDrag(false)}
    >
      <BottomSheetHandle
        dragging={drag}
        onPointerDown={() => setDrag(true)}
      />
      <div style={sheetBody}>{drag ? 'DRAGGING' : 'タップして dragging on'}</div>
    </div>
  );
}

export const Interactive: Story = {
  name: 'interactive（pointer-down で dragging 化）',
  render: () => <InteractiveDemo />,
};

export const WidthVariants: Story = {
  name: 'width バリエーション',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[28, 40, 64].map((w) => (
        <div
          key={w}
          style={sheetStyle}
        >
          <BottomSheetHandle width={w} />
          <div style={sheetBody}>{w}px</div>
        </div>
      ))}
    </div>
  ),
};

export const InSheetContext: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-elev)',
        borderRadius: 'var(--r-l) var(--r-l) 0 0',
        width: 360,
        paddingBottom: '16px',
        boxShadow: 'var(--sh-high)',
      }}
    >
      <BottomSheetHandle />
      <div style={{ padding: '0 16px', color: 'var(--c-text)', fontSize: 'var(--fs-body)' }}>
        ボトムシートのコンテンツ例
      </div>
    </div>
  ),
};
