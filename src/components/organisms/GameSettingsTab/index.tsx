import styles from './style.module.scss';

import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { Text } from '@/components/atoms/Text';
import { TARGET_FPS_OPTIONS, type TargetFps } from '@/data/schema';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface GameSettingsTabProps {
  /** ストーリー / テスト用オーバーライド */
  overrideTargetFps?: TargetFps;
  onTargetFpsChange?: (fps: TargetFps) => void;
}

const FPS_OPTIONS: ReadonlyArray<{ label: string; value: TargetFps }> = TARGET_FPS_OPTIONS.map(
  (fps) => ({ label: `${fps}fps`, value: fps })
);

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function GameSettingsTab({ overrideTargetFps, onTargetFpsChange }: GameSettingsTabProps) {
  const storeTargetFps = useStore((s) => s.targetFps);
  const setTargetFps = useStore((s) => s.setTargetFps);

  const targetFps = overrideTargetFps ?? storeTargetFps;

  const handleTargetFpsChange = (fps: TargetFps) => {
    if (onTargetFpsChange) {
      onTargetFpsChange(fps);
    } else {
      setTargetFps(fps);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">ゲーム設定</Text>
      </div>

      {/* 描画 FPS */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label">描画 FPS</Text>
          <Text
            variant="caption"
            color="dim"
          >
            低い値ほど発熱を抑えられます (端末が熱くなる場合は 45 か 30 に)
          </Text>
        </div>
        <SegmentedControl<TargetFps>
          options={FPS_OPTIONS}
          value={targetFps}
          onChange={handleTargetFpsChange}
        />
      </div>
    </div>
  );
}
