import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';

import type { IconName } from './index';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'close',
        'menu',
        'settings',
        'tower',
        'shield',
        'heart',
        'flame',
        'ice',
        'lightning',
        'skull',
        'spark',
        'target',
        'play',
        'pause',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'chevron-down',
        'check',
        'plus',
        'minus',
        'info',
        'arrow-up',
        'screw',
        'bolt',
        'alloy',
        'laser',
        'cannon',
        'thunder',
        'cutter',
      ],
    },
    size: { control: { type: 'range', min: 12, max: 64, step: 4 } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ---------------------------------------------------------------------------
// showcase 用 共通スタイル (claude design ref と揃える)
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
  margin: '0 0 14px',
};

const cellStyle: CSSProperties = {
  background: 'var(--c-bg-base)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-s)',
  padding: '14px 8px 8px',
  display: 'grid',
  gap: '8px',
  justifyItems: 'center',
  minHeight: '84px',
};

const cellLabel: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '9.5px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
  textAlign: 'center',
};

const sizeRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '80px 1fr',
  gap: '14px',
  padding: '10px 0',
  alignItems: 'center',
  borderTop: '1px dashed var(--c-border-faint)',
};

const sizeRowName: CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '11px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
};

const sizeRowStack: CSSProperties = {
  display: 'inline-flex',
  gap: '16px',
  alignItems: 'baseline',
};

function Section({
  title,
  headingColor = 'var(--c-primary)',
  children,
}: {
  title: string;
  headingColor?: string;
  children: ReactNode;
}) {
  return (
    <section style={sectionStyle}>
      <h2 style={{ ...sectionHeading, color: headingColor }}>{title}</h2>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// 既存 Story (互換維持)
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    name: 'tower',
    size: 32,
    color: '#00d9ff',
  },
};

