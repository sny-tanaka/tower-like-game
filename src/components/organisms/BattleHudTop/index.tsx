import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';
import { WaveProgressBar } from '@/components/molecules/WaveProgressBar';
import type { WaveMilestone } from '@/components/molecules/WaveProgressBar';
import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface BattleHudTopProps {
  /** マシン現在 HP */
  hpCurrent: BigNum;
  /** マシン最大 HP */
  hpMax: BigNum;
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
  /** 次のマイルストーン（WaveProgressBar に渡す） */
  nextMilestone?: WaveMilestone;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー: BigNum の比率を 0〜1000 の整数で返す
// ---------------------------------------------------------------------------

function hpRatio1000(current: BigNum, max: BigNum): number {
  if (max.isZero()) return 0;
  // toString() で整数文字列を取得し JS の number で近似計算
  // 超巨大数では精度が落ちるが UI 表示用なので許容範囲内
  const c = parseFloat(current.toString());
  const m = parseFloat(max.toString());
  if (m === 0 || isNaN(m)) return 0;
  return Math.min(1000, Math.max(0, Math.round((c / m) * 1000)));
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function BattleHudTop({
  hpCurrent,
  hpMax,
  tier,
  wave,
  totalWaves,
  secondsRemaining,
  secondsTotal,
  isBossWave = false,
  nextMilestone,
}: BattleHudTopProps) {
  // HP 比率を計算（ProgressBar は number を受け取る）
  const ratio1000 = hpRatio1000(hpCurrent, hpMax);
  const hpLow = ratio1000 < 300; // 30% 未満

  return (
    <div className={styles.root}>
      {/* HP行 */}
      <div className={styles.hpRow}>
        {/* Tier バッジ */}
        <Badge
          variant="tier"
          tier={tier}
          size="sm"
          glow={isBossWave}
        />

        {/* HP バー */}
        <div className={styles.hpBar}>
          <ProgressBar
            value={ratio1000}
            max={1000}
            color={hpLow ? 'hp-low' : 'hp'}
            size="md"
            variant="neon"
            glow={hpLow}
            showLabel
            label={`${hpCurrent.toDisplay()} / ${hpMax.toDisplay()}`}
          />
        </div>

        {/* Wave カウンタ */}
        <Text
          variant="label"
          color={isBossWave ? 'secondary' : 'mid'}
          className={styles.waveCount}
        >
          {wave}/{totalWaves}
        </Text>
      </div>

      {/* Wave プログレスバー */}
      <WaveProgressBar
        waveNumber={wave}
        secondsLeft={secondsRemaining}
        secondsMax={secondsTotal}
        nextMilestone={nextMilestone}
        showSeconds
        size="sm"
      />
    </div>
  );
}
