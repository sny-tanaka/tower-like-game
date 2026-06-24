import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { TierClearFx } from './index';

describe('TierClearFx', () => {
  test('DOM に追加される', () => {
    const { container } = render(<TierClearFx />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  test('duration が CSS 変数 (--tc-duration) に反映される', () => {
    const { container } = render(<TierClearFx duration={2000} />);
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--tc-duration')).toBe('2000ms');
  });

  test('rayDuration が CSS 変数 (--tc-ray-duration) に反映される (duration * 0.85)', () => {
    const { container } = render(<TierClearFx duration={2000} />);
    const wrap = container.firstChild as HTMLElement;
    // 2000 * 0.85 = 1700
    expect(wrap.style.getPropertyValue('--tc-ray-duration')).toBe('1700ms');
  });

  test('4 本の光線が描画される (各 ray div が --tc-a の角度を持つ)', () => {
    const { container } = render(<TierClearFx />);
    const rays = container.querySelectorAll<HTMLElement>('[style*="--tc-a"]');
    expect(rays.length).toBe(4);
    const angles = Array.from(rays).map((r) => r.style.getPropertyValue('--tc-a'));
    expect(angles).toEqual(['0deg', '45deg', '90deg', '135deg']);
  });

  test('2 本のバンドラインが描画される', () => {
    const { container } = render(<TierClearFx />);
    // .band クラスを含む div が 2 つ
    const bands = container.querySelectorAll('[class*="band"]');
    expect(bands.length).toBe(2);
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() => render(<TierClearFx onDone={onDone} />)).not.toThrow();
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<TierClearFx />);
    expect(container.querySelector('style')).toBeNull();
  });
});
