# Revisión de animaciones

Skills aplicadas: animate, emil-design-eng y review-animations, con los valores de STANDARDS.md.

| Before | After | Why |
| --- | --- | --- |
| Botones sin feedback de pulsación | `src/style.css:597`: transform de 120ms al pulsar y 100ms al soltar, escala 0.97 y curva `(0.23, 1, 0.32, 1)` | Confirma la acción; respuesta rápida, interrumpible y sin layout |
| Estado de teclado indistinto del puntero | `src/App.vue:47`: modalidad de entrada; `src/style.css:1084`: teclado sin movimiento | Evita retrasos visuales en acciones de teclado |
| Reducción de movimiento global e indiscriminada | `src/style.css:1060`: elimina desplazamientos y mantiene feedback de opacidad; `HeroDiagram.vue:28`: media query condicionada | Respeta la preferencia sin perder señales de estado |
| Gráfico sin relación temporal entre datos e interfaz | `HeroDiagram.vue:31`: dos ScrollTriggers de transform/opacity, solo en escritorio y puntero preciso | Explica el flujo sin animar datos funcionales ni secuestrar el scroll |

## Veredicto
**Approve.** No hay `transition: all`, entradas desde escala 0, ease-in en controles ni animación de dimensiones. Las transiciones de UI están entre 100 y 160ms. Los ScrollTriggers son explicativos y no bloquean la lectura, tienen limpieza al desmontar y se revierten al entrar por teclado. No hay rebotes, loops, pinning, animaciones de listas funcionales ni scroll artificial.

Se comprobó en el navegador que el modo teclado deja `diagram-surface` sin estilos de movimiento; el sitio público funciona a 320px y los cuatro ejemplos siguen operativos. Se comprobó movimiento reducido por revisión de las condiciones CSS/GSAP; no se cambió la preferencia del sistema del usuario.

Referencia técnica consultada: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), que permite agrupar y revertir animaciones al cambiar las condiciones de medios.
