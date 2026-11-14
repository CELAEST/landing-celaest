import { renderEnterpriseEmailLayout, renderSecurityDossier } from "../layout";

export interface SecurityAlertData {
  name?: string;
  email: string;
  device: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  locale?: "es" | "en";
}

export function renderSecurityAlertEmail(data: SecurityAlertData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Nuevo inicio de sesión detectado" : "New sign-in detected";
  const greeting = data.name;
  const intro = isEs
    ? "Notamos que se acaba de iniciar sesión en tu cuenta de CELAEST desde un navegador o dispositivo nuevo. Te compartimos los datos para que verifiques que fuiste tú:"
    : "We noticed a sign-in to your CELAEST account from a new browser or device. Here are the details so you can confirm it was you:";
  const legitimateNotice = isEs
    ? "Si fuiste tú, no necesitas realizar ninguna acción."
    : "If this was you, no action is needed.";
  const panicNotice = isEs
    ? "Si no reconoces este acceso, cierra las sesiones activas de inmediato con el botón de abajo:"
    : "If you do not recognize this sign-in, close active sessions immediately below:";
  const buttonText = isEs
    ? "No fui yo: cerrar sesión y proteger cuenta"
    : "Not me: sign out & secure account";

  const bodyHtml = `
    ${renderSecurityDossier({
      device: data.device,
      location: data.location,
      ip: data.ipAddress,
      timestamp: data.timestamp,
    })}
    <div style="font-size: 13.5px; color: #334155; margin-bottom: 16px; line-height: 1.6;">
      <strong>${isEs ? "¿Fuiste tú?" : "Was this you?"}</strong> ${panicNotice}
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Aviso de Seguridad" : "Security Notice",
      variant: "warning",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: "https://app.celaest.com/security/lockout",
      variant: "danger",
    },
    secondaryNote: legitimateNotice,
    locale: data.locale,
  });

  const plainGreeting = greeting ? `Hola, ${greeting}\n\n` : "";
  const text = `${title}
==================================================

${plainGreeting}${intro}

Detalles:
- Dispositivo: ${data.device}
- Ubicación: ${data.location}
- Dirección IP: ${data.ipAddress}
- Fecha y hora: ${data.timestamp}

${legitimateNotice}
${panicNotice}
https://app.celaest.com/security/lockout

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
