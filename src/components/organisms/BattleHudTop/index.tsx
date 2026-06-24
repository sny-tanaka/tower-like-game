import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { NumericDisplay } from '@/components/atoms/NumericDisplay';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';
import { WaveProgressBar } from '@/components/molecules/WaveProgressBar';
import type { WaveMilestone } from '@/components/molecules/WaveProgressBar';
import type { BigNum } from '@/lib/bignum/BigNum';

export interface BattleHudTopProps {
  /** マシン現在 HP */
  hpCurrent: BigNum;
  /** マシン最大 HP */
  hpMax: BigNum;
  /** シールド (optional) */
  shieldCurrent?: BigNum;
  shieldMax?: BigNum;
  /** 現在の Tier (1-12) */
  tier: number;
  /** 現在の Wave 番号 */
  wave: number;
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
  /** ゲーム pause 状態。 Wave タイマーアニメを停止する */
  paused?: boolean;
}

/**
 * BattleHudTop — バトル画面上端 HUD Organism
 *
 * design ref (BattleHudTop.jsx) の縦並び 3 段構成:
 *   1. ヘッダー行: Tier バッジ + 'HP' ラベル + HP数値 (current / max) + Shield (任意)
 *   2. HP プログレスバー (色 hp / solid)
 *   3. Shield プログレスバー (任意)
 *   4. Wave プログレスバー (number / secondsLeft / nextMilestone)
 */
export function BattleHudTop({
  hpCurrent,
  hpMax,
  shieldCurrent,
  shieldMax,
  tier,
  wave,
  totalWaves,
  secondsRemaining,
  secondsTotal,
  isBossWave = false,
  nextMilestone,
  paused = false,
}: BattleHudTopProps) {
  const effectiveMilestone =
    nextMilestone ?? (isBossWave ? ({ wave, kind: 'boss' } as WaveMilestone) : undefined);

  const hasShield = shieldCurrent != null && shieldMax != null;
  // ProgressBar は number で受けるため、display 比 (0-100) を渡す
  const hpRatio = computeRatio(hpCurrent, hpMax);
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
          tier={tier}
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
          aria-label={`HP ${hpCurrent.toDisplay()} / ${hpMax.toDisplay()}`}
        >
          <NumericDisplay
            value={hpCurrent}
            size="sm"
            accentColor="text"
            style={{ fontSize: 14 }}
          />
          <span className={styles.hpDivider}>/</span>
          <NumericDisplay
            value={hpMax}
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
        waveNumber={wave}
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
        {wave}/{totalWaves}
      </span>
    </div>
  );
}

function computeRatio(current: BigNum, max: BigNum): number {
  // BigNum は number 比に変換できないため、toDisplay 経由ではなく toString で
  // 浮動小数化する。max が 0 のときは 0 を返す。
  const c = parseFloat(current.toString());
  const m = parseFloat(max.toString());
  if (m === 0) return 0;
  return Math.max(0, Math.min(100, (c / m) * 100));
}
