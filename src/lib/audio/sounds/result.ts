import type { Sound } from 'src/lib/audio/types';

import { envelope, noiseBurst, tone } from './helpers';

// クリア: 大きく派手なファンファーレ風
export const resultClear: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 600, now, 0.28, 0.01, 0.18);
  tone(ctx, dest, 'triangle', 750, now + 0.12, 0.28, 0.01, 0.18);
  tone(ctx, dest, 'triangle', 900, now + 0.24, 0.28, 0.01, 0.22);
  tone(ctx, dest, 'triangle', 1200, now + 0.36, 0.32, 0.01, 0.5);
  tone(ctx, dest, 'sine', 2400, now + 0.42, 0.18, 0.02, 0.6);
};

// 全滅: 沈むメロディ
export const resultGameOver: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'sawtooth', 300, now, 0.3, 0.02, 0.4, 220);
  tone(ctx, dest, 'sawtooth', 220, now + 0.35, 0.3, 0.02, 0.5, 160);
  tone(ctx, dest, 'sawtooth', 160, now + 0.8, 0.3, 0.02, 0.7, 80);
  noiseBurst(ctx, dest, 1.0, now, 0.15, { type: 'lowpass', frequency: 600 });
};

// 撤退: 控えめな下降 2 音 + 風音
export const resultRetreat: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(700, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);
  envelope(gain, now, 0.22, 0.02, 0.4);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.45);
  noiseBurst(ctx, dest, 0.5, now, 0.1, { type: 'highpass', frequency: 2000 });
};
