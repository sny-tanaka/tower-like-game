import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';

import { CircularProgress } from './index';

import { Icon } from '@/components/atoms/Icon';

const meta: Meta<typeof CircularProgress> = {
  title: 'Atoms/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['hp', 'cd', 'wave', 'primary', 'warning'],
    },
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
    thickness: { control: { type: 'range', min: 1, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

// ---------------------------------------------------------------------------
// showcase 用 共通スタイル
// ---------------------------------------------------------------------------

const showcaseRoot: CSSProperties = {
  maxWidth: '660px',
  display: 'grid',
  gap: '22px',
  padding: '24px',
  color: 'var(--c-text)',
  fontFamily: 'var(--ff-body)',
};

const sectionStyle: CSSProperties = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: '18px 20px',
};

const sectionHeading: CSSProperties = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 14px',
};

const cellStyle: CSSProperties = {
  background: 'var(--c-bg-base)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-s)',
  padding: '16px 8px 10px',
  display: 'grid',
  gap: '10px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '86px',
};

const labelStyle: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '9.5px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={sectionStyle}>
      <h2 style={sectionHeading}>{title}</h2>
      {children}
    </section>
  );
}

function Cell({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div style={cellStyle}>
      {children}
      <div style={labelStyle}>{caption}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 既存 Story (互換維持)
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: 24,
    color: 'primary',
    thickness: 3,
  },
};

export const Colors: Story = {
  render: () => {
    const colors = ['hp', 'cd', 'wave', 'primary'] as const;
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CircularProgress
              value={65}
              max={100}
              size={40}
              color={color}
            />
            <span style={{ color: 'var(--c-text-dim)', fontSize: '11px' }}>{color}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes = [16, 24, 32, 48, 64] as const;
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {sizes.map((size) => (
          <CircularProgress
            key={size}
            value={70}
            max={100}
            size={size}
            color="primary"
          />
        ))}
      </div>
    );
  },
};

export const States: Story = {
  name: '0% / 50% / 100%',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <CircularProgress
        value={0}
        max={100}
        size={40}
        color="cd"
      />
      <CircularProgress
        value={50}
        max={100}
        size={40}
        color="cd"
      />
      <CircularProgress
        value={100}
        max={100}
        size={40}
        color="cd"
      />
    </div>
  ),
};

export const Thickness: Story = {
  render: () => {
    const thicknesses = [1, 2, 3, 5, 8] as const;
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {thicknesses.map((t) => (
          <div
            key={t}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CircularProgress
              value={70}
              max={100}
              size={40}
              thickness={t}
              color="primary"
            />
            <span style={{ color: 'var(--c-text-dim)', fontSize: '11px' }}>{t}px</span>
          </div>
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 追加 Story (claude design ref 準拠)
// ---------------------------------------------------------------------------

// --- progress 0-100 段階 (color=cd) ---

export const ProgressSteps: Story = {
  name: 'progress 0/20/40/60/80/100 (cd)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="progress (color=cd)">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '14px',
          }}
        >
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <Cell
              key={v}
              caption={`${v}%`}
            >
              <CircularProgress
                value={v}
                size={40}
                thickness={4}
                color="cd"
              />
            </Cell>
          ))}
        </div>
      </Section>
    </div>
  ),
};

// --- 全 color (hp / cd / wave / primary / warning) ---

export const AllColors: Story = {
  name: 'color (hp / cd / wave / primary / warning)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="color">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '14px',
          }}
        >
          <Cell caption="cd">
            <CircularProgress
              value={62}
              size={40}
              thickness={4}
              color="cd"
              glow
            />
          </Cell>
          <Cell caption="wave">
            <CircularProgress
              value={62}
              size={40}
              thickness={4}
              color="wave"
              glow
            />
          </Cell>
          <Cell caption="hp">
            <CircularProgress
              value={62}
              size={40}
              thickness={4}
              color="hp"
            />
          </Cell>
          <Cell caption="primary">
            <CircularProgress
              value={62}
              size={40}
              thickness={4}
              color="primary"
              glow
            />
          </Cell>
          <Cell caption="warning">
            <CircularProgress
              value={62}
              size={40}
              thickness={4}
              color="warning"
            />
          </Cell>
        </div>
      </Section>
    </div>
  ),
};

// --- size 4 段階 (20 / 32 / 48 / 64) ---

export const SizeScale: Story = {
  name: 'size (20 / 32 / 48 / 64)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="size">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
          }}
        >
          <Cell caption="20">
            <CircularProgress
              value={62}
              size={20}
              thickness={2}
              color="cd"
            />
          </Cell>
          <Cell caption="32">
            <CircularProgress
              value={62}
              size={32}
              thickness={3}
              color="cd"
            />
          </Cell>
          <Cell caption="48">
            <CircularProgress
              value={62}
              size={48}
              thickness={4}
              color="cd"
            />
          </Cell>
          <Cell caption="64">
            <CircularProgress
              value={62}
              size={64}
              thickness={5}
              color="cd"
            />
          </Cell>
        </div>
      </Section>
    </div>
  ),
};

// --- with label / children (アイコン / 数値 / 秒数) ---

export const WithLabelAndChildren: Story = {
  name: 'with label / children',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title="with label / children">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
          }}
        >
          <Cell caption="% (default)">
            <CircularProgress
              value={62}
              size={48}
              thickness={4}
              color="cd"
              showLabel
              glow
            />
          </Cell>
          <Cell caption="label='2.4s'">
            <CircularProgress
              value={62}
              size={48}
              thickness={4}
              color="cd"
              showLabel
              label="2.4s"
              glow
            />
          </Cell>
          <Cell caption="children (Icon)">
            <CircularProgress
              value={62}
              size={56}
              thickness={4}
              color="cd"
              glow
            >
              <span style={{ color: 'var(--c-primary)' }}>
                <Icon
                  name="laser"
                  size={24}
                />
              </span>
            </CircularProgress>
          </Cell>
          <Cell caption="children (Wave 番号)">
            <CircularProgress
              value={45}
              size={56}
              thickness={4}
              color="wave"
              glow
            >
              <span
                style={{
                  fontFamily: 'var(--ff-numeric)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--c-secondary)',
                }}
              >
                W17
              </span>
            </CircularProgress>
          </Cell>
        </div>
      </Section>
    </div>
  ),
};

// --- 武器スロット 4 枚 (CD 進行が異なる) ---

export const WeaponSlots: Story = {
  name: '武器スロット 4 枚 (CD 異なる)',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const slots = [
      { name: 'laser', cd: 100, active: true },
      { name: 'cannon', cd: 35, active: false },
      { name: 'thunder', cd: 70, active: false },
      { name: 'cutter', cd: 12, active: false },
    ] as const;
    return (
      <div style={showcaseRoot}>
        <Section title="武器スロット 4 枚 (CD 異なる)">
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {slots.map((w) => (
              <CircularProgress
                key={w.name}
                value={w.cd}
                size={52}
                thickness={3}
                color="cd"
                glow={w.active}
              >
                <span
                  style={{
                    color: w.cd >= 100 ? 'var(--c-primary)' : 'var(--c-text-dim)',
                    filter: w.cd >= 100 ? 'drop-shadow(var(--glow-cyan-sm))' : 'none',
                  }}
                >
                  <Icon
                    name={w.name}
                    size={26}
                  />
                </span>
              </CircularProgress>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};
