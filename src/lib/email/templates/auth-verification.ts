import { renderEnterpriseEmailLayout, renderCodeBox } from "../layout";

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
  const title = isEs ? "Inicia sesión en CELAEST" : "Sign in to CELAEST";
  const greeting = data.name;
  const intro = isEs
    ? "Haz clic en el botón a continuación para ingresar de forma directa y segura a tu cuenta empresarial de CELAEST:"
    : "Click the button below to securely sign in to your CELAEST enterprise account:";
  const buttonText = isEs ? "Ingresar a mi Cuenta" : "Sign In to Account";
  const codeNotice = isEs
    ? "O ingresa manualmente este código temporal de un solo uso:"
    : "Or enter this temporary one-time code manually:";
  const expireNotice = isEs
    ? "Este enlace y código expiran en 15 minutos por motivos de seguridad."
    : "This link and code will expire in 15 minutes for security reasons.";
  const ignoreNotice = isEs
    ? "Si no solicitaste este acceso, puedes ignorar este mensaje de forma segura. Ningún cambio ha ocurrido en tu cuenta."
    : "If you did not request this access, you can safely ignore this email. No changes were made to your account.";

  const bodyHtml = `
    ${data.code ? renderCodeBox(data.code, codeNotice) : ""}
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-size: 13px; color: #64748B; line-height: 1.5;">
      ${expireNotice}
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Acceso Seguro" : "Secure Sign-In",
      variant: "default",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.magicLinkUrl,
      variant: "primary",
    },
    secondaryNote: ignoreNotice,
    locale: data.locale,
  });

  const plainGreeting = greeting ? `Hola, ${greeting}\n\n` : "";
  const text = `${title}
==================================================

${plainGreeting}${intro}

[ ${buttonText} ]: ${data.magicLinkUrl}

${data.code ? `${codeNotice}\nCódigo: ${data.code}\n\n` : ""}${expireNotice}
${ignoreNotice}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
