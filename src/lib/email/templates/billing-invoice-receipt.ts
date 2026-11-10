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
  const title = isEs ? "Confirmación de Pago y Recibo" : "Payment Receipt & Invoice Confirmation";
  const intro = isEs
    ? `Hemos procesado exitosamente tu pago para el plan ${data.planName}. Agradecemos tu confianza en la plataforma CELAEST.`
    : `We successfully processed your payment for ${data.planName}. Thank you for building on CELAEST.`;
  const buttonText = isEs ? "Descargar Factura PDF" : "Download Invoice PDF";

  const text = `Hola, ${data.customerName}

${intro}

Detalles de Facturación:
- Factura: ${data.invoiceNumber}
- Plan: ${data.planName} (${data.period})
- Monto: ${data.amount} ${data.currency}
- Método de Pago: Tarjeta terminada en ${data.last4}

${data.invoicePdfUrl ? `Descarga tu comprobante en: ${data.invoicePdfUrl}\n` : ""}
Puedes gestionar tus métodos de pago en cualquier momento en https://app.celaest.com/settings/billing

---
CELAEST Inc. · Facturación Corporativa`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(34, 197, 94, 0.12) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; }
    .receipt-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 22px; margin: 24px 0; }
    .receipt-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; }
    .receipt-row:last-child { border-bottom: none; }
    .row-total { padding-top: 14px; font-size: 16px; font-weight: 700; color: #22C55E; }
    .label { color: #64748B; }
    .val { color: #F8FAFC; font-weight: 500; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); color: #FFFFFF !important; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; }
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
      <p style="color: #F8FAFC; font-weight: 600;">Hola, ${data.customerName}</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">${intro}</p>

      <div class="receipt-card">
        <div class="receipt-row">
          <span class="label">N&ordm; de Factura</span>
          <span class="val" style="font-family: monospace;">${data.invoiceNumber}</span>
        </div>
        <div class="receipt-row">
          <span class="label">Plan / Suscripción</span>
          <span class="val">${data.planName} (${data.period})</span>
        </div>
        <div class="receipt-row">
          <span class="label">Método de Pago</span>
          <span class="val">&bull;&bull;&bull;&bull; ${data.last4}</span>
        </div>
        <div class="receipt-row row-total">
          <span style="color: #F8FAFC;">Total Pagado</span>
          <span>${data.amount} ${data.currency}</span>
        </div>
      </div>

      ${
        data.invoicePdfUrl
          ? `<div style="text-align: center; margin: 24px 0;">
              <a href="${data.invoicePdfUrl}" class="btn">${buttonText} &darr;</a>
            </div>`
          : ""
      }
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Facturación B2B
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
