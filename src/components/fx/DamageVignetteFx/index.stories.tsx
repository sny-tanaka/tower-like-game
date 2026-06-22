import type { Meta, StoryObj } from '@storybook/react';

import { DamageVignetteFx } from './index';

const meta: Meta<typeof DamageVignetteFx> = {
  title: 'Fx/DamageVignetteFx',
  component: DamageVignetteFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    duration: { control: { type: 'range', min: 100, max: 1500, step: 50 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 180,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-m)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--c-text)',
          fontFamily: 'var(--ff-display)',
          fontSize: 18,
        }}
      >
        BATTLE FIELD
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DamageVignetteFx>;

export const Default: Story = {
  args: {
    duration: 420,
  },
  render: (args) => (
    <DamageVignetteFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Slow: Story = {
  args: {
    duration: 900,
  },
  render: (args) => (
    <DamageVignetteFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
