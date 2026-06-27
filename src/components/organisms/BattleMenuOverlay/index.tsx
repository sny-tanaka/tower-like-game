import { memo, useState } from 'react';

import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Overlay } from '@/components/atoms/Overlay';
import { Slider } from '@/components/atoms/Slider';
import { Text } from '@/components/atoms/Text';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface BattleMenuOverlayProps {
  open: boolean;
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
 *
 * v1.3.7 Phase 4-C: 親 (Page) から prop drilling していた
 *   - bgmVolume / seVolume
 *   - onBgmChange / onSeChange
 * を撤去し、 内部で `useStore` selector で音量値・setter を直接購読する。 さらに `React.memo`
 * でラップして、 自身が subscribe している値が変化したフレーム + 親 props (open / callback) が
 * 変化したフレームだけ再 render する。
 *
 * 音量 setter は副作用 (SE / processRunWorkshopAuto 等) を持たないため、 内部で store action
 * を直接 Slider の onChange に渡せる。
 */
function BattleMenuOverlayImpl({ open, onRetreat, onClose }: BattleMenuOverlayProps) {
  // ── store から直接 subscribe (Page を経由しない) ──
  const bgmVolume = useStore((s) => s.bgmVolume);
  const seVolume = useStore((s) => s.seVolume);
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);

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
              onChange={setBgmVolume}
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
              onChange={setSeVolume}
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

/**
 * v1.3.7 Phase 4-C: BattleMenuOverlay を React.memo で wrap。 props を必要最小限
 * (open / onRetreat / onClose) に絞ったため、 親 (Page) が 60fps で再 render しても
 * 親 props が変化しなければ BattleMenuOverlay + 配下 (Overlay / Card / Slider × 2 等) の
 * re-render をスキップできる。 メニューが閉じている (open=false) ときは早期 return で hooks
 * 計算後すぐに null を返すため、 描画コストはほぼゼロ。
 */
export const BattleMenuOverlay = memo(BattleMenuOverlayImpl);
BattleMenuOverlay.displayName = 'BattleMenuOverlay';
