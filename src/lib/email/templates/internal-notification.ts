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
  const intro = `Acaba de llegar una nueva consulta a través del formulario de contacto de la web:`;

  const rows: KeyValueRow[] = [
    {
      label: "Nombre",
      value: escapeHtml(data.name),
      highlight: "default",
    },
    {
      label: "Correo",
      value: `<a href="mailto:${escapeHtml(data.email)}" style="color: #4F46E5; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>`,
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
      label: "Idioma en web",
      value: escapeHtml((data.locale || "es").toUpperCase()),
      isMono: true,
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    <div style="background-color: #EEF2FF; border-radius: 10px; padding: 16px 20px; margin: 16px 0;">
      <div style="font-size: 11.5px; text-transform: uppercase; color: #4F46E5; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 6px;">
        Mensaje escrito por el cliente:
      </div>
      <div style="font-size: 14px; color: #0F172A; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: "Nuevo Contacto",
      variant: "success",
    },
    intro,
    bodyHtml,
    ctaButton: {
      text: `Responder a ${data.name.split(" ")[0]} por correo`,
      url: `mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject || "Consulta CELAEST")}`,
      variant: "primary",
    },
    secondaryNote: "Recibido desde el formulario oficial de contacto en celaest.com.",
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
