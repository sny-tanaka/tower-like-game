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
