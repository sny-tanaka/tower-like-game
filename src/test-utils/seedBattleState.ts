import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { defaultBattleState } from '@/store/slices/battle';

/**
 * BattleHudTop 等の Organism が `useStore` を直接 subscribe するようになった v1.3.7 Phase 4
 * 以降、 テスト / Storybook で「特定のバトル状態を作って render」 する用途に使うヘルパー。
 *
 * 与えられたフィールドだけを setState で上書きし、 未指定のフィールドは defaultBattleState
 * 相当の値で初期化する。 Tier / Wave 等の周辺ロジックを動かす意図はなく、 純粋に「HUD が読む
 * フィールドを seed する」 ためのもの。
 */
export interface BattleStateSeed {
  /** マシン現在 HP (デフォルト: 1000) */
  machineHp?: BigNum;
  /** マシン最大 HP (デフォルト: 1000) */
  machineMaxHp?: BigNum;
  /** 現在 Tier (1-12、 デフォルト: 1) */
  currentTier?: number;
  /** 現在 Wave (1-30、 デフォルト: 1) */
  currentWave?: number;
  /** pause フラグ (デフォルト: false) */
  isPaused?: boolean;
}

/**
 * BattleHudTop 系テスト用に store の battle slice を seed する。
 *
 * - 渡されたフィールドだけを setState で上書きする。
 * - `BigNum` を要求するフィールドは数値で受けたい場合 呼び出し側で `BigNum.fromNumber(n)` する。
 *
 * **必ず `afterEach` 等で `resetBattleState()` を呼んで store を defaultBattleState 相当に戻すこと**。
 * テスト間で state が漏れると "前のテストの machineHp が残って次のテストの assertion が通る /
 * 落ちる" 現象が起きる。
 */
export function seedBattleState(seed: BattleStateSeed = {}): void {
  useStore.setState({
    machineHp: seed.machineHp ?? BigNum.fromNumber(1000),
    machineMaxHp: seed.machineMaxHp ?? BigNum.fromNumber(1000),
    currentTier: seed.currentTier ?? 1,
    currentWave: seed.currentWave ?? 1,
    isPaused: seed.isPaused ?? false,
  });
}

/**
 * battle slice を defaultBattleState 相当に戻す。 テスト間の state リークを防ぐため、
 * 各テストファイルの `afterEach` で必ず呼ぶ。
 *
 * `defaultBattleState` は battle slice のフィールド (machineHp / currentTier / 等) だけを
 * 含む型なので、 他 slice (machine / weapons / profile / ...) は触らない。 battle slice の
 * フィールドだけが選択的にリセットされる。
 */
export function resetBattleState(): void {
  useStore.setState(defaultBattleState);
}
