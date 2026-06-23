import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BottomNav } from './index';

describe('BottomNav', () => {
  const defaultProps = {
    active: 'preparation' as const,
    onChange: () => {},
  };

  it('5 タブをすべて描画する', () => {
    render(<BottomNav {...defaultProps} />);
    expect(screen.getByLabelText('準備')).toBeDefined();
    expect(screen.getByLabelText('マシン')).toBeDefined();
    expect(screen.getByLabelText('武器庫')).toBeDefined();
    expect(screen.getByLabelText('パッチ')).toBeDefined();
    expect(screen.getByLabelText('設定')).toBeDefined();
  });

  it('active タブに aria-current="page" が付く', () => {
    render(
      <BottomNav
        active="machine"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('マシン').getAttribute('aria-current')).toBe('page');
  });

  it('非アクティブタブに aria-current が付かない', () => {
    render(
      <BottomNav
        active="machine"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('準備').getAttribute('aria-current')).toBeNull();
  });

  it('タブをクリックすると onChange が正しいキーで呼ばれる', async () => {
    const onChange = vi.fn();
    render(
      <BottomNav
        active="preparation"
        onChange={onChange}
      />
    );
    await userEvent.click(screen.getByLabelText('マシン'));
    expect(onChange).toHaveBeenCalledWith('machine');
  });

  it('武器庫タブをクリックすると armory で onChange が呼ばれる', async () => {
    const onChange = vi.fn();
    render(
      <BottomNav
        active="preparation"
        onChange={onChange}
      />
    );
    await userEvent.click(screen.getByLabelText('武器庫'));
    expect(onChange).toHaveBeenCalledWith('armory');
  });

  it('設定タブをクリックすると settings で onChange が呼ばれる', async () => {
    const onChange = vi.fn();
    render(
      <BottomNav
        active="preparation"
        onChange={onChange}
      />
    );
    await userEvent.click(screen.getByLabelText('設定'));
    expect(onChange).toHaveBeenCalledWith('settings');
  });

  it('badges prop でバッジを表示する', () => {
    const { container } = render(
      <BottomNav
        active="preparation"
        onChange={() => {}}
        badges={{ armory: 3 }}
      />
    );
    const badges = container.querySelectorAll('[aria-hidden="true"]');
    // badge スパンが存在する（テキスト "3" を持つ span）
    const badgeSpan = Array.from(badges).find((el) => el.textContent === '3');
    expect(badgeSpan).toBeDefined();
  });

  it('nav 要素に aria-label が付く', () => {
    render(<BottomNav {...defaultProps} />);
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeDefined();
  });
});
