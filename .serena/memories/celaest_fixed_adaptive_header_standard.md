# Contrato Canónico: Header Fijo Adaptativo y Acciones de Autenticación

## Contexto & Requerimiento
Se requería dotar a la landing page de un header fijo, minimalista y ultra-limpio que incluyera:
1. Logo oficial CELAEST con tipografía espaciada y tracking premium.
2. Selector de idioma (`LanguageSelector`).
3. Botón / enlace "Iniciar Sesión" (`mode=signin`).
4. Botón píldora de vidrio "Registrarse" (`mode=signup`) con icono `ArrowUpRight`.
5. Transición adaptativa al hacer scroll:
   - En la parte superior (`scrollY <= 20`): transparente con gradiente cinemático sutil superior para legibilidad sobre el render del robot.
   - Al descender (`scrollY > 20`): se transforma suavemente a fondo negro profundo (`bg-[#020202]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.85)]`), integrándose de forma 100% armónica con las secciones oscuras de Productos, Plataforma, Seguridad, Precios y FAQ.

## Ubicación & Arquitectura
- Componente: `src/components/landing/header.tsx`
- Inserción raíz: `src/app/[locale]/page.tsx`
- Internacionalización: claves `signIn` y `signUp` en `src/i18n/messages/es.json` y `en.json`.
- Event listener optimizado mediante `window.requestAnimationFrame` pasivo para rendimiento 60 FPS garantizado sin recalcular layout en el hilo principal.
