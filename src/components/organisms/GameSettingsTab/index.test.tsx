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

  // ---- v1.4.8: 診断モード ----

  it('診断モードトグルが overrideDiagnosticsEnabled の値で表示される', () => {
    render(
      <GameSettingsTab
        overrideTargetFps={60}
        overrideDiagnosticsEnabled={true}
        overrideCrashLog={[]}
      />
    );
    expect(screen.getByRole('switch', { name: '診断オーバーレイを表示' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('診断モードトグルをクリックすると onDiagnosticsEnabledChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onDiagnosticsEnabledChange = vi.fn();
    render(
      <GameSettingsTab
        overrideTargetFps={60}
        overrideDiagnosticsEnabled={false}
        overrideCrashLog={[]}
        onDiagnosticsEnabledChange={onDiagnosticsEnabledChange}
      />
    );
    await user.click(screen.getByRole('switch', { name: '診断オーバーレイを表示' }));
    expect(onDiagnosticsEnabledChange).toHaveBeenCalledWith(true);
  });

  it('crashLog が空のとき「なし」と表示される', () => {
    render(
      <GameSettingsTab
        overrideTargetFps={60}
        overrideCrashLog={[]}
      />
    );
    expect(screen.getByText('なし')).toBeDefined();
  });

  it('crashLog がある場合はサマリ行とクリアボタンが表示される', () => {
    render(
      <GameSettingsTab
        overrideTargetFps={60}
        overrideCrashLog={[
          {
            tier: 5,
            wave: 30,
            runElapsedSec: 754,
            weapon: 'laser',
            enemyCount: 42,
            fxEventCount: 180,
            heapMB: 512.3,
            appVersion: '1.4.7',
            savedAt: '2026-07-03T12:04:00.000Z',
          },
        ]}
      />
    );
    expect(screen.getByText(/T5 W30/)).toBeDefined();
    expect(screen.getByText(/12分34秒経過/)).toBeDefined();
    expect(screen.getByRole('button', { name: 'クリア' })).toBeDefined();
  });
});
