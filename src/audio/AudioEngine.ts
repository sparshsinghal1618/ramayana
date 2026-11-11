export type Ambience =
  | 'music'
  | 'forest'
  | 'river'
  | 'ocean'
  | 'wind'
  | 'temple'
  | 'ceremony'
  | 'battle';

export const ambienceLabels: Record<Ambience, { label: string; description: string }> = {
  music: { label: 'Tanpura drone', description: 'A slow, plucked drone in a devotional mode.' },
  forest: { label: 'Forest', description: 'Leaf-litter wind and distant birds.' },
  river: { label: 'River', description: 'Water moving over stone.' },
  ocean: { label: 'Ocean', description: 'Long waves and a wide horizon.' },
  wind: { label: 'High wind', description: 'Air moving across ridge lines.' },
  temple: { label: 'Temple bells', description: 'A quiet bell in a stone courtyard.' },
  ceremony: { label: 'Ceremony', description: 'Conch, drone and distant celebration.' },
  battle: { label: 'Battlefield', description: 'Low drums, dust and distant movement.' },
};

interface ActiveAmbience {
  stop: () => void;
}

/**
 * All ambience is synthesised in the browser with the Web Audio API.
 * No recordings are used, so there are no audio asset requests to fail.
 */
export class AudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private active: ActiveAmbience | null = null;
  private current: Ambience = 'music';
  private volume = 0.55;
  private enabled = false;
  private suspendTimer: ReturnType<typeof setTimeout> | null = null;

  get isEnabled() {
    return this.enabled;
  }

  get currentAmbience() {
    return this.current;
  }

  get currentVolume() {
    return this.volume;
  }

  private ensure() {
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
    }
    return this.context;
  }

  private getMaster() {
    this.ensure();
    return this.master!;
  }

  private getNoise(ctx: AudioContext) {
    if (!this.noiseBuffer) {
      const length = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  private fade(gain: GainNode, value: number, seconds = 0.8) {
    const ctx = this.ensure();
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, value), now + seconds);
  }

  async enable(ambience?: Ambience) {
    if (ambience) this.current = ambience;
    const ctx = this.ensure();
    if (this.suspendTimer) {
      clearTimeout(this.suspendTimer);
      this.suspendTimer = null;
    }
    if (ctx.state === 'suspended') await ctx.resume();
    this.enabled = true;
    this.start();
    this.fade(this.getMaster(), this.volume * 0.5, 1.2);
  }

  disable() {
    this.enabled = false;
    if (this.master && this.context) {
      this.fade(this.master, 0, 0.4);
    }
    this.suspendTimer = setTimeout(() => {
      this.stopActive();
      if (this.context?.state === 'running') {
        void this.context.suspend();
      }
    }, 500);
  }

  async setEnabled(value: boolean) {
    if (value) await this.enable();
    else this.disable();
  }

  setVolume(value: number) {
    this.volume = Math.min(1, Math.max(0, value));
    if (this.enabled && this.master) {
      this.fade(this.master, this.volume * 0.5, 0.25);
    }
  }

  async setAmbience(ambience: Ambience) {
    this.current = ambience;
    if (!this.enabled) return;
    this.stopActive();
    this.start();
  }

  private start() {
    const ctx = this.ensure();
    this.stopActive();
    switch (this.current) {
      case 'music':
        this.active = this.drone(ctx, 'music');
        break;
      case 'forest':
        this.active = this.forest(ctx);
        break;
      case 'river':
        this.active = this.river(ctx);
        break;
      case 'ocean':
        this.active = this.ocean(ctx);
        break;
      case 'wind':
        this.active = this.wind(ctx);
        break;
      case 'temple':
        this.active = this.temple(ctx);
        break;
      case 'ceremony':
        this.active = this.ceremony(ctx);
        break;
      case 'battle':
        this.active = this.battle(ctx);
        break;
    }
  }

  private stopActive() {
    this.active?.stop();
    this.active = null;
  }

  private noise(ctx: AudioContext, type: BiquadFilterType, frequency: number, q: number, level: number) {
    const source = ctx.createBufferSource();
    source.buffer = this.getNoise(ctx);
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.value = level;
    source.connect(filter).connect(gain).connect(this.getMaster());
    source.start();
    return { source, filter, gain };
  }

  private drone(ctx: AudioContext, character: 'music' | 'temple' | 'ceremony'): ActiveAmbience {
    const group = ctx.createGain();
    group.gain.value = character === 'music' ? 0.16 : 0.1;
    group.connect(this.getMaster());
    const frequencies = character === 'music' ? [110, 164.81, 220, 329.63] : [82.41, 123.47, 164.81];
    const oscillators = frequencies.map((frequency, index) => {
      const osc = ctx.createOscillator();
      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = frequency;
      osc.detune.value = index % 2 === 0 ? -4 : 4;
      const gain = ctx.createGain();
      gain.gain.value = index === 0 ? 0.3 : 0.09;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.04 + index * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain).connect(gain.gain);
      lfo.start();
      osc.connect(gain).connect(group);
      osc.start();
      return { osc, lfo };
    });

    let pluckTimer: ReturnType<typeof setInterval> | null = null;
    if (character === 'music') {
      const scale = [329.63, 369.99, 440, 493.88, 554.37, 659.25];
      pluckTimer = setInterval(() => {
        if (!this.enabled || ctx.state !== 'running') return;
        const frequency = scale[Math.floor(Math.random() * scale.length)];
        this.pluck(ctx, frequency, 0.045);
      }, 3800);
    }

    return {
      stop: () => {
        if (pluckTimer) clearInterval(pluckTimer);
        oscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {
            // already stopped
          }
        });
        group.disconnect();
      },
    };
  }

  private pluck(ctx: AudioContext, frequency: number, level: number) {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = frequency;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    osc.connect(gain).connect(this.getMaster());
    osc.start(now);
    osc.stop(now + 3);
  }

  private forest(ctx: AudioContext): ActiveAmbience {
    const base = this.noise(ctx, 'bandpass', 1200, 0.7, 0.028);
    const rustle = this.noise(ctx, 'highpass', 3800, 0.5, 0.008);
    const chirpTimer = setInterval(() => {
      if (!this.enabled || ctx.state !== 'running') return;
      this.chirp(ctx);
    }, 2600);
    return {
      stop: () => {
        clearInterval(chirpTimer);
        base.source.stop();
        rustle.source.stop();
      },
    };
  }

  private chirp(ctx: AudioContext) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const start = 1700 + Math.random() * 900;
    osc.frequency.setValueAtTime(start, now);
    osc.frequency.exponentialRampToValueAtTime(start + 900, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(start - 300, now + 0.18);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.018, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain).connect(this.getMaster());
    osc.start(now);
    osc.stop(now + 0.3);
  }

  private river(ctx: AudioContext): ActiveAmbience {
    const water = this.noise(ctx, 'bandpass', 900, 0.8, 0.045);
    const shimmer = this.noise(ctx, 'highpass', 2800, 0.5, 0.012);
    return {
      stop: () => {
        water.source.stop();
        shimmer.source.stop();
      },
    };
  }

  private ocean(ctx: AudioContext): ActiveAmbience {
    const waves = this.noise(ctx, 'lowpass', 620, 0.4, 0.085);
    const foam = this.noise(ctx, 'highpass', 2200, 0.4, 0.008);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.075;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.035;
    lfo.connect(lfoGain).connect(waves.gain.gain);
    lfo.start();
    return {
      stop: () => {
        try {
          lfo.stop();
        } catch {
          // already stopped
        }
        waves.source.stop();
        foam.source.stop();
      },
    };
  }

  private wind(ctx: AudioContext): ActiveAmbience {
    const air = this.noise(ctx, 'bandpass', 480, 0.35, 0.06);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.11;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 240;
    lfo.connect(lfoGain).connect(air.filter.frequency);
    lfo.start();
    return {
      stop: () => {
        try {
          lfo.stop();
        } catch {
          // already stopped
        }
        air.source.stop();
      },
    };
  }

  private temple(ctx: AudioContext): ActiveAmbience {
    const drone = this.drone(ctx, 'temple');
    const bellTimer = setInterval(() => {
      if (!this.enabled || ctx.state !== 'running') return;
      this.bell(ctx, 523.25, 0.045);
    }, 9000);
    return {
      stop: () => {
        clearInterval(bellTimer);
        drone.stop();
      },
    };
  }

  private bell(ctx: AudioContext, frequency: number, level: number) {
    const now = ctx.currentTime;
    const partials = [1, 2.01, 2.98, 4.2];
    partials.forEach((partial, index) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = frequency * partial;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(level / (index + 1.4), now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6 + index);
      osc.connect(gain).connect(this.getMaster());
      osc.start(now);
      osc.stop(now + 5);
    });
  }

  private ceremony(ctx: AudioContext): ActiveAmbience {
    const drone = this.drone(ctx, 'ceremony');
    const bellTimer = setInterval(() => {
      if (!this.enabled || ctx.state !== 'running') return;
      this.bell(ctx, 392, 0.03);
    }, 7000);
    return {
      stop: () => {
        clearInterval(bellTimer);
        drone.stop();
      },
    };
  }

  private battle(ctx: AudioContext): ActiveAmbience {
    const rumble = this.noise(ctx, 'lowpass', 180, 0.6, 0.055);
    let step = 0;
    const drumTimer = setInterval(() => {
      if (!this.enabled || ctx.state !== 'running') return;
      this.drum(ctx, step % 4 === 0 ? 58 : 72, 0.055);
      step += 1;
    }, 1100);
    return {
      stop: () => {
        clearInterval(drumTimer);
        rumble.source.stop();
      },
    };
  }

  private drum(ctx: AudioContext, frequency: number, level: number) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(frequency * 1.8, now);
    osc.frequency.exponentialRampToValueAtTime(frequency, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    osc.connect(gain).connect(this.getMaster());
    osc.start(now);
    osc.stop(now + 0.6);
  }
}

export const audioEngine = new AudioEngine();
