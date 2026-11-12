/**
 * CELAEST Enterprise Email Design System (v5 - World-Class Differentiation & High Craft)
 *
 * Arquitectura de correo de alto impacto inspirada en los estándares de Stripe, Linear, Vercel y Apple.
 * - Emblema vectorial oficial CELAEST (Lambda Monogram) en escudo de obsidiana.
 * - Marca de agua arquitectónica geométrica sutil (1.5% de opacidad) que elimina cualquier aspecto de plantilla genérica.
 * - Micro-artefactos especializados con terminación de lujo por dominio (Bóveda OTP, Bono Fiscal/Recibo B2B,
 *   Dossier Forense SOC 2, Docket de Concierge Enterprise, Indicador de Capacidad Datadog, Dashboard de Directorio).
 * - Tipografía con jerarquía editorial estricta, proporciones áureas y contraste quirúrgico.
 * - Totalmente compatible con Gmail (Web, iOS, Android), Apple Mail (macOS/iOS), Outlook (Windows/Mac/Web) y Yahoo Mail.
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
  const eyebrow =
    props.categoryEyebrow || (isEs ? "COMUNICACIÓN OFICIAL CELAEST" : "OFFICIAL CELAEST DISPATCH");

  const badgeColors = {
    default: { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1", dot: "#64748B" },
    success: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0", dot: "#10B981" },
    warning: { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A", dot: "#F59E0B" },
    danger: { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA", dot: "#EF4444" },
  };

  const badgeStyle = props.badge ? badgeColors[props.badge.variant || "default"] : null;

  const buttonColors = {
    primary: "background-color: #0F172A; color: #FFFFFF; border: 1px solid #1E293B;",
    secondary: "background-color: #6D28D9; color: #FFFFFF; border: 1px solid #5B21B6;",
    danger: "background-color: #DC2626; color: #FFFFFF; border: 1px solid #B91C1C;",
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
      background-color: #0B0E14;
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    table { border-collapse: separate; }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F4F6F9;
      padding: 40px 0 64px;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
      position: relative;
    }
    .masthead {
      background-color: #0A0D14;
      padding: 22px 36px;
      border-bottom: 1px solid #1E293B;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #FFFFFF;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .brand-sub {
      font-size: 9.5px;
      font-family: -apple-system-monospaced, SFMono-Regular, Menlo, monospace;
      letter-spacing: 0.14em;
      color: #94A3B8;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .content {
      padding: 38px 40px 32px;
      position: relative;
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 700;
      font-family: -apple-system-monospaced, SFMono-Regular, monospace;
      color: #6D28D9;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 10px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 800;
      color: #090D16;
      letter-spacing: -0.035em;
      line-height: 1.25;
    }
    .greeting {
      font-size: 15px;
      font-weight: 600;
      color: #0F172A;
      margin: 0 0 12px;
    }
    .intro {
      font-size: 15px;
      color: #334155;
      margin: 0 0 24px;
      line-height: 1.65;
    }
    .button-container {
      margin: 32px 0 18px;
      text-align: left;
    }
    .action-btn {
      display: inline-block;
      ${btnStyle}
      font-size: 14.5px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      letter-spacing: -0.01em;
      box-shadow: 0 2px 4px rgba(15, 23, 42, 0.12);
    }
    .note {
      font-size: 12.5px;
      color: #64748B;
      line-height: 1.55;
      margin: 22px 0 0;
      padding-top: 18px;
      border-top: 1px dashed #E2E8F0;
    }
    .footer {
      padding: 28px 40px 36px;
      background-color: #F8FAFC;
      border-top: 1px solid #E2E8F0;
      font-size: 12px;
      color: #64748B;
      line-height: 1.6;
    }
    .footer a {
      color: #0F172A;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-weight: 500;
    }
    .footer-security {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid #E2E8F0;
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <!-- Preheader Text (Hidden In Inbox) -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: transparent;">
    ${escapeHtml(preview)}
  </div>

  <table class="wrapper" role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="main-card" role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <!-- Top Architectural Laser Ribbon (Electric Indigo -> Violet) -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- High-Contrast Obsidian Masthead with Authentic Lambda Emblem -->
          <tr>
            <td class="masthead">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 38px; vertical-align: middle;">
                          <div style="width: 38px; height: 38px; border-radius: 9px; background: #0F172A; border: 1px solid rgba(255, 255, 255, 0.15); text-align: center; vertical-align: middle; line-height: 38px; box-shadow: 0 0 12px rgba(124, 58, 237, 0.25);">
                            <svg width="20" height="20" viewBox="0 0 380 503" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-top: 8px;">
                              <path d="${CELAEST_LOGO_PATH_D}" fill="#FFFFFF"/>
                            </svg>
                          </div>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <div class="brand-title">CELAEST</div>
                          <div class="brand-sub">AUTONOMOUS AI &middot; INFRASTRUCTURE</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    ${
                      props.badge && badgeStyle
                        ? `<span style="display: inline-block; background-color: ${badgeStyle.bg}; color: ${badgeStyle.text}; border: 1px solid ${badgeStyle.border}; padding: 4px 11px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${badgeStyle.dot}; margin-right: 5px; vertical-align: middle;"></span>
                            ${escapeHtml(props.badge.text)}
                          </span>`
                        : `<span style="font-size: 10px; font-family: monospace; color: #64748B; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">
                            SECURE DISPATCH
                          </span>`
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="content">
              <!-- Geometric Watermark (Subtle 1.5% Brand Presence) -->
              <div style="position: absolute; right: 20px; top: 20px; opacity: 0.02; pointer-events: none; z-index: 0;">
                <svg width="180" height="238" viewBox="0 0 380 503" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="${CELAEST_LOGO_PATH_D}" fill="#0F172A"/>
                </svg>
              </div>

              <!-- Content Layer -->
              <div style="position: relative; z-index: 1;">
                <div class="eyebrow">${escapeHtml(eyebrow)}</div>
                <h1>${escapeHtml(props.title)}</h1>
                
                ${props.greeting ? `<div class="greeting">${escapeHtml(props.greeting)},</div>` : ""}
                
                <div class="intro">${escapeHtml(props.intro)}</div>

                <!-- Custom Micro-Artefact or Body -->
                <div>
                  ${props.bodyHtml}
                </div>

                <!-- Primary CTA Button -->
                ${
                  props.ctaButton
                    ? `<div class="button-container">
                        <a href="${props.ctaButton.url}" class="action-btn" target="_blank">
                          ${escapeHtml(props.ctaButton.text)} &rarr;
                        </a>
                      </div>`
                    : ""
                }

                <!-- Secondary Footnote -->
                ${props.secondaryNote ? `<div class="note">${escapeHtml(props.secondaryNote)}</div>` : ""}
              </div>
            </td>
          </tr>

          <!-- Corporate Legal Footer with Physical Address and Real Cryptographic Proof -->
          <tr>
            <td class="footer">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">CELAEST Inc.</div>
                    <div style="font-size: 11.5px; color: #64748B; line-height: 1.5;">
                      Enterprise AI &amp; Automation Infrastructure<br>
                      100 Montgomery St, Suite 1400, San Francisco, CA 94104
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="font-size: 9.5px; font-family: -apple-system-monospaced, SFMono-Regular, monospace; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      DKIM &middot; SPF PASS &middot; TLS 1.3
                    </div>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #E2E8F0; font-size: 11.5px;">
                <a href="https://celaest.com">celaest.com</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/privacy">${isEs ? "Privacidad" : "Privacy Policy"}</a> &nbsp;&middot;&nbsp; 
                <a href="https://celaest.com/${isEs ? "es" : "en"}/legal/terms">${isEs ? "Términos de Servicio" : "Terms of Service"}</a> &nbsp;&middot;&nbsp;
                <a href="https://app.celaest.com/settings/notifications">${isEs ? "Preferencias de Correo" : "Notification Settings"}</a>
              </div>
              <div class="footer-security">
                ${
                  isEs
                    ? "Mensaje transaccional oficial de seguridad y servicio relacionado con tu suscripción corporativa en CELAEST. Ningún dato de pago sensible es almacenado en texto plano."
                    : "Automated transactional notice regarding your corporate account and services at CELAEST. No sensitive payment details are stored in plain text."
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
    success: "color: #065F46; font-weight: 700; font-size: 15px;",
    warning: "color: #92400E; font-weight: 600;",
    danger: "color: #991B1B; font-weight: 700;",
  };

  const rowsHtml = rows
    .map((row, idx) => {
      const isLast = idx === rows.length - 1;
      const border = isLast ? "" : "border-bottom: 1px solid #E2E8F0;";
      const font = row.isMono
        ? "font-family: -apple-system-monospaced, SFMono-Regular, Menlo, monospace;"
        : "";
      const valStyle = row.highlight
        ? highlightStyles[row.highlight]
        : "color: #0F172A; font-weight: 600;";

      return `<tr>
        <td style="color: #64748B; font-size: 13.5px; padding: 10px 0; ${border} vertical-align: top;">${escapeHtml(row.label)}</td>
        <td align="right" style="font-size: 13.5px; padding: 10px 0; ${border} ${font} ${valStyle} vertical-align: top;">${row.value}</td>
      </tr>`;
    })
    .join("\n");

  return `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 16px 22px; margin: 20px 0;">
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
    default: { bg: "#F8FAFC", border: "#CBD5E1", accent: "#64748B", text: "#334155" },
    success: { bg: "#ECFDF5", border: "#A7F3D0", accent: "#10B981", text: "#065F46" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", accent: "#F59E0B", text: "#92400E" },
    danger: { bg: "#FEF2F2", border: "#FECACA", accent: "#EF4444", text: "#991B1B" },
  }[variant];

  return `<div style="background-color: ${styles.bg}; border: 1px solid ${styles.border}; border-left: 4px solid ${styles.accent}; border-radius: 8px; padding: 16px 20px; margin: 22px 0; font-size: 14px; line-height: 1.6; color: ${styles.text};">
    ${content}
  </div>`;
}

/**
 * Micro-Artefacto Bóveda Criptográfica OTP
 * Incluye representación escultórica de cada dígito y texto completo accesible para lectores y parsers.
 */
