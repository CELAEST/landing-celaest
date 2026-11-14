import { ContactFormData } from "../types";
import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  KeyValueRow,
  escapeHtml,
} from "../layout";

export function renderContactConfirmationEmail(data: ContactFormData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Hemos recibido tu mensaje" : "We have received your message";
  const greeting = data.name;
  const intro = isEs
    ? "Muchas gracias por escribirnos. Tu consulta ya está en manos de nuestro equipo en CELAEST; la estamos revisando y te responderemos personalmente a este mismo correo en menos de 24 horas hábiles."
    : "Thank you for reaching out to us. Your message is with the CELAEST team; we are reviewing it and will reply personally to this email within 24 business hours.";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Asunto" : "Subject",
      value: escapeHtml(
        data.subject || (isEs ? "Implementación Enterprise" : "Enterprise Solutions"),
      ),
    },
    ...(data.company
      ? [
          {
            label: isEs ? "Empresa" : "Company",
            value: escapeHtml(data.company),
          },
        ]
      : []),
    {
      label: isEs ? "Correo de respuesta" : "Reply-to email",
      value: escapeHtml(data.name ? `${data.name} <${data.email}>` : data.email),
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    <div style="background-color: #EEF2FF; border-radius: 10px; padding: 16px 20px; margin: 16px 0;">
      <div style="font-size: 11.5px; text-transform: uppercase; color: #4F46E5; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 6px;">
        ${isEs ? "Copia de tu mensaje:" : "Copy of your message:"}
      </div>
      <div style="font-size: 13.5px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Recibido" : "Received",
      variant: "success",
    },
    greeting,
    intro,
    bodyHtml,
    secondaryNote: isEs
      ? "¿Quieres agregar algún detalle adicional? Simplemente responde a este correo y se añadirá a tu solicitud."
      : "Need to add more details? Simply reply to this email and we will include it with your inquiry.",
    locale: data.locale,
  });

  const plainCompany = data.company ? `\nEmpresa: ${data.company}` : "";
  const plainSubject = data.subject || (isEs ? "Implementación Enterprise" : "AI Mesh Integration");
  const text = `${greeting ? `Hola, ${greeting}\n\n` : ""}${title}
==================================================

${intro}

Detalles:
- Asunto: ${plainSubject}${plainCompany}
- Mensaje:
${data.message}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
