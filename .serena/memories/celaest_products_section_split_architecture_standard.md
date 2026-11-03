# CELAEST Products & Platform Boundary Standard

## 1. División Arquitectónica 44% / 56% (Sección del Cerebro)
- **Regla**: La sección de Productos (`#products`) mantiene estrictamente los elementos existentes (Titular 56px + Subtítulo + Botón CTA a la izquierda y 3D Brain a la derecha).
- **Líneas Divisorias Hairline (`#24242b`)**:
  - Sin línea superior (`border-top`) para fluir con el Hero.
  - **Línea inferior de la sesión del cerebro activa**: `border-bottom: 1px solid #24242b;` delimitando la base del layout del cerebro.
  - **Eje vertical divisorio**: `border-right: 1px solid #24242b;` en la columna izquierda (`.prod-content-col`).
  - **Sin línea intermedia duplicada**: Se eliminó el divisor de demarcación adicional que quedaba en medio antes de Plataforma.

## 2. Continuidad y Elevación de Textos
- `<section id="products">`: `pt-0 pb-4 sm:pb-6 lg:pb-8`.
- `<section id="platform">`: `pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-16 lg:pb-20`.
- Esto mantiene la línea inferior del cerebro y sube el titular "Power your workflow" sin el hueco gigante previo.
