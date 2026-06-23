import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Toggle } from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    accent: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

function ControlledToggle(props: Omit<React.ComponentProps<typeof Toggle>, 'onChange'>) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <Toggle
      {...props}
      checked={checked}
      onChange={setChecked}
    />
  );
}

export const Off: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: false },
};

export const On: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: true },
};

export const WithLabel: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: false, label: 'バイブレーション' },
};

export const WithLabelOn: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: true, label: 'BGM' },
};

export const DisabledOff: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: false, disabled: true, label: '無効 (OFF)' },
};

export const DisabledOn: Story = {
  render: (args) => <ControlledToggle {...args} />,
  args: { checked: true, disabled: true, label: '無効 (ON)' },
};

function AccentVariantsDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked={a}
          onChange={setA}
          accent="primary"
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>primary · {String(a)}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked={b}
          onChange={setB}
          accent="secondary"
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>secondary · {String(b)}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked={c}
          onChange={setC}
          accent="success"
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>success · {String(c)}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked
          onChange={() => {}}
          disabled
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>disabled on</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked={false}
          onChange={() => {}}
          disabled
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>disabled off</span>
      </div>
    </div>
  );
}

export const AccentVariants: Story = {
  name: 'accent × state (md)',
  render: () => <AccentVariantsDemo />,
};

export const SizeVariants: Story = {
  name: 'size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked
          size="sm"
          onChange={() => {}}
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>sm</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Toggle
          checked
          size="md"
          onChange={() => {}}
        />
        <span style={{ fontSize: 11, color: 'var(--c-text-dim)' }}>md (default)</span>
      </div>
    </div>
  ),
};

function WithDescriptionDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle
        checked={a}
        onChange={setA}
        label="バイブレーション"
        description="ヒット時の振動フィードバック"
        accent="primary"
      />
      <Toggle
        checked={b}
        onChange={setB}
        label="アクティブ自動発動"
        description="CD 明けで自動発動 (バトル中の挙動)"
        accent="secondary"
      />
    </div>
  );
}

export const WithDescription: Story = {
  name: 'label + description',
  render: () => <WithDescriptionDemo />,
};

// ---------------------------------------------------------------------------
// Showcase — design ref と同等の網羅性
// ---------------------------------------------------------------------------

const SHOWCASE_SECTION_TITLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--c-text-dim)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: 8,
};

const SHOWCASE_SECTION: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 16,
  background: 'var(--c-bg-base)',
  border: '1px solid var(--c-border-faint)',
  borderRadius: 'var(--r-m)',
};

const SHOWCASE_ROW: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
};

const SHOWCASE_CAPTION: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--c-text-dim)',
  fontFamily: 'var(--ff-numeric)',
  minWidth: 140,
};

function ShowcaseToggleRow({
  label,
  checked,
  accent,
  size,
  disabled,
}: {
  label: string;
  checked: boolean;
  accent?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md';
  disabled?: boolean;
}) {
  const [c, setC] = useState(checked);
  return (
    <div style={SHOWCASE_ROW}>
      <Toggle
        checked={c}
        onChange={setC}
        accent={accent}
        size={size}
        disabled={disabled}
      />
      <span style={SHOWCASE_CAPTION}>{label}</span>
    </div>
  );
}

export const Showcase: Story = {
  name: 'Showcase（network）',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
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
      {/* accent × state */}
      <section style={SHOWCASE_SECTION}>
        <div style={SHOWCASE_SECTION_TITLE}>accent × state (md)</div>
        <ShowcaseToggleRow
          label="primary · on"
          checked
          accent="primary"
        />
        <ShowcaseToggleRow
          label="primary · off"
          checked={false}
          accent="primary"
        />
        <ShowcaseToggleRow
          label="secondary · on"
          checked
          accent="secondary"
        />
        <ShowcaseToggleRow
          label="secondary · off"
          checked={false}
          accent="secondary"
        />
        <ShowcaseToggleRow
          label="success · on"
          checked
          accent="success"
        />
        <ShowcaseToggleRow
          label="success · off"
          checked={false}
          accent="success"
        />
        <ShowcaseToggleRow
          label="disabled · on"
          checked
          disabled
        />
        <ShowcaseToggleRow
          label="disabled · off"
          checked={false}
          disabled
        />
      </section>

      {/* size */}
      <section style={SHOWCASE_SECTION}>
        <div style={SHOWCASE_SECTION_TITLE}>size</div>
        <ShowcaseToggleRow
          label="sm · on"
          checked
          size="sm"
        />
        <ShowcaseToggleRow
          label="sm · off"
          checked={false}
          size="sm"
        />
        <ShowcaseToggleRow
          label="md · on (default)"
          checked
          size="md"
        />
        <ShowcaseToggleRow
          label="md · off (default)"
          checked={false}
          size="md"
        />
      </section>

      {/* label + description */}
      <section style={SHOWCASE_SECTION}>
        <div style={SHOWCASE_SECTION_TITLE}>label + description</div>
        <ShowcaseLabelDescriptionDemo />
      </section>
    </div>
  ),
};

function ShowcaseLabelDescriptionDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toggle
        checked={a}
        onChange={setA}
        label="バイブレーション"
        description="ヒット時の振動フィードバック"
        accent="primary"
      />
      <Toggle
        checked={b}
        onChange={setB}
        label="アクティブ自動発動"
        description="CD 明けで自動発動 (バトル中の挙動)"
        accent="secondary"
      />
      <Toggle
        checked={c}
        onChange={setC}
        label="自動セーブ"
        description="一定間隔で進捗を保存"
        accent="success"
      />
      <Toggle
        checked
        onChange={() => {}}
        label="ロック済み機能"
        description="アンロック条件を満たすと開放"
        disabled
      />
    </div>
  );
}
