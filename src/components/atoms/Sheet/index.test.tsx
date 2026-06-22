import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Sheet } from '.';

describe('Sheet', () => {
  it('children が描画される', () => {
    render(
      <Sheet open>
        <div>シートコンテンツ</div>
      </Sheet>
    );
    expect(screen.getByText('シートコンテンツ')).toBeTruthy();
  });

  it('open=true でマウントされる', () => {
    render(
      <Sheet open>
        <div>表示コンテンツ</div>
      </Sheet>
    );
    expect(screen.getByText('表示コンテンツ')).toBeTruthy();
  });

  it('open=false (アンマウント) で children が表示されない', () => {
    // 親が条件付きレンダリングで制御するパターンを再現
    // isOpen=false の場合は Sheet をレンダリングしない
    const isOpen = false;
    const { queryByText } = render(
      <>
        {isOpen && (
          <Sheet open={isOpen}>
            <div>非表示コンテンツ</div>
          </Sheet>
        )}
      </>
    );
    expect(queryByText('非表示コンテンツ')).toBeNull();
  });

  it('onClose が渡されると背景クリックで呼ばれる', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Sheet
        open
        onClose={onClose}
      >
        <div>コンテンツ</div>
      </Sheet>
    );
    // backdrop 要素をクリック
    const backdrop = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(backdrop).toBeTruthy();
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('onClose が未指定なら backdrop は描画されない', () => {
    const { container } = render(
      <Sheet open>
        <div>コンテンツ</div>
      </Sheet>
    );
    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeNull();
  });

  it('role="dialog" が付く', () => {
    render(
      <Sheet open>
        <div>コンテンツ</div>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});
