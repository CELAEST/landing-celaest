"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_SEC = 46;

/**
 * Coordinates desktop in-hero editorial cinema playback and mobile fullscreen
 * theater overlay using a single gesture-safe <video> element.
 */
export function useHeroCinema(heroRef: React.RefObject<HTMLElement | null>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION_SEC);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused) video.pause();
    setIsPlaying(false);
  }, []);

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

  const openCinema = useCallback(() => {
    setIsOpen(true);
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    video.muted = isMuted;
    setIsPlaying(true);
    void video.play().catch(() => {
      setIsPlaying(false);
    });
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      setIsPlaying(true);
      void video.play().catch(() => setIsPlaying(false));
    } else {
      pauseVideo();
    }
  }, [pauseVideo]);

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
    setCurrentTime(video.currentTime);
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, []);

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
        if (desktopQuery.matches && entry && entry.intersectionRatio < 0.25) {
          pauseVideo();
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isOpen, heroRef, pauseVideo]);

  return {
    isOpen,
    isPlaying,
    isMuted,
    isMobile,
    currentTime,
    duration,
    videoRef,
    triggerRef,
    openCinema,
    closeCinema,
    togglePlay,
    toggleMute,
    seekToRatio,
    requestFullscreen,
    handleTimeUpdate,
    handleLoadedMetadata,
    setIsPlaying,
  };
}
