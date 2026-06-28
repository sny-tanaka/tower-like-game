import { describe, expect, it } from 'vitest';

import { buildMachineStatsBreakdown } from './useMachineStatsBreakdown';

import type { WeaponType } from '@/store/slices/weapons';

/**
 * useMachineStatsBreakdown のロジック部 (buildMachineStatsBreakdown) を直接テストする。
 *
 * hook そのものは React component 経由でしか走らせられないが、 計算ロジックは純粋関数として
 * 切り出してあるので、 こちらだけテストすれば仕様回帰は捕まる。
 */

function makeDefaultCtx() {
  return {
    machineLevels: {
      baseAttack: 0,
      attackSpeed: 0,
      critRate: 0,
      critMultiplier: 0,
      maxHp: 0,
      hpRegen: 0,
      defense: 0,
      damageReduction: 0,
      range: 0,
      activePower: 0,
      activeCdReduction: 0,
    },
    runWorkshopLevels: { attackMul: 0, attackSpeedMul: 0, hpMul: 0 },
    highestTier: 0,
    currentTier: 0,
    weapon: 'thunder' as WeaponType,
    weaponLv: 0,
  };
}

describe('buildMachineStatsBreakdown', () => {
  describe('Lv 0 / 武器 Thunder / Tier 同等', () => {
    const ctx = makeDefaultCtx();
    const result = buildMachineStatsBreakdown(ctx);

    it('全 11 スタッツを返す', () => {
      expect(Object.keys(result).sort()).toEqual(
        [
          'activeCdReduction',
          'activePower',
          'attack',
          'attackSpeed',
          'critMultiplier',
          'critRate',
          'damageReduction',
          'defense',
          'hpRegen',
          'maxHp',
          'range',
        ].sort()
      );
    });

    it('攻撃力: base 100 × 永続100% × Tier100% × 武器(Thunder) 90% × ラン100% = 90', () => {
      const last = result.attack.parts[result.attack.parts.length - 1];
      expect(last.kind).toBe('final');
      // 100 × 1.0 × 1.0 × 0.9 × 1.0 = 90
      expect(last.display).toBe('90');
    });

    it('攻撃力にクリ note が付く (Lv 0: ×1.50)', () => {
      // v1.3.9: % 表記を廃止して単純倍率表記に
      expect(result.attack.note).toContain('×1.50');
      // クリ時 = 90 × 1.5 = 135
      expect(result.attack.note).toContain('135');
    });

    it('攻撃速度: 1.00× +0.00 ×1 = 1.00×', () => {
      const last = result.attackSpeed.parts[result.attackSpeed.parts.length - 1];
      // v1.3.9: final は常に小数 2 桁固定 + ×
      expect(last.display).toBe('1.00×');
      // note に Thunder の attackPerSec (= 1.0/秒) と発射間隔 (= 1.00秒/発)
      expect(result.attackSpeed.note).toContain('Thunder');
      expect(result.attackSpeed.note).toContain('1.00');
    });

    it('Critical率: 0 + +0% = 0%', () => {
      const last = result.critRate.parts[result.critRate.parts.length - 1];
      expect(last.display).toBe('0%');
      expect(result.critRate.cap).toBe('上限 80%');
    });

    it('Critical倍率: base 1.50× +0.00 = 1.50× (Thunder は武器ボーナスなし)', () => {
      const last = result.critMultiplier.parts[result.critMultiplier.parts.length - 1];
      // v1.3.9: 倍率系数表記に切替
      expect(last.display).toBe('1.50×');
      // parts に「武器(Laser)」ラベルは含まれない
      const hasWeaponLabel = result.critMultiplier.parts.some((p) => p.label?.startsWith('武器('));
      expect(hasWeaponLabel).toBe(false);
    });

    it('最大HP: 10K × 永続100% × ラン100% = 10K', () => {
      const last = result.maxHp.parts[result.maxHp.parts.length - 1];
      expect(last.display).toBe('10.00A');
    });

    it('HPリジェネ: 100 × 永続100% = 100/秒', () => {
      const last = result.hpRegen.parts[result.hpRegen.parts.length - 1];
      expect(last.display).toBe('100/秒');
    });

    it('防御力: 100 × 永続100% = 100', () => {
      const last = result.defense.parts[result.defense.parts.length - 1];
      expect(last.display).toBe('100');
    });

    it('被ダメ軽減: 0 +0% = 0% (上限 98%)', () => {
      const last = result.damageReduction.parts[result.damageReduction.parts.length - 1];
      expect(last.display).toBe('0%');
      expect(result.damageReduction.cap).toBe('上限 98%');
    });

    it('索敵距離 (v1.3.11 線形): Lv 0 = 150px、 cap = 上限 300px (Lv100)', () => {
      const last = result.range.parts[result.range.parts.length - 1];
      expect(last.display).toBe('150px');
      // 永続加算 part が +0 (Lv 0)
      const perp = result.range.parts[1];
      expect(perp.display).toBe('+0');
      expect(result.range.cap).toBe('上限 300px (Lv100)');
    });

    it('アクティブ威力: 1.00× +0.00 = 1.00×', () => {
      const last = result.activePower.parts[result.activePower.parts.length - 1];
      // v1.3.9: 倍率系数表記
      expect(last.display).toBe('1.00×');
    });

    it('アクティブCD短縮: 0 +0% = 0% / CD 60秒', () => {
      const last = result.activeCdReduction.parts[result.activeCdReduction.parts.length - 1];
      expect(last.display).toBe('0%');
      expect(result.activeCdReduction.note).toContain('60.0秒');
    });
  });

  describe('永続強化が乗ったケース', () => {
    it('攻撃速度 Lv 10: +0.50, 倍率 1.50× で表示される', () => {
      const ctx = makeDefaultCtx();
      ctx.machineLevels.attackSpeed = 10;
      const result = buildMachineStatsBreakdown(ctx);

      // parts[1] が永続加算 ("+0.50")
      const perp = result.attackSpeed.parts[1];
      expect(perp.kind).toBe('add');
      expect(perp.display).toBe('+0.50');
      expect(perp.label).toBe('永続');

      // final が 1.50×
      const last = result.attackSpeed.parts[result.attackSpeed.parts.length - 1];
      expect(last.display).toBe('1.50×');
    });

    it('Critical率 Lv 50: +25%', () => {
      const ctx = makeDefaultCtx();
      ctx.machineLevels.critRate = 50;
      const result = buildMachineStatsBreakdown(ctx);

      const perp = result.critRate.parts[1];
      expect(perp.display).toBe('+25%');

      const last = result.critRate.parts[result.critRate.parts.length - 1];
      expect(last.display).toBe('25%');
    });

    it('被ダメ軽減 Lv 100: +50%', () => {
      const ctx = makeDefaultCtx();
      ctx.machineLevels.damageReduction = 100;
      const result = buildMachineStatsBreakdown(ctx);

      const last = result.damageReduction.parts[result.damageReduction.parts.length - 1];
      expect(last.display).toBe('50%');
    });

    it('アクティブCD短縮 Lv 50: +25% で CD 45秒', () => {
      const ctx = makeDefaultCtx();
      ctx.machineLevels.activeCdReduction = 50;
      const result = buildMachineStatsBreakdown(ctx);

      const last = result.activeCdReduction.parts[result.activeCdReduction.parts.length - 1];
      expect(last.display).toBe('25%');
      expect(result.activeCdReduction.note).toContain('45.0秒');
    });
  });

  describe('Tier 差分バフ', () => {
    it('Tier 差 2 (highestTier=3, currentTier=1) → 攻撃力 Tier差 ×1.44', () => {
      const ctx = makeDefaultCtx();
      ctx.highestTier = 3;
      ctx.currentTier = 1;
      const result = buildMachineStatsBreakdown(ctx);

      // Tier差 part (index 2) が 1.2^2 = 1.44 → "1.44"
      const tierPart = result.attack.parts[2];
      expect(tierPart.label).toBe('Tier差');
      expect(tierPart.display).toBe('1.44');
    });

    it('Tier 差 なし (currentTier >= highestTier) → 1 (整数表示)', () => {
      const ctx = makeDefaultCtx();
      ctx.highestTier = 1;
      ctx.currentTier = 5;
      const result = buildMachineStatsBreakdown(ctx);

      const tierPart = result.attack.parts[2];
      // 1.0 は整数なので "1"
      expect(tierPart.display).toBe('1');
    });
  });

  describe('武器ごとの違い', () => {
    it('Laser 装備 + 武器Lv 30 → クリ倍率に「武器(Laser)」 ボーナス +0.30', () => {
      const ctx = makeDefaultCtx();
      ctx.weapon = 'laser';
      ctx.weaponLv = 30;
      const result = buildMachineStatsBreakdown(ctx);

      const hasLaserBonus = result.critMultiplier.parts.some((p) => p.label?.includes('Laser'));
      expect(hasLaserBonus).toBe(true);

      // 武器ボーナス = 0.01 × 30 = 0.30 → "+0.30" (倍率系数)
      const laserPart = result.critMultiplier.parts.find((p) => p.label?.includes('Laser'));
      expect(laserPart?.display).toBe('+0.30');

      // final = 1.5 + 0 + 0.3 = 1.80×
      const last = result.critMultiplier.parts[result.critMultiplier.parts.length - 1];
      expect(last.display).toBe('1.80×');
    });

    it('Cannon 装備 → 攻撃力の武器倍率 ×6 (整数表示)', () => {
      const ctx = makeDefaultCtx();
      ctx.weapon = 'cannon';
      const result = buildMachineStatsBreakdown(ctx);

      const weaponPart = result.attack.parts.find((p) => p.label?.includes('武器'));
      expect(weaponPart?.label).toBe('武器(Cannon)');
      // Cannon BASE_DAMAGE_MUL = 6.0 → "6" (整数)
      expect(weaponPart?.display).toBe('6');
    });
  });

  describe('ラン中強化', () => {
    it('attackMul Lv 5 → 攻撃力の「ラン」 倍率 ×1.50', () => {
      const ctx = makeDefaultCtx();
      ctx.runWorkshopLevels.attackMul = 5;
      const result = buildMachineStatsBreakdown(ctx);

      const runPart = result.attack.parts.find((p) => p.label === 'ラン');
      // 1.0 + 0.1 × 5 = 1.5
      expect(runPart?.display).toBe('1.50');
    });

    it('hpMul Lv 10 → 最大HP の「ラン」 倍率 ×2 (整数)', () => {
      const ctx = makeDefaultCtx();
      ctx.runWorkshopLevels.hpMul = 10;
      const result = buildMachineStatsBreakdown(ctx);

      const runPart = result.maxHp.parts.find((p) => p.label === 'ラン');
      // 2.0 は整数なので "2"
      expect(runPart?.display).toBe('2');
      // final = 10K × 1.0 × 2.0 = 20K
      const last = result.maxHp.parts[result.maxHp.parts.length - 1];
      expect(last.display).toBe('20.00A');
    });
  });

  describe('1000倍以上の倍率 → BigNum suffix 表記', () => {
    it('倍率 1000 → "1.00A" (% は付けない)', () => {
      // baseAttack を高 Lv にして永続倍率を 1000 超えにする想定。
      // 直接 buildMachineStatsBreakdown に投げるには Lv を盛る必要がある。
      // ここでは run workshop attackMul の値を経路として高倍率を作るのではなく、
      // formatMul の閾値挙動だけ確かめる目的で baseAttack Lv を上げる。
      const ctx = makeDefaultCtx();
      // baseAttack は ×1.02^Lv の指数成長。 Lv 350 で 1.02^350 ≈ 1006 → "1.00A" 想定。
      ctx.machineLevels.baseAttack = 350;
      const result = buildMachineStatsBreakdown(ctx);

      const perpPart = result.attack.parts[1];
      expect(perpPart.label).toBe('永続');
      // BigNum 表記に切り替わっている (suffix が付いている)
      expect(perpPart.display).toMatch(/[A-Z]/);
    });
  });
});
