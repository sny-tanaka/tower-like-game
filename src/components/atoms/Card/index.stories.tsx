import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '.';

import { Text } from '@/components/atoms/Text';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#04060d' }],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'outline'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleContent = () => (
  <div style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-body)' }}>
    <div
      style={{ marginBottom: '4px', fontWeight: 'var(--fw-semibold)', color: 'var(--c-primary)' }}
    >
      カードタイトル
    </div>
    <div style={{ color: 'var(--c-text-mid)' }}>カードの内容テキスト</div>
  </div>
);

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    padding: 'md',
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    interactive: true,
    children: <SampleContent />,
  },
};

export const PaddingNone: Story = {
  args: {
    variant: 'elevated',
    padding: 'none',
    children: <div style={{ padding: '8px', color: 'var(--c-text)' }}>padding: none</div>,
  },
};

export const PaddingSm: Story = {
  args: {
    variant: 'elevated',
    padding: 'sm',
    children: <SampleContent />,
  },
};

export const PaddingLg: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    children: <SampleContent />,
  },
};

// --- Showcase: design ref (design-docs/claude-design/atoms/Card/Card.html) と同等の網羅性 ---

const cardSectionStyle: React.CSSProperties = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: '14px',
};

const cardHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 12px',
};

const cardCol2Style: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
};

const cardStackStyle: React.CSSProperties = {
  display: 'grid',
  gap: '10px',
};

export const Showcase: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        minHeight: '100vh',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: 412,
          margin: '0 auto',
          display: 'grid',
          gap: '16px',
        }}
      >
        <header>
          <h1
            style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: '20px',
              margin: 0,
              color: 'var(--c-text)',
              letterSpacing: '0.02em',
            }}
          >
            CARD
          </h1>
          <div style={{ color: 'var(--c-text-dim)', fontSize: '12px', marginTop: '4px' }}>
            汎用カード。7 variant × 5 padding × 3 radius。
          </div>
        </header>

        <section style={cardSectionStyle}>
          <h2 style={cardHeadingStyle}>variant</h2>
          <div style={cardCol2Style}>
            <Card variant="default">
              <Text
                variant="label"
                color="dim"
              >
                default
              </Text>
            </Card>
            <Card variant="elevated">
              <Text
                variant="label"
                color="dim"
              >
                elevated
              </Text>
            </Card>
            <Card variant="sunken">
              <Text
                variant="label"
                color="dim"
              >
                sunken
              </Text>
            </Card>
            <Card variant="ghost">
              <Text
                variant="label"
                color="dim"
              >
                ghost
              </Text>
            </Card>
            <Card variant="accent">
              <Text
                variant="label"
                color="primary"
              >
                accent
              </Text>
            </Card>
            <Card variant="secondary">
              <Text
                variant="label"
                color="secondary"
              >
                secondary
              </Text>
            </Card>
            <Card variant="danger">
              <Text
                variant="label"
                color="danger"
              >
                danger
              </Text>
            </Card>
          </div>
        </section>

        <section style={cardSectionStyle}>
          <h2 style={cardHeadingStyle}>padding (sm / md / lg / xl)</h2>
          <div style={cardStackStyle}>
            <Card padding="sm">
              <Text
                variant="caption"
                color="dim"
              >
                padding: sm (8px)
              </Text>
            </Card>
            <Card padding="md">
              <Text
                variant="caption"
                color="dim"
              >
                padding: md (12px)
              </Text>
            </Card>
            <Card padding="lg">
              <Text
                variant="caption"
                color="dim"
              >
                padding: lg (16px)
              </Text>
            </Card>
            <Card padding="xl">
              <Text
                variant="caption"
                color="dim"
              >
                padding: xl (20px)
              </Text>
            </Card>
          </div>
        </section>

        <section style={cardSectionStyle}>
          <h2 style={cardHeadingStyle}>radius</h2>
          <div style={cardCol2Style}>
            <Card
              radius="sm"
              padding="lg"
            >
              <Text
                variant="label"
                color="dim"
              >
                radius: sm
              </Text>
            </Card>
            <Card
              radius="md"
              padding="lg"
            >
              <Text
                variant="label"
                color="dim"
              >
                radius: md
              </Text>
            </Card>
            <Card
              radius="l"
              padding="lg"
            >
              <Text
                variant="label"
                color="dim"
              >
                radius: l
              </Text>
            </Card>
          </div>
        </section>

        <section style={cardSectionStyle}>
          <h2 style={cardHeadingStyle}>nested (sunken inside default)</h2>
          <Card padding="lg">
            <div style={{ marginBottom: '10px' }}>
              <Text
                variant="heading-3"
                color="text"
                style={{ fontSize: '14px' }}
              >
                外側カード
              </Text>
            </div>
            <Card
              variant="sunken"
              padding="md"
            >
              <Text
                variant="caption"
                color="mid"
              >
                内側 sunken — リスト項目背景などに
              </Text>
            </Card>
          </Card>
        </section>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', maxWidth: '600px' }}>
      {(['elevated', 'flat', 'outline'] as const).map((variant) =>
        (['none', 'sm', 'md', 'lg'] as const).map((padding) => (
          <Card
            key={`${variant}-${padding}`}
            variant={variant}
            padding={padding}
          >
            <div
              style={{
                fontSize: 'var(--fs-caption)',
                color: 'var(--c-text-mid)',
                minWidth: '100px',
              }}
            >
              {variant} / {padding}
            </div>
          </Card>
        ))
      )}
    </div>
  ),
};
