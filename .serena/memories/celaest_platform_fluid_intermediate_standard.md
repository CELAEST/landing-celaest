# Standard de Calibración Fluida y Alineación Geométrica de Platform Widgets (CELAEST)

## Contexto y Diagnóstico
1. **Desalineación de Zócalos en PC Desktop (1920px / 1600px)**:
   - En el SVG `wire-branch-svg` (`viewBox="0 0 250 36"`), los zócalos de conexión a los nodos inferiores están ubicados en `x = 52` (izquierda) y `x = 198` (derecha).
   - Con respecto al centro (`x = 125`), la distancia física es exactamente `125 - 52 = 73px` y `198 - 125 = 73px` (ratio `73 / 250 = 0.292`).
   - Sin embargo, las tarjetas de resultado en base desktop tenían `left: calc(50% - 63px)` y `left: calc(50% + 63px)`.
   - Esto provocaba un desfase de 10 píxeles (`diffSuccess: +10px`, `diffError: -10px`), haciendo que las terminaciones moradas de los cables cayeran sobre el borde interno de las tarjetas en lugar de entrar exactamente por el centro superior de cada una.

2. **Alineación Geométrica en Todos los Viewports**:
   - Para cualquier ancho $W$ del SVG `wire-branch-svg`, la posición central del nodo correspondiente DEBE satisfacer:
     $$\text{Offset} = 0.292 \times W$$
   - **Base Desktop ($W = 250\text{px}$)**: Offset $= 73\text{px}$ (`calc(50% ± 73px)`).
   - **Intermedio DevTools ($W = 196\text{px}$ en $\le 1480\text{px}$)**: Offset $= 57.2\text{px} \approx 57\text{px}$ (`calc(50% ± 57px)`).
   - **Mobile Estándar ($W = 206\text{px}$ en $\le 500\text{px}$)**: Offset $= 60.1\text{px} \approx 60\text{px}$ (`calc(50% ± 60px)`).
   - **Mobile Compacto ($W = 192\text{px}$ en $\le 360\text{px}$)**: Offset $= 56.0\text{px} \approx 56\text{px}$ (`calc(50% ± 56px)`).

## Validación Automatizada de Alineación y Cero Cortes
Medición con Playwright de los centroides de tarjeta versus los zócalos del cable en 11 resoluciones en Chrome vivo:
- `1920px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 27px, marginCanvasRight: 22px`
- `1600px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 27px, marginCanvasRight: 22px`
- `1440px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 56px, marginCanvasRight: 50px`
- `1350px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 44px, marginCanvasRight: 38px`
- `1200px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 23px, marginCanvasRight: 17px`
- `1120px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 16px, marginCanvasRight: 10px`
- `1085px`: `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 10px, marginCanvasRight: 4px`
- `960px`:  `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 134px, marginCanvasRight: 128px`
- `500px`:  `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 102px, marginCanvasRight: 94px`
- `390px`:  `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 47px, marginCanvasRight: 39px`
- `360px`:  `diffSuccess: 0px, diffError: 0px, marginCanvasLeft: 41px, marginCanvasRight: 33px`

Cero desfase en todos los casos: el cable conecta matemáticamente en el centro de las tarjetas y nunca se sale del marco del widget.
