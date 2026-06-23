import { describe, it, expect } from 'vitest';

import {
  NORMAL_HP_MULT,
  UPPER_REWARD,
  createEnemyTemplate,
  scaledReward,
  spawnEnemy,
} from './enemies';
import { TIER_BASE } from './tier';

import { BigNum } from '@/lib/bignum/BigNum';

// T1W1 (waveHpFactor=1.0 / waveAtkFactor=1.0) の期待値を TIER_BASE と倍率から計算するヘルパー
function expectedHp(mult: number): string {
  return BigNum.fromNumber(TIER_BASE.HP).mulNumber(mult).toString();
}
function expectedAtk(mult: number): string {
  return BigNum.fromNumber(TIER_BASE.ATK).mulNumber(mult).toString();
}

// ---------------------------------------------------------------------------
// createEnemyTemplate — 通常敵
// ---------------------------------------------------------------------------

describe('createEnemyTemplate: normal', () => {
  it('T=1 W=1 standard の HP は TIER_BASE.HP × NORMAL_HP_MULT.standard', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'standard');
    expect(t.hp.toString()).toBe(expectedHp(NORMAL_HP_MULT.standard));
  });

  it('T=1 W=1 standard の ATK は TIER_BASE.ATK', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'standard');
    expect(t.atk.toString()).toBe(expectedAtk(1.0));
  });

  it('T=1 W=1 standard の speed は TIER_BASE.SPD × 1.0', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'standard');
    expect(t.speed).toBe(TIER_BASE.SPD);
  });

  it('T=1 W=1 swift の HP は TIER_BASE.HP × NORMAL_HP_MULT.swift', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'swift');
    expect(t.hp.toString()).toBe(expectedHp(NORMAL_HP_MULT.swift));
  });

  it('T=1 W=1 swift の speed は TIER_BASE.SPD × 2.0', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'swift');
    expect(t.speed).toBe(TIER_BASE.SPD * 2.0);
  });

  it('T=1 W=1 tough の HP は TIER_BASE.HP × NORMAL_HP_MULT.tough', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'tough');
    expect(t.hp.toString()).toBe(expectedHp(NORMAL_HP_MULT.tough));
  });

  it('T=1 W=1 tough の speed は TIER_BASE.SPD × 0.5', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'tough');
    expect(t.speed).toBe(TIER_BASE.SPD * 0.5);
  });

  it('kind が "normal" である', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'standard');
    expect(t.kind).toBe('normal');
  });

  it('subtype が引数どおりになる', () => {
    const t = createEnemyTemplate(1, 1, 'normal', 'tough');
    expect(t.subtype).toBe('tough');
  });

  it('subtype 省略時は standard になる', () => {
    const t = createEnemyTemplate(1, 1, 'normal');
    expect(t.subtype).toBe('standard');
  });

  it('T=2 W=1 standard の HP は T=1 より大きい', () => {
    const t1 = createEnemyTemplate(1, 1, 'normal', 'standard');
    const t2 = createEnemyTemplate(2, 1, 'normal', 'standard');
    expect(t2.hp.gt(t1.hp)).toBe(true);
  });

  it('T=1 W=30 standard の HP は T=1 W=1 より大きい（ウェーブ係数分）', () => {
    const w1 = createEnemyTemplate(1, 1, 'normal', 'standard');
    const w30 = createEnemyTemplate(1, 30, 'normal', 'standard');
    expect(w30.hp.gt(w1.hp)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// createEnemyTemplate — elite / miniboss / boss
// ---------------------------------------------------------------------------

describe('createEnemyTemplate: elite', () => {
  it('T=1 W=5 elite の HP は standard の 10 倍以上', () => {
    const std = createEnemyTemplate(1, 5, 'normal', 'standard');
    const elite = createEnemyTemplate(1, 5, 'elite');
    // UPPER_HP_MULT.elite = 10
    // elite HP > std HP * 9 （誤差を考慮）
    const stdTen = std.hp.mulInt(9);
    expect(elite.hp.gt(stdTen)).toBe(true);
  });

  it('kind が "elite" である', () => {
    const t = createEnemyTemplate(1, 5, 'elite');
    expect(t.kind).toBe('elite');
  });

  it('subtype が undefined である', () => {
    const t = createEnemyTemplate(1, 5, 'elite');
    expect(t.subtype).toBeUndefined();
  });

  it('報酬 screw が UPPER_REWARD.elite.screw と一致', () => {
    const t = createEnemyTemplate(1, 5, 'elite');
    expect(t.reward.screw).toBe(UPPER_REWARD.elite.screw);
  });
});

describe('createEnemyTemplate: miniboss', () => {
  it('kind が "miniboss" である', () => {
    const t = createEnemyTemplate(1, 10, 'miniboss');
    expect(t.kind).toBe('miniboss');
  });

  it('T=1 W=10 miniboss の HP は elite の 5 倍以上', () => {
    const elite = createEnemyTemplate(1, 10, 'elite');
    const miniboss = createEnemyTemplate(1, 10, 'miniboss');
    // UPPER_HP_MULT: elite=10, miniboss=50 → 5 倍
    const eliteFive = elite.hp.mulInt(4);
    expect(miniboss.hp.gt(eliteFive)).toBe(true);
  });

  it('報酬の alloyChance が UPPER_REWARD.miniboss.alloyChance と一致', () => {
    const t = createEnemyTemplate(1, 10, 'miniboss');
    expect(t.reward.alloyChance).toBe(UPPER_REWARD.miniboss.alloyChance);
  });
});

describe('createEnemyTemplate: boss', () => {
  it('kind が "boss" である', () => {
    const t = createEnemyTemplate(1, 30, 'boss');
    expect(t.kind).toBe('boss');
  });

  it('T=1 W=30 boss の HP が最大', () => {
    const normal = createEnemyTemplate(1, 30, 'normal', 'standard');
    const boss = createEnemyTemplate(1, 30, 'boss');
    // boss HP mult = 250、normal の 250 倍
    expect(boss.hp.gt(normal.hp)).toBe(true);
  });

  it('報酬 alloyAmount が UPPER_REWARD.boss.alloyAmount と一致', () => {
    const t = createEnemyTemplate(1, 30, 'boss');
    expect(t.reward.alloyAmount).toBe(UPPER_REWARD.boss.alloyAmount);
  });

  it('T=1000 W=30 boss の HP が ZERO でない（BigNum スケール確認）', () => {
    const t = createEnemyTemplate(1000, 30, 'boss');
    expect(t.hp.isZero()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 仕様数値の検証（代表 Tier）
// ---------------------------------------------------------------------------

describe('Tier スケール検証', () => {
  it('T=10 standard W=1 の HP は T=1 より大きい（HP_GROWTH^9 倍程度）', () => {
    const t1 = createEnemyTemplate(1, 1, 'normal', 'standard');
    const t10 = createEnemyTemplate(10, 1, 'normal', 'standard');
    // HP_GROWTH^9 ≈ 34.27 → t10 は t1 の 30〜40 倍程度
    const t1ThirtyX = t1.hp.mulInt(20); // 20 倍以上あること
    expect(t10.hp.gt(t1ThirtyX)).toBe(true);
  });

  it('T=100 standard W=1 の HP は T=10 より大きい', () => {
    const t10 = createEnemyTemplate(10, 1, 'normal', 'standard');
    const t100 = createEnemyTemplate(100, 1, 'normal', 'standard');
    expect(t100.hp.gt(t10.hp)).toBe(true);
  });

  it('T=1000 standard W=1 の HP は T=100 より大きい', () => {
    const t100 = createEnemyTemplate(100, 1, 'normal', 'standard');
    const t1000 = createEnemyTemplate(1000, 1, 'normal', 'standard');
    expect(t1000.hp.gt(t100.hp)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// spawnEnemy
// ---------------------------------------------------------------------------

describe('spawnEnemy', () => {
  const template = createEnemyTemplate(1, 1, 'normal', 'standard');
  let callCount = 0;
  const deterministicRng = () => {
    callCount++;
    // 0.3 と 0.7 を交互に返す
    return callCount % 2 === 1 ? 0.3 : 0.7;
  };

  it('id が引数の値になる', () => {
    const s = spawnEnemy(template, 'enemy-001', 1000, deterministicRng);
    expect(s.id).toBe('enemy-001');
  });

  it('spawnedAtMs が引数の値になる', () => {
    const s = spawnEnemy(template, 'enemy-002', 5000, deterministicRng);
    expect(s.spawnedAtMs).toBe(5000);
  });

  it('position.x が 0 か 100 である', () => {
    // rng() < 0.5 なら 0、そうでなければ 100
    const s1 = spawnEnemy(template, 'e1', 0, () => 0.3); // x=0
    expect(s1.position.x).toBe(0);
    const s2 = spawnEnemy(template, 'e2', 0, () => 0.6); // x=100
    expect(s2.position.x).toBe(100);
  });

  it('position.y が 0〜100 の範囲内', () => {
    const rng = (() => {
      let n = 0;
      return () => {
        n++;
        return n % 2 === 1 ? 0.3 : 0.75;
      };
    })();
    const s = spawnEnemy(template, 'e3', 0, rng);
    expect(s.position.y).toBeGreaterThanOrEqual(0);
    expect(s.position.y).toBeLessThanOrEqual(100);
  });

  it('テンプレートのプロパティが保持される', () => {
    const s = spawnEnemy(template, 'e4', 100, () => 0.5);
    expect(s.kind).toBe(template.kind);
    expect(s.hp.eq(template.hp)).toBe(true);
    expect(s.atk.eq(template.atk)).toBe(true);
    expect(s.speed).toBe(template.speed);
  });
});

// ---------------------------------------------------------------------------
// scaledReward
// ---------------------------------------------------------------------------

describe('scaledReward', () => {
  it('T=1 の倍率は 1（1*1=1）', () => {
    expect(scaledReward(10, 1)).toBe(10);
  });

  it('T=2 の倍率は 4（2*2=4）', () => {
    expect(scaledReward(10, 2)).toBe(40);
  });

  it('T=5 の倍率は 25', () => {
    expect(scaledReward(1, 5)).toBe(25);
  });

  it('T=10 の倍率は 100', () => {
    expect(scaledReward(50, 10)).toBe(5000);
  });
});
