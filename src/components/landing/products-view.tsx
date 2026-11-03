"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DynamicInfrastructure } from "./dynamic-infrastructure";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import "./products.css";

export function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="pt-0 pb-0 bg-brand-dark relative overflow-hidden">
      {/* Background Glows (Positioned safely below section seam) */}
      <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-brand-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Drifting constellation (subtle ambience) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={35} nodeAlpha={0.3} />
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Canonical Divided Layout (44% Content / 56% 3D Brain) */}
        <div className="prod-master-layout" style={{ borderBottom: "1px solid #24242b" }}>
          {/* LEFT HALF: Content & CTA */}
          <div className="prod-content-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="landing-section-title mb-6"
            >
              <span className="text-white font-semibold">{t("title1")} </span>
              <span className="text-brand-slate-light font-medium">{t("title2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brand-slate-light text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://celaest-dashboard.vercel.app/?tab=marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-neutral-200 text-neutral-900 font-medium rounded-full hover:bg-white transition-colors duration-300 gap-2.5 group"
              >
                {t("exploreCTA")}
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT HALF: Ultra-Premium B2B Infrastructure Diagram */}
          <div className="prod-stage-col">
            <DynamicInfrastructure />
          </div>
        </div>
      </div>
    </section>
  );
}
