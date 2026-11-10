import { ContactFormData } from "../types";
import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  KeyValueRow,
  escapeHtml,
} from "../layout";

export function renderInternalNotificationEmail(data: ContactFormData): {
  html: string;
  text: string;
} {
  const title = "NUEVO LEAD CELAEST";
  const intro = `Se ha registrado una nueva solicitud de contacto comercial o técnica desde la landing page institucional.`;

  const rows: KeyValueRow[] = [
    {
      label: "Prospecto / Nombre",
      value: escapeHtml(data.name),
      highlight: "default",
    },
    {
      label: "Email Corporativo",
      value: `<a href="mailto:${escapeHtml(data.email)}" style="color: #6D28D9; text-decoration: none;">${escapeHtml(data.email)}</a>`,
      isMono: true,
    },
    {
      label: "Empresa",
      value: escapeHtml(data.company || "No especificada"),
    },
    {
      label: "Asunto",
      value: escapeHtml(data.subject || "Consulta General"),
    },
    {
      label: "Idioma Detectado",
      value: escapeHtml((data.locale || "es").toUpperCase()),
      isMono: true,
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
      <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 6px;">
        Mensaje del Cliente:
      </div>
      <div style="font-size: 13.5px; color: #1E293B; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: "Alta Prioridad",
      variant: "warning",
    },
    intro,
    bodyHtml,
    ctaButton: {
      text: `Responder a ${data.name.split(" ")[0]}`,
      url: `mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject || "Consulta CELAEST")}`,
      variant: "primary",
    },
    secondaryNote: "Notificación interna despachada por el pipeline de eventos de CELAEST Cloud.",
    locale: data.locale,
  });

  const text = `NUEVO LEAD CELAEST
==================================================

Nombre: ${data.name}
Email: ${data.email}
Empresa: ${data.company || "No especificada"}
Asunto: ${data.subject || "No especificado"}

Mensaje:
${data.message}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
