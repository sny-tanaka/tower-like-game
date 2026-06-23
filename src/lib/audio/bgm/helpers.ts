/**
 * BGM 共通ヘルパー
 *
 * - 音名 → 周波数変換 (A4 = 440Hz 基準)
 * - コード/スケール定義
 * - リズム系ユーティリティ
 */

// ---- 音名 → 周波数 ----

/** MIDI ノート番号 → 周波数 (Hz) */
export function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * 音名文字列 → Hz
 * 例: noteHz('A4') => 440, noteHz('C3') => 130.81
 */
export const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
};

export function noteHz(name: string): number {
  const match = name.match(/^([A-G]#?b?)(\d)$/);
  if (!match) throw new Error(`Invalid note: ${name}`);
  const semitone = NOTE_SEMITONES[match[1]];
  if (semitone === undefined) throw new Error(`Invalid note name: ${match[1]}`);
  const octave = parseInt(match[2], 10);
  // MIDI: C0 = 12, so midi = 12 + octave*12 + semitone
  const midi = 12 + octave * 12 + semitone;
  return midiToHz(midi);
}

// ---- スケール定義 ----

/** A マイナー スケール (A2〜A4) */
export const SCALE_A_MINOR = [
  noteHz('A2'),
  noteHz('B2'),
  noteHz('C3'),
  noteHz('D3'),
  noteHz('E3'),
  noteHz('F3'),
  noteHz('G3'),
  noteHz('A3'),
  noteHz('B3'),
  noteHz('C4'),
  noteHz('D4'),
  noteHz('E4'),
  noteHz('F4'),
  noteHz('G4'),
  noteHz('A4'),
];

/** E マイナー スケール (E2〜E4) */
export const SCALE_E_MINOR = [
  noteHz('E2'),
  noteHz('F#2'),
  noteHz('G2'),
  noteHz('A2'),
  noteHz('B2'),
  noteHz('C3'),
  noteHz('D3'),
  noteHz('E3'),
  noteHz('F#3'),
  noteHz('G3'),
  noteHz('A3'),
  noteHz('B3'),
  noteHz('C4'),
  noteHz('D4'),
  noteHz('E4'),
];

// ---- コード (同時発音する音程) ----

/** Am コード */
export const CHORD_AM = [noteHz('A2'), noteHz('C3'), noteHz('E3')];
/** Em コード */
export const CHORD_EM = [noteHz('E2'), noteHz('G2'), noteHz('B2')];
/** Dm コード */
export const CHORD_DM = [noteHz('D3'), noteHz('F3'), noteHz('A3')];
/** G コード */
export const CHORD_G = [noteHz('G2'), noteHz('B2'), noteHz('D3')];
/** C コード */
export const CHORD_C = [noteHz('C3'), noteHz('E3'), noteHz('G3')];
/** Bm5b コード (Bø, ボス用不協和) */
export const CHORD_BM5B = [noteHz('B2'), noteHz('D3'), noteHz('F3')];

// ---- OSC ノード作成ユーティリティ ----

/**
 * オシレーター + ゲインを接続して返す。
 * stop(t) を呼ぶまで継続発音する。
 */
export function createDroneOsc(
  ctx: AudioContext,
  dest: AudioNode,
  type: OscillatorType,
  freq: number,
  gainValue: number,
  startTime: number
): { osc: OscillatorNode; gain: GainNode } {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(gainValue, startTime);
  osc.connect(gain).connect(dest);
  osc.start(startTime);
  return { osc, gain };
}

/**
 * 予約済み音源ノード (track.stop() で一括停止する対象) を表す最小インターフェース。
 * AudioBufferSourceNode / OscillatorNode のいずれも `stop(t)` を持つ。
 */
export interface StoppableNode {
  stop(t: number): void;
}

/**
 * ローパスフィルタを経由した短いゲイン包絡線付きノート。
 * BGM アルペジオなど短尺ノート向け。
 *
 * outNodes を渡すと、 内部で作成した osc を push する。 BGM track の stop()
 * で一括停止するために必須 (push し忘れると stop が効かず BGM が止まらなくなる)。
 */
export function scheduleNote(
  ctx: AudioContext,
  dest: AudioNode,
  type: OscillatorType,
  freq: number,
  startTime: number,
  duration: number,
  peakGain: number,
  filterFreq?: number,
  outNodes?: StoppableNode[]
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  const attack = 0.01;
  const release = Math.min(0.08, duration * 0.4);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
  gain.gain.setValueAtTime(peakGain, startTime + duration - release);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  if (filterFreq !== undefined) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.8;
    osc.connect(filter).connect(gain).connect(dest);
  } else {
    osc.connect(gain).connect(dest);
  }

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
  outNodes?.push(osc);
}

/**
 * 白色ノイズバッファ作成（決定的: 固定シード Lehmer RNG）
 * Math.random() を使わないことでテスト再現性を確保する。
 */
export function createDeterministicNoiseBuffer(
  ctx: AudioContext,
  durationSec: number
): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  // Lehmer RNG (seed = 0x12345)
  let seed = 0x12345;
  for (let i = 0; i < length; i++) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    data[i] = seed / 0x80000000 - 1;
  }
  return buffer;
}

/**
 * キックドラム: サイン波 + ノイズで低音 thump。
 * outNodes に body osc と click noise を両方 push する。
 */
export function scheduleKick(
  ctx: AudioContext,
  dest: AudioNode,
  startTime: number,
  peakGain: number,
  outNodes?: StoppableNode[]
): void {
  // Body: sine が 80Hz → 30Hz にポルタメント
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(80, startTime);
  osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.12);
  gain.gain.setValueAtTime(peakGain, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);
  osc.connect(gain).connect(dest);
  osc.start(startTime);
  osc.stop(startTime + 0.22);
  outNodes?.push(osc);

  // Click: 短いノイズバースト (highpass)
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = createDeterministicNoiseBuffer(ctx, 0.04);
  const noiseGain = ctx.createGain();
  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 400;
  noiseGain.gain.setValueAtTime(peakGain * 0.3, startTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);
  noiseSrc.connect(hpf).connect(noiseGain).connect(dest);
  noiseSrc.start(startTime);
  outNodes?.push(noiseSrc);
}

/**
 * ハイハット: ノイズ + ハイパス
 */
export function scheduleHihat(
  ctx: AudioContext,
  dest: AudioNode,
  startTime: number,
  peakGain: number,
  duration: number,
  outNodes?: StoppableNode[]
): void {
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = createDeterministicNoiseBuffer(ctx, duration + 0.01);
  const gain = ctx.createGain();
  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 6000;
  gain.gain.setValueAtTime(peakGain, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  noiseSrc.connect(hpf).connect(gain).connect(dest);
  noiseSrc.start(startTime);
  outNodes?.push(noiseSrc);
}
