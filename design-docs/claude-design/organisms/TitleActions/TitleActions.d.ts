export interface TitleActionsProps {
  hasSave?: boolean;
  onResume?: () => void;
  onNewGame?: () => void;
  onSettings?: () => void;
  /** 例 "12 分前" "2025/06/21" */
  lastSavedAt?: string;
}

export declare function TitleActions(props: TitleActionsProps): JSX.Element;
