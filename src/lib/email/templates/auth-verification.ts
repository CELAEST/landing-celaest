export interface AuthVerificationData {
  name?: string;
  email: string;
  magicLinkUrl: string;
  code?: string;
  locale?: "es" | "en";
}

export function renderAuthVerificationEmail(data: AuthVerificationData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Verifica tu cuenta en CELAEST" : "Verify your CELAEST account";
  const greeting = data.name
    ? isEs
      ? `Hola, ${data.name}`
      : `Hello, ${data.name}`
    : isEs
      ? "Hola"
      : "Hello";
  const intro = isEs
    ? "Haz clic en el botón a continuación para verificar tu correo electrónico e ingresar de forma segura a tu cuenta de CELAEST:"
    : "Click the button below to verify your email address and securely log in to your CELAEST account:";
  const buttonText = isEs ? "Verificar y Acceder" : "Verify and Sign In";
  const codeNotice = isEs
    ? "O ingresa manualmente este código de verificación temporal:"
    : "Or enter this temporary verification code manually:";
  const expireNotice = isEs
    ? "Este enlace y código expiran en 15 minutos por seguridad."
    : "This link and code will expire in 15 minutes for security.";
  const ignoreNotice = isEs
    ? "Si no solicitaste este acceso, puedes ignorar este correo de forma segura."
    : "If you did not request this access, you can safely ignore this email.";

  const text = `${greeting}

${intro}
${data.magicLinkUrl}

${data.code ? `${codeNotice} ${data.code}\n\n` : ""}${expireNotice}
${ignoreNotice}

---
CELAEST Inc. · https://celaest.com
Enterprise Automation & AI Infrastructure`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(124, 58, 237, 0.15) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; }
    p { font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); color: #FFFFFF !important; font-weight: 600; font-size: 15px; padding: 14px 36px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45); }
    .code-box { background: rgba(255, 255, 255, 0.04); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 16px; text-align: center; margin: 24px 0; }
    .code { font-family: 'SF Mono', Consolas, monospace; font-size: 28px; font-weight: 700; letter-spacing: 0.25em; color: #A855F7; }
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
      <p>${intro}</p>

      <div class="btn-container">
        <a href="${data.magicLinkUrl}" class="btn">${buttonText} &rarr;</a>
      </div>

      ${
        data.code
          ? `<div class="code-box">
              <div style="font-size: 11px; text-transform: uppercase; color: #64748B; margin-bottom: 6px;">${codeNotice}</div>
              <div class="code">${data.code}</div>
            </div>`
          : ""
      }

      <p style="font-size: 13px; color: #64748B; margin-top: 24px;">${expireNotice}</p>
      <p style="font-size: 13px; color: #64748B;">${ignoreNotice}</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Seguridad de Acceso Cero-Confianza
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
