export interface SecurityAlertData {
  name?: string;
  email: string;
  device: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  locale?: "es" | "en";
}

export function renderSecurityAlertEmail(data: SecurityAlertData): { html: string; text: string } {
  const isEs = data.locale !== "en";
  const title = isEs ? "Nuevo inicio de sesión detectado" : "New sign-in detected";
  const greeting = data.name
    ? isEs
      ? `Hola, ${data.name}`
      : `Hello, ${data.name}`
    : isEs
      ? "Hola"
      : "Hello";
  const intro = isEs
    ? "Detectamos un nuevo inicio de sesión en tu cuenta CELAEST con los siguientes detalles de acceso:"
    : "We detected a new sign-in to your CELAEST account with the following access details:";
  const legitimateNotice = isEs
    ? "Si fuiste tú, puedes ignorar este mensaje."
    : "If this was you, you can safely ignore this alert.";
  const panicNotice = isEs
    ? "Si NO reconoces este acceso, te recomendamos congelar tu sesión de inmediato y restablecer tus credenciales:"
    : "If you DO NOT recognize this activity, please freeze your session immediately and reset your credentials:";
  const buttonText = isEs ? "Proteger mi Cuenta" : "Secure My Account";

  const text = `${greeting}

${intro}
- Dispositivo: ${data.device}
- Ubicación: ${data.location}
- Dirección IP: ${data.ipAddress}
- Hora UTC: ${data.timestamp}

${legitimateNotice}
${panicNotice}
https://app.celaest.com/security/lockout

---
CELAEST Security Desk`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(234, 179, 8, 0.12) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; }
    .info-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 18px 22px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
    .info-row:last-child { margin-bottom: 0; }
    .info-label { color: #64748B; font-weight: 600; text-transform: uppercase; font-size: 11px; }
    .info-val { color: #F8FAFC; font-weight: 500; }
    .panic-btn { display: inline-block; background: #DC2626; color: #FFFFFF !important; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
    .footer { padding: 20px 36px; background: #08080E; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CELAEST</div>
    </div>
    <div class="content">
      <h1>${title}</h1>
      <p style="color: #F8FAFC; font-weight: 600;">${greeting},</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">${intro}</p>

      <div class="info-card">
        <div class="info-row">
          <div class="info-label">${isEs ? "Dispositivo" : "Device"}</div>
          <div class="info-val">${data.device}</div>
        </div>
        <div class="info-row">
          <div class="info-label">${isEs ? "Ubicación estimada" : "Location"}</div>
          <div class="info-val">${data.location}</div>
        </div>
        <div class="info-row">
          <div class="info-label">${isEs ? "Dirección IP" : "IP Address"}</div>
          <div class="info-val" style="font-family: monospace;">${data.ipAddress}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Timestamp UTC</div>
          <div class="info-val" style="font-family: monospace;">${data.timestamp}</div>
        </div>
      </div>

      <p style="color: #64748B; font-size: 13px;">${legitimateNotice}</p>
      
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
        <p style="color: #FCA5A5; font-size: 13px; margin: 0 0 12px;">${panicNotice}</p>
        <a href="https://app.celaest.com/security/lockout" class="panic-btn">${buttonText}</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Monitoreo de Seguridad de Red
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
