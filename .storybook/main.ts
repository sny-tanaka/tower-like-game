import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

/**
 * PWA が提供する `virtual:pwa-register/react` をストーリーブック用にスタブ化する。
 * Storybook では PWA プラグインを除外しているため、この仮想モジュールが解決されず
 * ビルドエラーになる。no-op の useRegisterSW を返して動かなくする。
 */
function pwaStubPlugin(): Plugin {
  const moduleId = 'virtual:pwa-register/react';
  const resolvedId = `\0${moduleId}`;
  return {
    name: 'storybook-pwa-stub',
    resolveId(id) {
      if (id === moduleId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      return `
        export function useRegisterSW(_opts) {
          return {
            needRefresh: [false, () => {}],
            offlineReady: [false, () => {}],
            updateServiceWorker: async () => {},
          };
        }
      `;
    },
  };
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  // Storybook は ../vite.config.ts を自動継承するが、PWA プラグインは Storybook の
  // ランタイムバンドルが precache 上限(2MB)を超えてビルドを落とすため除外する。
  // (PWA は本番アプリ用であり Storybook では不要)
  viteFinal: async (viteConfig) => {
    const flat = (await Promise.all((viteConfig.plugins ?? []).flat(Infinity))).flat(Infinity);
    const filtered = flat.filter((plugin) => {
      const name =
        plugin && typeof plugin === 'object' && 'name' in plugin ? String(plugin.name) : '';
      return !name.includes('pwa') && !name.includes('workbox');
    });
    // PWA 仮想モジュールのスタブを先頭に追加
    viteConfig.plugins = [pwaStubPlugin(), ...filtered];
    return viteConfig;
  },
};
export default config;
