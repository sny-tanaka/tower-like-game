import { useMemo } from 'react';

import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { calcTierDiffAttackMul } from '@/game/balance/tierDiffAttackMul';
import { cannonStats } from '@/game/weapons/cannon';
import { cutterStats } from '@/game/weapons/cutter';
import { laserStats } from '@/game/weapons/laser';
import { thunderStats } from '@/game/weapons/thunder';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// useMachineStatsBreakdown — マシンスタッツを「数式の分解形」 で返す hook
// ---------------------------------------------------------------------------
//
// v1.3.9 で新設。 バトル中に MachineStatsBreakdownOverlay が利用する。
//
// 設計方針:
//   - 各スタッツを「基礎 → 加算/乗算群 → 最終値」 の StatPart 配列で表現する
//   - 倍率は「1.02^Lv = 1.49x」 のような中間ステップを出さず、 直近の % 表記 (例: 149%) で示す
//   - 加算項目 (クリ率、 被ダメ軽減、 アクティブCD短縮など) は + 表記
//   - 最終値は BigNum / number どちらでもよく、 atom 側で適切に整形する
//   - rangeLv 等の派生計算ロジックは useDerivedMachineStats と一部重複するが、 オーバーレイは
//     表示専用 (バトル ON-DEMAND) なので「専用 selector」 を改めて並べる方が
//     依存トレースしやすい
//
// ---------------------------------------------------------------------------

/**
 * 数式の 1 要素 (基礎値 or 倍率 or 最終値)。 StatBreakdownRow が単純に並べて render する。
 *
 * - kind='base'  : 「基礎100」 等の出発値。 op は付かない (左端に配置される)。
 * - kind='mul'   : 「×149%」 等の乗算項。 op='×' で前方に書く。
 * - kind='add'   : 「+25%」 等の加算項。 op='+' で前方に書く。
 * - kind='final' : 「= 803」 等の結果。 op='=' で前方に書く。
 */
export interface StatPart {
  kind: 'base' | 'mul' | 'add' | 'final';
  /** 表示文字列 (例: "100", "149%", "+25%", "1.20A") */
  display: string;
  /** small ラベル (倍率の出所。 例: "永続", "Tier差", "武器", "ラン") */
  label?: string;
}

/** 1 スタッツの分解 (オーバーレイの 1 行ぶん) */
export interface StatBreakdown {
  /** 表示タイトル (例: "攻撃力") */
  title: string;
  /** 数式の左から順に並べた要素列 */
  parts: StatPart[];
  /** 補足表示 (例: "クリ時 ×200% = 1.61K", "→ 0.385秒/発") */
  note?: string;
  /** 上限注記 (例: "上限 98%") */
  cap?: string;
}

/** マシンスタッツの全分解 (UI ではこれを Section ごとに並べる) */
export interface MachineStatsBreakdown {
  // === 攻撃系 ===
  attack: StatBreakdown;
  attackSpeed: StatBreakdown;
  critRate: StatBreakdown;
  critMultiplier: StatBreakdown;
  // === 防御系 ===
  maxHp: StatBreakdown;
  hpRegen: StatBreakdown;
  defense: StatBreakdown;
  damageReduction: StatBreakdown;
  // === その他 ===
  range: StatBreakdown;
  activePower: StatBreakdown;
  activeCdReduction: StatBreakdown;
}

// ---------------------------------------------------------------------------
// 表示ヘルパー
// ---------------------------------------------------------------------------

/**
 * 倍率 (1.0 = 等倍) を **倍率数値だけ** に整形する文字列。 演算子の '×' は StatBreakdownRow が
 * kind='mul' から自動で前置きするので、 ここでは付けない。
 *
 * - 整数 (例: 4, 100): 小数を出さず "4" "100"
 * - 1.0 未満 / 1.0 以上 999 以下の小数: 小数 2 桁固定 "1.49" "0.90"
 * - 1000 以上: BigNum.toDisplay() で suffix 付き表記 "1.00A" "1.40A" "2.00B"
 *
 * v1.3.9 仕様: ユーザー要望「×400% は 400 倍に見える → ×4 と書きたい」 に従い、 % 表記
 * (旧 formatMulAsPercent) を廃止。 1000 超は BigNum suffix で短縮し、 表示の桁数を制御。
 */
