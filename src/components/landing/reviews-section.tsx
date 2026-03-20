"use client";

import { useTranslations } from "next-intl";
import { Shield, Lock, Server } from "lucide-react";
import { motion } from "framer-motion";

export function ReviewsSection() {
  const t = useTranslations("security");

  const features = [
    {
      icon: Shield,
      title: t("features.verified.title"),
      description: t("features.verified.description"),
    },
    {
      icon: Lock,
      title: t("features.encryption.title"),
      description: t("features.encryption.description"),
    },
    {
      icon: Server,
      title: t("features.infrastructure.title"),
      description: t("features.infrastructure.description"),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#020202] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t("title1")}{" "}
            <span className="bg-gradient-to-r from-brand-neon to-brand-neon-blue bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>
          <p className="text-brand-slate-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-[#080808] border border-white/5 hover:border-brand-neon/20 transition-all duration-500 relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-neon/[0.07] border border-brand-neon/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-neon/10 group-hover:border-brand-neon/30 transition-all duration-500 shadow-[0_0_30px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                    <Icon
                      className="w-7 h-7 text-brand-neon"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-brand-slate-light text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
