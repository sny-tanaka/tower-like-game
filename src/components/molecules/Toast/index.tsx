import { useEffect } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type ToastKind = 'info' | 'success' | 'error' | 'warning';

export interface ToastAction {
  label: string;
  onClick?: () => void;
}

export interface ToastProps {
  kind: ToastKind;
  message: string;
  /** デフォルトアイコンを上書きする */
  iconName?: IconName;
  /** アクションボタン */
  action?: ToastAction;
  /** open=false 時は非表示 */
  open?: boolean;
  /** ms 後に onDismiss を発火 (0 以下で無効) */
  duration?: number;
  onDismiss?: () => void;
}

// ---------------------------------------------------------------------------
// kind ごとのデフォルトアイコン
// ---------------------------------------------------------------------------

const DEFAULT_ICON: Record<ToastKind, IconName> = {
  info: 'spark',
  success: 'check',
  error: 'close',
  warning: 'lightning',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * トースト通知 Molecule。
 * - 画面端からスライドイン（@keyframes slideInRight）
 * - duration ms 後に onDismiss 発火
 * - タップで即 dismiss
 * - action prop でアクションボタン表示
 * - iconName prop でアイコン上書き
 * - prefers-reduced-motion 対応
 */
export function Toast({
  kind,
  message,
  iconName,
  action,
  open = true,
  duration = 3000,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onDismiss]);

  if (!open) return null;

  const effectiveIcon = iconName ?? DEFAULT_ICON[kind];

  return (
    <div
      className={[styles.toast, styles[`kind-${kind}`]].join(' ')}
      role="status"
      aria-live="polite"
      onClick={() => onDismiss?.()}
    >
      {/* アイコン */}
      <span
        className={styles.icon}
        aria-hidden="true"
      >
        <Icon
          name={effectiveIcon}
          size={16}
        />
      </span>

      {/* メッセージ */}
      <Text
        variant="body"
        className={styles.message}
      >
        {message}
      </Text>

      {/* アクションボタン */}
      {action != null && (
        <button
          type="button"
          className={styles.action}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick?.();
            onDismiss?.();
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
