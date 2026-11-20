"use client";

import React from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import "./hero-cinema.css";

export interface HeroCinemaCopy {
  regionAria: string;
  close: string;
  closeAria: string;
  playAria: string;
  pauseAria: string;
  muteAria: string;
  unmuteAria: string;
  fullscreenAria: string;
  seekAria: string;
}

interface HeroCinemaStageProps {
  isOpen: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isMobile: boolean;
  currentTime: number;
  duration: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  copy: HeroCinemaCopy;
  onClose: (restoreFocus?: boolean) => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSeekRatio: (ratio: number) => void;
  onFullscreen: () => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onPlayStateChange: (playing: boolean) => void;
}

function formatClock(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Editorial borderless video stage tuned to the Hero aesthetic:
 * - Desktop: unboxed 16:9 stage with hairline transport bar beneath the video
 * - Mobile: clean edge-to-edge 16:9 player centered on obsidian void with a single X trigger
 */
export function HeroCinemaStage({
  isOpen,
  isPlaying,
  isMuted,
  isMobile,
  currentTime,
  duration,
  videoRef,
  copy,
  onClose,
  onTogglePlay,
  onToggleMute,
  onSeekRatio,
  onFullscreen,
  onTimeUpdate,
  onLoadedMetadata,
  onPlayStateChange,
}: HeroCinemaStageProps) {
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    onSeekRatio((e.clientX - rect.left) / rect.width);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose(true);
  };

  return (
    <div
      className={`intent-cinema ${isOpen ? "is-open" : ""}`}
      role="region"
      aria-label={copy.regionAria}
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        className="intent-cinema-close"
        onClick={() => onClose(true)}
        aria-label={copy.closeAria}
      >
        <span className="intent-cinema-close-label">{copy.close}</span>
        <span className="intent-cinema-close-ring" aria-hidden="true">
          <X size={16} strokeWidth={1.4} />
        </span>
      </button>

      <div className="intent-cinema-stage" onClick={handleBackdropClick}>
        <video
          ref={videoRef}
          className="intent-cinema-video"
          src="/videos/celaest-ecosistema-pitch.mp4"
          poster="/videos/celaest-ecosistema-pitch-poster.webp"
          preload="none"
          controls={isMobile}
          playsInline
          onClick={!isMobile ? onTogglePlay : undefined}
          onDoubleClick={!isMobile ? onFullscreen : undefined}
          onPlay={() => onPlayStateChange(true)}
          onPause={() => onPlayStateChange(false)}
          onEnded={() => onPlayStateChange(false)}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
        />

        <div className="intent-cinema-hud">
          <div
            className="intent-cinema-scrubber"
            role="slider"
            tabIndex={isOpen && !isMobile ? 0 : -1}
            aria-label={copy.seekAria}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            onClick={handleTrackClick}
          >
            <div className="intent-cinema-scrubber-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="intent-cinema-controls">
            <div className="intent-cinema-controls-group">
              <button
                type="button"
                className="intent-cinema-icon-btn"
                onClick={onTogglePlay}
                aria-label={isPlaying ? copy.pauseAria : copy.playAria}
              >
                {isPlaying ? (
                  <Pause size={14} strokeWidth={1.5} />
                ) : (
                  <Play size={14} strokeWidth={1.5} className="translate-x-[0.5px]" />
                )}
              </button>
              <span className="intent-cinema-time">
                {formatClock(currentTime)} / {formatClock(duration)}
              </span>
            </div>

            <div className="intent-cinema-controls-group">
              <button
                type="button"
                className="intent-cinema-icon-btn"
                onClick={onToggleMute}
                aria-label={isMuted ? copy.unmuteAria : copy.muteAria}
              >
                {isMuted ? (
                  <VolumeX size={14} strokeWidth={1.5} />
                ) : (
                  <Volume2 size={14} strokeWidth={1.5} />
                )}
              </button>
              <button
                type="button"
                className="intent-cinema-icon-btn"
                onClick={onFullscreen}
                aria-label={copy.fullscreenAria}
              >
                <Maximize2 size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
