import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { BlastFx } from '@/components/fx/BlastFx';
import { CannonShellFx } from '@/components/fx/CannonShellFx';
import { ChainBoltFx } from '@/components/fx/ChainBoltFx';
import { CutterOrbitFx } from '@/components/fx/CutterOrbitFx';
import { DamagePopFx } from '@/components/fx/DamagePopFx';
import { EnemyDeathFx } from '@/components/fx/EnemyDeathFx';
import { EnemyHitFx } from '@/components/fx/EnemyHitFx';
import { LaserBeamFx } from '@/components/fx/LaserBeamFx';
import { MachineHitFx } from '@/components/fx/MachineHitFx';
import { MegaBeamFx } from '@/components/fx/MegaBeamFx';
import { OverdriveAuraFx } from '@/components/fx/OverdriveAuraFx';
import { ThunderStrikeFx } from '@/components/fx/ThunderStrikeFx';
import { Enemy, spawnedEnemyToVisualType } from '@/components/molecules/Enemy';
import type { EnemyVisualType } from '@/components/molecules/Enemy';
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
  /** 表示中の敵リスト */
  enemies: SpawnedEnemy[];
  /** マシン中心パーセント座標 (default: { x: 50, y: 50 } — THE TOWER オマージュで中央配置) */
  machinePosition?: { x: number; y: number };
  /** DamagePop 描画イベント */
  damageEvents: DamageEvent[];
  /** EnemyHit 描画イベント */
  hitEvents: HitEvent[];
  /** EnemyDeath 描画イベント */
  deathEvents: DeathEvent[];
  /** DamagePopFx 完了通知 */
  onDamageDone?: (id: string) => void;
  /** EnemyHitFx 完了通知 */
  onHitDone?: (id: string) => void;
  /** EnemyDeathFx 完了通知 */
  onDeathDone?: (id: string) => void;
  /** 弾道 / 着弾エフェクト */
  projectileEvents?: ProjectileEvent[];
  /** ProjectileFx 完了通知 */
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

/**
 * 敵タイプ別 cqmin サイズ (= フィールド短辺に対する % 相当)。
 *
 * v1.1.1 で px 固定から cqmin に切替。 端末間で「マシン本体に対する敵の相対サイズ」 を
 * 揃えるため。 値は旧 px 値を「典型的なポートレート field (~390 cqmin)」 で割った比率を
 * 採用 (standard 14px / 390 ≈ 3.6cqmin)。
 */
