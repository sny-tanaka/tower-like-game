/**
 * BGM トラックのインターフェース
 * start() でスケジューラ起動、stop() で全ノード停止 + スケジューラ停止
 */
export interface BgmTrack {
  /** 再生開始（スケジューラ起動） */
  start(): void;
  /** 停止（全ノード stop + スケジューラ停止） */
  stop(): void;
}
