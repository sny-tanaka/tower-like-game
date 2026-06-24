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

  test('duration が CSS 変数 (--app-duration) に反映される', () => {
    const { container } = render(
      <AppearanceBannerFx
        name="Test"
        duration={2000}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--app-duration')).toBe('2000ms');
  });

  test('elite は warning カラーを CSS 変数 (--app-color) に渡す', () => {
    const { container } = render(
      <AppearanceBannerFx
        kind="elite"
        name="Test"
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--app-color')).toBe('var(--c-warning)');
  });

  test('boss は danger カラーを CSS 変数 (--app-color) に渡す', () => {
    const { container } = render(
      <AppearanceBannerFx
        kind="boss"
        name="Test"
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--app-color')).toBe('var(--c-danger)');
  });

  test('battle-start は primary カラーを CSS 変数 (--app-color) に渡す', () => {
    const { container } = render(<AppearanceBannerFx kind="battle-start" />);
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--app-color')).toBe('var(--c-primary)');
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

  test('battle-start: "BATTLE START" ラベルが表示される', () => {
    render(<AppearanceBannerFx kind="battle-start" />);
    expect(screen.getByText('BATTLE START')).toBeInTheDocument();
  });

  test('battle-start: name 省略時は副題テキストが描画されない', () => {
    const { container } = render(<AppearanceBannerFx kind="battle-start" />);
    // ラベル "BATTLE START" 以外の Text 要素は出ない
    const texts = container.querySelectorAll('[class*="-name"]');
    expect(texts).toHaveLength(0);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<AppearanceBannerFx name="Test" />);
    expect(container.querySelector('style')).toBeNull();
  });
});
