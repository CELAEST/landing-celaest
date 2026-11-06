import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LegalTabs } from "@/components/legal/legal-tabs";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import "@/components/legal/legal-editorial.css";

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "legal.nav" });

  const navLabels = {
    terms: t("terms"),
    privacy: t("privacy"),
    refunds: t("refunds"),
    license: t("license"),
    cookies: t("cookies"),
    faq: t("faq"),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8f7fb] relative flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">
      {/* Global Landing Header */}
      <Header />

      {/* Atmospheric Background & Drift (Quiet & Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_10%,transparent_90%)]">
          <ConstellationBackground nodeCount={24} nodeAlpha={0.12} />
        </div>
      </div>

      {/* Master 1360px Editorial Container */}
      <main className="relative z-10 flex-grow pt-28 sm:pt-36 pb-24 sm:pb-32 legal-editorial-container">
        {/* Tetralogía Typographic Switcher */}
        <LegalTabs navLabels={navLabels} />

        {/* Document Body */}
        {children}
      </main>

      {/* Global Landing Footer */}
      <Footer />
    </div>
  );
}
