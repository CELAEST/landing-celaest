import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { SolutionTabs } from "./solution-tabs";
import "@/components/legal/legal-editorial.css";
import "@/components/landing/architecture/architecture-editorial.css";
import "./solutions-editorial.css";

interface SolutionShellProps {
  children: React.ReactNode;
  backLabel: string;
  backHref?: string;
  tabLabels?: {
    overview: string;
    lingua: string;
    aiMesh: string;
    automation: string;
  };
  schemas?: Record<string, unknown>[];
}

/**
 * Shared Zero-Box Editorial layout shell matching LegalLayout & ArchitectureSection.
 */
export function SolutionShell({
  children,
  backLabel,
  backHref = "/",
  tabLabels,
  schemas = [],
}: SolutionShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f8f7fb] relative flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Header />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[850px] h-[520px] [background:radial-gradient(ellipse_at_center,rgba(147,51,234,0.04)_0%,transparent_70%)] rounded-full" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_10%,transparent_90%)]">
          <ConstellationBackground nodeCount={24} nodeAlpha={0.12} />
        </div>
      </div>

      <main className="relative z-10 flex-grow pt-28 sm:pt-36 pb-24 sm:pb-32 sol-editorial-container">
        <div className="mb-6 sm:mb-8">
          <Link
            href={backHref}
            prefetch={false}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {tabLabels && <SolutionTabs labels={tabLabels} />}

        {children}
      </main>

      <Footer />
    </div>
  );
}
