import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

import { Icon } from '@/components/atoms/Icon';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    variant: 'primary',
    size: 'md',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// --- Showcase: design ref (design-docs/claude-design/atoms/Button/Button.html) と同等の網羅性 ---

const btnSectionStyle: React.CSSProperties = {
  background: 'var(--c-bg-elev)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
  padding: '18px 20px',
};

const btnHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--ff-display)',
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: 'var(--ls-loose)',
  textTransform: 'uppercase',
  color: 'var(--c-primary)',
  margin: '0 0 14px',
};

const btnRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  alignItems: 'center',
};

const btnGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const btnLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--ff-numeric)',
  fontSize: '10px',
  color: 'var(--c-text-dim)',
  letterSpacing: 'var(--ls-num)',
  width: '70px',
};

export const Showcase: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
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
            BUTTON
          </h1>
          <div style={{ color: 'var(--c-text-dim)', fontSize: '12px', marginTop: '4px' }}>
            primary は最重要動線、secondary は並列選択、danger は破壊的、ghost は副動線。
          </div>
        </header>

        <section style={btnSectionStyle}>
          <h2 style={btnHeadingStyle}>variant × md</h2>
          <div style={btnRowStyle}>
            <Button
              label="出撃"
              variant="primary"
            />
            <Button
              label="切替"
              variant="secondary"
            />
            <Button
              label="撤退"
              variant="danger"
            />
            <Button
              label="戻る"
              variant="ghost"
            />
          </div>
        </section>

        <section style={btnSectionStyle}>
          <h2 style={btnHeadingStyle}>size</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={btnGroupStyle}>
              <span style={btnLabelStyle}>sm 32</span>
              <Button
                label="購入"
                size="sm"
                variant="primary"
              />
              <Button
                label="購入"
                size="sm"
                variant="secondary"
              />
              <Button
                label="リセット"
                size="sm"
                variant="danger"
              />
              <Button
                label="閉じる"
                size="sm"
                variant="ghost"
              />
            </div>
            <div style={btnGroupStyle}>
              <span style={btnLabelStyle}>md 40</span>
              <Button
                label="購入"
                size="md"
                variant="primary"
              />
              <Button
                label="購入"
                size="md"
                variant="secondary"
              />
              <Button
                label="リセット"
                size="md"
                variant="danger"
              />
              <Button
                label="閉じる"
                size="md"
                variant="ghost"
              />
            </div>
            <div style={btnGroupStyle}>
              <span style={btnLabelStyle}>lg 48</span>
              <Button
                label="出撃"
                size="lg"
                variant="primary"
              />
              <Button
                label="武器選択"
                size="lg"
                variant="secondary"
              />
              <Button
                label="撤退する"
                size="lg"
                variant="danger"
              />
              <Button
                label="キャンセル"
                size="lg"
                variant="ghost"
              />
            </div>
          </div>
        </section>

        <section style={btnSectionStyle}>
          <h2 style={btnHeadingStyle}>icon + label</h2>
          <div style={btnRowStyle}>
            <Button
              label="購入"
              variant="primary"
              iconLeft={
                <Icon
                  name="plus"
                  size={16}
                />
              }
            />
            <Button
              label="武器切替"
              variant="secondary"
              iconLeft={
                <Icon
                  name="laser"
                  size={16}
                />
              }
            />
            <Button
              label="設定"
              variant="ghost"
              iconLeft={
                <Icon
                  name="settings"
                  size={16}
                />
              }
            />
            <Button
              label="次へ"
              variant="ghost"
              iconRight={
                <Icon
                  name="chevron-right"
                  size={16}
                />
              }
            />
          </div>
        </section>

        <section style={btnSectionStyle}>
          <h2 style={btnHeadingStyle}>fullWidth (lg)</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <Button
              label="出撃する"
              size="lg"
              variant="primary"
              fullWidth
            />
            <Button
              label="武器庫を開く"
              size="lg"
              variant="secondary"
              fullWidth
              iconLeft={
                <Icon
                  name="thunder"
                  size={18}
                />
              }
            />
            <Button
              label="ラン破棄して撤退"
              size="lg"
              variant="danger"
              fullWidth
            />
          </div>
        </section>

        <section style={btnSectionStyle}>
          <h2 style={btnHeadingStyle}>disabled</h2>
          <div style={btnRowStyle}>
            <Button
              label="購入"
              variant="primary"
              disabled
            />
            <Button
              label="切替"
              variant="secondary"
              disabled
            />
            <Button
              label="撤退"
              variant="danger"
              disabled
            />
            <Button
              label="戻る"
              variant="ghost"
              disabled
            />
          </div>
        </section>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'var(--c-bg-deep)',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          label="Primary"
          variant="primary"
        />
        <Button
          label="Secondary"
          variant="secondary"
        />
        <Button
          label="Danger"
          variant="danger"
        />
        <Button
          label="Ghost"
          variant="ghost"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          label="Small"
          variant="primary"
          size="sm"
        />
        <Button
          label="Medium"
          variant="primary"
          size="md"
        />
        <Button
          label="Large"
          variant="primary"
          size="lg"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          label="Disabled Primary"
          variant="primary"
          disabled
        />
        <Button
          label="Disabled Secondary"
          variant="secondary"
          disabled
        />
      </div>
    </div>
  ),
};
