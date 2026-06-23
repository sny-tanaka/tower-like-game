import { describe, expect, it } from 'vitest';

import { LASER_MEGA_CD_SEC, laserMegaBeam, laserNormalAttack, laserStats } from './laser';

import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テスト用ファクトリ
// ---------------------------------------------------------------------------

function makeMachine(overrides: Partial<MachineStats> = {}): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(100),
    defense: BigNum.fromNumber(0),
    damageReduction: 0,
    critRate: 0,
    critMultiplier: 2.0,
    maxHp: BigNum.fromNumber(1000),
    hpRegen: BigNum.fromNumber(1),
    ...overrides,
  };
}

let _enemyCounter = 0;
function makeEnemy(overrides: Partial<SpawnedEnemy> = {}): SpawnedEnemy {
  _enemyCounter++;
  return {
    id: `enemy-${_enemyCounter}`,
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(100),
    atk: BigNum.fromNumber(10),
    speed: 1,
    reward: { screw: 1, bolt: 1, alloyChance: 0, alloyAmount: 0 },
    spawnedAtMs: 0,
    position: { x: 50, y: 50 },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// laserStats — スケールテスト
// ---------------------------------------------------------------------------

describe('laserStats', () => {
  it('Lv0: 各ステが底値になる', () => {
    const s = laserStats(0);
    expect(s.attackPerSec).toBeCloseTo(1.0);
    expect(s.pierce).toBe(1);
    expect(s.damageMul).toBeCloseTo(1.0);
    expect(s.megaCdSec).toBe(LASER_MEGA_CD_SEC);
    expect(s.megaDamageMul).toBeCloseTo(10.0);
  });

  it('Lv1: attackPerSec = 1.03, pierce = floor(1.1) = 1', () => {
    const s = laserStats(1);
    expect(s.attackPerSec).toBeCloseTo(1.03);
    expect(s.pierce).toBe(1);
    expect(s.damageMul).toBeCloseTo(1.02);
    expect(s.megaDamageMul).toBeCloseTo(10.5); // 10 × (1 + 0.05 × 1)
  });

  it('Lv10: pierce = floor(1 + 1.0) = 2, megaDamageMul = 10 × 1.5 = 15', () => {
    const s = laserStats(10);
    // AS: 1.0 × (1 + 0.03×10) = 1.3
    expect(s.attackPerSec).toBeCloseTo(1.3);
    // pierce: floor(1 + 0.1×10) = floor(2) = 2
    expect(s.pierce).toBe(2);
    // damageMul: 1.02^10 ≈ 1.2189
    expect(s.damageMul).toBeCloseTo(Math.pow(1.02, 10));
    // megaDamageMul: 10 × (1 + 0.05×10) = 10 × 1.5 = 15
    expect(s.megaDamageMul).toBeCloseTo(15.0);
  });

  it('Lv50: pierce = floor(1 + 5.0) = 6', () => {
    const s = laserStats(50);
    // AS: 1.0 × (1 + 0.03×50) = 1.0 × 2.5 = 2.5
    expect(s.attackPerSec).toBeCloseTo(2.5);
    // pierce: floor(1 + 0.1×50) = floor(6) = 6
    expect(s.pierce).toBe(6);
    // damageMul: 1.02^50 ≈ 2.6916
    expect(s.damageMul).toBeCloseTo(Math.pow(1.02, 50), 3);
    // megaDamageMul: 10 × (1 + 0.05×50) = 10 × 3.5 = 35
    expect(s.megaDamageMul).toBeCloseTo(35.0);
  });

  it('負の Lv は 0 に丸めて Lv0 と同じ結果になる', () => {
    const s0 = laserStats(0);
    const sNeg = laserStats(-5);
    expect(sNeg.attackPerSec).toBeCloseTo(s0.attackPerSec);
    expect(sNeg.pierce).toBe(s0.pierce);
    expect(sNeg.damageMul).toBeCloseTo(s0.damageMul);
  });
});

// ---------------------------------------------------------------------------
// laserNormalAttack — 通常攻撃
// ---------------------------------------------------------------------------

describe('laserNormalAttack', () => {
  it('敵が 0 体のとき hits=[], beamX=0, beamY=0', () => {
    const machine = makeMachine();
    const stats = laserStats(0); // pierce=1
    const result = laserNormalAttack(machine, stats, [], () => 0.5);
    expect(result.hits).toHaveLength(0);
    expect(result.beamX).toBe(0);
    expect(result.beamY).toBe(0);
  });

  it('pierce=1 のとき 1 体だけヒットする（2 体目はヒットしない）', () => {
    const machine = makeMachine();
    const stats = laserStats(0); // pierce=1
    const e1 = makeEnemy({ id: 'e1', position: { x: 10, y: 10 } });
    const e2 = makeEnemy({ id: 'e2', position: { x: 20, y: 20 } });
    const result = laserNormalAttack(machine, stats, [e1, e2], () => 0.5);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0].enemyId).toBe('e1');
    // beamX/Y は最も遠いヒット対象 = e1 の position
    expect(result.beamX).toBe(10);
    expect(result.beamY).toBe(10);
  });

  it('pierce=2 で 2 体ヒット、3 体目はヒットしない', () => {
    const machine = makeMachine();
    const stats = laserStats(10); // pierce = floor(1 + 0.1×10) = 2
    const e1 = makeEnemy({ id: 'e1', position: { x: 10, y: 10 } });
    const e2 = makeEnemy({ id: 'e2', position: { x: 20, y: 20 } });
    const e3 = makeEnemy({ id: 'e3', position: { x: 30, y: 30 } });
    const result = laserNormalAttack(machine, stats, [e1, e2, e3], () => 0.5);
    expect(result.hits).toHaveLength(2);
    expect(result.hits[0].enemyId).toBe('e1');
    expect(result.hits[1].enemyId).toBe('e2');
    // beamX/Y は最も遠いヒット対象 = e2 の position
    expect(result.beamX).toBe(20);
    expect(result.beamY).toBe(20);
  });

  it('rng=0（< critRate）のとき必ずクリティカルになる', () => {
    const machine = makeMachine({ critRate: 0.5, critMultiplier: 2.0 });
    const stats = laserStats(0); // pierce=1, damageMul=1.0
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0);
    expect(result.hits[0].crit).toBe(true);
    // damage = baseAttack × damageMul × critMultiplier = 100 × 1.0 × 2.0 = 200
    expect(result.hits[0].damage.toString()).toBe('200');
  });

  it('rng=1（>= critRate）のとき必ずクリティカルにならない', () => {
    const machine = makeMachine({ critRate: 0.99, critMultiplier: 2.0 });
    const stats = laserStats(0); // pierce=1, damageMul=1.0
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 1);
    expect(result.hits[0].crit).toBe(false);
    // damage = baseAttack × damageMul = 100 × 1.0 = 100
    expect(result.hits[0].damage.toString()).toBe('100');
  });

  it('critRate=0 のとき rng に関わらずクリティカルにならない', () => {
    const machine = makeMachine({ critRate: 0, critMultiplier: 3.0 });
    const stats = laserStats(0);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0);
    expect(result.hits[0].crit).toBe(false);
    expect(result.hits[0].damage.toString()).toBe('100');
  });

  it('damageMul が正しくダメージに乗算される（Lv10）', () => {
    // damageMul = 1.02^10 ≈ 1.2189...
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100), critRate: 0 });
    const stats = laserStats(10);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0.5);
    // damage = 100 × 1.02^10。BigNum の mulNumber は有理数近似なので整数部が一致することを確認
    const expected = Math.floor(100 * Math.pow(1.02, 10));
    const actual = parseInt(result.hits[0].damage.toString(), 10);
    // 丸め誤差 ±1 を許容
    expect(actual).toBeGreaterThanOrEqual(expected - 1);
    expect(actual).toBeLessThanOrEqual(expected + 1);
  });
});

