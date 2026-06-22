import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

function ControlledSlider(props: Omit<React.ComponentProps<typeof Slider>, 'onChange'>) {
  const [value, setValue] = useState(props.value);
  return (
    <div style={{ width: 240 }}>
      <Slider
        {...props}
        value={value}
        onChange={setValue}
      />
      <div style={{ color: 'var(--c-text-mid)', fontSize: 12, marginTop: 4 }}>
        {Math.round(value * 100)}%
      </div>
    </div>
  );
}

export const Zero: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: { value: 0 },
};

export const Half: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: { value: 0.5 },
};

export const Full: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: { value: 1 },
};

export const Secondary: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: { value: 0.7, color: 'secondary' },
};

export const Disabled: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: { value: 0.4, disabled: true },
};
