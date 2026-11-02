# CELAEST Architecture Section - Editorial Minimalist Standard

## Contexto & Propósito
Siguiendo la referencia exacta provista en `c:\Users\user\Downloads\replicar-diseno-web-arriba-footer` y la captura de diseño de alta gama, se rediseñó la sección de Arquitectura (`ArchitectureSection`) eliminando por completo cualquier card encajonada, borde denso o contenedor pesado.

## Estructura de Diseño Editorial
1. **Header Principal**:
   - Etiqueta de regla: línea sólida de `49px` con texto mono espaciado `— SYSTEM ARCHITECTURE` (`ARQUITECTURA DEL SISTEMA`).
   - Título editorial en dos tonos: `The CELAEST` (blanco puro) y `Ecosystem.` (`#9da2b1`) a 96px de escala tipográfica con tracking negativo y leading de 0.88.
   - Subtítulo editorial en color atenuado `#9da2b1`.

2. **Los 4 Pilares del Ecosistema**:
   - Conector continuo hairline horizontal (`#4d4e53`) a la altura del centro de los iconos (44px) que conecta fluidamente los 4 bloques.
   - Iconos vectoriales de línea fina en color lavanda `#D0C7FF`:
     1. `01 Centralization & Governance` / `Centralización & Gobernanza` (Icono de capas isométricas superpuestas).
     2. `02 IA Mesh` / `Malla IA` (Icono de microchip con pines de conexión).
     3. `03 Autonomous Flows` / `Flujos Autónomos` (Icono de organigrama jerárquico).
     4. `04 Asset Marketplace & Solutions` / `Mercado de Activos & Soluciones` (Icono de cubo isométrico tridimensional).
   - Tipografía limpia: número en fuente mono, título blanco a 20-22px y descripción fluida en `#9ba0ae`.

3. **Sección de Impacto Empresarial (Business Impact)**:
   - Divisor superior hairline `#4b4d51`.
   - Etiqueta de regla: `— BUSINESS IMPACT` (`IMPACTO EMPRESARIAL`).
   - Cuadrícula de 4 columnas:
     - Columna Lead: `Less fragmentation.` (blanco) / `More execution capacity.` (`#9da2b1`).
     - 3 Columnas de métricas con separadores verticales `#4b4d51`:
       - `-70% Technical Debt` (Deuda Técnica)
       - `3x Operational Efficiency` (Eficiencia Operativa)
       - `10x Scalability` (Escalabilidad)

## Estándar Técnico
- Cero assets pesados; iconos vectoriales puros SVG optimizados e incrustados para renderizado instantáneo sin parpadeo.
- Soporte 100% bilingüe vía `next-intl` (`en.json` y `es.json`) con ortografía y acentuación precisa.
- Verificación en servidor vivo (`/es` y `/en`) con Playwright.
