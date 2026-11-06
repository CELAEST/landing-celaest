import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ConstellationBackground } from "@/components/ui/constellation-background";
import { ArrowLeft, HelpCircle, Mail, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SUPPORT_EMAIL, DASHBOARD_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: `${t("title1")} ${t("title2")} | CELAEST`,
    description: t("subtitle"),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const questions = t.raw("questions") as FAQItem[];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8f7fb] relative flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">
      {/* Global Navigation Header */}
      <Header />

      {/* Atmospheric Subtle Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_10%,transparent_90%)]">
          <ConstellationBackground nodeCount={26} nodeAlpha={0.12} />
        </div>
      </div>

      {/* Main Editorial Container */}
      <main className="relative z-10 flex-grow pt-28 sm:pt-36 pb-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <header className="mb-14 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold uppercase tracking-widest mb-5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Base de Conocimiento & Soporte</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
            <span>{t("title1")} </span>
            <span className="text-zinc-400 font-light">{t("title2")}</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </header>

        {/* Editorial Grid (Content + Sticky Index) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Questions Column */}
          <div className="lg:col-span-8 space-y-12">
            {questions.map((faq, idx) => {
              const num = String(idx + 1).padStart(2, "0");
              const id = `faq-${idx + 1}`;

              return (
                <article key={id} id={id} className="scroll-mt-32">
                  {/* Number Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-semibold text-purple-400/90 tracking-wider">
                      PREGUNTA {num}
                    </span>
                  </div>

                  {/* Question Heading */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3">
                    {faq.question}
                  </h2>

                  {/* 65px Subtle Violet Hairline Divider */}
                  <div className="h-px w-16 bg-gradient-to-r from-purple-500/70 via-purple-400/40 to-transparent mb-5" />

                  {/* Answer Text */}
                  <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                    <p>{faq.answer}</p>
                  </div>

                  {/* Section Bottom Demarcation */}
                  <div className="mt-10 pt-4 border-b border-white/[0.06]" />
                </article>
              );
            })}
          </div>

          {/* Sticky Sidebar Index */}
          <aside
            className="hidden lg:block lg:col-span-4 sticky top-28 self-start"
            aria-label="Índice de preguntas"
          >
            <div className="bg-[#0a0a0c]/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4 pb-3 border-b border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>Índice Rápido</span>
              </div>

              <nav className="space-y-2 mb-6">
                {questions.map((faq, idx) => {
                  const num = String(idx + 1).padStart(2, "0");
                  const id = `faq-${idx + 1}`;

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="group flex items-start gap-2.5 text-xs text-zinc-400 hover:text-white transition-colors py-1"
                    >
                      <span className="font-mono text-purple-400/70 group-hover:text-purple-300 shrink-0">
                        {num}
                      </span>
                      <span className="line-clamp-2 leading-relaxed">{faq.question}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Assistance Footnote */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  ¿Tienes una duda técnica específica o requieres un acuerdo SLA a la medida?
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=Consulta%20Tecnica`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-purple-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Escribir a {SUPPORT_EMAIL}</span>
                  </a>
                  <a
                    href={`${DASHBOARD_URL}/?tab=docs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver Documentación Técnica</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Global Landing Footer */}
      <Footer />
    </div>
  );
}
