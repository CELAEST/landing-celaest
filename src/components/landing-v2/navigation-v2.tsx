"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";
import { LanguageSelector } from "@/components/landing/language-selector";
import { Logo } from "@/components/ui/logo";

export function NavigationV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#platform", label: t("platform") || "Plataforma" },
    { href: "#security", label: t("security") || "Seguridad" },
    { href: "#pricing", label: t("pricing") || "Precios" },
    { href: "#faq", label: t("faq") || "FAQ" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Enlace accesible Skip to Content para usuarios de teclado (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        Saltar al contenido principal
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#040811]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
        style={
          isScrolled
            ? {
                boxShadow: "inset 0 -1px 0 0 rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0,0,0,0.8)",
              }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand con Tipografía Precisa */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
              <Logo className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight text-base group-hover:text-violet-200 transition-colors">
                CELAEST
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase leading-none">
                AI MESH OS
              </span>
            </div>
          </a>

          {/* Enlaces de Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3.5 py-1 text-xs font-medium text-white/60 hover:text-white rounded-full hover:bg-white/[0.05] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Acciones: Idioma y Botón Principal a Dashboard / Clúster */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />

            <a
              href="https://celaest-dashboard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold border border-white/15 hover:border-white/25 backdrop-blur-xl transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 shadow-sm"
              style={{
                boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span>Consola Clúster</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileOpen && (
          <div className="md:hidden bg-[#040811]/95 border-b border-white/10 backdrop-blur-3xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-base font-medium text-white/80 hover:text-white py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://celaest-dashboard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-white text-black font-semibold text-sm mt-2 shadow-lg"
            >
              Ir a la Consola
            </a>
          </div>
        )}
      </header>
    </>
  );
}
