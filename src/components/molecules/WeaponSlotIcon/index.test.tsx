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

  // --- WeaponReadyFx 配線テスト ---

  test('ready=true, active=false, cdProgress=100 のとき WeaponReadyFx (aria-hidden span) がマウントされる', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        ready={true}
        active={false}
        cdProgress={100}
      />
    );
    // WeaponReadyFx が出力する aria-hidden="true" の span が存在する
    const fxSpans = container.querySelectorAll('span[aria-hidden="true"]');
    expect(fxSpans.length).toBeGreaterThanOrEqual(1);
  });

  test('active=true のとき WeaponReadyFx がマウントされない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        ready={true}
        active={true}
        cdProgress={100}
      />
    );
    // iconWrap の中の aria-hidden は存在しないはず
    // Fx span は .pulse クラスを持つ span だが、クラス名は CSS Modules で変換される
    // WeaponReadyFx は aria-hidden span なので、button 直下の aria-hidden span を数える
    // active=true のときは Fx は描画されない → aria-hidden span は 0 か iconWrap の span のみ
    // ここでは iconWrap は aria-hidden 属性を持たないため 0 を期待
    const fxSpans = container.querySelectorAll('button > span[aria-hidden="true"]');
    expect(fxSpans).toHaveLength(0);
  });

  test('cdProgress < 100 のとき WeaponReadyFx がマウントされない (CD 中)', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="laser"
        ready={true}
        active={false}
        cdProgress={50}
      />
    );
    // CD 中は cdOverlay と cdProgress の aria-hidden span が出るが、Fx の span は出ない
    // WeaponReadyFx は cdProgress が span.pulse で、class に pulse を含む
    // ここでは cdOverlay と cdProgress のみ (2つ) を確認
    const ariaHiddenSpans = container.querySelectorAll('button > span[aria-hidden="true"]');
    // cdOverlay + cdProgress = 2 spans、WeaponReadyFx は存在しない
    expect(ariaHiddenSpans).toHaveLength(2);
  });

  test('ready=false のとき WeaponReadyFx がマウントされない', () => {
    const { container } = render(
      <WeaponSlotIcon
        weapon="cannon"
        ready={false}
        active={false}
        cdProgress={100}
      />
    );
    const fxSpans = container.querySelectorAll('button > span[aria-hidden="true"]');
    expect(fxSpans).toHaveLength(0);
  });

  test('ready=true で aria-label に (ready) が含まれる', () => {
    render(
      <WeaponSlotIcon
        weapon="thunder"
        ready={true}
        active={false}
        cdProgress={100}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('(ready)')
    );
  });
});
