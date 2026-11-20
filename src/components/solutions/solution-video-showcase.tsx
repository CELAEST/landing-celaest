"use client";

import React, { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface SolutionVideoShowcaseProps {
  videoId: string;
  posterUrl?: string;
  eyebrow: string;
  title: string;
  description: string;
  playLabel: string;
  watchExternalLabel: string;
}

/**
 * Lightweight click-to-load 16:9 YouTube facade preserving 100/100 Performance & Best Practices.
 */
export function SolutionVideoShowcase({
  videoId,
  posterUrl,
  eyebrow,
  title,
  description,
  playLabel,
  watchExternalLabel,
}: SolutionVideoShowcaseProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailSrc = posterUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section
      aria-labelledby={`video-heading-${videoId}`}
      className="py-12 sm:py-16 border-b border-[#24242b]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#a855f7] block mb-2">
            {eyebrow}
          </span>
          <h2 id={`video-heading-${videoId}`} className="sol-section-heading">
            {title}
          </h2>
          <p className="text-sm text-[#b4b3c0] mt-2 max-w-2xl">{description}</p>
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b4b3c0] hover:text-white border border-[#24242b] hover:border-purple-400/50 rounded-full px-4 py-2 transition-colors shrink-0 self-start md:self-auto"
        >
          <span>{watchExternalLabel}</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#a855f7]" aria-hidden="true" />
        </a>
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#24242b] bg-[#08080c] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
        {isLoaded ? (
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={playLabel}
            className="group relative w-full h-full block text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailSrc}
              alt={title}
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-300"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col items-center justify-center p-6">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7c3aed]/90 group-hover:bg-[#8b5cf6] border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.55)] transition-transform duration-200 group-hover:scale-105">
                <Play
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-4 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 text-xs font-mono uppercase tracking-widest text-white">
                {playLabel}
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
