import { createRoot } from 'react-dom/client';

import '@/index.scss';

import App from '@/App';
import { NavigationProvider } from '@/store/navigation';
import { hydrateStore, setupAutoSave } from '@/store/sync';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find #root element');

const root = createRoot(container);

// IndexedDB から store を復元してから render。
// 失敗してもアプリは起動させる (デフォルト値で動作)。
hydrateStore()
  .catch((err) => {
    console.error('[hydrateStore] failed', err);
  })
  .finally(() => {
    setupAutoSave();
    root.render(
      <NavigationProvider>
        <App />
      </NavigationProvider>
    );
  });
