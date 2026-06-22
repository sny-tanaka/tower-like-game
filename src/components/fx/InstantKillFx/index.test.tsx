import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { InstantKillFx } from './index';

describe('InstantKillFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(<InstantKillFx />);
    expect(container.firstChild).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(<InstantKillFx onDone={onDone} />);
    const wrap = container.querySelector<HTMLElement>('div');
    if (wrap) {
      fireEvent.animationEnd(wrap);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('フラッシュ + リングの 2 子要素が存在する', () => {
    const { container } = render(<InstantKillFx />);
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.children.length).toBe(2);
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(<InstantKillFx />);
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
