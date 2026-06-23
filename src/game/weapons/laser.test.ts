import { describe, expect, it } from 'vitest';

import {
  LASER_BASE_AS,
  LASER_BASE_DAMAGE_MUL,
  LASER_MEGA_BEAM_WIDTH_PCT,
  LASER_MEGA_CD_SEC,
  laserMegaBeam,
  laserNormalAttack,
  laserStats,
} from './laser';

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
    attackSpeed: 1,
    activePower: 1,
    activeCdReduction: 0,
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
    maxHp: BigNum.fromNumber(100),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// laserStats — スケールテスト
// ---------------------------------------------------------------------------

describe('laserStats', () => {
  it('Lv0: 各ステが底値になる', () => {
    const s = laserStats(0);
    expect(s.attackPerSec).toBeCloseTo(LASER_BASE_AS);
    expect(s.pierce).toBe(1);
    expect(s.damageMul).toBeCloseTo(LASER_BASE_DAMAGE_MUL);
    expect(s.megaCdSec).toBe(LASER_MEGA_CD_SEC);
    expect(s.megaDamageMul).toBeCloseTo(10.0);
  });

  it('Lv1: AS / damageMul が Lv で増加', () => {
    const s = laserStats(1);
    expect(s.attackPerSec).toBeCloseTo(LASER_BASE_AS * 1.03);
    expect(s.pierce).toBe(1);
    expect(s.damageMul).toBeCloseTo(LASER_BASE_DAMAGE_MUL * 1.02);
    expect(s.megaDamageMul).toBeCloseTo(10.5);
  });

  it('Lv10: pierce = floor(1 + 1.0) = 2, megaDamageMul = 10 × 1.5 = 15', () => {
    const s = laserStats(10);
    expect(s.attackPerSec).toBeCloseTo(LASER_BASE_AS * 1.3);
    expect(s.pierce).toBe(2);
    expect(s.damageMul).toBeCloseTo(LASER_BASE_DAMAGE_MUL * Math.pow(1.02, 10));
    expect(s.megaDamageMul).toBeCloseTo(15.0);
  });

  it('Lv50: pierce = floor(1 + 5.0) = 6', () => {
    const s = laserStats(50);
    expect(s.attackPerSec).toBeCloseTo(LASER_BASE_AS * (1 + 0.03 * 50));
    expect(s.pierce).toBe(6);
    expect(s.damageMul).toBeCloseTo(LASER_BASE_DAMAGE_MUL * Math.pow(1.02, 50), 3);
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
    const baseAttack = 100;
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 0.5,
      critMultiplier: 2.0,
    });
    const stats = laserStats(0);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0);
    expect(result.hits[0].crit).toBe(true);
    // baseAttack × LASER_BASE_DAMAGE_MUL × 2.0
    const expected = String(Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL * 2));
    expect(result.hits[0].damage.toString()).toBe(expected);
  });

  it('rng=1（>= critRate）のとき必ずクリティカルにならない', () => {
    const baseAttack = 100;
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 0.99,
      critMultiplier: 2.0,
    });
    const stats = laserStats(0);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 1);
    expect(result.hits[0].crit).toBe(false);
    const expected = String(Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL));
    expect(result.hits[0].damage.toString()).toBe(expected);
  });

  it('critRate=0 のとき rng に関わらずクリティカルにならない', () => {
    const baseAttack = 100;
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 0,
      critMultiplier: 3.0,
    });
    const stats = laserStats(0);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0);
    expect(result.hits[0].crit).toBe(false);
    const expected = String(Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL));
    expect(result.hits[0].damage.toString()).toBe(expected);
  });

  it('damageMul が正しくダメージに乗算される（Lv10）', () => {
    const baseAttack = 100;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack), critRate: 0 });
    const stats = laserStats(10);
    const enemy = makeEnemy();
    const result = laserNormalAttack(machine, stats, [enemy], () => 0.5);
    // damage = baseAttack × (LASER_BASE_DAMAGE_MUL × 1.02^10)
    const expected = Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL * Math.pow(1.02, 10));
    const actual = parseInt(result.hits[0].damage.toString(), 10);
    expect(actual).toBeGreaterThanOrEqual(expected - 1);
    expect(actual).toBeLessThanOrEqual(expected + 1);
  });
});

// ---------------------------------------------------------------------------
// laserMegaBeam — アクティブ
// ---------------------------------------------------------------------------

