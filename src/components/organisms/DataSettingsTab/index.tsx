import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { FileInput } from '@/components/atoms/FileInput';
import { Text } from '@/components/atoms/Text';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface StorageInfo {
  usedKb: number;
  slots: number;
  lastSavedAt: string;
}

export interface DataSettingsTabProps {
  storageInfo?: StorageInfo;
  onExport?: () => void | Promise<void>;
  onImport?: (file: File) => void | Promise<void>;
  onReset?: () => void | Promise<void>;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function DataSettingsTab({
  storageInfo,
  onExport,
  onImport,
  onReset,
}: DataSettingsTabProps) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!onExport) return;
    setExporting(true);
    try {
      await onExport();
    } finally {
      setExporting(false);
    }
  };

  const handleFileChange = async (file: File | null) => {
    if (!file || !onImport) return;
    setImporting(true);
    try {
      await onImport(file);
    } finally {
      setImporting(false);
    }
  };

  const handleResetConfirm = async () => {
    setResetDialogOpen(false);
    if (onReset) {
      await onReset();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">データ管理</Text>
      </div>

      {/* ストレージ情報 */}
      {storageInfo && (
        <div className={styles.storageCard}>
          <Text
            variant="label"
            color="mid"
          >
            ストレージ使用量
          </Text>
          <div className={styles.storageRow}>
            <Text variant="numeric-l">{storageInfo.usedKb}</Text>
            <Text
              variant="caption"
              color="dim"
            >
              KB
            </Text>
          </div>
          <Text
            variant="caption"
            color="dim"
          >
            セーブスロット: {storageInfo.slots} / 最終保存: {storageInfo.lastSavedAt}
          </Text>
        </div>
      )}

      <div className={styles.divider} />

      {/* エクスポート */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text
            variant="label"
            color="mid"
          >
            エクスポート
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            セーブデータを JSON ファイルとしてダウンロード
          </Text>
        </div>
        <Button
          label={exporting ? 'エクスポート中...' : 'エクスポート'}
          variant="secondary"
          fullWidth
          onClick={handleExport}
          disabled={exporting || !onExport}
        />
      </div>

      {/* インポート */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text
            variant="label"
            color="mid"
          >
            インポート
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            JSON ファイルからセーブデータを復元（上書き）
          </Text>
        </div>
        <FileInput
          accept="application/json"
          onChange={handleFileChange}
          label={importing ? 'インポート中...' : 'ファイルを選択してインポート'}
          disabled={importing || !onImport}
        />
      </div>

      <div className={styles.divider} />

      {/* リセット */}
      <div className={styles.dangerSection}>
        <div className={styles.sectionHeader}>
          <Text
            variant="label"
            color="mid"
          >
            データリセット
          </Text>
          <Text
            variant="caption"
            color="dim"
          >
            すべてのデータを削除します。この操作は取り消せません。
          </Text>
        </div>
        <Button
          label="全データをリセット"
          variant="danger"
          fullWidth
          onClick={() => setResetDialogOpen(true)}
          disabled={!onReset}
        />
      </div>

      {/* リセット確認ダイアログ */}
      <ConfirmDialog
        open={resetDialogOpen}
        title="データをリセットしますか？"
        message="すべてのセーブデータが削除されます。この操作は取り消せません。"
        iconName="skull"
        confirmLabel="リセットする"
        cancelLabel="キャンセル"
        variant="danger"
        onConfirm={handleResetConfirm}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}
