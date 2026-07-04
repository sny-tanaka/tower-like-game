import { describe, expect, it } from 'vitest';

import { calcFreezeApply, isFreezeImmune } from './freezeApply';

describe('isFreezeImmune', () => {
  it('freezeImmuneUntilMs が undefined → 免疫でない', () => {
    expect(isFreezeImmune(1000, undefined)).toBe(false);
  });

  it('nowGameMs < freezeImmuneUntilMs → 免疫中', () => {
    expect(isFreezeImmune(999, 1000)).toBe(true);
  });

  it('nowGameMs >= freezeImmuneUntilMs → 免疫終了', () => {
    expect(isFreezeImmune(1000, 1000)).toBe(false);
    expect(isFreezeImmune(1001, 1000)).toBe(false);
  });
});

describe('calcFreezeApply', () => {
  it('免疫中は付与しない (shouldApply=false)', () => {
    const result = calcFreezeApply('normal', 2, 500, 1000);
    expect(result.shouldApply).toBe(false);
    expect(result.frozenUntilMs).toBeUndefined();
  });

  it('normal (雑魚): 凍結時間そのまま。 免疫期限 = frozenUntilMs + freezeSec×2×1000', () => {
    // baseFreezeSec=2, nowGameMs=0
    const result = calcFreezeApply('normal', 2, 0, undefined);
    expect(result.shouldApply).toBe(true);
    expect(result.frozenUntilMs).toBe(2000); // 0 + 2*1000
    expect(result.freezeImmuneUntilMs).toBe(2000 + 2 * 2 * 1000); // frozenUntilMs + freezeSec*2*1000 = 6000
  });

  it('elite (上位敵): 凍結時間 ×0.5', () => {
    const result = calcFreezeApply('elite', 2, 0, undefined);
    expect(result.shouldApply).toBe(true);
    // freezeSec = 1 (2*0.5)
    expect(result.frozenUntilMs).toBe(1000);
    expect(result.freezeImmuneUntilMs).toBe(1000 + 1 * 2 * 1000); // 3000
  });

  it('miniboss / boss も上位敵として ×0.5 になる', () => {
    const miniboss = calcFreezeApply('miniboss', 4, 0, undefined);
    expect(miniboss.frozenUntilMs).toBe(2000); // 4*0.5*1000
    const boss = calcFreezeApply('boss', 4, 0, undefined);
    expect(boss.frozenUntilMs).toBe(2000);
  });

  it('免疫期限ちょうど nowGameMs で解除済み扱いになり新規付与できる', () => {
    const result = calcFreezeApply('normal', 1, 1000, 1000);
    expect(result.shouldApply).toBe(true);
  });

  it('アップタイム上限: 凍結:免疫 = 1:2 サイクルなので稼働率は 1/3 (33%) 以下に収まる (normal / 上位敵共通)', () => {
    // 仕様 (design-docs/15-balance-v1.5.0.md §2.2): 「凍結終了後、凍結時間×2 のあいだ免疫」
    // というルール自体は敵種別に依らず一定の 1:2 比率であるため、サイクル内の稼働率は
    // normal / 上位敵ともに厳密には 1/3 (≈33.3%) で、"上限 33%" の根拠となる。
    // 上位敵はこれに加えて凍結時間の絶対値そのものが半減する (§1.2 のダメージボーナス軸が
    // 相対的な価値を担保する)。
    const freezeSec = 3;
    for (const kind of ['normal', 'elite', 'miniboss', 'boss'] as const) {
      const result = calcFreezeApply(kind, freezeSec, 0, undefined);
      const frozenDurationMs = result.frozenUntilMs! - 0;
      const totalCycleMs = result.freezeImmuneUntilMs! - 0;
      expect(frozenDurationMs / totalCycleMs).toBeCloseTo(1 / 3, 5);
    }
  });

  it('上位敵は絶対的な凍結時間 (frozenUntilMs) が normal の半分になる', () => {
    const freezeSec = 3;
    const normalResult = calcFreezeApply('normal', freezeSec, 0, undefined);
    const bossResult = calcFreezeApply('boss', freezeSec, 0, undefined);
    expect(bossResult.frozenUntilMs).toBeCloseTo((normalResult.frozenUntilMs ?? 0) * 0.5, 5);
  });
});
