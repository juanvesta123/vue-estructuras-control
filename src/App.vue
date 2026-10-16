<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.meta.title, title => {
  document.title = `${title || 'Estructuras de control'} | Vue Lab`
}, { immediate: true })
</script>
<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header><div class="header-inner">
    <router-link to="/" class="brand" aria-label="Vue Lab, inicio"><span class="brand-mark">V</span> Vue<span class="brand-light">Lab</span><span class="brand-dot">.</span></router-link>
    <span class="header-tag"><i class="dot"></i> VUE 3 + VUE ROUTER</span>
    <a class="repo-link" href="https://github.com/juanvesta123/vue-estructuras-control" target="_blank" rel="noopener noreferrer">Código en GitHub ↗</a>
  </div></header>
  <main id="contenido" class="shell">
    <section class="intro"><p class="eyebrow">APRENDE HACIENDO / 4 LECCIONES</p><h1>Pequeñas directivas.<br><span>Grandes posibilidades.</span></h1><p class="intro-copy">Explora las estructuras de control de Vue. Lee el código,<br class="desktop-break"> cambia los datos y descubre qué sucede en tiempo real.</p></section>
    <nav class="lesson-nav" aria-label="Lecciones de Vue">
      <router-link to="/v-if"><span class="nav-number">01</span><span><strong>v-if</strong><small>Condicionales</small></span><span class="nav-arrow">↗</span></router-link>
      <router-link to="/v-show"><span class="nav-number">02</span><span><strong>v-show</strong><small>Visibilidad</small></span><span class="nav-arrow">↗</span></router-link>
      <router-link to="/v-for"><span class="nav-number">03</span><span><strong>v-for</strong><small>Listas</small></span><span class="nav-arrow">↗</span></router-link>
      <router-link to="/v-bind-key"><span class="nav-number">04</span><span><strong>v-bind:key</strong><small>Identidad</small></span><span class="nav-arrow">↗</span></router-link>
    </nav>
    <router-view />
    <footer><span>Vue Lab <span class="brand-dot">•</span> juanvesta123</span><span>Una aplicación. Cuatro rutas. Sin recargas.</span></footer>
  </main>
</template>
