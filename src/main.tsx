import { createRoot } from 'react-dom/client';

import App from '@/App';
import { NavigationProvider } from '@/store/navigation';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find #root element');

createRoot(container).render(
  <NavigationProvider>
    <App />
  </NavigationProvider>
);
