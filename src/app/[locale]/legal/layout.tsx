import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LegalTabs } from "@/components/legal/legal-tabs";
import { ConstellationBackground } from "@/components/ui/constellation-background";

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "legal.nav" });

  const navLabels = {
    terms: t("terms"),
    privacy: t("privacy"),
    license: t("license"),
    cookies: t("cookies"),
  };

  return (
    <div className="min-h-screen bg-[#020202] text-brand-ice relative flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">
      {/* Global Header */}
      <Header />

      {/* Atmospheric Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/[0.04] blur-[140px] rounded-full" />
        <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] bg-violet-600/[0.03] blur-[160px] rounded-full" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_10%,transparent_90%)]">
          <ConstellationBackground nodeCount={25} nodeAlpha={0.15} />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Tabs */}
        <div className="mb-10 sm:mb-12 flex justify-start sm:justify-center">
          <LegalTabs navLabels={navLabels} />
        </div>

        {children}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
