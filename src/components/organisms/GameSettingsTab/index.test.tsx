import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { GameSettingsTab } from './index';

describe('GameSettingsTab', () => {
  it('バイブレーション Toggle と速度 SegmentedControl が表示される', () => {
    render(
      <GameSettingsTab
        overrideVibration={true}
        overrideSpeed={1}
      />
    );
    expect(screen.getByRole('switch')).toBeDefined();
    // ×1 / ×2 / ×3 ボタン
    expect(screen.getByRole('radio', { name: '×1' })).toBeDefined();
    expect(screen.getByRole('radio', { name: '×2' })).toBeDefined();
    expect(screen.getByRole('radio', { name: '×3' })).toBeDefined();
  });

  it('バイブレーション Toggle は初期 checked 状態を反映', () => {
    render(
      <GameSettingsTab
        overrideVibration={false}
        overrideSpeed={1}
      />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('Toggle をクリックすると onVibrationChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onVibrationChange = vi.fn();
    render(
      <GameSettingsTab
        overrideVibration={true}
        overrideSpeed={1}
        onVibrationChange={onVibrationChange}
      />
    );
    await user.click(screen.getByRole('switch'));
    expect(onVibrationChange).toHaveBeenCalledWith(false);
  });

  it('速度セグメントをクリックすると onSpeedChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onSpeedChange = vi.fn();
    render(
      <GameSettingsTab
        overrideVibration={true}
        overrideSpeed={1}
        onSpeedChange={onSpeedChange}
      />
    );
    await user.click(screen.getByRole('radio', { name: '×3' }));
    expect(onSpeedChange).toHaveBeenCalledWith(3);
  });

  it('現在選択中の速度は aria-checked=true', () => {
    render(
      <GameSettingsTab
        overrideVibration={true}
        overrideSpeed={2}
      />
    );
    expect(screen.getByRole('radio', { name: '×2' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: '×1' })).toHaveAttribute('aria-checked', 'false');
  });
});
