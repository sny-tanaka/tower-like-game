import type { Meta, StoryObj } from '@storybook/react';

import { TitleHero } from './index';

const meta: Meta<typeof TitleHero> = {
  title: 'Organisms/TitleHero',
  component: TitleHero,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleHero>;

export const Default: Story = {};

export const Small: Story = { args: { size: 120 } };
export const Large: Story = { args: { size: 240 } };

export const Shield: Story = { args: { iconName: 'shield' } };
export const Laser: Story = { args: { iconName: 'laser' } };
