import { useState } from 'react';

import styles from './style.module.scss';

import { AppShell } from '@/components/organisms/AppShell';
import { BattleField } from '@/components/organisms/BattleField';
import type { DamageEvent, DeathEvent, HitEvent } from '@/components/organisms/BattleField';
import { BattleHudBottom } from '@/components/organisms/BattleHudBottom';
import type { GameSpeed } from '@/components/organisms/BattleHudBottom';
import { BattleHudTop } from '@/components/organisms/BattleHudTop';
import { BattleMenuOverlay } from '@/components/organisms/BattleMenuOverlay';
import { ResultDialog } from '@/components/organisms/ResultDialog';
import type { ResultReward, ResultStatus } from '@/components/organisms/ResultDialog';
import { RunWorkshopBottomSheet } from '@/components/organisms/RunWorkshopBottomSheet';
import type { RunWorkshopLevels } from '@/components/organisms/RunWorkshopBottomSheet';
import { ScreenSaverDialog } from '@/components/organisms/ScreenSaverDialog';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { useNavigation } from '@/store/navigation';

// ---------------------------------------------------------------------------
// デフォルト値
// ---------------------------------------------------------------------------

/** アクティブ CD 最大値（秒）- バトルロジック配線前の暫定値 */
const DEFAULT_ACTIVE_MAX_SEC = 30;

/** 索敵半径（パーセント） */
const DEFAULT_RANGE = 30;

/** RunWorkshop 初期 Lv */
const defaultRunWorkshopLevels: RunWorkshopLevels = {
  attackMul: 0,
  attackSpeedMul: 0,
  hpMul: 0,
  screwGainMul: 0,
};

/**
 * リザルトダイアログが開いているかの判定。
 * isRunActive: true のときだけ HP チェックを行う（ラン開始前の初期 HP=0 でリザルトを出さない）。
 */
function resolveResultStatus(isRunActive: boolean, machineHp: number): ResultStatus | null {
  if (!isRunActive) return null;
  if (machineHp <= 0) return 'gameover';
  return null;
}

// ---------------------------------------------------------------------------
// BattleScreen Page
// ---------------------------------------------------------------------------

/**
 * BattleScreen — バトル画面。
 *
 * AppShell(noScroll, variant='battle') + BattleHudTop / BattleField / BattleHudBottom を配置。
 * overlay 層に RunWorkshopBottomSheet / BattleMenuOverlay / ResultDialog / ScreenSaverDialog を絶対配置。
 * BottomNav なし（バトル中は他画面遷移しない）。
 *
 * バトルロジック（Tick / 武器発射）は別 issue で配線するため、ここでは UI の状態→表示マッピングのみ。
 */
