"use client";

import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useGeoPricing } from "@/hooks/useGeoPricing";

type BillingCycle = "monthly" | "yearly";

interface PricingTier {
  id: "starter" | "professional" | "enterprise";
  backendCode: string | null;
  name: string;
  badge?: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

const TIERS: PricingTier[] = [
  {
    id: "starter",
    backendCode: "pro",
    name: "Starter",
    description: "Ideal para desarrolladores independientes y pequeños equipos probando la malla de IA.",
    features: [
      "Hasta 50,000 llamadas a la malla / mes",
      "Ruteo determinista de modelos Groq & Llama",
      "SLA de disponibilidad del 99.9%",
      "Soporte estándar de la comunidad y Discord",
      "1 Clúster regional dedicado",
    ],
    ctaText: "Comenzar con Starter",
    ctaHref: "https://celaest-dashboard.vercel.app/signup",
  },
  {
    id: "professional",
    backendCode: "enterprise",
    name: "Professional",
    badge: "MÁS POPULAR",
    popular: true,
    description: "Para empresas y productos en producción que requieren latencia mínima y cero fallos.",
    features: [
      "Llamadas a la malla ilimitadas con auto-scaling",
      "Cascada completa multi-proveedor (Groq, OpenAI, Ollama)",
      "Caché adaptativo de prompts en RAM distribuida",
      "SLA de 99.99% con compensación garantizada",
      "Regiones multi-nodo con replicación automática",
      "Soporte prioritario 24/7 con canal privado Slack",
    ],
    ctaText: "Activar Plan Professional",
    ctaHref: "https://celaest-dashboard.vercel.app/signup?plan=pro",
  },
  {
    id: "enterprise",
    backendCode: null,
    name: "Enterprise",
    badge: "CUSTOM CLUSTER",
    description: "Infraestructura dedicada, enclaves privados y acuerdos de nivel de servicio a medida.",
    features: [
      "Clúster privado en nube propia o VPC dedicada",
      "Modelos afinados (Fine-tuned) en hardware reservado",
      "Acuerdo de confidencialidad BAA / HIPAA / SOC2",
      "Ingeniero de soluciones dedicado asignado",
      "Facturación consolidada anual con orden de compra",
    ],
    ctaText: "Contactar a un Ingeniero",
    ctaHref: "https://celaest-dashboard.vercel.app/contact",
  },
];

export function PricingV2() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  const {
    pricing,
    currency,
    isForcedUSD,
    toggleCurrencyOverride,
    getPlanPrice,
  } = useGeoPricing(locale);

  // Calcular porcentaje de ahorro real anual
  const savingsPercent = useMemo(() => {
    const ref = pricing?.plans?.find(
      (p) =>
        p.plan_code.toLowerCase() === "pro" ||
        p.plan_code.toLowerCase() === "enterprise"
    );
    if (!ref) return 17;
    const monthlyAnnualized = ref.local_price_monthly * 12;
    if (monthlyAnnualized <= 0 || ref.local_price_yearly <= 0) return 17;
    const saved = monthlyAnnualized - ref.local_price_yearly;
    return Math.max(0, Math.round((saved / monthlyAnnualized) * 100));
  }, [pricing]);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80">
            PRECIOS TRANSPARENTES
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-6">
          Escala sin Fricción.{" "}
          <span className="text-white/50 font-normal">
            Paga Solo por Capacidad Real.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
          Sin costos ocultos, sin penalizaciones por volumen y con garantía de reembolso de 14 días.
        </p>

        {/* Controles de Ciclo y Moneda */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {/* Toggle Mensual / Anual con Físicas */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setCycle("monthly")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                cycle === "monthly" ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {cycle === "monthly" && (
                <motion.div
                  layoutId="activeCycle"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Facturación Mensual</span>
            </button>

            <button
              onClick={() => setCycle("yearly")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                cycle === "yearly" ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {cycle === "yearly" && (
                <motion.div
                  layoutId="activeCycle"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Facturación Anual</span>
              <span className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                -{savingsPercent}%
              </span>
            </button>
          </div>

          {/* Selector de Moneda Geolocalizada */}
          <button
            onClick={toggleCurrencyOverride}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-white/60 hover:text-white text-xs font-mono transition-all"
            title="Cambiar entre moneda local y USD"
          >
            <Globe className="w-3.5 h-3.5 text-white/40" />
            <span>Moneda: {currency.code}</span>
          </button>
        </div>
      </div>

      {/* Grid de 3 Tarjetas con Lujo Obsidiana */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {TIERS.map((tier) => {
          const priceData = tier.backendCode
            ? getPlanPrice(tier.backendCode, cycle)
            : null;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "bg-gradient-to-b from-white/[0.12] to-white/[0.03] border-2 border-violet-500/40 shadow-2xl scale-[1.03] z-10"
                  : "bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-white/20"
              }`}
              style={{
                boxShadow: tier.popular
                  ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 30px 60px -15px rgba(139, 92, 246, 0.2)"
                  : "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 20px 40px -15px rgba(0,0,0,0.6)",
              }}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-violet-600 text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-6 min-h-[36px]">
                  {tier.description}
                </p>

                {/* Precio */}
                <div className="mb-8 pb-6 border-b border-white/[0.08]">
                  {priceData ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        {priceData.formattedNumber}
                      </span>
                      <span className="text-sm font-mono text-white/50">
                        {priceData.currencyCode} / {cycle === "monthly" ? "mes" : "año"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        A Medida
                      </span>
                      <span className="text-xs font-mono text-white/50">
                        Contrato SLA
                      </span>
                    </div>
                  )}
                </div>

                {/* Lista de Capacidades */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 leading-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de Acción */}
              <a
                href={tier.ctaHref}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  tier.popular
                    ? "bg-white text-black hover:bg-white/95 shadow-xl shadow-white/10"
                    : "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10"
                }`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
