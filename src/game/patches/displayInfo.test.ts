import { describe, expect, test } from 'vitest';

import { getPatchDisplayInfo } from './displayInfo';

describe('getPatchDisplayInfo', () => {
  // -------------------------------------------------------------------------
  // 線形スケール
  // -------------------------------------------------------------------------

  test('bossKiller T1 → DMG +5%', () => {
    const info = getPatchDisplayInfo('bossKiller', 1);
    expect(info.name).toBe('ボスキラー');
    expect(info.effect).toBe('DMG +5%');
  });

  test('bossKiller T5 → DMG +25%', () => {
    expect(getPatchDisplayInfo('bossKiller', 5).effect).toBe('DMG +25%');
  });

  test('bossKiller T10 → DMG +50%', () => {
    expect(getPatchDisplayInfo('bossKiller', 10).effect).toBe('DMG +50%');
  });

  test('killHeal T1 → HP +0.5', () => {
    expect(getPatchDisplayInfo('killHeal', 1).effect).toBe('HP +0.5');
  });

  test('killHeal T10 → HP +5.0', () => {
    expect(getPatchDisplayInfo('killHeal', 10).effect).toBe('HP +5.0');
  });

  test('shieldRegen T3 → HP +15', () => {
    expect(getPatchDisplayInfo('shieldRegen', 3).effect).toBe('HP +15');
  });

  test('boltCast T7 → ボルト +35', () => {
    expect(getPatchDisplayInfo('boltCast', 7).effect).toBe('ボルト +35');
  });

  // -------------------------------------------------------------------------
  // 漸近確率 (T1, max は仕様 docs/06-patches.md より)
  // -------------------------------------------------------------------------

  test('instantKill T1 → 雑魚即死 2.9% (2 + 18×1/21 ≈ 2.86%)', () => {
    const info = getPatchDisplayInfo('instantKill', 1);
    expect(info.effect).toBe('雑魚即死 2.9%');
  });

  test('instantKill T10 → 雑魚即死 8.0% (2 + 18×10/30 = 8.0)', () => {
    // pct: < 10% は小数 1 桁、 >= 10% は整数
    expect(getPatchDisplayInfo('instantKill', 10).effect).toBe('雑魚即死 8.0%');
  });

  test('damageImmune T1 → 無効化 4.3% (3 + 27×1/21 ≈ 4.29%)', () => {
    expect(getPatchDisplayInfo('damageImmune', 1).effect).toBe('無効化 4.3%');
  });

  test('doubleShot T1 → 2連射 7.1% (5 + 45×1/21 ≈ 7.14%)', () => {
    expect(getPatchDisplayInfo('doubleShot', 1).effect).toBe('2連射 7.1%');
  });

  test('doubleShot T10 → 2連射 20% (5 + 45×10/30 = 20.0)', () => {
    expect(getPatchDisplayInfo('doubleShot', 10).effect).toBe('2連射 20%');
  });

  // -------------------------------------------------------------------------
  // 時間線形 + 漸近確率
  // -------------------------------------------------------------------------

  test('freezeHit T1 → 1.2秒凍結 7.1%', () => {
    expect(getPatchDisplayInfo('freezeHit', 1).effect).toBe('1.2秒凍結 7.1%');
  });

  test('freezeHit T5 → 2.0秒凍結 14%', () => {
    expect(getPatchDisplayInfo('freezeHit', 5).effect).toBe('2.0秒凍結 14%');
  });

  test('burnHit T3 → 1.6秒燃焼 11% (5 + 45×3/23 ≈ 10.87)', () => {
    // pct: >= 10% は整数 → Math.round(10.87) = 11
    expect(getPatchDisplayInfo('burnHit', 3).effect).toBe('1.6秒燃焼 11%');
  });

  // -------------------------------------------------------------------------
  // メタ情報 (name / iconName / trigger は Tier 非依存)
  // -------------------------------------------------------------------------

  test('全パッチで日本語表示名が返る', () => {
    const allNames = [
      'instantKill',
      'bossKiller',
      'doubleShot',
      'damageImmune',
      'killHeal',
      'shieldRegen',
      'bonusDrop',
      'boltCast',
      'freezeHit',
      'burnHit',
    ] as const;
    for (const n of allNames) {
      const info = getPatchDisplayInfo(n, 1);
      expect(info.name.length).toBeGreaterThan(0);
      expect(info.trigger.length).toBeGreaterThan(0);
      expect(info.effect.length).toBeGreaterThan(0);
    }
  });

  test('tier が 0 や負数でも T=1 として扱う', () => {
    expect(getPatchDisplayInfo('bossKiller', 0).effect).toBe('DMG +5%');
    expect(getPatchDisplayInfo('bossKiller', -3).effect).toBe('DMG +5%');
  });

  test('tier の小数は floor される (T1.9 → T1)', () => {
    expect(getPatchDisplayInfo('bossKiller', 1.9).effect).toBe('DMG +5%');
  });
});
