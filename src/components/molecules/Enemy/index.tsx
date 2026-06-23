import type { CSSProperties, ReactElement } from 'react';

import styles from './style.module.scss';

import type { EnemyKind, NormalSubtype } from '@/game/types';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/** 敵の見た目タイプ — kind + subtype を平坦化した 6 種 */
export type EnemyVisualType = 'standard' | 'swift' | 'tough' | 'elite' | 'miniboss' | 'boss';

/**
 * 視覚ステータス tint。
 * 'frozen' / 'burning' はパッチ効果 (freezeHit / burnHit) が付与する状態異常を
 * Enemy に反映する用途。 useBattleLoop で SpawnedEnemy.frozenUntilMs / burnUntilMs
 * から導出して渡す。
 */
export type EnemyStatus = 'normal' | 'frozen' | 'burning';

export interface EnemyProps {
  /** 敵タイプ (見た目とサイズのプリセットを内包) */
  type: EnemyVisualType;
  /** 直径 px。 未指定なら type ごとの既定値 */
  size?: number;
  /** HP 残量 0-1 (showHp=true のとき HP バー描画に使う) */
  hp?: number;
  /** HP バー表示。 未指定なら elite/miniboss/boss は自動 ON、 通常敵は OFF */
  showHp?: boolean;
  /** 向き (ラジアン、 0=右)。 swift / miniboss / boss のみ反映 */
  facing?: number;
  /** 状態 tint */
  status?: EnemyStatus;
}

// ---------------------------------------------------------------------------
// タイプ別プリセット (design-docs/claude-design/molecules/EnemyMarker 準拠)
// ---------------------------------------------------------------------------

interface TypePreset {
  size: number;
  color: string;
  glow: string;
  defaultHp: boolean;
}

const TYPE_PRESETS: Record<EnemyVisualType, TypePreset> = {
  standard: {
    size: 14,
    color: 'rgb(167,184,216)',
    glow: 'rgba(167,184,216,0.45)',
    defaultHp: false,
  },
  swift: {
    size: 13,
    color: 'rgb(138,243,255)',
    glow: 'rgba(138,243,255,0.5)',
    defaultHp: false,
  },
  tough: {
    size: 18,
    color: 'rgb(120,140,180)',
    glow: 'rgba(120,140,180,0.55)',
    defaultHp: false,
  },
  elite: {
    size: 26,
    color: 'var(--c-warning)',
    glow: 'rgba(246,185,74,0.6)',
    defaultHp: true,
  },
  miniboss: {
    size: 36,
    color: '#ffa726',
    glow: 'rgba(255,167,38,0.65)',
    defaultHp: true,
  },
  boss: {
    size: 56,
    color: 'var(--c-danger)',
    glow: 'rgba(255,77,109,0.7)',
    defaultHp: true,
  },
};

/** swift / miniboss / boss のみ facing を反映 */
const ROTATABLE: Record<EnemyVisualType, boolean> = {
  standard: false,
  swift: true,
  tough: false,
  elite: false,
  miniboss: true,
  boss: true,
};

// ---------------------------------------------------------------------------
// 状態異常 tint
// ---------------------------------------------------------------------------

function statusFilter(status: EnemyStatus): string {
  switch (status) {
    case 'frozen':
      return 'hue-rotate(180deg) saturate(1.6) brightness(1.05)';
    case 'burning':
      return 'hue-rotate(-25deg) saturate(1.4) brightness(1.1)';
    default:
      return 'none';
  }
}

// ---------------------------------------------------------------------------
// SVG シェイプ群
// ---------------------------------------------------------------------------

function StandardShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      <polygon
        points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23"
        fill="rgba(0,0,0,0.35)"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <polygon
        points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
        fill={color}
        opacity={0.55}
      />
    </svg>
  );
}

function SwiftShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      <polygon
        points="46,0 -28,-34 -10,0 -28,34"
        fill="rgba(0,0,0,0.35)"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <line
        x1={22}
        y1={0}
        x2={-6}
        y2={0}
        stroke={color}
        strokeWidth={5}
        opacity={0.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToughShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      <rect
        x={-42}
        y={-42}
        width={84}
        height={84}
        rx={16}
        fill="rgba(0,0,0,0.4)"
        stroke={color}
        strokeWidth={8}
      />
      <rect
        x={-28}
        y={-28}
        width={56}
        height={56}
        rx={8}
        fill="none"
        stroke={color}
        strokeWidth={4}
        opacity={0.7}
      />
      <rect
        x={-10}
        y={-10}
        width={20}
        height={20}
        fill={color}
        opacity={0.7}
      />
    </svg>
  );
}

function EliteShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      <polygon
        points="0,-46 46,0 0,46 -46,0"
        fill="rgba(0,0,0,0.4)"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <polygon
        points="0,-28 28,0 0,28 -28,0"
        fill="none"
        stroke={color}
        strokeWidth={3}
        opacity={0.7}
      />
      <polygon
        points="0,-12 12,0 0,12 -12,0"
        fill={color}
        opacity={0.85}
      />
    </svg>
  );
}

function MinibossShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      {[0, 90, 180, 270].map((deg) => (
        <polygon
          key={deg}
          points="46,-6 46,6 56,0"
          transform={`rotate(${deg})`}
          fill={color}
          opacity={0.6}
        />
      ))}
      <polygon
        points="-28,-46 28,-46 46,-28 46,28 28,46 -28,46 -46,28 -46,-28"
        fill="rgba(0,0,0,0.45)"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect
        x={-22}
        y={-4}
        width={44}
        height={8}
        fill={color}
        opacity={0.65}
      />
      <rect
        x={-4}
        y={-22}
        width={8}
        height={44}
        fill={color}
        opacity={0.65}
      />
      <circle
        cx={0}
        cy={0}
        r={8}
        fill={color}
      />
    </svg>
  );
}

function BossShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width="100%"
      height="100%"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <polygon
          key={deg}
          points="0,-48 6,-30 -6,-30"
          transform={`rotate(${deg})`}
          fill={color}
          opacity={0.7}
        />
      ))}
      <polygon
        points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17"
        fill="rgba(0,0,0,0.5)"
        stroke={color}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <circle
        cx={0}
        cy={0}
        r={18}
        fill="none"
        stroke={color}
        strokeWidth={3}
        opacity={0.7}
      />
      <circle
        cx={0}
        cy={0}
        r={10}
        fill={color}
      />
      <circle
        cx={0}
        cy={0}
        r={4}
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  );
}

const SHAPE_BY_TYPE: Record<EnemyVisualType, (p: { color: string }) => ReactElement> = {
  standard: StandardShape,
  swift: SwiftShape,
  tough: ToughShape,
  elite: EliteShape,
  miniboss: MinibossShape,
  boss: BossShape,
};

// ---------------------------------------------------------------------------
// SpawnedEnemy → EnemyVisualType マッピングヘルパー
// ---------------------------------------------------------------------------

export function spawnedEnemyToVisualType(
  kind: EnemyKind,
  subtype?: NormalSubtype
): EnemyVisualType {
  if (kind === 'elite') return 'elite';
  if (kind === 'miniboss') return 'miniboss';
  if (kind === 'boss') return 'boss';
  if (subtype === 'swift') return 'swift';
  if (subtype === 'tough') return 'tough';
  return 'standard';
}

// ---------------------------------------------------------------------------
// Enemy コンポーネント
// ---------------------------------------------------------------------------

/**
 * Enemy — バトル中の敵 1 体の見た目 Molecule。
 *
 * 6 種のタイプ別 SVG シェイプ + HP バー + 状態異常 tint を統合。
 * デザイン source: design-docs/claude-design/molecules/EnemyMarker
 */
export function Enemy({ type, size, hp, showHp, facing = 0, status = 'normal' }: EnemyProps) {
  const preset = TYPE_PRESETS[type];
  const finalSize = size ?? preset.size;
  const ShapeFn = SHAPE_BY_TYPE[type];
  const renderHp = showHp ?? preset.defaultHp;
  const facingDeg = ROTATABLE[type] ? `${(facing * 180) / Math.PI}deg` : '0deg';
  const dropShadowPx = type === 'boss' ? 8 : type === 'miniboss' ? 6 : 4;

  const wrapperStyle: CSSProperties = {
    width: finalSize,
    height: finalSize,
  };

  const shapeStyle: CSSProperties = {
    width: finalSize,
    height: finalSize,
    color: preset.color,
    filter: `drop-shadow(0 0 ${dropShadowPx}px ${preset.glow}) ${statusFilter(status)}`,
    transform: `rotate(${facingDeg})`,
  };

  const hpBarStyle: CSSProperties = {
    width: finalSize + 4,
    height: type === 'boss' ? 4 : 3,
  };

  const hpFillStyle: CSSProperties = {
    width: `${Math.max(0, Math.min(1, hp ?? 0)) * 100}%`,
    background:
      type === 'boss'
        ? 'var(--c-danger)'
        : type === 'miniboss'
          ? '#ffa726'
          : type === 'elite'
            ? 'var(--c-warning)'
            : 'var(--c-hp)',
  };

  return (
    <div
      role="img"
      aria-label={`${type} enemy`}
      data-enemy-type={type}
      data-status={status}
      className={styles.root}
      style={wrapperStyle}
    >
      <div
        className={styles.shape}
        style={shapeStyle}
      >
        <ShapeFn color={preset.color} />
      </div>
      {renderHp && hp != null && (
        <div
          className={styles.hpBar}
          style={hpBarStyle}
        >
          <div
            className={styles.hpFill}
            style={hpFillStyle}
          />
        </div>
      )}
    </div>
  );
}
