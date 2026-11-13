/**
 * CELAEST Enterprise Email Design System (v7 - Slate & Indigo Official Palette)
 *
 * Sistema visual aprobado:
 * - Paleta "1. Slate & Indigo" (Stripe / Linear Light):
 *   Outer canvas #EEF2F6, Sheet #FFFFFF, Header/Footer/Step #F8FAFC,
 *   Soft Indigo #EEF2FF, Texto primario #0F172A, Cuerpo #334155, Muted #64748B,
 *   Divisores #E2E8F0, Botón y acento principal #4F46E5.
 * - Emblema CELAEST Lambda de 42x42px (#0F172A) con icono blanco de 21x28px
 *   perfectamente centrado y subtítulo "De la intención al resultado".
 * - Compatible con Gmail, Apple Mail, Outlook y dispositivos móviles.
 */

export const CELAEST_LOGO_PATH_D =
  "M374.479 1.73333C374.479 4.53333 362.346 27.7333 355.813 37.3333C340.079 60.8 316.213 85.6 292.746 103.067C272.879 117.867 264.879 122.8 227.413 142.933C209.813 152.4 192.746 161.867 189.413 164.267C170.213 177.2 157.279 190.533 149.813 205.333L146.079 212.667L144.479 201.867C142.079 185.333 135.946 168.4 129.013 158.4C125.813 154 125.813 153.333 128.879 153.333C133.679 153.333 145.279 146.267 151.013 139.867C156.746 133.6 162.479 121.467 162.479 116C162.479 113.867 161.679 114 155.813 118C146.079 124.533 136.879 127.333 125.146 127.2C116.879 127.2 113.013 126.267 102.479 122.133C73.4127 110.533 61.0127 110.533 44.346 122C37.946 126.4 36.6127 126.8 26.346 127.067C17.4127 127.333 13.546 128.133 7.54603 130.933C-0.853972 134.8 -2.32064 137.333 3.54603 137.333C14.8794 137.333 37.4127 150.133 46.746 161.867C53.8127 170.667 59.4127 182.533 61.8127 194.133C64.346 206.267 64.346 229.867 61.6794 251.333C58.746 274 58.746 305.067 61.6794 320.667C66.0794 344.533 75.146 366.667 88.746 386.933C95.546 396.933 111.013 414.267 117.146 418.667L120.879 421.333L117.413 411.6C114.479 403.467 113.946 399.333 113.546 384L113.146 366L117.013 380.667C126.746 418.133 140.213 440.4 163.279 456.8C171.013 462.4 184.346 469.067 191.813 471.333C194.746 472.133 194.479 471.6 189.679 466.533C179.413 455.733 168.879 436.667 162.613 417.6C156.213 398.267 156.613 397.333 165.146 412.667C176.879 433.6 186.613 446.8 201.146 461.333C228.479 488.8 255.546 500.8 293.146 502.133L311.146 502.8L300.346 496.933C271.813 481.333 243.946 457.867 223.946 432.667C211.279 416.8 211.679 415.6 225.279 428.8C243.946 446.8 255.946 454 272.746 457.067L279.813 458.267L271.679 449.733C267.279 444.933 262.479 438.533 260.879 435.467C258.613 430.667 257.146 429.467 251.279 427.467C235.146 421.867 216.479 407.6 204.346 391.6C193.546 377.333 182.479 351.2 182.479 340C182.479 336.8 183.279 336.267 195.413 332.933C225.146 324.533 252.746 308.533 274.879 286.667C281.946 279.6 287.813 273.2 287.813 272.4C287.813 271.467 284.879 271.867 279.946 273.333C270.213 276.4 254.213 278.667 243.413 278.533L235.146 278.4L245.813 274.8C262.213 269.067 284.746 258.533 295.146 251.867C312.879 240.4 327.679 224.267 336.346 207.067C341.546 196.533 341.013 195.2 333.279 200.667C319.413 210.667 292.746 220.533 273.279 223.067C268.213 223.733 269.546 222.667 284.613 215.333C337.679 189.333 366.213 156.933 371.146 116.933L372.079 109.2L357.679 123.733C341.146 140.267 323.946 152.267 302.479 162.533C282.346 172 280.213 172 293.813 162.667C335.679 133.867 364.746 98.4 375.279 63.3333C378.346 52.8 378.879 48.9333 379.013 32C379.146 12 377.946 -7.91252e-06 375.679 -7.91252e-06C375.013 -7.91252e-06 374.479 0.799992 374.479 1.73333Z";

