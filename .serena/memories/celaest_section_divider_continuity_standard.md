# Standard de Demarcación y Continuidad de Secciones CELAEST

## Contexto y Diagnóstico
En la transición entre `#pricing` y `#faq` se detectó una discontinuidad visual severa (línea no coincidente y franja oscura abrupta en "Preguntas Frecuentes") comparado con el estándar impecable de "Precios Simples y Transparentes".

### Causas Identificadas
1. **Conflicto de Colores de Fondo Base**:
   - `page.tsx` y `PricingSection` usaban `bg-brand-dark` (`#050505`).
   - `FAQSection` tenía el tag `<section>` transparente e inyectaba internamente `<div className="absolute inset-0 bg-brand-deep pointer-events-none" />` (`#020202`), creando un corte de contraste horizontal.
2. **Máscara Artificial con Franja Negra**:
   - En `FAQSection`, el contenedor de la constelación aplicaba `[mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_100%)]`, dejando un bloque negro absoluto en el primer 18% del alto de la sección.
3. **Gradiente Radial en `top-0`**:
   - `bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.10)_0%,transparent_70%)]` anclado a `top-0` proyectaba un corte lumínico directo sobre la costura.
4. **Rejillas Compitiendo**:
   - Rejillas de perspectiva (`4rem` y `1rem`) chocaban con la limpieza minimalista de la sección adyacente.

## Regla y Arquitectura de Secciones (Gold Standard)
Cada sección (`Products`, `Platform`, `Security`, `Pricing`, `FAQ`, `Footer`) DEBE cumplir 1:1 con este contrato:

1. **Fondo Base Unificado**:
   - `<section className="... bg-brand-dark relative overflow-hidden">` (o `footer className="bg-brand-dark..."`).
   - Cero divs absolutos forzando `bg-brand-deep` en la costura.

2. **Divisor Demarcador Idéntico (Hairline 1px)**:
   ```tsx
   <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />
   ```

3. **Iluminación y Efectos**:
   - Cero gradientes lumínicos anclados a `top-0` o `bottom-0`.
   - Halos sutiles centrados en el contenido (`top-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.03] blur-[120px]`).
   - Constelaciones con desvanecimiento radial suave (`radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_90%)`), nunca con cortes lineales de máscara en el borde superior.
