import type { BigNum } from '@/lib/bignum/BigNum';
import type { EnemyKind, SpawnedEnemy } from '@/game/types';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { EnemyHpBar } from '@/components/molecules/EnemyHpBar';
import { DamagePopFx } from '@/components/fx/DamagePopFx';
import { EnemyHitFx } from '@/components/fx/EnemyHitFx';
import { EnemyDeathFx } from '@/components/fx/EnemyDeathFx';

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

export interface BattleFieldProps {
  /** 表示中の敵リスト */
  enemies: SpawnedEnemy[];
  /** マシン中心パーセント座標 (default: { x: 50, y: 90 }) */
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
}

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

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * BattleField — 戦闘描画の中央レイヤ。
 *
 * - マシン描画（中央下部、Icon name='tower'、--c-primary グロー）
 * - 敵描画（タイプ別に Icon 切替、HP バー は Elite/Boss/MiniBoss は常時表示）
 * - 索敵円（マシン中心の半透明円、常時 ON）
 * - Fx のマウント / unmount 制御（DamagePop / EnemyHit / EnemyDeath）
 */
export function BattleField({
  enemies,
  machinePosition = { x: 50, y: 90 },
  damageEvents,
  hitEvents,
  deathEvents,
  onDamageDone,
  onHitDone,
  onDeathDone,
  range,
}: BattleFieldProps) {
  const machineX = machinePosition.x;
  const machineY = machinePosition.y;

  // 索敵円の直径は range の 2 倍（パーセント単位の縦幅を基準）
  const rangeDiameterPct = range * 2;

  return (
    <div
      className={styles.root}
      role="img"
      aria-label="バトルフィールド"
    >
      {/* 索敵円 */}
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

      {/* マシン */}
      <div
        className={styles.machine}
        style={{
          left: `${machineX}%`,
          top: `${machineY}%`,
        }}
        aria-label="マシン"
      >
        <Icon
          name="tower"
          size={40}
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
