import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { HealFlashFx } from './index';

describe('HealFlashFx', () => {
  test('DOM に追加される（style と div）', () => {
    const { container } = render(<HealFlashFx />);
    expect(container.querySelector('style')).toBeTruthy();
    expect(container.querySelector('div')).toBeTruthy();
  });

  test('duration が CSS に反映される', () => {
    const { container } = render(<HealFlashFx duration={600} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('600ms');
  });

  test('pointer-events: none を持つ', () => {
    const { container } = render(<HealFlashFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('pointer-events: none');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<HealFlashFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('z-index: var(--z-fx-field) が設定される', () => {
    const { container } = render(<HealFlashFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--z-fx-field)');
  });

  test('緑系のフラッシュ背景が含まれる（success カラー rgba(70,226,160,...)）', () => {
    const { container } = render(<HealFlashFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('rgba(70,226,160');
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() => render(<HealFlashFx onDone={onDone} />)).not.toThrow();
  });
});
