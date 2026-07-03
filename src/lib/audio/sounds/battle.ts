import { envelope, noiseBurst, tone } from './helpers';

import { disconnectChainOnEnded } from '@/lib/audio/graphCleanup';
import type { Sound } from '@/lib/audio/types';

// 雑魚撃破: 短いパフッ
export const enemyKill: Sound = (ctx, dest, now) => {
  noiseBurst(ctx, dest, 0.1, now, 0.25, { type: 'bandpass', frequency: 1500, q: 3 });
  tone(ctx, dest, 'triangle', 500, now, 0.18, 0.003, 0.08, 200);
};

// ボス出現警告: 低音ドローン + 緊張感の上昇
export const bossWarn: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.linearRampToValueAtTime(160, now + 0.8);
  envelope(gain, now, 0.3, 0.1, 0.7);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.85);
  disconnectChainOnEnded(osc, gain);
  tone(ctx, dest, 'square', 320, now + 0.2, 0.15, 0.02, 0.4);
};

// ボス撃破: 派手な爆発 + 高音きらめき
export const bossKill: Sound = (ctx, dest, now) => {
  noiseBurst(ctx, dest, 0.5, now, 0.45, { type: 'lowpass', frequency: 1200 });
  tone(ctx, dest, 'sine', 90, now, 0.5, 0.005, 0.6, 30);
  tone(ctx, dest, 'triangle', 1200, now + 0.1, 0.2, 0.02, 0.4, 2400);
  tone(ctx, dest, 'triangle', 1600, now + 0.2, 0.18, 0.02, 0.3, 3200);
};

// マシン被弾: 鈍い金属音
export const machineHit: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'sine', 180, now, 0.3, 0.005, 0.12, 60);
  noiseBurst(ctx, dest, 0.08, now, 0.18, { type: 'bandpass', frequency: 600, q: 2 });
};

// マシン全滅: 沈むような低音 + ノイズ
export const machineDown: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 1.2);
  envelope(gain, now, 0.45, 0.02, 1.2);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 1.3);
  disconnectChainOnEnded(osc, gain);
  noiseBurst(ctx, dest, 0.8, now, 0.25, { type: 'lowpass', frequency: 800 });
};

// Wave クリア: 上昇 2 音
export const waveClear: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 700, now, 0.22, 0.01, 0.18);
  tone(ctx, dest, 'triangle', 1050, now + 0.12, 0.22, 0.01, 0.22);
};

// Tier クリア: 派手な上昇 3 音 + キラキラ
export const tierClear: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 600, now, 0.25, 0.01, 0.2);
  tone(ctx, dest, 'triangle', 900, now + 0.12, 0.25, 0.01, 0.2);
  tone(ctx, dest, 'triangle', 1350, now + 0.24, 0.3, 0.01, 0.45);
  tone(ctx, dest, 'sine', 2400, now + 0.3, 0.15, 0.02, 0.5);
};
