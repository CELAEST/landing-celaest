# CELAEST Architecture Typography Standard

## Resumen del Ajuste Tipográfico
- **Problema Detectado**: El uso de `font-mono` provocaba que navegadores en Windows recurrieran a Courier New / Consolas (tipografía monoespaciada con serifs/slabs toscos de máquina de escribir), desentonando con el sistema de diseño neo-grotesque obsidian de CELAEST.
- **Corrección**:
  - `IMPACTO EMPRESARIAL`: Actualizado a `font-sans font-medium text-[11px] tracking-[0.2em] uppercase` (Inter).
  - Números de pilares (`01`, `02`, `03`, `04`): Actualizados a `font-sans font-medium text-[15px] tabular-nums` (Inter).
- **Certificación**:
  - Compilación `npm run build` aprobada con código 0.
  - Verificado en Playwright contra servidor de producción en vivo.
  - Commit registrado en `feature/landing-v2`: `c1ddea0`.
