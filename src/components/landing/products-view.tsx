"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { ConstellationBackground } from "@/components/ui/constellation-background";

// Code-split the heavy R3F + GLTF brain bundle out of the products section's
// initial chunk. The component itself also viewport-gates its own Canvas.
const DynamicInfrastructure = dynamic(
  () => import("./dynamic-infrastructure").then((m) => ({ default: m.DynamicInfrastructure })),
  { ssr: false, loading: () => <div className="relative w-full h-[500px] md:h-[600px]" /> },
);

export function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="py-16 sm:py-24 bg-brand-deep relative overflow-hidden">
      {/* Background Glows (Subtle, professional) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-50" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-brand-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Drifting constellation (subtle ambience) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_50%_50%,#000_20%,transparent_90%)]">
        <ConstellationBackground nodeCount={55} nodeAlpha={0.3} />
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-14">
          {/* LEFT HALF: Content & CTA */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
                Developer API & SDK
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.15] mb-6"
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
          <div className="w-full lg:w-[55%] relative flex items-center justify-center lg:justify-end">
              <DynamicInfrastructure />
          </div>
        </div>
      </div>
    </section>
  );
}
