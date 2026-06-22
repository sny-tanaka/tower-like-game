import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { BottomSheetHandle } from './index';

describe('BottomSheetHandle', () => {
  test('レンダリングされる', () => {
    const { container } = render(<BottomSheetHandle />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('aria-hidden="true" が付く（装飾要素）', () => {
    const { container } = render(<BottomSheetHandle />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  test('className props が結合される', () => {
    const { container } = render(<BottomSheetHandle className="custom-class" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('custom-class');
  });

  test('ハンドル要素が含まれる', () => {
    const { container } = render(<BottomSheetHandle />);
    const handle = container.querySelector('[class*="handle"]');
    expect(handle).toBeInTheDocument();
  });
});
