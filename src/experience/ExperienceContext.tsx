import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { audioEngine, type Ambience } from '../audio/AudioEngine';

export type ProfileSetting = 'auto' | 'a' | 'b' | 'c';
export type ResolvedProfile = 'a' | 'b' | 'c';
export type ArtQuality = 'high' | 'medium' | 'low';

interface StoredPreferences {
  profile?: ProfileSetting;
  reducedMotion?: boolean | null;
  volume?: number;
  ambience?: Ambience;
}

interface ExperienceValue {
  profileSetting: ProfileSetting;
  profile: ResolvedProfile;
  profileLabel: string;
  quality: ArtQuality;
  setProfileSetting: (value: ProfileSetting) => void;
  reducedMotion: boolean;
  motionOverride: boolean | null;
  setMotionOverride: (value: boolean | null) => void;
  audioEnabled: boolean;
  audioSupported: boolean;
  audioError: string | null;
  volume: number;
  ambience: Ambience;
  toggleAudio: () => void;
  setVolume: (value: number) => void;
  setAmbience: (value: Ambience) => void;
}

const STORAGE_KEY = 'ramayana.preferences.v1';

const ExperienceContext = createContext<ExperienceValue | null>(null);

function readPreferences(): StoredPreferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredPreferences;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function detectProfile(): ResolvedProfile {
  if (typeof navigator === 'undefined') return 'b';
  const device = navigator as Navigator & { deviceMemory?: number };
  const cores = device.hardwareConcurrency ?? 4;
  const memory = device.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return 'c';
  if (cores <= 6 || memory <= 6) return 'b';
  return 'a';
}

const profileLabels: Record<ResolvedProfile, string> = {
  a: 'Cinematic',
  b: 'Balanced',
  c: 'Essential',
};

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readPreferences, []);
  const [profileSetting, setProfileSettingState] = useState<ProfileSetting>(
    initial.profile ?? 'auto',
  );
  const [autoProfile, setAutoProfile] = useState<ResolvedProfile>(detectProfile);
  const [motionOverride, setMotionOverrideState] = useState<boolean | null>(
    initial.reducedMotion ?? null,
  );
  const [systemReducedMotion, setSystemReducedMotion] = useState(prefersReducedMotion);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(
    typeof initial.volume === 'number' ? Math.min(1, Math.max(0, initial.volume)) : 0.55,
  );
  const [ambience, setAmbienceState] = useState<Ambience>(initial.ambience ?? 'music');

  const profile: ResolvedProfile =
    profileSetting === 'auto' ? autoProfile : profileSetting;
  const reducedMotion =
    motionOverride === null ? systemReducedMotion : motionOverride;
  const quality: ArtQuality =
    profile === 'a' ? 'high' : profile === 'b' ? 'medium' : 'low';

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onResize = () => setAutoProfile(detectProfile());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
      setAudioSupported(false);
    }
  }, []);

  useEffect(() => {
    const payload: StoredPreferences = {
      profile: profileSetting,
      reducedMotion: motionOverride,
      volume,
      ambience,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage is optional; the experience still works without it.
    }
  }, [profileSetting, motionOverride, volume, ambience]);

  useEffect(() => {
    document.documentElement.dataset.profile = profile;
    document.documentElement.dataset.motion = reducedMotion ? 'reduce' : 'full';
  }, [profile, reducedMotion]);

  const setProfileSetting = useCallback((value: ProfileSetting) => {
    setProfileSettingState(value);
  }, []);

  const setMotionOverride = useCallback((value: boolean | null) => {
    setMotionOverrideState(value);
  }, []);

  const setVolume = useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value));
    setVolumeState(next);
    audioEngine.setVolume(next);
  }, []);

  const setAmbience = useCallback((value: Ambience) => {
    setAmbienceState(value);
    void audioEngine.setAmbience(value);
  }, []);

  const toggleAudio = useCallback(() => {
    if (audioEnabled) {
      audioEngine.disable();
      setAudioEnabled(false);
      return;
    }
    setAudioError(null);
    audioEngine.setVolume(volume);
    audioEngine
      .enable(ambience)
      .then(() => setAudioEnabled(true))
      .catch(() => {
        setAudioError('This browser could not start the ambience. The story works fully without it.');
        setAudioEnabled(false);
      });
  }, [audioEnabled, ambience, volume]);

  const value = useMemo<ExperienceValue>(
    () => ({
      profileSetting,
      profile,
      profileLabel: profileLabels[profile],
      quality,
      setProfileSetting,
      reducedMotion,
      motionOverride,
      setMotionOverride,
      audioEnabled,
      audioSupported,
      audioError,
      volume,
      ambience,
      toggleAudio,
      setVolume,
      setAmbience,
    }),
    [
      profileSetting,
      profile,
      quality,
      setProfileSetting,
      reducedMotion,
      motionOverride,
      setMotionOverride,
      audioEnabled,
      audioSupported,
      audioError,
      volume,
      ambience,
      toggleAudio,
      setVolume,
      setAmbience,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error('useExperience must be used inside ExperienceProvider');
  return value;
}
