import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';
import type { RunWorkshopLevels } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { defaultBattleState } from '@/store/slices/battle';
import { defaultCurrenciesState } from '@/store/slices/currencies';
import type { EquippedPatchEntry } from '@/store/slices/equippedPatches';
import { defaultEquippedPatchesState } from '@/store/slices/equippedPatches';
import { defaultMachineState, type MachineLevels } from '@/store/slices/machine';
import { defaultRunWorkshopState, type RunWorkshopAutoEnabled } from '@/store/slices/runWorkshop';
import { defaultSettingsState } from '@/store/slices/settings';

/**
 * BattleHudTop 等の Organism が `useStore` を直接 subscribe するようになった v1.3.7 Phase 4
 * 以降、 テスト / Storybook で「特定のバトル状態を作って render」 する用途に使うヘルパー。
 *
 * 与えられたフィールドだけを setState で上書きし、 未指定のフィールドは defaultBattleState
 * 相当の値で初期化する。 Tier / Wave 等の周辺ロジックを動かす意図はなく、 純粋に「HUD が読む
 * フィールドを seed する」 ためのもの。
 *
 * Phase 4-B で BattleHudBottom 用フィールド (screw / bolt / runStartBolt / currentWeapon /
 * weaponSwitchCdSec / activeCdSec / isAutoActive / machineLevels) を追加。
 *
 * Phase 4-C で RunWorkshopBottomSheet / BattleMenuOverlay 用フィールド (runWorkshopLevels /
 * runWorkshopAutoEnabled / bgmVolume / seVolume / alloy / runStartAlloy) を追加。
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
  /** ネジ残高 (デフォルト: 0) */
  screw?: BigNum;
  /** 現在のボルト累計 (デフォルト: 0) */
  bolt?: BigNum;
  /** ラン開始時のボルト累計 (デフォルト: 0)。 earnedBolt = bolt - runStartBolt の計算で使う */
  runStartBolt?: BigNum;
  /** 現在のアロイ累計 (デフォルト: 0) */
  alloy?: BigNum;
  /** ラン開始時のアロイ累計 (デフォルト: 0) */
  runStartAlloy?: BigNum;
  /** 現在装備中の武器 (デフォルト: laser) */
  currentWeapon?: WeaponType;
  /** 武器切替 CD 残秒数 (デフォルト: 0)。 0 = 切替直後の CD なし、 3 = 切替直後 */
  weaponSwitchCdSec?: number;
  /** アクティブスキル CD 残秒数 (デフォルト: 0)。 0 = 発動可能、 maxSec = 発動直後 */
  activeCdSec?: number;
  /** アクティブスキル自動モード (デフォルト: false) */
  isAutoActive?: boolean;
  /**
   * マシン強化 Lv (部分指定可)。 未指定キーは defaultMachineState の machineLevels (= 全 0)
   * 相当で埋める。 activeCdReduction だけ上げたいケースで `{ activeCdReduction: 5 }` のように使う。
   */
  machineLevels?: Partial<MachineLevels>;
  /**
   * RunWorkshop 4 項目の現在 Lv (部分指定可)。 未指定キーは defaultRunWorkshopLevels (全 0) で埋める。
   * Phase 4-C で RunWorkshopBottomSheet が内部 selector 化したため追加。
   */
  runWorkshopLevels?: Partial<RunWorkshopLevels>;
  /**
   * RunWorkshop 4 項目の AUTO ON/OFF (部分指定可)。 未指定キーは false で埋める。
   * Phase 4-C で RunWorkshopBottomSheet が内部 selector 化したため追加。
   */
  runWorkshopAutoEnabled?: Partial<RunWorkshopAutoEnabled>;
  /** BGM 音量 (0.0〜1.0、 デフォルト: 0.8)。 Phase 4-C で BattleMenuOverlay が内部 selector 化したため追加 */
  bgmVolume?: number;
  /** SE 音量 (0.0〜1.0、 デフォルト: 0.8)。 Phase 4-C で BattleMenuOverlay が内部 selector 化したため追加 */
  seVolume?: number;
  /**
   * ダメージバリア (damageImmune) 残数 (デフォルト: 0)。
   * v1.5.0 で BattleHudTop がバリア残数を購読するようになったため追加。
   */
  barrierStock?: number;
  /**
   * 装着中パッチ (slotIndex → {name, tier})。 デフォルト: 空 (未装着)。
   * v1.5.0 で BattleHudTop が damageImmune 装着有無を判定するために追加。
   */
  equippedPatches?: Map<number, EquippedPatchEntry>;
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
    screw: seed.screw ?? BigNum.ZERO,
    bolt: seed.bolt ?? BigNum.ZERO,
    runStartBolt: seed.runStartBolt ?? BigNum.ZERO,
    alloy: seed.alloy ?? BigNum.ZERO,
    runStartAlloy: seed.runStartAlloy ?? BigNum.ZERO,
    currentWeapon: seed.currentWeapon ?? 'laser',
    weaponSwitchCdSec: seed.weaponSwitchCdSec ?? 0,
    activeCdSec: seed.activeCdSec ?? 0,
    isAutoActive: seed.isAutoActive ?? false,
    machineLevels: {
      ...defaultMachineState.machineLevels,
      ...(seed.machineLevels ?? {}),
    },
    runWorkshopLevels: {
      ...defaultRunWorkshopState.runWorkshopLevels,
      ...(seed.runWorkshopLevels ?? {}),
    },
    runWorkshopAutoEnabled: {
      ...defaultRunWorkshopState.runWorkshopAutoEnabled,
      ...(seed.runWorkshopAutoEnabled ?? {}),
    },
    bgmVolume: seed.bgmVolume ?? defaultSettingsState.bgmVolume,
    seVolume: seed.seVolume ?? defaultSettingsState.seVolume,
    barrierStock: seed.barrierStock ?? defaultBattleState.barrierStock,
    equippedPatches: seed.equippedPatches ?? defaultEquippedPatchesState.equippedPatches,
  });
}

/**
 * battle slice を defaultBattleState 相当に戻す。 テスト間の state リークを防ぐため、
 * 各テストファイルの `afterEach` で必ず呼ぶ。
 *
 * `defaultBattleState` は battle slice のフィールド (machineHp / currentTier / 等) だけを
 * 含む型なので、 他 slice (machine / weapons / profile / ...) は触らない。 battle slice の
 * フィールドだけが選択的にリセットされる。
 *
 * Phase 4-B: machine slice の machineLevels も BattleHudBottom が購読するため、 ここで
 * defaultMachineState 相当 (全キー Lv 0) に戻す。
 *
 * Phase 4-C: runWorkshop slice / settings slice / currencies slice (alloy) も RunWorkshopBottomSheet /
 * BattleMenuOverlay / Page の派生計算で購読されるようになったため、 ここで defaultXxxState 相当に戻す。
 */
export function resetBattleState(): void {
  useStore.setState({
    ...defaultBattleState,
    machineLevels: defaultMachineState.machineLevels,
    runWorkshopLevels: defaultRunWorkshopState.runWorkshopLevels,
    runWorkshopAutoEnabled: defaultRunWorkshopState.runWorkshopAutoEnabled,
    bgmVolume: defaultSettingsState.bgmVolume,
    seVolume: defaultSettingsState.seVolume,
    alloy: defaultCurrenciesState.alloy,
    equippedPatches: defaultEquippedPatchesState.equippedPatches,
  });
}
