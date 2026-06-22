export interface TitleScreenProps {
  hasSave?: boolean;
  lastSavedAt?: string;
  onResume?: () => void;
  onNewGame?: () => void;
  onSettings?: () => void;
  version?: string;
}

export declare function TitleScreen(props: TitleScreenProps): JSX.Element;
