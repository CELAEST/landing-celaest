"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_SEC = 46;
const VIDEO_SOURCES = [
  "/videos/celaest-ecosistema-pitch.mp4",
  "/videos/celaest-ecosistema-pitch.webm",
] as const;

/**
 * Coordinates desktop in-hero editorial cinema playback and mobile fullscreen
 * theater overlay with automatic codec failover (H.264 -> VP9 WebM) and mute fallback.
 */
export function useHeroCinema(heroRef: React.RefObject<HTMLElement | null>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION_SEC);
  const [sourceIndex, setSourceIndex] = useState(0);

  const cinemaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const stallTimerRef = useRef<number | null>(null);
  const sourceIndexRef = useRef(0);

  const clearStallWatchdog = useCallback(() => {
    if (stallTimerRef.current !== null) {
      window.clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    sourceIndexRef.current = sourceIndex;
  }, [sourceIndex]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      clearStallWatchdog();
    };
  }, [clearStallWatchdog]);

  const attemptPlay = useCallback(
    (video: HTMLVideoElement) => {
      // Remove inert synchronously before play() so Chromium preserves click activation cleanly
      cinemaRef.current?.removeAttribute("inert");
      setIsBuffering(video.readyState < 3);

      clearStallWatchdog();
      const startTime = video.currentTime;
      stallTimerRef.current = window.setTimeout(() => {
        const el = videoRef.current;
        if (!el || el.paused || el.ended) return;
        const stalledAtStart = el.currentTime <= startTime + 0.02;
        if (stalledAtStart && sourceIndexRef.current < VIDEO_SOURCES.length - 1) {
          const nextIdx = sourceIndexRef.current + 1;
          sourceIndexRef.current = nextIdx;
          setSourceIndex(nextIdx);
          el.src = VIDEO_SOURCES[nextIdx];
          el.load();
          void el.play().catch(() => {
            setIsPlaying(false);
            setIsBuffering(false);
          });
        }
      }, 1600);

      void video.play().catch((err: unknown) => {
        // Retry muted if OS/browser blocks unmuted playback (NotAllowedError / audio lock)
        if (!video.muted && err instanceof DOMException && err.name === "NotAllowedError") {
          video.muted = true;
          setIsMuted(true);
          void video.play().catch(() => {
            clearStallWatchdog();
            setIsPlaying(false);
            setIsBuffering(false);
          });
          return;
        }
        clearStallWatchdog();
        setIsPlaying(false);
        setIsBuffering(false);
      });
    },
    [clearStallWatchdog],
  );

  const pauseVideo = useCallback(() => {
    clearStallWatchdog();
    const video = videoRef.current;
    if (video && !video.paused) video.pause();
    setIsPlaying(false);
    setIsBuffering(false);
  }, [clearStallWatchdog]);

  const closeCinema = useCallback(
    (restoreFocus = true) => {
      pauseVideo();
      setIsOpen(false);
      if (restoreFocus) {
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    },
    [pauseVideo],
  );

  const prefetchCinema = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.preload !== "auto") {
      video.preload = "auto";
    }
  }, []);

  const openCinema = useCallback(() => {
    setIsOpen(true);
    const video = videoRef.current;
    if (!video) return;
    if (video.preload !== "auto") video.preload = "auto";
    if (video.ended) video.currentTime = 0;
    video.muted = isMuted;
    attemptPlay(video);
  }, [attemptPlay, isMuted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      attemptPlay(video);
    } else {
      pauseVideo();
    }
  }, [attemptPlay, pauseVideo]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  }, []);

  const seekToRatio = useCallback(
    (ratio: number) => {
      const video = videoRef.current;
      if (!video) return;
      const targetDur =
        Number.isFinite(video.duration) && video.duration > 0 ? video.duration : duration;
      const nextTime = Math.max(0, Math.min(targetDur, ratio * targetDur));
      video.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration],
  );

  const requestFullscreen = useCallback(() => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else if (video.requestFullscreen) {
      void video.requestFullscreen().catch(() => undefined);
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > 0.02) {
      clearStallWatchdog();
      setIsBuffering(false);
    }
    setCurrentTime(video.currentTime);
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, [clearStallWatchdog]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, []);

  const handleVideoError = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (sourceIndexRef.current < VIDEO_SOURCES.length - 1) {
      const nextIdx = sourceIndexRef.current + 1;
      sourceIndexRef.current = nextIdx;
      setSourceIndex(nextIdx);
      video.src = VIDEO_SOURCES[nextIdx];
      video.load();
      if (isOpen) {
        attemptPlay(video);
      }
      return;
    }
    clearStallWatchdog();
    setIsPlaying(false);
    setIsBuffering(false);
  }, [attemptPlay, clearStallWatchdog, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCinema();
      } else if (e.key === " " && document.activeElement?.tagName !== "BUTTON") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      } else if (e.key.toLowerCase() === "f") {
        requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (isMobile) document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isMobile, closeCinema, togglePlay, toggleMute, requestFullscreen]);

  useEffect(() => {
    if (!isOpen || !heroRef.current) return;
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (desktopQuery.matches && entry && !entry.isIntersecting) {
          pauseVideo();
        }
      },
      { threshold: 0.02 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isOpen, heroRef, pauseVideo]);

  return {
    isOpen,
    isPlaying,
    isBuffering,
    isMuted,
    isMobile,
    currentTime,
    duration,
    videoSrc: VIDEO_SOURCES[sourceIndex],
    cinemaRef,
    videoRef,
    triggerRef,
    prefetchCinema,
    openCinema,
    closeCinema,
    togglePlay,
    toggleMute,
    seekToRatio,
    requestFullscreen,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleVideoError,
    setIsPlaying,
    setIsBuffering,
  };
}
