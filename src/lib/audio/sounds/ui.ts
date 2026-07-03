import { envelope, tone } from './helpers';

import { disconnectChainOnEnded } from '@/lib/audio/graphCleanup';
import type { Sound } from '@/lib/audio/types';

// 汎用ボタンタップ: 短いピッ
export const tap: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 1000, now, 0.18, 0.003, 0.05);
};

// 強化購入成功: 軽快な上昇 2 音
export const purchaseOk: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 880, now, 0.2, 0.005, 0.08);
  tone(ctx, dest, 'triangle', 1320, now + 0.06, 0.2, 0.005, 0.12);
};

// 拒否音: 下がる 2 音
export const reject: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'square', 260, now, 0.18, 0.005, 0.07);
  tone(ctx, dest, 'square', 200, now + 0.06, 0.18, 0.005, 0.1);
};

// タブ切替: ささやかな高音
export const tabSwitch: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'triangle', 1400, now, 0.12, 0.003, 0.04);
};

// ダイアログ開: 上昇スイープ
export const dialogOpen: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(1000, now + 0.12);
  envelope(gain, now, 0.18, 0.01, 0.12);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.15);
  disconnectChainOnEnded(osc, gain);
};

// ダイアログ閉: 下降スイープ
export const dialogClose: Sound = (ctx, dest, now) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
  envelope(gain, now, 0.16, 0.005, 0.1);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.13);
  disconnectChainOnEnded(osc, gain);
};

// 出撃ボタン: 重めの開幕音
export const launch: Sound = (ctx, dest, now) => {
  tone(ctx, dest, 'sawtooth', 200, now, 0.3, 0.01, 0.35, 80);
  tone(ctx, dest, 'triangle', 600, now + 0.05, 0.22, 0.01, 0.3, 1200);
  tone(ctx, dest, 'triangle', 1200, now + 0.15, 0.2, 0.01, 0.4, 2000);
};
