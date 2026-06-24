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

  test('strikeMs (= 35% of duration) が CSS 変数 (--thn-strike-duration) に反映される', () => {
    const { container } = render(<ThunderStrikeFx duration={400} />);
    // strikeMs = 140
    const svg = container.querySelector('svg') as SVGElement;
    expect(svg.style.getPropertyValue('--thn-strike-duration')).toBe('140ms');
  });

  test('flashMs (= 65% of duration) が CSS 変数 (--thn-flash-duration) に反映される', () => {
    const { container } = render(<ThunderStrikeFx duration={400} />);
    // flashMs = 260
    const flash = container.querySelector('[class*="flash"]') as HTMLElement;
    expect(flash.style.getPropertyValue('--thn-flash-duration')).toBe('260ms');
  });

  test('onDone が flash の animationend で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(<ThunderStrikeFx onDone={onDone} />);
    const flash = container.querySelector('[class*="flash"]') as HTMLElement | null;
    expect(flash).not.toBeNull();
    flash?.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onDone).toHaveBeenCalled();
  });

  test('color が CSS 変数 (--thn-color) に反映される', () => {
    const { container } = render(<ThunderStrikeFx color="#ff00ff" />);
    const flash = container.querySelector('[class*="flash"]') as HTMLElement;
    expect(flash.style.getPropertyValue('--thn-color')).toBe('#ff00ff');
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<ThunderStrikeFx />);
    expect(container.querySelector('style')).toBeNull();
  });
});
