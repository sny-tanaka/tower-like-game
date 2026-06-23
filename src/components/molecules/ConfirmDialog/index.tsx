import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Overlay } from '@/components/atoms/Overlay';
import { Text } from '@/components/atoms/Text';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: string;
  /** タイトル横に表示するアイコン（省略可） */
  iconName?: IconName;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'danger';
}

/**
 * 確認ダイアログ Molecule。撤退確認 / リセット確認 等で使用。
 * Overlay (Atom) を素地に使い、内側に Card + Text × 2 + Button × 2 を配置。
 * iconName prop でタイトル横にアイコンを表示可能。
 * variant="danger" でカード枠を danger グローにする。
 */
export function ConfirmDialog({
  open,
  title,
  message,
  iconName,
  confirmLabel = '確定',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <Overlay
      open={open}
      onClose={onCancel}
      dismissible
    >
      <div
        className={[styles.dialog, variant === 'danger' ? styles.variantDanger : '']
          .filter(Boolean)
          .join(' ')}
      >
        <Card
          variant="elevated"
          padding="lg"
          className={styles.card}
        >
          {/* タイトル行: アイコン + テキスト */}
          <div className={styles.titleRow}>
            {iconName != null && (
              <span
                className={styles.titleIcon}
                aria-hidden="true"
              >
                <Icon
                  name={iconName}
                  size={20}
                  color={variant === 'danger' ? 'var(--c-danger)' : 'var(--c-primary)'}
                />
              </span>
            )}
            <Text
              variant="heading-3"
              as="h2"
              className={styles.title}
            >
              {title}
            </Text>
          </div>

          {message != null && message.length > 0 && (
            <Text
              variant="body"
              color="mid"
              className={styles.message}
            >
              {message}
            </Text>
          )}

          <div className={styles.actions}>
            <Button
              label={cancelLabel}
              variant="ghost"
              fullWidth
              onClick={onCancel}
            />
            <Button
              label={confirmLabel}
              variant={variant === 'danger' ? 'danger' : 'primary'}
              fullWidth
              onClick={onConfirm}
            />
          </div>
        </Card>
      </div>
    </Overlay>
  );
}