function formatMul(mul: number): string {
  if (mul >= 1000) {
    return BigNum.fromNumber(mul).toDisplay();
  }
  if (Number.isInteger(mul)) {
    return String(mul);
  }
  return mul.toFixed(2);
}

/**
 * 倍率の **base / final** を整形する。 末尾に '×' を付けて「これは倍率」 を一目で分かるようにする。
 *
 * 中間倍率 (formatMul) と違い、 **常に小数 2 桁** で書く:
 *   - 1.0 → "1.00×"
 *   - 1.5 → "1.50×"
 *   - 2.6 → "2.60×"
 *   - 1400 → "1.40A×" (1000 以上は BigNum suffix)
 *
 * 中間倍率は「× 4」 のように整数表記でスッキリ見せたい (ユーザー要望) が、 base / final は
 * 桁固定でレイアウトと可読性を揃える方が読みやすいため、 別関数として分離する。
 *
 * 攻撃力 (BigNum) や HP は別の単位 (絶対値 / "/秒" / "px") を付けるため、 こちらは使わず、
 * クリ倍率 / アクティブ威力 / 攻撃速度 の倍率系 final 専用。
 */
function formatMulSuffix(mul: number): string {
  if (mul >= 1000) {
    return `${BigNum.fromNumber(mul).toDisplay()}×`;
  }
  return `${mul.toFixed(2)}×`;
}

/**
 * 加算値 (例: 0.25 = +25%) を「+25%」 形式の文字列に変換する。
 *
 * 0.25  → "+25%"
 * 0.005 → "+0.5%"  (小数 1 桁残し)
 * 0     → "+0%"
 *
 * 「率」 系 (クリ率、 被ダメ軽減、 アクティブCD短縮) の加算項に使う。
 */
function formatAddAsPercent(add: number): string {
  const percent = add * 100;
  // 0.5% / 99.5% など小数を含むケースは 1 桁残す、 整数値は小数なし
  const text = Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(1);
  return `+${text}%`;
}

/**
 * 加算値を「+1.00」 形式に整形 (倍率系の加算)。
 *
 * クリ倍率の +0.50 や アクティブ威力の +1.50 のような「倍率を加算する」 場面で使う。
 * 率系 (% 表記) と混在しないよう、 用途を厳密に分ける。
 */
function formatAddAsNumber(add: number, fractionDigits = 2): string {
  const sign = add >= 0 ? '+' : '';
  return `${sign}${add.toFixed(fractionDigits)}`;
}

/** 武器ダメージ倍率を返す (各武器の damageMul を Lv → 値で取得) */
function getWeaponDamageMul(weapon: WeaponType, weaponLv: number): number {
  switch (weapon) {
    case 'laser':
      return laserStats(weaponLv).damageMul;
    case 'cannon':
      return cannonStats(weaponLv).damageMul;
    case 'thunder':
      return thunderStats(weaponLv).damageMul;
    case 'cutter':
      return cutterStats(weaponLv).damageMul;
  }
}

/** 各武器の attackPerSec (Lv 反映) を返す。 オーバーレイの攻撃速度 note 用 */
function getWeaponAttackPerSec(weapon: WeaponType, weaponLv: number): number {
  switch (weapon) {
    case 'laser':
      return laserStats(weaponLv).attackPerSec;
    case 'cannon':
      return cannonStats(weaponLv).attackPerSec;
    case 'thunder':
      return thunderStats(weaponLv).attackPerSec;
    case 'cutter':
      return cutterStats(weaponLv).attackPerSec;
  }
}

/** 各武器の日本語表示名 */
const WEAPON_LABEL: Record<WeaponType, string> = {
  laser: 'Laser',
  cannon: 'Cannon',
  thunder: 'Thunder',
  cutter: 'Cutter',
};

