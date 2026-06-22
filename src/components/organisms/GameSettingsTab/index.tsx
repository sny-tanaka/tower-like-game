import styles from './style.module.scss';

import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { Text } from '@/components/atoms/Text';
import { Toggle } from '@/components/atoms/Toggle';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface GameSettingsTabProps {
  /** ストーリー / テスト用オーバーライド */
  overrideVibration?: boolean;
  overrideSpeed?: 1 | 2 | 3;
  onVibrationChange?: (v: boolean) => void;
  onSpeedChange?: (v: 1 | 2 | 3) => void;
}

const SPEED_OPTIONS = [
  { label: '×1', value: 1 as const },
  { label: '×2', value: 2 as const },
  { label: '×3', value: 3 as const },
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function GameSettingsTab({
  overrideVibration,
  overrideSpeed,
  onVibrationChange,
  onSpeedChange,
}: GameSettingsTabProps) {
  const storeVibration = useStore((s) => s.vibrationEnabled);
  const storeSpeed = useStore((s) => s.defaultGameSpeed);
  const setVibrationEnabled = useStore((s) => s.setVibrationEnabled);
  const setDefaultGameSpeed = useStore((s) => s.setDefaultGameSpeed);

  const vibration = overrideVibration ?? storeVibration;
  const speed = overrideSpeed ?? storeSpeed;

  const handleVibrationChange = (v: boolean) => {
    if (onVibrationChange) {
      onVibrationChange(v);
    } else {
      setVibrationEnabled(v);
    }
  };

  const handleSpeedChange = (v: 1 | 2 | 3) => {
    if (onSpeedChange) {
      onSpeedChange(v);
    } else {
      setDefaultGameSpeed(v);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">ゲーム設定</Text>
      </div>

      {/* バイブレーション */}
      <div className={styles.section}>
        <Toggle
          checked={vibration}
          onChange={handleVibrationChange}
          label="バイブレーション"
          description="操作時に端末を振動させます"
        />
      </div>

      <div className={styles.divider} />

      {/* 初期速度倍率 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text
            variant="label"
            color="mid"
          >
            初期速度倍率
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            ゲーム開始時の速度
          </Text>
        </div>
        <SegmentedControl
          options={SPEED_OPTIONS}
          value={speed}
          onChange={handleSpeedChange}
        />
      </div>
    </div>
  );
}
