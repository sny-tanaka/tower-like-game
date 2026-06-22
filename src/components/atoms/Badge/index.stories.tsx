import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './index';

import { Icon } from '@/components/atoms/Icon';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['tier', 'elite', 'boss', 'patch-tier', 'default'],
    },
    tier: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: 'Normal',
    variant: 'default',
  },
};

export const Elite: Story = {
  args: {
    text: 'ELITE',
    variant: 'elite',
  },
};

export const Boss: Story = {
  args: {
    text: 'BOSS',
    variant: 'boss',
    glow: true,
  },
};

export const Tier5: Story = {
  args: {
    text: 'Tier 5',
    variant: 'tier',
    tier: 5,
  },
};

export const Tier10WithGlow: Story = {
  args: {
    text: 'Tier 10',
    variant: 'tier',
    tier: 10,
    glow: true,
  },
};

export const PatchTier3: Story = {
  args: {
    text: 'T3',
    variant: 'patch-tier',
    tier: 3,
  },
};

export const AllTierColors: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
        <Badge
          key={t}
          text={`Tier ${t}`}
          variant="tier"
          tier={t}
        />
      ))}
    </div>
  ),
};

export const AllPatchTierColors: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5].map((t) => (
        <Badge
          key={t}
          text={`PT${t}`}
          variant="patch-tier"
          tier={t}
          glow
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge
        text="Default"
        variant="default"
      />
      <Badge
        text="Tier 7"
        variant="tier"
        tier={7}
      />
      <Badge
        text="Elite"
        variant="elite"
      />
      <Badge
        text="Boss"
        variant="boss"
      />
      <Badge
        text="PT3"
        variant="patch-tier"
        tier={3}
      />
    </div>
  ),
};

// --- Showcase: design ref (design-docs/claude-design/atoms/Badge/Badge.html) と同等の網羅性 ---

const showcaseSectionStyle: React.CSSProperties = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: '18px 20px',
};

const showcaseHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 14px',
};

const showcaseRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  alignItems: 'center',
};

export const Showcase: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const tiers = Array.from({ length: 12 }, (_, i) => i + 1);
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          minHeight: '100vh',
          padding: '32px',
        }}
      >
        <div
          style={{
            maxWidth: 660,
            margin: '0 auto',
            display: 'grid',
            gap: '22px',
          }}
        >
          <header>
            <h1
              style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 600,
                fontSize: '24px',
                margin: 0,
                color: 'var(--c-text)',
                letterSpacing: '0.02em',
              }}
            >
              BADGE
            </h1>
            <div style={{ color: 'var(--c-text-dim)', fontSize: '12px', marginTop: '4px' }}>
              Tier / Elite / Boss / セマンティック / Patch Tier — pill 角丸の小型タグ。
            </div>
          </header>

          <section style={showcaseSectionStyle}>
            <h2 style={showcaseHeadingStyle}>Tier (T1 — T10+)</h2>
            <div style={showcaseRowStyle}>
              {tiers.map((t) => (
                <Badge
                  key={t}
                  variant="tier"
                  tier={t}
                />
              ))}
            </div>
            <div style={{ ...showcaseRowStyle, marginTop: '14px' }}>
              <Badge
                variant="tier"
                tier={5}
                size="sm"
              />
              <Badge
                variant="tier"
                tier={5}
                size="md"
              />
              <Badge
                variant="tier"
                tier={5}
                size="lg"
              />
            </div>
            <div style={{ ...showcaseRowStyle, marginTop: '14px' }}>
              <Badge
                variant="tier"
                tier={7}
                glow
              />
              <Badge
                variant="tier"
                tier={10}
                glow
              />
              <Badge
                variant="tier"
                tier={12}
                glow
              />
            </div>
          </section>

          <section style={showcaseSectionStyle}>
            <h2 style={showcaseHeadingStyle}>敵タイプ</h2>
            <div style={showcaseRowStyle}>
              <Badge
                variant="elite"
                text="ELITE"
              />
              <Badge
                variant="elite"
                text="ELITE"
                glow
              />
              <Badge
                variant="boss"
                text="BOSS"
              />
              <Badge
                variant="boss"
                text="BOSS"
                glow
              />
              <Badge
                variant="boss"
                text="TIER 5 BOSS"
              />
            </div>
          </section>

          <section style={showcaseSectionStyle}>
            <h2 style={showcaseHeadingStyle}>Patch Tier (T1 — T5)</h2>
            <div style={showcaseRowStyle}>
              {[1, 2, 3, 4, 5].map((t) => (
                <Badge
                  key={t}
                  variant="patch-tier"
                  tier={t}
                />
              ))}
            </div>
            <div style={{ ...showcaseRowStyle, marginTop: '14px' }}>
              {[1, 2, 3, 4, 5].map((t) => (
                <Badge
                  key={t}
                  variant="patch-tier"
                  tier={t}
                  glow
                />
              ))}
            </div>
          </section>

          <section style={showcaseSectionStyle}>
            <h2 style={showcaseHeadingStyle}>Semantic</h2>
            <div style={showcaseRowStyle}>
              <Badge
                variant="info"
                text="INFO"
              />
              <Badge
                variant="success"
                text="UNLOCKED"
              />
              <Badge
                variant="warning"
                text="LIMITED"
              />
              <Badge
                variant="danger"
                text="LOCKED"
              />
              <Badge
                variant="neutral"
                text="×42"
              />
            </div>
          </section>

          <section style={showcaseSectionStyle}>
            <h2 style={showcaseHeadingStyle}>icon + label</h2>
            <div style={showcaseRowStyle}>
              <Badge
                variant="info"
                text="LASER"
                iconLeft={
                  <Icon
                    name="laser"
                    size={11}
                  />
                }
              />
              <Badge
                variant="warning"
                text="OVERHEAT"
                iconLeft={
                  <Icon
                    name="flame"
                    size={11}
                  />
                }
              />
              <Badge
                variant="danger"
                text="LOW HP"
                iconLeft={
                  <Icon
                    name="heart"
                    size={11}
                  />
                }
              />
            </div>
          </section>
        </div>
      </div>
    );
  },
};

export const GlowComparison: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      <Badge
        text="Elite (glow off)"
        variant="elite"
        glow={false}
      />
      <Badge
        text="Elite (glow on)"
        variant="elite"
        glow={true}
      />
      <Badge
        text="Boss (glow on)"
        variant="boss"
        glow={true}
      />
    </div>
  ),
};
