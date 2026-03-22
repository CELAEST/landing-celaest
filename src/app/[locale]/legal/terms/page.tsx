import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("terms.title")} | Celaest`,
    description: t("terms.description"),
  };
}

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
          {t("terms.title")}
        </h1>
        <p className="text-zinc-400 mb-12">
          {t("terms.lastUpdated")}: {new Date().toLocaleDateString(locale)}
        </p>
        
        <div className="prose prose-invert prose-zinc max-w-none">
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">1. Aceptación de los Términos</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Al acceder o utilizar Celaest, usted acepta estar sujeto a estos términos. 
            Este es un documento placeholder que debe ser reemplazado por la asesoría legal oficial.
          </p>
          
          <h2 className="text-xl text-white font-semibold mt-8 mb-4">2. Licencia de Uso (SaaS)</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
             La plataforma comercial se provee "tal cual" (AS-IS).
          </p>
        </div>
      </div>
    </main>
  );
}
