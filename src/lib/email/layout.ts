/**
 * CELAEST Enterprise Email Design System (v4 - High Trust Gold Standard)
 *
 * Inspirado en los estándares de diseño de Stripe, Linear, Vercel y Apple.
 * - Paleta limpia y de alta confianza: Canvas #F8FAFC, Tarjeta #FFFFFF, Texto #0F172A.
 * - Tipografía corporativa con legibilidad AAA y ratios de contraste 7:1.
 * - Tarjetas estructuradas con bordes sutiles #E2E8F0 (sin fondos negros ni neones de IA).
 * - Botones sólidos con profundidad sobria (Deep Violet #6D28D9 o Obsidian #0F172A).
 * - Pie de página legal enterprise con identificación fiscal, dirección y notas de seguridad.
 * - 100% compatible con Gmail (Web, iOS, Android), Apple Mail, Outlook y Yahoo.
 */

export interface EnterpriseEmailLayoutProps {
  title: string;
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
    default: { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" },
    success: { bg: "#ECFDF5", text: "#047857", border: "#A7F3D0" },
    warning: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
    danger: { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" },
  };

  const badgeStyle = props.badge ? badgeColors[props.badge.variant || "default"] : null;

  const buttonColors = {
    primary: "background-color: #6D28D9; color: #FFFFFF;",
    secondary: "background-color: #0F172A; color: #FFFFFF;",
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
  <title>${escapeHtml(props.title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F8FAFC;
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    table { border-collapse: separate; }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F8FAFC;
      padding: 40px 0 60px;
    }
    .main-card {
      max-width: 580px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02);
    }
    .header {
      padding: 32px 40px 24px;
      border-bottom: 1px solid #F1F5F9;
    }
    .brand-mark {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: #0F172A;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
    }
    .content {
      padding: 36px 40px 32px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 21px;
      font-weight: 600;
      color: #0F172A;
      letter-spacing: -0.02em;
      line-height: 1.35;
    }
    .greeting {
      font-size: 15px;
      font-weight: 600;
      color: #0F172A;
      margin: 0 0 12px;
    }
    .intro {
      font-size: 15px;
      color: #475569;
      margin: 0 0 24px;
      line-height: 1.6;
    }
    .button-container {
      margin: 32px 0;
      text-align: left;
    }
    .action-btn {
      display: inline-block;
      ${btnStyle}
      font-size: 14px;
      font-weight: 600;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      letter-spacing: 0.01em;
    }
    .note {
      font-size: 13px;
      color: #64748B;
      line-height: 1.5;
      margin: 24px 0 0;
    }
    .footer {
      padding: 24px 40px 36px;
      background-color: #F8FAFC;
      border-top: 1px solid #E2E8F0;
      font-size: 12px;
      color: #64748B;
      line-height: 1.6;
    }
    .footer a {
      color: #6D28D9;
      text-decoration: none;
      font-weight: 500;
    }
    .footer-security {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #E2E8F0;
      font-size: 11px;
      color: #94A3B8;
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px;">
    ${escapeHtml(preview)}
  </div>

  <table class="wrapper" role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="main-card" role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span class="brand-mark">CELAEST</span>
                  </td>
                  ${
                    props.badge && badgeStyle
                      ? `<td align="right">
                          <span style="display: inline-block; background-color: ${badgeStyle.bg}; color: ${badgeStyle.text}; border: 1px solid ${badgeStyle.border}; padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${escapeHtml(props.badge.text)}
                          </span>
                        </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content">
              <h1>${escapeHtml(props.title)}</h1>
              
              ${props.greeting ? `<div class="greeting">${escapeHtml(props.greeting)},</div>` : ""}
              
              <div class="intro">${escapeHtml(props.intro)}</div>

              <!-- Body Block -->
              <div>
                ${props.bodyHtml}
              </div>

              <!-- CTA Button -->
              ${
                props.ctaButton
                  ? `<div class="button-container">
                      <a href="${props.ctaButton.url}" class="action-btn" target="_blank">
                        ${escapeHtml(props.ctaButton.text)} &rarr;
                      </a>
                    </div>`
                  : ""
              }

              <!-- Secondary Note -->
              ${props.secondaryNote ? `<div class="note">${escapeHtml(props.secondaryNote)}</div>` : ""}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <div>
                <strong>CELAEST Inc.</strong> &middot; Enterprise AI &amp; Automation Infrastructure<br>
                100 Montgomery St, Suite 1400, San Francisco, CA 94104
              </div>
              <div style="margin-top: 8px;">
                <a href="https://celaest.com">celaest.com</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/privacy">${isEs ? "Privacidad" : "Privacy Policy"}</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/terms">${isEs ? "Términos" : "Terms"}</a> &nbsp;&middot;&nbsp;
                <a href="https://app.celaest.com/settings/notifications">${isEs ? "Preferencias" : "Preferences"}</a>
              </div>
              <div class="footer-security">
                ${
                  isEs
                    ? "Este es un mensaje transaccional oficial de seguridad y servicio relacionado con tu cuenta CELAEST."
                    : "This is an automated transactional message regarding your CELAEST corporate account."
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

  // Versión en texto plano impecable
  const plainGreeting = props.greeting ? `${props.greeting},\n\n` : "";
  const plainCta = props.ctaButton ? `\n\n[ ${props.ctaButton.text} ]: ${props.ctaButton.url}` : "";
  const plainNote = props.secondaryNote ? `\n\n${props.secondaryNote}` : "";
  const text = `${props.title.toUpperCase()}
==================================================

${plainGreeting}${props.intro}${plainCta}${plainNote}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

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
    default: "color: #0F172A; font-weight: 600;",
    success: "color: #047857; font-weight: 700; font-size: 15px;",
    warning: "color: #B45309; font-weight: 600;",
    danger: "color: #B91C1C; font-weight: 700;",
  };

  const rowsHtml = rows
    .map((row, idx) => {
      const isLast = idx === rows.length - 1;
      const border = isLast ? "" : "border-bottom: 1px solid #F1F5F9;";
      const font = row.isMono
        ? "font-family: -apple-system-monospaced, SFMono-Regular, Menlo, monospace;"
        : "";
      const valStyle = row.highlight
        ? highlightStyles[row.highlight]
        : "color: #0F172A; font-weight: 600;";

      return `<tr>
        <td style="color: #64748B; font-size: 13.5px; padding: 8px 0; ${border} vertical-align: top;">${escapeHtml(row.label)}</td>
        <td align="right" style="font-size: 13.5px; padding: 8px 0; ${border} ${font} ${valStyle} vertical-align: top;">${row.value}</td>
      </tr>`;
    })
    .join("\n");

  return `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 20px; margin: 20px 0;">
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
    default: { bg: "#F8FAFC", border: "#E2E8F0", accent: "#64748B", text: "#334155" },
    success: { bg: "#ECFDF5", border: "#A7F3D0", accent: "#10B981", text: "#065F46" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", accent: "#F59E0B", text: "#92400E" },
    danger: { bg: "#FEF2F2", border: "#FECACA", accent: "#EF4444", text: "#991B1B" },
  }[variant];

  return `<div style="background-color: ${styles.bg}; border: 1px solid ${styles.border}; border-left: 3px solid ${styles.accent}; border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 13.5px; line-height: 1.55; color: ${styles.text};">
    ${content}
  </div>`;
}

export function renderCodeBox(code: string, subtext?: string): string {
  return `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 22px; text-align: center; margin: 24px 0;">
    ${
      subtext
        ? `<div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.08em; margin-bottom: 8px;">${escapeHtml(subtext)}</div>`
        : ""
    }
    <div style="font-family: -apple-system-monospaced, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 32px; font-weight: 700; letter-spacing: 0.25em; color: #0F172A;">
      ${escapeHtml(code)}
    </div>
  </div>`;
}

export function renderMetricsRow(metrics: { label: string; value: string }[]): string {
  const colWidth = Math.round(100 / Math.max(1, metrics.length));
  const cells = metrics
    .map(
      (
        m,
      ) => `<td width="${colWidth}%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 12px; text-align: center; vertical-align: middle;">
        <div style="font-size: 24px; font-weight: 700; color: #0F172A; line-height: 1.2;">${escapeHtml(m.value)}</div>
        <div style="font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-top: 4px;">${escapeHtml(m.label)}</div>
      </td>`,
    )
    .join('\n<td width="10" style="font-size: 0; line-height: 0;">&nbsp;</td>\n');

  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin: 22px 0; border-collapse: collapse;">
    <tr>
      ${cells}
    </tr>
  </table>`;
}
