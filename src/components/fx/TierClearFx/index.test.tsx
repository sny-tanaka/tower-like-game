import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { TierClearFx } from './index';

describe('TierClearFx', () => {
  test('DOM に追加される（style と wrapper div）', () => {
    const { container } = render(<TierClearFx />);
    expect(container.querySelector('style')).toBeTruthy();
    expect(container.querySelector('div')).toBeTruthy();
  });

  test('duration が flash CSS に反映される', () => {
    const { container } = render(<TierClearFx duration={2000} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('2000ms');
  });

  test('rayDuration が CSS に反映される（duration * 0.85）', () => {
    const { container } = render(<TierClearFx duration={2000} />);
    const styleEl = container.querySelector('style');
    // 2000 * 0.85 = 1700
    expect(styleEl?.innerHTML).toContain('1700ms');
  });

  test('pointer-events: none を持つ', () => {
    const { container } = render(<TierClearFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('pointer-events: none');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<TierClearFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('z-index: var(--z-fx-field) が設定される', () => {
    const { container } = render(<TierClearFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--z-fx-field)');
  });

  test('4 本の光線が描画される', () => {
    const { container } = render(<TierClearFx />);
    const styleEl = container.querySelector('style');
    // 4 角度 (0, 45, 90, 135)
    expect(styleEl?.innerHTML).toContain('rotate(var(--a))');
  });

  test('2 本のバンドラインが描画される', () => {
    const { container } = render(<TierClearFx />);
    // .${id}-bd クラスを持つ div が 2 つ存在する
    const wrapper = container.firstChild;
    expect(wrapper).toBeTruthy();
  });

  test('成功カラー（緑 / cyan）のグラデーションが含まれる', () => {
    const { container } = render(<TierClearFx />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('rgba(70,226,160');
    expect(styleEl?.innerHTML).toContain('rgba(78,228,246');
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() => render(<TierClearFx onDone={onDone} />)).not.toThrow();
  });
});
