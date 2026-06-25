import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import {
  WEAPON_META,
  calcMachineAttackSpeed,
  calcMachineBaseAttack,
  calcMachineRange,
} from '@/components/organisms/WeaponDetailsTab';
import { useStore } from '@/store';
import type { WeaponType } from '@/store/slices/weapons';

// 武器メタは WeaponDetailsTab から共通 import (WEAPON_META)。
// description / activeSkillDescription / buildStats / name が両画面で同一になる。

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
  const machineAttackSpeed = calcMachineAttackSpeed(machineLevels.attackSpeed);

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
        {WEAPON_META.map((w) => (
          <WeaponPreview
            key={w.kind}
            weapon={w.kind}
            name={w.name}
            description={w.description}
            activeSkillDescription={w.activeSkillDescription}
            stats={w.buildStats(0, baseAttack, machineRange, machineAttackSpeed)}
            layout="tall"
            active={w.kind === active}
            onClick={() => handleSelect(w.kind)}
          />
        ))}
      </div>
    </div>
  );
}
