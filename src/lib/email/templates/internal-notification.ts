import { ContactFormData } from "../types";

export function renderInternalNotificationEmail(data: ContactFormData): {
  html: string;
  text: string;
} {
  const subject = `[Nuevo Lead CELAEST] ${data.subject || "Contacto Web"} - ${data.name}`;
  const timestamp = new Date().toISOString();

  const text = `NUEVA SOLICITUD DE CONTACTO / LEAD DESDE LA LANDING PAGE

Fecha: ${timestamp}
Nombre: ${data.name}
Email: ${data.email}
Empresa: ${data.company || "No especificada"}
Idioma / Locale: ${data.locale || "es"}
Asunto: ${data.subject || "No especificado"}

Mensaje:
${data.message}

---
Panel de Administración CELAEST`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
  <style>
    body {
      background-color: #050508;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 24px;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background: #0B0B14;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 32px;
    }
    .badge {
      display: inline-block;
      background: rgba(139, 92, 246, 0.2);
      border: 1px solid #8B5CF6;
      color: #C4B5FD;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h2 {
      margin: 0 0 20px;
      color: #FFFFFF;
      font-size: 20px;
    }
    .field {
      margin-bottom: 14px;
      font-size: 14px;
    }
    .label {
      color: #64748B;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
    }
    .value {
      color: #F8FAFC;
      margin-top: 2px;
    }
    .value a {
      color: #A855F7;
    }
    .message-block {
      margin-top: 20px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      border-left: 3px solid #A855F7;
      color: #CBD5E1;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">NUEVO LEAD CELAEST</div>
    <h2>${escapeHtml(data.subject || "Solicitud de Contacto")}</h2>
    <div class="field">
      <div class="label">Nombre del Contacto</div>
      <div class="value">${escapeHtml(data.name)}</div>
    </div>
    <div class="field">
      <div class="label">Correo Electrónico</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
    </div>
    ${
      data.company
        ? `<div class="field">
            <div class="label">Empresa / Organización</div>
            <div class="value">${escapeHtml(data.company)}</div>
          </div>`
        : ""
    }
    <div class="field">
      <div class="label">Idioma de Origen</div>
      <div class="value">${escapeHtml(data.locale?.toUpperCase() || "ES")}</div>
    </div>
    <div class="field">
      <div class="label">Timestamp UTC</div>
      <div class="value" style="font-family: monospace; font-size: 12px; color: #94A3B8;">${timestamp}</div>
    </div>

    <div class="label" style="margin-top: 24px;">Mensaje Completo</div>
    <div class="message-block">${escapeHtml(data.message)}</div>
  </div>
</body>
</html>`;

  return { html, text };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
