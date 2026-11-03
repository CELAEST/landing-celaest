# CELAEST Architecture Ecosystem Studio & Landing Standard

## 1. Conectores Láser Segmentados (Zero Obstrucción de SVGs)
- **Regla Fundamental**: Prohibido trazar líneas continuas rectas que atraviesen o pasen por encima de los iconos SVG en los 4 pilares.
- **Geometría de Puentes**:
  - Los pilares se conectan exclusivamente con puentes entre columnas adyacentes: `Puente 1 (01 -> 02)`, `Puente 2 (02 -> 03)`, `Puente 3 (03 -> 04)`.
  - El pilar final (04) no tiene conector saliente.
  - El extremo izquierdo del pilar 01 no tiene conector entrante.
  - En cada columna $i$, el conector tiene `position: absolute; top: 52px; left: calc(50% + 56px); width: calc(100% + 28px - 112px); height: 1px; background: #24242b;`.
  - Esto garantiza **13.0px exactos** de espacio de aire simétrico a la izquierda y derecha de cada SVG de 86px (`radio = 43px`).
  - Fotón láser viajero (`.eco-connector-photon`): Pulso secuencial con `animation-delay: 0s`, `1.2s`, `2.4s` a lo largo de los tres puentes.

## 2. Encabezado Centrado y Simétrico
- `.eco-header` tiene `text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;`.
- `.eco-title` usa la escala tipográfica estándar: `clamp(32px, 4.2vw, 56px)`, `line-height: 1.14`, `letter-spacing: -1.4px`, `font-weight: 600`.
- Subtítulo centrado con `max-width: 720px; margin: 0 auto;`.

## 3. Sección Inferior: Impacto Empresarial Cerrado
- `border-top: 1px solid #24242b; border-bottom: 1px solid #24242b;`.
- La línea superior inicia **adentro**, directamente arriba de `IMPACTO EMPRESARIAL`.
- Modos de espaciado: Modo "Más Aire" (`1.35fr 1fr 1fr 1fr` con padding 38px/36px) y números en gradiente Neón.
