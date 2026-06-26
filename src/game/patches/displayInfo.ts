import type { IconName } from '@/components/atoms/Icon';
import type { PatchName } from '@/data/schema';

// ---------------------------------------------------------------------------
// パッチ表示情報 (Tier 連動)
// ---------------------------------------------------------------------------
//
// 各パッチの実装 (src/game/patches/*.ts) と同じスケール式を用いて、
// 現在の Tier に応じた実効値を表示文字列として返す。
// 仕様: design-docs/tower-like-game/06-patches.md
//
//   - 漸近確率: T1 + (max - T1) × T / (T + K), K=20
//   - 線形:     base × T
//   - 時間線形: base + 0.2 × T (秒)
//

export interface PatchDisplayInfo {
  /** 日本語表示名 */
  name: string;
  iconName: IconName;
  /** トリガー (発動条件) — 短縮表記 */
  trigger: string;
  /** 効果 — Tier 連動の実効値文字列 */
  effect: string;
}

const ASYMPTOTIC_K = 20;

/** 漸近確率: T1 + (max - T1) × T / (T + 20) */
function asymp(tier: number, t1Pct: number, maxPct: number): number {
  return t1Pct + ((maxPct - t1Pct) * tier) / (tier + ASYMPTOTIC_K);
}

/** % 表記。 小数 1 桁 (10% 以上は整数) */
function pct(p: number): string {
  return p >= 10 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`;
}

/** 秒表記 (小数 1 桁) */
function sec(s: number): string {
  return `${s.toFixed(1)}秒`;
}

/**
 * 指定 Tier に応じた表示情報を返す。
 *
 * @param name パッチ名 (英字キー)
 * @param tier 現在の Tier (1 以上)
 */
export function getPatchDisplayInfo(name: PatchName, tier: number): PatchDisplayInfo {
  const T = Math.max(1, Math.floor(tier));
  switch (name) {
    case 'instantKill':
      // 雑魚即死 漸近確率 T1=2%, max=20%
      return {
        name: '瞬殺装甲',
        iconName: 'skull',
        trigger: '攻撃時',
        effect: `雑魚即死 ${pct(asymp(T, 2, 20))}`,
      };
    case 'bossKiller':
      // ボス類への与ダメ +(5×T)% (線形)
      return {
        name: 'ボスキラー',
        iconName: 'target',
        trigger: 'ボス類',
        effect: `DMG +${5 * T}%`,
      };
    case 'doubleShot':
      // 2 連射 漸近確率 T1=5%, max=50%
      return {
        name: 'ダブルショット',
        iconName: 'lightning',
        trigger: '攻撃時',
        effect: `2連射 ${pct(asymp(T, 5, 50))}`,
      };
    case 'damageImmune':
      // 被ダメ無効 漸近確率 T1=3%, max=30%
      return {
        name: 'ダメージ無効',
        iconName: 'shield',
        trigger: '被弾時',
        effect: `無効化 ${pct(asymp(T, 3, 30))}`,
      };
    case 'killHeal':
      // 撃破時 HP +(0.5×T) 回復 (線形)
      return {
        name: 'キル時回復',
        iconName: 'heart',
        trigger: '撃破時',
        effect: `HP +${(0.5 * T).toFixed(1)}`,
      };
    case 'shieldRegen':
      // wave クリア時 HP +(5×T) 回復 (線形)
      return {
        name: 'シールド再生',
        iconName: 'shield',
        trigger: 'waveクリア',
        effect: `HP +${5 * T}`,
      };
    case 'bonusDrop':
      // 撃破時 ネジ×2 漸近確率 T1=5%, max=50%
      return {
        name: 'ボーナスドロップ',
        iconName: 'spark',
        trigger: '撃破時',
        effect: `ネジ×2 ${pct(asymp(T, 5, 50))}`,
      };
    case 'boltCast':
      // wave クリア時 ボルト +(5×T) (線形)
      return {
        name: 'ボルト鋳造',
        iconName: 'lightning',
        trigger: 'waveクリア',
        effect: `ボルト +${5 * T}`,
      };
    case 'freezeHit':
      // 攻撃時 (1 + 0.2×T) 秒凍結 確率 T1=5%, max=50%
      return {
        name: '凍結ヒット',
        iconName: 'ice',
        trigger: '攻撃時',
        effect: `${sec(1 + 0.2 * T)}凍結 ${pct(asymp(T, 5, 50))}`,
      };
    case 'burnHit':
      // 攻撃時 (1 + 0.2×T) 秒燃焼 確率 T1=5%, max=50%
      return {
        name: '燃焼ヒット',
        iconName: 'flame',
        trigger: '攻撃時',
        effect: `${sec(1 + 0.2 * T)}燃焼 ${pct(asymp(T, 5, 50))}`,
      };
  }
}