/** MACHINE_UPGRADE_ITEMS から指定 key の item を引いて Lv → 値を返すヘルパー */
function effect(key: string, lv: number, fallback: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === key);
  if (item == null) return fallback;
  return calcEffectValue(item, lv);
}

// ---------------------------------------------------------------------------
// build* — 各スタッツの分解を組み立てる関数群
// ---------------------------------------------------------------------------

interface BuildContext {
  machineLevels: {
    baseAttack: number;
    attackSpeed: number;
    critRate: number;
    critMultiplier: number;
    maxHp: number;
    hpRegen: number;
    defense: number;
    damageReduction: number;
    range: number;
    activePower: number;
    activeCdReduction: number;
  };
  runWorkshopLevels: { attackMul: number; attackSpeedMul: number; hpMul: number };
  highestTier: number;
  currentTier: number;
  weapon: WeaponType;
  weaponLv: number;
}

/**
 * 攻撃力の分解を組み立てる。
 *
 * `baseAttack(Lv) × tierDiffMul × weaponDamageMul × runAttackMul = final`
 * `final × critMultiplier = crit時`
 */
function buildAttack(ctx: BuildContext): StatBreakdown {
  const baseRaw = effect('baseAttack', ctx.machineLevels.baseAttack, 100);
  const perpMulFromBase = baseRaw / 100; // 1.02^Lv 相当を % 表記したい
  const tierDiffMul = calcTierDiffAttackMul(ctx.highestTier, ctx.currentTier);
  const weaponMul = getWeaponDamageMul(ctx.weapon, ctx.weaponLv);
  const runMul = calcRunWorkshopMultiplier(ctx.runWorkshopLevels.attackMul);

  // 最終値: BigNum で計算 (永続 Lv 高めだと number 範囲を超える)
  const finalBn = BigNum.fromNumber(100)
    .mulNumber(perpMulFromBase)
    .mulNumber(tierDiffMul)
    .mulNumber(weaponMul)
    .mulNumber(runMul);

  // クリ倍率 (Laser のみ critMultiplierBonus を加算)
  const critMul =
    effect('critMultiplier', ctx.machineLevels.critMultiplier, 1.5) +
    (ctx.weapon === 'laser' ? laserStats(ctx.weaponLv).critMultiplierBonus : 0);
  const finalCritBn = finalBn.mulNumber(critMul);

  return {
    title: '攻撃力',
    parts: [
      { kind: 'base', display: '100' },
      { kind: 'mul', display: formatMul(perpMulFromBase), label: '永続' },
      { kind: 'mul', display: formatMul(tierDiffMul), label: 'Tier差' },
      {
        kind: 'mul',
        display: formatMul(weaponMul),
        label: `武器(${WEAPON_LABEL[ctx.weapon]})`,
      },
      { kind: 'mul', display: formatMul(runMul), label: 'ラン' },
      { kind: 'final', display: finalBn.toDisplay() },
    ],
    note: `クリ時 ×${formatMul(critMul)} = ${finalCritBn.toDisplay()}`,
  };
}

/**
 * 攻撃速度の分解を組み立てる。
 *
 * `(1.0 + 永続加算) × runAttackSpeedMul × weaponBaseAS = 実 attackPerSec`
 */
function buildAttackSpeed(ctx: BuildContext): StatBreakdown {
  const machineAS = effect('attackSpeed', ctx.machineLevels.attackSpeed, 1);
  const perpAdd = machineAS - 1.0;
  const runMul = calcRunWorkshopMultiplier(ctx.runWorkshopLevels.attackSpeedMul);
  const weaponBaseAS = getWeaponAttackPerSec(ctx.weapon, ctx.weaponLv);

  // 実 attackPerSec = weaponBaseAS × machineAS × runMul
  const actualAttackPerSec = weaponBaseAS * machineAS * runMul;
  const intervalSec = actualAttackPerSec > 0 ? 1 / actualAttackPerSec : 0;

  return {
    title: '攻撃速度',
    parts: [
      { kind: 'base', display: '1.00×' },
      { kind: 'add', display: formatAddAsNumber(perpAdd), label: '永続' },
      { kind: 'mul', display: formatMul(runMul), label: 'ラン' },
      { kind: 'final', display: formatMulSuffix(machineAS * runMul) },
    ],
    cap: '永続上限 5.95×',
    note: `武器(${WEAPON_LABEL[ctx.weapon]}) ${weaponBaseAS.toFixed(2)}/秒 → 実 ${actualAttackPerSec.toFixed(2)}/秒 (${intervalSec.toFixed(2)}秒/発)`,
  };
}

