// ---------------------------------------------------------------------------
// ダメージバリア（damageImmune 新方式）
// design-docs/tower-like-game/15-balance-v1.5.0.md §1.2, §4
// ---------------------------------------------------------------------------
//
// 確率無効化を廃止し、 「Wave 開始時にバリア 1×T 枚を展開、 1 枚 = 被弾 1 回を完全無効化、
// Wave クリアで全充填」という確定型の機構に置換した。
//
// 接触ダメージは「フレームごとの継続 DPS」方式のため、 「敵 1 体の 1 回の接触」を
// 1 枚のバリアで無効化するには、 新規接触した敵ごとに 1 回だけ消費し、 その敵が
// 接触し続けている間（無効化中エピソード）は被ダメを 0 にする、 という設計にする。
// ノックバックは通常どおり適用する (無効化はダメージのみ)。

/**
 * バリア残数から 1 枚消費できるかを判定し、 消費後の残数を返す純粋関数。
 *
 * @param stock 現在のバリア残数
 * @returns consumed: 消費できたか / nextStock: 消費後の残数
 */
export function consumeBarrierStock(stock: number): { consumed: boolean; nextStock: number } {
  if (stock <= 0) return { consumed: false, nextStock: stock };
  return { consumed: true, nextStock: stock - 1 };
}

/**
 * Wave 進行 (advanceWave / advanceTier) 時にバリアを全充填する。
 * capacity <= 0 (damageImmune 未装着) なら 0 のまま。
 */
export function refillBarrierStock(capacity: number): number {
  return Math.max(0, capacity);
}

// ---------------------------------------------------------------------------
// 無効化中エピソード集合の管理
// ---------------------------------------------------------------------------
//
// 「新規接触フレーム」でバリアを 1 枚消費し、 その敵 id を無効化中エピソード集合に
// 追加する。 集合に含まれる敵の接触ダメージは以後加算しない。 接触が途切れたら
// (今フレームの接触集合に含まれなくなったら) 集合から除去する。

export interface BarrierEpisodeStepInput {
  /** 今フレームで新規接触した敵 id (前フレームには居なかった敵) */
  newContactIds: readonly string[];
  /** 今フレームの接触集合全体 (継続接触 + 新規接触) */
  currentContactIds: readonly string[];
  /** tick 開始時点のバリア残数 */
  barrierStock: number;
  /** tick 開始時点の無効化中エピソード集合 (mutate しない) */
  immunizedIds: ReadonlySet<string>;
}

export interface BarrierEpisodeStepResult {
  /** 更新後のバリア残数 */
  nextBarrierStock: number;
  /** 更新後の無効化中エピソード集合 (新規 Set) */
  nextImmunizedIds: Set<string>;
}

/**
 * 1 tick 分のバリアエピソード状態を計算する純粋関数。
 * 呼び出し順序:
 *   1. 新規接触した敵ごとに、 バリア残数があれば 1 枚消費して無効化中集合に追加
 *   2. 接触が途切れた敵 (currentContactIds に含まれない) を無効化中集合から除去
 */
export function stepBarrierEpisodes(input: BarrierEpisodeStepInput): BarrierEpisodeStepResult {
  let stock = input.barrierStock;
  const nextImmunized = new Set(input.immunizedIds);

  for (const id of input.newContactIds) {
    const { consumed, nextStock } = consumeBarrierStock(stock);
    stock = nextStock;
    if (consumed) {
      nextImmunized.add(id);
    }
  }

  // 接触が切れた敵をエピソード集合から除去
  const currentSet = new Set(input.currentContactIds);
  for (const id of nextImmunized) {
    if (!currentSet.has(id)) {
      nextImmunized.delete(id);
    }
  }

  return { nextBarrierStock: stock, nextImmunizedIds: nextImmunized };
}
