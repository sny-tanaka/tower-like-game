import type { Meta, StoryObj } from '@storybook/react';

import { ScreenShakeFx } from './index';

const meta: Meta<typeof ScreenShakeFx> = {
  title: 'Fx/ScreenShakeFx',
  component: ScreenShakeFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    intensity: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    duration: { control: { type: 'range', min: 100, max: 1000, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof ScreenShakeFx>;

const Inner = () => (
  <div
    style={{
      width: 320,
      height: 180,
      background: 'var(--c-bg-elev)',
      border: '1px solid var(--c-border)',
      borderRadius: 'var(--r-m)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--c-text)',
      fontFamily: 'var(--ff-display)',
      fontSize: 18,
    }}
  >
    BATTLE FIELD
  </div>
);

export const Small: Story = {
  args: {
    intensity: 'small',
    duration: 360,
  },
  render: (args) => (
    <ScreenShakeFx
      key={JSON.stringify(args)}
      {...args}
    >
      <Inner />
    </ScreenShakeFx>
  ),
};

export const Medium: Story = {
  args: {
    intensity: 'medium',
    duration: 360,
  },
  render: (args) => (
    <ScreenShakeFx
      key={JSON.stringify(args)}
      {...args}
    >
      <Inner />
    </ScreenShakeFx>
  ),
};

export const Large: Story = {
  args: {
    intensity: 'large',
    duration: 360,
  },
  render: (args) => (
    <ScreenShakeFx
      key={JSON.stringify(args)}
      {...args}
    >
      <Inner />
    </ScreenShakeFx>
  ),
};

export const AllIntensities: Story = {
  name: 'All intensities（順番に再生）',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['small', 'medium', 'large'] as const).map((intensity) => (
        <ScreenShakeFx
          key={intensity}
          intensity={intensity}
          duration={360}
        >
          <Inner />
        </ScreenShakeFx>
      ))}
    </div>
  ),
};
