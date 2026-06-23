import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { WeaponSlotIcon } from './index';

const meta: Meta<typeof WeaponSlotIcon> = {
  title: 'Molecules/WeaponSlotIcon',
  component: WeaponSlotIcon,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  argTypes: {
    weapon: { control: 'select', options: ['laser', 'cannon', 'thunder', 'cutter'] },
    active: { control: 'boolean' },
    ready: { control: 'boolean' },
    cdProgress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    swapDisabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponSlotIcon>;

export const ReadyActive: Story = {
  name: 'ready + active',
  args: { weapon: 'laser', active: true, ready: true, cdProgress: 100 },
};

export const ReadyIdle: Story = {
  name: 'ready (idle)',
  args: { weapon: 'laser', active: false, ready: true, cdProgress: 100 },
};

export const OnCooldown: Story = {
  name: 'CD 中 (55%)',
  args: { weapon: 'cannon', active: false, ready: false, cdProgress: 55 },
};

export const SwapDisabled: Story = {
  name: '切替 CD 中',
  args: { weapon: 'laser', cdProgress: 50, swapDisabled: true },
};

export const AllStates: Story = {
  name: 'state (md) — 全状態',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* ready + active */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 110 }}>ready + active</span>
        {(['laser', 'cannon', 'thunder', 'cutter'] as const).map((w) => (
          <WeaponSlotIcon
            key={w}
            weapon={w}
            active
            ready
            cdProgress={100}
          />
        ))}
      </div>
      {/* ready (idle) */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 110 }}>ready (idle)</span>
        {(['laser', 'cannon', 'thunder', 'cutter'] as const).map((w) => (
          <WeaponSlotIcon
            key={w}
            weapon={w}
            ready
            cdProgress={100}
          />
        ))}
      </div>
      {/* CD 中 */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 110 }}>CD 中</span>
        {[28, 55, 72, 92].map((p, i) => (
          <WeaponSlotIcon
            key={i}
            weapon={(['laser', 'cannon', 'thunder', 'cutter'] as const)[i]}
            cdProgress={p}
            ready={false}
          />
        ))}
      </div>
      {/* 切替 CD 中 */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 110 }}>切替 CD 中</span>
        <WeaponSlotIcon
          weapon="laser"
          cdProgress={50}
          swapDisabled
        />
        <WeaponSlotIcon
          weapon="cannon"
          active
          cdProgress={50}
          swapDisabled
        />
        <WeaponSlotIcon
          weapon="thunder"
          cdProgress={50}
          swapDisabled
        />
        <WeaponSlotIcon
          weapon="cutter"
          cdProgress={50}
          swapDisabled
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'size sm / md / lg',
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 50 }}>sm 40</span>
        <WeaponSlotIcon
          weapon="laser"
          active
          ready
          cdProgress={100}
          size="sm"
        />
        <WeaponSlotIcon
          weapon="cannon"
          ready
          cdProgress={100}
          size="sm"
        />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 50 }}>md 52</span>
        <WeaponSlotIcon
          weapon="laser"
          active
          ready
          cdProgress={100}
          size="md"
        />
        <WeaponSlotIcon
          weapon="cannon"
          ready
          cdProgress={100}
          size="md"
        />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--c-text-dim)', width: 50 }}>lg 64</span>
        <WeaponSlotIcon
          weapon="laser"
          active
          ready
          cdProgress={100}
          size="lg"
        />
        <WeaponSlotIcon
          weapon="cannon"
          ready
          cdProgress={100}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const BattleHud: Story = {
  name: 'バトル下 HUD 4 スロット (interactive)',
  render: () => {
    function HudDemo() {
      const [active, setActive] = useState<string>('laser');
      return (
        <div
          style={{
            background: 'var(--c-bg-base)',
            padding: '14px 18px',
            borderRadius: 8,
            display: 'flex',
            gap: 14,
            border: '1px solid var(--c-border-faint)',
          }}
        >
          {(['laser', 'cannon', 'thunder', 'cutter'] as const).map((w, i) => {
            const progresses = [100, 64, 90, 22];
            const p = progresses[i];
            return (
              <WeaponSlotIcon
                key={w}
                weapon={w}
                active={active === w}
                ready={p >= 100}
                cdProgress={p}
                onClick={() => setActive(w)}
              />
            );
          })}
        </div>
      );
    }
    return <HudDemo />;
  },
};
