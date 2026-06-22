import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import { useStore } from '@/store';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// 武器定義
// ---------------------------------------------------------------------------

interface WeaponDef {
  kind: WeaponType;
  name: string;
  description: string;
  stats: WeaponStat[];
}

const WEAPON_DEFS: WeaponDef[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。貫通で削る。',
    stats: [
      { label: 'DMG', value: 120, accent: 'primary' },
      { label: '貫通', value: 3 },
      { label: '射程', value: 580, suffix: 'm' },
      { label: '連射', value: 6.2, suffix: '/s' },
    ],
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぐ。',
    stats: [
      { label: 'DMG', value: 480, accent: 'primary' },
      { label: '半径', value: 120, suffix: 'm' },
      { label: '射程', value: 520, suffix: 'm' },
      { label: '連射', value: 0.9, suffix: '/s' },
    ],
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '隣接敵に連鎖する電撃。',
    stats: [
      { label: 'DMG', value: 84, accent: 'primary' },
      { label: '連鎖', value: 5 },
      { label: '射程', value: 420, suffix: 'm' },
      { label: '連射', value: 3.4, suffix: '/s' },
    ],
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシン周囲を旋回する斬撃。',
    stats: [
      { label: 'DMG', value: 62, accent: 'primary' },
      { label: '旋回', value: 180, suffix: 'm' },
      { label: '同時', value: 4 },
      { label: '連射', value: 8.0, suffix: '/s' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface InitialWeaponTabProps {
  selectedWeapon?: WeaponType;
  onSelect?: (weapon: WeaponType) => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * InitialWeaponTab — 出撃準備画面の初期武器選択タブ Organism
 *
 * 4 武器 (laser / cannon / thunder / cutter) を WeaponPreview (tall) で
 * 2 列グリッドに表示する。store の initialWeapon と接続済み。
 * selectedWeapon / onSelect を外部から渡してもよい（Storybook 用）。
 */
export function InitialWeaponTab({ selectedWeapon, onSelect }: InitialWeaponTabProps) {
  const storeWeapon = useStore((s) => s.initialWeapon);
  const setInitialWeapon = useStore((s) => s.setInitialWeapon);

  const active = selectedWeapon ?? storeWeapon;

  const handleSelect = (weapon: WeaponType) => {
    setInitialWeapon(weapon);
    onSelect?.(weapon);
  };

  return (
    <div
      role="tabpanel"
      aria-label="初期武器選択"
      className={styles.wrapper}
    >
      {/* ヘッダー */}
      <div className={styles.header}>
        <Text
          variant="caption"
          color="mid"
        >
          ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。
        </Text>
      </div>

      {/* WeaponPreview グリッド（2 列） */}
      <div className={styles.grid}>
        {WEAPON_DEFS.map((w) => (
          <WeaponPreview
            key={w.kind}
            weapon={w.kind}
            name={w.name}
            description={w.description}
            stats={w.stats}
            layout="tall"
            active={w.kind === active}
            onClick={() => handleSelect(w.kind)}
          />
        ))}
      </div>
    </div>
  );
}
