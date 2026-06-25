/**
 * 武器別 索敵半径マップ (%)。
 *
 * バトルフィールド中央 (50, 50) を中心に、この距離以下の敵を「射程内」とみなす。
 * 各武器のロールに応じて 4 段階の差別化を行う:
 *
 *   - cutter:  近接（旋回刃の視覚的長さに合わせた極短射程）
 *   - laser:   中（単体高 DPS、貫通 1 体）
 *   - thunder: 中（同時 3 体に独立落雷）
 *   - cannon:  遠（splash 範囲爆発、遠距離砲）
 *
 * 仕様: design-docs/tower-like-game/14-weapons-rebalance-v1.1.md
 */
import type { WeaponType } from '@/store/slices/weapons';

export const WEAPON_RANGE_PCT: Record<WeaponType, number> = {
  cutter: 14,
  laser: 35,
  thunder: 35,
  cannon: 45,
};
