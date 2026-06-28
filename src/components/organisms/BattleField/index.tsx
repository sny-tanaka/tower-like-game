import { useMemo } from 'react';

import { EnemyLayer } from './EnemyLayer';
import { FxLayer } from './FxLayer';
import { ProjectileLayer } from './ProjectileLayer';
import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { CutterOrbitFx } from '@/components/fx/CutterOrbitFx';
import { EnemyHitFx } from '@/components/fx/EnemyHitFx';
import { MachineHitFx } from '@/components/fx/MachineHitFx';
import { OverdriveAuraFx } from '@/components/fx/OverdriveAuraFx';
import type { SpawnedEnemy } from '@/game/types';
import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface DamageEvent {
  /** イベント一意 ID */
  id: string;
  /** パーセント座標 X (0–100) */
  x: number;
  /** パーセント座標 Y (0–100) */
  y: number;
  /** ダメージ値 */
  value: BigNum;
  /** クリティカルか */
  crit?: boolean;
  /**
   * v1.4.0: タップ攻撃由来のダメージか。
   * true のとき FxLayer が DamagePopFx と並行で TapRingFx を敵位置に発生させる。
   * 通常攻撃 (false / undefined) では TapRingFx は出さない。
   */
  isTap?: boolean;
}

export interface HitEvent {
  /** イベント一意 ID */
  id: string;
  /** パーセント座標 X (0–100) */
  x: number;
  /** パーセント座標 Y (0–100) */
  y: number;
}

export interface DeathEvent {
  /** イベント一意 ID */
  id: string;
  /** パーセント座標 X (0–100) */
  x: number;
  /** パーセント座標 Y (0–100) */
  y: number;
}

/**
 * 武器発射時の弾道・着弾エフェクト用イベント。
 * - laser: マシン中心 → 敵位置に一直線ビーム (LaserBeamFx)
 * - cannonShell: マシン → 着弾点に砲弾飛翔 (CannonShellFx)。 duration 後に blast を別 event で出す
 * - blast: 着弾点で範囲爆発 (BlastFx)
 * - thunderStrike: 着弾点の真上から雷 (ThunderStrikeFx)。 duration 後に chain を別 event で出す
 * - chain: 各 hit を結ぶ連鎖電撃 (ChainBoltFx)。 delayMs で発火を遅らせ可能
 *
 * 各 event は単体で完結する Fx。 cannon = shell + blast、 thunder = strike + chain は
 * useBattleLoop が「同時に複数 event を生成 (blast / chain には delayMs を付ける)」で表現する。
 */
export type ProjectileEvent =
  | { id: string; kind: 'laser'; x1: number; y1: number; x2: number; y2: number }
  | {
      id: string;
      kind: 'cannonShell';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      durationMs: number;
    }
  | {
      id: string;
      kind: 'blast';
      x: number;
      y: number;
      /**
       * 爆発半径 (フィールド % 半径)。 BlastFx にそのまま流して見た目 = ダメージ判定半径を同期させる。
       * 未指定なら BlastFx のデフォルト (8) になる。
       */
      radius?: number;
      delayMs?: number;
    }
  | { id: string; kind: 'thunderStrike'; x: number; y: number; durationMs: number }
  | { id: string; kind: 'chain'; points: { x: number; y: number }[]; delayMs?: number }
  | { id: string; kind: 'megaBeam'; x: number; y: number; angle: number; widthPct?: number };

/**
 * 視覚的なダミーピン (敵 spawn ロジックと無関係の静的飾り)
 *  - 「design.png 準拠」の画面装飾として 6 個程度散布する想定
 */
export interface DummyPin {
  id: string;
  x: number;
  y: number;
  kind: 'normal' | 'elite' | 'boss';
}

