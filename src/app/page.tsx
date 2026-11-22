import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CELAEST — Catálogo de Automatizaciones, Gestión de IA y Software",
  description:
    "CELAEST (celaest.com): compañía de software e IA con catálogo de automatizaciones empresariales, gestión de IA privada (Malla IA), proyectos de software y CELAEST Lingua.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      es: `${SITE_URL}/es`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/es`,
    },
  },
  openGraph: {
    title: "CELAEST — Catálogo de Automatizaciones, Gestión de IA y Software",
    description:
      "CELAEST: compañía de software e IA con catálogo de automatizaciones empresariales, gestión de IA privada (Malla IA), proyectos de software y Lingua.",
    url: `${SITE_URL}/es`,
    siteName: "CELAEST",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-banner-v2.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "CELAEST - AI Systems & Enterprise Automation Platform",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-v2.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-48-v2.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192-v2.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512-v2.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-v2.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-v2.ico",
    apple: [{ url: "/apple-icon-v2.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootPage() {
  redirect("/es");
}
