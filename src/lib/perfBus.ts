// ---------------------------------------------------------------------------
// perfBus — dev サーバ専用の計測シングルトン
// ---------------------------------------------------------------------------
//
// useBattleLoop の tick callback が markTickStart / markTickEnd / setProjectileCount を呼び、
// PerfOverlay が 1 秒ごとに drainTickStats() で平均/最大を取り出して dev サーバに送信する。
//
// すべての関数は `import.meta.env.DEV` ガード付き。 production ビルドでは Vite が
// `import.meta.env.DEV` を `false` に置換するため、 関数本体は tree-shake で消える。
// 完全に消えなくても、 markTickStart/End は冒頭の早期 return だけが残るので hot path
// (useBattleLoop の tick) のオーバーヘッドは無視できる。
//
// なぜシングルトン?
//   useBattleLoop (ゲームループ) と PerfOverlay (表示) は React 階層上で離れており、
//   props で計測値を流すと「props を流すために再 render」 のコストが乗ってしまう。
//   側道 (module-level シングルトン) でやり取りすれば、 useBattleLoop の hot path には
//   関数呼び出ししか入らず、 PerfOverlay の表示更新は別の rAF で完結する。
// ---------------------------------------------------------------------------

/**
 * 直近 drainTickStats() 以降に積まれた tick (= 1 フレームのゲームロジック処理) の統計。
 * `markTickStart` / `markTickEnd` で 1 区間ぶん積まれる。
 */
interface TickAccum {
  /** tick 区間数 (= 集計期間中の実描画フレーム数。 skipped frame は含まれない) */
  count: number;
  /** 全区間の合計セルフタイム (ms) */
  totalMs: number;
  /** 区間中の最大セルフタイム (ms) */
  maxMs: number;
}

let ticks: TickAccum = { count: 0, totalMs: 0, maxMs: 0 };
let currentTickStartMs: number | null = null;
let lastProjectileCount = 0;

/**
 * useBattleLoop の tick 冒頭 (shouldDrawFrame を通過した後) で呼ぶ。 production では no-op。
 *
 * 既に markTickStart 中なら (= markTickEnd が呼ばれなかった異常状態) 上書きする。
 * 直前の区間は失われるが、 計測の整合性を優先する (= 異常区間を平均に混ぜない)。
 */
export function markTickStart(): void {
  if (!import.meta.env.DEV) return;
  currentTickStartMs = performance.now();
}

/**
 * useBattleLoop の tick 末尾 (rAF 再予約の直前) で呼ぶ。 production では no-op。
 *
 * markTickStart が呼ばれていない場合は黙って無視 (= フレームスキップ直前の return)。
 */
export function markTickEnd(): void {
  if (!import.meta.env.DEV) return;
  if (currentTickStartMs == null) return;
  const dur = performance.now() - currentTickStartMs;
  currentTickStartMs = null;
  ticks.count += 1;
  ticks.totalMs += dur;
  if (dur > ticks.maxMs) ticks.maxMs = dur;
}

/**
 * tick 内で projectile 数を 1 度だけ書き込む (PerfOverlay が読み取る最後の値)。
 *
 * 1 フレームで複数回呼んでも最後の値だけが使われる (= 最終時点の projectile 数)。
 */
export function setProjectileCount(n: number): void {
  if (!import.meta.env.DEV) return;
  lastProjectileCount = n;
}

/**
 * PerfOverlay が 1 秒ごとに呼ぶ。 直前の集計値を返し、 内部 accumulator をリセットする。
 *
 * count=0 (= この期間に tick が走らなかった) のときは avgMs/maxMs ともに 0 を返す。
 */
export function drainTickStats(): { avgMs: number; maxMs: number; count: number } {
  if (ticks.count === 0) {
    return { avgMs: 0, maxMs: 0, count: 0 };
  }
  const out = {
    avgMs: ticks.totalMs / ticks.count,
    maxMs: ticks.maxMs,
    count: ticks.count,
  };
  ticks = { count: 0, totalMs: 0, maxMs: 0 };
  return out;
}

/** 最新の projectile 数 (PerfOverlay 表示用)。 リセットせず読むだけ。 */
export function getProjectileCount(): number {
  return lastProjectileCount;
}

/**
 * テスト用に全 state を初期化する。 production には影響なし (export はしているが
 * useBattleLoop / PerfOverlay からは呼ばれない)。
 */
export function _resetPerfBusForTest(): void {
  ticks = { count: 0, totalMs: 0, maxMs: 0 };
  currentTickStartMs = null;
  lastProjectileCount = 0;
}
