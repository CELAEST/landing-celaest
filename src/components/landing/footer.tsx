"use client";

import { useTranslations } from "next-intl";
import { Github, Mail } from "lucide-react";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { FooterBrandColumn } from "./footer/footer-brand-column";
import { FooterLinks } from "./footer/footer-links";
import { FooterWordmark } from "./footer/footer-wordmark";
import { FooterBottomBar } from "./footer/footer-bottom-bar";
import { SUPPORT_EMAIL } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");

  const linkGroupKeys = ["product", "company", "support", "legal"] as const;
  const groups = linkGroupKeys.map((key) => ({
    key,
    title: t(`links.${key}.title`),
    items: t.raw(`links.${key}.items`) as string[],
  }));

  const socialLinks = [
    { icon: Github, href: "https://github.com/celaest", label: "GitHub" },
    { icon: Mail, href: `mailto:${SUPPORT_EMAIL}`, label: "Email" },
  ];

  return (
    <footer className="bg-brand-dark relative overflow-hidden">
      {/* Section Demarcation Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />

      {/* Background Graphic - Premium SVG + CSS Mesh Gradient */}
      <div className="absolute inset-0 h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[300px] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[300px] bg-purple-700/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_70%,transparent_100%)]">
          <ConstellationBackground nodeCount={90} />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16 relative z-20"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.95)" }}
      >
        {/* Large CELAEST Brand Wordmark - Centered */}
        <div className="mb-20 sm:mb-28 flex justify-center w-full">
          <FooterWordmark />
        </div>

        {/* Main Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14 sm:mb-16">
          <FooterBrandColumn description={t("brand.description")} socialLinks={socialLinks} />
          <FooterLinks groups={groups} />
        </div>

        {/* Bottom Bar */}
        <FooterBottomBar
          copyright={t("copyright")}
          madeWith={t("madeWith")}
          forProfessionals={t("forProfessionals")}
        />
      </div>
    </footer>
  );
}
