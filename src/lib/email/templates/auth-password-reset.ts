export interface PasswordResetData {
  name?: string;
  email: string;
  resetUrl: string;
  locale?: "es" | "en";
}

export function renderPasswordResetEmail(data: PasswordResetData): { html: string; text: string } {
  const isEs = data.locale !== "en";
  const title = isEs ? "Restablecimiento de contraseña" : "Password Reset Request";
  const greeting = data.name
    ? isEs
      ? `Hola, ${data.name}`
      : `Hello, ${data.name}`
    : isEs
      ? "Hola"
      : "Hello";
  const intro = isEs
    ? "Recibimos una solicitud para restablecer la contraseña de tu cuenta CELAEST. Para crear una nueva contraseña segura, haz clic en el siguiente enlace:"
    : "We received a request to reset your CELAEST account password. To set a new secure password, click the link below:";
  const buttonText = isEs ? "Restablecer Contraseña" : "Reset Password";
  const warning = isEs
    ? "Este enlace es de un solo uso y expirará en 15 minutos. Si tú no realizaste esta solicitud, ningún cambio ha ocurrido en tu cuenta y puedes desestimar este mensaje."
    : "This link is single-use and will expire in 15 minutes. If you did not make this request, no changes were made to your account and you can dismiss this email.";

  const text = `${greeting}

${intro}
${data.resetUrl}

${warning}

---
CELAEST Inc. · https://celaest.com
Enterprise Security Desk`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; }
    p { font-size: 15px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); color: #FFFFFF !important; font-weight: 600; font-size: 15px; padding: 14px 36px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45); }
    .warning-box { background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-left: 3px solid #EF4444; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #FCA5A5; line-height: 1.5; }
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
        <a href="${data.resetUrl}" class="btn">${buttonText} &rarr;</a>
      </div>

      <div class="warning-box">
        ${warning}
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Seguridad de Acceso Cero-Confianza
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
