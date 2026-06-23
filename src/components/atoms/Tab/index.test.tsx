import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Tab } from './index';

describe('Tab', () => {
  test('label が描画される', () => {
    render(
      <Tab
        label="Weapons"
        active={false}
      />
    );
    expect(screen.getByText('Weapons')).toBeInTheDocument();
  });

  test('role="tab" が設定される', () => {
    render(
      <Tab
        label="Weapons"
        active={false}
      />
    );
    expect(screen.getByRole('tab')).toBeInTheDocument();
  });

  test('active=true のとき aria-selected が true', () => {
    render(
      <Tab
        label="Active"
        active={true}
      />
    );
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
  });

  test('active=false のとき aria-selected が false', () => {
    render(
      <Tab
        label="Inactive"
        active={false}
      />
    );
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false');
  });

  test('active=true のとき .active クラスが付く', () => {
    const { container } = render(
      <Tab
        label="Active"
        active={true}
      />
    );
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/active/);
  });

  test('active=false のとき .active クラスが付かない', () => {
    const { container } = render(
      <Tab
        label="Inactive"
        active={false}
      />
    );
    const btn = container.querySelector('button')!;
    // btn のクラスに 'active' という単語が含まれないことを確認
    // SCSS Modules でも 'active' の文字列が含まれる場合がある
    expect(btn.className).not.toMatch(/(?<![a-zA-Z])active(?![a-zA-Z])/);
  });

  test('onClick が呼ばれる', async () => {
    const handler = vi.fn();
    render(
      <Tab
        label="click me"
        active={false}
        onClick={handler}
      />
    );
    await userEvent.click(screen.getByRole('tab'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('icon が描画される', () => {
    render(
      <Tab
        label="with icon"
        active={false}
        icon={<span data-testid="tab-icon" />}
      />
    );
    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
  });

  test('icon がない場合はアイコン要素が存在しない', () => {
    render(
      <Tab
        label="no icon"
        active={false}
      />
    );
    expect(screen.queryByTestId('tab-icon')).toBeNull();
  });

  test('type は button', () => {
    render(
      <Tab
        label="t"
        active={false}
      />
    );
    expect(screen.getByRole('tab')).toHaveAttribute('type', 'button');
  });

  test('variant=pill のとき variant-pill クラスが付く', () => {
    const { container } = render(
      <Tab
        label="ALL"
        active
        variant="pill"
      />
    );
    const btn = container.querySelector('button')!;
    expect(btn.className).toMatch(/variant-pill/);
  });

  test('variant=pill のときは underline indicator が描画されない', () => {
    const { container } = render(
      <Tab
        label="ALL"
        active
        variant="pill"
      />
    );
    const indicator = container.querySelector('[class*="indicator"]');
    expect(indicator).toBeNull();
  });

  test('badge が数値で表示される', () => {
    render(
      <Tab
        label="武器庫"
        active={false}
        badge={3}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('badge が文字列で表示される', () => {
    render(
      <Tab
        label="パッチ"
        active={false}
        badge="NEW"
      />
    );
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  test('disabled 時に onClick が発火しない', async () => {
    const handler = vi.fn();
    render(
      <Tab
        label="ロック中"
        active={false}
        disabled
        onClick={handler}
      />
    );
    await userEvent.click(screen.getByRole('tab')).catch(() => {});
    expect(handler).not.toHaveBeenCalled();
  });

  test('disabled 時に button 要素が disabled になる', () => {
    render(
      <Tab
        label="ロック中"
        active={false}
        disabled
      />
    );
    expect(screen.getByRole('tab')).toBeDisabled();
  });
});