// ---------------------------------------------------------------------------
// laserMegaBeam — アクティブ
// ---------------------------------------------------------------------------

describe('laserMegaBeam', () => {
  it('敵が 0 体のとき hits=[]', () => {
    const machine = makeMachine();
    const stats = laserStats(0);
    const result = laserMegaBeam(machine, stats, []);
    expect(result.hits).toHaveLength(0);
  });

  it('全敵にヒットする（範囲外含む）', () => {
    const machine = makeMachine({ critRate: 0 });
    const stats = laserStats(0); // damageMul=1.0, megaDamageMul=10.0
    const e1 = makeEnemy({ id: 'mega-e1' });
    const e2 = makeEnemy({ id: 'mega-e2' });
    const e3 = makeEnemy({ id: 'mega-e3' });
    const result = laserMegaBeam(machine, stats, [e1, e2, e3]);
    expect(result.hits).toHaveLength(3);
    const ids = result.hits.map((h) => h.enemyId);
    expect(ids).toContain('mega-e1');
    expect(ids).toContain('mega-e2');
    expect(ids).toContain('mega-e3');
  });

  it('Mega Beam のダメージは通常攻撃の ×megaDamageMul になる（Lv0: ×10）', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100), critRate: 0 });
    const stats = laserStats(0); // damageMul=1.0, megaDamageMul=10.0
    const enemy = makeEnemy({ id: 'mega-dmg' });
    const result = laserMegaBeam(machine, stats, [enemy]);
    // damage = 100 × (damageMul × megaDamageMul) = 100 × 10 = 1000
    expect(result.hits[0].damage.toString()).toBe('1000');
  });

  it('Lv10 の Mega Beam: damage = baseAttack × damageMul × megaDamageMul', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100), critRate: 0 });
    const stats = laserStats(10);
    // damageMul = 1.02^10, megaDamageMul = 15.0
    const totalMul = stats.damageMul * stats.megaDamageMul;
    const expected = Math.floor(100 * totalMul);
    const enemy = makeEnemy({ id: 'mega-lv10' });
    const result = laserMegaBeam(machine, stats, [enemy]);
    const actual = parseInt(result.hits[0].damage.toString(), 10);
    // 丸め誤差 ±1 を許容
    expect(actual).toBeGreaterThanOrEqual(expected - 1);
    expect(actual).toBeLessThanOrEqual(expected + 2);
  });

  it('Mega Beam にクリティカルが乗らない（isCrit=false 固定）', () => {
    // critRate=1.0 でも critMultiplier が乗算されないことを確認
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(100),
      critRate: 1.0,
      critMultiplier: 3.0,
    });
    const stats = laserStats(0); // damageMul=1.0, megaDamageMul=10.0
    const enemy = makeEnemy({ id: 'mega-nocrit' });
    const result = laserMegaBeam(machine, stats, [enemy]);
    // クリがなければ 100 × 10 = 1000。クリがあれば × 3.0 で 3000
    expect(result.hits[0].damage.toString()).toBe('1000');
  });
});
