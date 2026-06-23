import type { Preview } from '@storybook/react-vite';
import '@/index.scss';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      // デザイントークン --c-bg-deep (#04060d) をデフォルト背景に設定
      default: 'deep',
      values: [
        { name: 'deep', value: '#04060d' },
        { name: 'base', value: '#0a0f1c' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    viewport: {
      viewports: {
        iphone12: {
          name: 'iPhone 12',
          styles: {
            width: '390px',
            height: '844px',
          },
          type: 'mobile',
        },
      },
      defaultViewport: 'iphone12',
    },
  },
};

export default preview;
