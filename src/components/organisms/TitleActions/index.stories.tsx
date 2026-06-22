import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { TitleActions } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { useStore } from '@/store/index';

const meta: Meta<typeof TitleActions> = {
  title: 'Organisms/TitleActions',
  component: TitleActions,
  decorators: [withAppContext('title')],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleActions>;

/** store に createdAt を注入するヘルパー */
function WithSaveState({ hasSave, children }: { hasSave: boolean; children: React.ReactNode }) {
  useEffect(() => {
    useStore.setState({ createdAt: hasSave ? Date.now() : 0 });
  }, [hasSave]);
  return <>{children}</>;
}

/** セーブあり: 「続きから」が primary */
export const WithSave: Story = {
  render: () => (
    <WithSaveState hasSave>
      <TitleActions lastSavedAt="12 分前" />
    </WithSaveState>
  ),
};

/** セーブなし: 「新規開始」が primary */
export const NoSave: Story = {
  render: () => (
    <WithSaveState hasSave={false}>
      <TitleActions />
    </WithSaveState>
  ),
};

/** セーブあり / lastSavedAt なし */
export const WithSaveNoTimestamp: Story = {
  render: () => (
    <WithSaveState hasSave>
      <TitleActions />
    </WithSaveState>
  ),
};
