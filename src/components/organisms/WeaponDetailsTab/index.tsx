import styles from './style.module.scss';

import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 武器ステ計算ユーティリティ
// 仕様: design-docs/tower-like-game/05-weapons.md
// ---------------------------------------------------------------------------

/**
 * 武器ダメージ倍率: ×1.02^Lv（Lv=0 で ×1.0）
 */
function calcDamageMul(lv: number): number {
  return Math.pow(1.02, lv);
}

/**
 * 攻撃速度: 底値 AS × (1 + 0.03 × Lv)
 * 上限: 10 attacks/sec（ハードキャップ）
 */
function calcAS(baseAS: number, lv: number): number {
  return Math.min(10, baseAS * (1 + 0.03 * lv));
}

/**
 * 底値ダメージ (Lv=0 の表示用代表値)。
 * 実戦はマシン基礎攻撃力と乗算されるが、UI では武器固有の底値を表示する。
 */
const BASE_DAMAGE: Record<string, number> = {
  laser: 120, // 単体特化、高速クリ向け
  cannon: 480, // 範囲型、低 AS で高打点
  thunder: 84, // DoT × 3 体、持続火力
  cutter: 62, // 近接旋回、高 AS × 複数ヒット
};

const BASE_AS: Record<string, number> = {
  laser: 1.0,
  cannon: 0.5,
  thunder: 0.7,
  cutter: 2.0,
};

/**
 * 表示用射程 (m)。仕様上は内部値だが、UI 表示としては固定の m 値を使う
 * (design-docs/claude-design 準拠)。
 */
const RANGE_M: Record<string, number> = {
  laser: 580,
  thunder: 420,
  cannon: 520,
};

// ---------------------------------------------------------------------------
// 各武器のステ配列生成 (design ref に合わせ 4 項目: DMG / サブ / 射程 or 同時 / 連射)
// ---------------------------------------------------------------------------

function buildLaserStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.laser * calcDamageMul(lv));
  // 貫通数: Lv0=1、+0.1/Lv、切り捨て（05-weapons.md）
  const penetrate = Math.floor(1 + 0.1 * lv);
  const as = Math.round(calcAS(BASE_AS.laser, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '貫通', value: penetrate },
    { label: '射程', value: RANGE_M.laser, suffix: 'm' },
    { label: '連射', value: as, suffix: '/s' },
  ];
}

function buildCannonStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.cannon * calcDamageMul(lv));
  // 爆発半径: Lv0=30、+0.5/Lv（05-weapons.md）。表示は m に揃える。
  const radius = Math.round((30 + 0.5 * lv) * 10) / 10;
  const as = Math.round(calcAS(BASE_AS.cannon, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '半径', value: radius, suffix: 'm' },
    { label: '射程', value: RANGE_M.cannon, suffix: 'm' },
    { label: '連射', value: as, suffix: '/s' },
  ];
}

function buildThunderStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.thunder * calcDamageMul(lv));
  // 連鎖数: Lv0=7、+0.1/Lv、切り捨て（05-weapons.md）
  const chain = Math.floor(7 + 0.1 * lv);
  const as = Math.round(calcAS(BASE_AS.thunder, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '連鎖', value: chain },
    { label: '射程', value: RANGE_M.thunder, suffix: 'm' },
    { label: '連射', value: as, suffix: '/s' },
  ];
}

function buildCutterStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.cutter * calcDamageMul(lv));
  // 旋回半径: Lv0=80、+0.5/Lv（05-weapons.md）。表示は m。
  const rotRadius = Math.round((80 + 0.5 * lv) * 10) / 10;
  // 同時ヒット数: Lv0=1、+0.05/Lv、切り捨て（05-weapons.md）
  const simultaneous = Math.floor(1 + 0.05 * lv);
  const as = Math.round(calcAS(BASE_AS.cutter, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '旋回', value: rotRadius, suffix: 'm' },
    { label: '同時', value: simultaneous },
    { label: '連射', value: as, suffix: '/s' },
  ];
}

// ---------------------------------------------------------------------------
// 武器固定メタデータ
// ---------------------------------------------------------------------------

interface WeaponMeta {
  kind: 'laser' | 'cannon' | 'thunder' | 'cutter';
  name: string;
  description: string;
  buildStats: (lv: number) => WeaponStat[];
}

const WEAPON_META: WeaponMeta[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。',
    buildStats: buildLaserStats,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発。',
    buildStats: buildCannonStats,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '連鎖電撃。',
    buildStats: buildThunderStats,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: '旋回斬撃。',
    buildStats: buildCutterStats,
  },
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponDetailsTab() {
  const weaponLv = useStore((s) => s.weaponLv);

  return (
    <div
      className={styles.tab}
      role="tabpanel"
      aria-label="武器詳細"
    >
      {WEAPON_META.map((meta) => (
        <WeaponPreview
          key={meta.kind}
          weapon={meta.kind}
          name={meta.name}
          description={meta.description}
          stats={meta.buildStats(weaponLv)}
          layout="wide"
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ステ計算ロジックをテスト可能なようにエクスポート
// ---------------------------------------------------------------------------

export {
  calcDamageMul,
  calcAS,
  buildLaserStats,
  buildCannonStats,
  buildThunderStats,
  buildCutterStats,
};
