import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FreezeFx } from './index';

describe('FreezeFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <FreezeFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('SVG 要素が描画される', () => {
    const { container } = render(
      <FreezeFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });

  test('x/y % が wrap の style に反映される', () => {
    const { container } = render(
      <FreezeFx
        x={30}
        y={70}
      />
    );
    const wrap = container.querySelector<HTMLElement>('[style]');
    expect(wrap?.style.left).toBe('30%');
    expect(wrap?.style.top).toBe('70%');
  });

  test('スノーフレーク 3 本ラインが描画される', () => {
    const { container } = render(
      <FreezeFx
        x={50}
        y={50}
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(3);
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <FreezeFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
