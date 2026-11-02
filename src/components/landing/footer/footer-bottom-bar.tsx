"use client";

import React from "react";

interface FooterBottomBarProps {
  copyright: string;
  madeWith: string;
  forProfessionals: string;
}

export function FooterBottomBar({ copyright, madeWith, forProfessionals }: FooterBottomBarProps) {
  return (
    <div className="pt-7 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-300 text-xs">
          © {new Date().getFullYear()} CELAEST. {copyright}
        </p>
        <div className="flex items-center gap-2 text-zinc-300 text-xs">
          <span>{madeWith}</span>
          <span className="text-brand-neon">♥</span>
          <span>{forProfessionals}</span>
        </div>
      </div>
    </div>
  );
}
