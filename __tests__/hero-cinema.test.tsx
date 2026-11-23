import React, { useRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useHeroCinema } from "@/components/landing/hero/useHeroCinema";
import { HeroCinemaStage, type HeroCinemaCopy } from "@/components/landing/hero/HeroCinemaStage";

const copy: HeroCinemaCopy = {
  regionAria: "Video CELAEST",
  close: "VOLVER",
  closeAria: "Cerrar video",
  playAria: "Reproducir",
  pauseAria: "Pausar",
  muteAria: "Silenciar",
  unmuteAria: "Activar sonido",
  fullscreenAria: "Pantalla completa",
  seekAria: "Progreso",
};

function CinemaHarness() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cinema = useHeroCinema(heroRef);

  return (
    <section ref={heroRef}>
      <button
        ref={cinema.triggerRef}
        type="button"
        onClick={cinema.openCinema}
        onPointerEnter={cinema.prefetchCinema}
      >
        Ver video
      </button>
      <HeroCinemaStage
        isOpen={cinema.isOpen}
        isPlaying={cinema.isPlaying}
        isBuffering={cinema.isBuffering}
        isMuted={cinema.isMuted}
        isMobile={cinema.isMobile}
        currentTime={cinema.currentTime}
        duration={cinema.duration}
        videoSrc={cinema.videoSrc}
        cinemaRef={cinema.cinemaRef}
        videoRef={cinema.videoRef}
        copy={copy}
        onClose={cinema.closeCinema}
        onTogglePlay={cinema.togglePlay}
        onToggleMute={cinema.toggleMute}
        onSeekRatio={cinema.seekToRatio}
        onFullscreen={cinema.requestFullscreen}
        onTimeUpdate={cinema.handleTimeUpdate}
        onLoadedMetadata={cinema.handleLoadedMetadata}
        onPlayStateChange={cinema.setIsPlaying}
        onBufferingChange={cinema.setIsBuffering}
        onVideoError={cinema.handleVideoError}
      />
    </section>
  );
}

describe("HeroCinema playback & failover", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("preloads on CTA hover, clears inert before play, and fails over from stalled MP4 to WebM", async () => {
    const { container } = render(<CinemaHarness />);
    const cta = screen.getByRole("button", { name: "Ver video" });
    const video = container.querySelector("video") as HTMLVideoElement;
    const region = container.querySelector(".intent-cinema") as HTMLDivElement;

    expect(video.getAttribute("src")).toBe("/videos/celaest-ecosistema-pitch.mp4");
    expect(video.preload).toBe("metadata");
    expect(region).toHaveAttribute("inert");

    const playMock = vi.fn().mockResolvedValue(undefined);
    const loadMock = vi.fn();
    Object.defineProperty(video, "play", { configurable: true, value: playMock });
    Object.defineProperty(video, "load", { configurable: true, value: loadMock });

    fireEvent.pointerEnter(cta);
    expect(video.preload).toBe("auto");

    // Verify inert attribute is cleared BEFORE play() runs synchronously inside click
    playMock.mockImplementationOnce(() => {
      expect(region.hasAttribute("inert")).toBe(false);
      return Promise.resolve();
    });

    fireEvent.click(cta);
    expect(playMock).toHaveBeenCalledTimes(1);

    // Simulate GPU hardware decoder stall at 0:00 (paused === false, currentTime === 0)
    Object.defineProperty(video, "paused", { configurable: true, value: false });
    Object.defineProperty(video, "currentTime", { configurable: true, value: 0 });

    act(() => {
      vi.advanceTimersByTime(1650);
    });

    expect(video.src).toContain("/videos/celaest-ecosistema-pitch.webm");
    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(playMock).toHaveBeenCalledTimes(2);
  });

  it("falls back to muted playback cleanly when NotAllowedError blocks unmuted audio", async () => {
    const { container } = render(<CinemaHarness />);
    const cta = screen.getByRole("button", { name: "Ver video" });
    const video = container.querySelector("video") as HTMLVideoElement;

    const notAllowed = new DOMException("Unmuted autoplay blocked", "NotAllowedError");
    const playMock = vi.fn().mockRejectedValueOnce(notAllowed).mockResolvedValueOnce(undefined);
    Object.defineProperty(video, "play", { configurable: true, value: playMock });

    await act(async () => {
      fireEvent.click(cta);
      await Promise.resolve();
    });

    expect(video.muted).toBe(true);
    expect(playMock).toHaveBeenCalledTimes(2);
  });
});
