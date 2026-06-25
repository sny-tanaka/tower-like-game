import type { BigNum } from '@/lib/bignum/BigNum';

/**
 * マシン本体ステータス（ダメージ計算に必要な項目）
 */
export interface MachineStats {
  /** 基礎攻撃力 (#5) */
  baseAttack: BigNum;
  /** 防御力 (#4) */
  defense: BigNum;
  /** 被ダメ軽減率 (#3)。0〜1 の比率（1.0 未満） */
  damageReduction: number;
  /** Critical率 (#8)。0〜1 の確率 */
  critRate: number;
  /** Critical倍率 (#9)。例: 1.5, 2.0 */
  critMultiplier: number;
  /** 最大 HP (#1) */
  maxHp: BigNum;
  /** HP リジェネ/秒 (#2) */
  hpRegen: BigNum;
  /** 攻撃速度倍率 (#6)。1.02^Lv の乗算。Lv0 = 1.0 */
  attackSpeed: number;
  /** アクティブ威力倍率 (#10)。1.0 + 0.03 × Lv。Lv0 = 1.0 */
  activePower: number;
  /** アクティブ CD 短縮率 (#11)。0〜0.5 の漸近値。Lv0 = 0 */
  activeCdReduction: number;
  /**
   * 索敵距離 (#7)。range_asymptotic: 150 → 450 (px) で漸近、Lv 100 で 300。
   * useBattleLoop は WEAPON_RANGE_PCT[currentWeapon] (= 直径 %) × (range / 150) / 2 を
   * 半径として当たり判定に使う。 Lv 0 で 1.0 倍 = 武器固定射程そのまま、
   * Lv 100 で 2.0 倍 (v1.1.1: Cannon 直径 70% で 140cqmin field 内に収まる)。
   */
  range: number;
}

/**
 * 武器ステータス（ダメージ計算に必要な項目）
 */
export interface WeaponStats {
  /** 武器ダメージ倍率（武器 Lv で伸びる） */
  damageMultiplier: number;
  /** 攻撃速度 (attacks/sec) */
  attackSpeed?: number;
}
