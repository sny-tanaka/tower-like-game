import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { GameSettingsTab } from './index';

import type { TargetFps } from '@/data/schema';
import type { CrashRecord } from '@/lib/diagnostics/crashSnapshot';

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
  const [targetFps, setTargetFps] = useState<TargetFps>(60);
  const [diagnosticsEnabled, setDiagnosticsEnabled] = useState(false);
  return (
    <GameSettingsTab
      overrideTargetFps={targetFps}
      onTargetFpsChange={setTargetFps}
      overrideDiagnosticsEnabled={diagnosticsEnabled}
      onDiagnosticsEnabledChange={setDiagnosticsEnabled}
      overrideCrashLog={[]}
    />
  );
}

/** インタラクティブ版 */
export const Default: Story = {
  render: () => <DefaultStory />,
};

/** FPS 30 (発熱優先) */
export const Fps30: Story = {
  render: () => (
    <GameSettingsTab
      overrideTargetFps={30}
      overrideCrashLog={[]}
    />
  ),
};

/** FPS 45 (バランス) */
export const Fps45: Story = {
  render: () => (
    <GameSettingsTab
      overrideTargetFps={45}
      overrideCrashLog={[]}
    />
  ),
};

// ---------------------------------------------------------------------------
// v1.4.8: 診断モード
// ---------------------------------------------------------------------------

const SAMPLE_CRASH_LOG: CrashRecord[] = [
  {
    tier: 5,
    wave: 30,
    runElapsedSec: 754,
    weapon: 'laser',
    enemyCount: 42,
    fxEventCount: 180,
    heapMB: 512.3,
    appVersion: '1.4.7',
    savedAt: '2026-07-03T12:04:00.000Z',
  },
  {
    tier: 4,
    wave: 22,
    runElapsedSec: 421,
    weapon: 'cannon',
    enemyCount: 18,
    fxEventCount: 96,
    heapMB: 480.1,
    appVersion: '1.4.6',
    savedAt: '2026-07-01T09:12:00.000Z',
  },
];

/** 診断モード ON + クラッシュ記録あり */
export const DiagnosticsWithCrashLog: Story = {
  render: () => (
    <GameSettingsTab
      overrideTargetFps={60}
      overrideDiagnosticsEnabled={true}
      overrideCrashLog={SAMPLE_CRASH_LOG}
    />
  ),
};

/** 診断モード OFF + クラッシュ記録なし */
export const DiagnosticsEmpty: Story = {
  render: () => (
    <GameSettingsTab
      overrideTargetFps={60}
      overrideDiagnosticsEnabled={false}
      overrideCrashLog={[]}
    />
  ),
};
