"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { href: "#platform", label: t("platform"), id: "platform" },
    { href: "#products", label: t("products"), id: "products" },
    { href: "#security", label: t("security"), id: "security" },
    { href: "#pricing", label: t("pricing"), id: "pricing" },
    { href: "#faq", label: t("faq"), id: "faq" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-brand-deep/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group w-32"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <Logo color="#e2e8f0" />
            </div>
            <span
              className="text-2xl font-black bg-gradient-to-r from-white via-brand-ice to-brand-slate-light bg-clip-text text-transparent tracking-tighter notranslate transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              translate="no"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.05em",
              }}
            >
              CELEAST
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-4 lg:gap-8 xl:gap-14">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className="text-slate-400 hover:text-white transition-all duration-300 font-semibold text-base tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <a
              href="https://celaest-dashboard.vercel.app/?mode=signin"
              className="hidden md:block text-brand-slate-light hover:text-white transition-colors text-sm font-medium"
            >
              {t("signIn")}
            </a>
            <Button size="default" className="bg-brand-neon text-brand-dark hover:bg-brand-ice shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all font-bold tracking-wide" asChild>
              <a href="https://celaest-dashboard.vercel.app/?mode=signup">
                {t("getStarted")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
