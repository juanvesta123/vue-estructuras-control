# Vue Lab: diseño aprobado y plan

## Objetivo
Entregar una SPA educativa en español con Vue 3 y Vue Router, repositorio personal juanvesta123/vue-estructuras-control, build publicado en GitHub Pages y PDF de evidencias. El usuario aprobó el diseño y autorizó creación y publicación el 15 de octubre de 2026.

## Diseño
Cuatro rutas: /v-if, /v-show, /v-for y /v-bind-key. Navegación con router-link y router-view. Hash history evita errores 404 al abrir rutas en GitHub Pages. Vite usa base /vue-estructuras-control/. Diseño claro, azul y verde, adaptable, con explicaciones, ejemplo de código y demostración interactiva por página.

Condicional: calificación editable con tres ramas. Visibilidad: mensaje con v-show que permanece en DOM. Listas: agregar y eliminar temas. Identidad: lista reordenable con inputs locales para demostrar conservación de estado mediante v-bind:key estable.

## Plan de implementación
1. Crear repositorio y configuración Vite/Vue. Escribir pruebas de comportamiento antes de vistas. Guardar commit inicial.
2. Crear src/router/index.js, src/App.vue, src/components/LessonLayout.vue y cuatro vistas independientes. Ejecutar pruebas de ramas, visibilidad DOM, listas y conservación de inputs al reordenar. Guardar commit de SPA.
3. Ejecutar npm run build. Publicar dist en rama gh-pages; configurar Pages. Verificar las cuatro rutas y navegación sin recarga en sitio público, también en celular. Guardar instrucciones reproducibles.
4. Capturar interfaz pública, código fuente, repositorio, historial y publicación. Generar PDF con títulos, máximo una captura por página y explicaciones de hasta dos párrafos por evidencia. Renderizar e inspeccionar. Commit final de documentación y evidencias.

## Verificación
Pruebas unitarias con Vitest y Vue Test Utils, comprobación real en navegador del build, recursos HTTP correctos, hash routes al refrescar, inputs asociados a identificadores al invertir, v-show mantiene el nodo, sin desbordamiento móvil. PDF ordenado y legible.

## Riesgos revisados
Credenciales de Git pueden pertenecer a otra cuenta: verificar identidad y usar sesión visible de juanvesta123. No publicar archivos ajenos de la carpeta superior. PDF sólo afirma verificaciones realmente ejecutadas. No usar índice del array como key.