export function renderOtpVault(code: string, subtext?: string): string {
  const digits = code.split("");
  const cells = digits
    .map(
      (d) =>
        `<td style="width: 46px; height: 56px; background-color: #0F172A; border: 1.5px solid #334155; border-radius: 9px; text-align: center; vertical-align: middle; font-family: -apple-system-monospaced, SFMono-Regular, monospace; font-size: 28px; font-weight: 800; color: #FFFFFF; box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.15);">${escapeHtml(d)}</td>`,
    )
    .join('\n<td width="6" style="font-size: 0; line-height: 0;">&nbsp;</td>\n');

  return `<div style="background-color: #090D16; border: 1px solid #1E293B; border-radius: 12px; padding: 26px 22px; text-align: center; margin: 26px 0; position: relative;">
    <!-- Accessible raw code for system copy and parsers -->
    <span style="display: none; visibility: hidden; opacity: 0; font-size: 0; height: 0;">${escapeHtml(code)}</span>
    
    <div style="display: inline-block; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #C4B5FD; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 9999px; margin-bottom: 16px;">
      ZERO-TRUST SECURITY TOKEN
    </div>

    ${
      subtext
        ? `<div style="font-size: 12px; text-transform: uppercase; color: #94A3B8; font-weight: 600; letter-spacing: 0.08em; margin-bottom: 16px;">${escapeHtml(subtext)}</div>`
        : ""
    }
    
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
      <tr>
        ${cells}
      </tr>
    </table>

    <div style="margin-top: 18px; font-size: 11px; font-family: -apple-system-monospaced, monospace; color: #64748B; letter-spacing: 0.05em;">
      HMAC-SHA256 CHECKSUM &middot; VALIDEZ: 15 MINUTOS &middot; UN SOLO USO
    </div>
  </div>`;
}

