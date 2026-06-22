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
