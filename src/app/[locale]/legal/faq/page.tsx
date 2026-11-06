import { redirect } from "@/i18n/navigation";

export default async function LegalFAQRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/faq", locale });
}