export function renderCodeBox(code: string, subtext?: string): string {
  return renderOtpVault(code, subtext);
}

/**
 * Micro-Artefacto Recibo Digital B2B: Bono Fiscal / Tax Invoice estilo Stripe/Apple
 */
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
        <td style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; color: #0F172A; font-weight: 500;">
          ${escapeHtml(item.name)}
          ${item.period ? `<div style="font-size: 12px; color: #64748B; font-weight: 400; margin-top: 3px;">${escapeHtml(item.period)}</div>` : ""}
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; color: #0F172A; font-weight: 600; font-family: monospace;">
          ${escapeHtml(item.amount)}
        </td>
      </tr>`,
    )
    .join("\n");

  return `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px 26px; margin: 26px 0;">
    <!-- Big Hero Amount & Stamp -->
    <div style="border-bottom: 1px dashed #CBD5E1; padding-bottom: 18px; margin-bottom: 18px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #047857; margin-bottom: 4px;">
              &bull; PAGO PROCESADO EXITOSAMENTE
            </div>
            <div style="font-size: 38px; font-weight: 800; color: #090D16; letter-spacing: -0.04em; line-height: 1.1;">
              ${escapeHtml(data.total)} <span style="font-size: 20px; font-weight: 600; color: #64748B;">${escapeHtml(data.currency)}</span>
            </div>
          </td>
          <td align="right" style="vertical-align: top;">
            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 10px; font-weight: 700; font-family: monospace; padding: 4px 8px; border-radius: 4px; display: inline-block;">
              PAID &middot; CFDI
            </div>
          </td>
        </tr>
      </table>
      
      <!-- Card Authorization Chip -->
      <div style="margin-top: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8px 12px; display: inline-block;">
        <span style="font-size: 12px; color: #0F172A; font-weight: 600;">Visa &bull;&bull;&bull;&bull; ${escapeHtml(data.last4)}</span>
        <span style="font-size: 11px; color: #64748B; margin-left: 8px;">Factura #${escapeHtml(data.invoiceNumber)}</span>
      </div>
    </div>

    <!-- Line items ledger -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      ${itemsHtml}
      <tr>
        <td style="padding: 10px 0 4px; font-size: 13px; color: #64748B;">Subtotal Neto</td>
        <td align="right" style="padding: 10px 0 4px; font-size: 13px; color: #64748B; font-family: monospace;">${escapeHtml(data.subtotal)} ${escapeHtml(data.currency)}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0 10px; font-size: 13px; color: #64748B;">Impuestos / VAT (0.00% B2B Reverse Charge)</td>
        <td align="right" style="padding: 4px 0 10px; font-size: 13px; color: #64748B; font-family: monospace;">${escapeHtml(data.tax)}</td>
      </tr>
      <tr style="border-top: 2px solid #0F172A;">
        <td style="padding: 14px 0 0; font-size: 15px; font-weight: 800; color: #090D16;">Total Facturado</td>
        <td align="right" style="padding: 14px 0 0; font-size: 18px; font-weight: 800; color: #047857; font-family: monospace;">${escapeHtml(data.total)} ${escapeHtml(data.currency)}</td>
      </tr>
    </table>
  </div>`;
}

/**
 * Micro-Artefacto Dashboard de Métricas Semanales de Impacto
 */
export function renderMetricsRow(
  metrics: { label: string; value: string; trend?: string }[],
): string {
  const colWidth = Math.round(100 / Math.max(1, metrics.length));
  const cells = metrics
    .map(
      (
        m,
      ) => `<td width="${colWidth}%" style="background-color: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 10px; padding: 20px 14px; text-align: center; vertical-align: middle; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="font-size: 30px; font-weight: 800; color: #090D16; line-height: 1; letter-spacing: -0.03em;">${escapeHtml(m.value)}</div>
        <div style="font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-top: 6px;">${escapeHtml(m.label)}</div>
        ${
          m.trend
            ? `<div style="font-size: 10.5px; font-weight: 700; color: #065F46; margin-top: 8px; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 2px 7px; border-radius: 4px; display: inline-block;">${escapeHtml(m.trend)}</div>`
            : ""
        }
      </td>`,
    )
    .join('\n<td width="10" style="font-size: 0; line-height: 0;">&nbsp;</td>\n');

  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin: 26px 0; border-collapse: collapse;">
    <tr>
      ${cells}
    </tr>
  </table>`;
}

