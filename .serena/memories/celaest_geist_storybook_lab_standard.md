# Contrato Canónico: Integración de Storybook 10 y Vercel Geist Design System en Lab

## Resumen de la Implementación
Se inicializó Storybook 10 y se construyó el laboratorio interactivo del sistema de diseño Vercel Geist en `c:\Users\user\Music\lab`:

1. **Instalación de Storybook 10**:
   - `npm run storybook` configurado con `@storybook/react-vite` v10.6.5.
   - Addons incluidos: `@chromatic-com/storybook`, `@storybook/addon-vitest`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-mcp`.
   - Compilación exitosa en `storybook-static`.

2. **Geist Component Suite (`lab/src/components/geist`)**:
   - `GeistButton`: Variantes `primary` (sólido blanco), `secondary` (borde sutil), `ghost`, `danger`, con soporte de badges Kbd (`⌘K`).
   - `GeistBadge`: Indicadores de estado con punto de pulso activo (Success, Warning, Error, Neutral, Purple AI).
   - `GeistTabs`: Pestañas con indicador deslizante continuo.
   - `GeistMetricCard`: Tarjetas de analítica con números tabulares y tendencias.
   - `GeistSnippet`: Bloque de terminal con botón de copia reactivo.
   - `GeistInput` & `GeistToggle`: Controles de formulario de alto contraste.
   - `geist.css`: Tokens de diseño exactos de Vercel Geist (Canvas `#000`, Surface `#0a0a0a`, Elevated `#111111`, Borders `#2a2a2a`, Accent `#8b5cf6`).

3. **Showcase Interactivo en Lab ([`Example10_GeistDesignSystem`](file:///c:/Users/user/Music/lab/src/components/examples/Example10_GeistDesignSystem.tsx))**:
   - Integrado en `App.tsx` bajo la tecla `[10]` o shortcut `G`.
   - Vistas interactivas de Overview (métricas y despliegue), Componentes, Pipeline de producción y Escala de tokens.
   - Historias de Storybook disponibles en `src/stories/Geist.stories.tsx`.
