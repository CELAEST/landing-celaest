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

export function renderPaymentFailedEmail(data: PaymentFailedData): { html: string; text: string } {
  const isEs = data.locale !== "en";
  const title = isEs ? "Acción requerida: Pago no procesado" : "Action Required: Payment Failed";
  const intro = isEs
    ? `No pudimos procesar el cobro recurrente de ${data.amount} ${data.currency} para tu plan ${data.planName} con la tarjeta terminada en ${data.last4}.`
    : `We were unable to process your recurring payment of ${data.amount} ${data.currency} for ${data.planName} with the card ending in ${data.last4}.`;
  const consequence = isEs
    ? `Realizaremos un nuevo intento automático el ${data.retryDate}. Para evitar la interrupción de tus servicios y pipelines de automatización, por favor actualiza tu método de pago:`
    : `We will automatically retry on ${data.retryDate}. To prevent any downtime to your automated pipelines and AI services, please update your payment method:`;
  const buttonText = isEs ? "Actualizar Método de Pago" : "Update Payment Method";

  const text = `Hola, ${data.customerName}

${title}

${intro}

${consequence}
${data.updatePaymentUrl}

---
CELAEST Inc. · Facturación y Cobranza`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #050508; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 580px; margin: 40px auto; background: #0B0B14; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
    .header { padding: 32px 36px 20px; background: linear-gradient(180deg, rgba(239, 68, 68, 0.16) 0%, rgba(11, 11, 20, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 0.18em; color: #FFFFFF; }
    .content { padding: 36px 36px 28px; }
    h1 { font-size: 22px; font-weight: 700; color: #EF4444; margin: 0 0 16px; }
    .card { background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-left: 3px solid #EF4444; border-radius: 8px; padding: 18px 22px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #FCA5A5; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: #EF4444; color: #FFFFFF !important; font-weight: 600; font-size: 15px; padding: 14px 36px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 18px rgba(239, 68, 68, 0.35); }
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
      <div class="card">
        ${intro}
      </div>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">${consequence}</p>

      <div class="btn-container">
        <a href="${data.updatePaymentUrl}" class="btn">${buttonText} &rarr;</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. &middot; Facturación B2B
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