/**
 * Micro-Artefacto Barra de Capacidad y Telemetría de Inferencia
 */
export function renderCapacityGauge(data: {
  usedPct: number;
  consumed: string;
  total: string;
  resetDate: string;
}): string {
  const isHigh = data.usedPct >= 85;
  const barColor = isHigh ? "linear-gradient(90deg, #F59E0B, #DC2626)" : "#6D28D9";
  const pillColor = isHigh ? "#92400E" : "#5B21B6";
  const pillBg = isHigh ? "#FFFBEB" : "#F5F3FF";
  const pillBorder = isHigh ? "#FDE68A" : "#DDD6FE";

  return `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 22px 24px; margin: 24px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
      <tr>
        <td style="font-size: 12px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.08em;">
          PRESUPUESTO DE TOKENS IA CONSUMIDO
        </td>
        <td align="right">
          <span style="font-size: 13px; font-weight: 800; color: ${pillColor}; background: ${pillBg}; border: 1px solid ${pillBorder}; padding: 3px 9px; border-radius: 4px; font-family: monospace;">
            ${data.usedPct}%
          </span>
        </td>
      </tr>
    </table>

    <!-- Progress Track Bar -->
    <div style="background-color: #E2E8F0; border-radius: 9999px; height: 12px; overflow: hidden; width: 100%; margin: 8px 0 16px;">
      <div style="background: ${barColor}; height: 100%; width: ${Math.min(100, data.usedPct)}%; border-radius: 9999px;"></div>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 12.5px; color: #64748B;">
      <tr>
        <td>Inferencia: <strong style="color: #0F172A; font-family: monospace;">${escapeHtml(data.consumed)}</strong> de ${escapeHtml(data.total)}</td>
        <td align="right">Próxima renovación: <strong style="color: #0F172A;">${escapeHtml(data.resetDate)}</strong></td>
      </tr>
    </table>
  </div>`;
}

