"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "so-hvac-music-on";

/**
 * Floating mute/unmute control for a soft looping background track.
 * Off by default — browsers block autoplay-with-sound anyway, and starting
 * silent is the least disruptive choice for a business site. The visitor's
 * choice is remembered across page loads via localStorage.
 *
 * Drop the track at public/audio/background-music.mp3 (short, seamless
 * loop, quiet mix). If the file is missing, the button still renders but
 * playback fails silently — no console spam, no broken UX.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOn(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !mounted) return;
    if (isOn) {
      audio.volume = 0.35;
      audio.play().catch(() => {
        // Autoplay blocked or file missing — fail quietly, keep UI in sync.
        setIsOn(false);
      });
    } else {
      audio.pause();
    }
  }, [isOn, mounted]);

  if (!mounted) return null;

  return (
    <>
      <audio ref={audioRef} src="/audio/background-music.mp3" loop preload="none" />
      <button
        type="button"
        onClick={() => {
          setIsOn((prev) => {
            const next = !prev;
            window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
            return next;
          });
        }}
        aria-pressed={isOn}
        aria-label={isOn ? "Mute background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-white)]/90 text-[var(--color-navy)] shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[var(--color-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue)]"
      >
        {isOn ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M4 9v6h4l5 4V5L8 9H4z"
              fill="currentColor"
            />
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M18.5 6a8 8 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16 9l4.5 6M20.5 9L16 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
