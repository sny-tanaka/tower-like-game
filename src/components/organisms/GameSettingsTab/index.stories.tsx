import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { GameSettingsTab } from './index';

import type { TargetFps } from '@/data/schema';

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
  const [targetFps, setTargetFps] = useState<TargetFps>(60);
  return (
    <GameSettingsTab
      overrideVibration={vibration}
      onVibrationChange={setVibration}
      overrideTargetFps={targetFps}
      onTargetFpsChange={setTargetFps}
    />
  );
}

/** インタラクティブ版 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** バイブ OFF */
export const VibrationOff: Story = {
  render: () => (
    <GameSettingsTab
      overrideVibration={false}
      overrideTargetFps={60}
    />
  ),
};

/** FPS 30 (発熱優先) */
export const Fps30: Story = {
  render: () => (
    <GameSettingsTab
      overrideVibration={true}
      overrideTargetFps={30}
    />
  ),
};

/** FPS 45 (バランス) */
export const Fps45: Story = {
  render: () => (
    <GameSettingsTab
      overrideVibration={true}
      overrideTargetFps={45}
    />
  ),
};
