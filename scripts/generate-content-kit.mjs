#!/usr/bin/env node
/**
 * Generates multi-platform distribution kits (LinkedIn, X Thread, Short Video Script,
 * and Newsletter) from src/content/guides.json so every published guide automatically
 * produces ready-to-schedule social content.
 */

import fs from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://celaest.com").replace(/\/$/, "");
const GUIDES_PATH = path.resolve(process.cwd(), "src/content/guides.json");
const OUTPUT_ROOT = path.resolve(process.cwd(), "content/social-kits");

function buildLinkedInPost(guide, locale) {
  const c = guide[locale];
  const guideUrl = `${SITE_URL}/${locale}/guides/${guide.slug}`;
  const solutionUrl = `${SITE_URL}/${locale}/solutions/${guide.targetSolution}`;
  const bullets = c.socialHooks.takeaways.map((t) => `→ ${t}`).join("\n");

  if (locale === "en") {
    return `# LinkedIn Post (EN) — ${c.title}

${c.socialHooks.hook}

Here is what engineering and ops leaders actually need to know:

${bullets}

Full technical breakdown (plus architecture FAQ):
${guideUrl}

Explore the platform:
${solutionUrl}

#AI #EnterpriseAI #Automation #CELAEST #SaaS
`;
  }

  return `# Post de LinkedIn (ES) — ${c.title}

${c.socialHooks.hook}

En esta guía práctica desglosamos punto por punto cómo resolverlo en producción:

${bullets}

Lee el playbook completo aquí:
${guideUrl}

${c.socialHooks.cta}:
${solutionUrl}

#InteligenciaArtificial #Automatización #IAEmpresarial #CELAEST #SaaS
`;
}

function buildXThread(guide) {
  const c = guide.es;
  const guideUrl = `${SITE_URL}/es/guides/${guide.slug}`;
  const tweets = [
    `1/ ${c.socialHooks.hook}\n\nAbrimos hilo rápido 🧵👇`,
    ...c.socialHooks.takeaways.map((item, idx) => `${idx + 2}/ ${item}`),
    `${c.socialHooks.takeaways.length + 2}/ Guía completa paso a paso (+ FAQ técnico y arquitectura):\n${guideUrl}\n\n${c.socialHooks.cta} → ${SITE_URL}/es/solutions/${guide.targetSolution}`,
  ];

  return `# Hilo para X / Threads — ${c.title}\n\n${tweets.join("\n\n---\n\n")}\n`;
}

function buildShortVideoScript(guide) {
  const c = guide.es;
  const guideUrl = `${SITE_URL}/es/guides/${guide.slug}`;

  return `# Guion Video Corto (45s · Reels / TikTok / YouTube Shorts)

**Tema:** ${c.title}

- **[0:00 - 0:04 · GANCHO VISUAL]:** "${c.socialHooks.hook}"
- **[0:04 - 0:15 · EL PROBLEMA]:** ${c.sections[0]?.summary || c.description}
- **[0:15 - 0:35 · LA SOLUCIÓN EN 3 PUNTOS]:**
  1. ${c.socialHooks.takeaways[0] || ""}
  2. ${c.socialHooks.takeaways[1] || ""}
  3. ${c.socialHooks.takeaways[2] || ""}
- **[0:35 - 0:45 · LLAMADO A LA ACCIÓN]:** "Si quieres ver la guía completa y probarlo hoy en tu navegador, entra al enlace de nuestro perfil: ${guideUrl}"
`;
}

function buildNewsletterSnippet(guide) {
  const c = guide.es;
  const guideUrl = `${SITE_URL}/es/guides/${guide.slug}`;

  return `# Bloque Newsletter — ${c.title}

**Asunto sugerido:** ${c.title} ${c.titleHighlight}

Hola,

${c.description}

**Lo que vas a encontrar en este playbook (${guide.readMinutes} min):**
${c.socialHooks.takeaways.map((t) => `- ${t}`).join("\n")}

👉 [Leer la guía completa en CELAEST](${guideUrl})
`;
}

function main() {
  const guides = JSON.parse(fs.readFileSync(GUIDES_PATH, "utf-8"));
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

  for (const guide of guides) {
    const dir = path.join(OUTPUT_ROOT, guide.slug);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, "linkedin-es.md"), buildLinkedInPost(guide, "es"), "utf-8");
    fs.writeFileSync(path.join(dir, "linkedin-en.md"), buildLinkedInPost(guide, "en"), "utf-8");
    fs.writeFileSync(path.join(dir, "x-thread-es.md"), buildXThread(guide), "utf-8");
    fs.writeFileSync(path.join(dir, "short-video-es.md"), buildShortVideoScript(guide), "utf-8");
    fs.writeFileSync(path.join(dir, "newsletter-es.md"), buildNewsletterSnippet(guide), "utf-8");
  }

  const readme = `# CELAEST Multi-Platform Content Kits

Generado automáticamente desde \`src/content/guides.json\`.

## Automatización con RSS (Buffer / Metricool / n8n / Make)
- **Feed RSS Español:** ${SITE_URL}/rss.xml
- **Feed RSS Inglés:** ${SITE_URL}/rss-en.xml

Conecta cualquiera de esos dos feeds en **Buffer** o **Metricool** para que cada nueva guía publicada en \`celaest.com\` entre automáticamente a tu cola de LinkedIn y X.

## Carpetas generadas (${guides.length} guías)
${guides.map((g) => `- \`${g.slug}/\` → \`linkedin-es.md\`, \`linkedin-en.md\`, \`x-thread-es.md\`, \`short-video-es.md\`, \`newsletter-es.md\``).join("\n")}
`;
  fs.writeFileSync(path.join(OUTPUT_ROOT, "README.md"), readme, "utf-8");

  console.log(`Generated ${guides.length} multi-platform social kits in content/social-kits/`);
}

main();
