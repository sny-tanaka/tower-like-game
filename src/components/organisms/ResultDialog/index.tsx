import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Overlay } from '@/components/atoms/Overlay';
import { Text } from '@/components/atoms/Text';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type ResultStatus = 'clear' | 'gameover' | 'retreat';

export interface PatchReward {
  name: string;
  tier: number;
  count: number;
}

export interface ResultReward {
  bolt: BigNum;
  alloy: BigNum;
  patches: PatchReward[];
}

export interface ResultDialogProps {
  open: boolean;
  status: ResultStatus;
  reachedTier: number;
  reachedWave: number;
  killed: number;
  elapsedSec: number;
  reward: ResultReward;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

const STATUS_LABEL: Record<ResultStatus, string> = {
  clear: 'クリア',
  gameover: '全滅',
  retreat: '撤退',
};

type TextColor = 'success' | 'danger' | 'warning';

const STATUS_COLOR: Record<ResultStatus, TextColor> = {
  clear: 'success',
  gameover: 'danger',
  retreat: 'warning',
};

/** 秒数を MM:SS 形式に変換 */
function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * ResultDialog — バトル終了時のリザルトダイアログ。
 *
 * 構成: Overlay (dismissible=false) + Card 内に
 *   - ヘッダー: status に応じた Text + 色
 *   - 統計: 到達 Tier / Wave / 撃破数 / 所要時間
 *   - 獲得: CurrencyAmount × 2 (bolt, alloy) + パッチ一覧
 *   - アクション: Button "出撃準備へ" 1 つ
 */
export function ResultDialog({
  open,
  status,
  reachedTier,
  reachedWave,
  killed,
  elapsedSec,
  reward,
  onClose,
}: ResultDialogProps) {
  if (!open) return null;

  const statusLabel = STATUS_LABEL[status];
  const statusColor = STATUS_COLOR[status];

  return (
    <Overlay
      open={open}
      onClose={undefined}
      dimLevel="heavy"
      blur={4}
      dismissible={false}
    >
      <Card
        variant="elevated"
        padding="lg"
        className={styles.card}
      >
        {/* ヘッダー */}
        <div className={styles.header}>
          <Text
            variant="heading-1"
            as="h2"
            color={statusColor}
            align="center"
            className={styles.statusText}
          >
            {statusLabel}
          </Text>
        </div>

        {/* 統計 */}
        <div className={styles.section}>
          <Text
            variant="label"
            color="mid"
            className={styles.sectionTitle}
          >
            バトル記録
          </Text>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <Text
                variant="caption"
                color="dim"
              >
                到達 Tier
              </Text>
              <Text
                variant="numeric-m"
                color="primary"
              >
                {reachedTier.toString()}
              </Text>
            </div>
            <div className={styles.statItem}>
              <Text
                variant="caption"
                color="dim"
              >
                到達 Wave
              </Text>
              <Text
                variant="numeric-m"
                color="primary"
              >
                {reachedWave.toString()}
              </Text>
            </div>
            <div className={styles.statItem}>
              <Text
                variant="caption"
                color="dim"
              >
                撃破数
              </Text>
              <Text
                variant="numeric-m"
                color="primary"
              >
                {killed.toString()}
              </Text>
            </div>
            <div className={styles.statItem}>
              <Text
                variant="caption"
                color="dim"
              >
                所要時間
              </Text>
              <Text
                variant="numeric-m"
                color="primary"
              >
                {formatTime(elapsedSec)}
              </Text>
            </div>
          </div>
        </div>

        {/* 獲得リソース */}
        <div className={styles.section}>
          <Text
            variant="label"
            color="mid"
            className={styles.sectionTitle}
          >
            獲得
          </Text>
          <div className={styles.rewardList}>
            <div className={styles.rewardCurrency}>
              <CurrencyAmount
                currency="bolt"
                value={reward.bolt}
                size="lg"
              />
            </div>
            <div className={styles.rewardCurrency}>
              <CurrencyAmount
                currency="alloy"
                value={reward.alloy}
                size="lg"
              />
            </div>

            {reward.patches.length > 0 && (
              <div className={styles.patchList}>
                {reward.patches.map((patch, idx) => (
                  <div
                    key={idx}
                    className={styles.patchItem}
                  >
                    <Text
                      variant="body"
                      truncate
                    >
                      {patch.name}
                    </Text>
                    <Text
                      variant="caption"
                      color="mid"
                    >
                      Tier {patch.tier.toString()}
                    </Text>
                    <Text
                      variant="numeric-s"
                      color="secondary"
                    >
                      x{patch.count.toString()}
                    </Text>
                  </div>
                ))}
              </div>
            )}

            {reward.patches.length === 0 && (
              <Text
                variant="caption"
                color="dim"
              >
                パッチドロップなし
              </Text>
            )}
          </div>
        </div>

        {/* アクション */}
        <div className={styles.actions}>
          <Button
            label="出撃準備へ"
            variant="primary"
            fullWidth
            onClick={onClose}
          />
        </div>
      </Card>
    </Overlay>
  );
}
