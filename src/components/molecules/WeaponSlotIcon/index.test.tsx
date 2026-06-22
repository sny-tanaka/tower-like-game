import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { WeaponSlotIcon } from './index';

describe('WeaponSlotIcon', () => {
  test('ボタンが描画される', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('equipped=false で aria-pressed が false', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  test('equipped=true で aria-pressed が true', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={true}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  test('equipped=true で equipped クラスが付く', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cannon"
        equipped={true}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/equipped/);
  });

  test('equipped=false で equipped クラスが付かない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cannon"
        equipped={false}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).not.toMatch(/\bequipped\b/);
  });

  test('cdRemaining > 0 で onCd クラスが付く', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="thunder"
        equipped={false}
        cdRemaining={2}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/onCd/);
  });

  test('cdRemaining = 0 で onCd クラスが付かない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="thunder"
        equipped={false}
        cdRemaining={0}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).not.toMatch(/onCd/);
  });

  test('cdRemaining が null/undefined の時 CD 表示が出ない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cutter"
        equipped={false}
      />
    );
    // cdOverlay クラスが付いた要素がないこと
    expect(container.querySelector('[class*="cdOverlay"]')).toBeNull();
  });

  test('cdRemaining > 0 の時 cdProgress 要素が描画される', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        cdRemaining={2}
      />
    );
    expect(container.querySelector('[class*="cdProgress"]')).toBeInTheDocument();
  });

  test('disabled=true でボタンが disabled になる', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        disabled={true}
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('disabled=true の時 onClick が呼ばれない', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WeaponSlotIcon
        weapon="laser"
        equipped={false}
        disabled={true}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