const ENEMY_SIZE_CQMIN: Record<EnemyVisualType, string> = {
  standard: '3.6cqmin',
  swift: '3.3cqmin',
  tough: '4.6cqmin',
  elite: '6.7cqmin',
  miniboss: '9.2cqmin',
  boss: '21.6cqmin', // v1.3.1 で 14.4 → 21.6 (×1.5) に拡大
};

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
  enemies,
  machinePosition = { x: 50, y: 50 },
  damageEvents,
  hitEvents,
  deathEvents,
  onDamageDone,
  onHitDone,
  onDeathDone,
  projectileEvents = [],
  onProjectileDone,
  showCutterOrbit = false,
  showOverdriveAura = false,
  cutterRotateMs,
  range,
  dummyPins = [],
  machineHitKey = 0,
}: BattleFieldProps) {
  const machineX = machinePosition.x;
  const machineY = machinePosition.y;

  // 索敵円の直径 = range (= フィールド % の直径)。当たり判定とは「中心からの半径 ≤ range/2」 で同期。
  // design ref に合わせて 1 本のリングのみ描画
  const rangeDiameterPct = range;

  return (
    <div
      className={styles.root}
      role="img"
      aria-label="バトルフィールド"
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

        {/* 敵: Enemy molecule に委譲。 SpawnedEnemy → EnemyVisualType マッピング、
          状態異常は frozenUntilMs / burnUntilMs から導出。 HP バーは元 HP との比 (max は
          template.hp) で算出するが、 spawn 後に最大値が変わらないので template.hp == 初期 HP
          相当を維持する想定。 */}
        {enemies.map((enemy) => {
          const visualType = spawnedEnemyToVisualType(enemy.kind, enemy.subtype);
          // 状態異常: frozen 優先 (動作停止のほうがプレイヤーに見えやすい)
          const isFrozen = enemy.frozenUntilMs != null;
          const isBurning = enemy.burnUntilMs != null;
          const status = isFrozen ? 'frozen' : isBurning ? 'burning' : 'normal';
          // HP 残量比: 0-1 のフロート。 BigNum を文字列経由で float 化
          const hpCurrent = parseFloat(enemy.hp.toString());
          const hpMaxNum = Math.max(0.0001, parseFloat(enemy.maxHp.toString()));
          const hpRatio = Math.max(0, Math.min(1, hpCurrent / hpMaxNum));
          // facing: 敵 → マシン中央へのベクトル角度 (rad)。
          // SVG 自体は +x (右) 向き → 完全に左 (敵 x < machineX, y == machineY) のとき angle=0。
          // 画面座標系は Y が下向きなので atan2(dy, dx) でそのまま CSS rotate に渡せる
          // (CSS rotate は時計回り正、 +Y 下向きで +90° で下向きになる)。
          const facing = Math.atan2(machineY - enemy.position.y, machineX - enemy.position.x);

          return (
            <div
              key={enemy.id}
              data-enemy-id={enemy.id}
              className={styles.enemy}
              style={{
                left: `${enemy.position.x}%`,
                top: `${enemy.position.y}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Enemy
                type={visualType}
                size={ENEMY_SIZE_CQMIN[visualType]}
                hp={hpRatio}
                status={status}
                facing={facing}
              />
            </div>
          );
        })}

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

        {/* DamagePopFx */}
        {damageEvents.map((evt) => (
          <DamagePopFx
            key={evt.id}
            value={Number(evt.value.toString())}
            x={evt.x}
            y={evt.y}
            crit={evt.crit}
            onDone={() => onDamageDone?.(evt.id)}
          />
        ))}

        {/* EnemyHitFx */}
        {hitEvents.map((evt) => (
          <EnemyHitFx
            key={evt.id}
            x={evt.x}
            y={evt.y}
            onDone={() => onHitDone?.(evt.id)}
          />
        ))}

        {/* EnemyDeathFx */}
        {deathEvents.map((evt) => (
          <EnemyDeathFx
            key={evt.id}
            x={evt.x}
            y={evt.y}
            onDone={() => onDeathDone?.(evt.id)}
          />
        ))}

        {/* 弾道 / 着弾エフェクト */}
        {projectileEvents.map((evt) => {
          switch (evt.kind) {
            case 'laser':
              return (
                <LaserBeamFx
                  key={evt.id}
                  x1={evt.x1}
                  y1={evt.y1}
                  x2={evt.x2}
                  y2={evt.y2}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
            case 'cannonShell':
              return (
                <CannonShellFx
                  key={evt.id}
                  x1={evt.x1}
                  y1={evt.y1}
                  x2={evt.x2}
                  y2={evt.y2}
                  duration={evt.durationMs}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
            case 'blast':
              return (
                <BlastFx
                  key={evt.id}
                  x={evt.x}
                  y={evt.y}
                  radius={evt.radius}
                  delayMs={evt.delayMs}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
            case 'thunderStrike':
              return (
                <ThunderStrikeFx
                  key={evt.id}
                  x={evt.x}
                  y={evt.y}
                  duration={evt.durationMs}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
            case 'chain':
              return (
                <ChainBoltFx
                  key={evt.id}
                  points={evt.points}
                  delayMs={evt.delayMs}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
            case 'megaBeam':
              return (
                <MegaBeamFx
                  key={evt.id}
                  x={evt.x}
                  y={evt.y}
                  angle={evt.angle}
                  widthPct={evt.widthPct}
                  onDone={() => onProjectileDone?.(evt.id)}
                />
              );
          }
        })}
      </div>
    </div>
  );
}
