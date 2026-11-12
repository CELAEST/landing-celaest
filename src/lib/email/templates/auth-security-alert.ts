import { renderEnterpriseEmailLayout, renderSecurityDossier, escapeHtml } from "../layout";

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
    ? "Detectamos un nuevo inicio de sesión en tu cuenta CELAEST con los siguientes detalles de conexión:"
    : "We detected a new sign-in to your CELAEST account with the following connection details:";
  const legitimateNotice = isEs
    ? "Si fuiste tú, no necesitas realizar ninguna acción. Este correo es únicamente un aviso informativo de seguridad."
    : "If this was you, no action is needed. This email is an informational security notice.";
  const panicNotice = isEs
    ? "Si NO reconoces esta actividad, te recomendamos bloquear la sesión de inmediato y actualizar tus credenciales:"
    : "If you DO NOT recognize this activity, please freeze your session immediately and reset your password:";
  const buttonText = isEs ? "Bloquear Sesión Inmediatamente" : "Lock Session & Revoke Tokens";

  const bodyHtml = `
    ${renderSecurityDossier({
      device: data.device,
      location: data.location,
      ip: data.ipAddress,
      timestamp: data.timestamp,
      tlsFingerprint: "TLS 1.3 · X25519 · AES-256-GCM",
    })}
    <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 14px 18px; font-size: 13.5px; color: #92400E; margin-bottom: 20px;">
      <strong>${isEs ? "¿No reconoces este acceso?" : "Do not recognize this?"}</strong> ${panicNotice}
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    categoryEyebrow: isEs ? "TELEMETRÍA // ALERTA DE SEGURIDAD" : "TELEMETRY // SECURITY ALERT",
    badge: {
      text: isEs ? "Alerta de Seguridad" : "Security Alert",
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
- Hora UTC: ${data.timestamp}

${legitimateNotice}
${panicNotice}
https://app.celaest.com/security/lockout

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
