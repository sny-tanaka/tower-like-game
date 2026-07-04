import { describe, expect, test } from 'vitest';

import { getPatchDisplayInfo } from './displayInfo';

describe('getPatchDisplayInfo', () => {
  // -------------------------------------------------------------------------
  // 線形スケール (変更なし / パッシブ)
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

  test('killHeal T1 → リジェネ 0.2秒分回復', () => {
    expect(getPatchDisplayInfo('killHeal', 1).effect).toBe('リジェネ 0.2秒分回復');
  });

  test('killHeal T10 → リジェネ 2.0秒分回復', () => {
    expect(getPatchDisplayInfo('killHeal', 10).effect).toBe('リジェネ 2.0秒分回復');
  });

  test('shieldRegen T3 → リジェネ +15%', () => {
    expect(getPatchDisplayInfo('shieldRegen', 3).effect).toBe('リジェネ +15%');
  });

  test('boltCast T7 → ボルト獲得 +14%', () => {
    expect(getPatchDisplayInfo('boltCast', 7).effect).toBe('ボルト獲得 +14%');
  });

  test('damageImmune T1 → バリア 1枚 (接触無効)', () => {
    expect(getPatchDisplayInfo('damageImmune', 1).effect).toBe('バリア 1枚 (接触無効)');
  });

  test('damageImmune T10 → バリア 10枚 (接触無効)', () => {
    expect(getPatchDisplayInfo('damageImmune', 10).effect).toBe('バリア 10枚 (接触無効)');
  });

  // -------------------------------------------------------------------------
  // 線形確率 (オーバーフロー型)
  // -------------------------------------------------------------------------

  test('instantKill T1 → 雑魚即死 発動 2.0% (2% + 0.6%*0)', () => {
    const info = getPatchDisplayInfo('instantKill', 1);
    expect(info.effect).toBe('雑魚即死 発動 2.0%');
  });

  test('instantKill T10 → 雑魚即死 発動 7.4% (2% + 0.6%*9=7.4%)', () => {
    expect(getPatchDisplayInfo('instantKill', 10).effect).toBe('雑魚即死 発動 7.4%');
  });

  test('instantKill T64 → 100% 未満は発動%表示 (2% + 0.6%*63 = 39.8% → 整数丸め 40%)', () => {
    // T64: p = 0.02 + 0.006*63 = 0.398 → 100% 未満。 10% 以上は整数丸め表示
    expect(getPatchDisplayInfo('instantKill', 64).effect).toBe('雑魚即死 発動 40%');
  });

  test('doubleShot T1 → 追加発射 発動 5.0%', () => {
    expect(getPatchDisplayInfo('doubleShot', 1).effect).toBe('追加発射 発動 5.0%');
  });

  test('doubleShot T10 → 追加発射 発動 19% (5% + 1.5%*9=18.5% → 整数丸め)', () => {
    expect(getPatchDisplayInfo('doubleShot', 10).effect).toBe('追加発射 発動 19%');
  });

  test('doubleShot T64 → 5% + 1.5%*63 = 99.5% (100%未満)', () => {
    expect(getPatchDisplayInfo('doubleShot', 64).effect).toBe('追加発射 発動 100%');
  });

  test('doubleShot T65 → 5% + 1.5%*64 = 101% → 確定1回 + 100%はrounding、実際は超過表記', () => {
    // T65: p = 0.05 + 0.015*64 = 1.01 → floor=1, frac=0.01
    const info = getPatchDisplayInfo('doubleShot', 65);
    expect(info.effect).toBe('追加発射 確定1回 + 1.0%で+1');
  });

  test('bonusDrop T1 → ネジx2 5.0%', () => {
    expect(getPatchDisplayInfo('bonusDrop', 1).effect).toBe('ネジx2 5.0%');
  });

  test('bonusDrop T65 → ネジ確定x2 + 1.0%でx3', () => {
    expect(getPatchDisplayInfo('bonusDrop', 65).effect).toBe('ネジ確定x2 + 1.0%でx3');
  });

  // -------------------------------------------------------------------------
  // 時間線形 + 確率 (100% 飽和・繰り越しなし) + 新規無限軸
  // -------------------------------------------------------------------------

  test('freezeHit T1 → 1.2秒凍結 5.0% / 凍結中DMG+2%', () => {
    expect(getPatchDisplayInfo('freezeHit', 1).effect).toBe('1.2秒凍結 5.0% / 凍結中DMG+2%');
  });

  test('freezeHit T5 → 2.0秒凍結 11% / 凍結中DMG+10%', () => {
    expect(getPatchDisplayInfo('freezeHit', 5).effect).toBe('2.0秒凍結 11% / 凍結中DMG+10%');
  });

  test('freezeHit T100 (発動率 100% 超過) → 発動率は 100% で飽和表示', () => {
    // T100: p = 0.05 + 0.015*99 = 1.535 → min(1,...) で 100%。 凍結秒数は 1+0.2*100=21.0 秒
    expect(getPatchDisplayInfo('freezeHit', 100).effect).toBe('21.0秒凍結 100% / 凍結中DMG+200%');
  });

  test('burnHit T3 → 1.6秒燃焼 8.0% / DoT 39%秒 (30+3*3=39)', () => {
    expect(getPatchDisplayInfo('burnHit', 3).effect).toBe('1.6秒燃焼 8.0% / DoT 39%秒');
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
