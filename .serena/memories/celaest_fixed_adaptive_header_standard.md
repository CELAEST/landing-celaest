# Contrato Canónico: Header Fijo Adaptativo y Acciones de Autenticación

## Contexto & Requerimiento
Se requería dotar a la landing page de un header fijo, minimalista y ultra-limpio que incluyera:
1. Logo oficial CELAEST con tipografía espaciada y tracking premium.
2. Selector de idioma (`LanguageSelector`).
3. Botón / enlace "Iniciar Sesión" (`mode=signin`).
4. Botón píldora de vidrio "Registrarse" (`mode=signup`) con icono `ArrowUpRight`.
5. Transición adaptativa al hacer scroll sin rayas ni líneas divisorias:
   - **En la parte superior (`scrollY <= 20`)**: `bg-transparent` 100% puro. Sin ningún gradiente oscuro ni franja negra que opaque el resplandor púrpura del Hero.
   - **Al descender (`scrollY > 20`)**: Transición suave (`duration-500 ease-in-out`) a `bg-[#020202]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)]` **sin borde inferior (`border-b-0`)**. Al eliminar el borde 1px, no se forma ninguna "raya", logrando una integración 100% fluida y continua con las secciones oscuras (`#020202`) de abajo (Productos, Plataforma, Seguridad, etc.).

## Ubicación & Arquitectura
- Componente: `src/components/landing/header.tsx`
- Inserción raíz: `src/app/[locale]/page.tsx`
- Internacionalización: claves `signIn` y `signUp` en `src/i18n/messages/es.json` y `en.json`.
- Event listener optimizado mediante `window.requestAnimationFrame` pasivo para rendimiento 60 FPS garantizado sin recalcular layout en el hilo principal.
