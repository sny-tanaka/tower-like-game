import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { NumericDisplay } from '@/components/atoms/NumericDisplay';
import { Slider } from '@/components/atoms/Slider';
import { Text } from '@/components/atoms/Text';
import { Toggle } from '@/components/atoms/Toggle';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface SoundSettingsTabProps {
  /** ストーリー / テスト用オーバーライド */
  overrideBgmVolume?: number;
  overrideSeVolume?: number;
  overrideMute?: boolean;
  onBgmChange?: (v: number) => void;
  onSeChange?: (v: number) => void;
  onMuteChange?: (v: boolean) => void;
}

// ---------------------------------------------------------------------------
// 内部: スライダー行
// ---------------------------------------------------------------------------

interface SliderRowProps {
  label: string;
  iconName: IconName;
  value: number;
  muted: boolean;
  onChange: (v: number) => void;
}

function SliderRow({ label, iconName, value, muted, onChange }: SliderRowProps) {
  return (
    <Card
      variant="sunken"
      padding="md"
    >
      <div className={[styles.sliderRow, muted ? styles.muted : ''].filter(Boolean).join(' ')}>
        <span className={styles.sliderIcon}>
          <Icon
            name={iconName}
            size={16}
          />
        </span>
        <Text
          variant="label"
          color={muted ? 'dim' : 'mid'}
        >
          {label}
        </Text>
        <div className={styles.sliderArea}>
          <Slider
            value={value}
            min={0}
            max={1}
            step={0.01}
            onChange={onChange}
            disabled={muted}
          />
        </div>
        <span className={styles.sliderValue}>
          <NumericDisplay
            value={Math.round(value * 100)}
            size="sm"
            accentColor={muted ? 'dim' : 'text'}
          />
        </span>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function SoundSettingsTab({
  overrideBgmVolume,
  overrideSeVolume,
  overrideMute,
  onBgmChange,
  onSeChange,
  onMuteChange,
}: SoundSettingsTabProps) {
  const storeBgm = useStore((s) => s.bgmVolume);
  const storeSe = useStore((s) => s.seVolume);
  const storeMuted = useStore((s) => s.muted);
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);
  const setMuted = useStore((s) => s.setMuted);

  const bgmVolume = overrideBgmVolume ?? storeBgm;
  const seVolume = overrideSeVolume ?? storeSe;
  const muted = overrideMute ?? storeMuted;

  const handleBgmChange = (v: number) => {
    if (onBgmChange) {
      onBgmChange(v);
    } else {
      setBgmVolume(v);
      soundEngine.setBgmVolume(v);
    }
  };

  const handleSeChange = (v: number) => {
    if (onSeChange) {
      onSeChange(v);
    } else {
      setSeVolume(v);
      soundEngine.setSeVolume(v);
    }
  };

  const handleMuteToggle = (checked: boolean) => {
    if (onMuteChange) {
      onMuteChange(checked);
    } else {
      setMuted(checked);
      soundEngine.setMuted(checked);
    }
  };

  return (
    <div
      className={styles.root}
      role="tabpanel"
      aria-label="サウンド設定"
    >
      {/* ミュート */}
      <Card
        variant="sunken"
        padding="md"
      >
        <div className={styles.muteRow}>
          <span className={styles.muteLabelGroup}>
            <Text
              variant="label"
              color="mid"
            >
              ミュート
            </Text>
            <Text
              variant="caption"
              color="dim"
            >
              全サウンドを一時停止
            </Text>
          </span>
          <Toggle
            checked={muted}
            onChange={handleMuteToggle}
            accent="primary"
          />
        </div>
      </Card>

      {/* BGM 音量 */}
      <SliderRow
        label="BGM"
        iconName="play"
        value={bgmVolume}
        muted={muted}
        onChange={handleBgmChange}
      />

      {/* SE 音量 */}
      <SliderRow
        label="SE"
        iconName="spark"
        value={seVolume}
        muted={muted}
        onChange={handleSeChange}
      />
    </div>
  );
}
