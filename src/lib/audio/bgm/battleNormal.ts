/**
 * BGM: battleNormal (バトル通常)
 *
 * 構成:
 * - BPM 120, Eマイナー, 8 小節ループ (1小節=2.0秒, 1ループ=16.0秒)
 * - 層1: Drive Bass — sawtooth + ローパスフィルタ (四分音符刻み)
 * - 層2: Aggressive Arp — sawtooth 16分音符、シアン感の高音
 * - 層3: Kick + Snare — 4つ打ちキック + 2,4拍スネア
 * - 層4: HiHat — 8分音符ハイハット
 *
 * スケジューラ: setInterval 100ms 周期、残り2小節で先読み
 */

import {
  noteHz,
  scheduleKick,
  scheduleHihat,
  scheduleNote,
  createDeterministicNoiseBuffer,
} from './helpers';
import type { BgmTrack } from './types';

const BPM = 120;
const BEAT_SEC = 60 / BPM; // 0.5 sec / beat
const BAR_SEC = BEAT_SEC * 4; // 2.0 sec / bar
const LOOP_BARS = 8;
const LOOP_SEC = BAR_SEC * LOOP_BARS; // 16.0 sec
const LOOKAHEAD_BARS = 2;
const SCHEDULE_INTERVAL_MS = 100;

// Bass line (各小節 Em スケール)
const BASS_NOTES = [
  noteHz('E2'),
  noteHz('E2'),
  noteHz('D2'),
  noteHz('D2'),
  noteHz('E2'),
  noteHz('E2'),
  noteHz('B1'),
  noteHz('B1'),
];

// Arp パターン (E マイナースケール 16音)
const ARP_PATTERN = [
  noteHz('E4'),
  noteHz('G4'),
  noteHz('B4'),
  noteHz('D5'),
  noteHz('E5'),
  noteHz('D5'),
  noteHz('B4'),
  noteHz('G4'),
  noteHz('E4'),
  noteHz('F#4'),
  noteHz('G4'),
  noteHz('A4'),
  noteHz('B4'),
  noteHz('A4'),
  noteHz('G4'),
  noteHz('F#4'),
];

/** スネア: ノイズ + bandpass */
function scheduleSnare(
  ctx: AudioContext,
  dest: AudioNode,
  startTime: number,
  peakGain: number,
  outNodes: { stop(t: number): void }[]
): void {
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = createDeterministicNoiseBuffer(ctx, 0.15);
  const gain = ctx.createGain();
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 1800;
  bpf.Q.value = 0.8;
  gain.gain.setValueAtTime(peakGain, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.13);
  noiseSrc.connect(bpf).connect(gain).connect(dest);
  noiseSrc.start(startTime);
  outNodes.push(noiseSrc);
  // tone body
  scheduleNote(ctx, dest, 'triangle', 200, startTime, 0.08, peakGain * 0.4, undefined, outNodes);
}

function scheduleLoop(
  ctx: AudioContext,
  dest: AudioNode,
  loopStart: number,
  scheduledNodes: { stop(t: number): void }[]
): void {
  for (let bar = 0; bar < LOOP_BARS; bar++) {
    const barStart = loopStart + bar * BAR_SEC;
    const bassFreq = BASS_NOTES[bar];

    // --- Drive Bass (四分音符刻み) ---
    for (let b = 0; b < 4; b++) {
      scheduleNote(
        ctx,
        dest,
        'sawtooth',
        bassFreq,
        barStart + b * BEAT_SEC,
        BEAT_SEC * 0.85,
        0.26,
        280,
        scheduledNodes
      );
    }

    // --- Kick (四つ打ち: 1,2,3,4 拍) ---
    for (let b = 0; b < 4; b++) {
      scheduleKick(ctx, dest, barStart + b * BEAT_SEC, 0.42, scheduledNodes);
    }

    // --- Snare (2, 4 拍) ---
    scheduleSnare(ctx, dest, barStart + BEAT_SEC, 0.3, scheduledNodes);
    scheduleSnare(ctx, dest, barStart + BEAT_SEC * 3, 0.3, scheduledNodes);

    // --- HiHat (8分音符) ---
    for (let i = 0; i < 8; i++) {
      scheduleHihat(ctx, dest, barStart + i * BEAT_SEC * 0.5, 0.12, 0.08, scheduledNodes);
    }

    // --- Aggressive Arp (16分音符) ---
    for (let i = 0; i < 16; i++) {
      const arpIdx = (bar * 16 + i) % ARP_PATTERN.length;
      const arpStart = barStart + i * BEAT_SEC * 0.25;
      scheduleNote(
        ctx,
        dest,
        'sawtooth',
        ARP_PATTERN[arpIdx],
        arpStart,
        BEAT_SEC * 0.22,
        0.06,
        3200,
        scheduledNodes
      );
    }
  }

  // --- Pad chord (全ループ通じて薄く) ---
  const padChordFreqs = [noteHz('E3'), noteHz('G3'), noteHz('B3')];
  for (const freq of padChordFreqs) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, loopStart);
    gain.gain.setValueAtTime(0.0001, loopStart);
    gain.gain.linearRampToValueAtTime(0.06, loopStart + 0.2);
    gain.gain.setValueAtTime(0.06, loopStart + LOOP_SEC - 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, loopStart + LOOP_SEC);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 1200;
    osc.connect(lpf).connect(gain).connect(dest);
    osc.start(loopStart);
    osc.stop(loopStart + LOOP_SEC + 0.05);
    scheduledNodes.push(osc);
  }
}

export function createBattleNormalBgm(ctx: AudioContext, dest: AudioNode): BgmTrack {
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
