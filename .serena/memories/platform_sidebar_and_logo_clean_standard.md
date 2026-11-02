# CELAEST Platform Section - Sidebar Clean Styling & Brand Logo Standard

## Mejoras de Fidelidad Visual
1. **Ícono Oficial de Celaest sin Contenedores**:
   - Se reemplazó el contenedor con borde y los cubos de `MembersWidget` por el logo oficial de Celaest (`<Logo color="#f8f7fb" />`).
   - El logo se despliega directamente en el sidebar sin fondos ni bordes envolventes (`border: none; background: transparent; padding-left: 8px;`), alineado verticalmente con los ítems inferiores para un acabado minimalista y súper limpio.

2. **Estilo del Botón Activo en Sidebar (`Dashboard`)**:
   - Se eliminó el `border-left` rígido que creaba un artefacto visual asimétrico en la esquina izquierda.
   - Ahora coincide 100% con la estética suave de `Todos` (`.asset-nav-item.selected`):
     - `background: #251a49`
     - `color: #b07cff`
     - `border-radius: 6px`
     - `font-weight: 500`
     - `padding: 0 8px` uniforme.