export interface BattleFieldProps {
  /**
   * 表示中の敵リスト
   *
   * v1.3.7 (Phase 2-B): 内部実装は entityStore (Context 経由) から取得するようになった。
   * 本 props は互換性のため optional に残置 (= 渡しても無視される)。 Phase 2-C で削除予定。
   */
  enemies?: SpawnedEnemy[];
  /** マシン中心パーセント座標 (default: { x: 50, y: 50 } — THE TOWER オマージュで中央配置) */
  machinePosition?: { x: number; y: number };
  /**
   * DamagePop 描画イベント
   *
   * v1.3.7 (Phase 2-B): FxLayer が entityStore から直接取得するため、 本 props は無視される。
   */
  damageEvents?: DamageEvent[];
  /** EnemyHit 描画イベント */
  hitEvents: HitEvent[];
  /**
   * EnemyDeath 描画イベント
   *
   * v1.3.7 (Phase 2-B): FxLayer が entityStore から直接取得するため、 本 props は無視される。
   */
  deathEvents?: DeathEvent[];
  /**
   * DamagePopFx 完了通知
   *
   * v1.3.7 (Phase 2-B): FxLayer が直接 entityStore.queueRemoval を呼ぶため、 本 props は無視。
   */
  onDamageDone?: (id: string) => void;
  /** EnemyHitFx 完了通知 */
  onHitDone?: (id: string) => void;
  /**
   * EnemyDeathFx 完了通知
   *
   * v1.3.7 (Phase 2-B): FxLayer が直接 entityStore.queueRemoval を呼ぶため、 本 props は無視。
   */
  onDeathDone?: (id: string) => void;
  /**
   * 弾道 / 着弾エフェクト
   *
   * v1.3.7 (Phase 2-B): ProjectileLayer が entityStore から直接取得するため、 本 props は無視。
   */
  projectileEvents?: ProjectileEvent[];
  /**
   * ProjectileFx 完了通知
   *
   * v1.3.7 (Phase 2-B): ProjectileLayer が直接 entityStore.queueRemoval を呼ぶため、 本 props は無視。
   */
  onProjectileDone?: (id: string) => void;
  /**
   * Cutter の常時回転刃を表示するか。
   * battle 画面側で `currentWeapon === 'cutter' && isRunActive && !paused` を判定して渡す。
   */
  showCutterOrbit?: boolean;
  /**
   * Cutter Overdrive 中のオーラを表示するか。
   * battle 画面側で useBattleLoop().isOverdriveActive を渡す。
   */
  showOverdriveAura?: boolean;
  /**
   * CutterOrbitFx の 1 周時間 (ms)。 未指定なら CutterOrbitFx の default (1300ms) を使う。
   * Overdrive 中は battle 画面側で 1/3 (≈433ms) を渡して刃の回転を体感 3 倍速にする。
   */
  cutterRotateMs?: number;
  /**
   * 索敵範囲の **直径** (フィールド % — 円の幅 / 高さ)。
   * 当たり判定半径はこの値の 1/2 で、CutterOrbitFx の刃長さも 1/2 を渡す。
   */
  range: number;
  /**
   * 視覚装飾用のダミーピン。
   * - enemies が 0 でも常に描画される
   * - 実ゲームロジックの SpawnedEnemy とは別レイヤ
   */
  dummyPins?: DummyPin[];
  /**
   * マシン本体被ダメ Fx の再マウントキー。
   * 親側で被ダメ検知ごとに +1 して渡すと、 MachineHitFx が再マウントされ赤フラッシュが再生される。
   * 0 ならマウントしない (初期状態)。
   */
  machineHitKey?: number;
  /**
   * v1.4.0: タップ攻撃のコールバック。 BattleField の root 領域 (= 戦闘画面のメイン領域)
   * の pointerdown で発火する。 渡さなければタップ処理は無効。
   *
   * Page 側は useBattleLoop の enqueueTap を渡す。 タップが「どこを押したか」 という座標は
   * 攻撃対象敵が「マシン最寄」 で決まるため、 callback には座標を含めない (素の通知のみ)。
   *
   * pause / ResultDialog / RunWorkshop シート展開中などに無効化したい場合は、 Page 側で
   * 条件付きに渡す or undefined を渡せばよい。
   */
  onTap?: () => void;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

/** ダミーピン kind → 色トークン */
function pinKindToColor(kind: DummyPin['kind']): string {
  switch (kind) {
    case 'boss':
      return 'var(--c-danger)';
    case 'elite':
      return 'var(--c-warning)';
    default:
      return 'var(--c-text-mid)';
  }
}

// v1.3.7 (Phase 2-B): ENEMY_SIZE_CQMIN と spawnedEnemyToVisualType は visualTypes.ts に
// 切り出して EnemyLayer.tsx と共用するようになった。

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * BattleField — 戦闘描画の中央レイヤ。
 *
 * - マシン描画（中央、三角アイコン + 二重リングのネオン演出）
 * - 敵描画（SpawnedEnemy。タイプ別に Icon 切替、HP バーは Elite/Boss/MiniBoss は常時表示）
 * - 索敵円（マシン中心の半透明円、常時 ON）
 * - 視覚装飾ダミーピン (dummyPins)
 * - Fx のマウント / unmount 制御（DamagePop / EnemyHit / EnemyDeath）
 */
export function BattleField({
  machinePosition = { x: 50, y: 50 },
  hitEvents,
  onHitDone,
  showCutterOrbit = false,
  showOverdriveAura = false,
  cutterRotateMs,
  range,
  dummyPins = [],
  machineHitKey = 0,
  onTap,
}: BattleFieldProps) {
  // v1.3.7 (Phase 2-B): enemies / damageEvents / deathEvents / projectileEvents 及び
  // onDamageDone / onDeathDone / onProjectileDone props は 3 layer (EnemyLayer / FxLayer /
  // ProjectileLayer) に委譲。 BattleField は entityStore を Context から取得する layer に
  // ぶら下げるだけ。 Phase 2-C で props 自体を型定義から削除する。
  const machineX = machinePosition.x;
  const machineY = machinePosition.y;
  // v1.3.7 (Phase 3-C フォローアップ): EnemyLayer → EnemySprite × 35 の React.memo 比較が
  // 「親 BattleField が再 render するたびに machinePosition={{x,y}} の object 参照が変わって
  // 全 sprite で memo bust」 となるのを防ぐ。 useMemo で参照を安定化。
  const machinePosMemo = useMemo(() => ({ x: machineX, y: machineY }), [machineX, machineY]);

  // 索敵円の直径 = range (= フィールド % の直径)。当たり判定とは「中心からの半径 ≤ range/2」 で同期。
  // design ref に合わせて 1 本のリングのみ描画
  const rangeDiameterPct = range;

  return (
    <div
      className={styles.root}
      role="img"
      aria-label="バトルフィールド"
      // v1.4.0: タップ攻撃。 pointerdown のみ listen して click は無視 (二重発火防止)。
      // onTap が undefined の場合は handler 自体を付けない (HUD ボタンの hit-test を邪魔しない)。
      onPointerDown={onTap}
    >
      {/* 内部座標系（短辺基準の正方形）。 全ての描画はこの .field 内 % で配置する。 */}
      <div className={styles.field}>
        {/* 索敵円（width/height とも .field の % で真円） */}
        <div
          className={styles.rangeCircle}
          style={{
            left: `${machineX}%`,
            top: `${machineY}%`,
            width: `${rangeDiameterPct}%`,
            height: `${rangeDiameterPct}%`,
          }}
          aria-hidden
        />

        {/* 視覚装飾ダミーピン (enemies と独立) */}
        {dummyPins.map((pin) => (
          <div
            key={pin.id}
            className={styles.pin}
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              color: pinKindToColor(pin.kind),
            }}
            aria-hidden
          >
            <Icon
              name="target"
              size={pin.kind === 'boss' ? 18 : pin.kind === 'elite' ? 16 : 14}
              color={pinKindToColor(pin.kind)}
            />
          </div>
        ))}

