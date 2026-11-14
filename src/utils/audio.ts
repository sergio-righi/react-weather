/**
 * Ambient Atmospheric Sound Synthesizer using Web Audio API
 * Generates procedural atmospheric soundscapes (rain, wind, night, tactile click)
 * Zero external audio assets needed; works entirely in-browser.
 */

let audioCtx: AudioContext | null = null;
let ambientNode: GainNode | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const SoundEngine = {
  /**
   * Play a subtle tactile haptic click on UI interaction
   */
  playTactileClick: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio playback fails gracefully if blocked by autoplay policy
    }
  },

  /**
   * Start procedural atmospheric ambient audio
   */
  startAtmosphere: (type: "rain" | "wind" | "clear" = "clear") => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      SoundEngine.stopAtmosphere();

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise synthesis for ambient atmospheric air
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.05;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter based on weather type
      const filter = ctx.createBiquadFilter();
      if (type === "rain") {
        filter.type = "lowpass";
        filter.frequency.value = 1800;
      } else if (type === "wind") {
        filter.type = "bandpass";
        filter.frequency.value = 500;
      } else {
        filter.type = "lowpass";
        filter.frequency.value = 700;
      }

      ambientNode = ctx.createGain();
      ambientNode.gain.setValueAtTime(0.01, ctx.currentTime);
      ambientNode.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(ambientNode);
      ambientNode.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio playback fails gracefully
    }
  },

  /**
   * Stop atmospheric audio
   */
  stopAtmosphere: () => {
    if (ambientNode && audioCtx) {
      try {
        ambientNode.gain.linearRampToValueAtTime(
          0.001,
          audioCtx.currentTime + 0.5
        );
        setTimeout(() => {
          ambientNode?.disconnect();
          ambientNode = null;
        }, 500);
      } catch {
        ambientNode = null;
      }
    }
  },
};
