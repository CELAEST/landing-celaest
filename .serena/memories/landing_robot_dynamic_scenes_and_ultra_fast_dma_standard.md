# CELAEST Landing & Lingua Robot: Dynamic Scenes & Ultra-Fast DMA Architecture

## 1. Evaluación de Interacciones del Robot (Lingua vs Landing)
- **Lingua (`celaest-english-front`)**:
  - Modelo 3D nativo Three.js (`Meshy_AI...glb` + `visor.glb`).
  - `ProfessorRigController`: Slerp exponencial, micro-respiración, seguimiento de mirada suave 60/120 FPS.
  - `CyberVisorFaceEngine`: 5 arquetipos de visor (Astro Chibi, OLED Matrix, Jarvis HUD, Quantum Nodes, Linear Horizon), 5 emociones reactivas (`idle`, `speaking`, `listening`, `happy`, `thinking`), ondas vocales en tiempo real y radar de audio.
  - Presets de encuadre: `tutor-stage`, `bust-guide`, `face-focus`, `full-body`.
- **Landing (`landing-celaest`)**:
  - Hero Stage con monolito curvo y lienzo desincronizado de alto rendimiento.
  - Secuencias optimizadas: `robot-gaze.bin` (3.1 MB, 60 frames) y `robot-saludo.bin` (4.5 MB, 72 frames).

## 2. Dynamic Scenes System (`useRobotSequenceCanvas`)
- **`gaze` (Rastreo 120 FPS)**: Mirada orgánica en tiempo real con kinematics sintonizados (`speed = 16.0`, `maxStep = dt * 96.0`), eliminando cualquier latencia de arrastre.
- **`saludo` (Ola / Greet)**: Giro decisivo a frame 60 (`speed = 18.0`, `maxStep = dt * 110.0`) y ejecución fluida del saludo a 30 FPS.
- **`explaining` (Modo Mentor / Explicación)**: Asentimientos conversacionales y barrido sutil hacia el contenido de la plataforma.
- **`listening` (Escucha Activa)**: Inclinación atenta y contacto visual continuo con micro-respiración.
- **`celebrating` (Feedback Triunfal)**: Rebote afirmativo y nodding elástico de victoria.

## 3. Protocolo de Rendimiento DMA "Volador" (0ms Latency)
- **Tier 0**: Frame neutral 18 (`gaze_018.webp`) en 0ms directo desde `<img>`.
- **Tier 1**: Batch único DMA desde `/data/robot-gaze.bin` persistido en `CacheStorage`. Decodificación directa a `ImageBitmap` en memoria.
- **Zero-Drop Engine (`findBestBitmap`)**: Búsqueda radial del frame cargado más cercano si un frame intermedio aún decodifica. Cero parpadeos, cero pantallas en blanco.
- **Proactive Saludo Warmup**: Se pre-carga de forma invisible al acercarse el cursor (`u > 0.35`) o tocar el hitbox, dejando el clic a 0ms de respuesta.
