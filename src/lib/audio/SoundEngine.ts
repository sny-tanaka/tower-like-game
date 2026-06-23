import { createBgmTrack } from './bgm';
import type { BgmTrack } from './bgm';
import { soundLibrary } from './sounds';
import type { BgmId, SoundId } from './types';

const MIN_INTERVAL_MS: Partial<Record<SoundId, number>> = {
  laserShoot: 50,
  cutterShoot: 60,
  thunderShoot: 70,
  cannonShoot: 80,
  enemyKill: 40,
  machineHit: 100,
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private seGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private lastPlayAt = new Map<SoundId, number>();
  private seVolume = 0.7;
  private bgmVolume = 0.5;
  private muted = false;
  private currentBgm: { id: BgmId; track: BgmTrack } | null = null;

  init(): void {
    if (this.ctx) return;
    type AudioContextCtor = typeof AudioContext;
    const Ctor: AudioContextCtor | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.masterGain = ctx.createGain();
    this.seGain = ctx.createGain();
    this.bgmGain = ctx.createGain();
    this.seGain.connect(this.masterGain);
    this.bgmGain.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);
    this.masterGain.gain.value = 1.0;
    this.seGain.gain.value = this.seVolume;
    this.bgmGain.gain.value = this.bgmVolume;
  }

  play(id: SoundId): void {
    if (!this.ctx || !this.seGain) return;
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    const nowMs = performance.now();
    const min = MIN_INTERVAL_MS[id];
    if (min !== undefined) {
      const last = this.lastPlayAt.get(id) ?? 0;
      if (nowMs - last < min) return;
      this.lastPlayAt.set(id, nowMs);
    }
    const sound = soundLibrary[id];
    sound(this.ctx, this.seGain, this.ctx.currentTime);
  }

  setSeVolume(v: number): void {
    this.seVolume = clamp01(v);
    if (this.seGain) this.seGain.gain.value = this.seVolume;
  }

  setBgmVolume(v: number): void {
    this.bgmVolume = clamp01(v);
    if (this.bgmGain) this.bgmGain.gain.value = this.bgmVolume;
  }

  getSeVolume(): number {
    return this.seVolume;
  }

  getBgmVolume(): number {
    return this.bgmVolume;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 1.0;
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  playBgm(id: BgmId): void {
    if (!this.ctx || !this.bgmGain) return;
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    // 同じ id なら継続再生
    if (this.currentBgm?.id === id) return;
    // 違う id: 先に古い track を完全停止してから新規開始
    // (currentBgm を null にしてから新規 createBgmTrack することで、
    //  万一 createBgmTrack 内で例外が出ても古い参照が残らない)
    if (this.currentBgm != null) {
      this.currentBgm.track.stop();
      this.currentBgm = null;
    }
    const track = createBgmTrack(id, this.ctx, this.bgmGain);
    track.start();
    this.currentBgm = { id, track };
  }

  stopBgm(): void {
    this.currentBgm?.track.stop();
    this.currentBgm = null;
  }

  getCurrentBgm(): BgmId | null {
    return this.currentBgm?.id ?? null;
  }

  isInitialized(): boolean {
    return this.ctx !== null;
  }

  /** for tests: dispose internal state */
  destroy(): void {
    this.stopBgm();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.masterGain = null;
    this.seGain = null;
    this.bgmGain = null;
    this.muted = false;
    this.lastPlayAt.clear();
  }
}

export const soundEngine = new SoundEngine();
