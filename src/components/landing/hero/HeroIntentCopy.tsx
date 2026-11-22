"use client";

import React from "react";
import { Play } from "lucide-react";

function Letters({ text }: { text: string }) {
  return (
    <span className="intent-letters" aria-hidden="true">
      {Array.from(text).map((char, index) => (
        <span className="intent-letter" key={`${char}-${index}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

interface HeroIntentCopyProps {
  titleRef: React.RefObject<HTMLElement | null>;
  kickerLine1: string;
  kickerLine2: string;
  titleSmall: string;
  titleMain: string;
  titleConnector: string;
  titleResult: string;
  titleAria: string;
  description: string;
  ctaLabel: string;
  ctaAria: string;
  ctaRef: React.RefObject<HTMLButtonElement | null>;
  onCtaClick: () => void;
}

export function HeroIntentCopy({
  titleRef,
  kickerLine1,
  kickerLine2,
  titleSmall,
  titleMain,
  titleConnector,
  titleResult,
  titleAria,
  description,
  ctaLabel,
  ctaAria,
  ctaRef,
  onCtaClick,
}: HeroIntentCopyProps) {
  return (
    <div className="intent-copy">
      <div className="intent-kicker">
        <span>{kickerLine1}</span>
        <span>{kickerLine2}</span>
        <i />
      </div>

      <h1 className="sr-only">{titleAria}</h1>

      <div
        className="intent-title"
        ref={titleRef as React.RefObject<HTMLDivElement | null>}
        aria-hidden="true"
      >
        <span className="intent-title-small">
          <Letters text={titleSmall} />
        </span>{" "}
        <strong>
          <Letters text={titleMain} />
        </strong>{" "}
        <span className="intent-title-result">
          <span>
            <Letters text={titleConnector} />
          </span>{" "}
          <strong>
            <Letters text={titleResult} />
          </strong>
        </span>
      </div>

      <p className="intent-description">{description}</p>

      <button
        ref={ctaRef}
        type="button"
        className="intent-cta"
        onClick={onCtaClick}
        aria-label={ctaAria}
      >
        <span className="intent-cta-arrow">
          <Play aria-hidden="true" size={18} strokeWidth={1.6} className="translate-x-[1.5px]" />
        </span>
        <span>{ctaLabel}</span>
      </button>
    </div>
  );
}
