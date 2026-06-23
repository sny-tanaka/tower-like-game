import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { ThunderStrikeFx } from './index';

describe('ThunderStrikeFx', () => {
  test('SVG path が描画される', () => {
    const { container } = render(<ThunderStrikeFx />);
    const paths = container.querySelectorAll('path');
    // glow + core の 2 ストローク
    expect(paths.length).toBe(2);
    expect(paths[0]?.getAttribute('d')).toBeTruthy();
  });

  test('strikeMs (= 35% of duration) 後に flash アニメーションが始まる CSS が生成される', () => {
    const { container } = render(<ThunderStrikeFx duration={400} />);
    const styleEl = container.querySelector('style');
    const css = styleEl?.innerHTML ?? '';
    // strikeMs = 140, flashMs = 260
    expect(css).toContain('140ms');
    expect(css).toContain('260ms');
  });

  test('onDone が flash の animationend で呼ばれる経路がある (handler 渡せる)', () => {
    const onDone = vi.fn();
    const { container } = render(<ThunderStrikeFx onDone={onDone} />);
    const flash = container.querySelector('[class*="flash"]') as HTMLElement | null;
    expect(flash).not.toBeNull();
    // 手動で animationend を発火しても呼ばれる
    flash?.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onDone).toHaveBeenCalled();
  });

  test('color が SVG stroke と flash background に反映される', () => {
    const { container } = render(<ThunderStrikeFx color="#ff00ff" />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('#ff00ff');
  });

  test('prefers-reduced-motion: reduce 用 media query が含まれる', () => {
    const { container } = render(<ThunderStrikeFx />);
    expect(container.querySelector('style')?.innerHTML).toContain('prefers-reduced-motion');
  });
});
