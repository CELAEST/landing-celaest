"use client";

import React from "react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FooterBrandColumnProps {
  description: string;
  socialLinks: SocialLink[];
}

export function FooterBrandColumn({ description, socialLinks }: FooterBrandColumnProps) {
  return (
    <div className="col-span-2 md:col-span-1">
      <div className="flex items-center gap-2.5 mb-4 overflow-visible">
        <div className="w-10 h-10 flex items-center justify-center drop-shadow-[0_0_20px_rgba(167,139,250,0.75)]">
          <Logo color="#a78bfa" className="w-10 h-10" />
        </div>
        <span
          className="text-2xl font-black bg-gradient-to-r from-white via-brand-ice to-brand-slate-light bg-clip-text text-transparent tracking-tighter notranslate"
          translate="no"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.05em",
          }}
        >
          CELAEST
        </span>
      </div>
      <p className="text-zinc-300 text-xs leading-relaxed mb-5">{description}</p>
      <div className="flex gap-2">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            className="w-9 h-9 bg-black/25 rounded-lg flex items-center justify-center hover:bg-brand-neon/10 text-zinc-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-brand-neon/20 backdrop-blur-[2px]"
            aria-label={label}
          >
            <Icon className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
