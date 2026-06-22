import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Page } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { useStore } from '@/store/index';

const meta: Meta<typeof Page> = {
  title: 'Pages/Title',
  component: Page,
  decorators: [withAppContext('title')],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

/** セーブなし: 「新規開始」が primary */
export const NoSave: Story = {
  render: () => {
    useStore.setState({ createdAt: 0 });
    return <Page />;
  },
};

/** セーブあり: 「続きから」が primary */
export const WithSave: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      useStore.setState({ createdAt: Date.now() });
      return () => {
        useStore.setState({ createdAt: 0 });
      };
    }, []);
    return <Page />;
  },
};
