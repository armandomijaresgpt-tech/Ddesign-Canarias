import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Web Audio API context singleton
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('design_canarias_sound_enabled');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('design_canarias_sound_enabled', String(isSoundEnabled));
    } catch {
      // Ignore localStorage errors in private browsing
    }
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setIsSoundEnabled(enabled);
  }, []);

  // Subtle, high-tech hover tick (~850Hz decaying in 25ms, volume 0.03)
  const playHover = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.028, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // Suppress audio failure
    }
  }, [isSoundEnabled]);

  // Crisp mechanical tactile click (~1200Hz dropping to 350Hz in 35ms)
  const playClick = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Suppress audio failure
    }
  }, [isSoundEnabled]);

  // Ascending harmonic chime for confirmations / success (D5 -> A5)
  const playSuccess = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Note 1: 587.33 Hz (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.05, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // Note 2: 880 Hz (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.09);
      gain2.gain.setValueAtTime(0.06, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.32);
    } catch {
      // Suppress audio failure
    }
  }, [isSoundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        toggleSound,
        setSoundEnabled,
        playHover,
        playClick,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      isSoundEnabled: true,
      toggleSound: () => {},
      setSoundEnabled: () => {},
      playHover: () => {},
      playClick: () => {},
      playSuccess: () => {},
    };
  }
  return context;
};
