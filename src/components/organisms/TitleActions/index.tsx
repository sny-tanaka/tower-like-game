import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { useStore } from '@/store/index';

export interface TitleActionsProps {
  /** 「続きから」押下コールバック。省略時は store 経由で画面遷移 */
  onResume?: () => void;
  /** 「新規開始」押下コールバック */
  onNewGame?: () => void;
  /** 最終セーブの相対時刻ラベル (例 "12 分前") */
  lastSavedAt?: string;
  /**
   * 「更新を確認」押下コールバック。未指定なら更新ボタンを描画しない (Storybook 等向け)。
   * production では Title page が useAppUpdate().checkForUpdate を渡す。
   */
  onCheckUpdate?: () => void;
  /** 更新チェック中フラグ。 true のときラベル「確認中…」 + disabled に。 */
  isCheckingUpdate?: boolean;
}

/**
 * TitleActions — タイトル画面のアクション群 Organism
 *
 * store の `createdAt` でセーブ判定し、
 * - セーブあり: 「続きから (primary)」「新規開始 (ghost)」
 * - セーブなし: 「続きから (無効)」「新規開始 (primary)」
 *
 * 設定への導線はタイトル画面では持たず、BottomNav 経由で各画面の右下から
 * 開く動線に統一する。
 */
export function TitleActions({
  onResume,
  onNewGame,
  lastSavedAt,
  onCheckUpdate,
  isCheckingUpdate = false,
}: TitleActionsProps) {
  const createdAt = useStore((s) => s.createdAt);

  const hasSave = createdAt > 0;

  return (
    <div className={styles.root}>
      {/* 続きから */}
      <Button
        label={hasSave ? '続きから' : '続きから (セーブなし)'}
        variant={hasSave ? 'primary' : 'ghost'}
        size="lg"
        fullWidth
        disabled={!hasSave}
        iconLeft={
          <Icon
            name="play"
            size={18}
          />
        }
        onClick={onResume}
      />

      {/* 最終セーブ時刻 */}
      {hasSave && lastSavedAt != null && (
        <Text
          variant="caption"
          color="dim"
          align="center"
          className={styles.lastSaved}
        >
          {'最終セーブ: ' + lastSavedAt}
        </Text>
      )}

      {/* 新規開始 */}
      <Button
        label="新規開始"
        variant={hasSave ? 'ghost' : 'primary'}
        size="lg"
        fullWidth
        iconLeft={
          <Icon
            name="plus"
            size={18}
          />
        }
        onClick={onNewGame}
      />

      {/* 更新を確認 (PWA SW の手動アップデート確認)。 Storybook 等で未配線なら描画しない */}
      {onCheckUpdate != null && (
        <Button
          label={isCheckingUpdate ? '確認中…' : '更新を確認'}
          variant="ghost"
          size="md"
          fullWidth
          disabled={isCheckingUpdate}
          onClick={onCheckUpdate}
        />
      )}
    </div>
  );
}
