import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  renderCalloutCard,
  KeyValueRow,
  escapeHtml,
} from "../layout";

export interface PaymentFailedData {
  customerName: string;
  planName: string;
  amount: string;
  currency: string;
  last4: string;
  retryDate: string;
  updatePaymentUrl: string;
  locale?: "es" | "en";
}

export function renderPaymentFailedEmail(data: PaymentFailedData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Acción requerida: Pago no procesado" : "Action Required: Payment Failed";
  const greeting = data.customerName;
  const intro = isEs
    ? `No pudimos procesar el cobro de tu suscripción CELAEST con la tarjeta registrada. A continuación se presentan los detalles del intento de cobro:`
    : `We were unable to process your recurring CELAEST payment with your card on file. Below are the details of the failed charge:`;
  const consequence = isEs
    ? `Realizaremos un nuevo intento automático de cobro el <strong>${escapeHtml(data.retryDate)}</strong>. Para evitar la interrupción de tus servicios de IA y pipelines de automatización, por favor actualiza tu información de pago.`
    : `We will automatically retry on <strong>${escapeHtml(data.retryDate)}</strong>. To prevent any downtime to your automated pipelines and AI services, please update your payment method.`;
  const buttonText = isEs ? "Actualizar Método de Pago" : "Update Payment Method";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Plan Afectado" : "Impacted Plan",
      value: escapeHtml(data.planName),
    },
    {
      label: isEs ? "Monto Pendiente" : "Amount Due",
      value: escapeHtml(`${data.amount} ${data.currency}`),
      highlight: "danger",
    },
    {
      label: isEs ? "Tarjeta" : "Card on File",
      value: escapeHtml(isEs ? `Terminada en ${data.last4}` : `Ending in ${data.last4}`),
    },
    {
      label: isEs ? "Próximo Reintento" : "Next Retry Date",
      value: escapeHtml(data.retryDate),
      isMono: true,
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
    ${renderCalloutCard(consequence, "danger")}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Pago Fallido" : "Payment Failed",
      variant: "danger",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.updatePaymentUrl,
      variant: "danger",
    },
    secondaryNote: isEs
      ? "Si consideras que este error es incorrecto o tu banco rechazó la transacción por seguridad internacional, contacta a billing@celaest.com."
      : "If you believe this is in error or your issuing bank blocked international processing, contact billing@celaest.com.",
    locale: data.locale,
  });

  const text = `${title}
==================================================

Hola, ${data.customerName}

${intro}

Detalles:
- Plan: ${data.planName}
- Monto: ${data.amount} ${data.currency}
- Tarjeta: Terminada en ${data.last4}
- Próximo reintento: ${data.retryDate}

Actualiza tu método de pago en:
[ ${buttonText} ]: ${data.updatePaymentUrl}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
