# Contrato Canónico: Cards Isométricas 3D de Plataforma (Ultra-Clean Master Standard)

## Contexto & Calidad de Ingeniería
Las tarjetas de la sección Plataforma se elevaron a estándar de ingeniería de lujo minimalista, logrando paridad 1:1 con el diseño maestro de referencia:

1. **Eliminación Total de Badges Innecesarios**:
   - Se removió por completo el badge "Más popular" / "Most Popular" de la tarjeta central ("Pipeline de Automatización").
   - Las 3 tarjetas comparten ahora una jerarquía visual idéntica: caja de ícono cuadrada de cristal (`Layers`, `Zap`, `Shield`) con el mismo espaciado superior.

2. **Perímetro y Bordes Sutiles (Zero-Oversaturation Standard)**:
   - PROHIBIDO usar bordes saturados o trazos de colores agresivos que ensucien el diseño.
   - Las 3 tarjetas cuentan con un borde ultrafino de cristal translúcido idéntico:
     `border border-white/[0.08] hover:border-white/20 transition-all duration-500 rounded-[28px]`
     con resalte interior sutil `shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]` y fondo de obsidiana profunda `bg-[#07070a]/95 backdrop-blur-2xl`.

3. **Iluminación Atmosférica Pura por CSS (Zero Blurry Raster Artifacts)**:
   - Se eliminaron las texturas rasterizadas de fondo (`card-bg-*.webp`) que generaban artefactos de compresión y esquinas pre-cortadas.
   - Toda la atmósfera se genera mediante gradientes radiales puros acelerados por hardware:
     - Card 1: Halo violeta superior derecho + aura violeta inferior derecha.
     - Card 2: Halo púrpura difuso (`rgba(147,51,234,0.16)`) superior derecho y halo inferior derecho sutil.
     - Card 3: Halo difuso envolvente del pedestal técnico y órbita.

4. **Tipografía de Alta Gama a Dos Tonos**:
   - Primera línea: `font-light text-white/80` (ej: `Gestión`, `Pipeline`, `Ecosistema`).
   - Segunda línea: `font-bold text-white whitespace-nowrap` (ej: `Centralizada`, `de Automatización`, `de Activos`).
   - Evita saltos de línea antiestéticos o colisiones con los modelos 3D.
