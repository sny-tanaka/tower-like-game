/**
 * Web Audio ノードの audio graph 離脱 (disconnect) 共通ヘルパー。
 *
 * v1.1.4: BGM 側 (bgm/helpers.ts) に導入。
 * v1.4.7: SE 側 (sounds/*.ts) にも展開するため、共有ヘルパーとして本ファイルに切り出し。
 *
 * Web Audio の重要な落とし穴: OscillatorNode / AudioBufferSourceNode は stop() しても
 * dest に connect されたまま強参照され、 後段の gain / filter ノードと一緒に GC されない。
 * 戦闘中の SE (laserShoot 等) は毎秒最大 20 回発火するため、 disconnect なしだと
 * audio graph にノードが際限なく蓄積し、 iOS 実機ではメモリ枯渇 (jetsam) → 白画面落ちに
 * つながる。
 */

/**
 * 予約済み音源ノード (track.stop() で一括停止する対象) を表す最小インターフェース。
 * AudioBufferSourceNode / OscillatorNode のいずれも `stop(t)` を持つ。
 */
export interface StoppableNode {
  stop(t: number): void;
}

/**
 * 音源ノードの再生終了 (stop or buffer 終端) で、 ぶら下がる全ノードを
 * audio graph から disconnect するヘルパー。
 */
export function disconnectChainOnEnded(
  source: AudioScheduledSourceNode,
  ...extras: { disconnect(): void }[]
): void {
  source.onended = () => {
    try {
      source.disconnect();
    } catch {
      /* already disconnected */
    }
    for (const node of extras) {
      try {
        node.disconnect();
      } catch {
        /* already disconnected */
      }
    }
  };
}
