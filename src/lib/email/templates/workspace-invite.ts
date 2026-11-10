import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  KeyValueRow,
  escapeHtml,
} from "../layout";

export interface WorkspaceInviteData {
  inviterName: string;
  organizationName: string;
  inviteeEmail: string;
  role: string;
  inviteUrl: string;
  locale?: "es" | "en";
}

export function renderWorkspaceInviteEmail(data: WorkspaceInviteData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs
    ? `${data.inviterName} te invitó a unirte a ${data.organizationName}`
    : `${data.inviterName} invited you to join ${data.organizationName}`;
  const intro = isEs
    ? `${data.inviterName} te ha invitado a formar parte del equipo de ${data.organizationName} en CELAEST. Podrás colaborar en proyectos de automatización, orquestación de IA y herramientas compartidas.`
    : `${data.inviterName} has invited you to join ${data.organizationName} on CELAEST. You will be able to collaborate on enterprise automation, AI pipelines, and shared workspace assets.`;
  const buttonText = isEs ? "Aceptar Invitación" : "Accept Invitation";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Organización" : "Organization",
      value: escapeHtml(data.organizationName),
    },
    {
      label: isEs ? "Invitado por" : "Invited By",
      value: escapeHtml(data.inviterName),
    },
    {
      label: isEs ? "Rol Asignado" : "Assigned Role",
      value: escapeHtml(data.role),
      highlight: "default",
    },
    {
      label: isEs ? "Expiración" : "Expires In",
      value: isEs ? "7 días" : "7 days",
      isMono: true,
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Workspace" : "Workspace",
      variant: "default",
    },
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.inviteUrl,
      variant: "primary",
    },
    secondaryNote: isEs
      ? "Si no esperabas esta invitación o no conoces a quien te invitó, puedes ignorar este mensaje de forma segura."
      : "If you were not expecting this invitation or do not know the inviter, you can safely ignore this email.",
    locale: data.locale,
  });

  const text = `${title}
==================================================

${intro}

Detalles:
- Organización: ${data.organizationName}
- Invitado por: ${data.inviterName}
- Rol: ${data.role}
- Validez: 7 días

Únete haciendo clic en:
[ ${buttonText} ]: ${data.inviteUrl}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
