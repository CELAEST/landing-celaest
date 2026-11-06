# CELAEST Standalone FAQ & Clean Legal Separation Matrix (Zero-Smoke Standard)

## 1. Desacoplamiento Absoluto de FAQ (`/faq`) vs Políticas Legales (`/legal/*`)
- **Problema previo resuelto**: Al hacer clic en "Preguntas Frecuentes", el usuario era enviado a `/legal/faq`, donde veía la barra de contratos legales ("01 Términos de Servicio / 02 Privacidad..."), lo que causaba confusión ("me envía a algo diferente a FAQ").
- **Solución implementada**:
  - `FAQ` vive en su propia página editorial independiente: `src/app/[locale]/faq/page.tsx` (`/faq`).
  - Encabezado directo y limpio: "Preguntas Frecuentes / Respuestas Claras".
  - Sin barra de contratos legales `LegalTabs`.
  - Índice lateral rápido (Sticky TOC) para saltar entre las preguntas.
  - Enlace de retorno visible "← Volver al inicio".
  - Las 5 políticas legales se mantienen exclusivamente en `/legal/*` con sus 5 pestañas limpias:
    1. Términos de Servicio (`/legal/terms`)
    2. Privacidad & Malla IA (`/legal/privacy`)
    3. Política de Reembolsos (`/legal/refunds`)
    4. Licencia de Activos (`/legal/license`)
    5. Política de Cookies (`/legal/cookies`)

## 2. Footer 100% Depurado (Cero Mailtos, Cero Enlaces Rotos)
1. **PRODUCTO**:
   - `Catálogo de Assets` -> `${DASHBOARD_URL}/?tab=marketplace` (Abre pestaña nueva)
   - `Macros & Scripts` -> `/#products` (Smooth scroll en landing)
   - `Planes & Precios` -> `/#pricing` (Smooth scroll en landing)
2. **PLATAFORMA**:
   - `Arquitectura del Sistema` -> `/#architecture` (Smooth scroll en landing)
   - `Malla IA & Agentes` -> `/#platform` (Smooth scroll en landing)
   - `Seguridad & Aislamiento` -> `/#security` (Smooth scroll en landing)
3. **SOPORTE**:
   - `Preguntas Frecuentes` -> `/faq` (Página editorial independiente)
   - `Documentación Técnica` -> `${DASHBOARD_URL}/?tab=docs` (Abre pestaña nueva)
4. **LEGAL**:
   - `Términos de Servicio` -> `/legal/terms`
   - `Política de Privacidad` -> `/legal/privacy`
   - `Política de Reembolsos` -> `/legal/refunds`
   - `Acuerdo de Licencia` -> `/legal/license`
   - `Política de Cookies` -> `/legal/cookies`
5. **MARCA (BRAND)**:
   - Solo canales activos y reales: GitHub (`https://github.com/celaest`, 200 OK) y correo directo.

## 3. Estado de Certificación
- `tsc --noEmit`: 0 errores.
- `vitest`: 12/12 pruebas unitarias aprobadas.
- `next build`: 21/21 páginas estáticas compiladas limpiamente.
- Sincronizado en commit `c61acf7` en `feature/landing-v2` y `main`.
