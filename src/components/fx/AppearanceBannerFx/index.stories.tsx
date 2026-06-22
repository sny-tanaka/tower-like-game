import type { Meta, StoryObj } from '@storybook/react';

import { AppearanceBannerFx } from './index';

const meta: Meta<typeof AppearanceBannerFx> = {
  title: 'Fx/AppearanceBannerFx',
  component: AppearanceBannerFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    kind: { control: 'select', options: ['elite', 'boss'] },
    name: { control: 'text' },
    duration: { control: { type: 'range', min: 400, max: 4000, step: 100 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 300,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-m)',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppearanceBannerFx>;

export const Elite: Story = {
  args: {
    kind: 'elite',
    name: 'Iron Guardian',
    duration: 1600,
  },
  render: (args) => (
    <AppearanceBannerFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const Boss: Story = {
  args: {
    kind: 'boss',
    name: 'DEMON OVERLORD',
    duration: 1600,
  },
  render: (args) => (
    <AppearanceBannerFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};

export const BossLongName: Story = {
  args: {
    kind: 'boss',
    name: 'THE ANCIENT MECHANICAL DRAGON',
    duration: 1600,
  },
  render: (args) => (
    <AppearanceBannerFx
      key={JSON.stringify(args)}
      {...args}
    />
  ),
};
