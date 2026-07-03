import type { Meta, StoryObj } from '@storybook/react';

import { DiagnosticsOverlay } from './index';

const meta: Meta<typeof DiagnosticsOverlay> = {
  title: 'Atoms/DiagnosticsOverlay',
  component: DiagnosticsOverlay,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DiagnosticsOverlay>;

/** 代表値 (ヒープ計測あり: Chrome 想定) */
export const Default: Story = {
  args: {
    fps: 59,
    enemyCount: 12,
    fxEventCount: 34,
    domCount: 842,
    heapMB: 187.4,
  },
};

/** ヒープなし (Chrome 以外: performance.memory 非対応環境) */
export const NoHeapSupport: Story = {
  args: {
    fps: 60,
    enemyCount: 8,
    fxEventCount: 20,
    domCount: 601,
    heapMB: null,
  },
};