export const UIIcons: Story = {
  render: () => {
    const uiIcons: IconName[] = [
      'close',
      'menu',
      'settings',
      'play',
      'pause',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'chevron-down',
      'check',
      'plus',
      'minus',
      'info',
      'arrow-up',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {uiIcons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Icon
              name={name}
              size={24}
              color="var(--c-primary)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const GameIcons: Story = {
  render: () => {
    const gameIcons: IconName[] = [
      'tower',
      'shield',
      'heart',
      'flame',
      'ice',
      'lightning',
      'skull',
      'spark',
      'target',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {gameIcons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Icon
              name={name}
              size={28}
              color="var(--c-secondary)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const CurrencyAndWeaponPlaceholders: Story = {
  render: () => {
    const placeholderIcons: IconName[] = [
      'screw',
      'bolt',
      'alloy',
      'laser',
      'cannon',
      'thunder',
      'cutter',
    ];
    return (
      <div
        style={{
          background: 'var(--c-bg-deep)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {placeholderIcons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Icon
              name={name}
              size={28}
              color="var(--c-warning)"
            />
            <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--c-bg-deep)',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-end',
      }}
    >
      {([12, 16, 20, 24, 32, 40, 48] as const).map((s) => (
        <div
          key={s}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Icon
            name="tower"
            size={s}
            color="var(--c-primary)"
          />
          <span style={{ fontSize: '10px', color: 'var(--c-text-dim)' }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 追加 Story (claude design ref 準拠 全カテゴリ網羅)
// ---------------------------------------------------------------------------

const CURRENCY_NAMES: IconName[] = ['screw', 'bolt', 'alloy'];
const WEAPON_NAMES: IconName[] = ['laser', 'cannon', 'thunder', 'cutter'];
const UI_NAMES: IconName[] = [
  'close',
  'menu',
  'settings',
  'play',
  'pause',
  'chevron-right',
  'chevron-left',
  'chevron-down',
  'chevron-up',
  'plus',
  'minus',
  'check',
  'info',
  'arrow-up',
];
const GAME_NAMES: IconName[] = [
  'tower',
  'shield',
  'heart',
  'flame',
  'ice',
  'lightning',
  'skull',
  'spark',
  'target',
];

// --- カテゴリ別 全アイコン一覧 ---

export const AllIconsByCategory: Story = {
  name: '全アイコン (カテゴリ別)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={showcaseRoot}>
      <Section title={`Currency (${CURRENCY_NAMES.length})`}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          {CURRENCY_NAMES.map((n) => (
            <div
              key={n}
              style={{ ...cellStyle, color: 'var(--c-primary)' }}
            >
              <Icon
                name={n}
                size={40}
              />
              <div style={cellLabel}>{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={`Weapon (${WEAPON_NAMES.length})`}
        headingColor="var(--c-warning)"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {WEAPON_NAMES.map((n) => (
            <div
              key={n}
              style={{ ...cellStyle, color: 'var(--c-warning)' }}
            >
              <Icon
                name={n}
                size={40}
              />
              <div style={cellLabel}>{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`UI (${UI_NAMES.length})`}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '10px',
          }}
        >
          {UI_NAMES.map((n) => (
            <div
              key={n}
              style={{ ...cellStyle, color: 'var(--c-text-mid)' }}
            >
              <Icon
                name={n}
                size={28}
              />
              <div style={cellLabel}>{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={`Game (${GAME_NAMES.length})`}
        headingColor="var(--c-secondary)"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '10px',
          }}
        >
          {GAME_NAMES.map((n) => (
            <div
              key={n}
              style={{ ...cellStyle, color: 'var(--c-secondary)' }}
            >
              <Icon
                name={n}
                size={28}
              />
              <div style={cellLabel}>{n}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

// --- size scale (14 / 20 / 28 / 40 px) ---

export const SizeScale: Story = {
  name: 'size scale (14 / 20 / 28 / 40)',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const sizes = [14, 20, 28, 40] as const;
    const icons: IconName[] = ['screw', 'bolt', 'alloy', 'laser', 'cannon', 'thunder', 'cutter'];
    return (
      <div style={showcaseRoot}>
        <Section title="size scale">
          {sizes.map((s, idx) => (
            <div
              key={s}
              style={{
                ...sizeRowStyle,
                borderTop: idx === 0 ? 0 : sizeRowStyle.borderTop,
                paddingTop: idx === 0 ? '4px' : sizeRowStyle.padding,
              }}
            >
              <div style={sizeRowName}>{s} px</div>
              <div style={{ ...sizeRowStack, color: 'var(--c-primary)' }}>
                {icons.map((n) => (
                  <Icon
                    key={n}
                    name={n}
                    size={s}
                  />
                ))}
              </div>
            </div>
          ))}
        </Section>
      </div>
    );
  },
};

// --- color (currentColor 継承) + glow ---

export const ColorAndGlow: Story = {
  name: 'color (currentColor) + glow',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const colors = [
      { name: 'primary (cyan)', color: 'var(--c-primary)', glow: 'var(--glow-cyan-sm)' },
      { name: 'danger (red)', color: 'var(--c-danger)', glow: '0 0 6px rgba(255,90,108,0.55)' },
      {
        name: 'warning (orange)',
        color: 'var(--c-warning)',
        glow: '0 0 6px rgba(246,185,74,0.55)',
      },
      { name: 'screw (yellow)', color: 'var(--c-screw)', glow: '0 0 6px rgba(232,206,123,0.45)' },
      { name: 'success (green)', color: 'var(--c-success)', glow: '0 0 6px rgba(70,226,160,0.55)' },
      { name: 'secondary (purple)', color: 'var(--c-secondary)', glow: 'var(--glow-purple-sm)' },
    ] as const;
    return (
      <div style={showcaseRoot}>
        <Section title="color (currentColor)">
          <div
            style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {colors.map((c) => (
              <div
                key={c.name}
                style={{
                  display: 'grid',
                  gap: '6px',
                  justifyItems: 'center',
                }}
              >
                <span style={{ color: c.color }}>
                  <Icon
                    name="bolt"
                    size={36}
                  />
                </span>
                <div style={cellLabel}>{c.name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="glow on / off (filter: drop-shadow)">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px',
            }}
          >
            {colors.map((c) => (
              <div
                key={`off-${c.name}`}
                style={cellStyle}
              >
                <span style={{ color: c.color }}>
                  <Icon
                    name="bolt"
                    size={32}
                  />
                </span>
                <div style={cellLabel}>off</div>
              </div>
            ))}
            {colors.map((c) => (
              <div
                key={`on-${c.name}`}
                style={cellStyle}
              >
                <span style={{ color: c.color, filter: `drop-shadow(${c.glow})` }}>
                  <Icon
                    name="bolt"
                    size={32}
                  />
                </span>
                <div style={cellLabel}>glow</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};
