import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import {
  buildCannonStats,
  buildCutterStats,
  buildLaserStats,
  buildThunderStats,
  calcMachineBaseAttack,
  calcMachineRange,
} from '@/components/organisms/WeaponDetailsTab';
import { useStore } from '@/store';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// 武器メタ定義 (Lv 0 固定の表示)
// 数値は WeaponDetailsTab と同じ計算経路 (game/weapons の *Stats(0)) を使うので、
// 仕様変更時に両画面とも自動追従する。
// ---------------------------------------------------------------------------

interface WeaponDef {
  kind: WeaponType;
  name: string;
  description: string;
  buildStats: (lv: number, baseAttack: number, machineRange: number) => WeaponStat[];
}

const WEAPON_DEFS: WeaponDef[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '高速直進ビーム。貫通で削る。',
    buildStats: buildLaserStats,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '範囲爆発で群れを薙ぐ。',
    buildStats: buildCannonStats,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '同時 3 体を撃つ電撃。',
    buildStats: buildThunderStats,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシン周囲を旋回する斬撃。',
    buildStats: (lv, baseAttack) => buildCutterStats(lv, baseAttack),
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
 * 2 列グリッドに表示する。 数値はラン開始想定で weaponLv=0 を基準に
 * 永続強化された機体 baseAttack / range を使った値で出す。
 */
export function InitialWeaponTab({ selectedWeapon, onSelect }: InitialWeaponTabProps) {
  const storeWeapon = useStore((s) => s.initialWeapon);
  const setInitialWeapon = useStore((s) => s.setInitialWeapon);
  const machineLevels = useStore((s) => s.machineLevels);

  const baseAttack = calcMachineBaseAttack(machineLevels.baseAttack);
  const machineRange = calcMachineRange(machineLevels.range);

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
            stats={w.buildStats(0, baseAttack, machineRange)}
            layout="tall"
            active={w.kind === active}
            onClick={() => handleSelect(w.kind)}
          />
        ))}
      </div>
    </div>
  );
}
