import { createRoot } from 'react-dom/client';

import '@/index.scss';

import App from '@/App';
import { initCrashDetection } from '@/lib/diagnostics/crashSnapshot';
import { NavigationProvider } from '@/store/navigation';
import { hydrateStore, setupAutoSave } from '@/store/sync';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find #root element');

const root = createRoot(container);

// v1.4.8: 「前回のラン中に異常終了 (jetsam / クラッシュ等) したか」 を判定し、
// 記録を確定する。 diagnosticsEnabled (設定トグル) に関わらず常時動作させる
// (コストは localStorage read 数回のみ)。 hydrateStore より前に呼んでも問題ない
// (localStorage のみ参照し、 IndexedDB / store には触れない)。
initCrashDetection();

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
