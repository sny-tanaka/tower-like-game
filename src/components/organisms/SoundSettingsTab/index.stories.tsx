import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SoundSettingsTab } from './index';

const meta: Meta<typeof SoundSettingsTab> = {
  title: 'Organisms/SoundSettingsTab',
  component: SoundSettingsTab,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SoundSettingsTab>;

function DefaultStory() {
  const [bgm, setBgm] = useState(0.8);
  const [se, setSe] = useState(0.7);
  const [muted, setMuted] = useState(false);
  return (
    <SoundSettingsTab
      overrideBgmVolume={bgm}
      overrideSeVolume={se}
      overrideMute={muted}
      onBgmChange={setBgm}
      onSeChange={setSe}
      onMuteChange={setMuted}
    />
  );
}

function MutedStory() {
  const [bgm, setBgm] = useState(0.8);
  const [se, setSe] = useState(0.7);
  const [muted, setMuted] = useState(true);
  return (
    <SoundSettingsTab
      overrideBgmVolume={bgm}
      overrideSeVolume={se}
      overrideMute={muted}
      onBgmChange={setBgm}
      onSeChange={setSe}
      onMuteChange={setMuted}
    />
  );
}

/** インタラクティブ版 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** ミュート状態 */
export const Muted: Story = {
  render: () => <MutedStory />,
};
