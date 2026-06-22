import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ScreenSaverFx } from './index';

describe('ScreenSaverFx', () => {
  test('items が描画される', () => {
    render(<ScreenSaverFx items={[<span key="a">item A</span>, <span key="b">item B</span>]} />);
    expect(screen.getByText('item A')).toBeInTheDocument();
    expect(screen.getByText('item B')).toBeInTheDocument();
  });

  test('items が空でもクラッシュしない', () => {
    expect(() => render(<ScreenSaverFx />)).not.toThrow();
  });

  test('showTower=false でタワー DOM が描画されない', () => {
    const { container } = render(<ScreenSaverFx showTower={false} />);
    // tower クラスを持つ div が存在しないことを確認
    // data 属性からラッパーの id プレフィックスを取得
    const wrapper = container.querySelector('[data-screen-saver-fx]');
    const id = wrapper?.getAttribute('data-screen-saver-fx') ?? '';
    expect(container.querySelector(`.${id}-tower`)).toBeNull();
  });

  test('showTower=true でタワーコンポジットが描画される', () => {
    const { container } = render(<ScreenSaverFx showTower={true} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('-tower-r1');
    expect(styleEl?.innerHTML).toContain('-tower-r2');
  });

  test('towerContent が描画される（showTower=true 時）', () => {
    render(
      <ScreenSaverFx
        showTower={true}
        towerContent={<span>tower core</span>}
      />
    );
    expect(screen.getByText('tower core')).toBeInTheDocument();
  });

  test('cycleSeconds が CSS に反映される', () => {
    const { container } = render(<ScreenSaverFx cycleSeconds={12} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('12s');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<ScreenSaverFx items={[<span key="x">x</span>]} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('5 種類のドリフト経路アニメーションが生成される', () => {
    const { container } = render(<ScreenSaverFx />);
    const styleEl = container.querySelector('style');
    // drift-1 〜 drift-5
    expect(styleEl?.innerHTML).toContain('-drift-1');
    expect(styleEl?.innerHTML).toContain('-drift-5');
  });

  test('wrapper は pointer-events: none', () => {
    const { container } = render(<ScreenSaverFx />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.pointerEvents).toBe('none');
  });
});
