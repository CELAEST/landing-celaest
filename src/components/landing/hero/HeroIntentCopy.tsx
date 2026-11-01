"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

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
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  kickerLine1: string;
  kickerLine2: string;
  titleSmall: string;
  titleMain: string;
  titleConnector: string;
  titleResult: string;
  titleAria: string;
  description: string;
  ctaLabel: string;
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
}: HeroIntentCopyProps) {
  return (
    <div className="intent-copy">
      <div className="intent-kicker">
        <span>{kickerLine1}</span>
        <span>{kickerLine2}</span>
        <i />
      </div>

      <h1 className="intent-title" ref={titleRef} aria-label={titleAria}>
        <span className="intent-title-small">
          <Letters text={titleSmall} />
        </span>
        <strong>
          <Letters text={titleMain} />
        </strong>
        <span className="intent-title-result">
          <span>
            <Letters text={titleConnector} />
          </span>
          <strong>
            <Letters text={titleResult} />
          </strong>
        </span>
      </h1>

      <p className="intent-description">{description}</p>

      <a className="intent-cta" href="#products">
        <span className="intent-cta-arrow">
          <ArrowRight aria-hidden="true" size={21} strokeWidth={1.4} />
        </span>
        <span>{ctaLabel}</span>
      </a>
    </div>
  );
}

