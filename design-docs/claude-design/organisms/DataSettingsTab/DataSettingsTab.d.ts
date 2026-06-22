export interface DataStorageInfo {
  usedKb?: number;
  slots?: number;
  lastSavedAt?: string;
}

export interface DataSettingsTabProps {
  onExport?: () => void;
  onImport?: (file: File) => void;
  onReset?: () => void;
  storageInfo?: DataStorageInfo;
}

export declare function DataSettingsTab(props: DataSettingsTabProps): JSX.Element;
