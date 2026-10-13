"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "¿Cómo funciona la orquestación en cascada de la malla de IA de CELAEST?",
    a: "CELAEST evalúa cada solicitud y la rutea predictivamente al nodo óptimo según costo, latencia y disponibilidad. Si el proveedor primario (por ejemplo Groq) reporta degradación o error 5xx, el middleware redirige instantáneamente a OpenAI GPT-4o o a nodos locales de respaldo en menos de 50ms, sin que tu cliente final experimente fallos.",
  },
  {
    q: "¿Nuestros datos o prompts son utilizados para re-entrenar modelos?",
    a: "No, bajo ninguna circunstancia. CELAEST opera bajo acuerdos comerciales de zero-retention (ZDR). Todos los datos se procesan en memoria volátil efímera y se desechan inmediatamente tras generar la respuesta.",
  },
  {
    q: "¿Cómo garantizan el aislamiento estricto entre organizaciones?",
    a: "Toda la capa de base de datos en PostgreSQL aplica aislamiento forzado por tenant. Ninguna consulta SQL se ejecuta sin el filtro parametrizado 'WHERE user_id = $1'. Las sesiones JWT se validan comprobando que la marca IssuedAt sea posterior a cualquier evento de revocación global.",
  },
  {
    q: "¿Qué diferencia a CELAEST de alojar vLLM u Ollama por nuestra cuenta?",
    a: "Alojar infraestructura propia requiere gestionar aprovisionamiento de GPU, auto-escalado ante picos, rotación de llaves, monitoreo de latencias y redundancia multirregión. CELAEST te entrega todo eso empaquetado como un SDK y una malla lista para producción con SLA del 99.99%.",
  },
  {
    q: "¿Tienen soporte para despliegues en VPC privada o en nuestras propias instalaciones?",
    a: "Sí. Para clientes del plan Enterprise ofrecemos el despliegue del broker de CELAEST dentro de tu propia infraestructura en AWS, GCP o bare-metal, con cumplimiento estricto de SOC2 Tipo II y residencia local de datos.",
  },
];

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)" }}
        >
          <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80">
            PREGUNTAS FRECUENTES
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-6">
          Preguntas Frecuentes de Ingeniería.
        </h2>
        <p className="text-base text-white/60 leading-relaxed font-normal">
          Todo lo que tu equipo técnico y de seguridad necesita saber antes de integrar.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 transition-colors overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
              >
                <span className="text-base font-semibold text-white/90 tracking-tight">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="shrink-0 text-white/50"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm text-white/65 leading-relaxed border-t border-white/5 mt-1">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
