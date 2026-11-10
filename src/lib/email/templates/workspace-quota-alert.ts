export interface QuotaAlertData {
  organizationName: string;
  adminName: string;
  percentageUsed: number;
  consumedTokens: string;
  totalTokens: string;
  resetDate: string;
  upgradeUrl: string;
  locale?: "es" | "en";
}

export function renderQuotaAlertEmail(data: QuotaAlertData): { html: string; text: string } {
  const isEs = data.locale !== "en";
  const title = isEs
    ? `Alerta: Has consumido el ${data.percentageUsed}% de tu cuota de IA`
    : `Alert: You have reached ${data.percentageUsed}% of your AI quota`;
  const is100 = data.percentageUsed >= 100;
  const intro = isEs
    ? is100
      ? `Tu organización ${data.organizationName} ha alcanzado el 100% de su presupuesto mensual de tokens de IA Mesh. Las ejecuciones no críticas se pausarán hasta la fecha de renovación.`
      : `Tu organización ${data.organizationName} ha consumido el ${data.percentageUsed}% de su presupuesto de IA (${data.consumedTokens} de ${data.totalTokens} tokens).`
    : is100
      ? `Your organization ${data.organizationName} has reached 100% of its monthly AI token budget. Non-critical background pipelines will be paused until renewal.`
      : `Your organization ${data.organizationName} has consumed ${data.percentageUsed}% of its AI token budget (${data.consumedTokens} of ${data.totalTokens} tokens).`;
  const buttonText = isEs ? "Aumentar Cuota de IA" : "Increase AI Quota";

  const text = `Hola, ${data.adminName}

${title}

${intro}
- Consumo actual: ${data.consumedTokens} / ${data.totalTokens} tokens (${data.percentageUsed}%)
- Próxima fecha de renovación: ${data.resetDate}

Para evitar interrupciones en tus agentes de IA, amplía tu plan en:
${data.upgradeUrl}

---
CELAEST IA Mesh Infrastructure`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(234, 179, 8, 0.14) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 21px; font-weight: 700; color: ${is100 ? "#EF4444" : "#F59E0B"}; margin: 0 0 16px; }
    .progress-bar-bg { background: rgba(255, 255, 255, 0.08); border-radius: 9999px; height: 10px; overflow: hidden; margin: 16px 0 8px; }
    .progress-fill { background: ${is100 ? "#EF4444" : "linear-gradient(90deg, #F59E0B, #E11D48)"}; height: 100%; border-radius: 9999px; width: ${Math.min(100, data.percentageUsed)}%; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); color: #FFFFFF !important; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
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
      <p style="color: #F8FAFC; font-weight: 600;">Hola, ${data.adminName}</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">${intro}</p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 18px; margin: 20px 0;">
        <div style="display: flex; justify-content: space-between; font-size: 13px;">
          <span style="color: #64748B;">Consumo mensual</span>
          <span style="color: #F8FAFC; font-weight: 600;">${data.consumedTokens} / ${data.totalTokens}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-fill"></div>
        </div>
        <div style="font-size: 12px; color: #64748B; margin-top: 6px;">Renovación automática el: ${data.resetDate}</div>
      </div>

      <div style="text-align: center;">
        <a href="${data.upgradeUrl}" class="btn">${buttonText} &rarr;</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; AI Mesh Token Shield
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
