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
    { href: "#products", label: t("products"), id: "products" },
    { href: "#pricing", label: t("pricing"), id: "pricing" },
    { href: "#about", label: t("about"), id: "about" },
    { href: "#faq", label: t("faq"), id: "faq" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-brand-deep/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
              <Logo color="white" />
            </div>
            <span
              className="text-2xl font-black text-brand-ice tracking-tighter notranslate"
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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className="text-white hover:text-brand-mint transition-colors duration-300 font-medium"
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
              className="hidden md:block text-white hover:text-brand-mint transition-colors"
            >
              {t("signIn")}
            </a>
            <Button size="default" asChild>
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
