import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { DamageVignetteFx } from './index';

describe('DamageVignetteFx', () => {
  test('DOM に追加される（style と div）', () => {
    const { container } = render(<DamageVignetteFx />);
    expect(container.querySelector('style')).toBeTruthy();
    expect(container.querySelector('div')).toBeTruthy();
  });

  test('duration が CSS に反映される', () => {
    const { container } = render(<DamageVignetteFx duration={800} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('800ms');
  });

  test('pointer-events: none を持つ', () => {
    const { container } = render(<DamageVignetteFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('pointer-events: none');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<DamageVignetteFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('z-index: var(--z-fx-field) が設定される', () => {
    const { container } = render(<DamageVignetteFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--z-fx-field)');
  });

  test('赤系のビネット背景が含まれる', () => {
    const { container } = render(<DamageVignetteFx />);
    const styleEl = container.querySelector('style');
    // danger カラー rgba(255,77,109,...) が設定される
    expect(styleEl?.innerHTML).toContain('rgba(255,77,109');
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() => render(<DamageVignetteFx onDone={onDone} />)).not.toThrow();
  });
});
