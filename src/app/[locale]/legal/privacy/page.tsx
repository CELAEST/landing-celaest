import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("privacy.title")} | CELAEST`,
    description: t("privacy.description"),
  };
}

export default async function PrivacyPage({
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
          {t("privacy.title")}
        </h1>
        <p className="text-zinc-400 mb-12">
          {t("privacy.lastUpdated")}: {new Date().toLocaleDateString(locale)}
        </p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 leading-relaxed mb-6">
            {t("privacy.description")}
          </p>
        </div>
      </div>
    </main>
  );
}
