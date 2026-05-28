"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");

  // Resolvemos la URL de forma segura para evitar Hydration Mismatch (.env en Server vs Client)
  const dashboardUrl = process.env.NEXT_PUBLIC_SAAS_DASHBOARD_URL || "https://app.celaest.com";

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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
    { href: "#products", label: t("products"), id: "products" },
    { href: "#platform", label: t("platform"), id: "platform" },
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
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector />
            <a
              href={`${dashboardUrl}?mode=signin`}
              className="hidden md:block text-brand-slate-light hover:text-white transition-colors text-sm font-medium"
            >
              {t("signIn")}
            </a>
            <Button
              size="default"
              className="hidden sm:inline-flex bg-brand-neon text-brand-dark hover:bg-brand-ice shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all font-bold tracking-wide"
              asChild
            >
              <a href={`${dashboardUrl}?mode=signup`}>{t("getStarted")}</a>
            </Button>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] text-brand-soft hover:text-white hover:border-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-brand-deep/98 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-200 ease-out origin-top",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className="py-4 text-brand-soft hover:text-white transition-colors font-semibold text-base tracking-wide border-b border-white/[0.04] last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <a
              href={`${dashboardUrl}?mode=signin`}
              className="w-full text-center py-3 text-brand-slate-light hover:text-white transition-colors text-sm font-medium border border-white/10 rounded-xl"
            >
              {t("signIn")}
            </a>
            <a
              href={`${dashboardUrl}?mode=signup`}
              className="w-full text-center py-3 bg-brand-neon text-brand-dark font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:brightness-110 transition-all"
            >
              {t("getStarted")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
