import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function LegalIndexPage() {
  const locale = await getLocale();
  redirect(`/${locale}/legal/terms`);
}
