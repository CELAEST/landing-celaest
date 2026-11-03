# Standardized Section Headers Cadence & Vertical Symmetry Contract

## Standard Definition
Para garantizar que todos los encabezados de sección en la landing page de CELAEST mantengan una estandarización de espacios uniforme, simétrica y visualmente balanceada sin importar el idioma (Español o Inglés), se define la siguiente norma de diseño editorial:

1. **Espacio Superior (`spaceAbove`)**:
   - Medida: **48px** (`pt-12` o `padding-top: 48px`).
   - Ubicación: Desde la línea divisoria / límite superior de la sección hasta la cúspide del titular `h2`.

2. **Espacio Entre Titular y Subtítulo (`gap`)**:
   - Medida: **16px** (`mb-4` o `margin-bottom: 16px`).
   - Ubicación: Margen inferior del `h2` (`.landing-section-title`, `.capabilities-title`, `.pricing-title`, `.eco-title`).

3. **Espacio Inferior (`spaceBelow`)**:
   - Medida: **48px** (`padding-bottom: 48px` o `mb-12`).
   - Ubicación: Desde la base del subtítulo `p` hasta la línea divisoria / delimitador inferior del encabezado (`border-bottom: 1px solid #24242b` o límite del contenedor).

## Secciones Implementadas y Validadas
- **#products** (`ProductsSection`): `pt-0 pb-0`, `prod-master-layout` con `border-bottom: 1px solid #24242b` a ras de sección.
- **#platform** (`PlatformSection`): `pt-12 pb-0`, `capabilities-header` con `padding-bottom: 48px` y `border-bottom: 1px solid #24242b`.
- **#security** (`SecuritySection`): `pt-12 pb-0`, cabecera con `mb-12` hacia el `border-top` de `sec-master-layout`.
- **#pricing** (`PricingSection`): `pt-12 pb-0`, `pricing-header-layout` con `padding-bottom: 48px` y `border-bottom: 1px solid #24242b`.
- **#architecture** (`ArchitectureSection`): `padding: 48px 0 88px`, `eco-header` con `padding-bottom: 48px` y `border-bottom: 1px solid #24242b`.

## Reglas Anti-Regresión
- Prohibido agregar paddings arbitrarios (`pt-16`, `pt-20`, `mb-16`, etc.) en los encabezados de sección.
- Todo nuevo encabezado editorial debe adherirse estrictamente a la proporción 48px / 16px / 48px.