describe('laserMegaBeam', () => {
  // テスト用デフォルト: マシン (50,50)、 ビームは右 (angle=0°) 方向に発射する
  // → 敵は x > 50, y ≈ 50 に置くと「ビーム軸上」 として判定される

  it('敵が 0 体のとき hits=[]', () => {
    const machine = makeMachine();
    const stats = laserStats(0);
    const result = laserMegaBeam(machine, stats, [], 0);
    expect(result.hits).toHaveLength(0);
  });

  it('ビーム軸上の敵にヒットする (範囲は射程によらず画面端まで)', () => {
    const machine = makeMachine({ critRate: 0 });
    const stats = laserStats(0);
    // 全敵を angle=0 (右) のビーム軸 (y=50) 上に配置 → 全員ヒット
    const e1 = makeEnemy({ id: 'mega-e1', position: { x: 60, y: 50 } });
    const e2 = makeEnemy({ id: 'mega-e2', position: { x: 75, y: 50 } });
    const e3 = makeEnemy({ id: 'mega-e3', position: { x: 90, y: 50 } });
    const result = laserMegaBeam(machine, stats, [e1, e2, e3], 0);
    expect(result.hits).toHaveLength(3);
    const ids = result.hits.map((h) => h.enemyId);
    expect(ids).toContain('mega-e1');
    expect(ids).toContain('mega-e2');
    expect(ids).toContain('mega-e3');
  });

  it('ビーム軸から幅の半分より外の敵はヒットしない', () => {
    const machine = makeMachine();
    const stats = laserStats(0);
    // beamWidthPct=LASER_MEGA_BEAM_WIDTH_PCT の半分より上の敵は外れる
    const inside = makeEnemy({ id: 'in', position: { x: 70, y: 50 } });
    const outside = makeEnemy({
      id: 'out',
      position: { x: 70, y: 50 + LASER_MEGA_BEAM_WIDTH_PCT },
    });
    const result = laserMegaBeam(machine, stats, [inside, outside], 0);
    const ids = result.hits.map((h) => h.enemyId);
    expect(ids).toContain('in');
    expect(ids).not.toContain('out');
  });

  it('ビーム背後 (parallel < 0) の敵はヒットしない', () => {
    const machine = makeMachine();
    const stats = laserStats(0);
    const front = makeEnemy({ id: 'front', position: { x: 70, y: 50 } });
    const back = makeEnemy({ id: 'back', position: { x: 30, y: 50 } }); // angle=0 の真逆
    const result = laserMegaBeam(machine, stats, [front, back], 0);
    const ids = result.hits.map((h) => h.enemyId);
    expect(ids).toContain('front');
    expect(ids).not.toContain('back');
  });

  it('angleDeg=90 (下) の敵にヒットする', () => {
    const machine = makeMachine();
    const stats = laserStats(0);
    // y 軸 (下方向) ビーム → 敵は x=50, y>50 に置く
    const enemy = makeEnemy({ id: 'down', position: { x: 50, y: 80 } });
    const result = laserMegaBeam(machine, stats, [enemy], 90);
    expect(result.hits).toHaveLength(1);
  });

  it('Mega Beam のダメージは通常攻撃の ×megaDamageMul になる（Lv0）', () => {
    const baseAttack = 100;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack), critRate: 0 });
    const stats = laserStats(0);
    const enemy = makeEnemy({ id: 'mega-dmg', position: { x: 70, y: 50 } });
    const result = laserMegaBeam(machine, stats, [enemy], 0);
    // damage = baseAttack × LASER_BASE_DAMAGE_MUL × megaDamageMul(=10)
    const expected = String(Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL * 10));
    expect(result.hits[0].damage.toString()).toBe(expected);
  });

  it('Lv10 の Mega Beam: damage = baseAttack × damageMul × megaDamageMul', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100), critRate: 0 });
    const stats = laserStats(10);
    const totalMul = stats.damageMul * stats.megaDamageMul;
    const expected = Math.floor(100 * totalMul);
    const enemy = makeEnemy({ id: 'mega-lv10', position: { x: 70, y: 50 } });
    const result = laserMegaBeam(machine, stats, [enemy], 0);
    const actual = parseInt(result.hits[0].damage.toString(), 10);
    expect(actual).toBeGreaterThanOrEqual(expected - 1);
    expect(actual).toBeLessThanOrEqual(expected + 2);
  });

  it('Mega Beam にクリティカルが乗らない（isCrit=false 固定）', () => {
    const baseAttack = 100;
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 1.0,
      critMultiplier: 3.0,
    });
    const stats = laserStats(0);
    const enemy = makeEnemy({ id: 'mega-nocrit', position: { x: 70, y: 50 } });
    const result = laserMegaBeam(machine, stats, [enemy], 0);
    const expected = String(Math.floor(baseAttack * LASER_BASE_DAMAGE_MUL * 10));
    expect(result.hits[0].damage.toString()).toBe(expected);
  });
});
