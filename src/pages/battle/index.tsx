import { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import { AppearanceBannerFx } from '@/components/fx/AppearanceBannerFx';
import { WaveStartFx } from '@/components/fx/WaveStartFx';
import { AppShell } from '@/components/organisms/AppShell';
import { BattleField } from '@/components/organisms/BattleField';
import type { HitEvent } from '@/components/organisms/BattleField';
import { BattleHudBottom } from '@/components/organisms/BattleHudBottom';
import { BattleHudTop } from '@/components/organisms/BattleHudTop';
import { BattleMenuOverlay } from '@/components/organisms/BattleMenuOverlay';
import { ResultDialog } from '@/components/organisms/ResultDialog';
import type { ResultReward, ResultStatus } from '@/components/organisms/ResultDialog';
import { RunWorkshopBottomSheet } from '@/components/organisms/RunWorkshopBottomSheet';
import type { RunWorkshopKey } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { ScreenSaverDialog } from '@/components/organisms/ScreenSaverDialog';
import { WAVE_DURATION_SEC } from '@/game/wave';
import { useBattleLoop } from '@/hooks/useBattleLoop';
import { soundEngine } from '@/lib/audio';
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

/**
 * リザルトダイアログが開いているかの判定。
 * isRunActive: true のときだけ HP チェックを行う（ラン開始前の初期 HP=0 でリザルトを出さない）。
 */
function resolveResultStatus(isRunActive: boolean, machineHp: BigNum): ResultStatus | null {
  if (!isRunActive) return null;
  if (machineHp.lte(BigNum.ZERO)) return 'gameover';
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

  // ── store から状態取得 ──
  const isRunActive = useStore((s) => s.isRunActive);
  const screw = useStore((s) => s.screw);
  const bolt = useStore((s) => s.bolt);
  const alloy = useStore((s) => s.alloy);
  const runStartBolt = useStore((s) => s.runStartBolt);
  const runStartAlloy = useStore((s) => s.runStartAlloy);
  const machineHp = useStore((s) => s.machineHp);
  const machineMaxHp = useStore((s) => s.machineMaxHp);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);
  const currentWeapon = useStore((s) => s.currentWeapon);
  const activeCdSec = useStore((s) => s.activeCdSec);
  const isAutoActive = useStore((s) => s.isAutoActive);
  const isPaused = useStore((s) => s.isPaused);
  const runWorkshopLevels = useStore((s) => s.runWorkshopLevels);

  // settings slice
  const bgmVolume = useStore((s) => s.bgmVolume);
  const seVolume = useStore((s) => s.seVolume);
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);
  const setAutoActive = useStore((s) => s.setAutoActive);
  const switchWeapon = useStore((s) => s.switchWeapon);
  const setPaused = useStore((s) => s.setPaused);
  const upgradeRunWorkshop = useStore((s) => s.upgradeRunWorkshop);
  const triggerActive = useStore((s) => s.triggerActive);

  // ── ローカル UI state (overlay 開閉) ──
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScreenSaverOpen, setIsScreenSaverOpen] = useState(false);

  // ── BATTLE START バナー: マウント時 + isRunActive=true で 1.6 秒表示 ──
  const [isBattleStartShown, setIsBattleStartShown] = useState(false);
  useEffect(() => {
    if (isRunActive) setIsBattleStartShown(true);
  }, [isRunActive]);

  // ── BGM: wave に応じて切替 (App.tsx の画面別 BGM を wave 30 のみ上書き) ──
  useEffect(() => {
    if (currentWave === 30) {
      soundEngine.playBgm('battleBoss');
    } else {
      soundEngine.playBgm('battleNormal');
    }
  }, [currentWave]);

  // ── WaveStartFx: 「次の wave へ進んだ瞬間」のみ表示 (出撃直後は出さない) ──
  const prevWaveRef = useRef(currentWave);
  const [waveStartKey, setWaveStartKey] = useState<number | null>(null);
  useEffect(() => {
    if (prevWaveRef.current !== currentWave) {
      setWaveStartKey((k) => (k ?? 0) + 1);
    }
    prevWaveRef.current = currentWave;
  }, [currentWave]);

  // ── リザルト状態 (useBattleLoop に paused として渡すため先に計算) ──
  const autoResultStatus = resolveResultStatus(isRunActive, machineHp);
  // 撤退時は 'retreat' を手動で set するためローカル state で保持
  const [resultStatus, setResultStatus] = useState<ResultStatus | null>(null);
  const effectiveResultStatus = resultStatus ?? autoResultStatus;
  const isResultOpen = effectiveResultStatus !== null;

  // ── ゲームループ (敵 spawn / 武器発射 / ダメージ / 撃破 / 被ダメ / 弾道 / ドロップ) ──
  // ResultDialog 表示中 (撤退 / gameover) は paused で完全停止させる
  const {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    pickupEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    onPickupDone,
  } = useBattleLoop({
    range: DEFAULT_RANGE,
    paused: isResultOpen,
  });

  // Wave 残り時間: 0 になったら advanceWave が走り経過秒はリセットされる
  const waveSecondsRemaining = Math.max(0, WAVE_DURATION_SEC - waveElapsedSec);

  // HitEvent (EnemyHitFx) は別途配線予定。 当面 [] のまま (弾道は projectileEvents が担う)
  const hitEvents: HitEvent[] = [];

  // 武器切替 CD（暫定: すべて 100 = CD なし）
  const weaponCds = {
    laser: 100,
    cannon: 100,
    thunder: 100,
    cutter: 100,
  } as const;

  // BattleHudTop は BigNum を受け取る — machineMaxHp が 0 (ラン外) のときは 1 にクランプ
  const hpCurrentBn = machineHp;
  const hpMaxBn = machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp;

  // ── ハンドラ ──
  const handleTogglePause = () => {
    setPaused(!isPaused);
    soundEngine.play('tap');
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    soundEngine.play('dialogOpen');
  };

  const handleOpenScreenSaver = () => {
    setIsScreenSaverOpen(true);
    soundEngine.play('dialogOpen');
  };

  const handleRetreat = () => {
    setIsMenuOpen(false);
    setResultStatus('retreat');
    soundEngine.play('resultRetreat');
  };

  const handleResultClose = () => {
    navigate('preparation');
  };

  const handleWorkshopUpgrade = (key: RunWorkshopKey, delta: 1 | 5 | 'max') => {
    const ok = upgradeRunWorkshop(key, delta);
    soundEngine.play(ok ? 'purchaseOk' : 'reject');
  };

  const handleSwitchWeapon = (weapon: typeof currentWeapon) => {
    switchWeapon(weapon);
    soundEngine.play('weaponSwitch');
  };

  const handleManualActivate = () => {
    const ok = triggerActive(DEFAULT_ACTIVE_MAX_SEC);
    if (!ok) {
      soundEngine.play('reject');
      return;
    }
    const sid =
      currentWeapon === 'laser'
        ? 'activeLaser'
        : currentWeapon === 'cannon'
          ? 'activeCannon'
          : currentWeapon === 'thunder'
            ? 'activeThunder'
            : 'activeCutter';
    soundEngine.play(sid);
  };

  // リザルトリワード: ラン開始時残高からの差分で算出 (負にならないようクランプ)
  const earnedBolt = bolt.sub(runStartBolt);
  const earnedAlloy = alloy.sub(runStartAlloy);
  const resultReward: ResultReward = {
    bolt: earnedBolt.lt(BigNum.ZERO) ? BigNum.ZERO : earnedBolt,
    alloy: earnedAlloy.lt(BigNum.ZERO) ? BigNum.ZERO : earnedAlloy,
    patches: [],
  };

  // ── wave 関連 ──
  const TOTAL_WAVES = 30;

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
            secondsRemaining={waveSecondsRemaining}
            secondsTotal={WAVE_DURATION_SEC}
            isBossWave={currentWave === TOTAL_WAVES}
            paused={isPaused || isResultOpen}
          />
        }
        footer={
          <div className={styles.battleFooter}>
            {/* ワークショップシート: HudBottom の上に absolute で重ねる overlay。
                BattleField の高さは変えない。 */}
            <RunWorkshopBottomSheet
              open={isWorkshopOpen}
              screw={screw}
              levels={runWorkshopLevels}
              onUpgrade={handleWorkshopUpgrade}
              onClose={() => {
                setIsWorkshopOpen(false);
              }}
            />
            <BattleHudBottom
              screw={screw}
              equippedWeapon={currentWeapon}
              weaponCds={weaponCds}
              activeCd={activeCdSec}
              activeMax={DEFAULT_ACTIVE_MAX_SEC}
              isAutoActive={isAutoActive}
              onSwitchWeapon={handleSwitchWeapon}
              onActivate={handleManualActivate}
              onToggleAuto={setAutoActive}
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
              onOpenMenu={handleOpenMenu}
              onOpenScreenSaver={handleOpenScreenSaver}
              isWorkshopOpen={isWorkshopOpen}
              onToggleWorkshop={() => {
                setIsWorkshopOpen((prev) => !prev);
              }}
            />
          </div>
        }
      >
        {/* メインコンテンツ: BattleField */}
        <BattleField
          enemies={enemies}
          damageEvents={damageEvents}
          hitEvents={hitEvents}
          deathEvents={deathEvents}
          projectileEvents={projectileEvents}
          pickupEvents={pickupEvents}
          onDamageDone={onDamageDone}
          onDeathDone={onDeathDone}
          onProjectileDone={onProjectileDone}
          onPickupDone={onPickupDone}
          showCutterOrbit={currentWeapon === 'cutter' && isRunActive && !isPaused && !isResultOpen}
          range={DEFAULT_RANGE}
        />
      </AppShell>

      {/* ── overlay 層（AppShell の外、root に対して絶対配置）── */}
      <div
        className={styles.overlayLayer}
        aria-live="polite"
      >
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
            reward={resultReward}
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

        {/* BATTLE START バナー (出撃直後 1.6 秒) */}
        {isBattleStartShown && (
          <AppearanceBannerFx
            kind="battle-start"
            onDone={() => {
              setIsBattleStartShown(false);
            }}
          />
        )}

        {/* Wave 進行バナー (wave 切替時の 1.1 秒) */}
        {waveStartKey != null && (
          <WaveStartFx
            key={waveStartKey}
            waveNumber={currentWave}
            onDone={() => {
              setWaveStartKey(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
