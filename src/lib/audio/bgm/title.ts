/**
 * BGM: title (タイトル画面)
 *
 * 構成:
 * - BPM 80, Aマイナー, 8 小節ループ (1小節=3秒, 1ループ=24秒)
 * - 層1: Bass Pad — 低音 sine ドローン (Am コード最低音)
 * - 層2: Chord Pad — triangle x3 ゆったりコード (Am → C → G → Em)
 * - 層3: Slow Arp — sawtooth + ローパスフィルタ、ゆっくりアルペジオ上昇
 *
 * スケジューラ: setInterval 100ms 周期で残り2小節以下になったら先読み追加
 */

import {
  CHORD_AM,
  CHORD_C,
  CHORD_EM,
  CHORD_G,
  disconnectChainOnEnded,
  noteHz,
  scheduleNote,
} from './helpers';
import type { BgmTrack } from './types';

const BPM = 80;
const BEAT_SEC = 60 / BPM; // 0.75 sec / beat
const BAR_SEC = BEAT_SEC * 4; // 3.0 sec / bar
const LOOP_BARS = 8; // 8 小節でループ
const LOOP_SEC = BAR_SEC * LOOP_BARS; // 24.0 sec
const LOOKAHEAD_BARS = 2; // 残り2小節で先読み
const SCHEDULE_INTERVAL_MS = 100;

// コード進行 (各2小節)
const CHORD_PROG = [CHORD_AM, CHORD_C, CHORD_G, CHORD_EM];

// アルペジオ音 (Aマイナースケール上の6音)
const ARP_NOTES = [
  noteHz('A3'),
  noteHz('C4'),
  noteHz('E4'),
  noteHz('G4'),
  noteHz('A4'),
  noteHz('E4'),
];

/** 1 ループ分のノードをスケジュール。scheduledNodes に stop 可能なノードを追加 */
function scheduleLoop(
  ctx: AudioContext,
  dest: AudioNode,
  loopStart: number,
  scheduledNodes: { stop(t: number): void }[]
): void {
  // --- Bass Pad (sine, ゆっくり A2) ---
  {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteHz('A2'), loopStart);
    const bassVol = 0.28;
    gain.gain.setValueAtTime(0.0001, loopStart);
    gain.gain.linearRampToValueAtTime(bassVol, loopStart + 0.5);
    gain.gain.setValueAtTime(bassVol, loopStart + LOOP_SEC - 0.5);
    gain.gain.linearRampToValueAtTime(0.0001, loopStart + LOOP_SEC);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 180;
    osc.connect(lpf).connect(gain).connect(dest);
    osc.start(loopStart);
    osc.stop(loopStart + LOOP_SEC + 0.05);
    disconnectChainOnEnded(osc, gain, lpf);
    scheduledNodes.push(osc);
  }

  // --- Chord Pad (triangle x3, コード進行) ---
  for (let ci = 0; ci < CHORD_PROG.length; ci++) {
    const chord = CHORD_PROG[ci];
    const chordStart = loopStart + ci * BAR_SEC * 2;
    const chordDur = BAR_SEC * 2;
    for (const freq of chord) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, chordStart);
      const padVol = 0.1;
      const att = 0.4;
      const rel = 0.6;
      gain.gain.setValueAtTime(0.0001, chordStart);
      gain.gain.linearRampToValueAtTime(padVol, chordStart + att);
      gain.gain.setValueAtTime(padVol, chordStart + chordDur - rel);
      gain.gain.exponentialRampToValueAtTime(0.0001, chordStart + chordDur);
      // Delay (pad リバーブ風)
      const delay = ctx.createDelay(0.5);
      delay.delayTime.value = 0.25;
      const feedGain = ctx.createGain();
      feedGain.gain.value = 0.2;
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.value = 2000;
      osc.connect(gain).connect(dest);
      osc.connect(delay).connect(lpf).connect(feedGain).connect(dest);
      osc.start(chordStart);
      osc.stop(chordStart + chordDur + 0.5);
      // v1.1.4: gain / delay / feedGain / lpf も disconnect (旧実装は全てリーク)
      disconnectChainOnEnded(osc, gain, delay, feedGain, lpf);
      scheduledNodes.push(osc);
    }
  }

  // --- Slow Arp (sawtooth + lowpass) ---
  for (let i = 0; i < ARP_NOTES.length; i++) {
    // 各arp音を 2 beat 間隔でゆっくり配置
    const arpStart = loopStart + i * BEAT_SEC * 2;
    scheduleNote(
      ctx,
      dest,
      'sawtooth',
      ARP_NOTES[i],
      arpStart,
      BEAT_SEC * 1.5,
      0.09,
      1800,
      scheduledNodes
    );
    // 同音を少し後に残響として重ねる
    scheduleNote(
      ctx,
      dest,
      'sine',
      ARP_NOTES[i] * 0.5,
      arpStart + 0.12,
      BEAT_SEC * 1.2,
      0.05,
      600,
      scheduledNodes
    );
  }
}

export function createTitleBgm(ctx: AudioContext, dest: AudioNode): BgmTrack {
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
