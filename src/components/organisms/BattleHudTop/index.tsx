import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { NumericDisplay } from '@/components/atoms/NumericDisplay';
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
  /** フィールド上の敵の残数 (右端 target カウンタ用) */
  enemiesRemaining?: number;
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
  enemiesRemaining,
}: BattleHudTopProps) {
  // design.png の 3 カラム構成:
  //   左   : Tier バッジ + HP (通貨ライク表示)
  //   中央 : WaveProgressBar (薄バー + マイルストーン)
  //   右   : 残敵数 + target アイコン
  const effectiveMilestone =
    nextMilestone ?? (isBossWave ? ({ wave, kind: 'boss' } as WaveMilestone) : undefined);
  const remaining = enemiesRemaining ?? 0;

  return (
    <div className={styles.root}>
      {/* 左カラム: Tier + HP */}
      <div className={styles.leftCol}>
        <Badge
          variant="tier"
          tier={tier}
          size="sm"
          glow={isBossWave}
        />
        <span
          className={styles.hpText}
          aria-label={`HP ${hpCurrent.toDisplay()} / ${hpMax.toDisplay()}`}
        >
          <NumericDisplay
            value={hpCurrent}
            size="sm"
            accentColor="text"
            style={{ fontWeight: 'var(--fw-semibold)' }}
          />
          <span className={styles.hpDivider}>/</span>
          <NumericDisplay
            value={hpMax}
            size="sm"
            accentColor="dim"
          />
        </span>
      </div>

      {/* 中央カラム: WaveProgressBar */}
      <div className={styles.centerCol}>
        <WaveProgressBar
          waveNumber={wave}
          secondsLeft={secondsRemaining}
          secondsMax={secondsTotal}
          nextMilestone={effectiveMilestone}
          showSeconds={false}
          size="sm"
        />
        {/* SR 用に wave/total を hidden で残す（既存テスト互換） */}
        <span
          className={styles.srOnly}
          aria-hidden="false"
        >
          {wave}/{totalWaves}
        </span>
      </div>

      {/* 右カラム: 残敵数 + target */}
      <div
        className={styles.rightCol}
        aria-label={`残敵 ${remaining}`}
      >
        <Text
          variant="numeric-s"
          color="text"
          className={styles.enemiesNum}
        >
          {remaining}
        </Text>
        <Icon
          name="target"
          size={14}
          color="var(--c-text-mid)"
        />
      </div>
    </div>
  );
}
