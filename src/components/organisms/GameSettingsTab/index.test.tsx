import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { GameSettingsTab } from './index';

describe('GameSettingsTab', () => {
  it('バイブレーション Toggle が表示される', () => {
    render(<GameSettingsTab overrideVibration={true} />);
    expect(screen.getByRole('switch')).toBeDefined();
  });

  it('バイブレーション Toggle は初期 checked 状態を反映', () => {
    render(<GameSettingsTab overrideVibration={false} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('Toggle をクリックすると onVibrationChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onVibrationChange = vi.fn();
    render(
      <GameSettingsTab
        overrideVibration={true}
        onVibrationChange={onVibrationChange}
      />
    );
    await user.click(screen.getByRole('switch'));
    expect(onVibrationChange).toHaveBeenCalledWith(false);
  });
});