function buildCritRate(ctx: BuildContext): StatBreakdown {
  const value = effect('critRate', ctx.machineLevels.critRate, 0);
  return {
    title: 'Critical率',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: formatAddAsPercent(value), label: '永続' },
      { kind: 'final', display: formatAddAsPercent(value).replace('+', '') },
    ],
    cap: '上限 80%',
  };
}

function buildCritMultiplier(ctx: BuildContext): StatBreakdown {
  const baseValue = 1.5;
  const machineValue = effect('critMultiplier', ctx.machineLevels.critMultiplier, 1.5);
  const perpAdd = machineValue - baseValue;
  const weaponBonus = ctx.weapon === 'laser' ? laserStats(ctx.weaponLv).critMultiplierBonus : 0;
  const finalValue = machineValue + weaponBonus;

  // クリ倍率は「倍率」 そのものなので加算項も倍率系数 (+0.50) で揃える
  const parts: StatPart[] = [
    { kind: 'base', display: '1.50×' },
    { kind: 'add', display: formatAddAsNumber(perpAdd), label: '永続' },
  ];
  if (weaponBonus > 0) {
    parts.push({
      kind: 'add',
      display: formatAddAsNumber(weaponBonus),
      label: `武器(${WEAPON_LABEL[ctx.weapon]})`,
    });
  }
  parts.push({ kind: 'final', display: formatMulSuffix(finalValue) });

  return {
    title: 'Critical倍率',
    parts,
  };
}

function buildMaxHp(ctx: BuildContext): StatBreakdown {
  const baseHp = effect('maxHp', ctx.machineLevels.maxHp, 10000);
  const perpMul = baseHp / 10000;
  const runMul = calcRunWorkshopMultiplier(ctx.runWorkshopLevels.hpMul);
  const finalBn = BigNum.fromNumber(10000).mulNumber(perpMul).mulNumber(runMul);

  return {
    title: '最大HP',
    parts: [
      { kind: 'base', display: '10.00A' },
      { kind: 'mul', display: formatMul(perpMul), label: '永続' },
      { kind: 'mul', display: formatMul(runMul), label: 'ラン' },
      { kind: 'final', display: finalBn.toDisplay() },
    ],
  };
}

function buildHpRegen(ctx: BuildContext): StatBreakdown {
  const baseRegen = effect('hpRegen', ctx.machineLevels.hpRegen, 100);
  const perpMul = baseRegen / 100;
  const finalBn = BigNum.fromNumber(100).mulNumber(perpMul);

  return {
    title: 'HPリジェネ',
    parts: [
      { kind: 'base', display: '100' },
      { kind: 'mul', display: formatMul(perpMul), label: '永続' },
      { kind: 'final', display: `${finalBn.toDisplay()}/秒` },
    ],
  };
}

function buildDefense(ctx: BuildContext): StatBreakdown {
  const baseDef = effect('defense', ctx.machineLevels.defense, 100);
  const perpMul = baseDef / 100;
  const finalBn = BigNum.fromNumber(100).mulNumber(perpMul);

  return {
    title: '防御力',
    parts: [
      { kind: 'base', display: '100' },
      { kind: 'mul', display: formatMul(perpMul), label: '永続' },
      { kind: 'final', display: finalBn.toDisplay() },
    ],
  };
}

function buildDamageReduction(ctx: BuildContext): StatBreakdown {
  const value = effect('damageReduction', ctx.machineLevels.damageReduction, 0);
  return {
    title: '被ダメ軽減',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: formatAddAsPercent(value), label: '永続' },
      { kind: 'final', display: formatAddAsPercent(value).replace('+', '') },
    ],
    cap: '上限 98%',
  };
}

