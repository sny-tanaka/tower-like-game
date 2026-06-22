import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
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

// ---------------------------------------------------------------------------
// 各武器のステ配列生成
// ---------------------------------------------------------------------------

function buildLaserStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.laser * calcDamageMul(lv));
  // 貫通数: Lv0=1、+0.1/Lv、切り捨て（05-weapons.md）
  const penetrate = Math.floor(1 + 0.1 * lv);
  const as = Math.round(calcAS(BASE_AS.laser, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '貫通', value: penetrate },
    { label: '連射', value: as, suffix: '/s' },
  ];
}

function buildCannonStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.cannon * calcDamageMul(lv));
  // 爆発半径: Lv0=30px、+0.5px/Lv、小数 OK（05-weapons.md）
  const radius = Math.round((30 + 0.5 * lv) * 10) / 10;
  const as = Math.round(calcAS(BASE_AS.cannon, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '爆発半径', value: radius, suffix: 'px' },
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
    { label: '連射', value: as, suffix: '/s' },
  ];
}

function buildCutterStats(lv: number): WeaponStat[] {
  const dmg = Math.round(BASE_DAMAGE.cutter * calcDamageMul(lv));
  // 旋回半径: Lv0=80px、+0.5px/Lv、小数 OK（05-weapons.md）
  const rotRadius = Math.round((80 + 0.5 * lv) * 10) / 10;
  // 同時ヒット数: Lv0=1、+0.05/Lv、切り捨て（05-weapons.md）
  const simultaneous = Math.floor(1 + 0.05 * lv);
  const as = Math.round(calcAS(BASE_AS.cutter, lv) * 10) / 10;
  return [
    { label: 'DMG', value: dmg, accent: 'primary' },
    { label: '旋回半径', value: rotRadius, suffix: 'px' },
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
  activeSkill: string;
  activeDesc: string;
  buildStats: (lv: number) => WeaponStat[];
}

const WEAPON_META: WeaponMeta[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。貫通でき、連発で削り続ける。',
    activeSkill: 'Mega Beam',
    activeDesc: '画面端まで届く太いビームで全ヒット。CD: 20s',
    buildStats: buildLaserStats,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぐ重火力。',
    activeSkill: 'Volley',
    activeDesc: '72°ずつ放射状に5発の砲弾を撃つ。CD: 25s',
    buildStats: buildCannonStats,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '隣接敵に連鎖する電撃。シールドに有効。',
    activeSkill: 'Plasma Discharge',
    activeDesc: 'ターゲットから連鎖数まで敵に跳ねる。CD: 30s',
    buildStats: buildThunderStats,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシン周囲を旋回する斬撃。',
    activeSkill: 'Overdrive',
    activeDesc: '8秒間、攻撃速度倍率×3。CD: 35s',
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
        <div
          key={meta.kind}
          className={styles.weaponBlock}
        >
          <WeaponPreview
            weapon={meta.kind}
            name={meta.name}
            description={meta.description}
            stats={meta.buildStats(weaponLv)}
            layout="wide"
          />
          {/* アクティブスキル情報 */}
          <Card
            variant="sunken"
            padding="sm"
            className={styles.activeCard}
          >
            <div className={styles.activeRow}>
              <Text
                variant="caption"
                color="secondary"
                className={styles.activeName}
              >
                {meta.activeSkill}
              </Text>
              <Text
                variant="caption"
                color="dim"
              >
                {meta.activeDesc}
              </Text>
            </div>
          </Card>
        </div>
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
