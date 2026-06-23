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
  return (
    <GameSettingsTab
      overrideVibration={vibration}
      onVibrationChange={setVibration}
    />
  );
}

/** インタラクティブ版 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** バイブ OFF */
export const VibrationOff: Story = {
  render: () => <GameSettingsTab overrideVibration={false} />,
};
