import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { GameSettingsTab } from './index';

describe('GameSettingsTab', () => {
  it('描画 FPS の選択肢 30/45/60 が radio として表示される', () => {
    render(<GameSettingsTab overrideTargetFps={60} />);
    expect(screen.getByRole('radio', { name: '30fps' })).toBeDefined();
    expect(screen.getByRole('radio', { name: '45fps' })).toBeDefined();
    expect(screen.getByRole('radio', { name: '60fps' })).toBeDefined();
  });

  it('描画 FPS は現在値の radio が aria-checked=true', () => {
    render(<GameSettingsTab overrideTargetFps={45} />);
    expect(screen.getByRole('radio', { name: '45fps' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: '60fps' })).toHaveAttribute('aria-checked', 'false');
  });

  it('FPS をクリックすると onTargetFpsChange が選択値で呼ばれる', async () => {
    const user = userEvent.setup();
    const onTargetFpsChange = vi.fn();
    render(
      <GameSettingsTab
        overrideTargetFps={60}
        onTargetFpsChange={onTargetFpsChange}
      />
    );
    await user.click(screen.getByRole('radio', { name: '30fps' }));
    expect(onTargetFpsChange).toHaveBeenCalledWith(30);
  });
});
