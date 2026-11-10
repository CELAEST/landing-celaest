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
    ? "Gracias por comunicarte con el equipo de soluciones técnicas de CELAEST. Un especialista revisará tu consulta y te responderá en un plazo máximo de 24 horas hábiles."
    : "Thank you for reaching out to the CELAEST technical solutions team. A specialist will review your inquiry and get back to you within 24 business hours.";

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
      label: isEs ? "Remitente" : "Sender",
      value: escapeHtml(data.name ? `${data.name} &lt;${data.email}&gt;` : data.email),
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
      <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 6px;">
        ${isEs ? "Tu Consulta:" : "Your Message:"}
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
      ? "Puedes responder directamente a este correo si deseas agregar detalles adicionales a tu solicitud."
      : "You can reply directly to this email if you need to provide additional details.",
    locale: data.locale,
  });

  // Preserve text version with key fields for blackbox assertions
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
