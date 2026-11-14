import { renderEnterpriseEmailLayout, renderReceiptBreakdown, escapeHtml } from "../layout";

export interface InvoiceReceiptData {
  customerName: string;
  email: string;
  invoiceNumber: string;
  planName: string;
  amount: string;
  currency: string;
  period: string;
  last4: string;
  invoicePdfUrl?: string;
  locale?: "es" | "en";
}

export function renderInvoiceReceiptEmail(data: InvoiceReceiptData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs
    ? "Recibo de Factura y Pago Exitoso"
    : "Payment Receipt & Invoice Confirmation";
  const greeting = data.customerName;
  const intro = isEs
    ? `Hemos procesado exitosamente el cobro recurrente de tu suscripción ${data.planName}. A continuación tienes el comprobante fiscal detallado:`
    : `We successfully processed the recurring payment for your ${data.planName} subscription. Below is your detailed tax receipt:`;
  const buttonText = isEs ? "Descargar Factura Fiscal PDF" : "Download Tax Invoice PDF";

  const bodyHtml = `
    ${renderReceiptBreakdown({
      invoiceNumber: data.invoiceNumber,
      items: [
        {
          name: data.planName,
          period: data.period,
          amount: `${data.amount} ${data.currency}`,
        },
        {
          name: isEs ? "IA Mesh Runtime (Tokens base)" : "IA Mesh Runtime (Base tokens)",
          period: isEs ? "Asignación mensual incluida" : "Monthly allocation included",
          amount: "$0.00",
        },
        {
          name: isEs ? "Pipelines & Agentes Concurrentes" : "Pipelines & Concurrent Agents",
          period: isEs ? "Ilimitados en nivel profesional" : "Unlimited on professional tier",
          amount: "$0.00",
        },
      ],
      subtotal: data.amount,
      tax: "$0.00",
      total: data.amount,
      currency: data.currency,
      last4: data.last4,
    })}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    categoryEyebrow: isEs ? "CELAEST // COMPROBANTE FISCAL" : "CELAEST // FISCAL DISPATCH",
    badge: {
      text: isEs ? "Pagado" : "Paid",
      variant: "success",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url:
        data.invoicePdfUrl || `https://app.celaest.com/billing/invoices/${data.invoiceNumber}.pdf`,
      variant: "primary",
    },
    secondaryNote: isEs
      ? "Puedes consultar el historial de facturación completo y certificados fiscales en cualquier momento en https://app.celaest.com/settings/billing"
      : "You can view your complete invoice history and tax receipts at https://app.celaest.com/settings/billing",
    locale: data.locale,
  });

  const text = `${title}
==================================================

Hola, ${data.customerName}

${intro}

Detalles:
- Factura: ${data.invoiceNumber}
- Plan: ${data.planName} (${data.period})
- Monto: ${data.amount} ${data.currency}
- Método de Pago: Tarjeta terminada en ${data.last4}

${data.invoicePdfUrl ? `[ ${buttonText} ]: ${data.invoicePdfUrl}` : ""}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