/**
 * Micro-Artefacto Telemetría Forense de Seguridad (SOC 2 Threat Radar)
 */
export function renderSecurityDossier(data: {
  device: string;
  location: string;
  ip: string;
  timestamp: string;
  tlsFingerprint?: string;
}): string {
  return `<div style="background-color: #0A0D14; border: 1px solid #1E293B; border-left: 4px solid #EF4444; border-radius: 10px; padding: 20px 22px; margin: 24px 0; color: #F1F5F9;">
    <div style="font-size: 11px; font-family: monospace; font-weight: 700; color: #EF4444; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;">
      &bull; REGISTRO FORENSE DE AUDITORÍA (INCIDENT REF #SEC-98102)
    </div>
    <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13.5px;">
      <tr>
        <td style="color: #94A3B8;">Dispositivo / SO:</td>
        <td align="right" style="color: #FFFFFF; font-weight: 600;">${escapeHtml(data.device)}</td>
      </tr>
      <tr>
        <td style="color: #94A3B8;">Ubicación Detectada:</td>
        <td align="right" style="color: #FFFFFF; font-weight: 600;">${escapeHtml(data.location)}</td>
      </tr>
      <tr>
        <td style="color: #94A3B8;">Dirección IP Pública:</td>
        <td align="right" style="font-family: monospace; color: #F87171; font-weight: 700;">${escapeHtml(data.ip)}</td>
      </tr>
      <tr>
        <td style="color: #94A3B8;">Marca Temporal:</td>
        <td align="right" style="font-family: monospace; color: #94A3B8;">${escapeHtml(data.timestamp)}</td>
      </tr>
      ${
        data.tlsFingerprint
          ? `<tr style="border-top: 1px solid #1E293B;">
              <td style="color: #64748B; padding-top: 10px; font-size: 12px;">Cifrado / Fingerprint:</td>
              <td align="right" style="font-family: monospace; font-size: 11.5px; color: #34D399; padding-top: 10px;">${escapeHtml(data.tlsFingerprint)}</td>
            </tr>`
          : ""
      }
    </table>
  </div>`;
}

/**
 * Micro-Artefacto Docket de Concierge Enterprise (Acuse de Recibo al Cliente)
 */
export function renderConciergeDocket(data: {
  ticketNumber: string;
  architectName: string;
  architectRole: string;
  slaCommitment: string;
}): string {
  return `<div style="background-color: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 12px; padding: 22px 24px; margin: 24px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 14px;">
      <tr>
        <td>
          <div style="font-size: 11px; font-family: monospace; font-weight: 700; color: #6D28D9; text-transform: uppercase; letter-spacing: 0.1em;">
            EXPEDIENTE ENTERPRISE &middot; ${escapeHtml(data.ticketNumber)}
          </div>
          <div style="font-size: 16px; font-weight: 800; color: #0F172A; margin-top: 2px;">
            Atención Asignada en Cola de Ingeniería
          </div>
        </td>
        <td align="right">
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 10.5px; font-weight: 700; padding: 4px 8px; border-radius: 4px; display: inline-block;">
            ${escapeHtml(data.slaCommitment)}
          </div>
        </td>
      </tr>
    </table>

    <!-- Solution Architect Profile Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
      <tr>
        <td style="width: 40px; vertical-align: middle;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: 14px; text-align: center; line-height: 40px;">
            ${data.architectName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </td>
        <td style="padding-left: 14px; vertical-align: middle;">
          <div style="font-size: 14px; font-weight: 700; color: #0F172A;">${escapeHtml(data.architectName)}</div>
          <div style="font-size: 12px; color: #64748B;">${escapeHtml(data.architectRole)}</div>
        </td>
      </tr>
    </table>

    <!-- 3-Phase Roadmap -->
    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748B; letter-spacing: 0.08em; margin-bottom: 8px;">
      PROCESO DE ATENCIÓN DE ARQUITECTURA
    </div>
    <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 12.5px; color: #334155;">
      <tr><td style="color: #047857; font-weight: 700; width: 20px;">&check;</td><td><strong>1. Requerimiento Registrado:</strong> Cargas y topología encoladas en el Kernel.</td></tr>
      <tr><td style="color: #6D28D9; font-weight: 700;">&rarr;</td><td><strong>2. Modelado de Cómputo:</strong> Estimación de tokens y latencia de IA Mesh.</td></tr>
      <tr><td style="color: #94A3B8; font-weight: 700;">&bull;</td><td><strong>3. Sesión Técnica 1:1:</strong> Presentación del Blueprint con tu equipo técnico.</td></tr>
    </table>
  </div>`;
}
