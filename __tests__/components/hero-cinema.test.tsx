import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import esMessages from "../../src/i18n/messages/es.json";
import enMessages from "../../src/i18n/messages/en.json";
import { HeroSection } from "../../src/components/landing/hero-section";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const fn = (key: string) => (esMessages.hero.intent as Record<string, unknown>)[key] as string;
    fn.raw = (key: string) => (esMessages.hero.intent as Record<string, unknown>)[key];
    return fn;
  },
}));

describe("HeroSection & Editorial Cinema Video Stage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("min-width: 768px"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: class MockIntersectionObserver {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    });
  });

  it("maintains compact hero descriptions and bilingual ES/EN cinema parity", () => {
    expect(esMessages.hero.intent.description.length).toBeLessThanOrEqual(135);
    expect(enMessages.hero.intent.description.length).toBeLessThanOrEqual(135);
    expect(esMessages.hero.intent.cta).toBe("¿CÓMO FUNCIONA?");
    expect(enMessages.hero.intent.cta).toBe("HOW IT WORKS?");

    const esCinemaKeys = Object.keys(esMessages.hero.intent.cinema).sort();
    const enCinemaKeys = Object.keys(enMessages.hero.intent.cinema).sort();
    expect(esCinemaKeys).toEqual(enCinemaKeys);
  });

  it("opens Editorial Cinema stage on click with preload='none', toggles playback/mute, and closes on Escape", () => {
    let pausedState = true;
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
      pausedState = false;
      return Promise.resolve();
    });
    const pauseSpy = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {
      pausedState = true;
    });

    const { container } = render(<HeroSection />);

    const ctaBtn = screen.getByRole("button", {
      name: esMessages.hero.intent.ctaAria,
    });
    expect(ctaBtn).toHaveTextContent("¿CÓMO FUNCIONA?");

    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video).toBeTruthy();
    Object.defineProperty(video, "paused", {
      configurable: true,
      get: () => pausedState,
    });
    expect(video.getAttribute("preload")).toBe("none");
    expect(video.hasAttribute("playsinline") || video.playsInline).toBe(true);
    expect(container.querySelector(".intent-hero")).not.toHaveClass("is-cinema");

    fireEvent.click(ctaBtn);
    expect(container.querySelector(".intent-hero")).toHaveClass("is-cinema");
    expect(playSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: esMessages.hero.intent.cinema.muteAria }));
    expect(video.muted).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: esMessages.hero.intent.cinema.pauseAria }));
    expect(pauseSpy).toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelector(".intent-hero")).not.toHaveClass("is-cinema");

    playSpy.mockRestore();
    pauseSpy.mockRestore();
  });
});
