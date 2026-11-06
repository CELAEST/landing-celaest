"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const isEn = locale === "en";

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("celaest_cookie_consent");
    if (!consent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("celaest_cookie_consent", "accepted");
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("celaest_cookie_consent", "essential");
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      role="region"
      aria-label={isEn ? "Cookie consent notification" : "Aviso de consentimiento de cookies"}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d18]/95 p-4 sm:p-5 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.65)] animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400 border border-purple-500/20 shrink-0">
          <Cookie className="h-4 w-4" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-white tracking-tight">
              {isEn ? "Privacy & Cookie Preferences" : "Privacidad y Cookies"}
            </h3>
            <button
              onClick={handleEssentialOnly}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
              aria-label={isEn ? "Close" : "Cerrar"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-3.5">
            {isEn ? (
              <>
                We use essential cookies and aggregated Google Analytics with IP anonymization to
                ensure platform security and performance. Read our{" "}
                <Link
                  href="/legal/cookies"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
                .
              </>
            ) : (
              <>
                Empleamos cookies esenciales y analítica anónima con Google Analytics para
                garantizar seguridad y rendimiento técnico. Consulta nuestra{" "}
                <Link
                  href="/legal/cookies"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  Política de Cookies
                </Link>
                .
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              type="button"
              className="flex-1 py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors cursor-pointer text-center"
            >
              {isEn ? "Accept All" : "Aceptar Todas"}
            </button>
            <button
              onClick={handleEssentialOnly}
              type="button"
              className="py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.06] text-xs font-medium transition-colors cursor-pointer"
            >
              {isEn ? "Essential Only" : "Solo Esenciales"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
