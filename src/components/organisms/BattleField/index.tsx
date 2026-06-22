import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { DamagePopFx } from '@/components/fx/DamagePopFx';
import { EnemyDeathFx } from '@/components/fx/EnemyDeathFx';
import { EnemyHitFx } from '@/components/fx/EnemyHitFx';
import { EnemyHpBar } from '@/components/molecules/EnemyHpBar';
import type { EnemyKind, SpawnedEnemy } from '@/game/types';
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
  /** 索敵半径（パーセント） */
  range: number;
  /**
   * 視覚装飾用のダミーピン。
   * - enemies が 0 でも常に描画される
   * - 実ゲームロジックの SpawnedEnemy とは別レイヤ
   */
  dummyPins?: DummyPin[];
}

// ---------------------------------------------------------------------------
// 定数: design.png 用ダミーピン (固定座標)
// ---------------------------------------------------------------------------

const DEFAULT_DUMMY_PINS: DummyPin[] = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];

// ---------------------------------------------------------------------------
// ヘルパー: EnemyKind → IconName マッピング
// ---------------------------------------------------------------------------

function kindToIcon(kind: EnemyKind): 'skull' | 'lightning' | 'shield' | 'flame' {
  switch (kind) {
    case 'boss':
      return 'skull';
    case 'miniboss':
      return 'lightning';
    case 'elite':
      return 'shield';
    default:
      return 'flame';
  }
}

/** elite / boss / miniboss かどうか */
function isUpperEnemy(kind: EnemyKind): boolean {
  return kind !== 'normal';
}

/** EnemyHpBar の variant マッピング */
function kindToHpBarVariant(kind: EnemyKind): 'normal' | 'elite' | 'boss' {
  if (kind === 'boss') return 'boss';
  if (kind === 'elite' || kind === 'miniboss') return 'elite';
  return 'normal';
}

/** 敵アイコンの色トークン */
function kindToColor(kind: EnemyKind): string {
  switch (kind) {
    case 'boss':
      return 'var(--c-danger)';
    case 'miniboss':
      return 'var(--c-warning)';
    case 'elite':
      return 'var(--c-secondary)';
    default:
      return 'var(--c-text-mid)';
  }
}

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
  range,
  dummyPins = DEFAULT_DUMMY_PINS,
}: BattleFieldProps) {
  const machineX = machinePosition.x;
  const machineY = machinePosition.y;

  // 索敵円の直径は range の 2 倍（パーセント単位の縦幅を基準）
  // design ref に合わせて 1 本のリングのみ描画
  const rangeDiameterPct = range * 2;

  return (
    <div
      className={styles.root}
      role="img"
      aria-label="バトルフィールド"
    >
      {/* 索敵円（aspect-ratio: 1/1 で常に正円） */}
      <div
        className={styles.rangeCircle}
        style={{
          left: `${machineX}%`,
          top: `${machineY}%`,
          width: `${rangeDiameterPct}%`,
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

      {/* 敵 */}
      {enemies.map((enemy) => {
        const upper = isUpperEnemy(enemy.kind);
        const iconColor = kindToColor(enemy.kind);
        const iconSize = enemy.kind === 'boss' ? 32 : enemy.kind === 'miniboss' ? 28 : 22;

        return (
          <div
            key={enemy.id}
            className={[styles.enemy, upper ? styles.enemyUpper : ''].filter(Boolean).join(' ')}
            style={{
              left: `${enemy.position.x}%`,
              top: `${enemy.position.y}%`,
            }}
            aria-label={`${enemy.kind}`}
          >
            <Icon
              name={kindToIcon(enemy.kind)}
              size={iconSize}
              color={iconColor}
            />
            {upper && (
              <div className={styles.enemyHpBar}>
                <EnemyHpBar
                  name={enemy.kind}
                  variant={kindToHpBarVariant(enemy.kind)}
                  current={enemy.hp}
                  max={enemy.hp}
                  size={enemy.kind === 'boss' ? 'lg' : 'sm'}
                  showValue={false}
                />
              </div>
            )}
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
          name="triangle"
          size={22}
          color="var(--c-primary)"
        />
      </div>

      {/* Fx レイヤ */}

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
    </div>
  );
}
