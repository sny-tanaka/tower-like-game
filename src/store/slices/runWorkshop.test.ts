import { beforeEach, describe, expect, test } from 'vitest';

import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// テスト前: 毎テスト store を初期状態に戻す
// ---------------------------------------------------------------------------

beforeEach(() => {
  useStore.getState().endRun(); // battle slice + RunWorkshop が defaults に戻る
});

describe('RunWorkshop slice', () => {
  test('初期 state は全 Lv 0', () => {
    const { runWorkshopLevels } = useStore.getState();
    expect(runWorkshopLevels).toEqual({
      attackMul: 0,
      attackSpeedMul: 0,
      hpMul: 0,
      screwGainMul: 0,
    });
  });

  test('upgradeRunWorkshop(attackMul, 1): ネジ十分なら Lv 加算 + ネジ消費', () => {
    // 初期残高 10 を注入 (attackMul の Lv 0 → 1 は cost=10)
    useStore.setState({ screw: BigNum.fromNumber(10) });
    const ok = useStore.getState().upgradeRunWorkshop('attackMul', 1);
    expect(ok).toBe(true);
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(1);
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('upgradeRunWorkshop(attackMul, 1): ネジ不足なら false / Lv 据え置き', () => {
    useStore.setState({ screw: BigNum.fromNumber(9) });
    const ok = useStore.getState().upgradeRunWorkshop('attackMul', 1);
    expect(ok).toBe(false);
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(9))).toBe(true);
  });

  test('upgradeRunWorkshop(attackMul, 5): 5 段階分まとめて消費 + 加算', () => {
    // Lv 0 → 1..5 のコスト合計を計算: 10 + 13 + 17 + 22 + 29 = 91
    const expectedCost = 10 + 13 + 17 + 22 + 29;
    useStore.setState({ screw: BigNum.fromNumber(expectedCost) });
    const ok = useStore.getState().upgradeRunWorkshop('attackMul', 5);
    expect(ok).toBe(true);
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(5);
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('upgradeRunWorkshop(attackMul, "max"): 残高で買える最大 Lv を一括購入', () => {
    // ネジ 60 → Lv 0→1 (10) + 1→2 (13) + 2→3 (17) = 40 まで買えて、残 20、次の 22 は買えない
    // 期待: 3 Lv 購入、コスト 40、残 20
    useStore.setState({ screw: BigNum.fromNumber(60) });
    const ok = useStore.getState().upgradeRunWorkshop('attackMul', 'max');
    expect(ok).toBe(true);
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(3);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(20))).toBe(true);
  });

  test('upgradeRunWorkshop(attackMul, "max"): ネジ 0 で false / Lv 据え置き', () => {
    useStore.setState({ screw: BigNum.ZERO });
    const ok = useStore.getState().upgradeRunWorkshop('attackMul', 'max');
    expect(ok).toBe(false);
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
  });

  test('upgradeRunWorkshop(screwGainMul, 1): base=50 が反映される', () => {
    useStore.setState({ screw: BigNum.fromNumber(50) });
    const ok = useStore.getState().upgradeRunWorkshop('screwGainMul', 1);
    expect(ok).toBe(true);
    expect(useStore.getState().runWorkshopLevels.screwGainMul).toBe(1);
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('resetRunWorkshop: 全 Lv が 0 に戻る', () => {
    useStore.setState({
      runWorkshopLevels: { attackMul: 3, attackSpeedMul: 5, hpMul: 7, screwGainMul: 2 },
    });
    useStore.getState().resetRunWorkshop();
    expect(useStore.getState().runWorkshopLevels).toEqual({
      attackMul: 0,
      attackSpeedMul: 0,
      hpMul: 0,
      screwGainMul: 0,
    });
  });

  test('startRun を呼ぶと RunWorkshop の Lv がリセットされる', () => {
    useStore.setState({
      runWorkshopLevels: { attackMul: 5, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
    });
    useStore.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: 100, gameSpeed: 1 });
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
  });

  test('endRun を呼ぶと RunWorkshop の Lv がリセットされる', () => {
    useStore.setState({
      runWorkshopLevels: { attackMul: 0, attackSpeedMul: 0, hpMul: 4, screwGainMul: 0 },
    });
    useStore.getState().endRun();
    expect(useStore.getState().runWorkshopLevels.hpMul).toBe(0);
  });
});