export function Page() {
  const { navigate } = useNavigation();

  // ── store から battle slice の状態取得 ──
  const isRunActive = useStore((s) => s.isRunActive);
  const screw = useStore((s) => s.screw);
  const machineHp = useStore((s) => s.machineHp);
  const machineMaxHp = useStore((s) => s.machineMaxHp);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);
  const currentWeapon = useStore((s) => s.currentWeapon);
  const activeCdSec = useStore((s) => s.activeCdSec);
  const isAutoActive = useStore((s) => s.isAutoActive);
  const gameSpeed = useStore((s) => s.gameSpeed);

  // settings slice
  const bgmVolume = useStore((s) => s.bgmVolume);
  const seVolume = useStore((s) => s.seVolume);
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);
  const setAutoActive = useStore((s) => s.setAutoActive);
  const switchWeapon = useStore((s) => s.switchWeapon);

  // ── ローカル UI state ──
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScreenSaverOpen, setIsScreenSaverOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [localGameSpeed, setLocalGameSpeed] = useState<GameSpeed>(gameSpeed);
  const [runWorkshopLevels, setRunWorkshopLevels] = useState<RunWorkshopLevels>(
    defaultRunWorkshopLevels
  );

  // Fx イベント（バトルロジック配線前は空リスト）
  const [damageEvents] = useState<DamageEvent[]>([]);
  const [hitEvents] = useState<HitEvent[]>([]);
  const [deathEvents] = useState<DeathEvent[]>([]);

  // 武器切替 CD（暫定: すべて 100 = CD なし）
  const weaponCds = {
    laser: 100,
    cannon: 100,
    thunder: 100,
    cutter: 100,
  } as const;

  // ── リザルト状態 ──
  const autoResultStatus = resolveResultStatus(isRunActive, machineHp);
  // 撤退時は 'retreat' を手動で set するためローカル state で保持
  const [resultStatus, setResultStatus] = useState<ResultStatus | null>(null);
  const effectiveResultStatus = resultStatus ?? autoResultStatus;
  const isResultOpen = effectiveResultStatus !== null;

  // ── HP を BigNum に変換（BattleHudTop は BigNum を受け取る）──
  const hpCurrentBn = BigNum.fromNumber(machineHp);
  const hpMaxBn = BigNum.fromNumber(machineMaxHp > 0 ? machineMaxHp : 1);

  // ── ハンドラ ──
  const handleSpeedChange = (speed: GameSpeed) => {
    setLocalGameSpeed(speed);
    // TODO: ゲームループへの反映は 8-8 で実装
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
    // TODO: ゲームループへの反映は 8-8 で実装
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleOpenScreenSaver = () => {
    setIsScreenSaverOpen(true);
  };

  const handleRetreat = () => {
    setIsMenuOpen(false);
    setResultStatus('retreat');
  };

  const handleResultClose = () => {
    navigate('preparation');
  };

  const handleWorkshopUpgrade = (key: keyof RunWorkshopLevels, delta: 1 | 5 | 'max') => {
    setRunWorkshopLevels((prev) => ({
      ...prev,
      [key]: prev[key] + (delta === 'max' ? 1 : delta),
    }));
    // TODO: スクリーン購入処理は 8-8 で実装
  };

  // リザルトダイアログ用ダミーリワード（バトルロジック配線前）
  const dummyReward: ResultReward = {
    bolt: BigNum.ZERO,
    alloy: BigNum.ZERO,
    patches: [],
  };

  // ── wave 関連（暫定値） ──
  const TOTAL_WAVES = 30;
  const WAVE_SECONDS_TOTAL = 30;
  const WAVE_SECONDS_REMAINING = 30;

  return (
    <div className={styles.root}>
      <AppShell
        noScroll
        variant="battle"
        header={
          <BattleHudTop
            hpCurrent={hpCurrentBn}
            hpMax={hpMaxBn}
            tier={currentTier}
            wave={currentWave}
            totalWaves={TOTAL_WAVES}
            secondsRemaining={WAVE_SECONDS_REMAINING}
            secondsTotal={WAVE_SECONDS_TOTAL}
            isBossWave={currentWave === TOTAL_WAVES}
          />
        }
        footer={
          <BattleHudBottom
            screw={screw}
            equippedWeapon={currentWeapon}
            weaponCds={weaponCds}
            activeCd={activeCdSec}
            activeMax={DEFAULT_ACTIVE_MAX_SEC}
            isAutoActive={isAutoActive}
            onSwitchWeapon={switchWeapon}
            onActivate={() => {
              // TODO: 8-8 で実装
            }}
            onToggleAuto={setAutoActive}
            gameSpeed={localGameSpeed}
            onSpeedChange={handleSpeedChange}
            isPaused={isPaused}
            onTogglePause={handleTogglePause}
            onOpenMenu={handleOpenMenu}
            onOpenScreenSaver={handleOpenScreenSaver}
          />
        }
      >
        {/* メインコンテンツ: BattleField */}
        <BattleField
          enemies={[]}
          damageEvents={damageEvents}
          hitEvents={hitEvents}
          deathEvents={deathEvents}
          range={DEFAULT_RANGE}
        />
      </AppShell>

      {/* ── overlay 層（AppShell の外、root に対して絶対配置）── */}
      <div
        className={styles.overlayLayer}
        aria-live="polite"
      >
        {/* ラン内ワークショップ */}
        <RunWorkshopBottomSheet
          open={isWorkshopOpen}
          screw={screw}
          levels={runWorkshopLevels}
          onUpgrade={handleWorkshopUpgrade}
          onClose={() => {
            setIsWorkshopOpen(false);
          }}
        />

        {/* バトルメニュー */}
        <BattleMenuOverlay
          open={isMenuOpen}
          bgmVolume={bgmVolume}
          seVolume={seVolume}
          onBgmChange={setBgmVolume}
          onSeChange={setSeVolume}
          onRetreat={handleRetreat}
          onClose={() => {
            setIsMenuOpen(false);
          }}
        />

        {/* リザルトダイアログ */}
        {isResultOpen && (
          <ResultDialog
            open={isResultOpen}
            status={effectiveResultStatus!}
            reachedTier={currentTier}
            reachedWave={currentWave}
            killed={0}
            elapsedSec={0}
            reward={dummyReward}
            onClose={handleResultClose}
          />
        )}

        {/* スクリーンセーバー */}
        <ScreenSaverDialog
          open={isScreenSaverOpen}
          onClose={() => {
            setIsScreenSaverOpen(false);
          }}
        />
      </div>
    </div>
  );
}
