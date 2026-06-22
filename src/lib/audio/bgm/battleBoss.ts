/**
 * BGM: battleBoss (バトルボス)
 *
 * 構成:
 * - BPM 100 (ヘビー), Eマイナー, 8 小節ループ (1小節=2.4秒, 1ループ=19.2秒)
 * - 層1: Sub Bass — サイン波ドローン (E1)、圧迫感
 * - 層2: Distorted Bass — sawtooth + ハードクリップ風 (WaveShaper なし代替: 多倍音オシレーター)
 * - 層3: Dissonant Pad — Bm5b + 半音ずれのコード (不協和感)
 * - 層4: Heavy Kick (1,3 拍) + Snare (2,4 拍) + Noise Drone
 * - 層5: Sparse Arp — 暗い下降フレーズ
 *
 * スケジューラ: setInterval 100ms 周期、残り2小節で先読み
 */

import {
  noteHz,
  scheduleKick,
  scheduleNote,
  createDeterministicNoiseBuffer,
  CHORD_BM5B,
} from './helpers';
import type { BgmTrack } from './types';

const BPM = 100;
const BEAT_SEC = 60 / BPM; // 0.6 sec / beat
const BAR_SEC = BEAT_SEC * 4; // 2.4 sec / bar
const LOOP_BARS = 8;
const LOOP_SEC = BAR_SEC * LOOP_BARS; // 19.2 sec
const LOOKAHEAD_BARS = 2;
const SCHEDULE_INTERVAL_MS = 100;

// 下降アルペジオ (暗く)
const ARP_DESCEND = [
  noteHz('E5'),
  noteHz('D5'),
  noteHz('B4'),
  noteHz('G4'),
  noteHz('F#4'),
  noteHz('E4'),
  noteHz('D4'),
  noteHz('B3'),
];

/** 重いスネア: ノイズ + 低音 tone */
function scheduleHeavySnare(
  ctx: AudioContext,
  dest: AudioNode,
  startTime: number,
  peakGain: number
): void {
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = createDeterministicNoiseBuffer(ctx, 0.2);
  const gain = ctx.createGain();
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 900;
  bpf.Q.value = 0.6;
  gain.gain.setValueAtTime(peakGain, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);
  noiseSrc.connect(bpf).connect(gain).connect(dest);
  noiseSrc.start(startTime);
  scheduleNote(ctx, dest, 'sine', 120, startTime, 0.12, peakGain * 0.5, 300);
}

function scheduleLoop(
  ctx: AudioContext,
  dest: AudioNode,
  loopStart: number,
  scheduledNodes: { stop(t: number): void }[]
): void {
  // --- Sub Bass Drone (sine E1, 全ループ) ---
  {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteHz('E1'), loopStart);
    const subVol = 0.35;
    gain.gain.setValueAtTime(0.0001, loopStart);
    gain.gain.linearRampToValueAtTime(subVol, loopStart + 0.3);
    gain.gain.setValueAtTime(subVol, loopStart + LOOP_SEC - 0.3);
    gain.gain.linearRampToValueAtTime(0.0001, loopStart + LOOP_SEC);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 120;
    osc.connect(lpf).connect(gain).connect(dest);
    osc.start(loopStart);
    osc.stop(loopStart + LOOP_SEC + 0.05);
    scheduledNodes.push(osc);
  }

  // --- Distorted Bass (sawtooth E2 + octave above, 四分音符) ---
  for (let bar = 0; bar < LOOP_BARS; bar++) {
    const barStart = loopStart + bar * BAR_SEC;
    for (let b = 0; b < 4; b++) {
      const beatStart = barStart + b * BEAT_SEC;
      scheduleNote(ctx, dest, 'sawtooth', noteHz('E2'), beatStart, BEAT_SEC * 0.9, 0.22, 400);
      // 5度上を重ねる (サイバー金属感)
      scheduleNote(ctx, dest, 'sawtooth', noteHz('B2'), beatStart, BEAT_SEC * 0.8, 0.1, 600);
    }

    // --- Heavy Kick (1, 3 拍) ---
    scheduleKick(ctx, dest, barStart, 0.5);
    scheduleKick(ctx, dest, barStart + BEAT_SEC * 2, 0.45);

    // --- Heavy Snare (2, 4 拍) ---
    scheduleHeavySnare(ctx, dest, barStart + BEAT_SEC, 0.4);
    scheduleHeavySnare(ctx, dest, barStart + BEAT_SEC * 3, 0.38);
  }

  // --- Dissonant Pad (Bm5b + 半音上の C) ---
  const dissonantFreqs = [...CHORD_BM5B, noteHz('C4')]; // 不協和
  for (const freq of dissonantFreqs) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, loopStart);
    const padVol = 0.07;
    gain.gain.setValueAtTime(0.0001, loopStart);
    gain.gain.linearRampToValueAtTime(padVol, loopStart + 0.8);
    gain.gain.setValueAtTime(padVol, loopStart + LOOP_SEC - 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, loopStart + LOOP_SEC);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 900;
    osc.connect(lpf).connect(gain).connect(dest);
    osc.start(loopStart);
    osc.stop(loopStart + LOOP_SEC + 0.05);
    scheduledNodes.push(osc);
  }

  // --- Sparse Descend Arp (2 拍ごとに 1 音、暗い下降) ---
  for (let i = 0; i < ARP_DESCEND.length; i++) {
    const arpStart = loopStart + i * BEAT_SEC * 2;
    scheduleNote(ctx, dest, 'sawtooth', ARP_DESCEND[i], arpStart, BEAT_SEC * 1.6, 0.08, 2000);
  }

  // --- Noise Rumble (全ループ、低域 drone noise) ---
  {
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = createDeterministicNoiseBuffer(ctx, LOOP_SEC + 0.1);
    const gain = ctx.createGain();
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 200;
    gain.gain.setValueAtTime(0.04, loopStart);
    noiseSrc.connect(lpf).connect(gain).connect(dest);
    noiseSrc.start(loopStart);
    scheduledNodes.push(noiseSrc as unknown as { stop(t: number): void });
  }
}

export function createBattleBossBgm(ctx: AudioContext, dest: AudioNode): BgmTrack {
  let scheduledUpTo = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  const scheduledNodes: { stop(t: number): void }[] = [];

  function scheduleAhead(): void {
    const now = ctx.currentTime;
    const threshold = now + LOOKAHEAD_BARS * BAR_SEC;
    while (scheduledUpTo < threshold) {
      scheduleLoop(ctx, dest, scheduledUpTo, scheduledNodes);
      scheduledUpTo += LOOP_SEC;
    }
  }

  return {
    start(): void {
      const now = ctx.currentTime;
      scheduledUpTo = now;
      scheduleAhead();
      intervalId = setInterval(() => {
        scheduleAhead();
      }, SCHEDULE_INTERVAL_MS);
    },

    stop(): void {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      const stopAt = ctx.currentTime + 0.05;
      for (const node of scheduledNodes) {
        try {
          node.stop(stopAt);
        } catch (_) {
          /* already stopped */
        }
      }
      scheduledNodes.length = 0;
    },
  };
}
