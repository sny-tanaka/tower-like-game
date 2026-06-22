import { useEffect } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';

export type ToastKind = 'info' | 'success' | 'error' | 'warning';

export interface ToastProps {
  open: boolean;
  kind: ToastKind;
  message: string;
  onDismiss?: () => void;
  duration?: number;
}

function kindToIcon(kind: ToastKind): IconName {
  switch (kind) {
    case 'info':
      return 'spark';
    case 'success':
      return 'check';
    case 'error':
      return 'close';
    case 'warning':
      return 'lightning';
  }
}

/**
 * トースト通知 Molecule。
 * - open=true でスライドイン、duration(ms) 後に onDismiss 発火
 * - タップで即 dismiss
 * - prefers-reduced-motion 対応
 */
export function Toast({ open, kind, message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onDismiss]);

  if (!open) return null;

  return (
    <div
      className={[styles.toast, styles[`kind-${kind}`]].join(' ')}
      role="status"
      aria-live="polite"
      onClick={() => onDismiss?.()}
    >
      <span
        className={styles.icon}
        aria-hidden="true"
      >
        <Icon
          name={kindToIcon(kind)}
          size={16}
        />
      </span>
      <Text
        variant="body"
        className={styles.message}
      >
        {message}
      </Text>
    </div>
  );
}
