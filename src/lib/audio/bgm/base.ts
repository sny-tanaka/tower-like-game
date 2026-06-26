/**
 * BGM: base (拠点画面 — 出撃準備 / マシン強化 / 武器庫 / パッチ庫 / 設定)
 *
 * 構成:
 * - BPM 100, Aマイナー, 8 小節ループ (1小節=2.4秒, 1ループ=19.2秒)
 * - 層1: Bass — sawtooth ベース + ローパスフィルタ、2 拍刻み
 * - 層2: Chord Pad — triangle コード (Am → G → C → Em)
 * - 層3: Rhythmic Arp — square ショートノート上昇アルペジオ
 * - 層4: Kick (軽め) — 1,3 拍
 *
 * スケジューラ: setInterval 100ms 周期、残り2小節で先読み
 */

import { disconnectChainOnEnded, noteHz, scheduleKick, scheduleNote } from './helpers';
import type { BgmTrack } from './types';

const BPM = 100;
const BEAT_SEC = 60 / BPM; // 0.6 sec / beat
const BAR_SEC = BEAT_SEC * 4; // 2.4 sec / bar
const LOOP_BARS = 8; // 8 小節ループ
const LOOP_SEC = BAR_SEC * LOOP_BARS; // 19.2 sec
const LOOKAHEAD_BARS = 2;
const SCHEDULE_INTERVAL_MS = 100;

// Bass line (各小節でルート音)
const BASS_NOTES = [
  noteHz('A2'),
  noteHz('A2'),
  noteHz('G2'),
  noteHz('G2'),
  noteHz('C3'),
  noteHz('C3'),
  noteHz('E2'),
  noteHz('E2'),
];

// Arp パターン (Aマイナースケール 4 音)
const ARP_PATTERN = [
  noteHz('A3'),
  noteHz('C4'),
  noteHz('E4'),
  noteHz('A4'),
  noteHz('G4'),
  noteHz('E4'),
  noteHz('C4'),
  noteHz('A3'),
];

// コード進行 (2小節ごと)
const CHORD_PROG = [
  [noteHz('A3'), noteHz('C4'), noteHz('E4')], // Am
  [noteHz('G3'), noteHz('B3'), noteHz('D4')], // G
  [noteHz('C3'), noteHz('E3'), noteHz('G3')], // C
  [noteHz('E3'), noteHz('G3'), noteHz('B3')], // Em
];

function scheduleLoop(
  ctx: AudioContext,
  dest: AudioNode,
  loopStart: number,
  scheduledNodes: { stop(t: number): void }[]
): void {
  for (let bar = 0; bar < LOOP_BARS; bar++) {
    const barStart = loopStart + bar * BAR_SEC;

    // --- Bass (sawtooth, 2 拍ごとに1音) ---
    const bassFreq = BASS_NOTES[bar];
    scheduleNote(
      ctx,
      dest,
      'sawtooth',
      bassFreq,
      barStart,
      BEAT_SEC * 1.8,
      0.22,
      300,
      scheduledNodes
    );
    scheduleNote(
      ctx,
      dest,
      'sawtooth',
      bassFreq,
      barStart + BEAT_SEC * 2,
      BEAT_SEC * 1.8,
      0.22,
      300,
      scheduledNodes
    );

    // --- Kick (1, 3 拍) ---
    scheduleKick(ctx, dest, barStart, 0.35, scheduledNodes);
    scheduleKick(ctx, dest, barStart + BEAT_SEC * 2, 0.28, scheduledNodes);

    // --- Arp (8分音符, 1小節8音) ---
    for (let i = 0; i < 8; i++) {
      const arpIdx = (bar * 8 + i) % ARP_PATTERN.length;
      const arpStart = barStart + i * BEAT_SEC * 0.5;
      scheduleNote(
        ctx,
        dest,
        'square',
        ARP_PATTERN[arpIdx],
        arpStart,
        BEAT_SEC * 0.4,
        0.07,
        2400,
        scheduledNodes
      );
    }
  }

  // --- Chord Pad (2小節ごとに更新) ---
  for (let ci = 0; ci < CHORD_PROG.length; ci++) {
    const chord = CHORD_PROG[ci];
    const chordStart = loopStart + ci * BAR_SEC * 2;
    const chordDur = BAR_SEC * 2;
    for (const freq of chord) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, chordStart);
      const padVol = 0.08;
      gain.gain.setValueAtTime(0.0001, chordStart);
      gain.gain.linearRampToValueAtTime(padVol, chordStart + 0.15);
      gain.gain.setValueAtTime(padVol, chordStart + chordDur - 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, chordStart + chordDur);
      osc.connect(gain).connect(dest);
      osc.start(chordStart);
      osc.stop(chordStart + chordDur + 0.05);
      // v1.1.4: onended で gain も disconnect。 旧実装は gain が scheduledNodes に
      // push されておらず audio graph に残留 → ループごとに 12 個ずつ蓄積していた。
      disconnectChainOnEnded(osc, gain);
      scheduledNodes.push(osc);
    }
  }
}

export function createBaseBgm(ctx: AudioContext, dest: AudioNode): BgmTrack {
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
