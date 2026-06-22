import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { GameSettingsTab } from './index';

const meta: Meta<typeof GameSettingsTab> = {
  title: 'Organisms/GameSettingsTab',
  component: GameSettingsTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof GameSettingsTab>;

function DefaultStory() {
  const [vibration, setVibration] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 3>(1);
  return (
    <GameSettingsTab
      overrideVibration={vibration}
      overrideSpeed={speed}
      onVibrationChange={setVibration}
      onSpeedChange={setSpeed}
    />
  );
}

/** インタラクティブ版 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** バイブ OFF + 速度×3 */
export const VibrationOffSpeed3: Story = {
  render: () => (
    <GameSettingsTab
      overrideVibration={false}
      overrideSpeed={3}
    />
  ),
};
