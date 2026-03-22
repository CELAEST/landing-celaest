import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("privacy.title")} | Celaest`,
    description: t("privacy.description"),
  };
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
          {t("privacy.title")}
        </h1>
        <p className="text-zinc-400 mb-12">
          {t("privacy.lastUpdated")}: {new Date().toLocaleDateString(locale)}
        </p>
        
        <div className="prose prose-invert prose-zinc max-w-none">
          {/* Aquí el equipo legal inyectará las verdaderas cláusulas. */}
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">1. Recopilación de Datos</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Este es un documento placeholder preparado para inyectar su política de privacidad real.
            Cumple con todas las normas de rastreo de Tailwind y Server-Side Rendering (SSR).
          </p>
          
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">2. Uso de la Información</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
             La información recopilada se utilizará exclusivamente para proveer el servicio Celaest.
          </p>
        </div>
      </div>
    </main>
  );
}
