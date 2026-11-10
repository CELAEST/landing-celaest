import { renderEnterpriseEmailLayout, renderCalloutCard } from "../layout";

export interface PasswordResetData {
  name?: string;
  email: string;
  resetUrl: string;
  locale?: "es" | "en";
}

export function renderPasswordResetEmail(data: PasswordResetData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Restablecimiento de contraseña" : "Password Reset Request";
  const greeting = data.name;
  const intro = isEs
    ? "Recibimos una solicitud para restablecer la contraseña de tu cuenta CELAEST. Para crear una nueva credencial de acceso segura, haz clic en el siguiente enlace:"
    : "We received a request to reset your CELAEST account password. To set a new secure password, click the link below:";
  const buttonText = isEs ? "Restablecer Contraseña" : "Reset Password";
  const warningText = isEs
    ? "Este enlace es de un solo uso y expirará en 15 minutos por motivos de seguridad."
    : "This link is single-use and will expire in 15 minutes for security reasons.";
  const ignoreNotice = isEs
    ? "Si tú no realizaste esta solicitud, ningún cambio ha ocurrido en tu cuenta y puedes desestimar este mensaje con total tranquilidad."
    : "If you did not request this, no changes were made to your account and you can safely disregard this email.";

  const bodyHtml = `
    ${renderCalloutCard(warningText, "warning")}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Seguridad" : "Security",
      variant: "warning",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.resetUrl,
      variant: "primary",
    },
    secondaryNote: ignoreNotice,
    locale: data.locale,
  });

  const plainGreeting = greeting ? `Hola, ${greeting}\n\n` : "";
  const text = `${title}
==================================================

${plainGreeting}${intro}

[ ${buttonText} ]: ${data.resetUrl}

${warningText}
${ignoreNotice}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
