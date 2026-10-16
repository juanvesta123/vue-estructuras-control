<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
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
    document.title = title || "Estructuras de control";
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
        <router-link to="/" class="brand" aria-label="Inicio"
          >Estructuras de control en Vue</router-link
        >
        <a
          class="repo-link"
          href="https://github.com/juanvesta123/vue-estructuras-control"
          target="_blank"
          rel="noopener noreferrer"
          >Repositorio</a
        >
      </div>
    </header>
    <main class="shell">
      <div class="lab-area" id="contenido" tabindex="-1">
        <nav class="lesson-nav" aria-label="Lecciones de Vue">
          <router-link
            v-for="lesson in lessons"
            :key="lesson.path"
            :to="lesson.path"
            ><span class="nav-directive">{{ lesson.directive }}</span
            ><span class="nav-label">{{ lesson.title }}</span></router-link
          >
        </nav>
        <router-view />
        <div class="lesson-continuation">
          <router-link class="next-lesson" :to="nextLesson.path"
            ><strong>{{ nextLesson.directive }}</strong></router-link
          >
        </div>
      </div>
      <footer class="site-footer">
        <a
          href="https://github.com/juanvesta123/vue-estructuras-control/blob/main/evidencias-vue-lab.pdf"
          target="_blank"
          rel="noopener noreferrer"
          >Evidencias</a
        >
      </footer>
    </main>
  </div>
</template>
