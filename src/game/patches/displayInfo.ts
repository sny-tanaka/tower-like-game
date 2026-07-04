import type { IconName } from '@/components/atoms/Icon';
import type { PatchName } from '@/data/schema';

// ---------------------------------------------------------------------------
// パッチ表示情報 (Tier 連動)
// ---------------------------------------------------------------------------
//
// 各パッチの実装 (src/game/patches/*.ts) と同じスケール式を用いて、
// 現在の Tier に応じた実効値を表示文字列として返す。
// 仕様: design-docs/tower-like-game/15-balance-v1.5.0.md §1
//
//   - 発動率 (オーバーフロー型 / 別軸型): p = t1 + step × (T-1)、上限なし
//     100% 超過は「発動率」欄では「100%（確定）+ 超過%」の段階表示にする
//   - killHeal:    heal = 0.2 × T (リジェネ秒数)
//   - shieldRegen: リジェネ +5% × T (常時パッシブ)
//   - boltCast:    ボルト獲得 +2% × T (常時パッシブ)
//   - damageImmune: バリア 1 × T 枚 / Wave (確定型)
//

/** 発動率の線形式パラメータ (t1 + step×(T-1)) */
const PROB_PARAMS: Record<'doubleShotLike' | 'instantKill', { t1: number; step: number }> = {
  doubleShotLike: { t1: 0.05, step: 0.015 }, // doubleShot / bonusDrop / freezeHit / burnHit
  instantKill: { t1: 0.02, step: 0.006 },
};

function linearProb(tier: number, params: { t1: number; step: number }): number {
  return params.t1 + params.step * (tier - 1);
}

export interface PatchDisplayInfo {
  /** 日本語表示名 */
  name: string;
  iconName: IconName;
  /** トリガー (発動条件) — 短縮表記 */
  trigger: string;
  /** 効果 — Tier 連動の実効値文字列 */
  effect: string;
}

/** % 表記。 小数 1 桁 (10% 以上は整数) */
function pct(p: number): string {
  const v = p * 100;
  return v >= 10 ? `${Math.round(v)}%` : `${v.toFixed(1)}%`;
}

/** 秒表記 (小数 1 桁) */
function sec(s: number): string {
  return `${s.toFixed(1)}秒`;
}

/**
 * 発動率 (0〜∞) を表示用文字列にする。
 * 100% 以下: 通常の % 表記。
 * 100% 超過: 「確定 + 超過% で+1」の段階表示 (簡潔さ優先で 1 段階のみ表示)。
 */
function overflowProbLabel(p: number): string {
  if (p <= 1) return `発動 ${pct(p)}`;
  const floor = Math.floor(p);
  const frac = p - floor;
  if (frac <= 0) return `確定${floor}回`;
  return `確定${floor}回 + ${pct(frac)}で+1`;
}

/** bonusDrop 専用: 倍率表現に読み替えた発動率ラベル (ネジ ×N) */
function overflowDropLabel(p: number): string {
  if (p <= 1) return `x2 ${pct(p)}`;
  const floor = Math.floor(p);
  const frac = p - floor;
  const mult = 1 + floor;
  if (frac <= 0) return `確定x${mult}`;
  return `確定x${mult} + ${pct(frac)}でx${mult + 1}`;
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
    case 'instantKill': {
      // 雑魚即死 — オーバーフロー型: p = 2% + 0.6%×(T-1)
      const p = linearProb(T, PROB_PARAMS.instantKill);
      return {
        name: '瞬殺装甲',
        iconName: 'skull',
        trigger: '攻撃時',
        effect: `雑魚即死 ${overflowProbLabel(p)}`,
      };
    }
    case 'bossKiller':
      // ボス類への与ダメ +(5×T)% (線形・変更なし)
      return {
        name: 'ボスキラー',
        iconName: 'target',
        trigger: 'ボス類',
        effect: `DMG +${5 * T}%`,
      };
    case 'doubleShot': {
      // 追加発射 — オーバーフロー型: p = 5% + 1.5%×(T-1)
      const p = linearProb(T, PROB_PARAMS.doubleShotLike);
      return {
        name: 'ダブルショット',
        iconName: 'lightning',
        trigger: '攻撃時',
        effect: `追加発射 ${overflowProbLabel(p)}`,
      };
    }
    case 'damageImmune':
      // バリア展開 — 確定型: 1×T 枚 / Wave
      return {
        name: 'ダメージ無効',
        iconName: 'shield',
        trigger: 'Wave毎',
        effect: `バリア ${T}枚 (接触無効)`,
      };
    case 'killHeal':
      // 撃破時 リジェネ 0.2×T 秒分回復
      return {
        name: 'キル時回復',
        iconName: 'heart',
        trigger: '撃破時',
        effect: `リジェネ ${(0.2 * T).toFixed(1)}秒分回復`,
      };
    case 'shieldRegen':
      // 常時パッシブ: リジェネ +5%×T
      return {
        name: 'シールド再生',
        iconName: 'shield',
        trigger: '常時',
        effect: `リジェネ +${5 * T}%`,
      };
    case 'bonusDrop': {
      // ネジドロップ倍率 — オーバーフロー型: p = 5% + 1.5%×(T-1)、繰り越しは倍率段階
      const p = linearProb(T, PROB_PARAMS.doubleShotLike);
      return {
        name: 'ボーナスドロップ',
        iconName: 'spark',
        trigger: '撃破時',
        effect: `ネジ${overflowDropLabel(p)}`,
      };
    }
    case 'boltCast':
      // 常時パッシブ: ボルト獲得 +2%×T
      return {
        name: 'ボルト鋳造',
        iconName: 'lightning',
        trigger: '常時',
        effect: `ボルト獲得 +${2 * T}%`,
      };
    case 'freezeHit': {
      // 発動率は 100% で自然飽和 (繰り越しなし) + 凍結中与ダメ +2%×T
      const p = Math.min(1, linearProb(T, PROB_PARAMS.doubleShotLike));
      return {
        name: '凍結ヒット',
        iconName: 'ice',
        trigger: '攻撃時',
        effect: `${sec(1 + 0.2 * T)}凍結 ${pct(p)} / 凍結中DMG+${2 * T}%`,
      };
    }
    case 'burnHit': {
      // 発動率は 100% で自然飽和 + DoT係数 (30+3×T)%/秒
      const p = Math.min(1, linearProb(T, PROB_PARAMS.doubleShotLike));
      return {
        name: '燃焼ヒット',
        iconName: 'flame',
        trigger: '攻撃時',
        effect: `${sec(1 + 0.2 * T)}燃焼 ${pct(p)} / DoT ${(30 + 3 * T).toFixed(0)}%秒`,
      };
    }
  }
}
