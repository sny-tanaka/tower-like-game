import styles from './style.module.scss';

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
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);

  const bgmVolume = overrideBgmVolume ?? storeBgm;
  const seVolume = overrideSeVolume ?? storeSe;

  // ミュートは store にないため内部 state で管理（overrideMute は Storybook 用）
  // ミュート時はスライダー無効 + 実際の音量を 0 にする
  const muted = overrideMute ?? false;

  const handleBgmChange = (v: number) => {
    if (onBgmChange) {
      onBgmChange(v);
    } else {
      setBgmVolume(v);
      soundEngine.setBgmVolume(muted ? 0 : v);
    }
  };

  const handleSeChange = (v: number) => {
    if (onSeChange) {
      onSeChange(v);
    } else {
      setSeVolume(v);
      soundEngine.setSeVolume(muted ? 0 : v);
    }
  };

  const handleMuteToggle = (checked: boolean) => {
    if (onMuteChange) {
      onMuteChange(checked);
    } else {
      soundEngine.setBgmVolume(checked ? 0 : bgmVolume);
      soundEngine.setSeVolume(checked ? 0 : seVolume);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">サウンド設定</Text>
      </div>

      {/* ミュート */}
      <div className={styles.row}>
        <Toggle
          checked={muted}
          onChange={handleMuteToggle}
          label="全体ミュート"
          description="すべての音を無効にします"
        />
      </div>

      <div className={styles.divider} />

      {/* BGM 音量 */}
      <div className={styles.sliderSection}>
        <div className={styles.sliderHeader}>
          <Text
            variant="label"
            color={muted ? 'dim' : 'mid'}
          >
            BGM
          </Text>
          <Text
            variant="numeric-l"
            color={muted ? 'dim' : 'default'}
          >
            {Math.round(bgmVolume * 100)}
          </Text>
        </div>
        <Slider
          value={bgmVolume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleBgmChange}
          disabled={muted}
        />
      </div>

      {/* SE 音量 */}
      <div className={styles.sliderSection}>
        <div className={styles.sliderHeader}>
          <Text
            variant="label"
            color={muted ? 'dim' : 'mid'}
          >
            SE
          </Text>
          <Text
            variant="numeric-l"
            color={muted ? 'dim' : 'default'}
          >
            {Math.round(seVolume * 100)}
          </Text>
        </div>
        <Slider
          value={seVolume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleSeChange}
          disabled={muted}
        />
      </div>
    </div>
  );
}
