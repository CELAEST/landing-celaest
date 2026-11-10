import {
  renderEnterpriseEmailLayout,
  renderKeyValueTable,
  KeyValueRow,
  escapeHtml,
} from "../layout";

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
    ? `Hemos procesado exitosamente el cobro recurrente de tu suscripción ${data.planName}. A continuación tienes el resumen detallado de tu transacción:`
    : `We successfully processed the recurring payment for your ${data.planName} subscription. Below is your transaction summary:`;
  const buttonText = isEs ? "Descargar Factura PDF" : "Download Invoice PDF";

  const rows: KeyValueRow[] = [
    {
      label: isEs ? "Nº de Factura" : "Invoice Number",
      value: escapeHtml(data.invoiceNumber),
      isMono: true,
    },
    {
      label: isEs ? "Plan y Periodo" : "Plan & Billing Period",
      value: escapeHtml(`${data.planName} (${data.period})`),
    },
    {
      label: isEs ? "Método de Pago" : "Payment Method",
      value: escapeHtml(
        isEs ? `Tarjeta terminada en ${data.last4}` : `Card ending in ${data.last4}`,
      ),
    },
    {
      label: isEs ? "Total Pagado" : "Total Paid",
      value: escapeHtml(`${data.amount} ${data.currency}`),
      highlight: "success",
    },
  ];

  const bodyHtml = `
    ${renderKeyValueTable(rows)}
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
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
