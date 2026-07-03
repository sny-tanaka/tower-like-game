import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { Text } from '@/components/atoms/Text';
import { Toggle } from '@/components/atoms/Toggle';
import { TARGET_FPS_OPTIONS, type TargetFps } from '@/data/schema';
import {
  clearCrashLog,
  formatCrashRecord,
  getCrashLog,
  type CrashRecord,
} from '@/lib/diagnostics/crashSnapshot';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface GameSettingsTabProps {
  /** ストーリー / テスト用オーバーライド */
  overrideTargetFps?: TargetFps;
  onTargetFpsChange?: (fps: TargetFps) => void;
  /** v1.4.8: 診断モードトグルのストーリー / テスト用オーバーライド */
  overrideDiagnosticsEnabled?: boolean;
  onDiagnosticsEnabledChange?: (enabled: boolean) => void;
  /**
   * v1.4.8: 「前回の異常終了」 記録のストーリー / テスト用オーバーライド。
   * 省略時は `getCrashLog()` を直接呼んで localStorage から読む。
   */
  overrideCrashLog?: CrashRecord[];
}

const FPS_OPTIONS: ReadonlyArray<{ label: string; value: TargetFps }> = TARGET_FPS_OPTIONS.map(
  (fps) => ({ label: `${fps}fps`, value: fps })
);

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function GameSettingsTab({
  overrideTargetFps,
  onTargetFpsChange,
  overrideDiagnosticsEnabled,
  onDiagnosticsEnabledChange,
  overrideCrashLog,
}: GameSettingsTabProps) {
  const storeTargetFps = useStore((s) => s.targetFps);
  const setTargetFps = useStore((s) => s.setTargetFps);
  const storeDiagnosticsEnabled = useStore((s) => s.diagnosticsEnabled);
  const setDiagnosticsEnabled = useStore((s) => s.setDiagnosticsEnabled);

  const targetFps = overrideTargetFps ?? storeTargetFps;
  const diagnosticsEnabled = overrideDiagnosticsEnabled ?? storeDiagnosticsEnabled;

  // 「前回の異常終了」 記録: localStorage は起動時に 1 回読めば十分 (診断モードの
  // ON/OFF や FPS 変更で再取得する必要はない)。 クリアボタン押下時のみ再取得する。
  const [crashLogRefreshKey, setCrashLogRefreshKey] = useState(0);
  const crashLog = overrideCrashLog ?? getCrashLog();
  // crashLogRefreshKey は再取得トリガーとしてのみ使用 (値自体は参照しない)。
  void crashLogRefreshKey;

  const handleTargetFpsChange = (fps: TargetFps) => {
    if (onTargetFpsChange) {
      onTargetFpsChange(fps);
    } else {
      setTargetFps(fps);
    }
  };

  const handleDiagnosticsEnabledChange = (enabled: boolean) => {
    if (onDiagnosticsEnabledChange) {
      onDiagnosticsEnabledChange(enabled);
    } else {
      setDiagnosticsEnabled(enabled);
    }
  };

  const handleClearCrashLog = () => {
    clearCrashLog();
    setCrashLogRefreshKey((k) => k + 1);
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

      {/* v1.4.8: 診断モード (production でも使える戦闘中ミニ診断オーバーレイ + クラッシュ記録) */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label">診断モード</Text>
          <Text
            variant="caption"
            color="dim"
          >
            戦闘中に FPS / 敵数 / Fx イベント数 / DOM ノード数などを画面左下に表示します
          </Text>
        </div>
        <Toggle
          checked={diagnosticsEnabled}
          onChange={handleDiagnosticsEnabledChange}
          label="診断オーバーレイを表示"
        />

        <div className={styles.sectionHeader}>
          <Text variant="label">前回の異常終了</Text>
          <Text
            variant="caption"
            color="dim"
          >
            ラン中にアプリが強制終了した場合、直前の状態を記録します
          </Text>
        </div>
        {crashLog.length === 0 ? (
          <Text
            variant="body"
            color="dim"
          >
            なし
          </Text>
        ) : (
          <div className={styles.crashLogList}>
            {crashLog.map((record, i) => (
              <Text
                key={`${record.savedAt}-${i}`}
                variant="caption"
                color="dim"
              >
                {formatCrashRecord(record)}
              </Text>
            ))}
          </div>
        )}
        {crashLog.length > 0 && (
          <Button
            label="クリア"
            variant="secondary"
            size="sm"
            onClick={handleClearCrashLog}
          />
        )}
      </div>
    </div>
  );
}
