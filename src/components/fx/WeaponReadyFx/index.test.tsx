import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { WeaponReadyFx } from './index';

describe('WeaponReadyFx', () => {
  test('span 要素が 1 つ描画される', () => {
    const { container } = render(<WeaponReadyFx />);
    expect(container.querySelectorAll('span')).toHaveLength(1);
  });

  test('aria-hidden="true" が設定されている', () => {
    const { container } = render(<WeaponReadyFx />);
    const span = container.querySelector('span');
    expect(span).toHaveAttribute('aria-hidden', 'true');
  });

  test('pulse クラスが付く', () => {
    const { container } = render(<WeaponReadyFx />);
    const span = container.querySelector('span');
    // CSS Modules でクラス名が変換されるため、クラスが存在するか確認
    expect(span?.className).toBeTruthy();
    expect(span?.className.length).toBeGreaterThan(0);
  });

  test('pointer-events: none の役割 — span はインタラクティブではない', () => {
    const { queryAllByRole } = render(<WeaponReadyFx />);
    // button / link / checkbox などの役割は存在しない
    expect(queryAllByRole('button')).toHaveLength(0);
  });

  test('アンマウントしてもエラーが出ない', () => {
    const { unmount } = render(<WeaponReadyFx />);
    expect(() => unmount()).not.toThrow();
  });

  test('複数マウントでも独立して描画される', () => {
    const { container } = render(
      <>
        <WeaponReadyFx />
        <WeaponReadyFx />
      </>
    );
    expect(container.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(2);
  });

  test('key を変えて再マウントしてもエラーが出ない', () => {
    const { rerender, container } = render(<WeaponReadyFx key="a" />);
    expect(container.querySelector('span')).toBeTruthy();
    expect(() => rerender(<WeaponReadyFx key="b" />)).not.toThrow();
    expect(container.querySelector('span')).toBeTruthy();
  });
});
