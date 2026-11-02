# CELAEST Master Landing Layout & Quality Gate Certification

## 1. Orden Definitivo de Secciones
El orden canónico y estricto en `src/app/[locale]/page.tsx` es:
1. `HeroSection` (Viewport-locked 100vh)
2. `ProductsSection` (`pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20`, `bg-brand-dark`, divisor hairline superior)
3. `PlatformSection` (`py-14 sm:py-16 lg:py-20`, `bg-brand-dark`, divisor hairline superior)
   - Pipeline widget: Solo 2 terminales (píldora superior e inferior) en el cable entre Trigger y Acción. Sin punto central.
4. `SecuritySection` (`py-14 sm:py-16 lg:py-20`, `bg-brand-dark`, divisor hairline superior)
5. `PricingSection` (`py-14 sm:py-16 lg:py-20`, `bg-brand-dark`, divisor hairline superior, cero rejilla 40px, cero manchas neon)
6. `ArchitectureSection` (`py-14 sm:py-16 lg:py-20`, `bg-brand-dark`, divisor hairline superior)
   - 4 iconos SVG animados modularizados en `src/components/landing/architecture/`:
     - 01 Capas (LayersAnimatedIcon: levitación isométrica alternada)
     - 02 Chip (ChipAnimatedIcon: die respirando y pulsos de pines)
     - 03 Flujos (FlowsAnimatedIcon: fotones recorriendo árbol de distribución)
     - 04 Cubo (CubeAnimatedIcon: levitación 3D y rotación de luz en caras)
7. `ClosingCTASection` (`py-14 sm:py-16 lg:py-20`, `bg-brand-dark`, divisor hairline superior)
   - Solo titular editorial ("De la intención. Al resultado directo.") y 2 botones píldora ("Comenzar", "Contactar ventas"). CERO preguntas ni acordeones de FAQ.
8. `Footer` (`pt-6 sm:pt-10 pb-12 sm:pb-16`, `bg-brand-dark`, divisor hairline superior)
   - Gran Wordmark centrado `CELAEST` con luminiscencia al puntero directamente bajo el CTA de cierre.
   - CERO componente de newsletter ("Mantente Actualizado" eliminado definitivamente).

## 2. Continuidad y Demarcación Visual
- Todas las secciones utilizan fondo unificado `bg-brand-dark` (`#09090b`).
- Cada sección incluye en `top-0` el divisor demarcador idéntico:
  `<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />`
- Cadencia geométrica vertical uniforme de `py-14 sm:py-16 lg:py-20`.

## 3. Certificación de Calidad
- Vitest: 11/11 pruebas unitarias aprobadas.
- Next.js Build: 11/11 rutas SSG generadas limpiamente con código 0.
- Playwright: Inspección visual completa en vivo contra servidor de producción.
- Git: Commit `030595c` en rama `feature/landing-v2`. Working tree 100% limpio.
