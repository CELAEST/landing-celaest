# CELAEST Landing Page - Background Continuity & Grid Symmetry Standard

## 1. Armonización Cromática Estricta (Zero Pure Black `#000000`)
- **Fondo Unificado**: Todas las secciones (`Platform`, `Security`, `Pricing`, `Architecture`, `ClosingCTA`) comparten estrictamente `bg-brand-dark` (`#050505`).
- **Atmósfera y Brillo**:
  - `ConstellationBackground` integrado con máscara elíptica radial.
  - Brillo difuso sutil: `w-[700px] h-[400px] bg-purple-600/[0.03-0.04] blur-[120px-140px] rounded-full`.
  - Divisores hairline sutiles: `h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent`.
  - Queda terminantemente prohibido usar fondos `#000000` planos que rompan la continuidad de scroll.

## 2. Simetría Lateral Absoluta (1360px / `max-w-[85rem]`)
- Todos los contenedores principales de sección utilizan exactamente:
  `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10`.
- En `PricingSection`, el grid de tarjetas ocupa el ancho completo `grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch`, alineándose con las 3 columnas de `PlatformSection`.

## 3. Sección de Seguridad (Estructura B - Unified Master Stage)
- Componente: `UnifiedParticleMasterStage` montado en `src/components/landing/security/unified-particle-master-stage.tsx`.
- Estilos: `src/components/landing/security/security-stage.css`.
- Asimetría 44% / 56%: 3 pilares con indicador lateral de 3px y canvas 3D heroico que transiciona dinámicamente entre Escudo Cuántico (01), Candado 3D (02) y Red Global (03). Cero tarjetas sobre tarjetas.
- Copywriting 100% fiel a los archivos de mensajes `es.json` y `en.json`.

## 4. Tarjetas de Plataforma (Potencia tu flujo de trabajo)
- `MembersWidget` implementa `.preview.members-preview` con su mini-sidebar brandeado con isotipo `<Logo color="#f8f7fb" />` + `CELAEST`, compartiendo idéntica altura (261px), borde, gradiente y radio con `PipelineWidget` y `EcosystemWidget`.
