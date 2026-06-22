import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppShell } from './index';

describe('AppShell', () => {
  it('children を main に描画する', () => {
    render(<AppShell>メインコンテンツ</AppShell>);
    expect(screen.getByText('メインコンテンツ')).toBeDefined();
  });

  it('header スロットを描画する', () => {
    render(<AppShell header={<div>テストヘッダー</div>}>メイン</AppShell>);
    expect(screen.getByText('テストヘッダー')).toBeDefined();
  });

  it('footer スロットを描画する', () => {
    render(<AppShell footer={<div>テストフッター</div>}>メイン</AppShell>);
    expect(screen.getByText('テストフッター')).toBeDefined();
  });

  it('header が未指定のとき header 要素を描画しない', () => {
    const { container } = render(<AppShell>メイン</AppShell>);
    expect(container.querySelector('header')).toBeNull();
  });

  it('footer が未指定のとき footer 要素を描画しない', () => {
    const { container } = render(<AppShell>メイン</AppShell>);
    expect(container.querySelector('footer')).toBeNull();
  });

  it('noScroll=true のとき main に noScroll クラスが付く', () => {
    const { container } = render(<AppShell noScroll>メイン</AppShell>);
    const main = container.querySelector('main');
    expect(main?.className).toMatch(/noScroll/);
  });

  it('noScroll=false のとき main に noScroll クラスが付かない', () => {
    const { container } = render(<AppShell noScroll={false}>メイン</AppShell>);
    const main = container.querySelector('main');
    expect(main?.className).not.toMatch(/noScroll/);
  });

  it('variant="battle" のとき battle クラスが付く', () => {
    const { container } = render(<AppShell variant="battle">バトル</AppShell>);
    expect(container.firstElementChild?.className).toMatch(/battle/);
  });
});
