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
    ? `${data.inviterName} te invitó a unirte a ${data.organizationName} en CELAEST`
    : `${data.inviterName} invited you to join ${data.organizationName} on CELAEST`;
  const intro = isEs
    ? `${data.inviterName} te ha otorgado acceso como rol ${data.role} en el workspace de ${data.organizationName}. Podrás colaborar en pipelines de automatización, agentes de IA y herramientas compartidas.`
    : `${data.inviterName} has granted you access as ${data.role} in ${data.organizationName}. You can collaborate on automation pipelines, AI agents, and shared workspace tools.`;
  const buttonText = isEs ? "Aceptar Invitación" : "Accept Invitation";
  const expireNotice = isEs
    ? "Esta invitación es válida por 7 días."
    : "This invitation is valid for 7 days.";

  const text = `${title}

${intro}

Únete haciendo clic en:
${data.inviteUrl}

${expireNotice}

---
CELAEST Inc. · Workspace Collaboration`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(139, 92, 246, 0.16) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 21px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; line-height: 1.4; }
    .invite-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; }
    .org-title { font-size: 18px; font-weight: 700; color: #F8FAFC; margin-bottom: 4px; }
    .role-badge { display: inline-block; background: rgba(139, 92, 246, 0.2); border: 1px solid #8B5CF6; color: #C4B5FD; padding: 3px 10px; border-radius: 9999px; font-size: 11px; text-transform: uppercase; font-weight: 600; }
    .btn-container { text-align: center; margin: 32px 0 16px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); color: #FFFFFF !important; font-weight: 600; font-size: 15px; padding: 14px 36px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45); }
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
      <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">${intro}</p>

      <div class="invite-box">
        <div class="org-title">${data.organizationName}</div>
        <div class="role-badge">Rol: ${data.role}</div>
      </div>

      <div class="btn-container">
        <a href="${data.inviteUrl}" class="btn">${buttonText} &rarr;</a>
      </div>

      <p style="font-size: 12px; color: #64748B; text-align: center; margin-top: 16px;">${expireNotice}</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Workspace Enterprise
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
