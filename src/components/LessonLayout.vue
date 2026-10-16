<script setup>
defineProps({ number: String, title: String, description: String, code: String, takeaway: String })
</script>
<template>
  <section class="lesson" :aria-labelledby="`lesson-${number}`">
    <div class="lesson-heading"><div><p class="eyebrow">LECCIÓN {{ number }} / EXPLORA LA DIRECTIVA</p><h2 :id="`lesson-${number}`">{{ title }}</h2></div><span class="lesson-chip">INTERACTIVO</span></div>
    <p class="lesson-description">{{ description }}</p>
    <div class="workbench">
      <section class="code-panel" aria-label="Ejemplo de código Vue"><div class="panel-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>Ejemplo.vue</span><span class="language-tag">VUE</span></div><pre><code>{{ code }}</code></pre><div class="code-note">↳ Este código se aplica en la demostración.</div></section>
      <section class="demo-panel" aria-label="Demostración interactiva"><div class="demo-label"><i class="dot"></i> RESULTADO EN VIVO</div><slot /></section>
    </div>
    <div class="takeaway"><span class="tip-icon">i</span><p><strong>Qué debes recordar</strong><br>{{ takeaway }}</p></div>
  </section>
</template>
