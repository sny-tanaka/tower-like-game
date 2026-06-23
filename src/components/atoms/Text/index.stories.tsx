import type { Meta, StoryObj } from '@storybook/react';

import type { TextColor, TextVariant } from './index';
import { Text } from './index';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-1',
        'heading-2',
        'heading-3',
        'body',
        'caption',
        'label',
        'numeric-l',
        'numeric-m',
        'numeric-s',
      ],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'text',
        'mid',
        'dim',
        'disabled',
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    truncate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
  args: {
    variant: 'heading-1',
    children: 'Tower Defense',
    color: 'primary',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'heading-2',
    children: 'Machine Upgrade',
    color: 'default',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'heading-3',
    children: 'Weapons',
    color: 'default',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Defend your tower against endless waves of enemies.',
    color: 'default',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Wave 42 / Tier 3',
    color: 'dim',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Attack Power',
    color: 'mid',
  },
};

export const NumericLarge: Story = {
  args: {
    variant: 'numeric-l',
    children: '150.5B',
    color: 'primary',
  },
};

export const NumericMedium: Story = {
  args: {
    variant: 'numeric-m',
    children: '12.3A',
    color: 'default',
  },
};

export const NumericSmall: Story = {
  args: {
    variant: 'numeric-s',
    children: '999',
    color: 'secondary',
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: TextVariant[] = [
      'heading-1',
      'heading-2',
      'heading-3',
      'body',
      'caption',
      'label',
      'numeric-l',
      'numeric-m',
      'numeric-s',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {variants.map((v) => (
          <Text
            key={v}
            variant={v}
          >
            {v} — Sample Text
          </Text>
        ))}
      </div>
    );
  },
};

export const Truncate: Story = {
  name: 'truncate（末尾省略）',
  render: () => (
    <div
      style={{
        width: 280,
        background: 'var(--c-bg-base)',
        border: '1px solid var(--c-border-faint)',
        borderRadius: 'var(--r-s)',
        padding: 10,
      }}
    >
      <Text
        variant="body"
        truncate
      >
        このテキストは 1 行に収まりきらない長さで、末尾は省略される仕様です。
      </Text>
    </div>
  ),
};

export const Align: Story = {
  name: 'align',
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 280 }}>
      <Text
        variant="body"
        align="left"
      >
        左揃え (default)
      </Text>
      <Text
        variant="body"
        align="center"
      >
        中央揃え
      </Text>
      <Text
        variant="body"
        align="right"
      >
        右揃え
      </Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => {
    const colors: TextColor[] = [
      'default',
      'mid',
      'dim',
      'disabled',
      'primary',
      'secondary',
      'danger',
      'success',
      'warning',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {colors.map((c) => (
          <Text
            key={c}
            variant="body"
            color={c}
          >
            {c} — Neon Cyber Future
          </Text>
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Showcase — design ref と同等の網羅性
// ---------------------------------------------------------------------------

const SECTION_TITLE_STYLE = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--c-text-dim)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  marginBottom: 8,
};

const SECTION_STYLE = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
  padding: 16,
  background: 'var(--c-bg-base)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
};

export const Showcase: Story = {
  name: 'Showcase（network）',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const variants: TextVariant[] = [
      'heading-1',
      'heading-2',
      'heading-3',
      'body',
      'caption',
      'label',
      'numeric-l',
      'numeric-m',
      'numeric-s',
    ];
    const colors: TextColor[] = [
      'default',
      'mid',
      'dim',
      'disabled',
      'primary',
      'secondary',
      'danger',
      'success',
      'warning',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          minHeight: '100vh',
        }}
      >
        {/* Variants */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Variants</div>
          {variants.map((v) => (
            <div
              key={v}
              style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--c-text-dim)',
                  width: 80,
                  flex: 'none',
                  fontFamily: 'var(--ff-numeric)',
                }}
              >
                {v}
              </span>
              <Text variant={v}>{v.startsWith('numeric') ? '1,234.56' : 'Tower Like Game'}</Text>
            </div>
          ))}
        </section>

        {/* Colors */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Colors (9 種)</div>
          {colors.map((c) => (
            <div
              key={c}
              style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--c-text-dim)',
                  width: 80,
                  flex: 'none',
                  fontFamily: 'var(--ff-numeric)',
                }}
              >
                {c}
              </span>
              <Text
                variant="body"
                color={c}
              >
                Neon Cyber Future — {c}
              </Text>
            </div>
          ))}
        </section>

        {/* Align */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Align</div>
          <div style={{ display: 'grid', gap: 6, width: 320 }}>
            <Text
              variant="body"
              align="left"
            >
              left — 左揃え (default)
            </Text>
            <Text
              variant="body"
              align="center"
            >
              center — 中央揃え
            </Text>
            <Text
              variant="body"
              align="right"
            >
              right — 右揃え
            </Text>
          </div>
        </section>

        {/* Truncate */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Truncate</div>
          <div
            style={{
              width: 240,
              padding: 8,
              background: 'var(--c-bg-deep)',
              border: '1px solid var(--c-border-faint)',
              borderRadius: 'var(--r-s)',
            }}
          >
            <Text
              variant="body"
              truncate
            >
              このテキストは 1 行に収まりきらない長さで、末尾は省略される仕様です。
            </Text>
          </div>
        </section>

        {/* Label tracking */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Label tracking (UPPER + letter-spacing)</div>
          <Text
            variant="label"
            color="mid"
          >
            Attack Power
          </Text>
          <Text
            variant="label"
            color="primary"
          >
            Wave Cleared
          </Text>
          <Text
            variant="label"
            color="dim"
          >
            Tier · Rarity · Slot
          </Text>
        </section>

        {/* Heading / Numeric font tokens */}
        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Heading font (ff-display)</div>
          <Text variant="heading-1">Tower Defense</Text>
          <Text variant="heading-2">Machine Upgrade</Text>
          <Text variant="heading-3">Weapons Loadout</Text>
        </section>

        <section style={SECTION_STYLE}>
          <div style={SECTION_TITLE_STYLE}>Numeric font (ff-numeric, tabular-nums)</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <Text
              variant="numeric-l"
              color="primary"
            >
              150.5B
            </Text>
            <Text
              variant="numeric-m"
              color="default"
            >
              12.3A
            </Text>
            <Text
              variant="numeric-s"
              color="secondary"
            >
              999
            </Text>
          </div>
        </section>
      </div>
    );
  },
};
