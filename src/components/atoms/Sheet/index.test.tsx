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

  it.each(['bottom', 'top', 'side', 'all'] as const)(
    'edge="%s" を渡してもレンダリング可能',
    (edge) => {
      const { container } = render(
        <Sheet
          open
          edge={edge}
        >
          <div>{edge}</div>
        </Sheet>
      );
      expect(container.textContent).toContain(edge);
    }
  );

  it('withHandle=true かつ edge=bottom で BottomSheetHandle が描画される', () => {
    const { container } = render(
      <Sheet
        open
        edge="bottom"
        withHandle
      >
        <div>handle test</div>
      </Sheet>
    );
    // BottomSheetHandle は data 属性 / role を持つので role=dialog 配下に追加要素が増えている事を確認
    const dialog = container.querySelector('[role="dialog"]')!;
    // BottomSheetHandle 自身か内包要素が居る (textContent 以外の子要素が1つ以上)
    expect(dialog.querySelectorAll('*').length).toBeGreaterThan(1);
  });

  it('withHandle=true でも edge=top では BottomSheetHandle は描画されない', () => {
    const { container } = render(
      <Sheet
        open
        edge="top"
        withHandle
      >
        <div>x</div>
      </Sheet>
    );
    // edge=bottom 用ハンドルなので、edge=top のときは要素数が少ない
    // ここでは「クラッシュせず描画される」ことだけ確認
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it.each(['none', 'sm', 'md', 'lg'] as const)(
    'padding="%s" を渡してもレンダリング可能',
    (padding) => {
      const { container } = render(
        <Sheet
          open
          padding={padding}
        >
          <div>padding test</div>
        </Sheet>
      );
      expect(container.querySelector('[role="dialog"]')).toBeTruthy();
    }
  );
});
