import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { AppearanceBannerFx } from './index';

describe('AppearanceBannerFx', () => {
  test('name が描画される', () => {
    render(<AppearanceBannerFx name="Iron Guardian" />);
    expect(screen.getByText('Iron Guardian')).toBeInTheDocument();
  });

  test('elite の場合 "ELITE" ラベルが表示される', () => {
    render(
      <AppearanceBannerFx
        kind="elite"
        name="Test Elite"
      />
    );
    expect(screen.getByText('ELITE')).toBeInTheDocument();
  });

  test('boss の場合 "BOSS" ラベルが表示される', () => {
    render(
      <AppearanceBannerFx
        kind="boss"
        name="Test Boss"
      />
    );
    expect(screen.getByText('BOSS')).toBeInTheDocument();
  });

  test('デフォルト kind は elite', () => {
    render(<AppearanceBannerFx name="Test" />);
    expect(screen.getByText('ELITE')).toBeInTheDocument();
  });

  test('duration が CSS に反映される', () => {
    const { container } = render(
      <AppearanceBannerFx
        name="Test"
        duration={2000}
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('2000ms');
  });

  test('pointer-events: none を持つ', () => {
    const { container } = render(<AppearanceBannerFx name="Test" />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('pointer-events: none');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<AppearanceBannerFx name="Test" />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('z-index: var(--z-fx-field) が設定される', () => {
    const { container } = render(<AppearanceBannerFx name="Test" />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--z-fx-field)');
  });

  test('elite は warning カラーを使う', () => {
    const { container } = render(
      <AppearanceBannerFx
        kind="elite"
        name="Test"
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--c-warning)');
  });

  test('boss は danger カラーを使う', () => {
    const { container } = render(
      <AppearanceBannerFx
        kind="boss"
        name="Test"
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--c-danger)');
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() =>
      render(
        <AppearanceBannerFx
          name="Test"
          onDone={onDone}
        />
      )
    ).not.toThrow();
  });
});
