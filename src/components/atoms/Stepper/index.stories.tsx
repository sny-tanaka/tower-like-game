import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stepper } from './index';

const meta: Meta<typeof Stepper> = {
  title: 'Atoms/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

function ControlledStepper(props: Omit<React.ComponentProps<typeof Stepper>, 'onChange'>) {
  const [value, setValue] = useState(props.value);
  return (
    <Stepper
      {...props}
      value={value}
      onChange={setValue}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 5,
    min: 1,
    max: 10,
    step: 1,
    size: 'md',
    disabled: false,
  },
};

export const AtMin: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 1,
    min: 1,
    max: 10,
    step: 1,
  },
};

export const AtMax: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 10,
    min: 1,
    max: 10,
    step: 1,
  },
};

export const StepByFive: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 5,
    min: 0,
    max: 100,
    step: 5,
  },
};

export const Small: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 3,
    min: 1,
    max: 5,
    size: 'sm',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledStepper {...args} />,
  args: {
    value: 5,
    min: 1,
    max: 10,
    disabled: true,
  },
};