        {/* v1.3.7 (Phase 2-B): 敵 sprite ループを EnemyLayer に分離。
            useSyncExternalStore で entityStore を直接購読 (Page 経由なし)。 */}
        <EnemyLayer machinePosition={machinePosMemo} />

        {/* マシン (三角 + 単一リング) */}
        <div
          className={styles.machine}
          style={{
            left: `${machineX}%`,
            top: `${machineY}%`,
          }}
          aria-label="マシン"
        >
          <span
            className={styles.machineRingOuter}
            aria-hidden
          />
          <Icon
            name="tower"
            size={22}
            color="var(--c-primary)"
          />
        </div>

        {/* Fx レイヤ */}

        {/* Cutter 武器選択中の常時回転刃 (タワー周囲を旋回)。
            刃の長さ (length) は中心からの **半径** = range (直径) / 2 を渡し、
            当たり判定半径と完全同期する。 索敵距離強化で判定が広がったときに刃も長くなる。 */}
        {showCutterOrbit && (
          <CutterOrbitFx
            cx={machineX}
            cy={machineY}
            length={range / 2}
            rotateMs={cutterRotateMs}
          />
        )}

        {/* Cutter Overdrive 中のオーラ (8 秒間継続表示) */}
        {showOverdriveAura && (
          <OverdriveAuraFx
            x={machineX}
            y={machineY}
          />
        )}

        {/* マシン被ダメ時の局所赤フラッシュ (key 変化で再マウント) */}
        {machineHitKey > 0 && (
          <MachineHitFx
            key={machineHitKey}
            cx={machineX}
            cy={machineY}
          />
        )}

        {/* v1.3.7 (Phase 2-B): DamagePopFx / EnemyDeathFx を FxLayer に分離。
            useSyncExternalStore で entityStore を直接購読 (Page 経由なし)。 */}
        <FxLayer />

        {/* EnemyHitFx (現状 useBattleLoop で未配線、 EMPTY_HIT_EVENTS のため空のまま) */}
        {hitEvents.map((evt) => (
          <EnemyHitFx
            key={evt.id}
            x={evt.x}
            y={evt.y}
            onDone={() => onHitDone?.(evt.id)}
          />
        ))}

        {/* v1.3.7 (Phase 2-B): 弾道 / 着弾 Fx を ProjectileLayer に分離。 */}
        <ProjectileLayer />
      </div>
    </div>
  );
}
