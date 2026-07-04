import { describe, expect, it } from 'vitest';

import { rollOverflowCount } from './overflow';

const fixedRng = (v: number) => () => v;

describe('rollOverflowCount', () => {
  it('p=0 → 常に 0', () => {
    expect(rollOverflowCount(0, fixedRng(0))).toBe(0);
    expect(rollOverflowCount(0, fixedRng(0.999))).toBe(0);
  });

  it('p が負値 → 常に 0', () => {
    expect(rollOverflowCount(-1, fixedRng(0))).toBe(0);
  });

  it('p=0.5 → rng=0 で 1、rng=0.999 で 0', () => {
    expect(rollOverflowCount(0.5, fixedRng(0))).toBe(1);
    expect(rollOverflowCount(0.5, fixedRng(0.999))).toBe(0);
  });

  it('p=1.0 → 端数 0 なので rng に関わらず常に 1', () => {
    expect(rollOverflowCount(1.0, fixedRng(0))).toBe(1);
    expect(rollOverflowCount(1.0, fixedRng(0.999))).toBe(1);
  });

  it('p=1.5 → rng=0 で 2、rng=0.999 で 1', () => {
    expect(rollOverflowCount(1.5, fixedRng(0))).toBe(2);
    expect(rollOverflowCount(1.5, fixedRng(0.999))).toBe(1);
  });

  it('p=2.0 → 端数 0 なので rng に関わらず常に 2', () => {
    expect(rollOverflowCount(2.0, fixedRng(0))).toBe(2);
    expect(rollOverflowCount(2.0, fixedRng(0.999))).toBe(2);
  });

  it('p=2.3 → rng=0 で 3、rng=0.999 で 2', () => {
    expect(rollOverflowCount(2.3, fixedRng(0))).toBe(3);
    expect(rollOverflowCount(2.3, fixedRng(0.999))).toBe(2);
  });
});
