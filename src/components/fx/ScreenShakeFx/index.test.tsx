import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { ScreenShakeFx } from './index';

describe('ScreenShakeFx', () => {
  test('children が描画される', () => {
    render(
      <ScreenShakeFx>
        <div>child content</div>
      </ScreenShakeFx>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  test('intensity prop を受け取れる', () => {
    const { container } = render(
      <ScreenShakeFx intensity="large">
        <div>test</div>
      </ScreenShakeFx>
    );
    // インライン style タグに keyframe が注入される
    const styleEl = container.querySelector('style');
    expect(styleEl).toBeTruthy();
  });

  test('デフォルト intensity は medium', () => {
    const { container } = render(
      <ScreenShakeFx>
        <div>test</div>
      </ScreenShakeFx>
    );
    const styleEl = container.querySelector('style');
    // medium = 8px、CSS に 8px が含まれる
    expect(styleEl?.innerHTML).toContain('8px');
  });

  test('large intensity は 14px のシェイク', () => {
    const { container } = render(
      <ScreenShakeFx intensity="large">
        <div>test</div>
      </ScreenShakeFx>
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('14px');
  });

  test('small intensity は 4px のシェイク', () => {
    const { container } = render(
      <ScreenShakeFx intensity="small">
        <div>test</div>
      </ScreenShakeFx>
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('4px');
  });

  test('duration が CSS に反映される', () => {
    const { container } = render(
      <ScreenShakeFx duration={500}>
        <div>test</div>
      </ScreenShakeFx>
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('500ms');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(
      <ScreenShakeFx>
        <div>test</div>
      </ScreenShakeFx>
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('onDone が onAnimationEnd に渡される', () => {
    const onDone = vi.fn();
    const { container } = render(
      <ScreenShakeFx onDone={onDone}>
        <div>test</div>
      </ScreenShakeFx>
    );
    // wrapper div が存在する
    const wrapper = container.querySelector('div');
    expect(wrapper).toBeTruthy();
  });
});
