import { useState } from 'react';

import styles from './style.module.scss';

import { TabBar } from '@/components/molecules/TabBar';
import type { TabBarItem } from '@/components/molecules/TabBar';
import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { DataSettingsTab } from '@/components/organisms/DataSettingsTab';
import { GameSettingsTab } from '@/components/organisms/GameSettingsTab';
import { PageHeader } from '@/components/organisms/PageHeader';
import { SoundSettingsTab } from '@/components/organisms/SoundSettingsTab';
import { openDatabase } from '@/data/db';
import { exportSave, importSave } from '@/data/export';
import type { ExportFile } from '@/data/export';
import { DB_NAME } from '@/data/schema';
import { useNavigation } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義
// ---------------------------------------------------------------------------

type SettingsTab = 'sound' | 'game' | 'data';

const TABS: ReadonlyArray<TabBarItem<SettingsTab>> = [
  { key: 'sound', label: 'サウンド' },
  { key: 'game', label: 'ゲーム' },
  { key: 'data', label: 'データ' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function Page() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('sound');

  // --- エクスポート ---
  const handleExport = async () => {
    const db = await openDatabase();
    const exportFile = await exportSave(db);
    const json = JSON.stringify(exportFile, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neon-spire-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- インポート ---
  const handleImport = async (file: File) => {
    const text = await file.text();
    const exportFile = JSON.parse(text) as ExportFile;
    const db = await openDatabase();
    await importSave(db, exportFile);
    // ページリロードでストアを DB と同期
    window.location.reload();
  };

  // --- リセット ---
  const handleReset = async () => {
    indexedDB.deleteDatabase(DB_NAME);
    window.location.reload();
  };

  return (
    <AppShell
      header={
        <PageHeader
          title="設定"
          onBack={() => navigate('title')}
          currencies={[]}
          tabBar={
            <TabBar
              tabs={TABS}
              value={activeTab}
              onChange={setActiveTab}
              fullWidth
            />
          }
        />
      }
      footer={
        <BottomNav
          active="settings"
          onChange={navigate}
        />
      }
    >
      <div className={styles.content}>
        {activeTab === 'sound' && <SoundSettingsTab />}
        {activeTab === 'game' && <GameSettingsTab />}
        {activeTab === 'data' && (
          <DataSettingsTab
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
          />
        )}
      </div>
    </AppShell>
  );
}
