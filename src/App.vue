<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import HeroDiagram from "./components/HeroDiagram.vue";
const route = useRoute();
const inputMode = ref("pointer");
const lessons = [
  { path: "/v-if", directive: "v-if", title: "Condicionales", verb: "Decide" },
  {
    path: "/v-show",
    directive: "v-show",
    title: "Visibilidad",
    verb: "Revela",
  },
  { path: "/v-for", directive: "v-for", title: "Listas", verb: "Repite" },
  {
    path: "/v-bind-key",
    directive: "v-bind:key",
    title: "Identidad",
    verb: "Conserva",
  },
];
const currentIndex = computed(() =>
  Math.max(
    0,
    lessons.findIndex((lesson) => lesson.path === route.path),
  ),
);
const nextLesson = computed(
  () => lessons[(currentIndex.value + 1) % lessons.length],
);
function focusContent() {
  document.getElementById("contenido")?.focus({ preventScroll: true });
  document.getElementById("contenido")?.scrollIntoView({ block: "start" });
}
watch(
  () => route.meta.title,
  (title) => {
    document.title = `${title || "Estructuras de control"} | Vue Lab`;
  },
  { immediate: true },
);
</script>
<template>
  <div
    class="app-root"
    :data-input="inputMode"
    @pointerdown.capture="inputMode = 'pointer'"
    @keydown.capture="inputMode = 'keyboard'"
  >
    <a class="skip-link" href="#contenido" @click.prevent="focusContent"
      >Saltar al contenido</a
    >
    <header class="site-header">
      <div class="header-inner">
        <router-link to="/" class="brand" aria-label="Vue Lab, inicio"
          ><svg class="brand-symbol" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M3 5h7l6 11 6-11h7L16 28Z" fill="currentColor" />
            <path d="M10 5h4l2 4 2-4h4L16 16Z" fill="var(--paper)" /></svg
          ><span
            >vue<span class="brand-light">lab</span
            ><span class="brand-dot">/</span></span
          ></router-link
        >
        <p class="header-caption">
          Un laboratorio de ideas<br /><span>con Vue 3 y Vue Router.</span>
        </p>
        <a
          class="repo-link"
          href="https://github.com/juanvesta123/vue-estructuras-control"
          target="_blank"
          rel="noopener noreferrer"
          >Explorar el código <span aria-hidden="true">↗</span></a
        >
      </div>
    </header>
    <main class="shell">
      <section class="intro" aria-labelledby="intro-title">
        <div class="intro-text">
          <p class="intro-kicker">
            <span class="dot"></span> Aprende Vue experimentando
          </p>
          <h1 id="intro-title">
            Menos teoría.<br /><span>Más interacción.</span>
          </h1>
          <p class="intro-copy">
            Una condición. Una lista. Un cambio de estado.<br
              class="desktop-break"
            />
            Descubre cómo unas pocas líneas dan vida a tu interfaz.
          </p>
          <a
            class="intro-action"
            href="#contenido"
            @click.prevent="focusContent"
            >Abre el laboratorio <span aria-hidden="true">↓</span></a
          >
        </div>
        <HeroDiagram
          :motion-allowed="inputMode === 'pointer'"
          :directive="lessons[currentIndex].directive"
        />
      </section>
      <div class="lab-area" id="contenido" tabindex="-1">
        <div class="lab-heading">
          <p>Elige qué quieres explorar</p>
          <span>Tu código, en acción.</span>
        </div>
        <nav class="lesson-nav" aria-label="Lecciones de Vue">
          <router-link
            v-for="lesson in lessons"
            :key="lesson.path"
            :to="lesson.path"
            ><span class="nav-directive">{{ lesson.directive }}</span
            ><span class="nav-label">{{ lesson.title }}</span
            ><span class="nav-arrow" aria-hidden="true">↗</span></router-link
          >
        </nav>
        <router-view />
        <div class="lesson-continuation">
          <p>
            La mejor forma de entenderlo<br /><strong
              >es cambiarlo tú mismo.</strong
            >
          </p>
          <router-link class="next-lesson" :to="nextLesson.path"
            ><span>Sigue explorando</span
            ><strong
              >{{ nextLesson.directive }}
              <span aria-hidden="true">→</span></strong
            ></router-link
          >
        </div>
      </div>
      <footer class="site-footer">
        <span class="footer-brand">vuelab/ <span>por juanvesta123</span></span>
        <p>Hecho con Vue 3. Construido para aprender.</p>
        <a
          href="https://github.com/juanvesta123/vue-estructuras-control/blob/main/evidencias-vue-lab.pdf"
          target="_blank"
          rel="noopener noreferrer"
          >Ver evidencias <span aria-hidden="true">↗</span></a
        >
      </footer>
    </main>
  </div>
</template>
