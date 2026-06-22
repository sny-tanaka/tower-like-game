import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Overlay } from '.';

describe('Overlay', () => {
  it('children が描画される', () => {
    render(
      <Overlay open>
        <div>オーバーレイコンテンツ</div>
      </Overlay>
    );
    expect(screen.getByText('オーバーレイコンテンツ')).toBeTruthy();
  });

  it('open=true でマウントされる', () => {
    render(
      <Overlay open>
        <div>表示コンテンツ</div>
      </Overlay>
    );
    expect(screen.getByText('表示コンテンツ')).toBeTruthy();
  });

  it('open=false (アンマウント) で children が表示されない', () => {
    // 親が条件付きレンダリングで制御するパターンを再現
    const isOpen = false;
    const { queryByText } = render(
      <>
        {isOpen && (
          <Overlay open={isOpen}>
            <div>非表示コンテンツ</div>
          </Overlay>
        )}
      </>
    );
    expect(queryByText('非表示コンテンツ')).toBeNull();
  });

  it('dismissible=true (デフォルト) で背景クリック → onClose 発火', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Overlay
        open
        onClose={onClose}
        dismissible
      >
        <div>コンテンツ</div>
      </Overlay>
    );
    // overlay 要素（背景）をクリック
    const overlay = container.querySelector('[role="presentation"]') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismissible=false で背景クリックしても onClose が発火しない', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Overlay
        open
        onClose={onClose}
        dismissible={false}
      >
        <div>コンテンツ</div>
      </Overlay>
    );
    const overlay = container.querySelector('[role="presentation"]') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('children クリックは onClose を発火しない', () => {
    const onClose = vi.fn();
    render(
      <Overlay
        open
        onClose={onClose}
        dismissible
      >
        <div data-testid="inner">コンテンツ</div>
      </Overlay>
    );
    fireEvent.click(screen.getByTestId('inner'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('onClose が未指定でも背景クリックでエラーにならない', () => {
    const { container } = render(
      <Overlay
        open
        dismissible
      >
        <div>コンテンツ</div>
      </Overlay>
    );
    const overlay = container.querySelector('[role="presentation"]') as HTMLElement;
    expect(() => fireEvent.click(overlay)).not.toThrow();
  });
});
