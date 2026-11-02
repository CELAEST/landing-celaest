# Standard de Cableado y Conectores de Pipeline CELAEST

## Modificación
En el widget de automatización (`PipelineWidget`), la línea vertical entre los nodos Trigger ("Nuevo usuario") y Action ("Ejecutar acción"):
- Tenía 3 puntos: terminal superior, punto central flotante (`wire-v1-dot`) y terminal inferior.
- Se removió el punto central para mantener el diseño limpio y libre de elementos distractores innecesarios.

## Arquitectura de Conectores
- **Terminales Sockets**: Se conservan únicamente los dos terminales (`wire-v1-pill`) en los extremos (salida del Trigger y entrada de la Acción).
- **Línea Continua**: Conexión vertical ininterrumpida (`wire-v1-line`) de 1.8px en `#8b5cf6`.
- **Modularización**: El componente se dividió en subcomponentes atómicos (`PipelineToolbar`, `VerticalConnectionWire`, `BranchWishboneWire`, `PipelineResultNodes`), respetando el límite estricto de <80 líneas por archivo.
