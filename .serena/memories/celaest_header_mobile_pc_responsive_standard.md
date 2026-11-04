# Standard de Header Responsivo y Prevencion de Envoltura (CELAEST)

## Contexto
En dispositivos moviles (< 400px, 390px iPhone, 360px Android), el navbar superior (`header.tsx`) sufria envoltura de texto no deseada:
1. "Sign In" se dividia verticalmente en dos lineas (`Sign\nIn`).
2. El boton "Sign Up ↗" se rompia en dos lineas (`Sign\nUp ↗`), generando un boton vertical deformado en vez de una capsula horizontal elegante.
3. El ancho total intrinsico (Logo con tracking de 0.42em + LanguageSelector + Sign In + Sign Up + padding px-5) sobrepasaba los 360px-390px disponibles.

## Solucion Quirurgica sin Modificar PC
Se conservo 100% intacta la composicion y medidas de PC usando modificadores Tailwind `sm:` y `md:`:
- `<header>`: `h-[64px] sm:h-[82px] px-3.5 sm:px-8 md:px-[clamp(26px,7.9vw,138px)]`
- Logo CELAEST: `text-[13px] sm:text-[15px] tracking-[0.3em] sm:tracking-[0.42em] shrink-0`
- LanguageSelector: `gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap`
- Sign In: `whitespace-nowrap px-2 sm:px-3.5 text-[12px] sm:text-sm`
- Sign Up: `whitespace-nowrap px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[11.5px] sm:text-[13px]` con icono `shrink-0`

## Calidad y Validaciones
- Mobile (360px y 390px): Todos los elementos caben comodamente en una sola linea horizontal sin cortes ni saltos de linea.
- PC (>= 640px / 1366px / 1920px): Altura 82px, tracking 0.42em, padding desktop original 100% invariante.
- Tests: Vitest 11/11 pasados, type-check 0 errores, build SSG 11/11 paginas estaticas.