export interface EnterpriseEmailLayoutProps {
  title: string;
  categoryEyebrow?: string;
  previewText?: string;
  badge?: {
    text: string;
    variant?: "default" | "success" | "warning" | "danger";
  };
  greeting?: string;
  intro: string;
  bodyHtml: string;
  ctaButton?: {
    text: string;
    url: string;
    variant?: "primary" | "danger" | "secondary";
  };
  secondaryNote?: string;
  locale?: "es" | "en";
}

export function renderEnterpriseEmailLayout(props: EnterpriseEmailLayoutProps): {
  html: string;
  text: string;
} {
  const isEs = props.locale !== "en";
  const preview = props.previewText || props.title;

  const badgeColors = {
    default: { text: "#64748B", dot: "#4F46E5" },
    success: { text: "#059669", dot: "#10B981" },
    warning: { text: "#D97706", dot: "#F59E0B" },
    danger: { text: "#DC2626", dot: "#EF4444" },
  };

  const badgeStyle = props.badge ? badgeColors[props.badge.variant || "default"] : null;

  const buttonColors = {
    primary: "background-color: #4F46E5; color: #FFFFFF;",
    secondary: "background-color: #F8FAFC; color: #0F172A;",
    danger: "background-color: #DC2626; color: #FFFFFF;",
  };

  const btnStyle = props.ctaButton
    ? buttonColors[props.ctaButton.variant || "primary"]
    : buttonColors.primary;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(props.title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #EEF2F6;
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.65;
    }
    table { border-collapse: collapse; }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #EEF2F6;
      padding: 36px 16px 56px;
    }
    .main-sheet {
      max-width: 580px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
    }
    .header {
      background-color: #F8FAFC;
      padding: 28px 36px;
      border-bottom: 1px solid #E2E8F0;
    }
    .content {
      padding: 32px 36px 34px;
    }
    h1 {
      margin: 0 0 14px;
      font-size: 24px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: -0.025em;
      line-height: 1.25;
    }
    .greeting {
      font-size: 15px;
      font-weight: 500;
      color: #0F172A;
      margin: 0 0 10px;
    }
    .intro {
      font-size: 15px;
      color: #334155;
      margin: 0 0 22px;
      line-height: 1.65;
    }
    .button-container {
      margin: 26px 0 14px;
      text-align: left;
    }
    .action-btn {
      display: inline-block;
      ${btnStyle}
      font-size: 14.5px;
      font-weight: 600;
      padding: 13px 26px;
      border-radius: 9px;
      text-decoration: none;
      letter-spacing: -0.01em;
    }
    .note {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
      margin: 20px 0 0;
    }
    .footer {
      padding: 24px 36px 32px;
      background-color: #F8FAFC;
      border-top: 1px solid #E2E8F0;
      font-size: 12px;
      color: #64748B;
      line-height: 1.6;
    }
    .footer a {
      color: #334155;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: transparent;">
    ${escapeHtml(preview)}
  </div>

  <table class="wrapper" role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="main-sheet" role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <!-- Header Slate & Indigo con Logo 42x42 Centrado -->
          <tr>
            <td class="header">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" valign="middle" width="42" height="42" style="width: 42px; height: 42px; background-color: #0F172A; border-radius: 11px;">
                          <svg width="21" height="28" viewBox="0 0 380 503" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
                            <path d="${CELAEST_LOGO_PATH_D}" fill="#FFFFFF"/>
                          </svg>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <div style="font-size: 16.5px; font-weight: 800; letter-spacing: 0.16em; color: #0F172A; text-transform: uppercase; line-height: 1.15;">CELAEST</div>
                          <div style="font-size: 10.5px; font-weight: 500; letter-spacing: 0.06em; color: #64748B; text-transform: uppercase; margin-top: 2px;">${isEs ? "De la intención al resultado" : "From intent to outcome"}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    ${
                      props.badge && badgeStyle
                        ? `<span style="display: inline-block; background-color: #FFFFFF; padding: 5px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: ${badgeStyle.text};">
                            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${badgeStyle.dot}; margin-right: 6px; vertical-align: middle;"></span>${escapeHtml(props.badge.text)}
                          </span>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content">
              <h1>${escapeHtml(props.title)}</h1>
              
              ${props.greeting ? `<div class="greeting">Hola, ${escapeHtml(props.greeting)}.</div>` : ""}
              
              <div class="intro">${props.intro}</div>

              <div>
                ${props.bodyHtml}
              </div>

              ${
                props.ctaButton
                  ? `<div class="button-container">
                      <a href="${props.ctaButton.url}" class="action-btn" target="_blank">
                        ${escapeHtml(props.ctaButton.text)} &rarr;
                      </a>
                    </div>`
                  : ""
              }

              ${props.secondaryNote ? `<div class="note">${escapeHtml(props.secondaryNote)}</div>` : ""}
            </td>
          </tr>

          <!-- Footer Slate & Indigo -->
          <tr>
            <td class="footer">
              <div style="margin-bottom: 6px; color: #0F172A; font-weight: 600;">
                CELAEST Inc. &middot; ${isEs ? "Automatización Empresarial e Inteligencia Artificial" : "Enterprise Automation & AI Platform"}
              </div>
              <div style="margin-bottom: 10px;">
                <a href="https://celaest.com">celaest.com</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/privacy">${isEs ? "Privacidad" : "Privacy"}</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/terms">${isEs ? "Términos" : "Terms"}</a> &nbsp;&middot;&nbsp;
                <a href="mailto:support@celaest.com">support@celaest.com</a>
              </div>
              <div style="font-size: 11px; color: #64748B;">
                ${
                  isEs
                    ? "Recibes este correo porque interactuaste con CELAEST o tienes una cuenta activa en nuestra plataforma."
                    : "You received this email because you interacted with CELAEST or hold an active account on our platform."
                }
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plainGreeting = props.greeting ? `Hola, ${props.greeting}\n\n` : "";
  const plainCta = props.ctaButton ? `\n\n[ ${props.ctaButton.text} ]: ${props.ctaButton.url}` : "";
  const plainNote = props.secondaryNote ? `\n\n${props.secondaryNote}` : "";
  const text = `${props.title.toUpperCase()}
==================================================

${plainGreeting}${props.intro.replace(/<[^>]+>/g, "")}${plainCta}${plainNote}

---
CELAEST Inc. · https://celaest.com
support@celaest.com`;

  return { html, text };
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface KeyValueRow {
  label: string;
  value: string;
  isMono?: boolean;
  highlight?: "default" | "success" | "warning" | "danger";
}

export function renderKeyValueTable(rows: KeyValueRow[]): string {
  const highlightStyles = {
    default: "color: #0F172A; font-weight: 500;",
    success: "color: #059669; font-weight: 600;",
    warning: "color: #D97706; font-weight: 600;",
    danger: "color: #DC2626; font-weight: 600;",
  };

  const rowsHtml = rows
    .map((row, idx) => {
      const isLast = idx === rows.length - 1;
      const border = isLast ? "" : "border-bottom: 1px solid #E2E8F0;";
      const font = row.isMono
        ? "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px;"
        : "";
      const valStyle = row.highlight
        ? highlightStyles[row.highlight]
        : "color: #0F172A; font-weight: 500;";

      return `<tr>
        <td style="color: #64748B; font-size: 13.5px; padding: 11px 0; ${border} vertical-align: top;">${escapeHtml(row.label)}</td>
        <td align="right" style="font-size: 13.5px; padding: 11px 0; ${border} ${font} ${valStyle} vertical-align: top;">${row.value}</td>
      </tr>`;
    })
    .join("\n");

  return `<div style="background-color: #F8FAFC; border-radius: 12px; padding: 8px 22px; margin: 20px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      ${rowsHtml}
    </table>
  </div>`;
}

export function renderCalloutCard(
  content: string,
  variant: "default" | "success" | "warning" | "danger" = "default",
): string {
  const styles = {
    default: { bg: "#EEF2FF", text: "#334155" },
    success: { bg: "#ECFDF5", text: "#065F46" },
    warning: { bg: "#FFFBEB", text: "#B45309" },
    danger: { bg: "#FEF2F2", text: "#DC2626" },
  }[variant];

  return `<div style="background-color: ${styles.bg}; border-radius: 10px; padding: 16px 20px; margin: 20px 0; font-size: 13.5px; line-height: 1.6; color: ${styles.text};">
    ${content}
  </div>`;
}

export function renderOtpVault(code: string, subtext?: string): string {
  const digits = code.split("");
  const cells = digits
    .map(
      (d) =>
        `<td style="width: 48px; height: 56px; background-color: #EEF2FF; border-radius: 10px; text-align: center; vertical-align: middle; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 26px; font-weight: 700; color: #4F46E5;">${escapeHtml(d)}</td>`,
    )
    .join('\n<td width="8" style="font-size: 0; line-height: 0;">&nbsp;</td>\n');

  return `<div style="padding: 14px 0 18px; text-align: left; margin: 8px 0;">
    <span style="display: none; visibility: hidden; opacity: 0; font-size: 0; height: 0;">${escapeHtml(code)}</span>
    ${
      subtext
        ? `<div style="font-size: 13px; color: #64748B; font-weight: 500; margin-bottom: 12px;">${escapeHtml(subtext)}</div>`
        : ""
    }
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${cells}
      </tr>
    </table>
    <div style="margin-top: 12px; font-size: 12.5px; color: #64748B;">
      Por tu seguridad, este código es de un solo uso y vence en 15 minutos.
    </div>
  </div>`;
}

export function renderCodeBox(code: string, subtext?: string): string {
  return renderOtpVault(code, subtext);
}

export interface ReceiptItem {
  name: string;
  period?: string;
  amount: string;
}

export function renderReceiptBreakdown(data: {
  invoiceNumber: string;
  items: ReceiptItem[];
  subtotal: string;
  tax: string;
  total: string;
  currency: string;
  last4: string;
}): string {
  const itemsHtml = data.items
    .map(
      (item) => `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-size: 13.5px; color: #0F172A; font-weight: 600;">
          ${escapeHtml(item.name)}
          ${item.period ? `<div style="font-size: 12px; color: #64748B; font-weight: 400; margin-top: 2px;">${escapeHtml(item.period)}</div>` : ""}
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-size: 13.5px; color: #0F172A; font-weight: 600; font-family: ui-monospace, SFMono-Regular, monospace;">
          ${escapeHtml(item.amount)}
        </td>
      </tr>`,
    )
    .join("\n");

  return `<div style="background-color: #EEF2FF; border-radius: 12px; padding: 20px 24px; margin: 20px 0 16px;">
    <div style="font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #4F46E5; margin-bottom: 4px;">
      Total pagado
    </div>
    <div style="font-size: 34px; font-weight: 800; color: #0F172A; letter-spacing: -0.03em; line-height: 1.1;">
      ${escapeHtml(data.total)} <span style="font-size: 16px; font-weight: 600; color: #64748B;">${escapeHtml(data.currency)}</span>
    </div>
    <div style="font-size: 13px; color: #334155; margin-top: 6px;">
      Comprobante #${escapeHtml(data.invoiceNumber)} &middot; Visa &bull;&bull;&bull;&bull; ${escapeHtml(data.last4)}
    </div>
  </div>
  <div style="background-color: #F8FAFC; border-radius: 12px; padding: 8px 24px; margin: 0 0 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      ${itemsHtml}
      <tr>
        <td style="padding: 12px 0; font-size: 13.5px; font-weight: 700; color: #0F172A;">Total pagado</td>
        <td align="right" style="padding: 12px 0; font-size: 14px; font-weight: 700; color: #0F172A; font-family: ui-monospace, SFMono-Regular, monospace;">${escapeHtml(data.total)} ${escapeHtml(data.currency)}</td>
      </tr>
    </table>
  </div>`;
}

export function renderMetricsRow(
  metrics: { label: string; value: string; trend?: string }[],
): string {
  const colWidth = Math.round(100 / Math.max(1, metrics.length));
  const cells = metrics
    .map((m, idx) => {
      const divider = idx < metrics.length - 1 ? "border-right: 1px solid #E2E8F0;" : "";
      return `<td width="${colWidth}%" style="padding: 14px 10px; text-align: center; vertical-align: top; ${divider}">
          <div style="font-size: 28px; font-weight: 800; color: #0F172A; line-height: 1.1; letter-spacing: -0.03em;">${escapeHtml(m.value)}</div>
          <div style="font-size: 12px; color: #64748B; font-weight: 500; margin-top: 6px;">${escapeHtml(m.label)}</div>
          ${
            m.trend
              ? `<div style="font-size: 11.5px; font-weight: 600; color: #059669; margin-top: 4px;">${escapeHtml(m.trend)}</div>`
              : ""
          }
        </td>`;
    })
    .join("\n");

  return `<div style="background-color: #EEF2FF; border-radius: 12px; padding: 14px 6px; margin: 20px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        ${cells}
      </tr>
    </table>
  </div>`;
}

export function renderCapacityGauge(data: {
  usedPct: number;
  consumed: string;
  total: string;
  resetDate: string;
}): string {
  const isHigh = data.usedPct >= 85;
  const barColor = isHigh ? "#D97706" : "#4F46E5";
  const pctColor = isHigh ? "#D97706" : "#4F46E5";

  return `<div style="background-color: #F8FAFC; border-radius: 12px; padding: 20px 22px; margin: 20px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
      <tr>
        <td style="font-size: 13.5px; font-weight: 600; color: #0F172A;">
          Capacidad mensual utilizada
        </td>
        <td align="right" style="font-size: 14px; font-weight: 700; color: ${pctColor}; font-family: ui-monospace, SFMono-Regular, monospace;">
          ${data.usedPct}%
        </td>
      </tr>
    </table>

    <div style="background-color: #E2E8F0; border-radius: 9999px; height: 8px; overflow: hidden; width: 100%; margin: 10px 0 14px;">
      <div style="background-color: ${barColor}; height: 100%; width: ${Math.min(100, data.usedPct)}%; border-radius: 9999px;"></div>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 12.5px; color: #64748B;">
      <tr>
        <td>Consumo: <strong style="color: #0F172A; font-family: ui-monospace, SFMono-Regular, monospace;">${escapeHtml(data.consumed)}</strong> / ${escapeHtml(data.total)}</td>
        <td align="right">Renovación: <strong style="color: #0F172A;">${escapeHtml(data.resetDate)}</strong></td>
      </tr>
    </table>
  </div>`;
}

export function renderSecurityDossier(data: {
  device: string;
  location: string;
  ip: string;
  timestamp: string;
}): string {
  const rows: KeyValueRow[] = [
    { label: "Navegador y equipo", value: escapeHtml(data.device) },
    { label: "Ubicación aproximada", value: escapeHtml(data.location) },
    { label: "Dirección IP", value: escapeHtml(data.ip), isMono: true },
    { label: "Fecha y hora", value: escapeHtml(data.timestamp) },
  ];
  return renderKeyValueTable(rows);
}
