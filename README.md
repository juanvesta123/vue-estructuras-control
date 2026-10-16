# Estructuras de control con Vue

SPA educativa en español creada con Vue 3, Vue Router y Vite.

- **Sitio compilado:** https://juanvesta123.github.io/vue-estructuras-control/
- **Código fuente:** https://github.com/juanvesta123/vue-estructuras-control

## Integrantes

- Nucamendi Diaz Juan Manuel
- De los Santos Lopez Rubi Esmeralda
- Edson S. Jiménez Silvestre

## Ejecutar
Requiere Node.js 24 y npm.
```sh
npm ci
npm run dev
```

## Verificar y compilar
```sh
npm test
npm run build
npm run preview
```
El build se genera en `dist/`. No se publica el servidor de desarrollo.

## Lecciones
| Ruta | Directiva | Ejemplo |
| --- | --- | --- |
| `/#/v-if` | `v-if / v-else-if / v-else` | Calificación: excelente, aprobado o seguir practicando |
| `/#/v-show` | `v-show` | Mostrar y ocultar un mensaje sin eliminar su nodo |
| `/#/v-for` | `v-for` | Agregar y eliminar temas de una lista reactiva |
| `/#/v-bind-key` | `v-bind:key` | Reordenar tarjetas conservando sus inputs |

## Estructura
`src/App.vue` contiene el menú con `<router-link>` y `<router-view>`. `src/router/index.js` declara las cuatro rutas. `src/views/` contiene los ejemplos reales; `src/components/LessonLayout.vue` comparte la presentación. `tests/lessons.test.js` comprueba las tres ramas, la permanencia del nodo con v-show, las listas y la identidad con key.

## Publicación en GitHub Pages
En Settings > Pages se utiliza GitHub Actions. El workflow `.github/workflows/deploy.yml` instala dependencias, ejecuta las pruebas y `npm run build`, sube **exclusivamente `dist`** como artefacto y lo publica con `actions/deploy-pages`.

Vite configura `base: '/vue-estructuras-control/'`. Vue Router utiliza hash history para permitir enlaces directos y recargas en GitHub Pages sin un servidor de redirecciones. Los cambios de lección son navegación SPA sin recargar el documento.

## Evidencias
Descargar el [PDF de evidencias de cumplimiento](./evidencias-vue-lab.pdf).

El documento PDF de entrega incluye capturas de la interfaz publicada y del código fuente, con una captura como máximo por página y explicaciones breves. Las capturas y verificaciones se realizaron sobre el proyecto terminado.

## Reproducir las capturas reales de código
En Windows, después de `npm ci`:
```sh
npm run evidence:terminal
```
Abre http://127.0.0.1:4182/ en el navegador. Selecciona un archivo y ejecuta `Get-Content`. La consola xterm.js recibe stdout y stderr de un proceso real de Windows PowerShell; no genera una imagen ni reescribe el código. Solo admite una lista cerrada de comandos de lectura y escucha en localhost. No forma parte del sitio público compilado.
