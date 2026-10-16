# Rediseño de Vue Lab

## Alcance autorizado

Rediseñar el sitio existente, aplicar gpt-taste, redesign-existing-projects, emil-design-eng, animate y review-animations, conservar funcionalidad, probar escritorio/móvil y sustituir las capturas de código por capturas de una terminal real Windows o genérica. Interacción visual exclusivamente mediante navegador.

## Auditoría

- Tipografía de controles y contenido entre 9 y 12px; poca legibilidad.
- Exceso de etiquetas en mayúsculas, tarjetas simétricas, contornos y radios repetidos.
- Bloque de código con tres puntos de macOS, inadecuado para la solicitud.
- Sin feedback de pulsación; navegación sin una transición diferenciada del resto.
- Hoja de estilos comprimida en líneas extensas, difícil de mantener.
- Evidencia previa de código en visor HTML: se sustituirá por comandos ejecutados en PowerShell, mostrados en una consola del navegador conectada al proceso real.

## Dirección

Cuaderno de programación editorial: Satoshi, superficies de papel cálido, tinta carbón, acento lima desaturado. Hero asimétrico con gráfico de flujo de datos de Vue, encabezado ancho en dos líneas, navegación de cuatro lecciones siempre accesible. Laboratorio conserva explicación, fuente y ejemplo. Bloques de código sin controles ficticios de sistema operativo. Más espacio y tamaños de lectura/objetivos táctiles útiles.

## Movimiento

Feedback de botones: transform, 120ms al pulsar, 100ms al soltar; curva cubic-bezier(0.23, 1, 0.32, 1). Hover de flechas limitado a puntero preciso. Teclado desactiva movimiento. GSAP ScrollTrigger solo para gráfico decorativo explicativo, condicionado a no-reduced-motion y escritorio; limpiar con matchMedia.revert al desmontar. No pinning, carruseles de testimonios falsos, scroll artificial ni movimiento sobre datos que se leen.

## Plan

1. Conservar baseline de cinco pruebas; añadir pruebas para navegación de lección siguiente, comportamiento de skip-link y presentación del código sin chrome de macOS.
2. Actualizar App, LessonLayout, CSS y gráfico decorativo. Mantener las cuatro directivas reales, IDs, rutas y resultados.
3. Ejecutar pruebas/build, revisar animaciones y comprobar browser a 1440/390/320px, listas largas, teclas, recargas y toggles rápidos.
4. Publicar archivos y verificar Actions y sitio público.
5. Crear consola de evidencias solo local: xterm.js recibe stdout/stderr de PowerShell ejecutado por Node; solo comandos de lectura predefinidos. Capturar desde navegador. Regenerar PDF con una captura por página, renderizar y revisar; publicar PDF actualizado.

## Conflictos resueltos entre skills

Se adapta el lenguaje React de gpt-taste a Vue existente. Las ideas promocionales que contradicen la utilidad académica se sustituyen por composición editorial y explicación visual de datos; el criterio de animate/emil de movimiento con propósito prevalece sobre animar todo. No se añaden fotografía irrelevante, testimonios ficticios ni complejidad de scroll que afecte rendimiento.
