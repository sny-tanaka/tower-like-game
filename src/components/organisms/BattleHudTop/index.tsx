import { memo, useMemo } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { NumericDisplay } from '@/components/atoms/NumericDisplay';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';
import { WaveProgressBar } from '@/components/molecules/WaveProgressBar';
import type { WaveMilestone } from '@/components/molecules/WaveProgressBar';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

export interface BattleHudTopProps {
  /** シールド (optional) */
  shieldCurrent?: BigNum;
  shieldMax?: BigNum;
  /** 総 Wave 数 */
  totalWaves: number;
  /** ウェーブ残り秒数 */
  secondsRemaining: number;
  /** ウェーブ合計秒数 */
  secondsTotal: number;
  /** ボスウェーブかどうか */
  isBossWave?: boolean;
  /** 次のマイルストーン */
  nextMilestone?: WaveMilestone;
  /**
   * ResultDialog 表示中フラグ。 Page で `effectiveResultStatus !== null` を計算して渡す。
   * 内部の `isPaused || isResultOpen` 判定に使う (= リザルト中も Wave タイマーアニメを停止)。
   */
  isResultOpen?: boolean;
}

/**
 * BattleHudTop — バトル画面上端 HUD Organism
 *
 * design ref (BattleHudTop.jsx) の縦並び 3 段構成:
 *   1. ヘッダー行: Tier バッジ + 'HP' ラベル + HP数値 (current / max) + Shield (任意)
 *   2. HP プログレスバー (色 hp / solid)
 *   3. Shield プログレスバー (任意)
 *   4. Wave プログレスバー (number / secondsLeft / nextMilestone)
 *
 * v1.3.7 Phase 4-A: 親 (Page) から prop drilling していた hpCurrent / hpMax / tier / wave / paused
 * を撤去し、 内部で `useStore` selector を直接購読する。 さらに `React.memo` でラップして、
 * 自身が subscribe している値が変化したフレーム + 親 props (secondsRemaining 等) が変化した
 * フレームだけ再 render するようにした (= Page の re-render が BattleHudTop に伝播しない)。
 */
function BattleHudTopImpl({
  shieldCurrent,
  shieldMax,
  totalWaves,
  secondsRemaining,
  secondsTotal,
  isBossWave = false,
  nextMilestone,
  isResultOpen = false,
}: BattleHudTopProps) {
  // ── store から直接 subscribe (Page を経由しない) ──
  // selector を 1 値ずつ書くことで、 zustand のデフォルト Object.is 比較に乗る。
  // (例: tier だけ更新 → 他の selector は同一参照を返すので、 Object.is で再 render skip)
  const machineHp = useStore((s) => s.machineHp);
  const machineMaxHp = useStore((s) => s.machineMaxHp);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);
  const isPaused = useStore((s) => s.isPaused);

  // machineMaxHp が 0 (ラン外) のときは 1 にクランプ (computeRatio の 0 除算回避)
  // (旧 Page 側 hpMaxBn useMemo の移譲)
  const hpMaxBn = useMemo(
    () => (machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp),
    [machineMaxHp]
  );
  const paused = isPaused || isResultOpen;

  const effectiveMilestone =
    nextMilestone ??
    (isBossWave ? ({ wave: currentWave, kind: 'boss' } as WaveMilestone) : undefined);

  const hasShield = shieldCurrent != null && shieldMax != null;
  // ProgressBar は number で受けるため、display 比 (0-100) を渡す
  const hpRatio = computeRatio(machineHp, hpMaxBn);
  const shieldRatio = hasShield ? computeRatio(shieldCurrent, shieldMax) : 0;

  return (
    <div
      className={styles.root}
      role="group"
      aria-label="バトル状態"
    >
      {/* ── ヘッダー行: Tier + HP数値 + Shield ── */}
      <div className={styles.headerRow}>
        <Badge
          variant="tier"
          tier={currentTier}
          size="md"
          glow
        />
        <Text
          variant="label"
          color="dim"
          style={{ fontSize: 10 }}
        >
          HP
        </Text>
        <span
          className={styles.hpValue}
          aria-label={`HP ${machineHp.toDisplay()} / ${hpMaxBn.toDisplay()}`}
        >
          <NumericDisplay
            value={machineHp}
            size="sm"
            accentColor="text"
            style={{ fontSize: 14 }}
          />
          <span className={styles.hpDivider}>/</span>
          <NumericDisplay
            value={hpMaxBn}
            size="sm"
            accentColor="dim"
            style={{ fontSize: 11 }}
          />
        </span>
        {hasShield && (
          <span className={styles.shieldBlock}>
            <Text
              variant="label"
              color="primary"
              style={{ fontSize: 9.5 }}
            >
              SHLD
            </Text>
            <NumericDisplay
              value={shieldCurrent}
              size="sm"
              accentColor="primary"
              style={{ fontSize: 11 }}
            />
          </span>
        )}
      </div>

      {/* ── HP バー ── */}
      <ProgressBar
        value={hpRatio}
        max={100}
        color={hpRatio <= 30 ? 'hp-low' : 'hp'}
        size="md"
      />

      {/* ── Shield バー (任意) ── */}
      {hasShield && (
        <ProgressBar
          value={shieldRatio}
          max={100}
          color="shield"
          size="sm"
        />
      )}

      {/* ── Wave 進捗 (ボス wave は時間カウントダウンせず BOSS WAVE 表示) ── */}
      <WaveProgressBar
        waveNumber={currentWave}
        secondsLeft={secondsRemaining}
        secondsMax={secondsTotal}
        nextMilestone={effectiveMilestone}
        // ボス wave では時間を表示しない（isBossWave 側のバナーで代替）
        showSeconds={false}
        size="sm"
        paused={paused}
        isBossWave={isBossWave}
      />

      {/* SR 用に wave/total を hidden で残す（既存テスト互換） */}
      <span
        className={styles.srOnly}
        aria-hidden="false"
      >
        {currentWave}/{totalWaves}
      </span>
    </div>
  );
}

export const BattleHudTop = memo(BattleHudTopImpl);
BattleHudTop.displayName = 'BattleHudTop';

function computeRatio(current: BigNum, max: BigNum): number {
  // BigNum は number 比に変換できないため、toDisplay 経由ではなく toString で
  // 浮動小数化する。max が 0 のときは 0 を返す。
  const c = parseFloat(current.toString());
  const m = parseFloat(max.toString());
  if (m === 0) return 0;
  return Math.max(0, Math.min(100, (c / m) * 100));
}
