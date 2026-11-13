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
    ? "Ingresa este código de verificación en la pantalla donde estás iniciando sesión, o haz clic en el botón de abajo para entrar directamente a tu panel:"
    : "Enter this verification code on your sign-in screen, or click the button below to access your dashboard directly:";
  const buttonText = isEs ? "Entrar a mi cuenta de CELAEST" : "Sign in to my CELAEST account";
  const codeNotice = isEs ? "Código de verificación temporal:" : "Temporary verification code:";
  const expireNotice = isEs
    ? "Este enlace y código expiran en 15 minutos por motivos de seguridad."
    : "This link and code will expire in 15 minutes for security reasons.";
  const ignoreNotice = isEs
    ? "Si tú no solicitaste este código, puedes ignorar este mensaje con total tranquilidad; tu cuenta sigue protegida."
    : "If you did not request this code, you can safely ignore this email; your account remains secure.";

  const bodyHtml = `
    ${data.code ? renderCodeBox(data.code, codeNotice) : ""}
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
