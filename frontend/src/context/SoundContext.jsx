import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import track2 from "../assets/audio/ambient_track_2.mp3";
import track3 from "../assets/audio/ambient_track_3.mp3";
import track4 from "../assets/audio/ambient_track_4.mp3";

export const SONGS = [
  { id: "ambient-1", title: "Ambient Theme 1", src: track2 },
  { id: "ambient-2", title: "Ambient Theme 2", src: track3 },
  { id: "ambient-3", title: "Ambient Theme 3", src: track4 },
];

const SoundContext = createContext();

const getRandomIndex = (excludeIndex = -1) => {
  if (SONGS.length <= 1) return 0;
  let nextIdx;
  let attempts = 0;
  do {
    nextIdx = Math.floor(Math.random() * SONGS.length);
    attempts++;
  } while (nextIdx === excludeIndex && attempts < 10);
  return nextIdx;
};

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35); // Pleasant ambient volume
  const [showExperienceModal, setShowExperienceModal] = useState(true);
  const [currentSong, setCurrentSong] = useState(() => {
    const idx = getRandomIndex();
    return SONGS[idx];
  });

  const audioRef = useRef(null);
  const isMutedRef = useRef(true);
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.35);
  const currentSongIndexRef = useRef(
    SONGS.findIndex((s) => s.id === currentSong?.id) >= 0
      ? SONGS.findIndex((s) => s.id === currentSong?.id)
      : 0
  );

  // Synchronize refs
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Synchronous play helper (must be called synchronously inside user gestures for browser activation token)
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio || isMutedRef.current) return Promise.resolve(false);

    if (!audio.src) {
      audio.src = currentSong?.src || SONGS[0].src;
    }
    audio.volume = volumeRef.current;
    return audio
      .play()
      .then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true);
        return true;
      })
      .catch(() => {
        // Browser autoplay policy rejected unmuted play without previous gesture
        return false;
      });
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  // Play next random song from array
  const playRandomSong = () => {
    const nextIdx = getRandomIndex(currentSongIndexRef.current);
    currentSongIndexRef.current = nextIdx;
    const song = SONGS[nextIdx];
    setCurrentSong(song);

    const audio = audioRef.current;
    if (audio) {
      audio.src = song.src;
      audio.load();
      if (!isMutedRef.current) {
        return playAudio();
      }
    }
    return Promise.resolve(false);
  };

  // Initialize Audio & Autoplay
  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audio.volume = volumeRef.current;
    audio.preload = "none"; // CRITICAL: Zero network audio download until user plays
    audioRef.current = audio;

    // Track audio state via native events
    const onPlay = () => {
      isPlayingRef.current = true;
      setIsPlaying(true);
    };
    const onPause = () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
    };
    const onEnded = () => {
      // Pick another random song from array when current song completes
      playRandomSong();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Do not force autoplay without user choice; ExperienceModal or Navbar will trigger playback
    return () => {
      if (audio) {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("ended", onEnded);
        audio.pause();
      }
      audioRef.current = null;
    };
  }, []);

  // Modal actions
  const startExperienceWithSound = () => {
    setIsMuted(false);
    isMutedRef.current = false;
    setShowExperienceModal(false);
    playAudio();
  };

  const continueExperienceWithoutSound = () => {
    setIsMuted(true);
    isMutedRef.current = true;
    setShowExperienceModal(false);
    pauseAudio();
  };

  const dismissExperienceModal = () => {
    setShowExperienceModal(false);
  };

  // Toggle sound On / Off (Navbar small icon)
  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && !isMuted) {
      pauseAudio();
      setIsMuted(true);
      isMutedRef.current = true;
    } else {
      setIsMuted(false);
      isMutedRef.current = false;
      playAudio();
    }
  };

  const changeVolume = (newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    volumeRef.current = clamped;
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isPlaying: isPlaying && !isMuted,
        isMuted,
        volume,
        currentSong,
        songs: SONGS,
        showExperienceModal,
        setShowExperienceModal,
        startExperienceWithSound,
        continueExperienceWithoutSound,
        dismissExperienceModal,
        playRandomSong,
        nextSong: playRandomSong,
        toggleSound,
        changeVolume,
        playAudio,
        pauseAudio,
        startAudioWithFade: playAudio,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
