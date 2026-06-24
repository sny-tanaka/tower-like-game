import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'docs/',
      'dist/',
      'coverage/',
      'storybook-static/',
      '.claude/worktrees/**',
      'design-docs/claude-design/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Node.js スクリプト用（scripts/*.mjs 等）
  {
    files: ['scripts/**/*.mjs', '*.config.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
          rootDir: '.',
        },
      ],
    },
  },
  // Fx コンポーネント: dangerouslySetInnerHTML 禁止 (Issue #87)
  // インスタンスごとに @keyframes を動的注入すると、 撃破ラッシュ等で <style> タグが
  // 大量に DOM に追加されて CSS パーサ + style recalc コストが発熱寄与する。
  // @keyframes は SCSS module に静的定義し、 インスタンス固有値は CSS 変数で渡す。
  // 構造的に静的化困難な箇所 (例: ScreenSaverFx の items 数依存 keyframes) は
  // 個別 `// eslint-disable-next-line no-restricted-syntax` で許可する。
  {
    files: ['src/components/fx/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="dangerouslySetInnerHTML"]',
          message:
            'Fx 配下では dangerouslySetInnerHTML での @keyframes 動的注入は禁止 (Issue #87)。 @keyframes は style.module.scss に静的定義し、 インスタンス固有値は CSS 変数で渡してください。',
        },
      ],
    },
  }
);
