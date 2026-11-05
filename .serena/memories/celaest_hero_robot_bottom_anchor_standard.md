# Standard de Posicionamiento y Anclaje del Robot Hero (CELAEST)

## Contexto y Causa Raíz
Al abrir las herramientas de desarrollo / consola en el navegador (o en cualquier ventana donde el ancho se reduce manteniendo la altura completa, p.ej. 980px de ancho x 920px de alto):
- El robot (`.intent-robot`) estaba anclado al borde superior (`top: -4%` o `top: -6.4%`).
- Con relación de aspecto 16:9, al reducirse el ancho, la altura calculada del canvas disminuía drásticamente (~440px - 700px).
- Como el contenedor del hero mide 920px de alto y la cordillera montañosa (`.intent-ridge`) está anclada al fondo (`bottom: -8%`), el robot se encogía hacia arriba, dejando su torso cortado flotando en el aire con un vacío negro de más de 200px entre el robot y las montañas.

## Solución Quirúrgica de Anclaje Inferior
- En lugar de anclar el robot a `top`, se ancla a la base montañosa:
  ```css
  .intent-robot {
    left: auto;
    right: clamp(-360px, -28vw, -140px);
    top: auto;
    bottom: -2%;
    width: auto;
    height: clamp(660px, 94vh, 980px);
    aspect-ratio: 16 / 9;
    opacity: 0.92;
  }
  ```
- **Resultado visual**:
  1. La base del pecho del robot SIEMPRE queda enterrada detrás de las rocas y picos montañosos.
  2. Desaparece el corte horizontal en el aire y el vacío negro.
  3. La cabeza mantiene su margen natural debajo del navbar sin subir ni colisionar.
  4. En mobile (`< 760px`) y en desktop full screen (`1920x1080`), el diseño permanece 100% fiel e invariable.
