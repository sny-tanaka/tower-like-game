import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { Toggle } from '@/components/atoms/Toggle';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface GameSettingsTabProps {
  /** ストーリー / テスト用オーバーライド */
  overrideVibration?: boolean;
  onVibrationChange?: (v: boolean) => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function GameSettingsTab({ overrideVibration, onVibrationChange }: GameSettingsTabProps) {
  const storeVibration = useStore((s) => s.vibrationEnabled);
  const setVibrationEnabled = useStore((s) => s.setVibrationEnabled);

  const vibration = overrideVibration ?? storeVibration;

  const handleVibrationChange = (v: boolean) => {
    if (onVibrationChange) {
      onVibrationChange(v);
    } else {
      setVibrationEnabled(v);
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
    </div>
  );
}
