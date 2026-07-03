import { envelope, noiseBurst, tone } from './helpers';

import { disconnectChainOnEnded } from '@/lib/audio/graphCleanup';
import type { Sound } from '@/lib/audio/types';

// Active Laser: 連続ビーム + 高音スイープ
export const activeLaser: Sound = (ctx, dest, now) => {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';
  osc1.frequency.setValueAtTime(900, now);
  osc1.frequency.exponentialRampToValueAtTime(1500, now + 0.5);
  osc2.frequency.setValueAtTime(905, now);
  osc2.frequency.exponentialRampToValueAtTime(1510, now + 0.5);
  envelope(gain, now, 0.28, 0.02, 0.5);
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(dest);
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.55);
  osc2.stop(now + 0.55);
  // v1.4.7: source が 2 本あるため、それぞれの onended で共有 gain を disconnect する。
  // disconnect は try/catch で二重呼び出し安全なので、両方から呼んでよい。
  disconnectChainOnEnded(osc1, gain);
  disconnectChainOnEnded(osc2, gain);
};

// Active Cannon (Volley): 連続ブームを 4 発
export const activeCannon: Sound = (ctx, dest, now) => {
  for (let i = 0; i < 4; i++) {
    const t = now + i * 0.12;
    tone(ctx, dest, 'sine', 110, t, 0.4, 0.005, 0.18, 35);
    noiseBurst(ctx, dest, 0.08, t, 0.25, { type: 'lowpass', frequency: 700 });
  }
};

// Active Thunder: 大きめの稲妻一閃
export const activeThunder: Sound = (ctx, dest, now) => {
  noiseBurst(ctx, dest, 0.4, now, 0.45, { type: 'bandpass', frequency: 2500, q: 2 });
  tone(ctx, dest, 'triangle', 3000, now, 0.25, 0.005, 0.15, 1500);
  tone(ctx, dest, 'sawtooth', 200, now + 0.05, 0.18, 0.005, 0.3, 80);
};

// Active Cutter: 高速連斬
export const activeCutter: Sound = (ctx, dest, now) => {
  for (let i = 0; i < 5; i++) {
    const t = now + i * 0.07;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const bp = ctx.createBiquadFilter();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1100 + i * 60, t);
    osc.frequency.exponentialRampToValueAtTime(1700 + i * 60, t + 0.04);
    bp.type = 'bandpass';
    bp.frequency.value = 1600;
    bp.Q.value = 4;
    envelope(gain, t, 0.2, 0.002, 0.06);
    osc.connect(bp).connect(gain).connect(dest);
    osc.start(t);
    osc.stop(t + 0.08);
    disconnectChainOnEnded(osc, gain, bp);
  }
};
