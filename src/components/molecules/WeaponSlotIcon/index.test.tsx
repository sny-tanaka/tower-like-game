import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { WeaponSlotIcon } from './index';

describe('WeaponSlotIcon', () => {
  test('ボタンが描画される', () => {
    render(<WeaponSlotIcon weapon="laser" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('active=false で aria-pressed が false', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        active={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  test('active=true で aria-pressed が true', () => {
    render(
      <WeaponSlotIcon
        weapon="laser"
        active={true}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  test('active=true で active クラスが付く', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cannon"
        active={true}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/active/);
  });

  test('active=false で active クラスが付かない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cannon"
        active={false}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).not.toMatch(/\bactive\b/);
  });

  test('cdProgress < 100 で onCd クラスが付く', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="thunder"
        cdProgress={50}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/onCd/);
  });

  test('cdProgress = 100 で onCd クラスが付かない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="thunder"
        cdProgress={100}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).not.toMatch(/onCd/);
  });

  test('cdProgress が未指定 (=100) の時 CD 表示が出ない', () => {
    const { container } = render(<WeaponSlotIcon weapon="cutter" />);
    expect(container.querySelector('[class*="cdOverlay"]')).toBeNull();
  });

  test('cdProgress < 100 の時 cdProgress 要素が描画される', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        cdProgress={50}
      />
    );
    expect(container.querySelector('[class*="cdProgress"]')).toBeInTheDocument();
  });

  test('swapDisabled=true のとき swapDisabled クラスが付く', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        swapDisabled={true}
      />
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toMatch(/swapDisabled/);
  });

  test('onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WeaponSlotIcon
        weapon="laser"
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('swapDisabled=true の時 onClick が呼ばれない', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WeaponSlotIcon
        weapon="laser"
        swapDisabled={true}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
