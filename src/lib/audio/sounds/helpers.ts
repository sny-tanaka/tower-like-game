export function createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function envelope(
  gain: GainNode,
  now: number,
  peak: number,
  attackSec: number,
  releaseSec: number
) {
  const g = gain.gain;
  g.setValueAtTime(0.0001, now);
  g.linearRampToValueAtTime(peak, now + attackSec);
  g.exponentialRampToValueAtTime(0.0001, now + attackSec + releaseSec);
}

export function tone(
  ctx: AudioContext,
  dest: AudioNode,
  type: OscillatorType,
  freq: number,
  now: number,
  peak: number,
  attackSec: number,
  releaseSec: number,
  freqEndHz?: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (freqEndHz !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(0.0001, freqEndHz),
      now + attackSec + releaseSec
    );
  }
  envelope(gain, now, peak, attackSec, releaseSec);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + attackSec + releaseSec + 0.02);
}

export function noiseBurst(
  ctx: AudioContext,
  dest: AudioNode,
  durationSec: number,
  now: number,
  peak: number,
  filter?: { type: BiquadFilterType; frequency: number; q?: number }
) {
  const src = ctx.createBufferSource();
  src.buffer = createNoiseBuffer(ctx, durationSec);
  const gain = ctx.createGain();
  envelope(gain, now, peak, 0.002, durationSec);
  if (filter) {
    const f = ctx.createBiquadFilter();
    f.type = filter.type;
    f.frequency.value = filter.frequency;
    if (filter.q !== undefined) f.Q.value = filter.q;
    src.connect(f).connect(gain).connect(dest);
  } else {
    src.connect(gain).connect(dest);
  }
  src.start(now);
}
