/**
 * 武器別 索敵範囲マップ — **フィールド % の直径** (= 円の幅 / 高さ)。
 *
 * バトルフィールド中央 (50, 50) を中心に、半径 (= この値 / 2) 以下の敵を
 * 「射程内」とみなす。各武器のロールに応じて 4 段階の差別化を行う:
 *
 *   - cutter:  近接（旋回刃の視覚的長さに合わせた極短射程）
 *   - laser:   中（単体高 DPS、貫通 1 体）
 *   - thunder: 中（同時 THUNDER_BASE_CHAIN_COUNT 体に独立落雷）
 *   - cannon:  遠（splash 範囲爆発、遠距離砲）
 *
 * 設計仕様: Cannon 最大強化 (machine.range Lv 100、 multiplier 2.0) で
 * 直径 = 35 × 2.0 = 70% (= 140cqmin の field 内に収まり画面はみ出ない) に到達する。
 * 半径として誤って扱うと直径 140% で field 外に大きくはみ出すので注意。
 *
 * v1.1.1: field 140cqmin 拡大に伴い、Cannon 最大直径 90% → 70% に縮小
 * (140cqmin × 90% = 126cqmin で画面外にはみ出していた)。全武器に同じ 7/9 縮小率を適用:
 *   旧 14/35/35/45 → 新 10.89/27.22/27.22/35
 *
 * 仕様: design-docs/tower-like-game/14-weapons-rebalance-v1.1.md
 */
import type { WeaponType } from '@/store/slices/weapons';

/** v1.1.1 縮小率 (Cannon 90% → 70% から逆算した 7/9) */
const RANGE_REDUCTION_V11_1 = 7 / 9;

export const WEAPON_RANGE_PCT: Record<WeaponType, number> = {
  cutter: 14 * RANGE_REDUCTION_V11_1, // 10.888...
  laser: 35 * RANGE_REDUCTION_V11_1, // 27.222...
  thunder: 35 * RANGE_REDUCTION_V11_1, // 27.222...
  cannon: 45 * RANGE_REDUCTION_V11_1, // 35 (exact)
};
