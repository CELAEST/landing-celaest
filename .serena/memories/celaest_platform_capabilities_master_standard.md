# Contrato Canónico: Sección Plataforma / Capacidades (Master UI Mockup Standard)

## Contexto & Resumen de Implementación
Se implementó con paridad visual y de ingeniería 1:1 el diseño oficial de la sección Plataforma ("CAPACIDADES" / "Potencia tu flujo de trabajo") a partir del mockup maestro `media_1793603336593_c4c3aabc.jpg`:

1. **Header de Sección**:
   - Eyebrow Badge: Barra horizontal violeta (`w-7 h-[2px] bg-[#8b5cf6]`) + texto `CAPACIDADES` en tipografía mono con espaciado tracking amplio (`tracking-[0.25em] text-[#a78bfa] text-xs font-semibold`).
   - Título H2 a dos líneas:
     - Línea 1: `Potencia tu` (peso medio/light, blanco).
     - Línea 2: `flujo de trabajo.` (peso bold, minúsculas con punto final `flujo de trabajo.`).
   - Subtítulo neutral: `Infraestructura de nivel empresarial diseñada para la eficiencia, seguridad y escalabilidad sin límites.` en `text-neutral-400`.

2. **Columnas de Capacidades (01, 02, 03)**:
   - Diseño abierto, respirable y sin marcos exteriores gruesos ni artificiales:
     - Indicador numérico: `01`, `02`, `03` en `text-[#8b5cf6] font-mono`.
     - Títulos a dos tonos: Línea 1 ligera (`font-light`), Línea 2 destacada (`font-bold`):
       - 01: `Gestión` / `centralizada`
       - 02: `Pipeline` / `de automatización`
       - 03: `Ecosistema` / `de activos`
     - Enlace al pie: `Explorar →` perfectamente alineado y con hover micro-interactivo.

3. **Software UI Widgets (React + Tailwind CSS de Alto Rendimiento)**:
   - Arquitectura desacoplada en `src/components/landing/platform/`:
     - `widgets/members-widget.tsx`: Tabla de gestión de miembros con sidebar hexagonal, barra de búsqueda, botón `+ Invite`, y registros con avatares reales en WebP (`Esteban Rojas`, `María González`, `Carlos Méndez`, `Lucía Torres`), roles y badges de estado activo.
     - `widgets/pipeline-widget.tsx`: Editor visual de flujos con barra lateral de herramientas, nodo trigger (`Trigger: Nuevo usuario`), cable conductor violeta, nodo de acción (`Ejecutar acción: Enviar notificación`) y bifurcación a `Completado` (verde) y `Error / Reintentar` (rojo).
     - `widgets/ecosystem-widget.tsx` + `widgets/ecosystem-icons.tsx`: Tienda de activos con buscador y dropdown `Todas`, lista lateral de categorías y grid 2x2 de activos con badges e íconos vectoriales auténticos (Auto Sync, Data Fetcher, Sheets Bridge, Slack Connector).
   - Componentes modulares respetando el límite estricto de <80 líneas por archivo.
   - 100% i18n limpio vía `next-intl` (claves en `es.json` y `en.json`).
