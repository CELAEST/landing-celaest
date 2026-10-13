"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { ConstellationBackground } from "@/components/ui/constellation-background";

interface FAQ {
  question: string;
  answer: string;
}

const SupportNodeIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 100 100"
    className="w-[80px] h-[80px] mx-auto md:w-[96px] md:h-[96px] shrink-0 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
  >
    {/* Outer radar ping */}
    {active &&
      [0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          animate={{ r: [28, 48], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        />
      ))}

    {/* Spinning Scanner Target */}
    <motion.circle
      cx="50"
      cy="50"
      r="42"
      fill="none"
      stroke={active ? "rgba(34,211,238,0.4)" : "#333"}
      strokeWidth="1.5"
      strokeDasharray="30 60 10 60"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="36"
      fill="none"
      stroke={active ? "rgba(34,211,238,0.15)" : "#222"}
      strokeWidth="4"
      strokeDasharray="2 8"
      animate={{ rotate: active ? -360 : 0 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />

    {/* Central Core background */}
    <circle
      cx="50"
      cy="50"
      r="24"
      fill={active ? "rgba(34,211,238,0.1)" : "#0c0c0c"}
      stroke={active ? "#22d3ee" : "#333"}
      strokeWidth="2"
      className="transition-colors duration-500"
    />

    {/* Floating Chat/Support Object */}
    <g transform="translate(50, 48) scale(1)">
      <motion.path
        d="M -12 -10 L 12 -10 C 14.2 -10 16 -8.2 16 -6 L 16 6 C 16 8.2 14.2 10 12 10 L 4 10 L -4 16 L -4 10 L -12 10 C -14.2 10 -16 8.2 -16 6 L -16 -6 C -16 -8.2 -14.2 -10 -12 -10 Z"
        fill={active ? "rgba(34,211,238,0.15)" : "none"}
        stroke={active ? "#fff" : "#888"}
        strokeWidth="2"
        strokeLinejoin="round"
        animate={{ y: active ? [0, -3, 0] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dynamic Data Lines inside the chat bubble */}
      <motion.line
        x1="-8"
        y1="-3"
        x2="8"
        y2="-3"
        stroke={active ? "#22d3ee" : "#555"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="16"
        animate={{ strokeDashoffset: active ? [16, 0] : 0, y: active ? [0, -3, 0] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="-8"
        y1="3"
        x2="2"
        y2="3"
        stroke={active ? "#22d3ee" : "#555"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="10"
        animate={{ strokeDashoffset: active ? [10, 0] : 0, y: active ? [0, -3, 0] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
    </g>

    {/* Connecting dots (representing online operators) */}
    {active && (
      <g>
        <motion.circle
          cx="38"
          cy="38"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />
        <motion.circle
          cx="62"
          cy="62"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
        />
        <motion.circle
          cx="64"
          cy="34"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
        />
      </g>
    )}
  </svg>
);

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredCTA, setHoveredCTA] = useState<boolean>(false);
  const t = useTranslations("faq");

  const faqs = t.raw("questions") as FAQ[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Deep Space / High-End Foundation */}
      <div className="absolute inset-0 bg-brand-deep pointer-events-none" />

      {/* Top Center Ambient Lighting (Titles) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Bottom Center Ambient Lighting (CTA) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Giant Floor Perspective Grid (Subtle white/gray) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      {/* Dense Core Tech Grid (Cyan tint, concentrated in the middle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_40%_40%_at_50%_50%,#000_20%,transparent_80%)] pointer-events-none opacity-40" />

      {/* Drifting constellation — fade only at top so it flows seamlessly into the footer below. */}
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_100%)]">
        <ConstellationBackground />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader title1={t("title1")} title2={t("title2")} subtitle={t("subtitle")} />

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.06, 0.3) }}
              className="group"
            >
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "border-brand-neon/30 bg-gradient-to-b from-brand-gray to-brand-deep shadow-[0_10px_30px_-15px_rgba(34,211,238,0.2)]"
                    : "border-white/[0.05] bg-brand-dark hover:border-white/[0.1] hover:bg-brand-surface-alt"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left gap-4"
                  aria-expanded={openIndex === index}
                >
                  <span
                    className={`font-semibold text-sm sm:text-base transition-colors ${
                      openIndex === index ? "text-white" : "text-brand-soft"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-brand-neon/10 text-brand-neon rotate-0"
                        : "bg-white/5 text-brand-slate-light"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-0">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-4" />
                        <p className="text-brand-slate-light text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
          className={`mt-14 sm:mt-24 text-center rounded-3xl p-10 sm:p-14 relative overflow-hidden transition-all duration-700 cursor-pointer border backdrop-blur-xl ${
            hoveredCTA
              ? "border-brand-neon/40 shadow-[0_0_60px_rgba(34,211,238,0.15)] scale-[1.02]"
              : "border-white/[0.08] shadow-2xl"
          }`}
          style={{
            background: hoveredCTA
              ? "linear-gradient(180deg, rgba(20,20,25,0.7) 0%, rgba(2,2,2,0.95) 100%)"
              : "linear-gradient(180deg, rgba(20,20,25,0.4) 0%, rgba(4,4,4,0.8) 100%)",
          }}
        >
          {/* Internal Cyber Grid (gives it that tech feel) */}
          <div
            className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none transition-opacity duration-700 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_10%,transparent_100%)] ${hoveredCTA ? "opacity-100" : "opacity-40"}`}
          />

          {/* Spotlight directly behind the floating SVG */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_70%)] pointer-events-none transition-opacity duration-1000 ${hoveredCTA ? "opacity-100" : "opacity-30"}`}
          />

          {/* Subtle horizontal top edge glow (Glassmorphism highlight) */}
          <div
            className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-colors duration-700 ${hoveredCTA ? "via-brand-neon" : "via-white/20"}`}
          />

          {/* Inner radial gradient that aggressively pulses on hover */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.06)_0%,transparent_50%)] pointer-events-none transition-opacity duration-1000 ${hoveredCTA ? "opacity-100" : "opacity-0"}`}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Interactive Floating SVG Support Node */}
            <div className="mb-8">
              <SupportNodeIcon active={hoveredCTA} />
            </div>

            <h3
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight transition-colors duration-500 ${hoveredCTA ? "text-white" : "text-zinc-200"}`}
            >
              {t("stillQuestions")}
            </h3>

            <p
              className={`text-base sm:text-lg mb-10 max-w-lg mx-auto font-medium transition-colors duration-500 ${hoveredCTA ? "text-zinc-400" : "text-zinc-500"}`}
            >
              {t("supportDescription")}
            </p>

            <a
              href="mailto:support@celaest.com"
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl transition-all duration-500 overflow-hidden relative group/btn ${hoveredCTA ? "bg-brand-neon text-brand-dark shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-105" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
            >
              {/* Button inner shine effect */}
              {hoveredCTA && (
                <motion.div
                  className="absolute inset-0 w-full h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-y-1/2"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="relative z-10 text-sm sm:text-base uppercase tracking-wider">
                {t("contactSupport")}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 ${hoveredCTA ? "translate-x-1" : "translate-x-0"}`}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
