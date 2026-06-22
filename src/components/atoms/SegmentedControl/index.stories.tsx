import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SegmentedControl } from './index';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Atoms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const speedOptions = [
  { label: '×1', value: 1 },
  { label: '×2', value: 2 },
];

const tierOptions = [
  { label: 'T1', value: 'tier1' },
  { label: 'T2', value: 'tier2' },
  { label: 'T3', value: 'tier3' },
];

const diffOptions = [
  { label: '低', value: 'easy' },
  { label: '中', value: 'normal' },
  { label: '高', value: 'hard' },
  { label: '超', value: 'extra' },
  { label: '極', value: 'extreme' },
];

function ControlledSpeed() {
  const [v, setV] = useState<number>(1);
  return (
    <SegmentedControl
      options={speedOptions}
      value={v}
      onChange={setV}
    />
  );
}

function ControlledTier() {
  const [v, setV] = useState('tier1');
  return (
    <SegmentedControl
      options={tierOptions}
      value={v}
      onChange={setV}
    />
  );
}

function ControlledDiff() {
  const [v, setV] = useState('normal');
  return (
    <SegmentedControl
      options={diffOptions}
      value={v}
      onChange={setV}
    />
  );
}

export const TwoOptions: Story = {
  render: () => <ControlledSpeed />,
};

export const ThreeOptions: Story = {
  render: () => <ControlledTier />,
};

export const FiveOptions: Story = {
  render: () => <ControlledDiff />,
};

function ControlledSmall() {
  const [v, setV] = useState('tier1');
  return (
    <SegmentedControl
      options={tierOptions}
      value={v}
      onChange={setV}
      size="sm"
    />
  );
}

export const Small: Story = {
  render: () => <ControlledSmall />,
};

export const Disabled: Story = {
  render: () => (
    <SegmentedControl
      options={tierOptions}
      value="tier2"
      onChange={() => {}}
      disabled
    />
  ),
};
