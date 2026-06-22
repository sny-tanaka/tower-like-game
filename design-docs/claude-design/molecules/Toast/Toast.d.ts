export type ToastKind = 'info' | 'success' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick?: () => void;
}

export interface ToastProps {
  kind?: ToastKind;
  message: string;
  /** kind 既定のアイコンを上書き */
  iconName?: string;
  /** 右端の任意アクション（"UNDO" 等） */
  action?: ToastAction;
}

export declare function Toast(props: ToastProps): JSX.Element;
