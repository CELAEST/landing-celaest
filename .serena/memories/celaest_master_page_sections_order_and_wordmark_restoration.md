# Integración Global y Orden de Secciones CELAEST

## Diagnóstico y Causa Raíz
Una sesión/agente concurrente realizó un commit (`504fe81`) que reemplazó `<FAQSection />` por `<ArchitectureSection />` en `page.tsx` y revirtió `footer.tsx` a una versión anterior con el newsletter ("Mantente Actualizado"). Esto provocó que:
1. El bloque "Mantente Actualizado" reapareciera en el navegador.
2. El CTA de cierre editorial ("De la intención. Al resultado directo." con botones "Comenzar" y "Contactar ventas") no se mostrara al estar ausente el componente FAQ.
3. El wordmark gigante centrado `CELAEST` (`FooterWordmark`) no se renderizara.

## Solución y Contrato Permanente
1. **Orden de Secciones en `page.tsx`**:
   - `HeroSection`
   - `ProductsSection`
   - `PlatformSection`
   - `SecuritySection`
   - `PricingSection`
   - `ArchitectureSection` (4 pilares con SVG animados 120 FPS y cometas de luz)
   - `FAQSection` (Preguntas frecuentes + CTA editorial con botones Comenzar / Contactar ventas)
   - `Footer` (Wordmark CELAEST centrado + navegación + barra legal, SIN newsletter)

2. **Modularización Limpia (<80 líneas)**:
   - `src/components/landing/faq/faq-editorial-cta.tsx` (38 líneas)
   - `src/components/landing/faq/faq-accordion.tsx` (79 líneas)
   - `src/components/landing/faq-section.tsx` (35 líneas)
   - `src/components/landing/footer.tsx` (68 líneas)
   - `src/components/landing/architecture-section.tsx` (74 líneas)

3. **Cero Newsletter**:
   - El componente de newsletter ha sido erradicado definitivamente del layout de producción.
