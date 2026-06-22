import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { useStore } from '@/store/index';
import { useNavigation } from '@/store/navigation';

export interface TitleActionsProps {
  /** 「続きから」押下コールバック。省略時は store 経由で画面遷移 */
  onResume?: () => void;
  /** 「新規開始」押下コールバック */
  onNewGame?: () => void;
  /** 「設定」押下コールバック。省略時は navigation で 'settings' へ遷移 */
  onSettings?: () => void;
  /** 最終セーブの相対時刻ラベル (例 "12 分前") */
  lastSavedAt?: string;
}

/**
 * TitleActions — タイトル画面のアクション群 Organism
 *
 * store の `createdAt` でセーブ判定し、
 * - セーブあり: 「続きから (primary)」「新規開始 (ghost)」「設定」
 * - セーブなし: 「続きから (無効/ghost)」「新規開始 (primary)」「設定」
 */
export function TitleActions({ onResume, onNewGame, onSettings, lastSavedAt }: TitleActionsProps) {
  const createdAt = useStore((s) => s.createdAt);
  const { navigate } = useNavigation();

  const hasSave = createdAt > 0;

  function handleSettings() {
    if (onSettings) {
      onSettings();
    } else {
      navigate('settings');
    }
  }

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
          style={{ fontSize: 10.5, marginTop: -2 }}
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

      {/* 設定 */}
      <Button
        label="設定"
        variant="ghost"
        size="md"
        fullWidth
        iconLeft={
          <Icon
            name="settings"
            size={16}
          />
        }
        onClick={handleSettings}
      />
    </div>
  );
}
