import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { TabBar } from './index';

const tabs = [
  { key: 'a', label: 'タブA' },
  { key: 'b', label: 'タブB' },
  { key: 'c', label: 'タブC' },
] as const;

type Key = (typeof tabs)[number]['key'];

describe('TabBar', () => {
  test('全タブが描画される', () => {
    render(
      <TabBar
        tabs={tabs}
        active="a"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByRole('tab', { name: 'タブA' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'タブB' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'タブC' })).toBeInTheDocument();
  });

  test('active タブの aria-selected が true', () => {
    render(
      <TabBar
        tabs={tabs}
        active="b"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByRole('tab', { name: 'タブB' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'タブA' })).toHaveAttribute('aria-selected', 'false');
  });

  test('タブをクリックすると onChange が呼ばれる', async () => {
    const handler = vi.fn<(key: Key) => void>();
    render(
      <TabBar
        tabs={tabs}
        active="a"
        onChange={handler}
      />
    );
    await userEvent.click(screen.getByRole('tab', { name: 'タブC' }));
    expect(handler).toHaveBeenCalledWith('c');
  });

  test('tablist ロールが存在する', () => {
    render(
      <TabBar
        tabs={tabs}
        active="a"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  test('fullWidth クラスが付く', () => {
    render(
      <TabBar
        tabs={tabs}
        active="a"
        onChange={vi.fn()}
        fullWidth
      />
    );
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toMatch(/fullWidth/);
  });

  test('size="sm" クラスが付く', () => {
    render(
      <TabBar
        tabs={tabs}
        active="a"
        onChange={vi.fn()}
        size="sm"
      />
    );
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toMatch(/size-sm/);
  });
});
