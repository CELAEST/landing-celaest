import { NewsletterFormData } from "../types";
import { renderEnterpriseEmailLayout, escapeHtml } from "../layout";

export function renderNewsletterWelcomeEmail(data: NewsletterFormData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Bienvenido al ecosistema CELAEST" : "Welcome to the CELAEST ecosystem";
  const intro = isEs
    ? "Te has suscrito exitosamente a las actualizaciones de arquitectura, automatización empresarial y avances en sistemas de inteligencia artificial de CELAEST."
    : "You have successfully subscribed to CELAEST architecture updates, enterprise automation insights, and AI systems breakthroughs.";

  const perks = isEs
    ? [
        "Lanzamientos anticipados de nuevos componentes y herramientas de automatización.",
        "Guías de ingeniería de alto rendimiento y arquitectura desacoplada.",
        "Actualizaciones de plataforma, integraciones y modelos de IA.",
      ]
    : [
        "Early access to new automation tools and production components.",
        "High-performance engineering playbooks and decoupled architecture guides.",
        "Platform updates, enterprise integrations, and AI model orchestration.",
      ];

  const perksListHtml = `
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px 22px; margin: 20px 0;">
      <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 12px;">
        ${isEs ? "Qué recibirás cada semana:" : "What to expect in your inbox:"}
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${perks
          .map(
            (p) => `<tr>
              <td width="20" style="color: #6D28D9; font-size: 16px; line-height: 1.6; vertical-align: top; padding-bottom: 8px;">&bull;</td>
              <td style="font-size: 13.5px; color: #334155; line-height: 1.6; padding-bottom: 8px;">${escapeHtml(p)}</td>
            </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Suscripción Activa" : "Active Subscription",
      variant: "success",
    },
    intro,
    bodyHtml: perksListHtml,
    ctaButton: {
      text: isEs ? "Explorar la Plataforma" : "Explore Platform",
      url: "https://celaest.com",
      variant: "primary",
    },
    secondaryNote: isEs
      ? "Cero spam garantizado. Puedes ajustar tus preferencias o desuscribirte con un solo clic en cualquier momento."
      : "Zero spam guaranteed. You can manage your preferences or unsubscribe at any time.",
    locale: data.locale,
  });

  const text = `${title}
==================================================

${intro}

${isEs ? "Qué recibirás:" : "What you will receive:"}
${perks.map((p) => `- ${p}`).join("\n")}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