function buildRange(ctx: BuildContext): StatBreakdown {
  const baseValue = 150;
  const value = effect('range', ctx.machineLevels.range, baseValue);
  // v1.3.11: 線形成長 +1.5px/Lv、 Lv 100 (maxLv) で 300px キャップ
  const perpAdd = value - baseValue;
  return {
    title: '索敵距離',
    parts: [
      { kind: 'base', display: '150' },
      { kind: 'add', display: `+${perpAdd}`, label: '永続' },
      { kind: 'final', display: `${value}px` },
    ],
    cap: '上限 300px (Lv100)',
  };
}

function buildActivePower(ctx: BuildContext): StatBreakdown {
  const baseValue = 1.0;
  const value = effect('activePower', ctx.machineLevels.activePower, 1.0);
  const perpAdd = value - baseValue;
  // アクティブ威力も「倍率」 として扱われるので倍率系数表記に揃える (旧 "+25%" → "+0.25")
  return {
    title: 'アクティブ威力',
    parts: [
      { kind: 'base', display: '1.00×' },
      { kind: 'add', display: formatAddAsNumber(perpAdd), label: '永続' },
      { kind: 'final', display: formatMulSuffix(value) },
    ],
  };
}

function buildActiveCdReduction(ctx: BuildContext): StatBreakdown {
  const value = effect('activeCdReduction', ctx.machineLevels.activeCdReduction, 0);
  const cdSec = 60 * (1 - value);
  return {
    title: 'アクティブCD短縮',
    parts: [
      { kind: 'base', display: '0' },
      { kind: 'add', display: formatAddAsPercent(value), label: '永続' },
      { kind: 'final', display: formatAddAsPercent(value).replace('+', '') },
    ],
    cap: '上限 50%',
    note: `CD 60秒 × (1-${formatAddAsPercent(value).replace('+', '')}) = ${cdSec.toFixed(1)}秒`,
  };
}

/**
 * BuildContext を渡して全 11 スタッツの分解を組み立てる純粋関数。 hook 外でもテスト可能。
 */
export function buildMachineStatsBreakdown(ctx: BuildContext): MachineStatsBreakdown {
  return {
    attack: buildAttack(ctx),
    attackSpeed: buildAttackSpeed(ctx),
    critRate: buildCritRate(ctx),
    critMultiplier: buildCritMultiplier(ctx),
    maxHp: buildMaxHp(ctx),
    hpRegen: buildHpRegen(ctx),
    defense: buildDefense(ctx),
    damageReduction: buildDamageReduction(ctx),
    range: buildRange(ctx),
    activePower: buildActivePower(ctx),
    activeCdReduction: buildActiveCdReduction(ctx),
  };
}

/**
 * バトル中の MachineStatsBreakdownOverlay 用 hook。
 *
 * store から machineLevels / runWorkshopLevels / weapon / tier 系を購読し、
 * 全 11 スタッツの数式分解を返す。 オーバーレイ非表示中は呼ばれない設計なので、
 * 計算負荷は気にしない (毎フレーム回るゲームループには載せない)。
 */
export function useMachineStatsBreakdown(): MachineStatsBreakdown {
  // ピンポイント subscribe で 1 階層だけ追う
  const machineLevels = useStore((s) => s.machineLevels);
  const runWorkshopLevels = useStore((s) => s.runWorkshopLevels);
  const highestTier = useStore((s) => s.highestTier);
  const currentTier = useStore((s) => s.currentTier);
  const weapon = useStore((s) => s.currentWeapon);
  const weaponLv = useStore((s) => s.weaponLv);

  return useMemo(
    () =>
      buildMachineStatsBreakdown({
        machineLevels,
        runWorkshopLevels: {
          attackMul: runWorkshopLevels.attackMul,
          attackSpeedMul: runWorkshopLevels.attackSpeedMul,
          hpMul: runWorkshopLevels.hpMul,
        },
        highestTier,
        currentTier,
        weapon,
        weaponLv,
      }),
    [machineLevels, runWorkshopLevels, highestTier, currentTier, weapon, weaponLv]
  );
}
