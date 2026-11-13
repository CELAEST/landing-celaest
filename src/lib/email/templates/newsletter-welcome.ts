import { NewsletterFormData } from "../types";
import { renderEnterpriseEmailLayout, escapeHtml } from "../layout";

export function renderNewsletterWelcomeEmail(data: NewsletterFormData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Bienvenido al ecosistema CELAEST" : "Welcome to the CELAEST ecosystem";
  const intro = isEs
    ? "Hola, qué gusto tenerte aquí. Creamos CELAEST con una idea muy simple: ayudarte a pasar de la intención al resultado real, ahorrándote horas de trabajo repetitivo con herramientas y automatizaciones listas para usar desde el primer día."
    : "Hi there, great to have you with us. We built CELAEST to help you move from intent to real results by saving hours of manual work with ready-to-use automation tools.";

  const perks = isEs
    ? [
        {
          title: "1. Herramientas listas para descargar y usar",
          desc: "Lanzamientos anticipados de macros avanzadas de Excel (VBA), scripts de Python verificados y conectores listos para producción.",
        },
        {
          title: "2. Flujos de trabajo e IA con privacidad total",
          desc: "Automatiza procesos operativos bajo nuestra garantía de Cero-Entrenamiento: tu información siempre es 100% tuya.",
        },
        {
          title: "3. Mejoras y guías prácticas",
          desc: "Te compartiremos únicamente novedades útiles y casos prácticos para sacarle el máximo provecho a tus herramientas.",
        },
      ]
    : [
        {
          title: "1. Ready-to-use tools & scripts",
          desc: "Early access to verified Excel macros (VBA), production-ready Python scripts, and data connectors.",
        },
        {
          title: "2. Automated workflows & private AI",
          desc: "Automate daily processes under our strict Zero-Training guarantee: your data remains 100% yours.",
        },
        {
          title: "3. Practical guides & releases",
          desc: "We will only share useful updates and step-by-step guides to help you get the most out of your tools.",
        },
      ];

  const perksListHtml = `
    <div style="background-color: #F8FAFC; border-radius: 12px; padding: 20px 24px; margin: 20px 0;">
      <div style="font-size: 12px; text-transform: uppercase; color: #4F46E5; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 14px;">
        ${isEs ? "Qué tienes a tu alcance en CELAEST:" : "What you can do with CELAEST:"}
      </div>
      ${perks
        .map(
          (
            p,
            i,
          ) => `<div style="${i < perks.length - 1 ? "padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #E2E8F0;" : ""}">
            <div style="font-size: 14.5px; font-weight: 600; color: #0F172A;">${escapeHtml(p.title)}</div>
            <div style="font-size: 13.5px; color: #334155; margin-top: 3px; line-height: 1.55;">${escapeHtml(p.desc)}</div>
          </div>`,
        )
        .join("")}
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Bienvenida" : "Welcome",
      variant: "success",
    },
    intro,
    bodyHtml: perksListHtml,
    ctaButton: {
      text: isEs ? "Explorar el catálogo de CELAEST" : "Explore the CELAEST catalog",
      url: "https://celaest.com",
      variant: "primary",
    },
    secondaryNote: isEs
      ? "Promesa CELAEST: cero correo basura. Si tienes alguna duda sobre qué herramienta elegir, responde directamente a este correo."
      : "Our promise: zero spam. If you have questions about which tool fits your workflow, simply reply to this email.",
    locale: data.locale,
  });

  const text = `${title}
==================================================

${intro}

${isEs ? "Qué tienes a tu alcance:" : "What you can do:"}
${perks.map((p) => `- ${p.title}: ${p.desc}`).join("\n")}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
