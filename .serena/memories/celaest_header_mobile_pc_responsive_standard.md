# Standard de Header Responsivo y Multilingüe (CELAEST)

## Contexto
En dispositivos móviles (< 400px, 390px iPhone, 360px Android), el navbar superior (`header.tsx`) presentaba recortes visuales en el extremo derecho cuando se visualizaba en español (`/es`):
1. En español, `"Iniciar Sesión"` (14 caracteres) y `"Registrarse ↗"` (11 caracteres) son significativamente más largos que en inglés (`"Sign In"` y `"Sign Up ↗"`).
2. El botón `"Registrarse ↗"` se cortaba en el borde derecho de la pantalla (flecha recortada y curvatura derecha fuera del viewport).
3. El ancho intrínseco combinado (Logo tracking + LanguageSelector + Iniciar Sesión + Registrarse + paddings) superaba los 360px-390px.

## Solución Quirúrgica y Desacoplada (Mobile-Only)
Se preservó el 100% del diseño de PC mediante modificadores `sm:` y `md:`:
- `<header>`: `h-[64px] sm:h-[82px] px-3 sm:px-8 md:px-[clamp(26px,7.9vw,138px)]`
- Logo CELAEST: `gap-1.5 sm:gap-3 text-[12px] sm:text-[15px] tracking-[0.18em] sm:tracking-[0.42em] shrink-0`
- Bird Logo icon: `w-[16px] sm:w-[21px] h-[21px] sm:h-[27px]`
- LanguageSelector: `gap-1 sm:gap-2 px-1.5 sm:px-3 py-1 sm:py-2 text-[11px] sm:text-sm whitespace-nowrap` con iconos `w-3 sm:w-4 h-3 sm:h-4`
- Sign In (`Iniciar Sesión` / `Sign In`): `whitespace-nowrap px-1.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-sm`
- Sign Up (`Registrarse ↗` / `Sign Up ↗`): `whitespace-nowrap px-2.5 sm:px-5 py-1 sm:py-2.5 text-[11px] sm:text-[13px] gap-1 sm:gap-2` con `ArrowUpRight` `w-3 sm:w-3.5 h-3 sm:h-3.5`

## Calidad y Validaciones
- Mobile (360px y 390px): Tanto en inglés como en español (`/en` y `/es`), todos los elementos caben con holgura sin desborde horizontal ni saltos de línea.
- PC (>= 640px / 1366px / 1920px): Altura 82px, tracking 0.42em, tamaños de fuente y paddings de desktop 100% idénticos e intactos.
- Tests: Vitest 12/12 pasados con nuevo test unitario `__tests__/components/header.test.tsx`.
- Type-check: 0 errores.
- Build Next.js: 11/11 rutas SSG generadas exitosamente.
