export interface ConfirmDialogProps {
  title: string;
  /** 本文 (文字列 or 任意 ReactNode) */
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  iconName?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export declare function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
