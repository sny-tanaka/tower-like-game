import { beforeEach, describe, expect, test } from 'vitest';

import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// テスト前: 毎テスト store を初期状態に戻す
// v1.4.4: AUTO 状態はセッション跨ぎ永続化のため endRun ではリセットされない。
// テスト間のリークを防ぐため、 明示的に AUTO と isAutoActive を false に戻す。
// ---------------------------------------------------------------------------

beforeEach(() => {
  useStore.getState().endRun(); // battle slice + RunWorkshop Lv が defaults に戻る
  useStore.setState({
    isAutoActive: false,
    runWorkshopAutoEnabled: {
      attackMul: false,
      attackSpeedMul: false,
      hpMul: false,
      screwGainMul: false,
    },
  });
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
    useStore
      .getState()
      .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
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

// ---------------------------------------------------------------------------
// AUTO 自動強化機能
// ---------------------------------------------------------------------------

describe('RunWorkshop AUTO', () => {
  test('初期 state は全 AUTO OFF', () => {
    expect(useStore.getState().runWorkshopAutoEnabled).toEqual({
      attackMul: false,
      attackSpeedMul: false,
      hpMul: false,
      screwGainMul: false,
    });
  });

  test('setRunWorkshopAuto(key, true) で該当 key のみ ON になる', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    expect(useStore.getState().runWorkshopAutoEnabled).toEqual({
      attackMul: true,
      attackSpeedMul: false,
      hpMul: false,
      screwGainMul: false,
    });
  });

  test('setRunWorkshopAuto(key, false) で OFF に戻せる', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('attackMul', false);
    expect(useStore.getState().runWorkshopAutoEnabled.attackMul).toBe(false);
  });

  test('processRunWorkshopAuto: AUTO 全 OFF なら何もしない', () => {
    useStore.setState({ screw: BigNum.fromNumber(1000) });
    useStore.getState().processRunWorkshopAuto();
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(1000))).toBe(true);
  });

  test('processRunWorkshopAuto: 攻撃 AUTO ON & ネジ十分なら attackMul が買えるだけ上がる', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    // attackMul Lv 0→1=10, 1→2=13, 2→3=17 (合計 40), 残 20 では次の 22 が買えない
    useStore.setState({ screw: BigNum.fromNumber(60) });
    useStore.getState().processRunWorkshopAuto();
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(3);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(20))).toBe(true);
  });

  test('processRunWorkshopAuto: 優先順位順 (攻撃 > 速度 > HP > ネジ) で消費される', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('attackSpeedMul', true);
    // attackMul Lv 0→1=10 のみ買えるネジ 10 を与える
    useStore.setState({ screw: BigNum.fromNumber(10) });
    useStore.getState().processRunWorkshopAuto();
    // 攻撃が優先消費 → 攻撃のみ +1、 速度は据え置き
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(1);
    expect(useStore.getState().runWorkshopLevels.attackSpeedMul).toBe(0);
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('processRunWorkshopAuto: 攻撃と速度 AUTO ON、 ネジ十分なら両方買えるだけ上がる', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('attackSpeedMul', true);
    // attackMul Lv 0→3 (40 消費) → 残 20 では次が買えない (22)
    // attackSpeedMul Lv 0→1 (10 消費) → 残 10 では次が買えない (13)
    useStore.setState({ screw: BigNum.fromNumber(60) });
    useStore.getState().processRunWorkshopAuto();
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(3);
    expect(useStore.getState().runWorkshopLevels.attackSpeedMul).toBe(1);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(10))).toBe(true);
  });

  test('processRunWorkshopAuto: 上位がネジ不足でも下位の AUTO ON 項目があれば残ネジで購入する (フォールスルー)', () => {
    // 攻撃 AUTO ON: 1 段 cost=10 → ネジ 5 では買えない
    // 速度 AUTO ON: 1 段 cost=10 → ネジ 5 では買えない
    // HP AUTO ON: 1 段 cost=10 → ネジ 5 では買えない
    // → 何も買わない
    // 別ケース: 攻撃 AUTO ON & 速度 AUTO ON、 攻撃が買えないが速度は買える状況を作る。
    //   攻撃 Lv を事前に上げてコストを跳ね上げる: Lv 50 で cost = ceil(10 * 1.3^50) ≈ 4.97e6
    //   速度 Lv 0 で cost = 10、 ネジ 10 を与えると攻撃は買えず速度のみ買える。
    useStore.setState({
      runWorkshopLevels: { attackMul: 50, attackSpeedMul: 0, hpMul: 0, screwGainMul: 0 },
      screw: BigNum.fromNumber(10),
    });
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('attackSpeedMul', true);
    useStore.getState().processRunWorkshopAuto();
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(50); // 据え置き
    expect(useStore.getState().runWorkshopLevels.attackSpeedMul).toBe(1); // 上がる
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('processRunWorkshopAuto: 全項目ネジ不足なら何も買わずネジは保持される', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('attackSpeedMul', true);
    useStore.setState({ screw: BigNum.fromNumber(9) }); // 最安 attackMul Lv 0→1=10 にも届かない
    useStore.getState().processRunWorkshopAuto();
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
    expect(useStore.getState().runWorkshopLevels.attackSpeedMul).toBe(0);
    expect(useStore.getState().screw.eq(BigNum.fromNumber(9))).toBe(true);
  });

  test('addScrew がトリガーになって AUTO が発火する', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    // addScrew(10) で attackMul Lv 0→1 が即時自動購入される (ネジは 0 に)
    useStore.getState().addScrew(BigNum.fromNumber(10));
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(1);
    expect(useStore.getState().screw.isZero()).toBe(true);
  });

  test('addScrew で AUTO が ON なら優先順位順に消費される', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('hpMul', true);
    // addScrew(10): 攻撃が優先で買われる、 HP は据え置き
    useStore.getState().addScrew(BigNum.fromNumber(10));
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(1);
    expect(useStore.getState().runWorkshopLevels.hpMul).toBe(0);
  });

  test('resetRunWorkshop: v1.4.4 で AUTO 状態は保持される (Lv のみリセット)', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('hpMul', true);
    useStore.setState({
      runWorkshopLevels: { attackMul: 5, attackSpeedMul: 0, hpMul: 3, screwGainMul: 0 },
    });
    useStore.getState().resetRunWorkshop();
    // Lv はリセット
    expect(useStore.getState().runWorkshopLevels).toEqual({
      attackMul: 0,
      attackSpeedMul: 0,
      hpMul: 0,
      screwGainMul: 0,
    });
    // AUTO は保持 (v1.4.4 でセッション跨ぎ永続化に変更)
    expect(useStore.getState().runWorkshopAutoEnabled).toEqual({
      attackMul: true,
      attackSpeedMul: false,
      hpMul: true,
      screwGainMul: false,
    });
  });

  test('startRun: v1.4.4 で AUTO 状態は保持される (Lv のみリセット)', () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('screwGainMul', true);
    useStore
      .getState()
      .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    expect(useStore.getState().runWorkshopAutoEnabled.attackMul).toBe(true);
    expect(useStore.getState().runWorkshopAutoEnabled.screwGainMul).toBe(true);
    expect(useStore.getState().runWorkshopAutoEnabled.hpMul).toBe(false);
    // Lv はリセット
    expect(useStore.getState().runWorkshopLevels.attackMul).toBe(0);
  });

  test('endRun: v1.4.4 で AUTO 状態は保持される (Lv のみリセット)', () => {
    useStore.getState().setRunWorkshopAuto('hpMul', true);
    useStore.setState({
      runWorkshopLevels: { attackMul: 0, attackSpeedMul: 0, hpMul: 4, screwGainMul: 0 },
    });
    useStore.getState().endRun();
    expect(useStore.getState().runWorkshopAutoEnabled.hpMul).toBe(true);
    expect(useStore.getState().runWorkshopLevels.hpMul).toBe(0);
  });

  test('hpMul AUTO ON: 自動強化でも machineMaxHp が再計算される (recalc 発火)', () => {
    useStore
      .getState()
      .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    const beforeMax = useStore.getState().machineMaxHp;
    useStore.getState().setRunWorkshopAuto('hpMul', true);
    // hpMul Lv 0→1=10 のみ買うネジ
    useStore.getState().addScrew(BigNum.fromNumber(10));
    expect(useStore.getState().runWorkshopLevels.hpMul).toBe(1);
    // multiplier 1.0 → 1.1 で machineMaxHp が増える
    expect(useStore.getState().machineMaxHp.gt(beforeMax)).toBe(true);
  });
});
