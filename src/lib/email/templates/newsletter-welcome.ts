import { NewsletterFormData } from "../types";

export function renderNewsletterWelcomeEmail(data: NewsletterFormData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Bienvenido al ecosistema CELAEST" : "Welcome to the CELAEST ecosystem";
  const intro = isEs
    ? "Te has suscrito exitosamente a las actualizaciones de arquitectura, automatización y avances en sistemas de IA de CELAEST."
    : "You have successfully subscribed to CELAEST architecture updates, enterprise automation insights, and AI systems breakthroughs.";
  const perksTitle = isEs ? "Qué recibirás:" : "What you will receive:";
  const perks = isEs
    ? [
        "Lanzamientos anticipados de nuevos componentes y herramientas de automatización.",
        "Guías de ingeniería de alto rendimiento y arquitectura desacoplada.",
        "Actualizaciones de plataforma, integraciones y modelos de IA.",
      ]
    : [
        "Early access to new automation tools and production components.",
        "High-performance engineering playbooks and decoupled architecture guides.",
        "Platform updates, enterprise integrations, and AI model orchestration.",
      ];

  const text = `${title}

${intro}

${perksTitle}
${perks.map((p) => `- ${p}`).join("\n")}

---
CELAEST Inc. · https://celaest.com
Enterprise Automation & AI Infrastructure`;

  const html = `<!DOCTYPE html>
<html lang="${isEs ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050508;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #0B0B14;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      padding: 36px 40px 24px;
      background: linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(11, 11, 20, 0) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .logo {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #FFFFFF;
      text-transform: uppercase;
      margin: 0;
    }
    .content {
      padding: 36px 40px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0 0 16px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #94A3B8;
      margin: 0 0 24px;
    }
    .perk-list {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 28px;
    }
    .perk-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      font-size: 14px;
      color: #CBD5E1;
      line-height: 1.5;
    }
    .perk-item:last-child {
      margin-bottom: 0;
    }
    .bullet {
      color: #A855F7;
      margin-right: 10px;
      font-weight: bold;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
      color: #FFFFFF !important;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
    }
    .footer {
      padding: 24px 40px;
      background: #08080E;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 12px;
      color: #64748B;
      text-align: center;
    }
    .footer a {
      color: #A855F7;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CELAEST</div>
    </div>
    <div class="content">
      <h1>${title}</h1>
      <p>${intro}</p>

      <div class="perk-list">
        <div style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 12px;">
          ${perksTitle}
        </div>
        ${perks
          .map(
            (p) =>
              `<div class="perk-item"><span class="bullet">&bull;</span><span>${p}</span></div>`,
          )
          .join("")}
      </div>

      <div style="text-align: center; margin: 32px 0 16px;">
        <a href="https://celaest.com" class="btn">${isEs ? "Explorar Plataforma" : "Explore Platform"} &rarr;</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CELAEST Inc. Todos los derechos reservados.<br>
      <a href="https://celaest.com">celaest.com</a> &middot; <a href="https://celaest.com/es/legal/privacy">Privacidad</a>
    </div>
  </div>
</body>
</html>`;

  return { html, text };
}
