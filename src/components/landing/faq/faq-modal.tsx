"use client";

import React, { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, Mail } from "lucide-react";
import { FAQAccordion, type FAQItem } from "./faq-accordion";
import { SUPPORT_EMAIL } from "@/lib/constants";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const t = useTranslations("faq");
  const faqs = t.raw("questions") as FAQItem[];

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="faq-modal-title"
            className="relative w-full max-w-3xl bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(167,139,250,0.1)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/[0.08] bg-[#0c0c0e]/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="faq-modal-title"
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    <span>{t("title1")} </span>
                    <span className="text-zinc-400 font-normal">{t("title2")}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">{t("subtitle")}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all text-xs font-medium border border-white/5"
                aria-label="Cerrar preguntas frecuentes"
              >
                <span className="hidden sm:inline text-[11px] text-zinc-400 uppercase tracking-wider">
                  Esc
                </span>
                <X className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Scrollable Questions Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <FAQAccordion items={faqs} />
            </div>

            {/* Footer with Support CTA */}
            <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#0c0c0e]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <span>
                ¿Tienes preguntas técnicas adicionales o necesitas un acuerdo SLA personalizado?
              </span>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Consulta%20Frecuente`}
                className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-medium transition-colors shrink-0"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contactar a {SUPPORT_EMAIL}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
