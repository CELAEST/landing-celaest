# Contrato Canónico: Sección Plataforma / Capacidades (World-Class Engineering & Micro-UI Standard)

## Técnicas de Diseño de Alto Nivel Empleadas
Siguiendo las técnicas de repositorios de referencia mundial en diseño de interfaces (Linear, Vercel, Raycast):

1. **Bevel Highlights & Vidrio Multicapa**:
   - Resalte especular superior de 1px (`before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent`).
   - Profundidad mediante paneles obsidian `#0c0d15` y micro-bordes `border-white/[0.08]` que ofrecen contraste sin saturación ni contornos falsos.
   - Resplandor atmosférico violeta de fondo (`bg-purple-600/[0.04] blur-[120px]`).

2. **Tipografía y Proporciones Sin Truncamiento**:
   - Espaciado ampliado de contenedor maestro `max-w-[1360px]` con grid `gap-7 xl:gap-8` para otorgar ~420px de respiración a cada una de las 3 columnas.
   - Cero elipsis no deseada: todos los textos de navegación (`Dashboard`, `Members`, `Licenses`, `Integrations`, `Settings`), nombres de miembros (`Carlos Méndez`), roles y categorías (`Integraciones`, `Herramientas`) se despliegan en tipografía completa con legibilidad absoluta.

3. **Software UI Widgets**:
   - `MembersWidget`: Sidebar completo con icono hexagonal y selector activo violeta con indicador vertical `border-l-2 border-l-[#8b5cf6]`, barra de búsqueda, botón `+ Invite`, registros con fotos circulares en WebP (`/images/platform/avatars/`), badges activos con pulso verde esmeralda y paginación.
   - `PipelineWidget`: Toolstrip lateral con botón Play violeta e iconografía de herramientas, nodos de flujo ampliados (`w-[205px]` y `w-[225px]`) con pines de anclaje, cables SVG con codos curvados y estados finales `Completado` (verde) y `Error / Reintentar` (rojo).
   - `EcosystemWidget`: Buscador superior y filtro `Todas ⌄`, barra de categorías y grid 2x2 con iconos auténticos de Google Sheets y Slack.

4. **Reglas de Calidad**:
   - Componentes React <80 líneas desacoplados.
   - 100% i18n limpio con `next-intl`.
