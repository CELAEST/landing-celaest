import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("terms.title")} | CELAEST`,
    description: t("terms.description"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="min-h-screen bg-brand-dark text-brand-ice pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
          {t("terms.title")}
        </h1>
        <p className="text-zinc-400 mb-12">
          {t("terms.lastUpdated")}: {new Date().toLocaleDateString(locale)}
        </p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 leading-relaxed mb-6">
            {t("terms.description")}
          </p>
        </div>
      </div>
    </main>
  );
}
