import type { Meta, StoryObj } from '@storybook/react';

import { WeaponReadyFx } from './index';

const meta: Meta<typeof WeaponReadyFx> = {
  title: 'Fx/WeaponReadyFx',
  component: WeaponReadyFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: 32,
          background: 'var(--c-bg-base)',
        }}
      >
        {/* Fx が重なる親スロットを模擬 */}
        <div
          style={{
            position: 'relative',
            width: 52,
            height: 52,
            borderRadius: 'var(--r-m)',
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--c-text-mid)',
            fontSize: 10,
          }}
        >
          SLOT
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WeaponReadyFx>;

/** ready 状態: パルスアニメが動く */
export const Default: Story = {};

/** reduced-motion 環境では animation なし（Storybook 手動確認用） */
export const ReducedMotion: Story = {
  parameters: {
    chromatic: { forcedColors: 'none' },
    docs: {
      description: {
        story:
          'OS の「視差効果を減らす」設定が有効な環境ではアニメーションが止まる。ボーダー発光 (glow-purple-sm) は維持される。',
      },
    },
  },
};
