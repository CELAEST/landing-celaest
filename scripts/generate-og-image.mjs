import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const iconSvg = fs.readFileSync(path.resolve("src/app/icon.svg"), "utf-8");
const pathMatch = iconSvg.match(/<path d="([^"]+)"/);
const logoPathD = pathMatch ? pathMatch[1] : "";

const width = 1200;
const height = 630;

function createOgSvg({ headline, subtitle }) {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlowCenter" cx="50%" cy="42%" r="58%">
      <stop offset="0%" stop-color="#6D28D9" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#4C1D95" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#030307" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="logoHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#A78BFA" stop-opacity="0.38"/>
      <stop offset="60%" stop-color="#7C3AED" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#030307" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="#EDE9FE"/>
      <stop offset="100%" stop-color="#C4B5FD"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="25%" stop-color="#A78BFA" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="75%" stop-color="#A78BFA" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="pillBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A78BFA" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.20"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.028"/>
    </pattern>
  </defs>

  <!-- Obsidian Base -->
  <rect width="${width}" height="${height}" fill="#030307"/>

  <!-- Subtle Architectural Grid -->
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Atmospheric Violet Glow -->
  <rect width="${width}" height="${height}" fill="url(#bgGlowCenter)"/>
  <circle cx="600" cy="215" r="190" fill="url(#logoHalo)"/>

  <!-- Outer Editorial Frame -->
  <rect x="36" y="36" width="1128" height="558" rx="24" fill="none" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1"/>
  <rect x="280" y="36" width="640" height="1.5" fill="url(#borderGrad)"/>

  <!-- Corner Accents -->
  <circle cx="64" cy="64" r="3" fill="#A78BFA" fill-opacity="0.5"/>
  <circle cx="1136" cy="64" r="3" fill="#A78BFA" fill-opacity="0.5"/>
  <circle cx="64" cy="566" r="3" fill="#A78BFA" fill-opacity="0.5"/>
  <circle cx="1136" cy="566" r="3" fill="#A78BFA" fill-opacity="0.5"/>

  <!-- Official CELAEST Emblem Centered -->
  <g transform="translate(546, 92) scale(0.285)">
    <path d="${logoPathD}" fill="url(#logoGrad)"/>
  </g>

  <!-- CELAEST Wordmark -->
  <text
    x="600"
    y="318"
    text-anchor="middle"
    fill="#F8F7FB"
    font-family="Segoe UI, Inter, Arial, sans-serif"
    font-size="68"
    font-weight="700"
    letter-spacing="22"
  >CELAEST</text>

  <!-- Subtle Violet Divider -->
  <rect x="440" y="348" width="320" height="1.5" fill="url(#borderGrad)"/>

  <!-- Main Value Proposition Headline -->
  <text
    x="600"
    y="404"
    text-anchor="middle"
    fill="#E4E4E7"
    font-family="Segoe UI, Inter, Arial, sans-serif"
    font-size="28"
    font-weight="600"
    letter-spacing="1.5"
  >${headline}</text>

  <!-- Subtitle -->
  <text
    x="600"
    y="446"
    text-anchor="middle"
    fill="#A1A1AA"
    font-family="Segoe UI, Inter, Arial, sans-serif"
    font-size="20"
    font-weight="400"
    letter-spacing="0.8"
  >${subtitle}</text>

  <!-- Bottom Pill Badge -->
  <g transform="translate(465, 492)">
    <rect width="270" height="44" rx="22" fill="#0B0A14" stroke="url(#pillBorder)" stroke-width="1.2"/>
    <circle cx="30" cy="22" r="4.5" fill="#A78BFA"/>
    <text
      x="145"
      y="28"
      text-anchor="middle"
      fill="#EDE9FE"
      font-family="Consolas, Segoe UI, monospace"
      font-size="16"
      font-weight="600"
      letter-spacing="2.5"
    >celaest.com</text>
  </g>
</svg>
`;
}

await sharp(
  Buffer.from(
    createOgSvg({
      headline: "DE LA INTENCIÓN AL RESULTADO",
      subtitle:
        "Sistemas de IA Empresarial · CELAEST Lingua · Malla IA · Activos Digitales",
    }),
  ),
)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(path.resolve("public/og-image.png"));

await sharp(
  Buffer.from(
    createOgSvg({
      headline: "FROM INTENTION TO RESULTS",
      subtitle:
        "Enterprise AI Systems · CELAEST Lingua · AI Mesh · Digital Assets",
    }),
  ),
)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(path.resolve("public/og-image-en.png"));

console.log("Generated public/og-image.png and public/og-image-en.png");
