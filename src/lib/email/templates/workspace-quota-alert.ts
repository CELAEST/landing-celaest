import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  renderCalloutCard,
  KeyValueRow,
  escapeHtml,
} from "../layout";

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

export function renderQuotaAlertEmail(data: QuotaAlertData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const is100 = data.percentageUsed >= 100;
  const title = isEs
    ? `Alerta de Capacidad: ${data.percentageUsed}% de cuota de IA consumida`
    : `Capacity Alert: ${data.percentageUsed}% of AI token quota consumed`;
  const greeting = data.adminName;
  const intro = isEs
    ? is100
      ? `Tu organización <strong>${escapeHtml(data.organizationName)}</strong> ha alcanzado el 100% de su límite mensual de tokens de IA Mesh. Las ejecuciones no críticas se pausarán hasta la próxima renovación.`
      : `Tu organización <strong>${escapeHtml(data.organizationName)}</strong> ha consumido el <strong>${data.percentageUsed}%</strong> de su presupuesto asignado de tokens de IA Mesh.`
    : is100
      ? `Your organization <strong>${escapeHtml(data.organizationName)}</strong> has reached 100% of its monthly AI token budget. Non-critical tasks will pause until your next billing cycle.`
      : `Your organization <strong>${escapeHtml(data.organizationName)}</strong> has consumed <strong>${data.percentageUsed}%</strong> of its monthly AI token budget.`;
  const buttonText = isEs ? "Aumentar Cuota de Tokens" : "Increase Token Budget";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Organización" : "Organization",
      value: escapeHtml(data.organizationName),
    },
    {
      label: isEs ? "Tokens Consumidos" : "Consumed Tokens",
      value: escapeHtml(`${data.consumedTokens} / ${data.totalTokens}`),
      isMono: true,
    },
    {
      label: isEs ? "Porcentaje de Uso" : "Usage Level",
      value: `${data.percentageUsed}%`,
      highlight: is100 ? "danger" : "warning",
    },
    {
      label: isEs ? "Próxima Renovación" : "Cycle Reset Date",
      value: escapeHtml(data.resetDate),
      isMono: true,
    },
  ];

  const calloutText = is100
    ? isEs
      ? "Para garantizar la continuidad operativa de tus agentes de IA sin interrupciones, considera escalar tu plan o habilitar consumo flexible."
      : "To prevent workflow pauses, please scale your workspace capacity or enable flexible billing."
    : isEs
      ? "Te notificamos preventivamente para que puedas ajustar las políticas de rate-limiting o ampliar la capacidad antes de alcanzar el tope."
      : "We notify you early so you can fine-tune rate limits or scale capacity before hitting your cap.";

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    ${renderCalloutCard(calloutText, is100 ? "danger" : "warning")}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: is100
        ? isEs
          ? "Límite Alcanzado"
          : "Cap Reached"
        : isEs
          ? "Consumo Elevado"
          : "High Usage",
      variant: is100 ? "danger" : "warning",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.upgradeUrl,
      variant: is100 ? "danger" : "primary",
    },
    secondaryNote: isEs
      ? "Puedes auditar el desglose de consumo por modelo y agente en https://app.celaest.com/analytics/tokens"
      : "You can audit token consumption per agent at https://app.celaest.com/analytics/tokens",
    locale: data.locale,
  });

  const text = `${title}
==================================================

Hola, ${data.adminName}

${intro.replace(/<[^>]+>/g, "")}

Detalles:
- Consumo: ${data.consumedTokens} / ${data.totalTokens} tokens (${data.percentageUsed}%)
- Próxima renovación: ${data.resetDate}

[ ${buttonText} ]: ${data.upgradeUrl}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
