"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Shield, FileText, KeyRound, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalTabsProps {
  navLabels: {
    terms: string;
    privacy: string;
    license: string;
    cookies: string;
  };
}

export function LegalTabs({ navLabels }: LegalTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/legal/terms",
      label: navLabels.terms,
      icon: FileText,
      active: pathname.includes("/legal/terms"),
    },
    {
      href: "/legal/privacy",
      label: navLabels.privacy,
      icon: Shield,
      active: pathname.includes("/legal/privacy"),
    },
    {
      href: "/legal/license",
      label: navLabels.license,
      icon: KeyRound,
      active: pathname.includes("/legal/license"),
    },
    {
      href: "/legal/cookies",
      label: navLabels.cookies,
      icon: Cookie,
      active: pathname.includes("/legal/cookies"),
    },
  ];

  return (
    <nav
      aria-label="Legal document tabs"
      className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#09090d]/90 border border-white/[0.08] rounded-2xl backdrop-blur-md overflow-x-auto no-scrollbar"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0",
              tab.active
                ? "bg-white/10 text-white shadow-[0_2px_12px_rgba(167,139,250,0.18)] border border-purple-400/30"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]",
            )}
          >
            <Icon className={cn("w-4 h-4", tab.active ? "text-purple-400" : "text-zinc-500")} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
