import type { Preview } from '@storybook/react-vite';
import '@/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
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
