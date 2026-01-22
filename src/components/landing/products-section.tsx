"use client";

import { useTranslations } from "next-intl";
import {
  FileSpreadsheet,
  Code2,
  Package,
  Shield,
  Zap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const FEATURES: Feature[] = [
  { icon: FileSpreadsheet, titleKey: "verified", descriptionKey: "verified" },
  { icon: Shield, titleKey: "secure", descriptionKey: "secure" },
  { icon: TrendingUp, titleKey: "roi", descriptionKey: "roi" },
  { icon: Code2, titleKey: "python", descriptionKey: "python" },
  { icon: Package, titleKey: "business", descriptionKey: "business" },
  { icon: Zap, titleKey: "instant", descriptionKey: "instant" },
];

export function ProductsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const t = useTranslations("products");

  return (
    <section ref={ref} id="products" className="py-24 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16 scroll-reveal",
            isVisible && "is-visible",
          )}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-deep mb-6">
            {t("title1")}
            <br />
            <span className="gradient-text">{t("title2")}</span>
          </h2>
          <p className="text-xl text-brand-slate-medium max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.titleKey}
                className={cn(
                  "group relative bg-gradient-to-br from-brand-ice to-white border border-brand-soft rounded-2xl p-8 card-hover overflow-hidden scroll-reveal",
                  isVisible && "is-visible",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/0 to-brand-mint/0 group-hover:from-brand-mint/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />

                {/* Icon */}
                <div className="relative w-16 h-16 bg-gradient-mint rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-mint/20">
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-brand-deep mb-3">
                  {t(`features.${feature.titleKey}.title`)}
                </h3>
                <p className="relative text-brand-slate-medium leading-relaxed">
                  {t(`features.${feature.descriptionKey}.description`)}
                </p>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-brand-mint rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button variant="secondary" size="lg" asChild>
            <a href="https://celaest-dashboard.vercel.app/?tab=marketplace">
              {t("exploreCTA")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
