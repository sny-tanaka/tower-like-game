import { envelope, noiseBurst, tone } from './helpers';

import { disconnectChainOnEnded } from '@/lib/audio/graphCleanup';
import type { Sound } from '@/lib/audio/types';

// Laser: 高周波のこぎり波スイープ、シャープ
export const laserShoot: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const hp = ctx.createBiquadFilter();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(1600, now);
  osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
  hp.type = 'highpass';
  hp.frequency.value = 800;
  envelope(gain, now, 0.22, 0.003, 0.09);
  osc.connect(hp).connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.12);
  // v1.4.7: 戦闘中毎秒最大 20 回発火するため disconnect 漏れが顕著な蓄積になる。
  disconnectChainOnEnded(osc, gain, hp);
};

// Cannon: 低音ブーム + ノイズバースト
export const cannonShoot: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'sine', 130, now, 0.5, 0.01, 0.28, 40);
  noiseBurst(ctx, dest, 0.12, now, 0.35, { type: 'lowpass', frequency: 900 });
};

// Thunder: 短いノイズ + 高周波バンドパスでパチッ
export const thunderShoot: Sound = (ctx, dest, now) => {
  noiseBurst(ctx, dest, 0.18, now, 0.4, { type: 'bandpass', frequency: 3500, q: 4 });
  tone(ctx, dest, 'triangle', 2200, now, 0.15, 0.002, 0.06, 1800);
};

// Cutter: 矩形波の短いシャキッ
export const cutterShoot: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const bp = ctx.createBiquadFilter();
  osc.type = 'square';
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);
  bp.type = 'bandpass';
  bp.frequency.value = 1500;
  bp.Q.value = 3;
  envelope(gain, now, 0.18, 0.002, 0.07);
  osc.connect(bp).connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.1);
  // v1.4.7: 戦闘中毎秒最大 20 回発火するため disconnect 漏れが顕著な蓄積になる。
  disconnectChainOnEnded(osc, gain, bp);
  noiseBurst(ctx, dest, 0.05, now, 0.12, { type: 'highpass', frequency: 4000 });
};

// 武器切替: 短い 2 音のピコッ
export const weaponSwitch: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 700, now, 0.18, 0.005, 0.05);
  tone(ctx, dest, 'triangle', 1050, now + 0.04, 0.18, 0.005, 0.06);
};
