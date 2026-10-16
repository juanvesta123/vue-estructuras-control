<script setup>
import { computed } from "vue";
const props = defineProps({
  number: String,
  title: String,
  description: String,
  code: String,
  takeaway: String,
});
const filename = computed(
  () =>
    ({
      "01": "IfView.vue",
      "02": "ShowView.vue",
      "03": "ForView.vue",
      "04": "KeyView.vue",
    })[props.number] || "Ejemplo.vue",
);
const lines = computed(() => (props.code || "").split("\n"));
</script>
<template>
  <section class="lesson" :aria-labelledby="`lesson-${number}`">
    <div class="lesson-heading">
      <h2 :id="`lesson-${number}`">{{ title }}</h2>
    </div>
    <p class="lesson-description">{{ description }}</p>
    <div class="workbench">
      <section class="code-panel" aria-label="Ejemplo de código Vue">
        <div class="panel-bar">
          <span class="code-filename">{{ filename }}</span
          ><span class="language-tag">Vue</span>
        </div>
        <pre
          tabindex="0"
          aria-label="Código del ejemplo, desplazable"
        ><code><span v-for="(line, index) in lines" :key="index" class="code-line"><span class="line-number" aria-hidden="true">{{ index + 1 }}</span><span>{{ line || ' ' }}</span>{{ '\n' }}</span></code></pre>
      </section>
      <section class="demo-panel" aria-label="Demostración interactiva">
        <div class="demo-content"><slot /></div>
      </section>
    </div>
    <aside class="takeaway">
      <div>
        <h3>Nota</h3>
        <p>{{ takeaway }}</p>
      </div>
    </aside>
  </section>
</template>
