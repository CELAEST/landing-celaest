"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID, GOOGLE_TAG_ID } from "@/lib/constants";
import { resolveClickConversionEvent } from "@/lib/analytics-events";

type GtagFn = (command: string, eventName: string, params?: Record<string, string>) => void;

let scriptsInjected = false;

function injectDeferredTelemetry() {
  if (scriptsInjected || typeof document === "undefined") return;
  if (localStorage.getItem("celaest_cookie_consent") === "essential") return;
  scriptsInjected = true;

  if (GA_MEASUREMENT_ID) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);
  }

  if (GOOGLE_TAG_ID) {
    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`;
    document.head.appendChild(gtmScript);
  }

  if (CLARITY_PROJECT_ID) {
    try {
      Clarity.init(CLARITY_PROJECT_ID);
    } catch {
      // Safe no-op if Clarity is blocked by browser privacy extensions
    }
  }
}

export function Analytics() {
  useEffect(() => {
    const triggerEvents = [
      "pointermove",
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
    ] as const;

    const onFirstInteraction = () => {
      for (const evt of triggerEvents) {
        window.removeEventListener(evt, onFirstInteraction);
      }
      injectDeferredTelemetry();
    };

    for (const evt of triggerEvents) {
      window.addEventListener(evt, onFirstInteraction, {
        once: true,
        passive: true,
      });
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (localStorage.getItem("celaest_cookie_consent") === "essential") return;
      injectDeferredTelemetry();

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const label = anchor.getAttribute("aria-label") || anchor.textContent || "";
      const payload = resolveClickConversionEvent(href, window.location.pathname, label);

      if (!payload) return;

      const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
      if (typeof gtag === "function") {
        gtag("event", payload.name, payload.params);
      }

      if (CLARITY_PROJECT_ID) {
        try {
          Clarity.event(payload.name);
        } catch {
          // Ignore if Clarity is not yet initialized
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, { passive: true });
    return () => {
      for (const evt of triggerEvents) {
        window.removeEventListener(evt, onFirstInteraction);
      }
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return null;
}
