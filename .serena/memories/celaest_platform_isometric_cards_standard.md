# Contrato Canónico: Cards Isométricas 3D de Plataforma (Reemplazo de Videos)

## Contexto & Requerimiento
Se reemplazó la sección previa de videos genéricos `/sesion/1.mp4`, `2.mp4` y `3.mp4` por un trío de tarjetas de diseño isométrico de alta gama con soporte para interactividad 3D, profundidad espacial y cero retraso de carga:

1. **Card 1: Gestión Centralizada (`management`)**
   - Ícono superior: `Layers` (Capas) en contenedor de vidrio con brillo especular.
   - Ilustración 3D: Paneles de dashboard translúcidos con anillo orbital neón.
   - Copy: "Gestión Centralizada" / "Administra licencias, miembros y versiones desde un único panel, de forma simple y segura."
   - Fondo: `card-bg-1.webp` con base ahumada.

2. **Card 2: Pipeline de Automatización (`workflow`) - Destacada**
   - Perímetro neón: Borde púrpura reactivo `border-2 border-[#a78bfa]/80 shadow-[0_0_35px_-5px_rgba(167,139,250,0.35)]`.
   - Badge superior: `● Más popular` con pulso de luz neón.
   - Ícono superior: `Zap` (Rayo) en caja de vidrio.
   - Ilustración 3D: Cadena de bloques y conectores con nodo central de energía cúbica.
   - Copy: "Pipeline de Automatización" / "Automatiza tareas y procesos repetitivos para enfocarte en lo que realmente importa."

3. **Card 3: Ecosistema de Activos (`ecosystem`)**
   - Ícono superior: `Shield` (Escudo) en caja de vidrio.
   - Ilustración 3D: Pedestal tecnológico con cubos de cristal e insignias de código, apps y analítica.
   - Copy: "Ecosistema de Activos" / "Explora y conecta tus macros, scripts y herramientas en un solo lugar."
   - Fondo: `card-bg-3.webp` con arco de luz inferior.

## Arquitectura & Rendimiento
- Componente desacoplado: `src/components/landing/platform-card.tsx` (bajo el estándar de Clean Architecture de componentes atómicos).
- Orquestador: `src/components/landing/platform-section.tsx`.
- Optimización de activos: Ilustraciones recortadas y convertidas a WebP de alta fidelidad (<50 KB cada una, <190 KB en total para toda la sección).
- Dinamismo 3D:
  - Levitación continua mediante `framer-motion` (`y: [-4, 4, -4]`).
  - Parallax Tilt 3D reactivo al cursor con física de resorte (`useSpring`, `rotateX`, `rotateY`, `translateZ(30px)`).
  - Spotlight radial interactivo que sigue las coordenadas relativas del mouse.
