import type { Meta, StoryObj } from '@storybook/react';

import { ScreenSaverFx } from './index';

import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';

const meta: Meta<typeof ScreenSaverFx> = {
  title: 'Fx/ScreenSaverFx',
  component: ScreenSaverFx,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    showTower: { control: 'boolean' },
    cycleSeconds: { control: { type: 'range', min: 4, max: 60, step: 2 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 640,
          background: 'var(--c-bg-deep)',
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
type Story = StoryObj<typeof ScreenSaverFx>;

export const WithTower: Story = {
  args: {
    showTower: true,
    cycleSeconds: 24,
    towerContent: (
      <Icon
        name="tower"
        size={40}
        color="var(--c-primary-hi)"
      />
    ),
    items: [
      <Text
        key="wave"
        variant="numeric-l"
        color="primary"
        style={{ opacity: 0.6, fontSize: 16 }}
      >
        WAVE 42
      </Text>,
      <Text
        key="tier"
        variant="label"
        color="secondary"
        style={{ opacity: 0.5, fontSize: 11 }}
      >
        T3 CLEARED
      </Text>,
      <Text
        key="dmg"
        variant="numeric-m"
        color="mid"
        style={{ opacity: 0.4, fontSize: 14 }}
      >
        1.25B DMG
      </Text>,
    ],
  },
};

export const WithItems: Story = {
  args: {
    showTower: false,
    cycleSeconds: 18,
    items: [
      <Text
        key="title"
        variant="numeric-l"
        color="primary"
        style={{ opacity: 0.7, fontSize: 20 }}
      >
        TOWER GAME
      </Text>,
      <Text
        key="idle"
        variant="label"
        color="secondary"
        style={{ opacity: 0.6, fontSize: 13 }}
      >
        IDLE
      </Text>,
      <Text
        key="continue"
        variant="caption"
        color="dim"
        style={{ opacity: 0.5, fontSize: 11 }}
      >
        TOUCH TO CONTINUE
      </Text>,
    ],
  },
};

export const Empty: Story = {
  args: {
    showTower: true,
    cycleSeconds: 24,
    towerContent: (
      <Icon
        name="tower"
        size={48}
        color="var(--c-primary-hi)"
      />
    ),
    items: [],
  },
};
