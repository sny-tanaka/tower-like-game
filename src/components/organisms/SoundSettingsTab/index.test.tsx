import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { SoundSettingsTab } from './index';

describe('SoundSettingsTab', () => {
  it('BGM / SE スライダーが表示される', () => {
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.7}
        overrideMute={false}
      />
    );
    expect(screen.getByText('BGM')).toBeDefined();
    expect(screen.getByText('SE')).toBeDefined();
  });

  it('BGM 音量が % 表示される', () => {
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.5}
        overrideMute={false}
      />
    );
    expect(screen.getByText('80')).toBeDefined();
    expect(screen.getByText('50')).toBeDefined();
  });

  it('ミュート ON 時、スライダーが disabled になる', () => {
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.7}
        overrideMute={true}
      />
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders.every((s) => (s as HTMLInputElement).disabled)).toBe(true);
  });

  it('ミュートトグルをクリックすると onMuteChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onMuteChange = vi.fn();
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.7}
        overrideMute={false}
        onMuteChange={onMuteChange}
      />
    );
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(onMuteChange).toHaveBeenCalledWith(true);
  });

  it('BGMスライダー変更で onBgmChange が呼ばれる', () => {
    const onBgmChange = vi.fn();
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.5}
        overrideSeVolume={0.5}
        overrideMute={false}
        onBgmChange={onBgmChange}
      />
    );
    const sliders = screen.getAllByRole('slider');
    // BGM スライダー (最初のスライダー)
    fireEvent.change(sliders[0], { target: { value: '0.6' } });
    expect(onBgmChange).toHaveBeenCalledWith(0.6);
  });

  it('ミュート ON 時に Toggle の aria-checked が true になる', () => {
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.7}
        overrideMute={true}
      />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('ミュート OFF 時に Toggle の aria-checked が false になる', () => {
    render(
      <SoundSettingsTab
        overrideBgmVolume={0.8}
        overrideSeVolume={0.7}
        overrideMute={false}
      />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
});
