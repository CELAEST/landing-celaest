import { ContactFormData } from "../types";

export function renderContactConfirmationEmail(data: ContactFormData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Hemos recibido tu mensaje" : "We have received your message";
  const greeting = isEs ? `Hola, ${data.name}` : `Hello, ${data.name}`;
  const intro = isEs
    ? "Gracias por comunicarte con el equipo de ingeniería y soluciones de CELAEST. Un especialista técnico revisará tu consulta y te responderá en un plazo máximo de 24 horas hábiles."
    : "Thank you for reaching out to the CELAEST engineering and solutions team. A technical specialist will review your inquiry and reply within 24 business hours.";
  const summaryTitle = isEs ? "Resumen de tu consulta:" : "Summary of your inquiry:";
  const footerText = isEs
    ? "Este correo es una confirmación automática. Si necesitas agregar información adicional, puedes responder directamente a este mensaje."
    : "This email is an automated confirmation. If you need to add further details, you can reply directly to this message.";

  const text = `${greeting}

${intro}

${summaryTitle}
- Asunto / Subject: ${data.subject || (isEs ? "Consulta General" : "General Inquiry")}
${data.company ? `- Empresa / Company: ${data.company}` : ""}
- Mensaje:
${data.message}

${footerText}

---
CELAEST Inc. · https://celaest.com
Enterprise Automation & AI Infrastructure`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050508;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #0B0B14;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      padding: 36px 40px 24px;
      background: linear-gradient(180deg, rgba(124, 58, 237, 0.12) 0%, rgba(11, 11, 20, 0) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .logo {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #FFFFFF;
      text-transform: uppercase;
      margin: 0;
    }
    .logo-sub {
      color: #A855F7;
      font-size: 11px;
      letter-spacing: 0.1em;
      margin-top: 4px;
    }
    .content {
      padding: 36px 40px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0 0 16px;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #94A3B8;
      margin: 0 0 20px;
    }
    .summary-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      padding: 20px 24px;
      margin: 28px 0;
    }
    .summary-item {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .summary-item:last-child {
      margin-bottom: 0;
    }
    .summary-label {
      color: #64748B;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .summary-value {
      color: #F8FAFC;
    }
    .message-box {
      margin-top: 8px;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 8px;
      border-left: 3px solid #8B5CF6;
      color: #CBD5E1;
      font-size: 14px;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    .footer {
      padding: 24px 40px 32px;
      background: #08080E;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 12px;
      color: #64748B;
      line-height: 1.6;
      text-align: center;
    }
    .footer a {
      color: #A855F7;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CELAEST</div>
      <div class="logo-sub">ENTERPRISE AUTOMATION &amp; AI SYSTEMS</div>
    </div>
    <div class="content">
      <h1>${title}</h1>
      <p style="font-weight: 600; color: #F8FAFC; margin-bottom: 12px;">${greeting},</p>
      <p>${intro}</p>
      
      <div class="summary-card">
        <div class="summary-item">
          <div class="summary-label">${isEs ? "Asunto" : "Subject"}</div>
          <div class="summary-value">${data.subject || (isEs ? "Consulta General" : "General Inquiry")}</div>
        </div>
        ${
          data.company
            ? `<div class="summary-item" style="margin-top: 12px;">
                <div class="summary-label">${isEs ? "Empresa" : "Company"}</div>
                <div class="summary-value">${data.company}</div>
              </div>`
            : ""
        }
        <div class="summary-item" style="margin-top: 12px;">
          <div class="summary-label">${isEs ? "Tu Mensaje" : "Your Message"}</div>
          <div class="message-box">${escapeHtml(data.message)}</div>
        </div>
      </div>

      <p style="font-size: 13px; color: #64748B;">${footerText}</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. Todos los derechos reservados.<br>
      <a href="https://celaest.com">celaest.com</a> &middot; <a href="https://celaest.com/es/legal/privacy">Política de Privacidad</a>
    </div>
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
