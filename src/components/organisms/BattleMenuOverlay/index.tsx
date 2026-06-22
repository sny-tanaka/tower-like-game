import { useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Overlay } from '@/components/atoms/Overlay';
import { Slider } from '@/components/atoms/Slider';
import { Text } from '@/components/atoms/Text';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface BattleMenuOverlayProps {
  open: boolean;
  bgmVolume: number;
  seVolume: number;
  onBgmChange: (value: number) => void;
  onSeChange: (value: number) => void;
  onRetreat: () => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * BattleMenuOverlay — バトル中のメニューオーバーレイ。
 *
 * 構成: Overlay + Card 内に
 *   - BGM 音量 Slider
 *   - SE 音量 Slider
 *   - 撤退 Button (variant='danger', ConfirmDialog 経由)
 *   - 閉じる Button
 *
 * アクティブ手動/自動 トグルはここには含めない（BattleHudBottom 内に常駐）。
 */
export function BattleMenuOverlay({
  open,
  bgmVolume,
  seVolume,
  onBgmChange,
  onSeChange,
  onRetreat,
  onClose,
}: BattleMenuOverlayProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!open) return null;

  const handleRetreatClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmRetreat = () => {
    setConfirmOpen(false);
    onRetreat();
  };

  const handleCancelRetreat = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Overlay
        open={open}
        onClose={onClose}
        dimLevel="heavy"
        blur={4}
        dismissible={!confirmOpen}
      >
        <Card
          variant="elevated"
          padding="lg"
          className={styles.card}
        >
          {/* ヘッダー */}
          <div className={styles.header}>
            <Text
              variant="heading-2"
              as="h2"
              align="center"
            >
              メニュー
            </Text>
          </div>

          {/* 音量設定 */}
          <div className={styles.soundSection}>
            <div className={styles.sliderRow}>
              <Text
                variant="label"
                color="mid"
                className={styles.sliderLabel}
              >
                BGM
              </Text>
              <Text
                variant="numeric-s"
                color="primary"
                className={styles.sliderValue}
              >
                {Math.round(bgmVolume * 100).toString()}
              </Text>
            </div>
            <Slider
              value={bgmVolume}
              min={0}
              max={1}
              step={0.01}
              onChange={onBgmChange}
              color="primary"
            />

            <div className={styles.sliderRow}>
              <Text
                variant="label"
                color="mid"
                className={styles.sliderLabel}
              >
                SE
              </Text>
              <Text
                variant="numeric-s"
                color="primary"
                className={styles.sliderValue}
              >
                {Math.round(seVolume * 100).toString()}
              </Text>
            </div>
            <Slider
              value={seVolume}
              min={0}
              max={1}
              step={0.01}
              onChange={onSeChange}
              color="primary"
            />
          </div>

          {/* 区切り */}
          <div
            className={styles.divider}
            role="separator"
          />

          {/* アクション */}
          <div className={styles.actions}>
            <Button
              label="撤退"
              variant="danger"
              fullWidth
              onClick={handleRetreatClick}
            />
            <Button
              label="閉じる"
              variant="ghost"
              fullWidth
              onClick={onClose}
            />
          </div>
        </Card>
      </Overlay>

      <ConfirmDialog
        open={confirmOpen}
        title="撤退しますか？"
        message="バトルを終了して撤退します。獲得リソースはリザルト画面で確認できます。"
        confirmLabel="撤退する"
        cancelLabel="キャンセル"
        variant="danger"
        onConfirm={handleConfirmRetreat}
        onCancel={handleCancelRetreat}
      />
    </>
  );
}
