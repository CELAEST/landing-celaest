"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LanguageSelector } from "./language-selector";
import { cn } from "@/lib/utils";

const DASHBOARD_URL = "https://celaest-dashboard.vercel.app/";

export function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[72px] sm:h-[82px] flex items-center justify-between px-5 sm:px-8 md:px-[clamp(26px,7.9vw,138px)] transition-all duration-300 ease-out",
        isScrolled
          ? "bg-[#020202]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent border-b border-transparent shadow-none",
      )}
    >
      {/* Brand Logo & Name */}
      <a
        className="inline-flex items-center gap-3 text-[#f8f7fb] text-[14px] sm:text-[15px] font-semibold tracking-[0.38em] sm:tracking-[0.42em] no-underline transition-all hover:drop-shadow-[0_0_14px_rgba(167,139,250,0.45)] notranslate group"
        href="#intent-hero"
        aria-label="CELAEST"
        translate="no"
        onClick={handleLogoClick}
      >
        <span className="inline-flex w-[19px] sm:w-[21px] h-[25px] sm:h-[27px] flex-shrink-0 filter drop-shadow-[0_0_12px_rgba(167,139,250,0.45)] transition-transform duration-300 group-hover:scale-105">
          <Logo color="#f8f7fb" />
        </span>
        <span>CELAEST</span>
      </a>

      {/* Header Actions (Language, Sign In, Sign Up) */}
      <div className="inline-flex items-center gap-2 sm:gap-4">
        <LanguageSelector />

        {/* Login / Sign In */}
        <a
          href={`${DASHBOARD_URL}?mode=signin`}
          className="text-[13px] sm:text-sm font-medium text-white/75 hover:text-white px-2.5 sm:px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200"
        >
          {t("signIn")}
        </a>

        {/* Register / Sign Up */}
        <a
          href={`${DASHBOARD_URL}?mode=signup`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/30 bg-white/[0.06] hover:bg-white/[0.14] hover:border-white/70 text-white text-[12px] sm:text-[13px] font-medium tracking-tight backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_6px_20px_rgba(167,139,250,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>{t("signUp")}</span>
          <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} className="text-white/80" />
        </a>
      </div>
    </header>
  );
}
