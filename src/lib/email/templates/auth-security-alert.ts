import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  KeyValueRow,
  escapeHtml,
} from "../layout";

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
  const buttonText = isEs ? "Asegurar mi Cuenta" : "Secure My Account";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Dispositivo" : "Device",
      value: escapeHtml(data.device),
    },
    {
      label: isEs ? "Ubicación" : "Location",
      value: escapeHtml(data.location),
    },
    {
      label: isEs ? "Dirección IP" : "IP Address",
      value: escapeHtml(data.ipAddress),
      isMono: true,
    },
    {
      label: isEs ? "Hora (UTC)" : "Timestamp (UTC)",
      value: escapeHtml(data.timestamp),
      isMono: true,
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    <p style="font-size: 13.5px; color: #64748B; margin-top: 20px; line-height: 1.6;">
      ${panicNotice}
    </p>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
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
